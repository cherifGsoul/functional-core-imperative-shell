import express, { Application } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import cartRouter from './shell';

const app: Application = express();

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '..',  'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(session({
    secret: 'foobarbaz',
    resave: true,
    saveUninitialized: false
}));

declare module 'express-session' {
    export interface SessionData {
        cartId:  string
    }
}
app.use('/', cartRouter)

app.listen(3000, () => {
    console.log(`Functional Core Imperative Shell running on port 3000`)
});