var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('./database');
const { check, validationResult } = require('express-validator/check')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/GetVendorTypeList',function(req, res){
  var data = {
        "vendorTypeList":"0",
        "statusCode":"1",
        "statusMsg":"No College found."
    };
    db.GetVendorTypeList(function(err, result) {
      if(err) { res.send(500,"Server Error"); return;}

      if(result.length>0){
        data["vendorTypeList"] =  result[0];
        data["statusCode"]= "0";
        data["statusMsg"]= "Vendor type list fetched succesfully";
      }

      res.send(data);
    });
});


router.use("/api/vendortype",router);
module.exports = router;
