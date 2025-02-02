'user strict';
const { v4: uuidv4 } = require('uuid');

var sql = require('../../db.js');

// var unique = require("array-unique").immutable;
// var moment = require('moment');
var moment = require('moment-timezone');
var jsStringEscape = require('js-string-escape')
// var async = require('async');
// var await = require('await');
var Promise = require('promise');

//Task object constructor
var Pegawai = function(task){
    
};

function getJabatanFungsional(dataQuery, callback){
    
    let params = []
    let txt = `SELECT * FROM m_jabatan_akademik `

    if(dataQuery.kode){
        txt += " AND kode = ? "
        params.push(dataQuery.kode)
    }

    sql.query(txt,params,function(err, res){
        if(err){
            console.log(err)
            callback(err,null)
        }

        else{
            callback(null,res)
            
        }
    })
}


function listPublikasiDosen(dataQuery, callback){
    
    let params = []
    let txt = "select t.id, t.judul_publikasi_paten, t.kategori_kegiatan_id, t.nama_jenis_publikasi, "
    txt += " t.tanggal_terbit, pa.angka_kredit_pak, (SELECT COUNT(*) FROM publikasi_author WHERE publikasi_author.pub_id = t.id) as jumlah_author "
    txt += " FROM publikasi t "
    txt += " JOIN kategori_kegiatan kk ON t.kategori_kegiatan_id = kk.id "
    txt += " JOIN publikasi_author pa ON pa.pub_id = t.id "
    txt += " where 1 "

    if(dataQuery.niy){
        txt += " AND pa.NIY = ? "
        params.push(dataQuery.niy)
    }

    if(dataQuery.corresponding_author){
        txt += " AND pa.corresponding_author = ? "
        params.push(dataQuery.corresponding_author)
    }
    

    // if(dataQuery.corresponding_author == '0'){
    //     txt += " AND pa.corresponding_author = 0 "
    // }

    if(dataQuery.tanggal_jafa){
        txt += " AND t.tanggal_terbit >= ? "
        params.push(dataQuery.tanggal_jafa)
    }

    if(dataQuery.kategori_kegiatan_id){
        txt += " AND t.kategori_kegiatan_id = ? "
        params.push(dataQuery.kategori_kegiatan_id)
    }

    if(dataQuery.status_anggota && dataQuery.status_anggota=='anggota'){

        txt += " AND pa.urutan <> 1 "
    }

    if(dataQuery.status_anggota && dataQuery.status_anggota=='pertama'){

        txt += " AND pa.urutan = 1 "
    }

    if(dataQuery.ranking){
        txt += " AND t.ranking = ? "
        params.push(dataQuery.ranking)
    }

    // txt += "GROUP BY t.id, t.judul_publikasi_paten, t.kategori_kegiatan_id, t.nama_jenis_publikasi, "
    // txt += " t.tanggal_terbit, kom.angka_kredit_pak "

    sql.query(txt,params,function(err, res){
        if(err){
            console.log(err)
            callback(err,null)
        }

        else{
            callback(null,res)
            
        }
    })
}

function listRumpunIlmuDosen(dataQuery, callback){
    
    let params = []
    let txt = "SELECT d.nama, d.NIDN, d.gelar_depan, "
    txt += " d.gelar_belakang FROM data_diri dd "
    txt += " join bidang_ilmu bi ON bi.kode = dd.bidang_ilmu_id "
    txt += " where bi.level = 3 "

    if(dataQuery.kode){
        txt += " AND bi.kode = ? "
        params.push(dataQuery.kode)
    }

    sql.query(txt,params,function(err, res){
        if(err){
            console.log(err)
            callback(err,null)
        }

        else{
            callback(null,res)
            
        }
    })
}

function rekapRumpunIlmuDosen(dataQuery, callback){
    
    let params = []
    let txt = "SELECT count(*) as total, bi.kode, bi.nama from data_diri d "
    txt += " join bidang_ilmu bi ON bi.kode = d.bidang_ilmu_id "
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += " JOIN prodi p ON p.ID = u.id_prod "
    txt += " WHERE bi.level = 3 AND (u.status IN ('aktif','izinbelajar','tugasbelajar')) "

    if(dataQuery.status_dosen){
        txt += " AND d.status_dosen = ? "
        params.push(dataQuery.status_dosen)
    }

    if(dataQuery.status == '1'){
        txt += " AND length(d.NIDN) = 10 "
    }

    else if(dataQuery.status == '-1'){
        txt += " AND length(d.NIDN) <> 10 "
    }

    if(dataQuery.wajib_tridharma){
        txt += " AND d.wajib_tridharma = ? "
        params.push(dataQuery.wajib_tridharma)
    }

    if(dataQuery.status_ihsan){
        txt += " AND d.status_ihsan = ? "
        params.push(dataQuery.status_ihsan)
    }
    
    txt += " GROUP by bi.kode, bi.nama order by bi.nama; "

    sql.query(txt,params,function(err, res){
        if(err){
            console.log(err)
            callback(err,null)
        }
        else
            callback(null, res)
    })
}

function local_listSimpegAnggotaProfesi(nidn, callback){
    
    let txt = "SELECT t.ID,t.organisasi, t.tanggal_mulai_keanggotaan, t.nama_kategori_kegiatan, "
    txt += " t.jabatan, t.instansi_profesi, t.nomor_anggota, t.sister_id "
    txt += " FROM organisasi t "    
    txt += " JOIN data_diri d ON d.NIY = t.NIY "
    txt += " WHERE d.NIDN = ? "
    
    sql.query(txt,[nidn],function(err, res){
        if(err){
            console.log(err)
            callback(err,null)
        }

        else{
            callback(null,JSON.parse(JSON.stringify(res)))
            
        }
    })
}

function local_listSimpegSertifikasiProfesi(nidn, jenis_sertifikasi){
    return new Promise((resolve, reject)=>{
        let params = [nidn, jenis_sertifikasi]
        let txt = "SELECT t.jenis_sertifikasi, t.bidang_studi, t.nomor_registrasi, t.sk_sertifikasi, t.tingkat "
        txt += " FROM sertifikasi t "    
        txt += " JOIN data_diri d ON d.NIY = t.NIY "
        txt += " WHERE d.NIDN = ?  "    
        txt += "AND t.jenis_sertifikasi = ? "    
        
        sql.query(txt,params,function(err, res){
            if(err){
                console.log(err)
                reject(err)
            }

            else{
                resolve(res)
                
            }
        })
    })
    
}

function local_listSimpegAnggotaProfesiDokumen(parent_sister_id){
    return new Promise((resolve, reject)=>{
        let txt = "SELECT t.nama_dokumen, t.nama_jenis_dokumen, t.tautan "
        txt += " FROM sister_files t "    
        txt += " WHERE t.parent_sister_id = ? "
        
        sql.query(txt,[parent_sister_id],function(err, res){
            if(err){
                console.log(err)
                reject(err)
            }

            else{
                resolve(res)
                
            }
        })
    })
    
}

function listSimpegAnggotaProfesi(dataQuery, callback){
    local_listSimpegAnggotaProfesi(dataQuery.nidn, function(err, items){
        
        let promises = items.map(function(obj){
            return new Promise((resolve, reject)=>{

                let p = local_listSimpegAnggotaProfesiDokumen(obj.sister_id)
                p.then(res=>{
                    obj.dokumen = res
                    resolve(obj)
                })
                .catch(e=>{
                    reject(e)
                })
            })
        })

        Promise.all(promises)
        .then(hasil=>{
            callback(null, hasil)
        })  
        .catch(err=>{
            console.log(err)
            callback(err, null)
        })
    })
}

function getRekapEwmp(dataQuery, callback){
    
    let params = []
    
    let txt = "SELECT e.* FROM ewmp e "
    txt += " JOIN user u ON u.NIY = e.NIY "
    txt += " JOIN jabatan j ON j.NIY = u.NIY "
    txt += " JOIN m_jabatan mj ON mj.id = j.jabatan_id "
    txt += " JOIN unit_kerja uk  ON j.unker_id = uk.id "
    txt += " WHERE 1 AND mj.nama = 'Dosen' "
    
    if(dataQuery.NIY){
        txt += "  AND e.NIY = ? "
        params.push(dataQuery.NIY)
    }

    if(dataQuery.kode_prodi){
        txt += "  AND uk.kode_prodi = ? "
        params.push(dataQuery.kode_prodi)
    }

    if(dataQuery.tahun_skp){
        txt += "  AND e.tahun_akademik like ? "
        params.push(dataQuery.tahun_skp+"%")
    }

    txt += " ORDER BY e.tahun_akademik ASC"
    
    sql.query(txt,params,function(err, res){
        if(err){
            console.log(err)
            callback(err,null)
        }

        else{
            callback(null, res)
        }
    })
    
    
}


function getBkdDosenMenjabat(dataQuery, callback){
    
    if(dataQuery.tahun && dataQuery.dosen_id){
        let params = [dataQuery.tahun, dataQuery.dosen_id]
        let txt = "SELECT bd.* FROM bkd_dosen bd "
        txt += " JOIN komponen_kegiatan kk ON  bd.komponen_id = kk.id "
        // txt += " JOIN unsur_utama uu ON kk.unsur_id = uu.id "
        // txt += " JOIN skp_item si ON bd.skp_item_id = si.id "
        txt += " WHERE bd.status_bkd = '0' AND kk.nama LIKE 'J%' AND bd.tahun_id = ? AND bd.dosen_id = ? "    
        
        sql.query(txt,params,function(err, res){
            if(err){
                console.log(err)
                callback(err,null)
            }

            else{
                callback(null, res)
            }
        })
    }

    else{
        callback(null,[])
    }
    
}

function getBkdDosenRisetAbdimas(dataQuery, callback){
    
    if(dataQuery.tahun && dataQuery.dosen_id){
        let params = [dataQuery.tahun, dataQuery.dosen_id]
        let txt = "SELECT bd.*,si.nama as skp_item_nama FROM bkd_dosen bd "
        txt += " JOIN komponen_kegiatan kk ON  bd.komponen_id = kk.id "
        txt += " JOIN unsur_utama uu ON kk.unsur_id = uu.id "
        txt += " JOIN skp_item si ON bd.skp_item_id = si.id "
        txt += " WHERE bd.status_bkd = '0' AND bd.tahun_id = ? AND bd.dosen_id = ? "    

        if(dataQuery.kode){
            txt += " AND uu.kode = ? "
            params.push(dataQuery.kode)
        }
        // txt += " GROUP BY uu.kode "

        sql.query(txt,params,function(err, res){
            if(err){
                console.log(err)
                callback(err,null)
            }

            else{
                callback(null, res)
            }
        })
    }

    else{
        callback(null,[])
    }
    
}


