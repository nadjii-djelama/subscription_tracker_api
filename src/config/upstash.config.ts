import { Client as WorkflowClient } from "@upstash/workflow";
import envConfig from "./env.config.ts";

const baseUrl = process.env.QSTASH_URL;
const token = process.env.QSTASH_TOKEN;

if (!baseUrl || !token) {
  throw new Error(
    "Missing required environment variables: QSTASH_URL and QSTASH_TOKEN"
  );
}

const workflowClient = new WorkflowClient({
  baseUrl,
  token,
});

export { workflowClient };
