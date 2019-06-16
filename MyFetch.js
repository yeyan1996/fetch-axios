import InterceptorManager from './InterceptorManager'

export default class MyFetch {
    constructor(instanceConfig = {}) {
        instanceConfig = {
            ...instanceConfig,
            headers: new Headers(instanceConfig.headers),
        }

        function myFetch(config = {}) {
            myFetch.interceptors.response.use(async response => {
                config.dataType = config.dataType || "json"
                return response[config.dataType]()
            })

            let chain = [() => fetch(`${instanceConfig.baseURL + config.url}`, {
                ...config,
                ...instanceConfig
            }), undefined]

            chain.unshift(...myFetch.interceptors.request.handlerList)
            chain.push(...myFetch.interceptors.response.handlerList)

            let promise = Promise.resolve(config)
            while (chain.length) {
                promise = promise.then(chain.shift(), chain.shift())
            }
            return promise
        }

        myFetch.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager()
        }

        myFetch.instanceConfig = instanceConfig
        return myFetch
    }

    static create(instanceConfig) {
        return new MyFetch(instanceConfig)
    }
}


