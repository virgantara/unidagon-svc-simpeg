'user strict';
var sql = require('../../db.js');

// var unique = require("array-unique").immutable;
var moment = require('moment');
var jsStringEscape = require('js-string-escape')
// var async = require('async');
// var await = require('await');
var Promise = require('promise');

//Task object constructor
var Pegawai = function(task){
    
};

function getListDosenJenjangJabfung(dataQuery, callback){
    var params = []

    txt = " select dd.NIDN, dd.nama as dosen, f.nama as fakultas, p.nama as prodi, ja.nama as jabfung "
    txt += " from data_diri dd "
    txt += " JOIN user u ON u.NIY = dd.NIY "
    txt += " JOIN prodi p ON u.id_prod = p.ID "
    txt += " JOIN fakultas f ON f.ID = p.id_fak "
    txt += " JOIN m_jabatan_akademik ja ON ja.id = dd.jabatan_fungsional "
    txt += " where u.status = 'aktif' AND LENGTH(dd.NIDN) > 9 "
    if(dataQuery.jenjang){
        txt += " and dd.jenjang_kode = ? "
        params.push(dataQuery.jenjang)
    }

    if(dataQuery.jabfung){
        txt += " and ja.kode = ? "
        params.push(dataQuery.jabfung)
    }

    if(dataQuery.status_dosen){
        txt += " and dd.status_dosen = ? "
        params.push(dataQuery.status_dosen)
    }

    sql.query(txt, params, function(err, res){
        if(err){
            console.log(err)
            callback(err,null)
        }

        callback(null, res)
    })
}


function getRekapDosenJabfungDetail(dataQuery, callback){
    var params = []

    txt = " select dd.jenjang_kode, jp.nama_lain2, "
    txt += " (SELECT count(*) FROM data_diri d JOIN m_jabatan_akademik ja ON ja.id = d.jabatan_fungsional JOIN user uu ON uu.NIY = d.NIY WHERE uu.status = 'aktif' AND ja.kode = 'GB' and d.jenjang_kode = dd.jenjang_kode AND d.status_dosen = dd.status_dosen AND LENGTH(d.NIDN) > 9) as gb, "
    txt += " (SELECT count(*) FROM data_diri d JOIN m_jabatan_akademik ja ON ja.id = d.jabatan_fungsional JOIN user uu ON uu.NIY = d.NIY WHERE uu.status = 'aktif' AND ja.kode = 'LK' and d.jenjang_kode = dd.jenjang_kode AND d.status_dosen = dd.status_dosen AND LENGTH(d.NIDN) > 9) as lk, "
    txt += " (SELECT count(*) FROM data_diri d JOIN m_jabatan_akademik ja ON ja.id = d.jabatan_fungsional JOIN user uu ON uu.NIY = d.NIY WHERE uu.status = 'aktif' AND ja.kode = 'L' and d.jenjang_kode = dd.jenjang_kode AND d.status_dosen = dd.status_dosen AND LENGTH(d.NIDN) > 9) as l, "
    txt += " (SELECT count(*) FROM data_diri d JOIN m_jabatan_akademik ja ON ja.id = d.jabatan_fungsional JOIN user uu ON uu.NIY = d.NIY WHERE uu.status = 'aktif' AND ja.kode = 'AA' and d.jenjang_kode = dd.jenjang_kode AND d.status_dosen = dd.status_dosen AND LENGTH(d.NIDN) > 9) as aa, "
    txt += " (SELECT count(*) FROM data_diri d JOIN m_jabatan_akademik ja ON ja.id = d.jabatan_fungsional JOIN user uu ON uu.NIY = d.NIY WHERE uu.status = 'aktif' AND ja.kode = 'TT' and d.jenjang_kode = dd.jenjang_kode AND d.status_dosen = dd.status_dosen AND LENGTH(d.NIDN) > 9 ) as tt "
    txt += " from data_diri dd "
    txt += " JOIN m_jenjang_pendidikan jp ON jp.kode = dd.jenjang_kode "
    txt += " JOIN user u ON u.NIY = dd.NIY "
    txt += " WHERE u.status = 'aktif' AND LENGTH(dd.NIDN) > 9 "
    if(dataQuery.status_dosen){
        txt += " AND dd.status_dosen = ? "
        params.push(dataQuery.status_dosen)
    }
    txt += " GROUP BY dd.jenjang_kode, jp.nama_lain2 ORDER BY kode DESC"

    sql.query(txt, params, function(err, res){
        if(err){
            console.log(err)
            callback(err,null)
        }

        callback(null, res)
    })
}

