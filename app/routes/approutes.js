'use strict';


module.exports = function(app) {
  var todoList = require('../controller/appController');

  app.route('/simpeg/pub/buku/verify')
    .put(todoList.verifikasiBuku);

  app.route('/simpeg/pub/konferensi/verify')
    .put(todoList.verifikasiKonferensi);

  app.route('/simpeg/pub/luaranlain/verify')
    .put(todoList.verifikasiLuaranLain);

  app.route('/simpeg/pub/hki/verify')
    .put(todoList.verifikasiHki);

  app.route('/simpeg/pub/jurnal/verify')
    .put(todoList.verifikasiJurnal);

  app.route('/simpeg/pub/luaranlain/list')
    .get(todoList.listLain);

  app.route('/simpeg/pub/luaranlain/rekap')
    .get(todoList.rekapLain);

  app.route('/simpeg/pub/hki/list')
    .get(todoList.listHki);

  app.route('/simpeg/pub/hki/rekap')
    .get(todoList.rekapHki);

  app.route('/simpeg/pub/hki/count')
    .get(todoList.countHki);

  app.route('/simpeg/pub/konferensi/list')
    .get(todoList.listKonferensi);

  app.route('/simpeg/pub/konferensi/rekap')
    .get(todoList.rekapKonferensi);

  app.route('/simpeg/pub/konferensi/count')
    .get(todoList.countKonferensi);

  app.route('/simpeg/pub/luaranlain/count')
    .get(todoList.countLuaranLain);

  app.route('/simpeg/pub/jurnal/list')
    .get(todoList.listJurnal);

  app.route('/simpeg/pub/jurnal/count')
    .get(todoList.countJurnal);

  app.route('/simpeg/pub/jurnal/rekap')
    .get(todoList.rekapJurnal);

  app.route('/simpeg/pub/buku/count')
    .get(todoList.countBuku);

  app.route('/simpeg/pub/buku/list')
    .get(todoList.listBuku);

  app.route('/simpeg/pub/buku/rekap')
    .get(todoList.rekapBuku);

  app.route('/simpeg/dosen/list')
    .get(todoList.getListDosen);

  app.route('/simpeg/tendik/list')
    .get(todoList.getListTendik);


};