var mysql = require('mysql');


 var con = mysql.createConnection({
   debug: true,
   host: "sql9.freemysqlhosting.net",
   user: "sql9283924",
   password: "NwmIzE8Hpc",
   database: "sql9283924",
   multipleStatements: true
});

/*var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sharvari",
  database: "GrabIt",
  multipleStatements: true
});*/

con.connect(function(err) {
    if (err) {
      console.log("err------------"+err)
      throw err;
    }
    console.log("Connected!");
});

/*--------------------------College--------------------------*/
exports.GetCollegeList = function(callback) {
  con.query('call GetCollegeList()', function (err, result){
      //con.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};

exports.CreateCollege= function(data, callback) {
  con.query('call InsertCollege('+
    '"'+data.name+'","'+data.address+'","'+data.campus+'","'+
    '""/'+data.contact+'","'+data.password+'")', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};

exports.UpdatedCollege= function(data, callback) {
  con.query('call UpdatedCollege('+
    '"'+data.collegeId+'","'+data.name+'","'+data.campus+'","'+
    '"'+data.password+'")', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};

exports.CollegeLogin = function(data, callback) {
  con.query(('call CheckCollegeLogin('+
    '"'+data.name+'","'+data.campus+'",'+
    '"'+data.password+'", @collegeId); SELECT @collegeId;'), function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};
/*--------------------------College--------------------------*/


/*--------------------------Customer--------------------------*/
exports.GetCustomerList = function(callback) {
  con.query('call GetCustomerList()', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};

exports.CreateCustomer= function(data, callback) {
  con.query('call InsertCustomer('+
    '"'+data.name+'","'+data.email+'","'+data.contact+'","'+
    '"'+data.id+'","'+data.orderId+')', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};
/*--------------------------College--------------------------*/


/*--------------------------Vendor---------------------------*/
exports.CreateVendor = function(data, callback) {
  con.query('call InsertVendor('+
    '"'+data.name+'","'+data.vendorTypeId+'",'+
    '"'+data.imagePath+'")', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};

exports.GetVendorList = function(callback) {
  con.query('call GetVendorList()', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};
/*--------------------------Vendor---------------------------*/


/*----------------------Vendor Details-----------------------*/
exports.CreateVendorDetails = function(data, callback) {
  con.query('call InsertVendorDetails('+
    '"'+data.vendorId+'","'+data.collegeId+'",'+
    '"'+data.password+'","'+data.email+'",'+
    '"'+data.contact+'","'+data.isActive+'")', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};

exports.GetVendorDetailsList = function(callback) {
  con.query('call GetVendorDetailsList()', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};

  exports.VendorLogin = function(data, callback) {
    con.query(('call CheckVendorLogin('+
      '"'+data.collegeId+'","'+data.vendorId+'",'+
      '"'+data.password+'", @vendorDetailsId); SELECT @vendorDetailsId;'), function (err, result){
        if(err) { console.log(err); callback(true); return; }
        callback(false, result);
    });
  };

  exports.GetCollegeRestaurantList = function(callback) {
    con.query('call GetCollegeRestaurantList("'+data.collegeId+'")', function (err, result){
        if(err) { console.log(err); callback(true); return; }
        callback(false, result);
    });
  };
/*----------------------Vendor Details-----------------------*/


/*------------------------Vendor Type------------------------*/
exports.GetVendorTypeList = function(callback) {
  con.query('call GetVendorTypeList()', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};
/*------------------------Vendor Type------------------------*/


/*-------------------------Category--------------------------*/
exports.CreateCategory= function(data, callback) {
  con.query('call InsertCategory('+
    '"'+data.vendorDetailsId+'","'+data.name+'")', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};

exports.GetCategoryList = function(callback) {
  con.query('call GetCategoryList()', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};
/*-------------------------Category--------------------------*/


/*---------------------------Menu----------------------------*/
exports.CreateMenu= function(data, callback) {
  con.query('call InsertMenu('+
    '"'+data.categoryId+'","'+data.name+'","'+data.imagePath+'")', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};

exports.GetMenuList = function(callback) {
  con.query('call GetMenuList()', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};
/*---------------------------Menu----------------------------*/


/*-----------------------Menu Details------------------------*/
exports.CreateMenuDetails= function(data, callback) {
  con.query('call InsertMenuDetails('+
    '"'+data.menuId+'","'+data.size+'","'+data.price+'")', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};

exports.GetMenuDetailsList = function(callback) {
  con.query('call GetMenuDetailsList()', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};
/*-----------------------Menu Details------------------------*/


/*-----------------------Card Details------------------------*/
exports.CreateCardDetails= function(data, callback) {
  con.query('call InsertCardDetails('+
    '"'+data.customerId+'","'+data.name+'","'+data.cardNumber+'","'+
    '"'+data.cvv+'","'+data.expiryDate+')', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};
/*-----------------------Card Details------------------------*/


/*----------------------Contact Request----------------------*/
exports.CreateContactRequest = function(data, callback) {
  con.query('call InsertContactRequest('+
    '"'+data.name+'","'+data.contact+'",'+
    '"'+data.email+'","'+data.reason+'")', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};

exports.GetContactList = function(callback) {
  con.query('call GetContactRequestList()', function (err, result){
      if(err) { console.log(err); callback(true); return; }
      callback(false, result);
  });
};
/*----------------------Contact Request----------------------*/
