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

function getMahasiswaByNim(key,callback){
    var params = key.trim()
    var txt = "SELECT m.id, nip_promotor as id_dsn,d.nama_dosen as nm_dsn, nim_mhs, nama_mahasiswa,m.jenis_kelamin, ";
        txt += " tempat_lahir,tgl_lahir, telepon, hp,rt,rw,dusun, m.email, ktp,alamat, kk.nama_kampus, ";
        txt += " kode_pos, desa, kecamatan,k.kab,p.prov,agama,gol_darah, m.kampus, m.va_code ";
        txt += ", ps.kode_prodi, ps.nama_prodi, ps.singkatan, f.kode_fakultas, f.nama_fakultas, " 
        txt += " m.status_warga as sw, m.warga_negara as wn, m.status_aktivitas, m.semester, m.tgl_lulus, "
        txt += " m.tgl_sk_yudisium, m.no_sk_yudisium, m.kode_jenjang_studi ";
        txt += " FROM simak_mastermahasiswa m ";
        txt += "left JOIN simak_kabupaten k ON k.id = m.kabupaten ";
        txt += "left JOIN simak_masterdosen d ON d.id = m.nip_promotor ";
        txt += "left JOIN simak_propinsi p ON p.id = m.provinsi ";
        txt += " JOIN simak_masterprogramstudi ps ON ps.kode_prodi = m.kode_prodi ";
        txt += " JOIN simak_masterfakultas f ON ps.kode_fakultas = f.kode_fakultas ";
        txt += " JOIN simak_kampus kk ON kk.kode_kampus = m.kampus ";
        // txt += " JOIN simak_users u ON u.nim = m.nim_mhs ";
        txt += " WHERE m.nim_mhs = ?;";
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


function createIzin(data,callback){
    // console.log(data)
    let txt = "INSERT INTO erp_izin_mahasiswa (nim, tahun_akademik, semester, kota_id, negara_id, keperluan_id, alasan, tanggal_berangkat, tanggal_pulang, durasi) "
    txt += " VALUES (?,?,?,?,?,?,?,?,?,?); "
    sql.query(txt,[data.nim, data.tahun_akademik, data.semester, data.kota_id, data.negara_id, data.keperluan_id, data.alasan, data.tanggal_berangkat, data.tanggal_pulang, data.durasi],function(err,res){
        if(err) {
            console.log(err)
            callback(err,null)
        }
        callback(null,res)
    })
}



Pegawai.getMahasiswaByNim = getMahasiswaByNim;
Pegawai.createIzin = createIzin
module.exports= Pegawai;