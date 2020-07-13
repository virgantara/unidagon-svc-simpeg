'use strict';

var Simpeg = require('../model/appModel.js');

var response = require('../../res.js');

exports.getListDosen = function(req, res) {

  Simpeg.getListDosen(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.getListTendik = function(req, res) {

  Simpeg.getListTendik(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};