const express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	User = require('./models/user'),
	LocalStrategy = require('passport-local'),
	passport = require('passport'),
	passportLocalMongoose = require('passport-local-mongoose');

mongoose
	.connect('mongodb://localhost/Auth_demo', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('Connected to Database!!'))
	.catch((err) => console.log("Couldn't connect to database", err));

app.use(
	require('express-session')({
		secret: 'I love Arielle so much',
		resave: false,
		saveUninitialized: false,
	})
);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=================================
//ROUTES
//=================================

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/secret', (req, res) => {
	res.render('secret');
});

//Auth Routes
//show sign up form
app.get('/register', (req, res) => {
	res.render('register');
});

//handling user sign up
app.post('/register', (req, res) => {
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			return res.render('home');
		} else {
			passport.authenticate('local')(req, res, () => {
				res.redirect('/secret');
			});
		}
	});
});

app.listen(5500, () => {
	console.log('Server listening');
});
