import MyFetch from "./MyFetch";

let myFetch =  MyFetch.create({
    baseURL:"http://localhost:3000",
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    }
})


myFetch.interceptors.request.use(config =>{
    console.log('config',config)
    return config
})

myFetch.interceptors.response.use(async response =>{
    return  response
},err =>{
    console.log(err)
    return Promise.reject(err)
})



;(async () => {
    let res = await myFetch({
        url:'/',
        method:"post",
        // dataType:"text"
    })
    console.log('res',res)
})()
