# fetch-axios
一个基于 fetch 请求库

## 创建实例
```javascript
const fetchAxios = FetchAxios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: new Headers({'X-Custom-Header': 'foobar'})
});
```

## 请求配置

> 基于 fetch 的请求格式增加了 axios 的扩展

```javascript
{
    // `url` 是用于请求的服务器 URL
    url: '/user',
    // `method` 是创建请求时使用的方法
    method: 'get',
    // `headers` 是即将被发送的自定义请求头
    headers: new Headers({'X-Requested-With': 'XMLHttpRequest'}),
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: 'https://some-domain.com/api/',
    // 对象会被自动处理为 JSON 字符串
    body: {
        firstName: 'Fred'
    },
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout: 1000,
    // `credentials` 表示跨域请求时是否需要使用凭证，fetch 请求默认不会携带跨域 cookie
    credentials: 'include',
    // `signal` 为原生的取消信号，通过 (new AbortController()).abort() 取消 fetch 请求
    signal:(new AbortController()).signal
}
```
