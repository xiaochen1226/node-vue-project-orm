import type Koa from 'koa'
import fs from 'fs'

export default (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
    fs.readdirSync(__dirname).forEach(async file => {
        if (file === 'index.ts') return
        const router = await require(`./${file}`)
        
        app.use(router.default.routes())
        app.use(router.default.allowedMethods())
    })
}
