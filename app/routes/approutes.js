'use strict';
module.exports = function(app) {
  var todoList = require('../controller/appController');
 
  app.route('/m/izin/create')
    .post(todoList.createIzin);

  app.route('/m/izin/riwayat')
    .get(todoList.getRiwayatIzin);

};