/**
 * Parse les arguments CLI au format --key=value ou --key value
 * Reconnaît --output et --theme selon les specs techniques
 */
export function parseArgs(argv: string[] = []): {
  output?: string;
  theme?: string;
  illustrationsOnly?: boolean;
} {
  const args: { output?: string; theme?: string; illustrationsOnly?: boolean } =
    {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.replace(/^--/, "");
      // Option illustrations-only (flag sans valeur)
      if (key === "illustrations-only") {
        args.illustrationsOnly = true;
        continue;
      }
      // Format --key=value
      if (arg.includes("=")) {
        const [k, v] = key.split("=");
        if (k === "output" || k === "theme") args[k] = v;
      } else {
        // Format --key value
        const next = argv[i + 1];
        if (
          (key === "output" || key === "theme") &&
          next &&
          !next.startsWith("--")
        ) {
          args[key] = next;
          i++;
        }
      }
    }
  }
  return args;
}