function getBkdDosenAjar(dataQuery, callback){
    
    if(dataQuery.tahun && dataQuery.dosen_id){
        let params = [dataQuery.tahun, dataQuery.dosen_id]
        let txt = "SELECT bd.* FROM bkd_dosen bd "
        txt += " JOIN komponen_kegiatan kk ON  bd.komponen_id = kk.id "
        txt += " JOIN unsur_utama uu ON kk.unsur_id = uu.id "
        // txt += " JOIN skp_item si ON bd.skp_item_id = si.id "
        txt += " WHERE bd.status_bkd = '0' AND uu.kode = 'AJAR' AND kk.kode IN ('B1','B2') AND bd.tahun_id = ? AND bd.dosen_id = ? "    

        if(dataQuery.ps_lain && dataQuery.prodi_ajar){
            
            if(dataQuery.ps_lain == 'sendiri'){
                txt += ' AND kode_prodi_mengajar = ? '
                params.push(dataQuery.prodi_ajar)
            }

            else{
                txt += ' AND kode_prodi_mengajar <> ? '
                params.push(dataQuery.prodi_ajar)    
            }
            
        }

        sql.query(txt,params,function(err, res){
            if(err){
                console.log(err)
                callback(err,null)
            }

            else{
                callback(null, res)
            }
        })
    }

    else{
        callback(null,[])
    }
    
}

function getRekapBkd(dataQuery, callback){
    
    if(dataQuery.tahun && dataQuery.user_id){
        let params = [dataQuery.tahun, dataQuery.user_id]
        let txt = "SELECT * FROM bkd_rekap "
        txt += " WHERE tahun_id = ? AND user_id = ? "    

        sql.query(txt,params,function(err, res){
            if(err){
                console.log(err)
                callback(err,null)
            }

            else{
                callback(null, res)
            }
        })
    }

    else{
        callback(null,[])
    }
    
}

function insertKehadiran(dataPost, callback){
    if(dataPost.lokasi && dataPost.rfid){
        let p = local_getDataByRFID(dataPost.rfid)

        p.then(result => {

            if(result){
                let uuid = uuidv4()
                let tgl = new Date()
                let tanggal = moment.tz('Asia/Jakarta').utc(tgl).format('YYYY-MM-DD HH:mm:ss')
                let params = [uuid, result.NIY, '1', dataPost.lokasi, tanggal]
                let txt = "INSERT INTO kehadiran (id, niy, status_kehadiran, lokasi,tanggal_checkin) "
                txt += " VALUES (?,?,?,?,?) "
                sql.query(txt, params, function(err, res){
                    if(err){
                        console.log(err)
                        callback(null, err)
                        // callback(err, null)
                    }

                    else{
                        callback(null, {

                            'code' : 200,
                            'msg' : 'data inserted'
                        })
                    }
                })
            }

            else{
                callback(null, {

                    'code' : 404,
                    'msg' : 'user not found'
                })
            }
            

        }).catch(err => {
            console.log(err)
            callback(null, err)
        })
    }

    else{
        callback(null, {

            'code' : 405,
            'msg' : 'parameter is incomplete. Missing lokasi or rfid'
        })
    }
    

    
}

function getDataByRFID(dataQuery, callback){
    let p = local_getDataByRFID(dataQuery.rfid)

    p.then(result => {
        callback(null, result)
    }).catch(err => {
        console.log(err)
        callback(err, null)
    })
}

function local_getDataByRFID(rfid){

    return new Promise((resolve, reject) => {
        let params = []

        let txt = "SELECT NIY, username, email, nama, uuid, id_prod, access_role, rfid "
        txt += " FROM user WHERE 1 "
        if(rfid){
            txt += " AND rfid = ? "
            params.push(rfid)
        }

        else{
            txt += " AND rfid = '-' "
        }

        txt += " LIMIT 1 "

        sql.query(txt, params, function(err, res){
            if(err){
                console.log(err)
                reject(err)
            }

            else{
                if(res && res[0]){
                    resolve(res[0])    
                }

                else{
                    resolve(null)
                }
                
            }
        })
    })

    
}

function getListVisitingScientist(dataQuery,callback){
    let params = [dataQuery.sd, dataQuery.ed]

    let txt = "SELECT pj.*,t.nama as tingkat, d.nama, d.gelar_depan, d.gelar_belakang, jp.nama as nama_kategori, "
    txt += " bi.nama as bidang_ilmu, "
    txt += " bii.nama as bidang_ilmu_induk, bk.nama as kepakaran, bkp.nama as parent_kepakaran, "
    txt += " d.permalink, d.expertise "
    txt += " FROM visiting_scientist pj"
    txt += " JOIN kategori_kegiatan jp ON jp.id = pj.kategori_kegiatan_id "
    txt += " JOIN data_diri d ON d.NIY = pj.NIY "
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += " JOIN prodi p ON p.ID = u.id_prod "
    txt += " LEFT JOIN tingkat t ON t.id = pj.tingkat "
    txt += " LEFT JOIN bidang_ilmu bi ON bi.kode = d.bidang_ilmu_id"
    txt += " LEFT JOIN bidang_ilmu bii ON bii.kode = bi.kode_id "
    txt += " LEFT JOIN bidang_kepakaran bk ON bk.id = d.kepakaran_id"
    txt += " LEFT JOIN bidang_kepakaran bkp ON bkp.kode = bk.parent"
    txt += " WHERE tanggal_pelaksanaan BETWEEN ? AND ? "
    
    if(dataQuery.prodi){
        txt += " AND p.kode_prod = ? "
        params.push(dataQuery.prodi)
    }

    if(dataQuery.tingkat){
        txt += " AND pj.tingkat = ? "
        params.push(dataQuery.tingkat)
    }

    sql.query(txt, params, function(err, res){
        if(err){
            console.log(err)
            callback(err,null)
        }
        else
            callback(null,res)
    })
}

function getListOrasiIlmiah(dataQuery,callback){
    let params = [dataQuery.sd, dataQuery.ed]

    let txt = "SELECT pj.*,t.nama as tingkat, d.nama, d.gelar_depan, d.gelar_belakang, jp.nama as nama_kategori, "
    txt += " bi.nama as bidang_ilmu, "
    txt += " bii.nama as bidang_ilmu_induk, bk.nama as kepakaran, bkp.nama as parent_kepakaran, "
    txt += " d.permalink, d.expertise "
    txt += " FROM orasi_ilmiah pj"
    txt += " JOIN kategori_kegiatan jp ON jp.id = pj.kategori_kegiatan_id "
    txt += " JOIN data_diri d ON d.NIY = pj.NIY "
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += " JOIN prodi p ON p.ID = u.id_prod "
    txt += " LEFT JOIN tingkat t ON t.id = pj.tingkat_pertemuan_id "
    txt += " LEFT JOIN bidang_ilmu bi ON bi.kode = d.bidang_ilmu_id"
    txt += " LEFT JOIN bidang_ilmu bii ON bii.kode = bi.kode_id "
    txt += " LEFT JOIN bidang_kepakaran bk ON bk.id = d.kepakaran_id"
    txt += " LEFT JOIN bidang_kepakaran bkp ON bkp.kode = bk.parent"
    txt += " WHERE tanggal_pelaksanaan BETWEEN ? AND ? "
    
    if(dataQuery.prodi){
        txt += " AND p.kode_prod = ? "
        params.push(dataQuery.prodi)
    }

    if(dataQuery.tingkat){
        txt += " AND pj.tingkat_pertemuan_id = ? "
        params.push(dataQuery.tingkat)
    }

    sql.query(txt, params, function(err, res){
        if(err){
            console.log(err)
            callback(err,null)
        }
        else
            callback(null,res)
    })
}

function getListPengelolaJurnal(dataQuery,callback){
    let params = []

    let txt = "SELECT pj.*,t.nama as tingkat, d.nama, d.gelar_depan, d.gelar_belakang, jp.nama as nama_kategori, "
    txt += " bi.nama as bidang_ilmu, "
    txt += " bii.nama as bidang_ilmu_induk, bk.nama as kepakaran, bkp.nama as parent_kepakaran, "
    txt += " d.permalink, d.expertise "
    txt += " FROM pengelola_jurnal pj"
    txt += " JOIN kategori_kegiatan jp ON jp.id = pj.kategori_kegiatan_id "
    txt += " JOIN data_diri d ON d.NIY = pj.NIY "
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += " JOIN prodi p ON p.ID = u.id_prod "
    txt += " LEFT JOIN tingkat t ON t.id = pj.tingkat "
    txt += " LEFT JOIN bidang_ilmu bi ON bi.kode = d.bidang_ilmu_id"
    txt += " LEFT JOIN bidang_ilmu bii ON bii.kode = bi.kode_id "
    txt += " LEFT JOIN bidang_kepakaran bk ON bk.id = d.kepakaran_id"
    txt += " LEFT JOIN bidang_kepakaran bkp ON bkp.kode = bk.parent"
    
    txt += " WHERE "
    txt += "    (tgl_sk_tugas BETWEEN '"+dataQuery.sd+"' AND '"+dataQuery.ed+"' OR "
    txt += "    tgl_sk_tugas_selesai BETWEEN '"+dataQuery.sd+"' AND '"+dataQuery.ed+"' OR "
    txt += "    '"+dataQuery.sd+"' BETWEEN tgl_sk_tugas AND tgl_sk_tugas_selesai) "
    
    if(dataQuery.prodi){
        txt += " AND p.kode_prod = ? "
        params.push(dataQuery.prodi)
    }
        
    if(dataQuery.tingkat){
        txt += " AND pj.tingkat_pertemuan_id = ? "
        params.push(dataQuery.tingkat)
    }

    sql.query(txt, params, function(err, res){
        if(err){
            console.log(err)
            callback(err,null)
        }
        else
            callback(null,res)
    })
}

