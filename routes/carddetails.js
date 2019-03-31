var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('./database');
const { check, validationResult } = require('express-validator/check')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/CreateCardDetails',[
    check('customerId').trim().not().isEmpty().withMessage('Enter a customerId'),
    check('name').trim().not().isEmpty().withMessage('Enter a name'),
    check('cardNumber').trim().not().isEmpty().withMessage('Enter the card number'),
    check('cvv').trim().not().isEmpty().withMessage('Enter a cvv'),
    check('expiryDate').trim().not().isEmpty().withMessage('Enter the expiry date')
  ],function(req, res){
  var data = {
        "statusCode":"0",
        "statusMsg":"Card details inserted successfully."
    };
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    data.statusCode = 1;
    data.statusMsg = errors.array()[0].msg;
    res.send(data);
    return;
  }
    db.CreateCardDetails(req.body, function(err, result){
      if(err) { res.send(500,"Server Error"); return;}
      res.send(data);
    });
});

router.use("/api/carddetails",router);
module.exports = router;
