import path from "path";
import "@testing-library/jest-dom/extend-expect";
import { Polly } from "@pollyjs/core";
import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import FSPersister from "@pollyjs/persister-fs";
import { setupPolly } from "setup-polly-jest";

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

setupPolly({
  adapters: ["node-http"],
  persister: "fs",
  persisterOptions: {
    fs: {
      recordingsDir: path.resolve(__dirname, "./__recordings__"),
    },
  },
});
