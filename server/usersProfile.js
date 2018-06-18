const express = require('express');
const router = express.Router();
const path = require('path');
var APIgoogle_key="AIzaSyBJIMKpMTMItFO76ehNWZ0eD2s1UEFry2U";
const DbHandler = require('./dbHandler');
//===============================================
router.get('/Skills', function (req, res) {

    DbHandler.GetUserSkills(req.query.userID).then(resDB => {

            res.write(JSON.stringify(resDB));
            res.end();

        },
        (error) => {
            console.log(" GetProfileData in errorrrr@@$$$$1");
        });
});
//===============================================
router.get('/GetProfileData', function (req, res) {

    DbHandler.GetUserInfromation(req.query.userID).then(resDB => {

            res.write(JSON.stringify(resDB));
            res.end();

        },
        (error) => {
            console.log(" GetProfileData in errorrrr@@$$$$1");
        });
});
//===============================================
router.get('/Experience', function (req, res) {


    DbHandler.GetUserExperience(req.query.userID).then(resDB => {

            res.write(JSON.stringify(resDB));
            res.end();

        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
        });
});
//==========================================================================
router.get('/UpdataFrom', function (req, res) {

    DbHandler.InsertUserUpdateFrom(req.query.userID,req.query.UserPlace).then(resDB => {
            if(resDB)
                resDB="true";
            else
                resDB="false";
            res.write(JSON.stringify(resDB));
            res.end();

        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$");
        });
});
//==========================================================================
router.get('/UpdataWorkerType', function (req, res) {
// console.log("cookies:", req.cookies.login);
    DbHandler.InsertUserUpdateWrokerType(req.query.userID,req.query.WorkerType).then(resDB => {
            if(resDB)
                resDB="true";
            else
                resDB="false";
            res.write(JSON.stringify(resDB));
            res.end();

        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$");
        });
});
//====================================================================
router.get('/AddExperience', function (req, res) {
console.log("ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc@@@@@@@@@@@@@@@@@@@@@@@@@@@222" +
    "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$" +
    "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    var data=req.query;
    DbHandler.InsertUserExperience(data).then(resDB => {
                        if(resDB)
                            resDB="true";
                        else
                            resDB="false";
            res.write(JSON.stringify(resDB));
            res.end();

        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
        });
});
//====================================================
router.get('/InsertSkill', function (req, res) {

console.log(req.query.skill);

    DbHandler.insertskill(req.query.skill,req.query.userid).then(resDB => {
            if(resDB)
                resDB="true";
            else
                resDB="false";
            res.write(JSON.stringify(resDB));
            res.end();

        },
        (error) => {
            console.log("error");
        });
});
//====================================================
router.get('/UpdateUserWorkCategory', function (req, res) {


    DbHandler.UpdateUserWorkCategory(req.query.userid,req.query.category).then(resDB => {
            if(resDB)
                resDB="true";
            else
                resDB="false";
            res.write(JSON.stringify(resDB));
            res.end();

        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
        });
});

//====================================================UpdateUserWorkCategory
router.get('/UpdateCurrentJob', function (req, res) {

    var data=req.query.CurrentJob;
    DbHandler.UpdateCurrentJob(req.query.userID,req.query.CurrentJob).then(resDB => {
            if(resDB)
                resDB="true";
            else
                resDB="false";
            res.write(JSON.stringify(resDB));
            res.end();

        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
        });
});
//====================================================
router.get('/RemoveExperience', function (req, res) {

    DbHandler.RemoveUserExperience(req.query.userID,req.query.MsgID).then(resDB => {
            if(resDB)
                resDB="true";
            else
                resDB="false";
            res.write(JSON.stringify(resDB));
            res.end();

        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
        });
});
//===================================================================================
router.get('/RemoveSkill', function (req, res) {


    DbHandler.RemoveSkill(req.query.skillid).then(resDB => {
            if(resDB)
                resDB="true";
            else
                resDB="false";
            res.write(JSON.stringify(resDB));
            res.end();

        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
        });
});
//====================================================================================
router.get('/GetProfileFriendStatus', function (req, res) {

    DbHandler.GetProfileFriendStatus(req.query.userid,req.query.profileID).then(resDB => {
        switch(resDB)
        {
            case 1:{
                resDB=[];
                resDB.push({friend:true,confirmed:true});

                break;
            }
            case 2:{
                resDB=[];
                resDB.push({friend:true,confirmed:false});

                break;
            }
            case 3:{

                resDB=[];
                resDB.push({friend:false,wait:false});
                break;
            }
            case 4:{

                resDB=[];
                resDB.push({friend:true,wait:true});
                break;
            }
        }

            res.write(JSON.stringify(resDB));
            res.end();

        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
        });
});
//===================================================================================
router.get('/removefriend', function (req, res) {

    DbHandler.removefriend(req.query.userid,req.query.profileID).then(resDB => {
            if(resDB)
                resDB="true";
            else
                resDB="false";
            res.write(JSON.stringify(resDB));
            res.end();

        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
        });
});
//===================================================================================
router.get('/addfriend', function (req, res) {

    DbHandler.addfriend(req.query.userid,req.query.frinedid,req.query.status).then(resDB => {
            if(resDB)
                resDB="true";
            else
                resDB="false";
            res.write(JSON.stringify(resDB));
            res.end();

        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
        });
});
module.exports = router;