import path from "path";
import "@testing-library/jest-dom/extend-expect";
import { Polly } from "@pollyjs/core";
import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import FSPersister from "@pollyjs/persister-fs";
import { setupPolly } from "setup-polly-jest";
import { $backend } from "../src/lib/backend";

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

const context = setupPolly({
  adapters: ["node-http"],
  persister: "fs",
  persisterOptions: {
    fs: {
      recordingsDir: path.resolve(__dirname, "./__recordings__"),
    },
  },
});

beforeEach(() => {
  context.polly.configure({
    recordIfMissing: !process.env["CI"],
    matchRequestsBy: {
      headers: {
        exclude: ["AUTHORIZATION"],
      },
    },
  });

  context.polly.server.any().on("beforePersist", (req, recording) => {
    recording.request.headers = recording.request.headers.filter(({ name }: { name: string }) => name !== "authorization");
  });
});

$backend.prepared = false;