function getListLuaranLainEkinerja(dataQuery,callback){
    let params = [dataQuery.sd, dataQuery.ed]

    let txt = "SELECT pj.*, "
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT(dd.nama,' - ',dd.NIDN) "
    txt += " ORDER BY paa.id SEPARATOR '#') FROM luaran_lain_author paa "
    txt += " JOIN user uu ON uu.NIY = paa.NIY "
    txt += " JOIN prodi p ON p.ID = uu.id_prod "
    txt += " JOIN data_diri dd ON dd.NIY = uu.NIY WHERE paa.luaran_lain_id = pj.id) as authors "
    txt += " FROM luaran_lain pj"
    txt += " JOIN jenis_luaran jp ON jp.id = pj.jenis_luaran_id "
    txt += " JOIN data_diri d ON d.NIY = pj.NIY "
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += " JOIN prodi p ON p.ID = u.id_prod "
    txt += " WHERE 1 "
    txt += " AND tanggal_pelaksanaan BETWEEN ? AND ? "
    
    if(dataQuery.prodi){
        txt += " AND p.kode_prod = ? "
        params.push(dataQuery.prodi)
    }
    
    if(dataQuery.jenis){
        txt += " AND jp.keyword = ? "
        params.push(dataQuery.jenis)
    }

    sql.query(txt, params, function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null,res)
    })
}

function getListBuku(dataQuery,callback){
    let params = [dataQuery.sd, dataQuery.ed]

    let txt = "SELECT pj.*, "
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT(dd.nama,' - ',dd.NIDN) "
    txt += " ORDER BY paa.id SEPARATOR '#') FROM buku_author paa "
    txt += " JOIN user uu ON uu.NIY = paa.NIY "
    txt += " JOIN prodi p ON p.ID = uu.id_prod "
    txt += " JOIN data_diri dd ON dd.NIY = uu.NIY WHERE paa.buku_id = pj.id) as authors "
    txt += " FROM buku pj"
    txt += " JOIN jenis_luaran jp ON jp.id = pj.jenis_luaran_id "
    txt += " JOIN data_diri d ON d.NIY = pj.NIY "
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += " JOIN prodi p ON p.ID = u.id_prod "
    txt += " WHERE 1 "
    txt += " AND tanggal_terbit BETWEEN ? AND ? "

    if(dataQuery.prodi){
        txt += " AND p.kode_prod = ? "
        params.push(dataQuery.prodi)
    }
    
    if(dataQuery.jenis){
        txt += " AND jp.keyword = ? "
        params.push(dataQuery.jenis)
    }

    sql.query(txt, params, function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null,res)
    })
}

function getListHki(dataQuery,callback){
    let params = [dataQuery.sd, dataQuery.ed]

    let txt = "SELECT pj.*, "
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT(dd.nama,' - ',dd.NIDN) "
    txt += " ORDER BY paa.id SEPARATOR '#') FROM hki_author paa "
    txt += " JOIN user uu ON uu.NIY = paa.NIY "
    txt += " JOIN prodi p ON p.ID = uu.id_prod "
    txt += " JOIN data_diri dd ON dd.NIY = uu.NIY WHERE paa.hki_id = pj.id) as authors "
    txt += " FROM hki pj"
    txt += " JOIN jenis_luaran jp ON jp.id = pj.jenis_hki_id "
    txt += " JOIN data_diri d ON d.NIY = pj.NIY "
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += " JOIN prodi p ON p.ID = u.id_prod "
    txt += " WHERE jp.kode = 'HKI' "
    txt += " AND tanggal_terbit BETWEEN ? AND ? "
    if(dataQuery.prodi){
        txt += " AND p.kode_prod = ? "
        params.push(dataQuery.prodi)
    }
    
    if(dataQuery.jenis){
        txt += " AND jp.keyword = ? "
        params.push(dataQuery.jenis)
    }

    sql.query(txt, params, function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null,res)
    })
}

function listDosenJabfung(dataQuery, callback){
    let params = []
    let txt = "SELECT d.ID as dosenid, u.ID as userid, u.NIY, d.nama, d.NIDN, d.gelar_depan, "
    txt += " d.gelar_belakang, p.nama as nama_prodi, p.kode_prod as kode_prodi, u.id_prod as id_prodi "
    txt += " , d.nik, d.tanggal_lahir, jf.nama as jabfung, pa.golongan as gol, pa.nama as namagol, u.email "
    txt += " FROM data_diri d "
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += " JOIN prodi p ON p.ID = u.id_prod "
    txt += " JOIN m_pangkat pa on pa.id = d.pangkat "
    txt += " JOIN m_jabatan_akademik jf ON d.jabatan_fungsional = jf.id "
    txt += " WHERE (u.status IN ('aktif','izinbelajar','tugasbelajar'))  "

    if(dataQuery.jenjang){
        txt += " AND d.jenjang_kode = ? "
        params.push(dataQuery.jenjang)
    }

    if(dataQuery.jabfung){
        txt += " AND jf.kode = ? "
        params.push(dataQuery.jabfung)
    }

    if(dataQuery.status_dosen){
        txt += " and d.status_dosen = ? "
        params.push(dataQuery.status_dosen)
    }

    if(dataQuery.prodi){
        txt += " and p.kode_prod = ? "
        params.push(dataQuery.prodi)   
    }

    sql.query(txt,params,function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null, res)
    })
}

function getListPublikasiJurnal(dataQuery,callback){
    let params = []

    let txt = "SELECT pj.*, "
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT(paa.author_nama) "
    txt += " ORDER BY paa.id SEPARATOR '; ') FROM publikasi_author paa "
    txt += " WHERE paa.pub_id = pj.id) as authors "
    txt += " FROM publikasi pj"
    txt += " JOIN jenis_publikasi jp ON jp.kode = pj.jenis_publikasi_id "
    txt += " JOIN data_diri d ON d.NIY = pj.NIY "
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += " JOIN prodi p ON p.ID = u.id_prod "
    txt += " WHERE 1 "
    
    if(dataQuery.sd && dataQuery.ed){
        txt += " AND tanggal_terbit BETWEEN ? AND ? "
        params.push(dataQuery.sd)
        params.push(dataQuery.ed)
    }

    if(dataQuery.prodi){
        txt += " AND p.kode_prod = ? "
        params.push(dataQuery.prodi)
    }
    
    if(dataQuery.NIY){
        txt += " AND pj.NIY = ? "
        params.push(dataQuery.NIY)
    }
    
    if(dataQuery.jenis_publikasi){
        txt += " AND jp.nama = ? "
        params.push(dataQuery.jenis_publikasi)
    }

    if(dataQuery.sitasi){
        txt += " AND pj.jumlah_sitasi > 0 "
    }

    txt += " ORDER BY pj.tanggal_terbit DESC"

    sql.query(txt, params, function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null,res)
    })
}

function listSimpegPengabdianAnggotaDosen(pengabdian_id, callback){
    let params = [pengabdian_id]
    let txt = "SELECT dd.nama, dd.NIDN, ang.id_sdm, ang.nim, ang.peran, ang.jenis, ang.NIY, p.nama as namaprodi  " 
    txt += " FROM pengabdian_anggota ang "
    txt += " JOIN user uu ON uu.NIY = ang.NIY "
    txt += " JOIN data_diri dd ON dd.NIY = uu.NIY "
    txt += " JOIN prodi p ON p.ID = uu.id_prod "
    txt += " WHERE ang.pengabdian_id = ? "
    sql.query(txt,params,function(err, res){
        if(err){
            console.log(err)
            callback(err,null)

        }

        else{
            callback(null, res)
            
        }
    })
}


function listSimpegPengabdianAnggotaMahasiswa(pengabdian_id, callback){
    let params = [pengabdian_id]
    let txt = "SELECT ang.nama, ang.id_sdm, ang.nim, ang.peran, ang.jenis  " 
    txt += " FROM pengabdian_anggota ang "
    txt += " WHERE ang.pengabdian_id = ? AND ang.jenis = 'Mahasiswa'"
    sql.query(txt,params,function(err, res){
        if(err){
            console.log(err)
            callback(err,null)

        }

        else{
            callback(null, res)
            
        }
    })
}

function listSimpegPengabdian(dataQuery, callback){
    local_listSimpegPengabdian(dataQuery, function(err, items){
        // let results = []
        let promises = items.map(function(obj){
            return new Promise((resolve, reject)=>{
                listSimpegPengabdianAnggotaDosen(obj.ID, function(err, res){
                    if(err){console.log(err)
                        reject(err)
                    }

                    else{
                        
                        listSimpegPengabdianAnggotaMahasiswa(obj.ID, function(err, resMhs){
                            if(err){
                                console.log(err)
                                reject(err)
                            }

                            else{
                                obj.members = res
                                obj.mahasiswa = resMhs
                                resolve(obj)
                            }
                        })
                        
                        
                    }
                })
            })
        })

        Promise.all(promises)
        .then(hasil=>{
            callback(null, hasil)
        })  
        .catch(err=>{
            console.log(err)
            callback(err, null)
        })
    })
}

function local_listSimpegPengabdian(dataQuery, callback){
    let params = []

    let txt = "SELECT t.ID, t.tempat_kegiatan, t.judul_penelitian_pengabdian, t.tahun_dilaksanakan, t.tahun_kegiatan,t.dana_dikti, t.dana_pt, t.dana_institusi_lain,t.tgl_sk_tugas, t.no_sk_tugas, t.nama_mitra, t.tautan_kuesioner_mitra "
    txt += " FROM pengabdian t "    
    txt += " WHERE "+dataQuery.prodi+" IN (SELECT p.kode_prod FROM pengabdian_anggota ang JOIN data_diri d ON d.NIY = ang.NIY JOIN user u ON u.NIY = ang.NIY JOIN prodi p ON p.ID = u.id_prod WHERE ang.pengabdian_id = t.ID) "
    // txt += " JOIN data_diri d ON d.NIY = t.NIY "
    // txt += " JOIN user u ON u.NIY = d.NIY "
    // txt += "JOIN prodi p ON p.ID = u.id_prod WHERE 1 "
    // if(dataQuery.prodi){
    //     txt += " AND p.kode_prod = ? " 
    //     params.push(dataQuery.prodi)
    // }

    if(dataQuery.tahun){
        txt += " AND tahun_kegiatan = ?"
        params.push(dataQuery.tahun)
    }
    
    if(dataQuery.sumber_dana){
        txt += " AND jenis_sumber_dana = ? "
        params.push(dataQuery.sumber_dana)    
    }

    // txt += " GROUP BY t.ID, t.tempat_kegiatan, t.judul_penelitian_pengabdian"
    
    sql.query(txt,params,function(err, res){
        if(err){
            console.log(err)
            callback(err,null)
        }

        else{
            callback(null,JSON.parse(JSON.stringify(res)))
            
        }
    })
}

