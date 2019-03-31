var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('./database');
const { check, validationResult } = require('express-validator/check')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/CreateVendor',[
    check('name').trim().isLength({ min: 3 }).withMessage('Enter a vendor name'),
    check('vendorTypeId').trim().not().isEmpty().withMessage('Enter a vendor type').isInt().withMessage('Select a valid vendor type.'),
    check('imagePath').trim().not().isEmpty().withMessage('Enter an image url').isURL().withMessage('Enter valid image url')
  ],function(req, res){
  var data = {
        "statusCode":"0",
        "statusMsg":"Vendor record inserted successfully."
    };
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    data.statusCode = 1;
    data.statusMsg = errors.array()[0].msg;
    res.send(data);
    return;
  }

    db.CreateVendor(req.body, function(err, result){
      if(err) { res.send(500,"Server Error"); return;}
      res.send(data);
    });
});

router.post('/GetVendorList',function(req, res){
  var data = {
        "vendorList":"0",
        "statusCode":"1",
        "statusMsg":"No vendor found."
    };
    db.GetVendorList(function(err, result) {
      if(err) { res.send(500,"Server Error"); return;}

      if(result.length>0){
        data["vendorList"] =  result[0];
        data["statusCode"]= "0";
        data["statusMsg"]= "Vendor list fetched succesfully";
      }

      res.send(data);
    });
});

router.post('/GetCollegeRestaurantList',[
    check('collegeId').trim().not().isEmpty().withMessage('Enter a college')
  ],function(req, res){
    var data = {
        "restaurantsList":"0",
        "statusCode":"1",
        "statusMsg":"No restaurant found."
    };
    db.GetCollegeRestaurantList(function(err, result) {
      if(err) { res.send(500,"Server Error"); return;}
      if(result.length>0){
        data["restaurantList"] =  result[0];
        data["statusCode"]= "0";
        data["statusMsg"]= "Restaurant list fetched succesfully";
      }
      res.send(data);
    });
});

router.use("/api/vendor",router);
module.exports = router;
