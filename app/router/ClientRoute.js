var express = require('express');
var router = express.Router();
var mssql = require('mssql');

router.get('/', function(req, res) {

	res.sendFile(global.basedir + "/views/lista.html")

});

router.get('/cadastrar', function(req, res) {
	res.sendFile(global.basedir + "/views/index.html");
});

router.get('/editar', function(req, res) {
	res.sendFile(global.basedir + "/views/editar.html");
	
});

router.get('/salvo', function(req, res) {
	res.sendFile(global.basedir + "/model/script.js");
	
});


router.post('/list', function(req, res) {
	var request = new mssql.Request();

	request.query(`SELECT client.id, contactClient.codeId, client.name, client.mail, contactClient.contact
	FROM client
	INNER JOIN contactClient ON client.id=contactClient.codeId`, function(err, recordset) {
		if (err) console.log(err);

		res.send(recordset.recordsets[0]);

	});
});


router.post('/list/edit/:id', function(req, res) {
	var request = new mssql.Request();
	var id = req.params.id;
	console.log(id);

	request.query(`SELECT client.id, contactClient.codeId, client.name, client.mail, contactClient.contact
	FROM client
	INNER JOIN contactClient ON client.id=`+id, function(err, recordset) {
		if (err) console.log(err);

		res.send(recordset.recordsets[0]);

	});
});


//===================== cadastro ====================================

router.post('/add/:name/:mail/:contact/:action', function(req, res) {
	
	var mssql_request = new mssql.Request();

	mssql_request.input('action', mssql.Int, req.params.action);
	mssql_request.input('name', mssql.Text, req.params.name);
	mssql_request.input('mail', mssql.Text, req.params.mail);
	mssql_request.input('contact', mssql.Text, req.params.contact);
	mssql_request.execute('dbo.StoredController').then(function(dataset) {
		if(dataset && dataset.recordsets && dataset.recordsets.length > 0)
		{
			res.status(200).send(dataset.recordset[0]);
		}
		else
		{
			res.status(400).send({Error:"Algo deu errado aqui."});
		}
	}).catch(function(err)  {
		res.status(400).send(err);
	});

});

//=============================== extra ==================================================


router.post('/add/:contact/:action', function(req, res) {
	
	var mssql_request = new mssql.Request();

	mssql_request.input('action', mssql.Int, req.params.action);
	mssql_request.input('contact', mssql.Text, req.params.contact);
	mssql_request.execute('dbo.StoredController').then(function(dataset) {
		if(dataset && dataset.recordsets && dataset.recordsets.length > 0)
		{
			res.status(200).send(dataset.recordset[0]);
		}
		else
		{
			res.status(400).send({Error:"Algo deu errado aqui."});
		}
	}).catch(function(err)  {
		res.status(400).send(err);
	});

});


//=============================== DELETE ==================================================

router.post('/del/:id/:action', function(req, res) {
	
	var mssql_request = new mssql.Request();

	mssql_request.input('action', mssql.Int, req.params.action);
	mssql_request.input('id', mssql.Int, req.params.id);
	mssql_request.execute('dbo.StoredController').then(function(dataset) {
		if(dataset && dataset.recordsets && dataset.recordsets.length > 0)
		{
			res.status(200).send(dataset.recordset[0]);
		}
		else
		{
			res.status(400).send({Error:"Erro ao deletar o cliente."});
		}
	}).catch(function(err)  {
		res.status(400).send(err);
	});
});

//================================ EDITAR ====================================

router.post('/edit/:id/:name/:mail/:contact/:action', function(req, res) {
	
	var mssql_request = new mssql.Request();

	mssql_request.input('action', mssql.Int, req.params.action);
	mssql_request.input('name', mssql.Text, req.params.name);
	mssql_request.input('mail', mssql.Text, req.params.mail);
	mssql_request.input('contact', mssql.Text, req.params.contact);
	mssql_request.input('id', mssql.Int, req.params.id);
	mssql_request.execute('dbo.StoredController').then(function(dataset) {
		if(dataset && dataset.recordsets && dataset.recordsets.length > 0)
		{
			res.status(200).send(dataset.recordset[0]);
		}
		else
		{
			res.status(400).send({Error:"Erro ao Atualizar o cliente."});
		}
	}).catch(function(err)  {
		res.status(400).send(err);
	});
});

module.exports = router;