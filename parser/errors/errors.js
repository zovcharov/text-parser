class InputParamError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InputParamError';
        this.stack = (new Error()).stack;
    }
}

class ConfigParamError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConfigParamError';
        this.stack = (new Error()).stack;
    }
}

module.exports = {
    InputParamError,
    ConfigParamError,
}