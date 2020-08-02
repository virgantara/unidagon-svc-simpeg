'user strict';
var sql = require('../../db.js');

// var unique = require("array-unique").immutable;
var moment = require('moment');
// var async = require('async');
// var await = require('await');
var Promise = require('promise');

//Task object constructor
var Pegawai = function(task){
    
};

function listKonferensi(dataQuery, callback){
    let params = []
    var txt = "SELECT j.ID, judul, penyelenggara, link,status_kehadiran, tahun from konferensi j "
    txt += " JOIN jenis_publikasi pub ON pub.id = j.jenis_publikasi_id "
    txt += " WHERE ver = 'Sudah Diverifikasi' "
    if(dataQuery.tahun){
        txt += " and tahun = ? "
        params.push(dataQuery.tahun)
    }
    txt += " LIMIT "+dataQuery.offset+", 20 "
    // params.push(dataQuery.offset)

    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        callback(null, res)
    });
}

function rekapKonferensi(dataQuery, callback){
    let params = []
    var txt = "select jenis_publikasi_id as pub_id, pub.nama, count(*) as jumlah from konferensi j "
    
    // var txt = "SELECT j.ID, judul, penerbit, ISBN, vol, link, tahun from buku j "
    txt += " JOIN jenis_publikasi pub ON pub.id = j.jenis_publikasi_id "
    txt += " WHERE ver = 'Sudah Diverifikasi'  "
    if(dataQuery.tahun){
        txt += " and tahun = ? "
        params.push(dataQuery.tahun)
    }
    txt += " group by pub_id, pub.nama "
    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        callback(null, res)
    });
}

function listBuku(dataQuery, callback){
    let params = []
    var txt = "SELECT j.ID, judul, penerbit, ISBN, vol, link, tahun from buku j "
    txt += " JOIN jenis_publikasi pub ON pub.id = j.jenis_publikasi_id "
    txt += " WHERE ver = 'Sudah Diverifikasi' AND pub.kode = 'BUKU' "
    if(dataQuery.tahun){
        txt += " and tahun = ? "
        params.push(dataQuery.tahun)
    }
    txt += " LIMIT "+dataQuery.offset+", 20 "
    // params.push(dataQuery.offset)

    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        callback(null, res)
    });
}

function rekapBuku(dataQuery, callback){
    let params = []
    var txt = "select jenis_publikasi_id as pub_id, pub.nama, count(*) as jumlah from buku j "
    
    // var txt = "SELECT j.ID, judul, penerbit, ISBN, vol, link, tahun from buku j "
    txt += " JOIN jenis_publikasi pub ON pub.id = j.jenis_publikasi_id "
    txt += " WHERE ver = 'Sudah Diverifikasi' AND pub.kode = 'BUKU' "
    if(dataQuery.tahun){
        txt += " and tahun = ? "
        params.push(dataQuery.tahun)
    }
    txt += " group by pub_id, pub.nama "
    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        callback(null, res)
    });
}

function listJurnal(dataQuery, callback){
    let params = []
    var txt = "SELECT id, judul, nama_jurnal, eissn, pissn, volume, nomor, halaman, path_berkas, berkas as url from jurnal j WHERE is_approved = 1 "
    if(dataQuery.tahun){
        txt += " and tahun_terbit = ? "
        params.push(dataQuery.tahun)
    }
    txt += " LIMIT "+dataQuery.offset+", 20 "
    // params.push(dataQuery.offset)

    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        callback(null, res)
    });
}

function rekapJurnal(dataQuery, callback){
    let params = []
    var txt = "select jenis_publikasi_id as pub_id, pub.nama, count(*) as jumlah from jurnal j "
    
    txt += " join jenis_publikasi pub ON pub.id = j.jenis_publikasi_id "
    txt += " WHERE is_approved = 1 "
    if(dataQuery.tahun){
        txt += " and tahun_terbit = ? "
        params.push(dataQuery.tahun)
    }
    txt += " group by jenis_publikasi_id, pub.nama "
    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        callback(null, res)
    });
}

function countLuaranLain(dataQuery, callback){
    var params = []

    var txt = "select tahun_pelaksanaan as tahun, count(*) as jumlah from luaran_lain "
    txt += " where ver = 'Sudah Diverifikasi' "
    if(dataQuery.tahun){
        txt += " and tahun_pelaksanaan = ? "
        params.push(dataQuery.tahun)
    }
    txt += " group by tahun_pelaksanaan order by tahun_pelaksanaan "

    sql.query(txt, params, function(err, res){
        if(err) callback(err, null)

        callback(null, res)
    })
}

function countHki(dataQuery, callback){
    var params = []

    var txt = "select tahun_pelaksanaan as tahun, count(*) as jumlah from hki "
    txt += " where ver = 'Sudah Diverifikasi' "
    if(dataQuery.tahun){
        txt += " and tahun_pelaksanaan = ? "
        params.push(dataQuery.tahun)
    }
    txt += " group by tahun_pelaksanaan order by tahun_pelaksanaan "

    sql.query(txt, params, function(err, res){
        if(err) callback(err, null)

        callback(null, res)
    })
}

