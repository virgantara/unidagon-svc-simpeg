'use strict';

var Simpeg = require('../model/appModel.js');

var response = require('../../res.js');

exports.getRekapEwmp = function(req, res) {
  Simpeg.getRekapEwmp(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.insertKehadiran = function(req, res) {
  Simpeg.insertKehadiran(
    req.body,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getDataByRFID = function(req, res) {
  Simpeg.getDataByRFID(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListVisitingScientist = function(req, res) {
  Simpeg.getListVisitingScientist(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};


exports.getListOrasiIlmiah = function(req, res) {
  Simpeg.getListOrasiIlmiah(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};


exports.getListPengelolaJurnal = function(req, res) {
  Simpeg.getListPengelolaJurnal(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListBuku = function(req, res) {
  Simpeg.getListBuku(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListLuaranLainEkinerja = function(req, res) {
  Simpeg.getListLuaranLainEkinerja(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListHki = function(req, res) {
  Simpeg.getListHki(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.listDosenJabfung = function(req, res) {
  Simpeg.listDosenJabfung(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListPublikasiJurnal = function(req, res) {
  Simpeg.getListPublikasiJurnal(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.listSimpegPengabdian = function(req, res) {
  Simpeg.listSimpegPengabdian(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.countSimpegPengabdian = function(req, res) {
  Simpeg.countSimpegPengabdian(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.listSimpegPenelitian = function(req, res) {
  Simpeg.listSimpegPenelitian(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.countSimpegPenelitian = function(req, res) {
  Simpeg.countSimpegPenelitian(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.countRekapIhsan = function(req, res) {
  Simpeg.countRekapIhsan(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.countJabfung = function(req, res) {
  Simpeg.countJabfung(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};


exports.getListDataSerdos = function(req, res) {
  Simpeg.getListDataSerdos(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};


exports.getListDataNIDN = function(req, res) {
  Simpeg.getListDataNIDN(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getCountDataNIDN = function(req, res) {
  Simpeg.getCountDataNIDN(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getCountDataSerdos = function(req, res) {
  Simpeg.getCountDataSerdos(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListLuaranWirausaha = function(req, res) {
  Simpeg.getListLuaranWirausaha(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListLuaranBuku = function(req, res) {
  Simpeg.getListLuaranBuku(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListLuaranMitra = function(req, res) {
  Simpeg.getListLuaranMitra(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListLuaranProduk = function(req, res) {
  Simpeg.getListLuaranProduk(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListLuaranLain = function(req, res) {
  Simpeg.getListLuaranLain(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListLuaranHki = function(req, res) {
  Simpeg.getListLuaranHki(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListLuaranForum = function(req, res) {
  Simpeg.getListLuaranForum(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListLuaranMediaMassa = function(req, res) {
  Simpeg.getListLuaranMediaMassa(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListLuaranJurnal = function(req, res) {
  Simpeg.getListLuaranJurnal(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListMitra = function(req, res) {
  Simpeg.getListMitra(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListAbdimas = function(req, res) {
  Simpeg.getListAbdimas(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListUnitKerja = function(req, res) {
  Simpeg.getListUnitKerja(
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};


exports.getListDosenJenjangJabfung = function(req, res) {
  Simpeg.getListDosenJenjangJabfung(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getRekapDosenJabfungDetail = function(req, res) {
  Simpeg.getRekapDosenJabfungDetail(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getListDosenJenjangFakultas = function(req, res) {
  Simpeg.getListDosenJenjangFakultas(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getRekapDosenPerfakultas = function(req, res) {
  Simpeg.getRekapDosenPerfakultas(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.countDosen = function(req, res) {
  Simpeg.countDosen(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getRiwayatPendidikan = function(req, res) {
  Simpeg.getRiwayatPendidikan(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getProfilDosen = function(req, res) {

  Simpeg.getProfilDosen(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getRekapDosenJabfungFakultas = function(req, res) {

  Simpeg.getRekapDosenJabfungFakultas(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};


exports.getRekapDosenJabfung = function(req, res) {

  Simpeg.getRekapDosenJabfung(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
      response.ok(values, res);
  });
};

exports.getRekapDosenProdi = function(req, res) {

  Simpeg.getRekapDosenProdi(
    req.query,
    function(err, values) {    
    if (err)
      res.send(err);
    else
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