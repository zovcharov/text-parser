# Text Parser

https://www.npmjs.com/package/text-keywords-parser

This module can parse any input string and give you information about keywords in text.

### Installation

Use `npm install text-keywords-parser --save` if you want to install text parser.
It will works fine with ES6 modules and NodeJS as well.

### Usage
`const parse = require('text-keywords-parser')` for NodeJS

or

`import parse from 'text-keywords-parser'` for ES6 modules


Parser can works in two modes: with callback or with promises.

If you wanna use callback mode, you can involve parser like:
- `parse(textString, callback)` (default config will be used)
- `parse(textString, config, callback)` (for custom settings)

If you wanna use promise mode, you can involve parser like:
- `parse(textString)` (default config will be used)
- `parse(textString, config)` (for custom settings)
In this case, Promise will be returned.

### Config
```
interface IConfig {
    ignoreWords?: string[]; // List of the words, that willl be ignored
    offset?: number; // Symbols offset from the start of the text
    minLength?: number; // Words with length smaller than minLength will be ignored
    logger?: ILogger; // Custom logger
}

interface ILogger {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}
```

