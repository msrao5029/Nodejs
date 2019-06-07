var express = require('express');
var router = express.Router();
var _sqlPackage = require('mssql');

var config = require('./student.json');
console.log(config.name + ' ' + config.department);

//Set up your sql connection string, i am using here my own, you have to replace it with your own.  
var dbConfig = {
  user: "sa",
  password: "yash@123",
  server: "localhost",
  database: "Sample",
  connectionString: "Driver={SQL Server Native Client 11.0};Server=#{server}\\sql;Database=#{database};Uid=#{user};Pwd=#{password};"
};

//Function to connect to database and execute query  
var QueryToExecuteInDatabase = function (response, strQuery) {
  //close sql connection before creating an connection otherwise you will get an error if connection already exists.  
  _sqlPackage.close();
  //Now connect your sql connection  
  _sqlPackage.connect(dbConfig, function (error) {
    if (error) {
      console.log("Error while connecting to database :- " + error);
      response.send(error);
    }
    else {
      //let's create a request for sql object  
      var request = new _sqlPackage.Request();
      //Query to run in our database  
      request.query(strQuery, function (error, responseResult) {
        if (error) {
          console.log("Error while connecting to database:- " + error);
          response.send(error);
        }
        else {
          response.send(responseResult);
        }
      });
    }
  });
}

router.get('/users', function (req, res, next) {
  res.render('index', { title: config.car });
});

// GET API  with inline query
router.get('/', function (_req, _res) {
  console.log('hitting the method get');
  var Sqlquery = "select * from emp"; 
   var employlists = QueryToExecuteInDatabase(_res, Sqlquery);  
  console.log(employlists);
  //_res.render('index', { title: config.name });
});


module.exports = router;