function getListDosenJenjangFakultas(dataQuery, callback){
    var params = []

    txt = " select dd.NIDN, dd.nama as dosen, f.nama as fakultas, p.nama as prodi "
    txt += " from data_diri dd "
    txt += " JOIN user u ON u.NIY = dd.NIY "
    txt += " JOIN prodi p ON u.id_prod = p.ID "
    txt += " JOIN fakultas f ON f.ID = p.id_fak "
    txt += " where u.status = 'aktif' AND LENGTH(dd.NIDN) > 9 "
    if(dataQuery.jenjang){
        txt += " and dd.jenjang_kode = ? "
        params.push(dataQuery.jenjang)
    }

    if(dataQuery.status_dosen){
        txt += " and dd.status_dosen = ? "
        params.push(dataQuery.status_dosen)
    }

    if(dataQuery.fakultas){
        txt += " and f.ID = ? "
        params.push(dataQuery.fakultas)
    }

    sql.query(txt, params, function(err, res){
        if(err){
            console.log(err)
            callback(err,null)
        }

        callback(null, res)
    })
}

function getRekapDosenPerfakultas(dataQuery, callback){
    
    var params = []

    txt = " select f.ID as fid, "
    txt += " (SELECT count(*) from data_diri ddd JOIN user uu ON uu.NIY = ddd.NIY JOIN prodi pp ON uu.id_prod = pp.ID JOIN fakultas ff ON ff.ID = pp.id_fak WHERE ddd.jenjang_kode = 'S2' AND ff.ID = f.ID AND ddd.status_dosen = dd.status_dosen AND uu.status = 'aktif' AND LENGTH(ddd.NIDN) > 9 ) as S2, "
    txt += " (SELECT count(*) from data_diri ddd JOIN user uu ON uu.NIY = ddd.NIY JOIN prodi pp ON uu.id_prod = pp.ID JOIN fakultas ff ON ff.ID = pp.id_fak WHERE ddd.jenjang_kode = 'S3' AND ff.ID = f.ID AND ddd.status_dosen = dd.status_dosen AND uu.status = 'aktif' AND LENGTH(ddd.NIDN) > 9) as S3, "
    txt += " (SELECT count(*) from data_diri ddd JOIN user uu ON uu.NIY = ddd.NIY JOIN prodi pp ON uu.id_prod = pp.ID JOIN fakultas ff ON ff.ID = pp.id_fak WHERE ddd.jenjang_kode = 'PROFESI' AND ff.ID = f.ID AND ddd.status_dosen = dd.status_dosen AND uu.status = 'aktif' AND LENGTH(ddd.NIDN) > 9) as PROFESI "
    txt += " from data_diri dd "
    txt += " JOIN user u ON u.NIY = dd.NIY "
    txt += " JOIN prodi p ON u.id_prod = p.ID "
    txt += " JOIN fakultas f ON f.ID = p.id_fak "
    txt += " where u.status = 'aktif' AND LENGTH(dd.NIDN) > 9  "
    if(dataQuery.status_dosen){
        txt += " and dd.status_dosen = ? "
        params.push(dataQuery.status_dosen)
    }

    if(dataQuery.fid){
        txt += " and f.ID = ? "
        params.push(dataQuery.fid)
    }

    txt += " group by f.ID"

    sql.query(txt, params, function(err, res){
        if(err){
            console.log(err)
            callback(err,null)
        }

        callback(null, res)
    })
}

function countDosen(dataQuery, callback){
    var params = []

    var txt = "SELECT COUNT(*) as total FROM user u "
    txt += " JOIN prodi p ON u.id_prod = p.ID "
    txt += " JOIN data_diri d ON d.NIY = u.NIY "
    txt += " WHERE d.status_dosen = 1 AND d.nama <> '-' "

    if(dataQuery.prodi){
        txt += " AND p.kode_prod = ? "
        params.push(dataQuery.prodi)
    }

    sql.query(txt,params,function(err,res){
        if(err) {
            console.log(err)
            callback(err,null)
        }

        if(res[0].total){
            let hsl = {
                label : 'dsn',
                total : res[0].total
             }    
            callback(null, hsl);
        }
        else{
            let hsl = {
                label : 'dsn',
                total : 0
             }
            callback(null, hsl);
        }
       
    })
}

