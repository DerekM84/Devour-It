var orm = require("./config/orm.js");

// Code to call ORM functions

var burger = {

    all: function(cb) {
    orm.selectAll("burgers", function(res) {
     cb(res);
      });
    },

    create: function(cols, vals, cb) {
      orm.updateDevoured("burgers", cols, vals, function(res) {
        cb(res);
      });
    },
    
    update: function(objColVals, condition, cb) {
      orm.addBurger("burgers", objColVals, condition, function(res) {
        cb(res);
      });
    },

    delete: function(condition, cb) {
      orm.deleteBurger("burgers", condition, function(res) {
        cb(res);
      });
    }
  };

module.exports = burger;