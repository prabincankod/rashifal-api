# Simple Proxy Scraper
A simple proxy scraper package that scrapes proxies from multiple places on the internet

Current Sites Supported:
[Proxyscrape.com](https://proxyscrape.com)

# Usage

## Initialization
```js
const ProxyScraper = require('simple-proxy-scraper');
```

### Get All Proxies
```js
ProxyScraper.getAllProxies()
```

## Proxyscrape.com

### Get All Proxies
```js
let options = {
    timeout: 1000, //Timeout of proxies in MS
    proxytype: 'all', //Type of proxy - Must be an element of the array ['http', 'socks4', 'socks5', 'all']
    anonimity: 'elite', //Must be an element of the array ['elite', 'anonymous', 'transparent', 'all']
    country: 'us', //Must be a country code
    ssl: 'yes', //Whether proxy has SSL or not - Must be type ['yes', 'no', 'all']
    limit: 1000 //Must be an integer - Amount of proxies it limits response to
}
```
Usage:
```js
ProxyScraper.ProxyScrape.getProxies(options)
```