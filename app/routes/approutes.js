'use strict';


module.exports = function(app) {
  var todoList = require('../controller/appController');

  app.route('/simpeg/dosen/list')
    .get(todoList.getListDosen);

  app.route('/simpeg/tendik/list')
    .get(todoList.getListTendik);


};