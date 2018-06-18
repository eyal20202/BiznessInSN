const express = require('express');
const router = express.Router();
const path = require('path');
const DbHandler = require('./dbHandler');
//===============================================
router.get('/LoadMessagesSend', function (req, res) {
    var data=req.query;
    DbHandler.LoadMessagesSend(req.query.user_id).then(resDB => {
            if(resDB=="") {
                console.log("Res from server====     " + (resDB));
                resDB="false";
            }
            else{
                var data=(resDB);
            }
            res.write(JSON.stringify(resDB));
            res.end();
            console.log("imInside the func");
        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
        });
});
//===============================================
router.get('/LoadMessagesGet', function (req, res) {
    var data=req.query;
    DbHandler.LoadMessagesGet(req.query.user_id).then(resDB => {
            if(resDB=="") {
                console.log("Res from server====     " + (resDB));
                resDB="false";
            }
            else{
                var data=(resDB);
            }
            res.write(JSON.stringify(resDB));
            res.end();
            console.log("imInside the func");
        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
        });
});
//===============================================
router.get('/SendMsg', function (req, res) {
var data=req.query;
    DbHandler.SendMsg(data).then(resDB => {
            if(resDB=="") {
                console.log("Res from server====     " + (resDB));
                resDB="false";
            }
            else{
                var data=(resDB);
            }
            res.write(JSON.stringify(resDB));
            res.end();
            console.log("imInside the func");
        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
        });
});
//====================================================

module.exports = router;