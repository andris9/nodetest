
var params = {
    "help":{
        "call":help,
        "params":"?"
        }
}

function help(){
    
}

process.argv.forEach(function (val, index, array) {
    var p;
    if(p = params[val.substr(2)]){
        
    }
  console.log(index + ': ' + val);
});
process.exit();
