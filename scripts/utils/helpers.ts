import { createHash } from "crypto";

export function hashSha1(input: string): string {
  return createHash("sha1").update(input).digest("hex");
}

export function formatPath(...parts: string[]): string {
  return parts.join("/");
}
