import express from 'express'
import { PORT } from '../config/servidor.config.js'
import { engine } from 'express-handlebars'
import { routerApi } from '../routers/api.router.js'
import { routerVistas } from '../routers/views.router.js'
import { conectar } from '../database/mongoose.js'
import { Server } from 'socket.io'

await conectar()

const app = express()
const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en puerto ${PORT}`)
})

const io = new Server(server)

io.on('connection', async socket => {
    console.log('cliente nuevo conectado')
})

app.use((req, res, next) => {
    req['io'] = io
    next()
})

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))
app.use(express.json())

app.use('/api', routerApi)
app.use('/', routerVistas)