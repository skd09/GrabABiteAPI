var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('./database');
const { check, validationResult } = require('express-validator/check')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/CreateContactRequest',[
    check('name').trim().isLength({ min: 2 }).withMessage('Enter a valid name'),
    check('contact').trim().not().isEmpty().withMessage('Enter contact no'),
    check('email').trim().isEmail().withMessage('Enter valid email id'),
    check('reason').trim().not().isEmpty().withMessage('Enter reason to contact')
  ],function(req, res){
  var data = {
        "statusCode":"0",
        "statusMsg":"We will connect with you soon."
    };
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    data.statusCode = 1;
    data.statusMsg = errors.array()[0].msg;
    res.send(data);
    return;
  }

  db.CreateContactRequest(req.body, function(err, result){
    if(err) { res.send(500,"Server Error"); return;}
    res.send(data);
  });
});

router.post('/GetContactList',function(req, res){
  var data = {
        "contactList":"0",
        "statusCode":"1",
        "statusMsg":"No contact found."
    };
    db.GetCategoryList(function(err, result) {
      if(err) { res.send(500,"Server Error"); return;}

      if(result.length>0){
        data["contactList"] =  result[0];
        data["statusCode"]= "0";
        data["statusMsg"]= "Contact list fetched succesfully";
      }

      res.send(data);
    });
});

router.use("/api/contact",router);
module.exports = router;
