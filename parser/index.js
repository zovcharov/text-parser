const parserAdapter = require('./parsers/parsersAdapter');
const utils = require('./utils/utils');
const baseParserConfig = require('./config/baseParserConfig');
const logger = require('./logger/logger');

(function() {
    /**
     * Function execute parser and involve callback function
     * @param {string} text text for parsing
     * @param {object} config user configurations
     * @param {function} cb callback function
     */
    function cbParser(text = '', config = {}, cb = () => {}) {
        try {
            cb(
                null, 
                parserAdapter(text, {
                    logger,
                    ...baseParserConfig,
                    ...utils.prepareConfig(config),
                })
            );
        } catch(err) {
            cb(err);
        };
    };

    /**
     * Function creates and returns promise for parser
     * @param {string} text text for parsing
     * @param {object} config user configurations
     * @returns {Promise} promise with parser work result
     */
    const promiseParser = (text = '', config = {}) => 
        new Promise((resolve, reject) => {
            try {
                resolve(parserAdapter(text, {
                    logger,
                    ...baseParserConfig,
                    ...utils.prepareConfig(config),
                }))
            } catch (err) {
                reject(err);
            }
        })

    /**
     * Function check params types and involves nesessary parser type with params
     * @param  {...any} params 
     * @returns {object} parser work result
     */
    const parserFactory = (...params) => {
        utils.checkParams(...params);

        switch(params.length) {
            case 1:
                return promiseParser(params[0]);
            case 2:
                if (utils.isObject(params[1])) {
                    utils.checkConfigObject(params[1]);
                    return promiseParser(...params);
                }
                if (utils.isFunction(params[1])) {
                    return cbParser(params[0], {}, params[1]);
                }
            case 3:
                utils.checkConfigObject(params[1]);
                return cbParser(...params)
            default:
                return {};
        }
    }

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = parserFactory;
    }
    else {
        if (typeof define === 'function' && define.amd) {
            define([], function() {
                return parserFactory;
            });
        }
        else {
            window.parse = parserFactory;
        }
    }
})();