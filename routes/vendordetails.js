var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('./database');
const { check, validationResult } = require('express-validator/check')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/CreateVendorDetails',[
    check('vendorId').trim().not().isEmpty().withMessage('Enter a vendor').isInt().withMessage('Select a valid vendor.'),
    check('collegeId').trim().not().isEmpty().withMessage('Enter a college').isInt().withMessage('Select a valid college.'),
    check('password').trim().not().isEmpty().withMessage('Enter password'),
    check('email').trim().not().isEmpty().withMessage('Enter a email id').isEmail().withMessage('Enter a valid email id.'),
    check('contact').trim().not().isEmpty().withMessage('Enter a contact detail').isLength({ min: 3 }).withMessage('Enter a valid contact no.'),
    check('isActive').trim().not().isEmpty().withMessage('Enter the status')
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

    db.CreateVendorDetails(req.body, function(err, result){
      if(err) { res.send(500,"Server Error"); return;}
      res.send(data);
    });
});

router.post('/GetVendorDetailsList',function(req, res){
  var data = {
        "vendorDetailsList":"0",
        "statusCode":"1",
        "statusMsg":"No vendor details found."
    };
    db.GetVendorDetailsList(function(err, result) {
      if(err) { res.send(500,"Server Error"); return;}

      if(result.length>0){
        data["vendorDetailsList"] =  result[0];
        data["statusCode"]= "0";
        data["statusMsg"]= "Vendor details list fetched succesfully";
      }

      res.send(data);
    });
});

router.post('/VendorLogin',[
    check('collegeId').trim().not().isEmpty().withMessage('College detail missing').isInt().withMessage('Enter valid college detail.'),
    check('vendorId').trim().not().isEmpty().withMessage('Vendor detail missing').isInt().withMessage('Select a valid vendor detail.'),
    check('password').trim().not().isEmpty().withMessage('Password missing').isLength({min: 8}).withMessage('Enter password must contain 8 characters')
  ],function(req, res){
  var data = {
        "statusCode":"0",
        "statusMsg":"Vendor login successfully."
    };
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    data.statusCode = 1;
    data.statusMsg = errors.array()[0].msg;
    res.send(data);
    return;
  }

    db.VendorLogin(req.body, function(err, result){
      if(err) { res.send(500,"Server Error"); return;}
      res.send(result);
    });
});

router.use("/api/vendordetails",router);
module.exports = router;
