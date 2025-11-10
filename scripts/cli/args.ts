export function parseArgs(argv: string[] = []): {
  output?: string;
  theme?: string;
  illustrationsOnly?: string;
} {
  const args: { output?: string; theme?: string; illustrationsOnly?: string } =
    {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.replace(/^--/, "");
      // Option illustrations-only (peut avoir une valeur)
      if (key.startsWith("illustrations-only")) {
        if (key.includes("=")) {
          const [, value] = key.split("=");
          args.illustrationsOnly = value || "interactive";
        } else {
          args.illustrationsOnly = "interactive";
        }
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
