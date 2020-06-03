const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost/Auth_demo', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('Connected to Database!!'))
	.catch((err) => console.log("Couldn't connect to database", err));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/secret', (req, res) => {
	res.render('secret');
});

app.listen(5500, () => {
	console.log('Server listening');
});
