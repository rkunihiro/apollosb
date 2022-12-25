import type { Logger } from "@apollo/utils.logger";

export class JsonLogger implements Logger {
    private write(level: string, ...args: unknown[]): void {
        const time = new Date().toISOString();
        const message = args.shift();
        const params = args.length > 0 ? (args.length === 1 ? args[0] : args) : undefined;
        console.log(JSON.stringify({ time, level, message, params }));
    }

    debug(...args: unknown[]): void {
        this.write("debug", ...args);
    }

    log(...args: unknown[]): void {
        this.write("info", ...args);
    }

    info(...args: unknown[]): void {
        this.write("info", ...args);
    }

    warn(...args: unknown[]): void {
        this.write("warn", ...args);
    }

    error(...args: unknown[]): void {
        this.write("error", ...args);
    }
}