function countSimpegPengabdian(dataQuery, callback){
    let params = []

    let txt = "SELECT  "
    txt += "(SELECT COUNT(*) as total FROM pengabdian t WHERE "+dataQuery.prodi+" IN (SELECT p.kode_prod FROM pengabdian_anggota ang JOIN data_diri d ON d.NIY = ang.NIY JOIN user u ON u.NIY = ang.NIY JOIN prodi p ON p.ID = u.id_prod WHERE ang.pengabdian_id = t.ID) AND tahun_dilaksanakan = "+dataQuery.tahun+" AND jenis_sumber_dana = 'mandiri') as mandiri, "
    txt += "(SELECT COUNT(*) as total FROM pengabdian t WHERE "+dataQuery.prodi+" IN (SELECT p.kode_prod FROM pengabdian_anggota ang JOIN data_diri d ON d.NIY = ang.NIY JOIN user u ON u.NIY = ang.NIY JOIN prodi p ON p.ID = u.id_prod WHERE ang.pengabdian_id = t.ID) AND tahun_dilaksanakan = "+dataQuery.tahun+" AND jenis_sumber_dana = 'dalam') as dn, "
    txt += "(SELECT COUNT(*) as total FROM pengabdian t WHERE "+dataQuery.prodi+" IN (SELECT p.kode_prod FROM pengabdian_anggota ang JOIN data_diri d ON d.NIY = ang.NIY JOIN user u ON u.NIY = ang.NIY JOIN prodi p ON p.ID = u.id_prod WHERE ang.pengabdian_id = t.ID) AND tahun_dilaksanakan = "+dataQuery.tahun+" AND jenis_sumber_dana = 'luar' ) as ln "
    sql.query(txt,params,function(err, res){
        if(err){
            callback(err,null)
        }

        else{
            if(res[0])
                callback(null, res[0])
            else
                callback(null, 0)
        }
    })
}

function listSimpegPenelitian(dataQuery, callback){
    let params = []

    let txt = "SELECT t.*, d.nama as namadosen, p.nama as namaprodi FROM penelitian t "
    txt += " JOIN data_diri d ON d.NIY = t.NIY "
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += "JOIN prodi p ON p.ID = u.id_prod WHERE 1 "
    if(dataQuery.prodi){
        txt += " AND p.kode_prod = ? " 
        params.push(dataQuery.prodi)
    }

    if(dataQuery.tahun){
        txt += " AND tahun_dilaksanakan = ?"
        params.push(dataQuery.tahun)
    }
    
    if(dataQuery.sumber_dana){
        txt += " AND jenis_sumber_dana = ? "
        params.push(dataQuery.sumber_dana)    
    }
    
    sql.query(txt,params,function(err, res){
        if(err){
            callback(err,null)
        }

        else{
            callback(null, res)
            
        }
    })
}


function countSimpegPenelitian(dataQuery, callback){
    let params = []

    let txt = "SELECT  "
    txt += "(SELECT COUNT(*) as total FROM penelitian t JOIN data_diri d ON d.NIY = t.NIY JOIN user u ON u.NIY = t.NIY JOIN prodi p ON p.ID = u.id_prod WHERE p.kode_prod = "+dataQuery.prodi+" AND tahun_dilaksanakan = "+dataQuery.tahun+" AND jenis_sumber_dana = 'mandiri' ) as mandiri, "
    txt += "(SELECT COUNT(*) as total FROM penelitian t JOIN data_diri d ON d.NIY = t.NIY JOIN user u ON u.NIY = t.NIY JOIN prodi p ON p.ID = u.id_prod WHERE p.kode_prod = "+dataQuery.prodi+" AND tahun_dilaksanakan = "+dataQuery.tahun+" AND jenis_sumber_dana = 'dalam' ) as dn, "
    txt += "(SELECT COUNT(*) as total FROM penelitian t JOIN data_diri d ON d.NIY = t.NIY JOIN user u ON u.NIY = t.NIY JOIN prodi p ON p.ID = u.id_prod WHERE p.kode_prod = "+dataQuery.prodi+" AND tahun_dilaksanakan = "+dataQuery.tahun+" AND jenis_sumber_dana = 'luar' ) as ln "
    sql.query(txt,params,function(err, res){
        if(err){
            callback(err,null)
        }

        else{
            if(res[0])
                callback(null, res[0])
            else
                callback(null, 0)
        }
    })
}

function countRekapIhsan(dataQuery, callback){
    let txt = "SELECT "
    txt += " (SELECT count(*)  FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN prodi p ON p.ID = u.id_prod where d.status_dosen = 1 AND (u.status IN ('aktif','izinbelajar','tugasbelajar')) AND d.status_ihsan = 'FT') as dt_ft, "
    txt += " (SELECT count(*)  FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN prodi p ON p.ID = u.id_prod where d.status_dosen = 1 AND (u.status IN ('aktif','izinbelajar','tugasbelajar')) AND d.status_ihsan = 'Kader') as dt_kader, "
    txt += " (SELECT count(*)  FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN prodi p ON p.ID = u.id_prod where d.status_dosen = 1 AND (u.status IN ('aktif','izinbelajar','tugasbelajar')) AND d.status_ihsan = 'S1-Kader') as dt_s1_kader, "
    txt += " (SELECT count(*)  FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN prodi p ON p.ID = u.id_prod where d.status_dosen = 1 AND (u.status IN ('aktif','izinbelajar','tugasbelajar')) AND d.status_ihsan = 'Non-FT') as dt_non_ft, "    
    txt += " (SELECT count(*)  FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN prodi p ON p.ID = u.id_prod where d.status_dosen = 2 AND (u.status IN ('aktif','izinbelajar','tugasbelajar')) AND d.status_ihsan = 'FT') as dtt_ft, "
    txt += " (SELECT count(*)  FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN prodi p ON p.ID = u.id_prod where d.status_dosen = 2 AND (u.status IN ('aktif','izinbelajar','tugasbelajar')) AND d.status_ihsan = 'Kader') as dtt_kader, "
    txt += " (SELECT count(*)  FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN prodi p ON p.ID = u.id_prod where d.status_dosen = 2 AND (u.status IN ('aktif','izinbelajar','tugasbelajar')) AND d.status_ihsan = 'S1-Kader') as dtt_s1_kader, "
    txt += " (SELECT count(*)  FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN prodi p ON p.ID = u.id_prod where d.status_dosen = 2 AND (u.status IN ('aktif','izinbelajar','tugasbelajar')) AND d.status_ihsan = 'Non-FT') as dtt_non_ft, "
    txt += " (SELECT count(*)  FROM data_diri d JOIN user u ON u.NIY = d.NIY where d.status_dosen = 1 AND (u.status IN ('aktif','izinbelajar','tugasbelajar')) AND LENGTH(NIDN) >= 10) as dt_sudah_nidn, "
    txt += " (SELECT count(*)  FROM data_diri d JOIN user u ON u.NIY = d.NIY where d.status_dosen = 1 AND (u.status IN ('aktif','izinbelajar','tugasbelajar')) AND (LENGTH(NIDN) < 10 OR NIDN IS NULL OR NIDN = '')) as dt_belum_nidn, "
    txt += " (SELECT count(*)  FROM data_diri d JOIN user u ON u.NIY = d.NIY where d.status_dosen = 1 AND (u.status IN ('aktif','izinbelajar','tugasbelajar')) AND LENGTH(no_sertifikat_pendidik) > 6) as dt_sudah_serdos, "
    txt += " (SELECT count(*)  FROM data_diri d JOIN user u ON u.NIY = d.NIY where d.status_dosen = 1 AND (u.status IN ('aktif','izinbelajar','tugasbelajar')) AND (no_sertifikat_pendidik IS NULL OR no_sertifikat_pendidik = '')) as dt_belum_serdos "
    sql.query(txt,[],function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null, res)
    })
}

function countJabfung(dataQuery, callback){
    let txt = "SELECT "
    txt += " (SELECT count(*) as gb_dt FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN m_jabatan_akademik jf ON d.jabatan_fungsional = jf.id where jf.kode = 'GB' and d.status_dosen = 1 AND (u.status IN ('aktif','izinbelajar','tugasbelajar'))) as gb_dt, "
    txt += " (SELECT count(*) as gb_dtt FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN m_jabatan_akademik jf ON d.jabatan_fungsional = jf.id where jf.kode = 'GB' and d.status_dosen = 2 AND (u.status IN ('aktif','izinbelajar','tugasbelajar'))) as gb_dtt, "
    txt += " (SELECT count(*) as gb_dt FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN m_jabatan_akademik jf ON d.jabatan_fungsional = jf.id where jf.kode = 'LK' and d.status_dosen = 1 AND (u.status IN ('aktif','izinbelajar','tugasbelajar'))) as lk_dt, "
    txt += " (SELECT count(*) as gb_dtt FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN m_jabatan_akademik jf ON d.jabatan_fungsional = jf.id where jf.kode = 'LK' and d.status_dosen = 2 AND (u.status IN ('aktif','izinbelajar','tugasbelajar'))) as lk_dtt, "
    txt += " (SELECT count(*) as gb_dt FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN m_jabatan_akademik jf ON d.jabatan_fungsional = jf.id where jf.kode = 'L' and d.status_dosen = 1 AND (u.status IN ('aktif','izinbelajar','tugasbelajar'))) as l_dt, "
    txt += " (SELECT count(*) as gb_dtt FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN m_jabatan_akademik jf ON d.jabatan_fungsional = jf.id where jf.kode = 'L' and d.status_dosen = 2 AND (u.status IN ('aktif','izinbelajar','tugasbelajar'))) as l_dtt, "
    txt += " (SELECT count(*) as gb_dt FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN m_jabatan_akademik jf ON d.jabatan_fungsional = jf.id where jf.kode = 'AA' and d.status_dosen = 1 AND (u.status IN ('aktif','izinbelajar','tugasbelajar'))) as aa_dt, "
    txt += " (SELECT count(*) as gb_dtt FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN m_jabatan_akademik jf ON d.jabatan_fungsional = jf.id where jf.kode = 'AA' and d.status_dosen = 2 AND (u.status IN ('aktif','izinbelajar','tugasbelajar'))) as aa_dtt, "
    txt += " (SELECT count(*) as gb_dt FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN m_jabatan_akademik jf ON d.jabatan_fungsional = jf.id where jf.kode = 'TT' and d.status_dosen = 1 AND (u.status IN ('aktif','izinbelajar','tugasbelajar'))) as tp_dt, "
    txt += " (SELECT count(*) as gb_dtt FROM data_diri d JOIN user u ON u.NIY = d.NIY JOIN m_jabatan_akademik jf ON d.jabatan_fungsional = jf.id where jf.kode = 'TT' and d.status_dosen = 2 AND (u.status IN ('aktif','izinbelajar','tugasbelajar'))) as tp_dtt "
    
    sql.query(txt,[],function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null, res)
    })
}

