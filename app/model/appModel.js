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

function getRekapDosenProdi(dataQuery, callback){
    
    var params = []

    var txt = "SELECT p.ID as id, p.nama, COUNT(*) as total FROM user u "
    txt += " JOIN prodi p ON u.id_prod = p.ID "
    txt += " JOIN data_diri d ON d.NIY = u.NIY "
    txt += " WHERE d.status_dosen = 1 AND d.nama <> '-' "
    

    if(dataQuery.fid){
        txt += " AND p.id_fak = ?"
        params.push(dataQuery.fid)
    }

    txt += " GROUP BY p.ID, p.nama"

    sql.query(txt,params,function(err,res){
        if(err) callback(err,null)

        callback(null, res)
    })
}

function getRekapDosenJabfungFakultas(dataQuery, callback){
    
    var params = [dataQuery.id]

    var txt = "SELECT f.ID as id, f.nama, COUNT(*) as total FROM user u "
    txt += " JOIN prodi p ON u.id_prod = p.ID "
    txt += " JOIN fakultas f ON f.ID = p.id_fak "
    txt += " JOIN data_diri d ON d.NIY = u.NIY "
    txt += " WHERE d.status_dosen = 1 AND d.nama <> '-' "
    

    // if(dataQuery.id){
    txt += " AND d.jabatan_fungsional = ?"
    // params.push(dataQuery.id)
    // }

    txt += " GROUP BY f.ID, f.nama"

    sql.query(txt,params,function(err,res){
        if(err) callback(err,null)

        callback(null, res)
    })
}

function getRekapDosenJabfung(dataQuery, callback){
    
    var params = []

    var txt = "SELECT j.id, j.nama, COUNT(*) as total FROM data_diri d "
    txt += " JOIN m_jabatan_akademik j ON j.id = d.jabatan_fungsional "
    txt += " WHERE d.status_dosen = 1 AND d.nama <> '-' "
    

    if(dataQuery.id){
        txt += " AND j.id = ?"
        params.push(dataQuery.id)
    }

    txt += " GROUP BY j.nama, j.id  ORDER BY j.id ASC"

    sql.query(txt,params,function(err,res){
        if(err) callback(err,null)

        callback(null, res)
    })
}

function getRekapDosenFakultas(dataQuery, callback){
    
    var params = []

    var txt = "SELECT f.ID as id, f.nama, COUNT(*) as total FROM user u "
    txt += " JOIN prodi p ON u.id_prod = p.ID "
    txt += " JOIN fakultas f ON f.ID = p.id_fak "
    txt += " JOIN data_diri d ON d.NIY = u.NIY "
    txt += " WHERE d.status_dosen = 1 AND d.nama <> '-' "
    

    if(dataQuery.id){
        txt += " AND f.ID = ?"
        params.push(dataQuery.id)
    }

    txt += " GROUP BY f.ID, f.nama"

    sql.query(txt,params,function(err,res){
        if(err) callback(err,null)

        callback(null, res)
    })
}

function verifikasiLuaranLain(dataPost, callback){
    
    var txt = "UPDATE luaran_lain SET ver = ?, komentar = ? WHERE id = ?; "
    
    let params = [dataPost.ver,dataPost.komentar,dataPost.id]

    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        callback(null, res)
    });
}

function verifikasiHki(dataPost, callback){
    
    var txt = "UPDATE hki SET ver = ?, komentar = ? WHERE id = ?; "
    
    let params = [dataPost.ver,dataPost.komentar,dataPost.id]

    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        callback(null, res)
    });
}

function verifikasiKonferensi(dataPost, callback){
    
    var txt = "UPDATE konferensi SET ver = ?, komentar = ? WHERE ID = ?; "
    
    let params = [dataPost.ver,dataPost.komentar,dataPost.id]

    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        callback(null, res)
    });
}

function verifikasiBuku(dataPost, callback){
    
    var txt = "UPDATE buku SET ver = ?, komentar = ? WHERE ID = ?; "
    
    let params = [dataPost.ver,dataPost.komentar,dataPost.id]

    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        callback(null, res)
    });
}


function verifikasiJurnal(dataPost, callback){
    
    var txt = "UPDATE jurnal SET is_approved = ?, komentar = ? WHERE id = ?; "
    
    let params = [dataPost.is_approved,dataPost.komentar,dataPost.id]

    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        callback(null, res)
    });
}


