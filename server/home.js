const express = require('express');
const router = express.Router();
const path = require('path');
const DbHandler = require('./dbHandler');
//===========================================
router.get('/chc', (req, res) => {
    var user_id = [req.param('id'),req.param('id'),req.param('id')];
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!chc"+" "+user_id);

    res.writeHead(200, {
        'Content-Type': 'text/json'
    });
    res.write(JSON.stringify(user_id));
    res.end();
});

//===============================================
router.get('/GetMyPosts', function (req, res) {

    var data=req.query;
    DbHandler.GetMyPosts(req.query.user_id).then(resDB => {
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
router.get('/GetPosts', function (req, res) {

    var data=req.query;
    DbHandler.GetPosts(req.query.user_id).then(resDB => {
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
router.get('/GetCommentsPost', function (req, res) {

    var data=req.query;
    DbHandler.GetCommentsPost(req.query.post_id).then(resDB => {
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
router.get('/GetPostLike', function (req, res) {

    var data=req.query;
    DbHandler.GetPostLike(req.query.post_id).then(resDB => {
            if(resDB=="") {
                console.log("     " + (resDB));
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
router.get('/SaveCom', function (req, res) {

    var data=req.query;
    DbHandler.SaveCom(req.query.user_id,req.query.post_id,req.query.msg).then(resDB => {
            if(resDB=="") {
                console.log("     " + (resDB));
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

    DbHandler.UpdataCom(req.query.post_id).then(resDB => {
            if(resDB=="") {
                console.log("     " + (resDB));
                resDB="false";
            }
            else{
                var data=(resDB);
            }

            console.log("Update1111111111%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%" +
                "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%55");
        },
        (error) => {
            console.log("in erraxaffsforrrr@@######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
        });

});
//===============================================
router.get('/RemoveLike', function (req, res) {

   console.log("Remove like $!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@222");
    DbHandler.RemoveLike(req.query.user_id,req.query.post_id).then(resDB => {
            if(resDB=="") {
                console.log("     " + (resDB));
                resDB="false";
            }
            else{
                var data=(resDB);
            }
            console.log("sfsfsfsfsfsc");
            res.write(JSON.stringify(resDB));
            res.end();

        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
        });

});
//===============================================
router.get('/AddLike', function (req, res) {

    var data=req.query;
    DbHandler.AddLike(req.query.user_id,req.query.post_id).then(resDB => {
            if(resDB=="") {
                console.log("     " + (resDB));
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
router.get('/NewPost', function (req, res) {

    var data=req.query;
    DbHandler.NewPost(req.query.user_id,req.query.PostMsg).then(resDB => {
            if(resDB=="") {
                console.log("     " + (resDB));
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
//---------------------------------------------------------------------
router.get('/EditPost', function (req, res) {

    var data=req.query;
    DbHandler.EditPost(req.query.post_id,req.query.msg).then(resDB => {
            if(resDB=="") {
                console.log("     " + (resDB));
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
//------------------------------------------------------------------------
router.get('/RemovePost', function (req, res) {

    var data=req.query;
    DbHandler.RemovePost(req.query.post_id).then(resDB => {
            if(resDB=="") {
                console.log("     " + (resDB));
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
router.get('/GetUserInfromation', function (req, res) {

    var data=req.query;
    DbHandler.GetUserInfromation(req.query.user_id).then(resDB => {
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
router.get('/Home/chc', (req, res) => {
    console.log("rrrrouter");
    var user_id = req.param('id');
    res.send(user_id+4);

});
module.exports = router;