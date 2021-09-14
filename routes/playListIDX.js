var express = require('express');
var router = express.Router();

var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    
    fs.readdir('./public/text/playList', (err, filelist) => {
        if(err) {
            console.log("err");
        }
        else {
            console.log(`file list : ${filelist}`);
            
        }
        res.render('playListIDX');
    });
});

module.exports = router;
