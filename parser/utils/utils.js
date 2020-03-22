const SYMBOLS_REPLACE_DICT = require('../constants/index').SYMBOLS_REPLACE_DICT;

/**
 * We should prepare each word for commonality
 * Also we can cut unnesessary symbols
 * @param {string} word 
 * @returns {string} prepared word
 */
const prepareWord = word => {
    let resWord = '';

    for (let index in word) {
        if (SYMBOLS_REPLACE_DICT[word[index]] !== undefined) {
            resWord = resWord + SYMBOLS_REPLACE_DICT[word[index]]
        } else {
            resWord = resWord + word[index]
        }
    }
    
    return resWord.toLowerCase();
}

/**
 * We can use plain object like hash table for 0(1) access
 * @param {string[]} arrInput 
 */
const stringArrayToHashMap = arrInput => arrInput.reduce((acc, curValue) => ({
    ...acc,
    [curValue.toLowerCase()]: curValue.toLowerCase(),
}), {});

/**
 * Check if input value function or not
 * @param {any} valueToCheck 
 * @returns {boolean}
 */
const isFunction = valueToCheck => typeof valueToCheck === 'function';

/**
 * Check if input value object or not
 * Note: null value also have type object
 * @param {any} valueToCheck 
 * @returns {boolean}
 */
const isObject = valueToCheck => valueToCheck !== null && typeof valueToCheck === 'object';

/**
 * Check if input value string or not
 * @param {any} valueToCheck 
 * @returns {boolean}
 */
const isString =  valueToCheck => typeof valueToCheck === 'string';

/**
 * Check if input value array of strings or not
 * @param {any} valueToCheck 
 * @returns {boolean}
 */
const isArrayOfStrings = valueToCheck => {
    if (!Array.isArray(valueToCheck)) {
        return false;
    }

    for (let index = 0; index < valueToCheck.length; index++) {
        if (!isString(valueToCheck[index])) {
            return false;
        }
    }

    return true;
}

/**
 * Check if input params correct according to the documentation
 * Note: this function can throw exception
 * @param {...any} params input params
 */
const checkParams = (...params) => {
    if (!isString(params[0])) {
        throw new Error('First param should be a string for parsing');
    }
    if (params.length === 2 && !isObject(params[1]) && !isFunction(params[1])) {
        throw new Error('Second param should be callback function or config object');
    }
    if (params.length === 3 && !isFunction(params[2])) {
        throw new Error('Third param should be callback function');
    }
    if (params.length > 3) {
        throw new Error('Wrong params count. Expect from 1 to 3 params');
    }
};

/**
 * Check if user configurations correct according to the documentation
 * Note: this function can throw exception
 * @param {...any} params input params
 */
const checkConfigObject = userConfig => {
    if (userConfig.ignoreWords && !isArrayOfStrings(userConfig.ignoreWords)) {
        throw new Error('Wrong config value: ignoreWords should be array of strings');
    }
    if (userConfig.minLength && !Number.isFinite(userConfig.minLength)) {
        throw new Error('Wrong config value: minLength should be finite number');
    }
    if (userConfig.offset && !Number.isFinite(userConfig.offset)) {
        throw new Error('Wrong config value: offset should be finite number');
    }
}

/**
 * Function that can prepare user config for optimization and commonality
 * @param {object} userConfig 
 * @returns {object} prepared configuration object
 */
const prepareConfig = userConfig => ({
    ...userConfig,
    ignoreWords: userConfig.ignoreWords && stringArrayToHashMap(userConfig.ignoreWords) || {},
})

module.exports = {
    prepareWord,
    isFunction,
    isObject,
    isString,
    checkParams,
    checkConfigObject,
    prepareConfig,
}