function getListDataNIDN(dataQuery,callback){
    let params = []

    let txt = "select d.ID as dosenid, u.ID as userid, u.NIY, d.nama, d.NIDN, d.gelar_depan, d.gelar_belakang, p.nama as nama_prodi, p.kode_prod as kode_prodi, u.id_prod as id_prodi "
    txt += " , d.nik, d.tanggal_lahir, ja.nama as jabfung, pa.golongan as gol, pa.nama as namagol, u.email, bi.nama as bidang_ilmu, "
    txt += " bii.nama as bidang_ilmu_induk, bk.nama as kepakaran, bkp.nama as parent_kepakaran, "
    txt += " d.permalink, d.expertise, u.status as status_aktif, d.no_sertifikat_pendidik, u.sister_id, d.tautan_sk "
    txt += " from data_diri d "
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += " JOIN prodi p ON p.ID = u.id_prod "
    txt += " LEFT JOIN m_jabatan_akademik ja ON ja.id = d.jabatan_fungsional "
    txt += " LEFT JOIN m_pangkat pa on pa.id = d.pangkat "
    txt += " LEFT JOIN bidang_ilmu bi ON bi.kode = d.bidang_ilmu_id"
    txt += " LEFT JOIN bidang_ilmu bii ON bii.kode = bi.kode_id "
    txt += " LEFT JOIN bidang_kepakaran bk ON bk.id = d.kepakaran_id"
    txt += " LEFT JOIN bidang_kepakaran bkp ON bkp.kode = bk.parent"
    txt += " WHERE (u.status IN ('aktif','izinbelajar','tugasbelajar')) "

    if(dataQuery.status_dosen){
        txt += " AND d.status_dosen = ? "
        params.push(dataQuery.status_dosen)
    }

    if(dataQuery.bidang_ilmu_id){
        txt += " AND d.bidang_ilmu_id = ? "
        params.push(dataQuery.bidang_ilmu_id)
    }

    if(dataQuery.nidn){
        txt += " AND d.NIDN = ? "
        params.push(dataQuery.nidn)
    }

    if(dataQuery.NIY){
        txt += " AND d.NIY = ? "
        params.push(dataQuery.NIY)
    }

    if(dataQuery.prodi_id){
        txt += " AND u.id_prod = ? "
        params.push(dataQuery.prodi_id)
    }

    if(dataQuery.kode_prodi){
        txt += " AND p.kode_prod = ? "
        params.push(dataQuery.kode_prodi)
    }

    if(dataQuery.jabfung_id){
        txt += " AND d.jabatan_fungsional = ? "
        params.push(dataQuery.jabfung_id)
    }

    if(dataQuery.batas_usia){
        if(dataQuery.batas_usia == '1' && dataQuery.usia){
            txt += " AND TIMESTAMPDIFF(YEAR, d.tanggal_lahir, CURDATE()) > ? "
            params.push(dataQuery.usia)
        }
        else if(dataQuery.batas_usia == '2' && dataQuery.usia){
            txt += " AND TIMESTAMPDIFF(YEAR, d.tanggal_lahir, CURDATE()) <= ? "
            params.push(dataQuery.usia)
        }
    }
    
    if(dataQuery.jabfung){
        txt += " AND ja.kode = ? "
        params.push(dataQuery.jabfung)
    }

    if(dataQuery.is_berjabfung){
        txt += " AND ja.kode <> 'TT' "   
    }

    if(dataQuery.jenjang){
        txt += " AND d.jenjang_kode = ? "
        params.push(dataQuery.jenjang)
    }

    if(dataQuery.status == '1'){
        txt += " AND length(d.NIDN) = 10 "
    }

    else if(dataQuery.status == '-1'){
        txt += " AND length(d.NIDN) <> 10 "
    }

    if(dataQuery.wajib_tridharma){
        txt += " AND d.wajib_tridharma = ? "
        params.push(dataQuery.wajib_tridharma)
    }

    if(dataQuery.status_ihsan){
        txt += " AND d.status_ihsan = ? "
        params.push(dataQuery.status_ihsan)
    }

    txt += " ORDER BY d.nama ASC"

    sql.query(txt,params,function(err, res){
        if(err){
            console.log(err)
            callback(err,null)
        }
        else{
            
            let hsl = JSON.parse(JSON.stringify(res))
            let promises = hsl.map(function(obj){
                return new Promise((resolve, reject)=>{
                    let p = local_listSimpegSertifikasiProfesi(obj.NIDN, 'Sertifikasi Profesi')    
                    p.then(r=>{
                        let item = new Object
                        item = obj
                        item.sertifikasi = r 
                        resolve(item)
                    }).catch(e=>{
                        reject(e)
                    })    
                })
                
            })

            Promise.all(promises)
            .then(hasil=>{
                // console.log(hasil)
                // let obj = new Object
                // obj = hsl
                // obj.sertifikasi = hasil
                // hsl.sertifikasi = hasil
                callback(null,hasil)
            })
            .catch(err=>{

                callback(err,null)
            })
            // callback(null, res)
        }
    })
}

function getCountDataNIDN(dataQuery,callback){
    let params = []
    let txt = "select p.id, p.kode_prod, p.nama,  count(*) as total from data_diri d "
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += " JOIN prodi p ON p.ID = u.id_prod "
    txt += " WHERE (u.status IN ('aktif','izinbelajar','tugasbelajar')) "

    if(dataQuery.status_dosen){
        txt += " AND d.status_dosen = ? "
        params.push(dataQuery.status_dosen)
    }

    if(dataQuery.status == '1'){
        txt += " AND length(d.NIDN) = 10 "
    }

    else if(dataQuery.status == '-1'){
        txt += " AND length(d.NIDN) <> 10 "
    }

    if(dataQuery.wajib_tridharma){
        txt += " AND d.wajib_tridharma = ? "
        params.push(dataQuery.wajib_tridharma)
    }

    if(dataQuery.status_ihsan){
        txt += " AND d.status_ihsan = ? "
        params.push(dataQuery.status_ihsan)
    }

    if(dataQuery.kode_prodi){
        txt += " AND p.kode_prod = ? "
        params.push(dataQuery.kode_prodi)
    }

    if(dataQuery.jabfung_id){
        txt += " AND d.jabatan_fungsional = ? "
        params.push(dataQuery.jabfung_id)
    }

    if(dataQuery.batas_usia){
        if(dataQuery.batas_usia == '1' && dataQuery.usia){
            txt += " AND TIMESTAMPDIFF(YEAR, d.tanggal_lahir, CURDATE()) > ? "
            params.push(dataQuery.usia)
        }
        else if(dataQuery.batas_usia == '2' && dataQuery.usia){
            txt += " AND TIMESTAMPDIFF(YEAR, d.tanggal_lahir, CURDATE()) <= ? "
            params.push(dataQuery.usia)
        }
    }
    
    txt += " GROUP by p.id, p.nama"

    sql.query(txt,params,function(err, res){
        if(err){
            console.log(err)
            callback(err,null)
        }
        else
            callback(null, res)
    })
}

function getCountDataSerdos(dataQuery,callback){
    let params = []
    let txt = "select p.id, p.nama, count(*) as total from data_diri d "
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += " JOIN prodi p ON p.ID = u.id_prod "
    txt += " WHERE d.status_dosen = 1 AND (u.status IN ('aktif','izinbelajar','tugasbelajar')) "
    if(dataQuery.status == '1'){
        txt += " AND length(d.no_sertifikat_pendidik) > 6 "
    }

    else if(dataQuery.status == '-1'){
        txt += " AND d.no_sertifikat_pendidik is NULL OR d.no_sertifikat_pendidik = '' "
    }
    
    txt += " GROUP by p.id, p.nama"

    sql.query(txt,params,function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null, res)
    })
}

function getListDataSerdos(dataQuery,callback){
    let params = []
    let txt = "select d.ID as dosenid, u.ID as userid, u.NIY, d.nama, d.NIDN, d.gelar_depan, d.gelar_belakang, p.nama as nama_prodi, p.kode_prod as kode_prodi, u.id_prod as id_prodi "
    txt += " , d.nik, d.tanggal_lahir, ja.nama as jabfung, pa.golongan as gol, pa.nama as namagol, u.email, d.no_sertifikat_pendidik "
    txt += " from data_diri d "
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += " JOIN prodi p ON p.ID = u.id_prod "
    txt += " LEFT JOIN m_jabatan_akademik ja ON ja.id = d.jabatan_fungsional "
    txt += " LEFT JOIN m_pangkat pa on pa.id = d.pangkat "
    txt += " WHERE (u.status IN ('aktif','izinbelajar','tugasbelajar')) "
    
    if(dataQuery.status == '1'){
        txt += " AND length(d.no_sertifikat_pendidik) > 6 "
    }

    else if(dataQuery.status == '-1'){
        txt += " AND (d.no_sertifikat_pendidik is NULL OR d.no_sertifikat_pendidik = '') "
    }

    if(dataQuery.status_dosen){
        txt += " AND d.status_dosen = ? "
        params.push(dataQuery.status_dosen)
    }

    else{
        txt += " AND d.status_dosen = 1 "
    }



    if(dataQuery.prodi_id){
        txt += " AND u.id_prod = ? "
        params.push(dataQuery.prodi_id)
    }

    if(dataQuery.kode_prodi){
        txt += " AND p.kode_prod = ? "
        params.push(dataQuery.kode_prodi)
    }
    
    txt += " ORDER BY d.nama ASC"
    sql.query(txt,params,function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null, res)
    })
}

