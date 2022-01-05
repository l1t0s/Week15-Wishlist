const express = require('express');
const Wish = require('./model/wish');

const app = express();

app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/', (req, res) => {
    Wish.fetchAllWishes(wishesFromFile => {
        console.log(wishesFromFile);
        res.render('index', {myWishes: wishesFromFile});
    });
});

app.post('/wish', (req, res) => {
    let userData = req.body.userWish;

    let newWish = new Wish(userData);
    newWish.saveWish();
    res.redirect('/');
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server is running ${port}.`);
});