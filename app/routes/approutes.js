'use strict';


module.exports = function(app) {
  var todoList = require('../controller/appController');

  app.route('/simpeg/dosen/publikasi/list')
    .get(todoList.listPublikasiDosen);

  app.route('/simpeg/dosen/rumpunilmu')
    .get(todoList.rekapRumpunIlmuDosen);

  app.route('/simpeg/dosen/bkd/jabatan')
    .get(todoList.getBkdDosenMenjabat);

  app.route('/simpeg/dosen/bkd/telitiabdimas')
    .get(todoList.getBkdDosenRisetAbdimas);

  app.route('/simpeg/dosen/bkd/ajar')
    .get(todoList.getBkdDosenAjar);

  app.route('/simpeg/dosen/anggotaprofesi/list')
    .get(todoList.listSimpegAnggotaProfesi);

  app.route('/simpeg/ewmp/rekap/get')
    .get(todoList.getRekapEwmp);

  app.route('/simpeg/kehadiran')
    .post(todoList.insertKehadiran);

  app.route('/simpeg/rfid/')
    .get(todoList.getDataByRFID);

  app.route('/simpeg/visitingscientist/list')
    .get(todoList.getListVisitingScientist);

  app.route('/simpeg/orasiilmiah/list')
    .get(todoList.getListOrasiIlmiah);

  app.route('/simpeg/pengelolajurnal/list')
    .get(todoList.getListPengelolaJurnal);

  app.route('/simpeg/luaranlain/list')
    .get(todoList.getListLuaranLainEkinerja);

  app.route('/simpeg/buku/list')
    .get(todoList.getListBuku);

  app.route('/simpeg/hki/list')
    .get(todoList.getListHki);

  app.route('/simpeg/dosen/jabfung/list')
    .get(todoList.listDosenJabfung);

  app.route('/simpeg/jurnal/list')
    .get(todoList.getListPublikasiJurnal);

  app.route('/simpeg/pengabdian/list')
    .get(todoList.listSimpegPengabdian);

  app.route('/simpeg/penelitian/list')
    .get(todoList.listSimpegPenelitian);
  
  app.route('/simpeg/penelitian/count')
    .get(todoList.countSimpegPenelitian);

  app.route('/simpeg/pengabdian/count')
    .get(todoList.countSimpegPengabdian);

  app.route('/simpeg/ihsan/count')
    .get(todoList.countRekapIhsan);

  app.route('/simpeg/jabfung/count')
    .get(todoList.countJabfung);

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

  app.route('/simpeg/dosen/nidn/count')
    .get(todoList.getCountDataNIDN);

  app.route('/simpeg/dosen/nidn/list')
    .get(todoList.getListDataNIDN);

  app.route('/simpeg/dosen/serdos/list')
    .get(todoList.getListDataSerdos);

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