function countKonferensi(dataQuery, callback){
    var params = []

    var txt = "select tahun as tahun, count(*) as jumlah from konferensi "
    txt += " where ver = 'Sudah Diverifikasi' "
    if(dataQuery.tahun){
        txt += " and tahun = ? "
        params.push(dataQuery.tahun)
    }
    txt += " group by tahun order by tahun "

    sql.query(txt, params, function(err, res){
        if(err) callback(err, null)

        callback(null, res)
    })
}

function countJurnal(dataQuery, callback){
    var params = []

    var txt = "select tahun_terbit as tahun, count(*) as jumlah from jurnal "
    txt += " where is_approved = 1 "
    if(dataQuery.tahun){
        txt += " and tahun_terbit = ? "
        params.push(dataQuery.tahun)
    }

    txt += " group by tahun_terbit order by tahun_terbit "

    sql.query(txt, params, function(err, res){
        if(err) callback(err, null)

        callback(null, res)
    })
}

function countBuku(dataQuery, callback){
    var params = []

    var txt = "select tahun, count(*) as jumlah from buku b "
    txt += " JOIN jenis_publikasi pub ON pub.id = b.jenis_publikasi_id "
    txt += " WHERE ver = 'Sudah Diverifikasi' AND pub.kode = 'BUKU' "
    // txt += " where ver = 'Sudah Diverifikasi' "
    if(dataQuery.tahun){
        txt += " and tahun = ? "
        params.push(dataQuery.tahun)
    }
    txt += " group by tahun order by tahun "

    sql.query(txt, params, function(err, res){
        if(err) callback(err, null)

        callback(null, res)
    })
}

function getListDosen(data,callback){
    var params = []
    var txt = "select d.NIY, d.NIDN, d.nama, d.gender, d.tempat_lahir, d.tanggal_lahir, p.nama as pangkat, p.golongan, j.nama as jabfung, d.jenjang_kode, pr.nama as nama_prodi, u.status, bi.nama as bidang_ilmu from data_diri d "
    txt += " JOIN m_pangkat p on p.id = d.pangkat"
    txt += " JOIN m_jabatan_akademik j on j.id = d.jabatan_fungsional"
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += " JOIN prodi pr ON pr.ID = u.id_prod "
    txt += " LEFT JOIN bidang_ilmu bi ON bi.kode = d.bidang_ilmu_id"
    txt += " LEFT JOIN bidang_ilmu bii ON bii.kode = bi.kode_id"
    txt += " WHERE d.nama <> '-' AND d.status_dosen = 1 "

    if(data.nama){
        txt += " AND d.nama LIKE '%"+data.nama+"%'"
        
    }

    if(data.status){
        txt += " AND u.status = ? "
        params.push(data.status)
    }

    if(data.jenjang_kode){
        txt += " AND d.jenjang_kode = ? "
        params.push(data.jenjang_kode)
    }

    if(data.pangkat){
        txt += " AND d.pangkat = ? "
        params.push(data.pangkat)
    }

    if(data.jabfung){
        txt += " AND d.jabatan_fungsional = ? "
        params.push(data.jabfung)
    }

    if(data.prodi){
        txt += " AND d.jabatan_fungsional = ? "
        params.push(data.prodi)
    }

    txt += " ORDER BY d.nama "
    sql.query(txt,[params],function(err, res){
        if(err){
            console.log(err);
            callback(err,null);
        }
        else{
            
            callback(null, res);
        }
    });
  
}


function getListTendik(data,callback){
    var params = []
    var txt = "select NIY, t.nama, gender, tempat_lahir, tanggal_lahir, t.jenjang_kode, t.jenis_tendik_id, uk.nama as unit_kerja FROM tendik t "
    txt += " JOIN m_jenjang_pendidikan jp on jp.kode = t.jenjang_kode"
    txt += " JOIN m_jabatan_tendik jt on jt.id = t.jabatan_id"
    txt += " JOIN unit_kerja uk on uk.id = t.unit_id"
    txt += " WHERE 1 "

    if(data.nama){
        txt += " AND t.nama LIKE '%"+data.nama+"%'"
    }

    if(data.unit_id){
        txt += " AND t.unit_id = ? "
        params.push(data.unit_id)
    }

    if(data.jenjang_kode){
        txt += " AND t.jenjang_kode = ? "
        params.push(data.jenjang_kode)
    }

    if(data.jabatan_id){
        txt += " AND t.jabatan_id = ? "
        params.push(data.jabatan_id)
    }

    if(data.jenis_tendik_id){
        txt += " AND t.jenis_tendik_id = ? "
        params.push(data.jenis_tendik_id)
    }

    txt += " ORDER BY t.nama "

    sql.query(txt,[params],function(err, res){
        if(err){
            console.log(err);
            callback(err,null);
        }
        else{
            
            callback(null, res);
        }
    });
  
}


Pegawai.getListDosen = getListDosen;
Pegawai.getListTendik = getListTendik
Pegawai.countJurnal = countJurnal
Pegawai.rekapJurnal = rekapJurnal
Pegawai.listJurnal = listJurnal
Pegawai.countBuku = countBuku
Pegawai.listBuku = listBuku
Pegawai.rekapBuku = rekapBuku
Pegawai.countLuaranLain = countLuaranLain
Pegawai.countHki = countHki
Pegawai.countKonferensi = countKonferensi
module.exports= Pegawai;