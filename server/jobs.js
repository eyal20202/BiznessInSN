const express = require('express');
const router = express.Router();
const path = require('path');

const ModelClass = require('./dbHandler');
//===============================================
router.get('/LoadMas', function (req, res) {

        ModelClass.GetJobs().then(resDB => {
                if(resDB=="") {
                    console.log("Res from server====     " + (resDB));
                    resDB="false";
                }
                else{
                    var data=(resDB);
                    console.log(data[0].JobTitle);

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
router.get('/InsertNewJob', function (req, res) {

    ModelClass.InsertNewJob(req.query).then(resDB => {

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