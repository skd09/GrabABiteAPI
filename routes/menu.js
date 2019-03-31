var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('./database');
const { check, validationResult } = require('express-validator/check')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/CreateMenu',[
    check('categoryId').trim().not().isEmpty().withMessage('Enter a category').isInt().withMessage('Select a valid category.'),
    check('name').trim().not().isEmpty().withMessage('Enter menu name').isLength({ min: 3 }).withMessage('Select a valid menu name.'),
    check('imagePath')
  ],function(req, res){
  var data = {
        "statusCode":"0",
        "statusMsg":"Menu details inserted successfully."
    };
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    data.statusCode = 1;
    data.statusMsg = errors.array()[0].msg;
    res.send(data);
    return;
  }



    db.CreateMenu(req.body, function(err, result)
    {
      if(err) { res.send(500,"Server Error"); return;}
      res.send(data);
    });
});

router.post('/GetMenuList',function(req, res){
  var data = {
        "menuList":"0",
        "statusCode":"1",
        "statusMsg":"No menu found."
    };
    db.GetCategoryList(function(err, result) {
      if(err) { res.send(500,"Server Error"); return;}

      if(result.length>0){
        data["menuList"] =  result[0];
        data["statusCode"]= "0";
        data["statusMsg"]= "Menu list fetched succesfully";
      }

      res.send(data);
    });
});

router.use("/api/menu",router);
module.exports = router;
