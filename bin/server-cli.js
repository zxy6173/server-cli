var fs = require("fs");
var path = require("path");

var copy = function(src,dest) {

    var file = fs.createReadStream(src);
    var out = fs.createWriteStream(dest);
    file.on('data', function(data) {
        out.write(data);
    });
}


var listFiles = function(dir,destDir) {
        var stat = fs.statSync(dir);
        var destPath = destDir + "/" +path.basename(dir);
        if(stat && stat.isDirectory()){

            if(fs.existsSync(destPath)){
                console.log("the destination file or directory has exist,please remove them first!!!");
                process.exit(0);
                return;
            }
            fs.mkdirSync(destPath);
            console.log("create "+destPath+" success");
            fs.readdirSync(dir).forEach(function(filename){
                var path = dir + "/"+filename;
                listFiles(path,destPath);
            });
        }else{
            copy(dir,destPath);
        }
}

var main = function(){
    var readlineSync = require('readline-sync');
    var isCreate = readlineSync.question('Are you sure create a server project?[y/N]');
    if(isCreate.toLowerCase() == "y"){

    }else{

    }
    // listFiles(path.resolve(),'/Users/BDK');
}
main();
