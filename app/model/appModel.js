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
module.exports= Pegawai;