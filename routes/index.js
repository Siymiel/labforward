const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')

const API_BASE_URL = 'https://api.brightsky.dev/weather'

router.get('/', async (req, res) => {
    try {
        // console.log(url.parse(req.url, true).query);
        const params = new URLSearchParams({
          ...url.parse(req.url, true).query, 
        })
        
        const apiRes = await needle('get', `${API_BASE_URL}?${params}`)
        const data = apiRes.body

        if (process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${API_BASE_URL}?${params}`)
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router