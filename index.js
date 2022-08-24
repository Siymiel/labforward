const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT  || 5000

const app = express()

// Set static folder
app.use(express.static('public'))

// Routes
app.use('/party_plan', require('./routes'))

// Enable CORS
app.use(cors())

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))