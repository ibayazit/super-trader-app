'use strict'

require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { ValidationError } = require('express-validation')

const db = require('./database/models/index')
const errorHandler = require('./utils/error-handler')
const routeNotFound = require('./utils/not-found')
const routeUser = require('./app/routes/user.route')
const routeShare = require('./app/routes/share.route')
const routeTrade = require('./app/routes/trade.route')

// Config
const PORT = process.env.APP_PORT || 3000
const corsOptions = '*'

const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/users', routeUser)
app.use('/api/v1/shares', routeShare)
app.use('/api/v1/trade', routeTrade)
app.use(routeNotFound)

app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(errorHandler(err))
    }

    return res.status(500).json(err)
})

const init = async () => {
    try {
        await db.sequelize.authenticate()
            .then(() => {
                console.log("Connection has been established successfully");
            })

        await db.sequelize.sync()
            .then(() => {
                console.log("All models were synchronized successfully");
            })

        app.listen(PORT, () => {
            console.info(`App initialized on port ${PORT}`)
        })
    } catch (error) {
        console.error('App couldn\'t initialized', error)
    }
}

init()