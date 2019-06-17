const controller = new AbortController();
const signal = controller.signal;
let button = document.querySelector("button");
button.onclick = function () {
    controller.abort()
};


const fetchAxios = FetchAxios.create({
    baseURL: "http://localhost:3000",
    headers: new Headers({"content-type": "application/json"}),
    timeout: 5000
})


fetchAxios.interceptors.request.use(async config => {
    console.log(config)
    return config
})

fetchAxios.interceptors.response.use(async response => {
    // 响应成功拦截
    return response
}, err => {
    // 响应失败拦截
    return Promise.reject(err)
})

let promise = fetchAxios({
    url: '/delay',
    method: "post",
    body: {a: 1},
    signal,
})

promise
    .then(res => console.log(res))
    .catch(err => console.log(err))
