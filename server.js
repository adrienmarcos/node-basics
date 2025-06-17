const path = require('path')
const rootDirectory = require('./utils/path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(rootDirectory, 'public')))
app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDirectory, 'views', '404.html'))
})

app.listen(3000)
