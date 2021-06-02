'use strict';


module.exports = function(app) {
  var todoList = require('../controller/appController');

  app.route('/litab/abdimas/luaran/wirausaha')
    .get(todoList.getListLuaranWirausaha);

  app.route('/litab/abdimas/luaran/buku')
    .get(todoList.getListLuaranBuku);

  app.route('/litab/abdimas/luaran/mitra')
    .get(todoList.getListLuaranMitra);

  app.route('/litab/abdimas/luaran/produk')
    .get(todoList.getListLuaranProduk);

  app.route('/litab/abdimas/luaran/luaranlain')
    .get(todoList.getListLuaranLain);

  app.route('/litab/abdimas/luaran/hki')
    .get(todoList.getListLuaranHki);

  app.route('/litab/abdimas/luaran/forum')
    .get(todoList.getListLuaranForum);

  app.route('/litab/abdimas/luaran/mediamassa')
    .get(todoList.getListLuaranMediaMassa);

  app.route('/litab/abdimas/luaran/jurnal')
    .get(todoList.getListLuaranJurnal);

  app.route('/litab/abdimas/mitra')
    .get(todoList.getListMitra);

  app.route('/simpeg/list/abdimas')
    .get(todoList.getListAbdimas);

  app.route('/simpeg/list/unitkerja')
    .get(todoList.getListUnitKerja);

  app.route('/simpeg/list/dosen/jenjang/jabfung')
    .get(todoList.getListDosenJenjangJabfung);

  app.route('/simpeg/rekap/dosen/jabfung')
    .get(todoList.getRekapDosenJabfungDetail);

  app.route('/simpeg/list/dosen/jenjang/fakultas')
    .get(todoList.getListDosenJenjangFakultas);

  app.route('/simpeg/rekap/dosen/fakultas')
    .get(todoList.getRekapDosenPerfakultas);

  app.route('/simpeg/dosen/count')
    .get(todoList.countDosen);

  app.route('/simpeg/dosen/serdos/count')
    .get(todoList.getCountDataSerdos);

  app.route('/simpeg/dosen/riwayat/pendidikan')
    .get(todoList.getRiwayatPendidikan);

  app.route('/simpeg/dosen/profil')
    .get(todoList.getProfilDosen);

  app.route('/simpeg/dosen/jabfung/fakultas/rekap')
    .get(todoList.getRekapDosenJabfungFakultas);

  app.route('/simpeg/dosen/prodi/rekap')
    .get(todoList.getRekapDosenProdi);

  app.route('/simpeg/dosen/fakultas/rekap')
    .get(todoList.getRekapDosenFakultas);

  app.route('/simpeg/dosen/jabfung/rekap')
    .get(todoList.getRekapDosenJabfung);

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