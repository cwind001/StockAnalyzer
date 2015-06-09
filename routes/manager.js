var express = require('express');
var router = express.Router();
var crawlerUtil = require('../utils/crawlerUtil.js');
var cheerio = require('cheerio');

router.get('/', function(req, res){
	res.render('manager',{message:"欢迎访问后台管理系统"});
});

//Get stockcodes from dingniu888
/**
router.get('/stockcodes', function(req, res){
	var url = "http://www.dingniu888.com/stock_code.html";
	console.log(url);
	crawlerUtil.get(url,function(content,status){
		console.log("status:="+status);
		var $ = cheerio.load(content);
		var codeStr = $('.f14').text().match(/\d+/g);
		console.log(codeStr)
		res.json(codeStr);
	});
});
**/

router.get('/stockcodes/:id', function(req, res){
	var url = "http://www.tophold.com/asset_class/stocks/list?china_mtk=ss&page="+req.params.id+"&typ=china";
	console.log(url);
	crawlerUtil.get(url, function(content, status){
		console.log("status:="+status);
		var $ = cheerio.load(content);
		var stocklist = [];
		$('.market_whole_wrap table tbody tr').each(function(){
			var $me = $(this);
			var s = $me.find('.td05 em').text();
			var stock = {
				code: $me.find('.td01 a').text(),
				name: $me.find('.td02 a').text(),
				newest: $me.find('.td03 em').text(),
				offset: $me.find('.td04 em').text(),
				offrate: s.substr(0, s.indexOf("%")),
				high: $me.find('.td06 em').text(),
				low: $me.find('.td07 em').text(),
				close: $me.find('.td08 em').text(),
				open: $me.find('.td09 em').text(),
				volumn: $me.find('.td10 em').text().replace(/\,/g,''),
				turnover: $me.find('.td11 em').text().replace(/\,/g,'')
			}
			stocklist.push(stock);
		})
		
		console.log(stocklist);
		res.json(stocklist);
	})
});

router.get('/stockdetails', function(req, res){
	var url = "http://hq.sinajs.cn/list=sh600652";
	console.log(url);
	crawlerUtil.get(url,function(content,status){
		console.log("status:="+status);
		res.json(content);
	});
});


module.exports = router;
