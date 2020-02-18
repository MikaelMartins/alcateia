var mssql = require('mssql');
var model = require('../model/product');

exports.get = (req, res, next) => {
    res.sendFile(global.basedir + "/views/lista.html");
}

exports.getCad = (req, res, next) => {
    res.sendFile(global.basedir + "/views/index.html");
}

exports.getUp = (req, res, next) => {
    res.sendFile(global.basedir + "/views/editar.html");
}

exports.getScript = (req, res, next) => {
    res.sendFile(global.basedir + "/src/assets/js/script.js");
}

exports.getStyle = (req, res, next) => {
    res.sendFile(global.basedir + "/src/assets/css/style.css");
}

exports.post = model.client;
exports.postEditList = model.editList;
exports.postCad = model.cadClient;
exports.postContact = model.cadContact;
exports.postDel = model.delete;
exports.postUp = model.update;