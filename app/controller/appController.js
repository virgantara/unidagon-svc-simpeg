'use strict';

var Simpeg = require('../model/appModel.js');

var response = require('../../res.js');

exports.getRekapDosenJabfungDetail = function(req, res) {
  Simpeg.getRekapDosenJabfungDetail(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.getListDosenJenjangFakultas = function(req, res) {
  Simpeg.getListDosenJenjangFakultas(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};


exports.getRekapDosenPerfakultas = function(req, res) {
  Simpeg.getRekapDosenPerfakultas(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.countDosen = function(req, res) {
  Simpeg.countDosen(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.getRiwayatPendidikan = function(req, res) {
  Simpeg.getRiwayatPendidikan(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.getProfilDosen = function(req, res) {

  Simpeg.getProfilDosen(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.getRekapDosenJabfungFakultas = function(req, res) {

  Simpeg.getRekapDosenJabfungFakultas(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};


exports.getRekapDosenJabfung = function(req, res) {

  Simpeg.getRekapDosenJabfung(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.getRekapDosenProdi = function(req, res) {

  Simpeg.getRekapDosenProdi(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.getRekapDosenFakultas = function(req, res) {

  Simpeg.getRekapDosenFakultas(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.verifikasiLuaranLain = function(req, res) {

  Simpeg.verifikasiLuaranLain(
    req.body,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.verifikasiHki = function(req, res) {

  Simpeg.verifikasiHki(
    req.body,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.verifikasiKonferensi = function(req, res) {

  Simpeg.verifikasiKonferensi(
    req.body,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.verifikasiBuku = function(req, res) {

  Simpeg.verifikasiBuku(
    req.body,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.verifikasiJurnal = function(req, res) {

  Simpeg.verifikasiJurnal(
    req.body,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.listLain = function(req, res) {

  Simpeg.listLain(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.rekapLain = function(req, res) {

  Simpeg.rekapLain(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};


exports.listHki = function(req, res) {

  Simpeg.listHki(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.rekapHki = function(req, res) {

  Simpeg.rekapHki(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.countHki = function(req, res) {

  Simpeg.countHki(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.listKonferensi = function(req, res) {

  Simpeg.listKonferensi(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    response.ok(values, res);
  });
};

exports.rekapKonferensi = function(req, res) {

  Simpeg.rekapKonferensi(
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