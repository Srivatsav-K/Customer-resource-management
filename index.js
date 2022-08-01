const express = require('express')
const app = express()
//-----------------------------------------------------------------------------------------
const cors = require('cors')
//-----------------------------------------------------------------------------------------
const configDB = require('./config/database')
configDB()
//-----------------------------------------------------------------------------------------
const router = require('./config/routes')
//-----------------------------------------------------------------------------------------
const dotenv = require('dotenv')
dotenv.config()
//-----------------------------------------------------------------------------------------
const PORT = process.env.PORT || 3080
//-----------------------------------------------------------------------------------------

app.use(cors())
app.use(express.json())
app.use(router)


app.listen(PORT, () => {
    console.log('listening on port', PORT)
})


