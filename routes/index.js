
/*
 * GET home page.
 */

var kv = require('filekvdb');
var fs = require('fs');

exports.index = function(req, res){
  res.render('index', { title: '小学生口算' });
};

exports.kvdb = function(req, res){
  res.render('kvdb', { title: 'KVDB' });
};

exports.list = function(req, res){
	kv.init('./public/kvdb');
	var keys = kv.list();
	var ret={};
  for( k in keys ) {
   	var K = keys[k];
   	console.log(K);
		var V = kv.get(K).toString();
   	console.log(V);
		ret[K]=V;
	}
	res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
	res.write(JSON.stringify(ret));
	res.end();
};

exports.set = function(req, res){
	kv.init('./public/kvdb');
	var K = req.body['K'];
	var V = req.body['V'];
 	console.log(K+':'+V);
	kv.set(K,V);
	var ret = { 'err':'OK' };
	res.writeHead(200,{'Content-Type': 'text/json'});
	res.write(ret.toString());
	res.end();
};
