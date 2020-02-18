var mssql = require('mssql');

exports.client = (req, res, next) => {

    var request = new mssql.Request();

	request.query(`SELECT client.id, contactClient.codeId, client.name, client.mail, contactClient.contact
	FROM client
	INNER JOIN contactClient ON client.id=contactClient.codeId`, function(err, recordset) {
		if (err) console.log(err);
		res.send(recordset.recordsets[0]);
	});
}

exports.editList = (req, res, next) => {

    var id = req.params.id;
	var request = new mssql.Request();

	request.query(`SELECT client.id, contactClient.codeId, client.name, client.mail, contactClient.contact
	FROM client
	INNER JOIN contactClient ON client.id=`+id, function(err, recordset) {
		if (err) console.log(err);
		res.send(recordset.recordsets[0]);
	});
}

exports.cadClient = (req, res, next) => {

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
}

exports.cadContact = (req, res, next) => {

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
}

exports.delete = (req, res, next) => {

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
}

exports.update = (req, res, next) => {

    var mssql_request = new mssql.Request();

	mssql_request.input('action', mssql.Int, req.params.action);
	mssql_request.input('name', mssql.Text, req.params.name);
	mssql_request.input('mail', mssql.Text, req.params.mail);
	mssql_request.input('contact', mssql.Text, req.params.contact);
	mssql_request.input('id', mssql.Int, req.params.clientId);
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
}