function getListLuaranWirausaha(dataQuery,callback){
    let txt = "SELECT pj.id, pj.nama, pj.deskripsi, pj.tahun_pelaksanaan, "
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT(dd.nama,' - ',dd.NIDN) "
    txt += " ORDER BY paa.id SEPARATOR '#') FROM pengabdian_luaran_authors paa JOIN user uu ON uu.NIY = paa.NIY "
    txt += " JOIN data_diri dd ON dd.NIY = uu.NIY WHERE paa.pengabdian_luaran_id = pj.id ) as authors "
    txt += " , (SELECT GROUP_CONCAT(DISTINCT CONCAT(ff.file_path) SEPARATOR '#') FROM pengabdian_luaran_files ff WHERE ff.parent_id = pj.id) AS docs "
    txt += " FROM wirausaha pj"
    txt += " WHERE 1 "
    let params = []
    if(dataQuery.tahun){
        txt += " AND tahun_pelaksanaan = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.jenis_litab){
        txt += " AND pj.jenis_litab = ? "
        params.push(dataQuery.jenis_litab)
    }

    sql.query(txt, params, function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null,res)
    })
}

function getListLuaranBuku(dataQuery,callback){
    let txt = "SELECT pj.id, pj.judul, pj.penerbit, jp.nama as jenis, pj.ISBN, pj.vol,pj.tahun,  "
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT(dd.nama,' - ',dd.NIDN) "
    txt += " ORDER BY paa.id SEPARATOR '#') FROM pengabdian_luaran_authors paa JOIN user uu ON uu.NIY = paa.NIY "
    txt += " JOIN data_diri dd ON dd.NIY = uu.NIY WHERE paa.pengabdian_luaran_id = pj.uuid ) as authors "
    txt += " , (SELECT GROUP_CONCAT(DISTINCT CONCAT(ff.file_path) SEPARATOR '#') FROM pengabdian_luaran_files ff WHERE ff.parent_id = pj.uuid)AS docs "
    txt += " FROM buku pj"
    txt += " JOIN jenis_luaran jp ON jp.id = pj.jenis_luaran_id WHERE 1 "
    let params = []
    if(dataQuery.tahun){
        txt += " AND tahun = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.jenis_litab){
        txt += " AND pj.jenis_litab = ? "
        params.push(dataQuery.jenis_litab)
    }



    sql.query(txt, params, function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null,res)
    })
}

function getListLuaranMitra(dataQuery,callback){
    let txt = "SELECT pj.id, pj.nama_mitra, pj.bidang_usaha, pj.lembaga, pj.no_badan_hukum,  pj.tahun_pelaksanaan, "
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT(dd.nama,' - ',dd.NIDN) "
    txt += " ORDER BY paa.id SEPARATOR '#') FROM pengabdian_luaran_authors paa JOIN user uu ON uu.NIY = paa.NIY "
    txt += " JOIN data_diri dd ON dd.NIY = uu.NIY WHERE paa.pengabdian_luaran_id = pj.id ) as authors "
    txt += " , (SELECT GROUP_CONCAT(DISTINCT CONCAT(ff.file_path) SEPARATOR '#') FROM pengabdian_luaran_files ff WHERE ff.parent_id = pj.id) AS docs "
    txt += " FROM mitra_hukum pj"
    txt += " WHERE 1 "
    let params = []
    if(dataQuery.tahun){
        txt += " AND tahun_pelaksanaan = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.jenis_litab){
        txt += " AND pj.jenis_litab = ? "
        params.push(dataQuery.jenis_litab)
    }

    sql.query(txt, params, function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null,res)
    })
}

function getListLuaranProduk(dataQuery,callback){
    let txt = "SELECT pj.id, pj.nama_produk, pj.lembaga, pj.nomor, pj.tahun_pelaksanaan, "
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT(dd.nama,' - ',dd.NIDN) "
    txt += " ORDER BY paa.id SEPARATOR '#') FROM pengabdian_luaran_authors paa JOIN user uu ON uu.NIY = paa.NIY "
    txt += " JOIN data_diri dd ON dd.NIY = uu.NIY WHERE paa.pengabdian_luaran_id = pj.id ) as authors "
    txt += " , (SELECT GROUP_CONCAT(DISTINCT CONCAT(ff.file_path) SEPARATOR '#') FROM pengabdian_luaran_files ff WHERE ff.parent_id = pj.id)AS docs "
    txt += " FROM produk_standar pj"
    txt += " WHERE 1 "
    let params = []
    if(dataQuery.tahun){
        txt += " AND tahun_pelaksanaan = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.jenis_litab){
        txt += " AND pj.jenis_litab = ? "
        params.push(dataQuery.jenis_litab)
    }

    if(dataQuery.jenis){
        txt += " AND pj.jenis = ? "
        params.push(dataQuery.jenis)
    }
    sql.query(txt, params, function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null,res)
    })
}

function getListLuaranLain(dataQuery,callback){
    let txt = "SELECT pj.id, pj.judul, pj.deskripsi, jp.nama as jenis, "
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT(dd.nama,' - ',dd.NIDN) "
    txt += " ORDER BY paa.id SEPARATOR '#') FROM pengabdian_luaran_authors paa JOIN user uu ON uu.NIY = paa.NIY "
    txt += " JOIN data_diri dd ON dd.NIY = uu.NIY WHERE paa.pengabdian_luaran_id = pj.uuid ) as authors "
    txt += " , (SELECT GROUP_CONCAT(DISTINCT CONCAT(ff.file_path) SEPARATOR '#') FROM pengabdian_luaran_files ff WHERE ff.parent_id = pj.uuid)AS docs "
    txt += " FROM luaran_lain pj"
    txt += " JOIN jenis_luaran jp ON jp.id = pj.jenis_luaran_id WHERE 1 "
    let params = []
    if(dataQuery.tahun){
        txt += " AND tahun_pelaksanaan = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.jenis_litab){
        txt += " AND pj.jenis_litab = ? "
        params.push(dataQuery.jenis_litab)
    }
    sql.query(txt, params, function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null,res)
    })
}


function getListLuaranHki(dataQuery,callback){
    let txt = "SELECT pj.id, pj.judul, pj.status_hki, jp.nama as jenis, pj.no_pendaftaran, "
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT(dd.nama,' - ',dd.NIDN) "
    txt += " ORDER BY paa.id SEPARATOR '#') FROM pengabdian_luaran_authors paa JOIN user uu ON uu.NIY = paa.NIY "
    txt += " JOIN data_diri dd ON dd.NIY = uu.NIY WHERE paa.pengabdian_luaran_id = pj.uuid ) as authors "
    txt += " , (SELECT GROUP_CONCAT(DISTINCT CONCAT(ff.file_path) SEPARATOR '#') FROM pengabdian_luaran_files ff WHERE ff.parent_id = pj.uuid)AS docs "
    txt += " FROM hki pj"
    txt += " JOIN jenis_luaran jp ON jp.id = pj.jenis_hki_id WHERE 1 "
    let params = []
    if(dataQuery.tahun){
        txt += " AND tahun_pelaksanaan = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.jenis_litab){
        txt += " AND pj.jenis_litab = ? "
        params.push(dataQuery.jenis_litab)
    }
    sql.query(txt, params, function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null,res)
    })
}

function getListLuaranForum(dataQuery,callback){
    let txt = "SELECT pj.id, pj.judul, pj.penyelenggara, jp.nama as jenis,pj.ISBN,pj.nama_forum, pj.tanggal_mulai, pj.tanggal_selesai, pj.link as url, pj.lokasi, "
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT(dd.nama,' - ',dd.NIDN) "
    txt += " ORDER BY paa.id SEPARATOR '#') FROM pengabdian_luaran_authors paa JOIN user uu ON uu.NIY = paa.NIY "
    txt += " JOIN data_diri dd ON dd.NIY = uu.NIY WHERE paa.pengabdian_luaran_id = pj.uuid ) as authors "
    txt += " , (SELECT GROUP_CONCAT(DISTINCT CONCAT(ff.file_path) SEPARATOR '#') FROM pengabdian_luaran_files ff WHERE ff.parent_id = pj.uuid)AS docs "
    txt += " FROM konferensi pj"
    txt += " JOIN tingkat jp ON jp.id = pj.tingkat_id WHERE 1 "
    let params = []
    if(dataQuery.tahun){
        txt += " AND tahun = ? "
        params.push(dataQuery.tahun)
    }

    if(dataQuery.jenis_litab){
        txt += " AND pj.jenis_litab = ? "
        params.push(dataQuery.jenis_litab)
    }
    sql.query(txt, params, function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null,res)
    })
}

function getListLuaranMediaMassa(dataQuery,callback){
    let txt = "SELECT pj.id, pj.judul, pj.nama_media, jp.nama as jenis,pj.url, pj.vol, pj.nomor, pj.halaman, "
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT(dd.nama,' - ',dd.NIDN) "
    txt += " ORDER BY paa.id SEPARATOR '#') FROM pengabdian_luaran_authors paa JOIN user uu ON uu.NIY = paa.NIY "
    txt += " JOIN data_diri dd ON dd.NIY = uu.NIY WHERE paa.pengabdian_luaran_id = pj.id ) as authors "
    txt += " , (SELECT GROUP_CONCAT(DISTINCT CONCAT(ff.file_path) SEPARATOR '#') FROM pengabdian_luaran_files ff WHERE ff.parent_id = pj.id)AS docs "
    txt += " FROM pengabdian_media_massa pj"
    txt += " JOIN jenis_luaran jp ON jp.id = pj.jenis_media_id WHERE 1 "
    let params = []
    if(dataQuery.tahun){
        txt += " AND tanggal_terbit LIKE ? "
        params.push(dataQuery.tahun+'%')
    }
    sql.query(txt, params, function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null,res)
    })
}

