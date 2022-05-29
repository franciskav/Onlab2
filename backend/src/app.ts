import http from 'http'
import express, {Express} from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import authRouter from './routes/auth'
import placeRouter from './routes/place'
import indexRouter from './routes/index'

dotenv.config()
const app: Express = express()

// Logging
app.use(morgan('dev'))
// Parse the request
app.use(express.urlencoded({extended: false}))
// Takes care of JSON data
app.use(express.json())

// API rules
app.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*')
  // set the CORS headers
  res.header(
    'Access-Control-Allow-Headers',
    'origin, X-Requested-With,Content-Type,Accept, Authorization',
  )
  // set the CORS method headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST')
    return res.status(200).json({})
  }
  next()
})

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/places', placeRouter)

// Error handling
app.use((req, res, next) => {
  const error = new Error('not found')
  return res.status(404).json({
    message: error.message,
  })
})

// Server
const httpServer = http.createServer(app)
const PORT: any = process.env.PORT ?? 6060
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`),
)
