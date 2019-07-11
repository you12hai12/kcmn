var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

//get方法
router.get('/', (req, res) => {
	res.json({
		aaa:123,
		bbb:123
	})
});

//查询一条
router.post('/queryOne', (req, res) => {
	console.log(req)
    var sql = $sql.student.queryOne;    
    var params = req.body;    
    conn.query(sql, [], function(err, result) {    
        if (err) {       
            console.log(err);
        }        
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//查询所有
router.post('/queryAll', (req, res) => {
	console.log(req)
    var sql = $sql.student.queryAll;    
    var params = req.body;    
    conn.query(sql, [], function(err, result) {    
        if (err) {       
            console.log(err);
        }        
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//增加用户
router.post('/addStu', (req, res) => {
	console.log(req)
    var sql = $sql.student.add;    
    var params = req.body;    
    conn.query(sql, [params.sno,params.sname, params.sage], function(err, result) {    
        if (err) {       
            console.log(err);
        }        
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//修改用户
router.post('/editStu', (req, res) => {
	console.log(req)
    var sql = $sql.student.edit;    
    var params = req.body;    
    conn.query(sql, [params.sname, params.sage,params.sno], function(err, result) {    
        if (err) {       
            console.log(err);
        }        
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//删除用户
router.post('/delStu', (req, res) => {
	console.log(req)
    var sql = $sql.student.del;    
    var params = req.body;    
    conn.query(sql, [params.sno], function(err, result) {    
        if (err) {       
            console.log(err);
        }        
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//查询图形数据
router.post('/queryChart', (req, res) => {
	console.log(req)
    var sql = $sql.student.queryChart;    
    var params = req.body;    
    conn.query(sql, [], function(err, result) {    
        if (err) {       
            console.log(err);
        }        
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//查询图形标题
router.post('/queryTitle', (req, res) => {
	console.log(req)
    var sql = $sql.student.queryTitle;    
    var params = req.body;    
    conn.query(sql, [], function(err, result) {    
        if (err) {       
            console.log(err);
        }        
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//增加图形数据
router.post('/addChart', (req, res) => {
	console.log(req)
    var sql = $sql.student.addChart;    
    var params = req.body;    
    conn.query(sql, [params.week,params.sales], function(err, result) {    
        if (err) {       
            console.log(err);
        }        
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//修改图形数据
router.post('/editChart', (req, res) => {
	console.log(req)
    var sql = $sql.student.editChart;    
    var params = req.body;    
    conn.query(sql, [params.sales,params.week], function(err, result) {    
        if (err) {       
            console.log(err);
        }        
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//删除图形数据
router.post('/delChart', (req, res) => {
	console.log(req)
    var sql = $sql.student.delChart;    
    var params = req.body;    
    conn.query(sql, [params.week], function(err, result) {    
        if (err) {       
            console.log(err);
        }        
        if (result) {
            jsonWrite(res, result);
        }
    })
});

module.exports = router;