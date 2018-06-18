const express = require('express');
const router = express.Router();
const path = require('path');
const DbHandler = require('./dbHandler');
//===============================================
router.get('/GetfriendRequset', function (req, res) {
    DbHandler.GetfriendRequset(req.query.userID).then(resDB => {
            res.write(JSON.stringify(resDB));
            res.end();

        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$");
        });
});
//===============================================resDB.filter(arr =>( arr.WorkCategoryID == req.query.WorkCategory ))
router.get('/GetUserMayKnowByWork', function (req, res) {
    DbHandler.GetUserMayKnowByWork(req.query.userID,req.query.WorkCategory).then(resDB => {
            res.write(JSON.stringify(resDB));
            res.end();
        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$");
        });
});
//====================================================GetUserMayKnow
router.get('/Accept', function (req, res) {
    DbHandler.Accept(req.query.userID,req.query.friendid,req.query.status).then(resDB => {

            res.write(JSON.stringify(resDB));
            res.end();

        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$");
        });
});
//===============================================
module.exports = router;