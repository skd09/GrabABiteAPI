var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('./database');
const { check, validationResult } = require('express-validator/check')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/CreateCategory',[
    check('vendorDetailsId').trim().not().isEmpty().withMessage('Enter a vendor details').isInt().withMessage('Select a valid vendor details.'),
    check('name').trim().not().isEmpty().withMessage('Enter category name').isLength({ min: 3 }).withMessage('Select a valid category name.')
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

    db.CreateCategory(req.body, function(err, result){
      if(err) { res.send(500,"Server Error"); return;}
      res.send(data);
    });
});

router.post('/GetCategoryList',function(req, res){
  var data = {
        "categoryList":"0",
        "statusCode":"1",
        "statusMsg":"No category found."
    };
    db.GetCategoryList(function(err, result) {
      if(err) { res.send(500,"Server Error"); return;}

      if(result.length>0){
        data["categoryList"] =  result[0];
        data["statusCode"]= "0";
        data["statusMsg"]= "Category list fetched succesfully";
      }

      res.send(data);
    });
});

router.use("/api/category",router);
module.exports = router;
