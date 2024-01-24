var redis = require('redis');
var client = redis.createClient(6379, "127.0.0.1", {}); // this creates a new client

var redisM = {
    set: function (info,value) {
        // 鍵值對
        client.set(info, value, redis.print);
    },
    get:function (info) {
        client.get(info, (error, result) => {
            if (error) {
                console.log(error);
                throw error;
            }
            console.log('GET result ->' + result);
        });
    },
    error:function (error) {
        console.log('Error: ' + error);
    }
};

module.exports = redisM;