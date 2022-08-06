const express = require('express')
const app = express()
//-----------------------------------------------------------------------------------------
const path = require('path')
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

app.use(express.static(path.join(__dirname, "client/build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
})

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})


