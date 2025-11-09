export enum LogLevel {
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

export class Logger {
  static log(level: LogLevel, message: string): void {
    console.log(`[${level.toUpperCase()}] ${message}`);
  }
}