function getRiwayatPendidikan(data,callback){
    var params = [data.NIY]
    var txt = "select ID, NIY, tahun_lulus, jenjang, perguruan_tinggi, jurusan FROM pendidikan"
    txt += " WHERE NIY = ?; "

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

function getProfilDosen(data,callback){
    var params = []
    var txt = "select d.NIY, d.NIDN, d.nama, d.gender, u.email, d.tempat_lahir, "
    txt += " d.tanggal_lahir, p.nama as pangkat, p.golongan, j.nama as jabfung, "
    txt += " d.jenjang_kode, pr.nama as nama_prodi, u.status, bi.nama as bidang_ilmu, "
    txt += " bii.nama as bidang_ilmu_induk, bk.nama as kepakaran, bkp.nama as parent_kepakaran, "
    txt += " d.permalink, d.expertise from data_diri d "
    txt += " JOIN m_pangkat p on p.id = d.pangkat"
    txt += " JOIN m_jabatan_akademik j on j.id = d.jabatan_fungsional"
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += " JOIN prodi pr ON pr.ID = u.id_prod "
    txt += " LEFT JOIN bidang_ilmu bi ON bi.kode = d.bidang_ilmu_id"
    txt += " LEFT JOIN bidang_ilmu bii ON bii.kode = bi.kode_id "
    txt += " LEFT JOIN bidang_kepakaran bk ON bk.id = d.kepakaran_id"
    txt += " LEFT JOIN bidang_kepakaran bkp ON bkp.kode = bk.parent"
    txt += " WHERE 1  "

    if(data.permalink){
        txt += " AND d.permalink = ? "
        params.push(data.permalink)
    }

    if(data.NIY){
        txt += " AND d.NIY = ? "
        params.push(data.NIY)
    }

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
    var txt = "SELECT h.id, judul, komentar, ver, jl.nama as jenis_luaran, deskripsi, "
    txt += " tahun_pelaksanaan as tahun, sumber_dana, berkas, shared_link, "
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT('<strong>',dd.nama,'</strong>', ' <br>NIDN : ',dd.NIDN) "
    txt += " ORDER BY ha.id SEPARATOR '<br>') FROM luaran_lain_author ha JOIN user u ON u.NIY = ha.NIY "
    txt += " JOIN data_diri dd ON dd.NIY = u.NIY WHERE ha.luaran_lain_id = h.id ) as authors "
    txt += " from luaran_lain h "
    txt += " JOIN jenis_luaran jl ON jl.id = h.jenis_luaran_id "
    if(dataQuery.NIY){
        txt += " JOIN luaran_lain_author ja ON ja.luaran_lain_id = h.id "
        txt += " WHERE jl.kode = 'LAIN' "
        txt += " and ja.NIY = ? "
        
        params.push(dataQuery.NIY)
    }
    else
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
    if(dataQuery.NIY){
        txt += " JOIN luaran_lain_author ja ON ja.luaran_lain_id = h.id "
        txt += " WHERE jl.kode = 'LAIN' "
        txt += " and ja.NIY = ? "
        
        params.push(dataQuery.NIY)   
    }
    else
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
    var txt = "SELECT h.id, komentar, ver, no_pendaftaran, judul, jl.nama as jenis_hki, "
    txt += " status_hki, tahun_pelaksanaan as tahun, sumber_dana, berkas, shared_link, "
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT('<strong>',dd.nama,'</strong>', ' <br>NIDN : ',dd.NIDN) "
    txt += " ORDER BY ha.id SEPARATOR '<br>') FROM hki_author ha JOIN user u ON u.NIY = ha.NIY JOIN data_diri dd "
    txt += " ON dd.NIY = u.NIY WHERE ha.hki_id = h.id ) as authors from hki h "
    txt += " JOIN jenis_luaran jl ON jl.id = h.jenis_hki_id "
    if(dataQuery.NIY){
        txt += " JOIN hki_author ja ON ja.hki_id = h.id WHERE jl.kode = 'HKI' "
        txt += " AND ja.NIY = ? "
        params.push(dataQuery.NIY)
    }
    else
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
        if(err) {
            console.log(err)
            callback(err,null)
        }

        callback(null, res)
    });
}

