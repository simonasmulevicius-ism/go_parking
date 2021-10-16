const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


// Start of Helper pages
app.get('/cart.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'cart.html'));
});
app.get('/chat.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'chat.html'));
});
app.get('/checkout.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'checkout.html'));
});
app.get('/contact.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});
app.get('/edit-profile.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'edit-profile.html'));
});
app.get('/index.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/login.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
app.get('/notification.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'notification.html'));
});
app.get('/order.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'order.html'));
});
app.get('/profile.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'profile.html'));
});
app.get('/register.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});
app.get('/search.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'search.html'));
});
app.get('/shop-list.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'shop-list.html'));
});
app.get('/shop-product.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'shop-product.html'));
});
app.get('/shop.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'shop.html'));
});
app.get('/success.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'success.html'));
});
app.get('/wishlist.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'wishlist.html'));
});

app.get('/', (req, res, next) => {
    console.log('Serving a home page from: ' + path.join(__dirname, 'views', 'index.html'));
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
  
app.use((req, res, next) => {
  console.log('Page not found!');
  console.log('req.originalUrl: ' + req.originalUrl);
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})