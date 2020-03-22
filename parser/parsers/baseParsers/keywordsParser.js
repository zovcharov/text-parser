const prepareWord = require('../../utils/utils').prepareWord;

/**
 * Function can parse input text by keywords
 * @param {string} text input text for parsing
 * @param {object} config configurations in internal form
 */
const keywordsParser = (text, config) => {
    const keywords = {};
    const htmlTagRegExp = /<[^<>]+>/g;

    /**
     * Check should we use current word or not according config
     * @param {string} word 
     * @returns {boolean}
     */
    const shouldUseWord = word => {
        if (word.length < config.minLength || config.ignoreWords[word]) {
            return false;
        }

        return true;
    }

    text.substr(config.offset, text.length) // Select a substring with offset
        .replace(htmlTagRegExp, '') // Remove all html tags from text
        .split(' ') // Split text by words
        .reduce((acc, curValue) => acc.concat(curValue.split('`')), []) // Convert short collocation ('I`ll'  -> ['I', 'll'])
        .forEach(word => {
            const preparedWord = prepareWord(word);

            if (prepareWord[0] === '<') {
                shouldConsider = false;
            }

            if (shouldUseWord(preparedWord)) {
                keywords[preparedWord] = keywords[preparedWord] ? keywords[preparedWord] + 1 : 1;
            }
        });

    return keywords;
};

module.exports = keywordsParser;