const DEFAULT_TIMEOUT = 3000
const isPlainObject = object => Object.prototype.toString.call(object) === '[object Object]'


class FetchAxios {
    constructor(instanceConfig = {}) {

        async function fetchAxios(config = {}) {

            config = {
                ...instanceConfig,
                ...config
            }

            let chain = [
                () => Promise.race([
                    fetch(`${config.baseURL + config.url}`, config),
                    new Promise((_, reject) => {
                        setTimeout(() => {
                            reject('timeout')
                        }, config.timeout || DEFAULT_TIMEOUT)
                    })
                ])
                , undefined
            ]

            chain = [
                ...fetchAxios.interceptors.request.handlerList,
                ...chain,
                ...[
                    async function EXTEND_RESPONSE(response) {
                        response.config = config
                        return response
                    },
                    undefined
                ],
                ...fetchAxios.interceptors.response.handlerList
            ]

            let promise = Promise.resolve(config)

            while (chain.length) {
                promise = promise.then(chain.shift(),chain.shift())
            }

            return promise
        }

        fetchAxios.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager()
        }

        fetchAxios.instanceConfig = instanceConfig
        return fetchAxios
    }

    static create(instanceConfig) {
        let fetchAxios =  new FetchAxios(instanceConfig)

        // 默认请求拦截器,会先比自定义请求拦截器先触发
        fetchAxios.interceptors.request.use(async config => {
            if(isPlainObject(config.body))
                config.body = JSON.stringify(config.body)
            return config
        })

        // 默认响应拦截器,会先比自定义响应拦截器先触发
        fetchAxios.interceptors.response.use(async response => {
            // 当 ok 为 false 时，返回一个 reject 的 promise
            if (!response.ok) return Promise.reject(response)
            let responseType = response.config.responseType  || "json"
            return await response[responseType]()
        })

        return fetchAxios
    }
}
