var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

const carddetails = require('./routes/carddetails');
const category = require('./routes/category');
const college = require('./routes/college');
const contact = require('./routes/contact');
const customer = require('./routes/customer');
const menu = require('./routes/menu');
const menudetails = require('./routes/menudetails');
const order = require('./routes/order');
const orderdetails = require('./routes/orderdetails');
const vendor = require('./routes/vendor');
const vendordetails = require('./routes/vendordetails');
const vendortype = require('./routes/vendortype');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sharvari' });
});

router.get('/sharvari', function(request, response) {
  response.send('Hello from sharvari. Have a great day.')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// For local run 
// var server = app.listen(8081, function () {
//    //var host = server.address().address
//    var host = "127.0.0.1";
//    var port = server.address().port
//    console.log("Example app listening at http://%s:%s", host, port)
// })


// For heroku run
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});

app.use('/', carddetails);
app.use('/', category);
app.use('/', college);
app.use('/', contact);
app.use('/', customer);
app.use('/', menu);
app.use('/', menudetails);
app.use('/', order);
app.use('/', orderdetails);
app.use('/', vendor);
app.use('/',vendordetails);
app.use('/', vendortype);

app.use("/api",router);
module.exports = router;
