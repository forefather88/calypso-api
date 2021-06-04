const axios = require('axios');

module.exports = {
    get: (url, params={}, headers={}) => {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params,
                headers
            }).then(resolve).catch(reject);
        })
    },
    post: (url, params={}, headers={}) => {
        return new Promise((resolve, reject) => {
            axios.post(url, params, {
                headers
            }).then(resolve).catch(reject);
        })
    }
}