const express = require('express');
const router = express.Router();
const path = require('path');
const ModelClass = require('./dbHandler');
//===============================================
router.get('/usersName', function (req, res) {

    ModelClass.GetUsers(req.query.FirstName,req.query.LastName).then(resDB => {
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
router.get('/skill', function (req, res) {

    ModelClass.GetSkill(req.query.skill).then(resDB => {
            if(resDB=="") {

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
router.get('/GetprofileUser', function (req, res) {

    res.redirect('/UserProfile');

});
//====================================================res.redirect('your/404/path.html');

module.exports = router;