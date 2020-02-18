//========== requisições =================

var express = require('express');
var router = express.Router();
var mssql = require('mssql');
var controller = require('../controller/clientController');

//========== ROTAS GET ===================

router.get('/', controller.get);
router.get('/cadastrar', controller.getCad);
router.get('/editar', controller.getUp);
router.get('/script', controller.getScript);

//=============== ROTAS POST =======================================

router.post('/list', controller.post);
router.post('/list/edit/:id', controller.postEditList);
router.post('/add/:name/:mail/:contact/:action', controller.postCad);
router.post('/add/:contact/:action', controller.postContact);
router.post('/del/:id/:action', controller.postDel);
router.post('/edit/:clientId/:name/:mail/:contact/:action', controller.postUp);

module.exports = router;