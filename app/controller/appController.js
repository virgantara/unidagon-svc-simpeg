'use strict';

var Mahasiswa = require('../model/appModel.js');

var response = require('../../res.js');

exports.getListMahasiswaBelumKrs = function(req, res) {

  Mahasiswa.getListMahasiswaBelumKrs(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};


exports.setApprovalAkpam = function(req, res) {
  Mahasiswa.setApprovalAkpam(req.body, function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};