function listLain(dataQuery, callback){
    let params = []
    var txt = "SELECT h.id, judul, komentar, ver, jl.nama as jenis_luaran, deskripsi, tahun_pelaksanaan as tahun, sumber_dana, berkas, shared_link, (SELECT GROUP_CONCAT(DISTINCT CONCAT('<strong>',dd.nama,'</strong>', ' <br>NIDN : ',dd.NIDN)  ORDER BY ha.id SEPARATOR '<br>') FROM luaran_lain_author ha JOIN user u ON u.NIY = ha.NIY JOIN data_diri dd ON dd.NIY = u.NIY WHERE ha.luaran_lain_id = h.id ) as authors from luaran_lain h "
    txt += " JOIN jenis_luaran jl ON jl.id = h.jenis_luaran_id "
    txt += " WHERE jl.kode = 'LAIN' "
    if(dataQuery.tahun){
        txt += " and tahun_pelaksanaan = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.ver){
        txt += " AND ver = ? "
        params.push(dataQuery.ver)
    }

    txt += " LIMIT "+dataQuery.offset+", 20 "
    // params.push(dataQuery.offset)

    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        callback(null, res)
    });
}

function rekapLain(dataQuery, callback){
    let params = []
    var txt = "SELECT jenis_luaran_id, jl.nama, count(*) as jumlah from luaran_lain h "
    txt += " JOIN jenis_luaran jl ON jl.id = h.jenis_luaran_id "
    txt += " WHERE jl.kode = 'LAIN' "
    if(dataQuery.tahun){
        txt += " and tahun_pelaksanaan = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.ver){
        txt += " AND ver = ? "
        params.push(dataQuery.ver)
    }
    txt += " group by jenis_luaran_id, jl.nama "
    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        callback(null, res)
    });
}


function listHki(dataQuery, callback){
    let params = []
    var txt = "SELECT h.id, komentar, ver, no_pendaftaran, judul, jl.nama as jenis_hki, status_hki, tahun_pelaksanaan as tahun, sumber_dana, berkas, shared_link, (SELECT GROUP_CONCAT(DISTINCT CONCAT('<strong>',dd.nama,'</strong>', ' <br>NIDN : ',dd.NIDN)  ORDER BY ha.id SEPARATOR '<br>') FROM hki_author ha JOIN user u ON u.NIY = ha.NIY JOIN data_diri dd ON dd.NIY = u.NIY WHERE ha.hki_id = h.id ) as authors from hki h "
    txt += " JOIN jenis_luaran jl ON jl.id = h.jenis_hki_id "
    txt += " WHERE jl.kode = 'HKI' "
    if(dataQuery.tahun){
        txt += " and tahun_pelaksanaan = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.ver){
        txt += " AND ver = ? "
        params.push(dataQuery.ver)
    }

    txt += " LIMIT "+dataQuery.offset+", 20 "
    // params.push(dataQuery.offset)

    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        callback(null, res)
    });
}

function rekapHki(dataQuery, callback){
    let params = []
    var txt = "SELECT jenis_hki_id, jl.nama, count(*) as jumlah from hki h "
    txt += " JOIN jenis_luaran jl ON jl.id = h.jenis_hki_id "
    txt += " WHERE ver = 'Sudah Diverifikasi' AND jl.kode = 'HKI' "
    if(dataQuery.tahun){
        txt += " and tahun_pelaksanaan = ? "
        params.push(dataQuery.tahun)
    }
    txt += " group by jenis_hki_id, jl.nama "
    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        callback(null, res)
    });
}

function listKonferensi(dataQuery, callback){
    let params = []
    var txt = "SELECT j.ID, komentar, ver, judul, penyelenggara, link,status_kehadiran, tahun,nama_forum, tingkat_forum, tanggal_mulai, tanggal_selesai, ISBN, sumber_dana, lokasi, (SELECT GROUP_CONCAT(DISTINCT CONCAT('<strong>',dd.nama,'</strong>', ' <br>NIDN : ',dd.NIDN)  ORDER BY ka.id SEPARATOR '<br>') FROM konferensi_author ka JOIN user u ON u.NIY = ka.NIY JOIN data_diri dd ON dd.NIY = u.NIY WHERE ka.konferensi_id = j.ID ) as authors from konferensi j "
    txt += " WHERE 1 "
    if(dataQuery.tahun){
        txt += " and tahun = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.ver){
        txt += " AND ver = ? "
        params.push(dataQuery.ver)
    }
    txt += " LIMIT "+dataQuery.offset+", 20 "
    // params.push(dataQuery.offset)

    sql.query(txt, params, function(err, res){
        if(err){
            console.log(err)
            callback(err,null)  
        } 

        callback(null, res)
    });
}

