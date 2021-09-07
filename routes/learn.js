var express = require('express');
var router = express.Router();
var fs = require('fs');

let title = "";
let subtitle = "";
let pagenum = "";

/* GET users listing. */
router.get('/', function(req, res, next) {
    var jsonFile = fs.readFileSync("./public/json/learn_page_data.json");
    var jsonData = JSON.parse(jsonFile);
    
    res.render('learn', {data : jsonData, t : title, s : subtitle, p : pagenum});
    
});

router.post('/modi_page', (req, res, next) => {
    
    let pw = req.body.learn_modify_pw;
    let pwfile = JSON.parse(fs.readFileSync("./public/json/pw.json"));

    if(pw !== pwfile["key"]) {
        res.redirect('/learn');
    }else {
        title = req.body.title.toString();
        subtitle = req.body.subtitle.toString();
        pagenum = req.body.page.toString();

        let text = req.body.learn_modify.toString();
        
        text = text.replace(/\\/gi, "\\\\").replace(/\"/gi, "\\\"").replace(/`/gi, "");
        

        var jsonFile = fs.readFileSync("./public/json/learn_page_data.json");
        var jsonData = JSON.parse(jsonFile);

        if(req.body.isNew){
            jsonData[title][subtitle]["post"].push({info : text});
            pagenum++;
        }else{
            jsonData[title][subtitle]["post"][pagenum]["info"] = text;
        }
        fs.writeFileSync("./public/json/learn_page_data.json", JSON.stringify(jsonData));

        res.redirect('/learn');        
    }
    
});

router.post('/modi_IDX', (req, res, next)=> {
    let pw = req.body.learn_modify_pw;
    let pwfile = JSON.parse(fs.readFileSync("./public/json/pw.json"));

    if(pw !== pwfile["key"]) {
        res.redirect('/learn');
    }else {
        title = req.body.title.toString();
        subtitle = req.body.subtitle.toString();
        pagenum = req.body.page.toString();

        let mode = req.body.IDXTYPE.toString();
        let newIDX = req.body.learn_modify.toString();

        var jsonFile = fs.readFileSync("./public/json/learn_page_data.json");
        var jsonData = JSON.parse(jsonFile);

        if(mode === "새 과목") {
            jsonData[newIDX] = {
                "INTRO": {
                    "post": [{
                        "info": "소계"
                    }]
                }
            }
        }else if(mode === "새 목차") {
            jsonData[title][newIDX] = {
                "post": [{
                    "info": "소계"
                }]
            }
        }
        
        fs.writeFileSync("./public/json/learn_page_data.json", JSON.stringify(jsonData));

        res.redirect('/learn');        
    }

});

module.exports = router;