function rekapHki(dataQuery, callback){
    let params = []
    var txt = "SELECT jenis_hki_id, jl.nama, count(*) as jumlah from hki h "
    txt += " JOIN jenis_luaran jl ON jl.id = h.jenis_hki_id "
    if(dataQuery.NIY){
        txt += " JOIN hki_author ja ON ja.hki_id = h.id WHERE ver = 'Sudah Diverifikasi' AND jl.kode = 'HKI' "
        txt += " and ja.NIY = ? "
        params.push(dataQuery.NIY)   
    }
    else 
        txt += " WHERE ver = 'Sudah Diverifikasi' AND jl.kode = 'HKI' "
    if(dataQuery.tahun){
        txt += " and tahun_pelaksanaan = ? "
        params.push(dataQuery.tahun)
    }

    

    txt += " group by jenis_hki_id, jl.nama "
    sql.query(txt, params, function(err, res){
        if(err) {
            console.log(err)
            callback(err,null)
        }
        callback(null, res)
    });
}

function listKonferensi(dataQuery, callback){
    let params = []
    var txt = "SELECT j.ID, komentar, ver, judul, penyelenggara, link,status_kehadiran, "
    txt += " tahun,nama_forum, tingkat_forum, tanggal_mulai, tanggal_selesai, ISBN, sumber_dana, "
    txt += " lokasi, (SELECT GROUP_CONCAT(DISTINCT CONCAT('<strong>',dd.nama,'</strong>', ' "
    txt += " <br>NIDN : ',dd.NIDN)  ORDER BY ka.id SEPARATOR '<br>') FROM konferensi_author ka "
    txt += " JOIN user u ON u.NIY = ka.NIY JOIN data_diri dd ON dd.NIY = u.NIY "
    txt += " WHERE ka.konferensi_id = j.ID ) as authors from konferensi j "

    if(dataQuery.NIY)
    {
        txt += " JOIN konferensi_author ja ON ja.konferensi_id = j.id "
        txt += " WHERE ja.NIY = ? "
        params.push(dataQuery.NIY)
        
    }

    else 
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
    if(dataQuery.NIY){
        txt += " JOIN konferensi_author ja ON ja.konferensi_id = j.id "
        txt += " WHERE ver = 'Sudah Diverifikasi'  "
        txt += " and ja.NIY = ? "
        params.push(dataQuery.NIY)   
    }

    else 
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
    var txt = "SELECT j.ID, komentar, ver,  judul, penerbit, ISBN, vol, link, tahun, "
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT('<strong>',dd.nama,'</strong>', ' <br>NIDN : ',dd.NIDN)  ORDER BY ha.id SEPARATOR '<br>') FROM buku_author ha JOIN user u ON u.NIY = ha.NIY JOIN data_diri dd ON dd.NIY = u.NIY WHERE ha.buku_id = j.id ) as authors "
    txt += " from buku j "
    txt += " JOIN jenis_publikasi pub ON pub.id = j.jenis_publikasi_id "
    if(dataQuery.NIY){
        txt += " JOIN buku_author ja ON ja.buku_id = j.id "
        txt += " WHERE pub.kode = 'BUKU' "
        txt += " AND ja.NIY = ? "
        params.push(dataQuery.NIY)
    }

    else
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
    if(dataQuery.NIY){
        txt += " left join buku_author ja ON ja.buku_id = j.id "
        txt += " WHERE ver = 'Sudah Diverifikasi' AND pub.kode = 'BUKU' "
        txt += " and ja.NIY = ? "
        params.push(dataQuery.NIY)   
    }
    else 
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
    var txt = "SELECT j.id, judul, is_approved, nama_jurnal, eissn, pissn, volume, nomor, halaman, path_berkas, berkas as url, komentar, " 
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT('<strong>',dd.nama,'</strong>', ' <br>NIDN : ',dd.NIDN)  ORDER BY ha.id SEPARATOR '<br>') FROM jurnal_author ha JOIN user u ON u.NIY = ha.NIY JOIN data_diri dd ON dd.NIY = u.NIY WHERE ha.jurnal_id = j.id ) as authors "
    txt += " from jurnal j JOIN jurnal_author ja ON ja.jurnal_id = j.id WHERE 1 "
    if(dataQuery.NIY){
        txt += " AND ja.NIY = ? "
        params.push(dataQuery.NIY)
    }

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
    txt += " join jurnal_author ja ON ja.jurnal_id = j.id "
    txt += " join jenis_publikasi pub ON pub.id = j.jenis_publikasi_id "
    txt += " "
    txt += " WHERE is_approved = 1 "

    if(dataQuery.NIY){
        txt += " and ja.NIY = ? "
        params.push(dataQuery.NIY)   
    }

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
    
    if(dataQuery.NIY){
        txt += " join luaran_lain_author ja ON ja.luaran_lain_id = j.id "
        txt += " WHERE 1 "
        txt += " and ja.NIY = ? "
        params.push(dataQuery.NIY)   
    }
    else
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

    var txt = "select tahun_pelaksanaan as tahun, count(*) as jumlah from hki j "
    if(dataQuery.NIY){
        txt += " join hki_author ja ON ja.hki_id = j.id "
        txt += " WHERE 1 "
        txt += " and ja.NIY = ? "
        params.push(dataQuery.NIY)   
    }
    else
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

    var txt = "select tahun , count(*) as jumlah from konferensi j "
    if(dataQuery.NIY){
        txt += " JOIN konferensi_author ja ON ja.konferensi_id = j.id "
        txt += " where 1 "
        txt += " AND ja.NIY = ? "
        params.push(dataQuery.NIY)
    }
    else 
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

    var txt = "select tahun_terbit as tahun, count(*) as jumlah from jurnal j "
    txt += " JOIN jurnal_author ja ON ja.jurnal_id = j.id WHERE 1 "
    if(dataQuery.NIY){
        txt += " AND ja.NIY = ? "
        params.push(dataQuery.NIY)

    }

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
    if(dataQuery.NIY){
        txt += " join buku_author ja ON ja.buku_id = j.id "
        txt += " WHERE  pub.kode = 'BUKU' "
        txt += " and ja.NIY = ? "
        params.push(dataQuery.NIY)   
    }
    else
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
    var txt = "select d.NIY, d.NIDN, d.nama, d.gender, u.email, d.tempat_lahir, "
    txt += " d.tanggal_lahir, p.nama as pangkat, p.golongan, j.nama as jabfung, "
    txt += " d.jenjang_kode, pr.nama as nama_prodi, u.status, bi.nama as bidang_ilmu, "
    txt += " bii.nama as bidang_ilmu_induk, d.permalink, bk.nama as kepakaran, "
    txt += " bkp.nama as parent_kepakaran, d.expertise, d.kode_unik from data_diri d "
    txt += " JOIN m_pangkat p on p.id = d.pangkat"
    txt += " JOIN m_jabatan_akademik j on j.id = d.jabatan_fungsional"
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += " JOIN prodi pr ON pr.ID = u.id_prod "
    txt += " LEFT JOIN bidang_ilmu bi ON bi.kode = d.bidang_ilmu_id"
    txt += " LEFT JOIN bidang_ilmu bii ON bii.kode = bi.kode_id"
    txt += " LEFT JOIN bidang_kepakaran bk ON bk.id = d.kepakaran_id"
    txt += " LEFT JOIN bidang_kepakaran bkp ON bkp.kode = bk.parent"
    txt += " WHERE d.nama <> '-' AND d.status_dosen = 1 AND u.status = 'aktif' "

    if(data.nama){
        txt += " AND d.nama LIKE '%"+jsStringEscape(data.nama)+"%'"
        
    }

    if(data.kode_unik){
        txt += " AND d.kode_unik = ? "
        params.push(data.kode_unik)
    }

    // if(data.status){
    //     txt += " AND u.status = ? "
    //     params.push(data.status)
    // }

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
        txt += " AND t.nama LIKE '%"+jsStringEscape(data.nama)+"%'"
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
Pegawai.getProfilDosen = getProfilDosen
Pegawai.getRiwayatPendidikan = getRiwayatPendidikan
Pegawai.countDosen = countDosen
Pegawai.getRekapDosenPerfakultas = getRekapDosenPerfakultas
Pegawai.getListDosenJenjangFakultas = getListDosenJenjangFakultas
Pegawai.getRekapDosenJabfungDetail = getRekapDosenJabfungDetail
Pegawai.getListDosenJenjangJabfung = getListDosenJenjangJabfung

module.exports= Pegawai;