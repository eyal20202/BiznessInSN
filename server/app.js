const express = require('express');
const morgan = require('morgan');
const path = require('path');
const Home = require('./home');
const Job = require('./jobs');
const Msg = require('./messages');
const MyNetwork = require('./Mynetwork');
const UserProfile = require('./usersProfile');
const app = express();
const AutoCom=require('./AutoCom');
var bodyParser = require('body-parser');
const ModelClass = require('./dbHandler');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());


// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
//=========================================================================================
app.post('/Login', (req, res) => {


    ModelClass.CheckLogin(req.body.user.email,req.body.user["password"]).then(resDB => {
        if(resDB=="") {
            resDB="false";
        }
        else{
            var data=(resDB);
            res.cookie('userID',resDB[0].ID);
            res.cookie('UserName',data[0].FirstName);
            res.cookie('login',true);
            res.cookie('WorkCategoryID',resDB[0].WorkCategoryID);

        }
            res.write(JSON.stringify(resDB));
            res.end();
            console.log("imInside the func");
        },
        (error) => {
            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
        });
    console.log("imoutside the func");
});

//====================================================
app.post('/CheckEmailRegister', (req, res) => {


    ModelClass.CheckEmailExist(req.body.user.email).then(resDB => {
            if (resDB > 0) {
                resDB = "false";

            }
            else {
                resDB = "true";
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
app.post('/Register', (req, res) => {
    console.log("app.get('/RegisterRegisterRegister', (req, res)");
    //var count =  ModelClass.CheckEmailExist(req.body.user.email);

// ModelClass.Create_User(req.body.user.FirstName, req.body.user.LastName, req.body.user.email, req.body.user.password).then(resDB =>
        ModelClass.Create_User(req.body.user.FirstName, req.body.user.LastName, req.body.user.email, req.body.user.password).then(resDB => {
                if (resDB == "") {

                    resDB = "false";

                }
                else {
                    res.cookie('UserName',req.body.user.FirstName);
                    res.cookie('login',true);

                    //===================================================================
                    ModelClass.CheckLogin(req.body.user.email,req.body.user["password"]).then(DB => {
                            if(DB=="") {
                                resDB="false";
                                console.log("falsefalsefalsefalsefalse.cookie('userID',DB[0].ID);!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111111");
                            }
                            else {
                                console.log("req.cookie('userID',DB[0].ID);!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111111");
                                res.cookie('userID', DB[0].ID);
//===================================================================
                                ModelClass.addfriend (DB[0].ID,68, 1).then(resDB => {
                                    var data={
                                        SenderID:68,GeterID:DB[0].ID,msg:"Welcome to Business-in social network !! Congratulations!!! on joining our social network We wish you success " +
                                        "and find your request soon!!!. We will be happy to help you! good luck and enjoy!"
                                    };
                                    ModelClass.SendMsg(data).then(DB => {
                                    });
                                });
                            }
                        },
                        (error) => {

                            console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
                        });
                    //============================================================
                }
                res.write(JSON.stringify(resDB));
                res.end();
                console.log("imInside the func");
            },
            (error) => {
                console.log("in errorrrr@@######$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
            });
    console.log("imoutside the func");


});
//====================================================
app.get('/Home', (req, res) => {


 // res.sendFile(path.resolve(__dirname, '..', 'build', 'login.html'));
   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
//====================================================
app.get('/Job', (req, res) => {
    console.log("app.get('/Home', (req, res)");

    // res.sendFile(path.resolve(__dirname, '..', 'build', 'login.html'));
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
//====================================================
app.get('/login', (req, res) => {

    console.log("app.get('/login!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', (req, res)");
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
//====================================================
app.get('/', (req, res) => {
    console.log("app.get('/', (req, res)");
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
//==============================================================
app.get('/Mynetwork', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
//==============================================================
app.get('/MyPost', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
//==============================================================
app.get('/Messages', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
//==============================================================
app.get('/UserProfile', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
//=================================================
app.use('/Home', Home);
app.use('/Job', Job);
app.use('/Messages', Msg);//
app.use('/UserProfile', UserProfile);
app.use('/AutoCom', AutoCom);
app.use('/MyNetwork', MyNetwork);
//==============================================================
// app.get('*', (req, res) => {
//     console.log("app.get('*', (req, res)");
//     res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
//     //res.sendFile(path.resolve(__dirname, '..', 'build', 'login.html'));
// });
//====================================================
// app.get('/Home/ch', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });
// //==================================================================
// app.get('/Home/ch', (req, res) => {
//
//     res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
//
// });
//================================================================


//===============================================================
module.exports = app;