var express = require('express');
var router = express.Router();
var _sqlPackage = require('mssql');

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

// User login details checking..
router.post('/', function (req, res) {
    _sqlPackage.close();
    var username = req.body.username;
    console.log("username" + username);
    var pwd = req.body.pwd;
    console.log("pwd" + pwd);
    let Sqlquery = "exec GetVerifiedUserDetails @username='" + username + "', @pwd='" + pwd + "';";
    console.log("Sqlquery:::" + Sqlquery);

    var userDetails = QueryToExecuteInDatabase(res, Sqlquery);
    console.log("userDetails:::" + userDetails);
});

// new user registration inserting..
router.post('/registration', function (req, res) {
    _sqlPackage.close();
    var username = req.body.username;
    var pwd = req.body.pwd;
    var email = req.body.email;
    var city = req.body.city;
    let Sqlquery = "exec InsertUserDetails @username='" + username + "', @pwd='" + pwd + "', @email='" + email + "',@city='" + city + "';";
    console.log("Sqlquery:::" + Sqlquery);

    var userDetails = QueryToExecuteInDatabase(res, Sqlquery);
    console.log("userDetails:::" + userDetails);
});

//Insertion
router.post('/StudentsInsertion', function (request, res) {
    debugger;
    _sqlPackage.close();
    var sname = request.body.StudentName;
    var saddress = request.body.SAddrees;
    var SMarks = request.body.SMarks;
    var StateId = request.body.StateID;
    var Gender = request.body.Gender;
    var Options = request.body.Options;
    var SDate = request.body.SDate;
    console.log("Options:::" + SDate);
    let Sqlquery = "exec InsertStudentDetails @StudentName='" + sname + "', @SAddrees='" + saddress + "', "
        + " @SMarks='" + SMarks + "' , @StateID='" + StateId + "', @Gender='" + Gender + "', @Options='" + Options + "',"
        + " @SDate='" + SDate + "'";
    console.log("Sqlquery:::" + Sqlquery);
    var StudentDetails = QueryToExecuteInDatabase(res, Sqlquery);
    console.log("StudentDetails:::" + StudentDetails);
});

//updatation
router.post('/StudentUpdate', function (request, res) {
    debugger;
    _sqlPackage.close();
    var StudentID = request.body.StudentID;
    var sname = request.body.StudentName;
    var saddress = request.body.SAddrees;
    var SMarks = request.body.SMarks;
    var Gender = request.body.gender;
    var Options = request.body.Options;
    let Sqlquery = "exec UpdateStudentDetails @StudentID='" + StudentID + "',@StudentName='" + sname + "', "
        + " @SAddrees='" + saddress + "', @SMarks='" + SMarks + "', @StateId='" + request.body.StateId + "', @Gender='" + Gender + "', @Options='" + Options + "'";
    console.log("Sqlquery:::" + Sqlquery);
    var StudentDetails = QueryToExecuteInDatabase(res, Sqlquery);
    console.log("Update Student Details:::" + StudentDetails);
});

//Deletion
router.post('/StudentDelete', function (request, res) {
    debugger;
    _sqlPackage.close();
    var StudentID = request.body.StudentID;
    let Sqlquery = "exec DeleteStudentDetails @StudentID='" + StudentID + "'";
    console.log("Sqlquery:::" + Sqlquery);
    var StudentDetails = QueryToExecuteInDatabase(res, Sqlquery);
    console.log("Update Student Details:::" + StudentDetails);
});

//States dropdown filling
router.get('/states', function (_req, _res) {

    _sqlPackage.close();
    let Sqlquery = "GetStatesDetails";
    var employlists = QueryToExecuteInDatabase(_res, Sqlquery);
    console.log("employlists:::" + employlists);

});

module.exports = router;
