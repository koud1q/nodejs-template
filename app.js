const path = require('path')
const express = require('express')
const { engine } = require('express-handlebars');

const port = 3000
const app = express()

// konfiguracja zasobów statycznych
app.use(express.static(path.join(__dirname, '/public')))

// konfiguracja silnika handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home', { layout: false })
})

// umieszczamy dokładnie przed app.listen()
// 404
app.use((req, res, next) => {
    res.status(404)
    res.send("Sorry can't find that site!")
})

// Błąd serwera 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})