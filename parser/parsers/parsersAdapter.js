const adapterConf = require('./config/index');

/**
 * 
 * @param {string} text 
 * @param {object} conf 
 * @returns {object}
 */
const parsersAdapter = (text, conf) => 
    Object
        .keys(adapterConf)
        .reduce((adapterResults, currentAdapterName) => ({
            ...adapterResults,
            [currentAdapterName]: adapterConf[currentAdapterName](text, conf)
        }), {});

module.exports = parsersAdapter;