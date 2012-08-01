
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
	kvinit();
	var keys = kv.list();
	var ret={};
  for( k in keys ) {
   	var K = keys[k];
   	var V = kv.get(K).toString();
   	ret[K]=V;
   	console.log(K+':'+V);
	}
	res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
	res.write(JSON.stringify(ret));
	res.end();
};

exports.set = function(req, res){
	kvinit();
	console.log(JSON.stringify(req.body));
	for( var i in req.body ) {
		var K = req.body[i]['K'];
		var V = req.body[i]['V'];
 		console.log(K+':'+V);
		kv.set(K,V);
	}	
	var ret = { 'err':'OK' };
	res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
	res.write(JSON.stringify(ret));
	res.end();
};

exports.setbyget = function(req, res){
	kvinit();
	var K = req.query['K'];
	var V = req.query['V'];
 	console.log(K+':'+V);
	kv.set(K,V);
	var ret = { 'err':'OK' };
	res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
	res.write(JSON.stringify(ret));
	res.end();
};

exports.get = function(req, res){
	kvinit();
	var K = req.query['K'];
	console.log(K+':');
	V=kv.get(K);
	console.log(K+':'+V);
	var ret = { 'V':V.toString() };
	res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
	res.write(JSON.stringify(ret));
	res.end();
};

kvinit = function() {
	kv.root(__dirname+'/../public/kvdb');
	kv.newDB('arithmetic');
	kv.DB('arithmetic');
	kv.newTable('tuantuan');
	kv.Table('tuantuan');
}