function getListLuaranJurnal(dataQuery,callback){
    let txt = "SELECT pj.id, pj.judul, pj.nama_jurnal, jp.nama as jenis,pj.url,pj.p_issn,pj.e_issn, pj.vol, pj.nomor, pj.hal_awal, pj.hal_akhir, "
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT(dd.nama,' - ',dd.NIDN) "
    txt += " ORDER BY paa.id SEPARATOR '#') FROM pengabdian_jurnal_author paa JOIN user uu ON uu.NIY = paa.NIY "
    txt += " JOIN data_diri dd ON dd.NIY = uu.NIY WHERE paa.pengabdian_jurnal_id = pj.id ) as authors "
    txt += " , (SELECT GROUP_CONCAT(DISTINCT CONCAT(ff.file_path) SEPARATOR '#') FROM pengabdian_luaran_files ff WHERE ff.parent_id = pj.id)AS docs "
    txt += " FROM pengabdian_jurnal pj"
    txt += " JOIN jenis_publikasi jp ON jp.kode = pj.jenis_publikasi_id WHERE 1 "
    let params = []
    if(dataQuery.tahun){
        txt += " AND tanggal_terbit LIKE ? "
        params.push(dataQuery.tahun+'%')
    }
    sql.query(txt, params, function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null,res)
    })
}

function getListMitra(dataQuery,callback){
    let params = []
    let txt = "SELECT pm.id, jm.nama as jenis, pm.nama, bidang_usaha, peningkatan_omzet, dana_pendamping FROM pengabdian_mitra pm "
    txt += " JOIN jenis_mitra jm ON jm.id = pm.jenis_mitra_id WHERE 1 "

    if(dataQuery.pengabdian_id){
        txt += " AND pm.pengabdian_id = ? "
        params.push(dataQuery.pengabdian_id)
    }
    sql.query(txt, params, function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null,res)
    })
}

function getListAbdimas(dataQuery, callback){
    let params = []
    let txt = "SELECT p.ID as id, p.judul_penelitian_pengabdian as judul, tahun_kegiatan, dana_pt, dana_dikti, dana_institusi_lain, skema, "
    txt += " tgl_mulai, tgl_akhir, t.nama as tingkat, jk.nama as jenis_kegiatan, p.jumlah_mahasiswa, p.jumlah_staf, p.jumlah_alumni, " 
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT(dd.nama,' - ',dd.NIDN) "
    txt += " ORDER BY paa.id SEPARATOR ', ') FROM pengabdian_anggota paa JOIN user uu ON uu.NIY = paa.NIY "
    txt += " JOIN data_diri dd ON dd.NIY = uu.NIY WHERE paa.pengabdian_id = p.ID ) as authors FROM user u "
    txt += " JOIN jabatan j ON j.NIY = u.NIY "
    
    txt += " JOIN unit_kerja uk ON uk.id = j.unker_id "
    txt += " JOIN pengabdian_anggota pa ON pa.NIY = u.NIY "
    txt += " JOIN pengabdian p ON p.ID = pa.pengabdian_id "
    txt += " LEFT JOIN tingkat t ON t.id = p.tingkat "
    txt += " LEFT JOIN jenis_kegiatan jk ON jk.id = p.jenis_kegiatan "
    txt += " WHERE j.jabatan_id = 13 "
    if(dataQuery.parent_id){
        txt += " AND uk.parent_id = ? "
        params.push(dataQuery.parent_id)
    }

    if(dataQuery.is_ristek){
        if(dataQuery.is_ristek == 'Y'){
            txt += " AND p.dana_dikti <> 0 "    
        }
        
        else if(dataQuery.is_ristek == 'N'){
            txt += " AND (p.dana_pt <> 0 OR p.dana_institusi_lain <> 0) "
        }    
    }

    if(dataQuery.tahun_kegiatan){
        txt += " AND p.tahun_kegiatan = ? "
        params.push(dataQuery.tahun_kegiatan)
    }

    txt += "GROUP BY p.ID, p.judul_penelitian_pengabdian, tahun_kegiatan, dana_pt, dana_dikti, dana_institusi_lain, skema, tgl_mulai, tgl_akhir, tingkat, jenis_kegiatan"

    sql.query(txt,params,function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null,res)
    })
}

function getListUnitKerja(dataQuery, callback){
    let txt = "SELECT uk.*, TRIM(CONCAT(dd.gelar_depan,' ', dd.nama,', ', dd.gelar_belakang)) as nama_pejabat, dd.NIY as niy FROM unit_kerja uk "
    txt += " JOIN user u ON u.ID = uk.pejabat_id "
    txt += " JOIN data_diri dd ON dd.NIY = u.NIY "
    txt += " WHERE 1 "
    let params = []
    if(dataQuery.nama_unit){
        txt += " AND uk.nama LIKE ? "
        params.push('%'+dataQuery.nama_unit+'%')
    }

    if(dataQuery.unit_id){
        txt += " AND uk.id = ? "
        params.push(dataQuery.unit_id)
    }

    if(dataQuery.jenis){
        txt += " AND uk.jenis = ? "
        params.push(dataQuery.jenis)
    }

    sql.query(txt,params,function(err, res){
        if(err)
            callback(err,null)
        else
            callback(null,res)
    })
}

function getListDosenJenjangJabfung(dataQuery, callback){
    var params = []

    txt = " select dd.NIDN, dd.nama as dosen, f.nama as fakultas, p.nama as prodi, ja.nama as jabfung "
    txt += " from data_diri dd "
    txt += " JOIN user u ON u.NIY = dd.NIY "
    txt += " JOIN prodi p ON u.id_prod = p.ID "
    txt += " JOIN fakultas f ON f.ID = p.id_fak "
    txt += " JOIN m_jabatan_akademik ja ON ja.id = dd.jabatan_fungsional "
    txt += " where (u.status IN ('aktif','izinbelajar','tugasbelajar')) AND LENGTH(dd.NIDN) > 9 "
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

        else
            callback(null, res)
    })
}


function getRekapDosenJabfungDetail(dataQuery, callback){
    var params = []

    txt = " select dd.jenjang_kode, jp.nama_lain2, "
    txt += " (SELECT count(*) FROM data_diri d JOIN m_jabatan_akademik ja ON ja.id = d.jabatan_fungsional JOIN user uu ON uu.NIY = d.NIY WHERE u(u.status IN ('aktif','izinbelajar','tugasbelajar')) AND ja.kode = 'GB' and d.jenjang_kode = dd.jenjang_kode AND d.status_dosen = dd.status_dosen AND LENGTH(d.NIDN) > 9) as gb, "
    txt += " (SELECT count(*) FROM data_diri d JOIN m_jabatan_akademik ja ON ja.id = d.jabatan_fungsional JOIN user uu ON uu.NIY = d.NIY WHERE u(u.status IN ('aktif','izinbelajar','tugasbelajar')) AND ja.kode = 'LK' and d.jenjang_kode = dd.jenjang_kode AND d.status_dosen = dd.status_dosen AND LENGTH(d.NIDN) > 9) as lk, "
    txt += " (SELECT count(*) FROM data_diri d JOIN m_jabatan_akademik ja ON ja.id = d.jabatan_fungsional JOIN user uu ON uu.NIY = d.NIY WHERE u(u.status IN ('aktif','izinbelajar','tugasbelajar')) AND ja.kode = 'L' and d.jenjang_kode = dd.jenjang_kode AND d.status_dosen = dd.status_dosen AND LENGTH(d.NIDN) > 9) as l, "
    txt += " (SELECT count(*) FROM data_diri d JOIN m_jabatan_akademik ja ON ja.id = d.jabatan_fungsional JOIN user uu ON uu.NIY = d.NIY WHERE u(u.status IN ('aktif','izinbelajar','tugasbelajar')) AND ja.kode = 'AA' and d.jenjang_kode = dd.jenjang_kode AND d.status_dosen = dd.status_dosen AND LENGTH(d.NIDN) > 9) as aa, "
    txt += " (SELECT count(*) FROM data_diri d JOIN m_jabatan_akademik ja ON ja.id = d.jabatan_fungsional JOIN user uu ON uu.NIY = d.NIY WHERE u(u.status IN ('aktif','izinbelajar','tugasbelajar')) AND ja.kode = 'TT' and d.jenjang_kode = dd.jenjang_kode AND d.status_dosen = dd.status_dosen AND LENGTH(d.NIDN) > 9 ) as tt "
    txt += " from data_diri dd "
    txt += " JOIN m_jenjang_pendidikan jp ON jp.kode = dd.jenjang_kode "
    txt += " JOIN user u ON u.NIY = dd.NIY "
    txt += " WHERE (u.status IN ('aktif','izinbelajar','tugasbelajar')) AND LENGTH(dd.NIDN) > 9 "
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

        else
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
    txt += " where (u.status IN ('aktif','izinbelajar','tugasbelajar')) AND LENGTH(dd.NIDN) > 9 "
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

        else
            callback(null, res)
    })
}

