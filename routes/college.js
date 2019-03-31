var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('./database');
const { check, validationResult } = require('express-validator/check')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/GetCollegeList',function(req, res){
  var data = {
        "collegeList":"0",
        "statusCode":"1",
        "statusMsg":"No College found."
    };
    db.GetCollegeList(function(err, result) {
      if(err) { res.send(500,"Server Error"); return;}
      if(result.length>0){
        data["collegeList"] =  result[0];
        data["statusCode"]= "0";
        data["statusMsg"]= "College list fetched succesfully";
      }
      res.send(data);
    });
});


router.post('/CreateCollege',[
    check('name').trim().not().isEmpty().withMessage('Enter a name'),
    check('address').trim().not().isEmpty().withMessage('Enter a address'),
    check('campus').trim().not().isEmpty().withMessage('Enter a campus'),
    check('contact').trim().not().isEmpty().withMessage('Enter a contact'),
    check('password').trim().not().isEmpty().withMessage('Enter a password')
  ],function(req, res){
  var data = {
        "statusCode":"0",
        "statusMsg":"College inserted successfully."
    };
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    data.statusCode = 1;
    data.statusMsg = errors.array()[0].msg;
    res.send(data);
    return;
  }
    db.CreateCollege(req.body, function(err, result){
      if(err) { res.send(500,"Server Error"); return;}
      res.send(data);
    });
});

router.post('/UpdatedCollege',[
    check('collegeId').trim().not().isEmpty().withMessage('Enter a college'),
    check('name').trim().not().isEmpty().withMessage('Enter a name'),
    check('campus').trim().not().isEmpty().withMessage('Enter a campus'),
    check('password').trim().not().isEmpty().withMessage('Enter a password')
  ],function(req, res){
    var data = {
          "statusCode":"0",
          "statusMsg":"College updated successfully."
      };
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      data.statusCode = 1;
      data.statusMsg = errors.array()[0].msg;
      res.send(data);
      return;
    }
    db.UpdatedCollege(req.body, function(err, result){
      if(err) { res.send(500,"Server Error"); return;}
      res.send(data);
    });
});

router.post('/CheckCollegeLogin',[
  check('name').trim().not().isEmpty().withMessage('Enter name'),
  check('campus').trim().not().isEmpty().withMessage('Enter campus'),
  check('password').trim().not().isEmpty().withMessage('Emter password')
],function(req, res){
var data = {
      "statusCode":"0",
      "statusMsg":"College login successfully."
  };
const errors = validationResult(req);

if (!errors.isEmpty()) {
  data.statusCode = 1;
  data.statusMsg = errors.array()[0].msg;
  res.send(data);
  return;
}

  db.CollegeLogin(req.body, function(err, result){
    if(err) { res.send(500,"Server Error"); return;}
    res.send(result);
  });
});

router.use("/api/college",router);
module.exports = router;
