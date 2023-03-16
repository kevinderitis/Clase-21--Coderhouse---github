import express from 'express';
import exphbs from 'express-handlebars';
import viewsRouter from './src/routes/views.js';
import sessionsRouter from './src/routes/sessions.js';
import mongoose from 'mongoose';
import passport from 'passport'
import initializePassport from './src/config/passport.config.js';
import session from 'express-session';

const app = express();

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

const server = app.listen(8080, ()=>console.log ("Listening on port 8080"));
server.on('error', error => console.log(error));
const connection = mongoose.connect ('mongodb+srv://coderhouse:coder123456@codehouse.wecfmdo.mongodb.net/coderhouse?retryWrites=true&w=majority');

initializePassport();

app.use(session({
secret:"CoderSecrets"
}));

app.use(passport.initialize());
app.use("/", viewsRouter);
app.use("/api/sessions",sessionsRouter);
