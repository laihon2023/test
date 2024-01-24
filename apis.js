var express = require('express');
const fs = require('fs');   //讀取服務器的模組
var app = express();
var router = express.Router();
const db = require('../config/db');
var sql=require('mssql');


//讀取資料庫
router.get('/student',function(req,res){
    sql.connect(db,function (err) {
        if(err) console.log(err);
      

        var request=new sql.Request();
     request.query('select * from Student',function(err,recordset){
        if(err) console.log(err);

        res.send(recordset.recordset);
        });
      });
});

router.get('/images', function(req, res) {
    const data= req.query;
    res.send({ success: true, data }).end();
});

router.post('/imagesPost', function(req, res) {
    
    let data = [];
    req.on('data',(chunk) =>{
        data.push(chunk);
    } );

    req.on('end', () => {
        data = Buffer.concat(data).toString();
        data = JSON.parse(data);
        res.send({ success: true, data: data }).end();
    })
});

const sendResponse = (filename,statusCode,response) => {
    //讀取文件（需提供路徑+文件名）==>此為非同步讀取
    //寫入文件：fs.writeFile('路徑+檔名',data_json,function(err){    });
    //新增寫入文件：fs.appendFile('test.txt', '我很好！', function (err) {    });
    //刪除存在的文件：fs.unlink('test.txt', function () {   console.log('已經刪除檔案!'); });
    fs.readFile(`./html/${filename}`,(error,data) => {
       if(error){
            response.statusCode = 500;
            response.setHeader('Content-Type','text/plain');    //文本格式('application/json')
            response.end('Sorry, internal error');    //簡單回應錯誤訊息即可
       } 
       else{
            response.statusCode = statusCode;
            response.setHeader('Content-Type','text/html');    //文本格式
            response.end(data);
       }
    });
};

module.exports = router;