function getRekapDosenPerfakultas(dataQuery, callback){
    
    var params = []

    txt = " select f.ID as fid, "
    txt += " (SELECT count(*) from data_diri ddd JOIN user uu ON uu.NIY = ddd.NIY JOIN prodi pp ON uu.id_prod = pp.ID JOIN fakultas ff ON ff.ID = pp.id_fak WHERE ddd.jenjang_kode = 'S2' AND ff.ID = f.ID AND ddd.status_dosen = dd.status_dosen AND u(u.status IN ('aktif','izinbelajar','tugasbelajar')) AND LENGTH(ddd.NIDN) > 9 ) as S2, "
    txt += " (SELECT count(*) from data_diri ddd JOIN user uu ON uu.NIY = ddd.NIY JOIN prodi pp ON uu.id_prod = pp.ID JOIN fakultas ff ON ff.ID = pp.id_fak WHERE ddd.jenjang_kode = 'S3' AND ff.ID = f.ID AND ddd.status_dosen = dd.status_dosen AND u(u.status IN ('aktif','izinbelajar','tugasbelajar')) AND LENGTH(ddd.NIDN) > 9) as S3, "
    txt += " (SELECT count(*) from data_diri ddd JOIN user uu ON uu.NIY = ddd.NIY JOIN prodi pp ON uu.id_prod = pp.ID JOIN fakultas ff ON ff.ID = pp.id_fak WHERE ddd.jenjang_kode = 'PROFESI' AND ff.ID = f.ID AND ddd.status_dosen = dd.status_dosen AND u(u.status IN ('aktif','izinbelajar','tugasbelajar')) AND LENGTH(ddd.NIDN) > 9) as PROFESI "
    txt += " from data_diri dd "
    txt += " JOIN user u ON u.NIY = dd.NIY "
    txt += " JOIN prodi p ON u.id_prod = p.ID "
    txt += " JOIN fakultas f ON f.ID = p.id_fak "
    txt += " where (u.status IN ('aktif','izinbelajar','tugasbelajar')) AND LENGTH(dd.NIDN) > 9  "
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

        else
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
    var txt = "select * FROM pendidikan"
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

    var txt = "select d.NIY, d.NIDN, d.gelar_depan, d.gelar_belakang, d.nama, d.gender, u.email, d.tempat_lahir, "
    txt += " d.tanggal_lahir, p.nama as pangkat, p.golongan, j.nama as jabfung, j.kode as kode_jabfung, "
    txt += " d.jenjang_kode, pr.nama as nama_prodi,pr.kode_prod as kode_prodi, u.status, bi.nama as bidang_ilmu, "
    txt += " bii.nama as bidang_ilmu_induk, bk.nama as kepakaran, bkp.nama as parent_kepakaran, "
    txt += " d.permalink, d.expertise, d.nik as ktp, u.sister_id, u.uuid, d.kode_feeder, d.id_reg_ptk, (SELECT GROUP_CONCAT(item_name) FROM auth_assignment WHERE u.id = user_id) as roles from data_diri d "
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

    if(data.jenjang_kode){
        txt += " AND d.jenjang_kode = ? "
        params.push(data.jenjang_kode)
    }

    if(data.NIY){
        txt += " AND d.NIY = ? "
        params.push(data.NIY)
    }

    if(data.kode_unik){
        txt += " AND d.kode_unik = ? "
        params.push(data.kode_unik)
    }

    if(data.uuid){
        txt += " AND u.uuid = ? "
        params.push(data.uuid)
    }

    if(data.telegram_username){
        txt += " AND d.telegram_username = ? "
        params.push(data.telegram_username)
    }

    sql.query(txt,params,function(err, res){
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

        else
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

        else
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

        else
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

        else
            callback(null, res)
    })
}

function verifikasiLuaranLain(dataPost, callback){
    
    var txt = "UPDATE luaran_lain SET ver = ?, komentar = ? WHERE id = ?; "
    
    let params = [dataPost.ver,dataPost.komentar,dataPost.id]

    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        else
            callback(null, res)
    });
}

function verifikasiHki(dataPost, callback){
    
    var txt = "UPDATE hki SET ver = ?, komentar = ? WHERE id = ?; "
    
    let params = [dataPost.ver,dataPost.komentar,dataPost.id]

    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        else
            callback(null, res)
    });
}

function verifikasiKonferensi(dataPost, callback){
    
    var txt = "UPDATE konferensi SET ver = ?, komentar = ? WHERE ID = ?; "
    
    let params = [dataPost.ver,dataPost.komentar,dataPost.id]

    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        else
            callback(null, res)
    });
}

function verifikasiBuku(dataPost, callback){
    
    var txt = "UPDATE buku SET ver = ?, komentar = ? WHERE ID = ?; "
    
    let params = [dataPost.ver,dataPost.komentar,dataPost.id]

    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        else
            callback(null, res)
    });
}


function verifikasiJurnal(dataPost, callback){
    
    var txt = "UPDATE jurnal SET is_approved = ?, komentar = ? WHERE id = ?; "
    
    let params = [dataPost.is_approved,dataPost.komentar,dataPost.id]

    sql.query(txt, params, function(err, res){
        if(err) callback(err,null)

        else
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

        else 
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

        else
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

        else 
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
        else
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

        else 
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

        else 
            callback(null, res)
    });
}

function listBuku(dataQuery, callback){
    let params = []
    var txt = "SELECT j.ID, komentar, ver,  judul, penerbit, ISBN, vol, link, tahun, "
    txt += " (SELECT GROUP_CONCAT(DISTINCT CONCAT('<strong>',dd.nama,'</strong>', ' <br>NIDN : ',dd.NIDN)  ORDER BY ha.id SEPARATOR '<br>') FROM buku_author ha JOIN user u ON u.NIY = ha.NIY JOIN data_diri dd ON dd.NIY = u.NIY WHERE ha.buku_id = j.id ) as authors "
    txt += " from buku j "
    txt += " JOIN jenis_publikasi pub ON pub.id = j.jenis_luaran_id "
    if(dataQuery.NIY){
        txt += " JOIN buku_author ja ON ja.buku_id = j.id "
        txt += " WHERE 1 "
        txt += " AND ja.NIY = ? "
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

        else 
            callback(null, res)
    });
}

function rekapBuku(dataQuery, callback){
    let params = []
    var txt = "select jenis_luaran_id as pub_id, pub.nama, count(*) as jumlah from buku j "
    
    // var txt = "SELECT j.ID, judul, penerbit, ISBN, vol, link, tahun from buku j "
    txt += " JOIN jenis_publikasi pub ON pub.id = j.jenis_luaran_id "
    if(dataQuery.NIY){
        txt += " left join buku_author ja ON ja.buku_id = j.id "
        txt += " WHERE ver = 'Sudah Diverifikasi'  "
        txt += " and ja.NIY = ? "
        params.push(dataQuery.NIY)   
    }
    else 
        txt += " WHERE ver = 'Sudah Diverifikasi' "

    if(dataQuery.tahun){
        txt += " and tahun = ? "
        params.push(dataQuery.tahun)
    }

    

    txt += " group by pub_id, pub.nama "
    sql.query(txt, params, function(err, res){
        if(err) {
            console.log(err)
            callback(err,null)
        }

        else
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
        if(err) 
            callback(err,null)

        else 
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
        if(err) 
            callback(err,null)

        else
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

        else
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

        else 
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

        else 
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
        if(err) 
            callback(err, null)
        else
            callback(null, res)
    })
}

function countBuku(dataQuery, callback){
    var params = []

    var txt = "select tahun, count(*) as jumlah from buku b "
    if(dataQuery.NIY){
        txt += " join buku_author ja ON ja.buku_id = j.id "
        txt += " WHERE   "
        txt += " ja.NIY = ? "
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
        if(err) {
            console.log(err)
            callback(err, null)
        }
        else
            callback(null, res)
    })
}

function getListDosen(data,callback){
    var params = []
    var txt = "select d.NIY, d.NIDN, d.nama, d.gender, u.email, d.tempat_lahir, "
    txt += " d.tanggal_lahir, p.nama as pangkat, p.golongan, j.nama as jabfung, "
    txt += " d.jenjang_kode, pr.nama as nama_prodi, u.status, bi.nama as bidang_ilmu, "
    txt += " bii.nama as bidang_ilmu_induk, d.permalink, bk.nama as kepakaran, "
    txt += " bkp.nama as parent_kepakaran, d.expertise, d.kode_unik, d.gelar_depan as gd, d.gelar_belakang  as gb from data_diri d "
    txt += " JOIN m_pangkat p on p.id = d.pangkat"
    txt += " JOIN m_jabatan_akademik j on j.id = d.jabatan_fungsional"
    txt += " JOIN user u ON u.NIY = d.NIY "
    txt += " JOIN prodi pr ON pr.ID = u.id_prod "
    txt += " LEFT JOIN bidang_ilmu bi ON bi.kode = d.bidang_ilmu_id"
    txt += " LEFT JOIN bidang_ilmu bii ON bii.kode = bi.kode_id"
    txt += " LEFT JOIN bidang_kepakaran bk ON bk.id = d.kepakaran_id"
    txt += " LEFT JOIN bidang_kepakaran bkp ON bkp.kode = bk.parent"
    txt += " WHERE d.nama <> '-' AND  (u.status IN ('aktif','izinbelajar','tugasbelajar')) "

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
Pegawai.getListUnitKerja = getListUnitKerja
Pegawai.getListAbdimas = getListAbdimas
Pegawai.getListMitra = getListMitra
Pegawai.getListLuaranJurnal = getListLuaranJurnal
Pegawai.getListLuaranMediaMassa = getListLuaranMediaMassa
Pegawai.getListLuaranForum = getListLuaranForum
Pegawai.getListLuaranHki =getListLuaranHki
Pegawai.getListLuaranLain = getListLuaranLain
Pegawai.getListLuaranProduk = getListLuaranProduk
Pegawai.getListLuaranMitra = getListLuaranMitra
Pegawai.getListLuaranBuku = getListLuaranBuku
Pegawai.getListLuaranWirausaha = getListLuaranWirausaha
Pegawai.getCountDataSerdos = getCountDataSerdos
Pegawai.getCountDataNIDN = getCountDataNIDN
Pegawai.getListDataNIDN = getListDataNIDN
Pegawai.getListDataSerdos = getListDataSerdos
Pegawai.countJabfung = countJabfung
Pegawai.countRekapIhsan = countRekapIhsan
Pegawai.countSimpegPenelitian = countSimpegPenelitian
Pegawai.countSimpegPengabdian = countSimpegPengabdian
Pegawai.listSimpegPenelitian = listSimpegPenelitian
Pegawai.listSimpegPengabdian = listSimpegPengabdian
Pegawai.getListPublikasiJurnal = getListPublikasiJurnal
Pegawai.listDosenJabfung = listDosenJabfung
Pegawai.getListHki = getListHki
Pegawai.getListLuaranLainEkinerja = getListLuaranLainEkinerja
Pegawai.getListBuku = getListBuku
Pegawai.getListPengelolaJurnal = getListPengelolaJurnal
Pegawai.getListOrasiIlmiah = getListOrasiIlmiah
Pegawai.getListVisitingScientist = getListVisitingScientist
Pegawai.getDataByRFID = getDataByRFID
Pegawai.insertKehadiran = insertKehadiran
Pegawai.getRekapEwmp = getRekapEwmp
Pegawai.listSimpegAnggotaProfesi = listSimpegAnggotaProfesi
Pegawai.getBkdDosenAjar = getBkdDosenAjar
Pegawai.getBkdDosenRisetAbdimas = getBkdDosenRisetAbdimas
Pegawai.getBkdDosenMenjabat = getBkdDosenMenjabat
Pegawai.rekapRumpunIlmuDosen = rekapRumpunIlmuDosen
Pegawai.listPublikasiDosen = listPublikasiDosen
Pegawai.getJabatanFungsional = getJabatanFungsional
module.exports= Pegawai;