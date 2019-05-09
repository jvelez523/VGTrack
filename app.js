require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");

// Add the Firebase products that you want to use
const fauth = require("firebase/auth");
const fstore = require('firebase/firestore')

//Firebase Configuration and Initialization
const firebaseconfig = {
  apiKey: "AIzaSyDCAEgf8Yx1CMWZvnD3b8ycnmkllg8hF0g",
  authDomain: "vgtrack-b9f8f.firebaseapp.com",
  databaseURL: "https://vgtrack-b9f8f.firebaseio.com",
  projectId: "vgtrack-b9f8f",
  storageBucket: "vgtrack-b9f8f.appspot.com",
  messagingSenderId: "270951071368"
};
firebase.initializeApp(firebaseconfig);


mongoose
  //.connect('mongodb://localhost/gametrack', {useNewUrlParser: true})
  .connect('mongodb+srv://justin:ironhack@vgtrack-u5i2p.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})
  //mongodb+srv://justin:<password>@vgtrack-u5i2p.mongodb.net/test?retryWrites=true
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));





// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



const index = require('./routes/index');
app.use('/', index);


module.exports = app;
