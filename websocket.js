//建立server並監聽port 9999
var PORT = 9999;
var _server = http.createServer().listen(PORT);

//產生websocketServer
webSocketServer = new ws({
    httpServer:_server
});

//當使用者連入時，觸發此事
webSocketServer.on('request',function(request){
    var connection = request.accept('echo-protocol',request.origin);
    //當websocket server收到訊息時 觸發此事件
    connection.on('message',function(message) {
        console.log(message);    //client傳來的訊息（可以為空字串）

        //取得資料表資料
        model.draggable([
            {"$match": {}},
            {"$project": {"name": 1, "address": 1}},
        ]).exec((err, result) => {
            connection.send(JSON.stringify(result));
        });
    });

       //當使用socket連線中斷時 例如：關閉瀏覽器 觸發此發事件
        connection.on('close',function(reasonCode, description){
            console.log('Close');
        });
    });
