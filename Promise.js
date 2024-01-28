function getSomething() {
    var r = 0;
    return new Promise(function(resolve){
       setTimeout(function(){
           r=2;
           resolve(r);
       },10);
    });
}

function *compute() {
    console.log(1);
    var x = yield getSomething().then(function(value){
        console.log(value);
    });
    console.log(3);
}

function himmel(gen) {
    const item = gen.next()
    if(item.done){
        return item.value
    }

    const {value,done} = item
    if(value instanceof Promise){
        value.then((e)=>himmel(gen))
    }
    else{
        himmel(gen)
    }
}

himmel(compute());