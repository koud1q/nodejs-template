const path = require('path')
const express = require('express')
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser')

const port = 3000
const app = express()

app.use(express.static(path.join(__dirname, '/public')))

app.use(bodyParser.urlencoded({ extended: false }))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home', { layout: false })
})

app.use((req, res, next) => {
    res.status(404)
    res.send("Error 404! Sorry can't find that site!")
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Error 500! Internal server error!')
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})