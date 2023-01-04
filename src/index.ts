import app from './app/index'
import config from './app/config'
import './app/database'

app.listen(config.APP_PORT,() => {
    console.log('服务器在'+ config.APP_PORT +'启动成功');
})