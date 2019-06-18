const Koa = require("koa")
const cors = require("@koa/cors")
const logger = require("koa-logger")
const bodyParser = require("koa-bodyparser")
const app = new Koa()


app.use(logger())
app.use(cors())
app.use(bodyParser())

app.use(async ctx=>{
    console.log(ctx.url)
    switch (ctx.url) {
        case '/timeout':
            await new Promise((resolve,reject)=>{
                setTimeout(() => {
                    resolve()
                }, 6000)
                ctx.body = 'never'
            })
            break;
        case '/json':
            ctx.body = {a:1}
            break;
        case  '/error':
            ctx.throw(400)
            break;
        case  '/text':
            ctx.body = "this is text"
            break
        default:
            ctx.body = {a:1}
    }
})

app.listen(3000,()=>{
    console.log('koa 正运行')
})
