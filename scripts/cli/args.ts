export interface CliOptions {
  output: string;
  theme: string;
}

export function parseArgs(): CliOptions {
  const args = process.argv.slice(2);
  const options: CliOptions = {
    output: "dist/presentation.pptx",
    theme: "standard",
  };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--output" && args[i + 1]) options.output = args[i + 1];
    if (args[i] === "--theme" && args[i + 1]) options.theme = args[i + 1];
  }
  return options;
}
