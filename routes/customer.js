var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('./database');
const { check } = require('express-validator/check')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/CreateCustomer',[
    check('name').trim().not().isEmpty().withMessage('Enter name'),
    check('email').trim().not().isEmpty().withMessage('Enter email'),
    check('contact').trim().not().isEmpty().withMessage('Enter contact'),
    check('id').trim().not().isEmpty().withMessage('Enter price'),
    check('orderId').trim().not().isEmpty().withMessage('Enter a order details')
  ],function(req, res){
  var data = {
        "statusCode":"0",
        "statusMsg":"Customer inserted successfully."
    };
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    data.statusCode = 1;
    data.statusMsg = errors.array()[0].msg;
    res.send(data);
    return;
  }
    db.CreateCustomer(req.body, function(err, result){
      if(err) { res.send(500,"Server Error"); return;}
      res.send(data);
    });
});

router.post('/GetCustomerList',function(req, res){
  var data = {
        "customerList":"",
        "statusCode":"",
        "statusMsg":""
    };
    db.GetCustomerList(function(err, result) {
      if(err) { res.send(500,"Server Error"); return;}
      if(result.length>0){
        data["customerList"] =  result[0];
        data["statusCode"]= "0";
        data["statusMsg"]= "Customer list fetched succesfully";
      }else{
        data["customerList"] =  "0";
        data["statusCode"]= "1";
        data["statusMsg"]= "No Customer found.";
      }
      res.send(data);
    });
});

router.use("/api/customer",router);
module.exports = router;
