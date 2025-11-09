# Coding Guidelines for Bun TypeScript

This document outlines best practices for writing clean, maintainable code in Bun TypeScript projects.

## General Principles

- **Early Returns**: Use early returns to exit functions as soon as possible when conditions are met, reducing nesting and improving readability.
- **Single Responsibility**: Each function or class should have one clear purpose.
- **DRY (Don't Repeat Yourself)**: Avoid code duplication by extracting common logic into reusable functions or modules.
- **Clear Naming**: Use descriptive variable, function, and class names that convey intent. Avoid abbreviations unless widely understood.
- **Comments**: Write comments for complex logic, but prefer self-documenting code. Avoid redundant comments.
- **Error Handling**: Handle errors gracefully with try-catch blocks or appropriate checks, and provide meaningful error messages.
- **Testing**: Write unit tests for critical functions and edge cases.
- **Code Formatting**: Follow consistent indentation, spacing, and style (e.g., using tools like Prettier or ESLint).
- **Version Control**: Commit frequently with clear, concise messages following conventional commit format (e.g., "feat: add new feature", "fix: resolve bug"). Use branches for features.
- **Performance**: Optimize for readability first, then performance. Profile code to identify bottlenecks.
- **Security**: Validate inputs, avoid hardcoding sensitive data, and follow secure coding practices.
- **Documentation**: Maintain up-to-date documentation for APIs and complex systems.

## TypeScript-Specific Tips (with Bun)

- Use `const` and `let` appropriately for variable declarations.
- Prefer arrow functions for concise callbacks and to maintain `this` context.
- Leverage async/await for asynchronous code, taking advantage of Bun's fast runtime for efficient execution.
- Define types explicitly for function parameters, return values, and interfaces to ensure type safety.
- Use generics for reusable components and avoid `any` type unless necessary.
- Enable strict mode in TypeScript config for better error catching.
- Utilize Bun's built-in TypeScript support to run `.ts` files directly without separate compilation steps.
- Follow consistent import/export patterns, preferring ES modules as Bun supports them natively.

Adhere to these rules to ensure high-quality, collaborative code in Bun TypeScript projects.
