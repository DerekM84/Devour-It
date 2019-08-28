var connection = require("../config/connection.js");

// 2 helper functions to produce proper queryStrings submission format for database requests. 

function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) { arr.push("?"); }
    return arr.toString();
}

function objToSql(ob) {
    var arr = [];
    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

//   Build the query requests here, for listing burgers, creating one and deleting one.
var orm = {

    selectAll: function (table, cb) {

        var string = "SELECT * FROM ??";
        connection.query(string , ["burgers"], function (err, res) {
            if (err) throw err;
            console.log(" ");
            cb(res);
        })
    },

    updateDevoured: function (table, objColVals, condition, cb) {
        console.log("made it to here");
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        })
    },

    addBurger: function (table, cols, vals, cb) {
        console.log("vals.length" + vals.length); 
        // producing a string using helper functions for syntax.
        var string = "INSERT INTO " + table;
        string += " (";
        string += cols.toString();
        string += ") ";
        string += "VALUES (";
        string += printQuestionMarks(vals.length);
        string += ") ";
        console.log(string);
        connection.query(string, vals, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },



    deleteBurger: function (table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    }

}

module.exports = orm;