import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { PassThrough } from "stream";
import { CustomError } from "./errorHandler.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

class StreamMock {
  constructor(words) {
    this.words = words;
    this.controller = new AbortController();
  }

  async *[Symbol.asyncIterator]() {
    for (let [i, v] of this.words.entries()) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (this.controller.signal.aborted) break;

      yield {
        id: "chatcmpl-UNIQUEID",
        object: "chat.completion.chunk",
        created: Math.floor(Date.now() / 1000),
        model: "gpt-3.5-mock",
        system_fingerprint: "fp_c2295e73ad",
        choices: [
          {
            index: 0,
            delta: { content: `${v} ` },
            logprobs: null,
            finish_reason: i === this.words.length - 1 ? "stop" : null,
          },
        ],
      };
    }
  }
}

class ChatMock {
  completions = {
    async create({ messages, model, stream }) {
      if (!model)
        throw new CustomError("400: You must provide a model parameter", 400);
      if (!messages)
        throw new CustomError(
          "400: Missing required parameter: 'messages'",
          400
        );

      // Generate a product-related AI response
      const sampleReview = "I love this jacket! It's stylish and warm.";
      const aiResponse = `Thank you for your review! We're thrilled you love the jacket. Stay warm and stylish!`;

      if (stream) {
        return new StreamMock(aiResponse.split(" "));
      } else {
        return {
          id: "chatcmpl-9GkKWpvJxL7CCdq3xulB1WIgH4oLT",
          object: "chat.completion",
          created: Math.floor(Date.now() / 1000),
          model: "gpt-3.5-turbo-0125",
          choices: [
            {
              index: 0,
              message: {
                role: "assistant",
                content: aiResponse,
              },
              logprobs: null,
              finish_reason: "stop",
            },
          ],
          usage: { prompt_tokens: 27, completion_tokens: 29, total_tokens: 56 },
        };
      }
    },
  };
}

class ImageMock {
  async generate({ size = "1024x1024", response_format, prompt }) {
    const [width, height] = size.split("x").map(Number);
    const data = [{ revised_prompt: prompt }];

    const url = `https://placedog.net/${width}/${height}?r`;

    if (response_format === "b64_json") {
      const res = await fetch(url);
      const buffer = Buffer.from(await res.arrayBuffer());
      data[0].b64_json = buffer.toString("base64");
    } else {
      data[0].url = url;
    }

    return { data };
  }
}

class AudioMock {
  speech = {
    async create() {
      try {
        const filePath = join(__dirname, "../rr.mp3");
        const audioBuffer = await readFile(filePath);
        const passThrough = new PassThrough();
        passThrough.end(audioBuffer);
        return { body: passThrough };
      } catch (error) {
        throw new CustomError("500: Audio file not found", 500);
      }
    },
  };
}

class OpenAIMock {
  constructor() {
    this.chat = new ChatMock();
    this.images = new ImageMock();
    this.audio = new AudioMock();
  }
}

export default OpenAIMock;
