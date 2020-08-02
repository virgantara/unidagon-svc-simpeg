'use strict';

var Simpeg = require('../model/appModel.js');

var response = require('../../res.js');

exports.countHki = function(req, res) {

  Simpeg.countHki(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.countKonferensi = function(req, res) {

  Simpeg.countKonferensi(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.countLuaranLain = function(req, res) {

  Simpeg.countLuaranLain(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.listBuku = function(req, res) {

  Simpeg.listBuku(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.countBuku = function(req, res) {

  Simpeg.countBuku(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.rekapBuku = function(req, res) {

  Simpeg.rekapBuku(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};


exports.listJurnal = function(req, res) {

  Simpeg.listJurnal(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.rekapJurnal = function(req, res) {

  Simpeg.rekapJurnal(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};


exports.countJurnal = function(req, res) {

  Simpeg.countJurnal(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

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