var fs = require("fs");

var Files = {
    /*
        options:{
            skipdirs:Boolean,
            skipfiles:Boolean,
            showhidden:Boolean,
            match: RegExp,
            matchDir: RegExp
        }
    */
    readfiles: function(dir, options, callback, err, files){
        if (err) throw err;
        options = options || {};
        var done = files.length, files_list = [];
    
        files.forEach(function(val, index, array){
            fs.stat(dir+"/"+val, function (err, stats) {
                if (err) throw err;

                if(
                    // skip directories if needed
                    !(options.skipdirs && stats.isDirectory()) &&

                    // skip files if needed
                    !(options.skipfiles && !stats.isDirectory()) &&
    
                    // skip hidden files
                    !(!options.showhidden && val.substr(0,1)==".") &&
    
                    // skip files that doesn't match
                    !(options.match && !stats.isDirectory() && !val.match(options.match)) &&
    
                    // skip direcotories that doesn't match
                    !(options.matchDir && stats.isDirectory() && !val.match(options.matchDir)))
                        
                        files_list.push({name: val, dir: stats.isDirectory(), stats: stats});
                
                // run callback if all files are checked
                if(!--done){
                    if(typeof callback=="function")
                        callback(files_list);
                }
            });
        });
    },
    list: function(dir, options, callback){
        dir = (dir || ".").trim();
        if(dir.substr(-1)!="/")
            dir += "/";
        if(!callback && typeof options=="function"){
            callback = options;
            options = undefined;
        }
        fs.readdir(dir, this.readfiles.bind(this,dir,options,callback));
    }
}


Files.list(process.argv[2], function(files){
    console.log(files);
});