function rekapKonferensi(dataQuery, callback){
    let params = []
    var txt = "select tingkat_forum as nama, count(*) as jumlah from konferensi j "
    
    txt += " WHERE ver = 'Sudah Diverifikasi'  "
    if(dataQuery.tahun){
        txt += " and tahun = ? "
        params.push(dataQuery.tahun)
    }
    txt += " group by nama "
    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        callback(null, res)
    });
}

function listBuku(dataQuery, callback){
    let params = []
    var txt = "SELECT j.ID, komentar, ver,  judul, penerbit, ISBN, vol, link, tahun from buku j "
    txt += " JOIN jenis_publikasi pub ON pub.id = j.jenis_publikasi_id "
    txt += " WHERE pub.kode = 'BUKU' "
    if(dataQuery.tahun){
        txt += " and tahun = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.ver){
        txt += " AND ver = ? "
        params.push(dataQuery.ver)
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
    var txt = "SELECT id, judul, is_approved, nama_jurnal, eissn, pissn, volume, nomor, halaman, path_berkas, berkas as url, komentar, " 
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT('<strong>',dd.nama,'</strong>', ' <br>NIDN : ',dd.NIDN)  ORDER BY ha.id SEPARATOR '<br>') FROM jurnal_author ha JOIN user u ON u.NIY = ha.NIY JOIN data_diri dd ON dd.NIY = u.NIY WHERE ha.jurnal_id = j.id ) as authors "
    txt += " from jurnal j WHERE 1 "
    
    if(dataQuery.id){
        txt += " and id = ? "
        params.push(dataQuery.id)
    }

    if(dataQuery.tahun){
        txt += " and tahun_terbit = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.is_approved){
        txt += " and is_approved = ? "
        params.push(dataQuery.is_approved)
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
    txt += " where 1 "
    if(dataQuery.tahun){
        txt += " and tahun_pelaksanaan = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.ver){
        txt += " AND ver = ? "
        params.push(dataQuery.ver)
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
    txt += " where 1 "
    if(dataQuery.tahun){
        txt += " and tahun_pelaksanaan = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.ver){
        txt += " AND ver = ? "
        params.push(dataQuery.ver)
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
    txt += " where 1 "
    if(dataQuery.tahun){
        txt += " and tahun = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.ver){
        txt += " AND ver = ? "
        params.push(dataQuery.ver)
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
    txt += " where 1 "
    if(dataQuery.tahun){
        txt += " and tahun_terbit = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.is_approved){
        txt += " AND is_approved = ? "
        params.push(dataQuery.is_approved)
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
    txt += " WHERE  pub.kode = 'BUKU' "
    // txt += " where ver = 'Sudah Diverifikasi' "
    if(dataQuery.tahun){
        txt += " and tahun = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.ver){
        txt += " AND ver = ? "
        params.push(dataQuery.ver)
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
        txt += " AND u.id_prod = ? "
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
Pegawai.listKonferensi = listKonferensi
Pegawai.rekapKonferensi = rekapKonferensi
Pegawai.rekapHki = rekapHki
Pegawai.listHki = listHki
Pegawai.rekapLain = rekapLain
Pegawai.listLain = listLain
Pegawai.verifikasiJurnal = verifikasiJurnal
Pegawai.verifikasiBuku = verifikasiBuku
Pegawai.verifikasiKonferensi = verifikasiKonferensi
Pegawai.verifikasiHki = verifikasiHki
Pegawai.verifikasiLuaranLain = verifikasiLuaranLain
Pegawai.getRekapDosenProdi = getRekapDosenProdi
Pegawai.getRekapDosenFakultas = getRekapDosenFakultas
Pegawai.getRekapDosenJabfung = getRekapDosenJabfung
Pegawai.getRekapDosenJabfungFakultas = getRekapDosenJabfungFakultas
module.exports= Pegawai;