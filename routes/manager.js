var express = require('express');
var router = express.Router();
var crawlerUtil = require('../utils/crawlerUtil.js');
var cheerio = require('cheerio');

router.get('/', function(req, res){
	res.render('manager',{message:"欢迎访问后台管理系统"});
});

router.get('/stockcodes', function(req, res){
	var url = "http://www.dingniu888.com/stock_code.html";
	console.log(url);
	crawlerUtil.get(url,function(content,status){
		console.log("status:="+status);
		var $ = cheerio.load(content);
		var codeStr = $('.f14').text().match(/\d+/g);

		res.json(codeStr);
	});
});

module.exports = router;
