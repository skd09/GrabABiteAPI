var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('./database');
const { check, validationResult } = require('express-validator/check')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/CreateMenuDetails',[
    check('menuId').trim().not().isEmpty().withMessage('Enter a menu').isInt().withMessage('Select a valid menu.'),
    check('size').trim().not().isEmpty().withMessage('Enter size'),
    check('price').trim().not().isEmpty().withMessage('Enter price')
  ],function(req, res){
  var data = {
        "statusCode":"0",
        "statusMsg":"Vendor details inserted successfully."
    };
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    data.statusCode = 1;
    data.statusMsg = errors.array()[0].msg;
    res.send(data);
    return;
  }
    db.CreateMenuDetails(req.body, function(err, result){
      if(err) { res.send(500,"Server Error"); return;}
      res.send(data);
    });
});

router.post('/GetMenuDetailsList',function(req, res){
  var data = {
        "menuList":"0",
        "statusCode":"1",
        "statusMsg":"No menu details found."
    };
    db.GetMenuDetailsList(function(err, result) {
      if(err) { res.send(500,"Server Error"); return;}

      if(result.length>0){
        data["menuList"] =  result[0];
        data["statusCode"]= "0";
        data["statusMsg"]= "Menu details list fetched succesfully";
      }

      res.send(data);
    });
});

router.use("/api/menudetails",router);
module.exports = router;
