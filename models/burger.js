var orm = require("../config/orm.js");

var burger = {

    all: function(cb) {
    orm.selectAll("burgers", function(res) {
      console.log(res);
     cb(res);
      });
    },

    create: function(cols, vals, cb) {
      orm.addBurger("burgers", cols, vals, function(res) {
        cb(res);
      });
    },

    update: function(objColVals, condition, cb) {
      orm.updateDevoured("burgers", objColVals, condition, function(res) {
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