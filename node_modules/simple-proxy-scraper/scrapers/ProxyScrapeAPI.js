const request = require('request-promise');

const apiRoot = 'https://api.proxyscrape.com/'
const proxyTypes = ['http', 'socks4', 'socks5', 'all']
const anonimityTypes = ['elite', 'anonymous', 'transparent', 'all']
const sslTypes = ['yes', 'no', 'all']

function returnParamString(options) {
    let paramString = ''
    if (options.proxytype && proxyTypes.includes(options.proxytype.toLowerCase())) {
        paramString += `&proxytype=${options.proxytype.toLowerCase()}`
    }
    if (options.timeout) {
        paramString += `&timeout=${options.timeout}`
    }
    if (options.anonimity && anonimityTypes.includes(options.anonimity.toLowerCase())) {
        paramString += `&anonimity=${options.anonimity}`
    }
    if (options.country) {
        paramString += `&country=${options.country}`
    }
    if (options.ssl && sslTypes.includes(options.ssl.toLowerCase())) {
        paramString += `&ssl=${options.ssl}`
    }
    if (options.limit) {
        paramString += `&limit=${options.limit}`
    }
    if (options.averagetimeout) {
        paramString += `&averagetimeout=${options.averagetimeout}`
    }
    return paramString;
}

class ProxyScrapeAPI {
    constructor() {
        this.proxies = []
    }

    async getProxies(options) {
        let reqUrl = `${apiRoot}?request=displayproxies${await returnParamString(options)}`
        let res = await request.get(reqUrl, { 
            resolveWithFullResponse: true
        })
        let body = await res.body;
        let proxies = res.body.split('\n').map(line => {if(line.length > 5 && line !== undefined) {return line.replace('\r', '');}})
        console.log(proxies.join('\n'))
	return proxies.filter(Boolean);
    }

    async getAmountProxies(options) {
        let reqUrl = `${apiRoot}?request=amountproxies${await returnParamString(options)}`
        let res = await request.get(reqUrl, { 
            resolveWithFullResponse: true
        })
        let body = await res.body;
        return res.body
    }
}

function test() {
    api = new ProxyScrapeAPI();
    api.getProxies({
        proxytype: 'ssl',
        timeout: 3000,
        country: 'us',
        ssl: 'yes'
    }).then(data => {
        console.log(data.length)
        api.getAmountProxies({
            proxytype: 'ssl',
            timeout: 3000,
            country: 'us',
            ssl: 'yes'
        }).then(data => {console.log(data)})
    })
}
test();
module.exports = ProxyScrapeAPI;
//epic