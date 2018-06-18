var MD5 = require('md5');
var mysql = require('mysql');
module.exports = {

    GetUsers:function (FirstName,LastName){
        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                con.query("SELECT * FROM users WHERE FirstName LIKE '" + FirstName + "%'OR LastName LIKE'" +LastName + "%'", function (err, result, fields) {
                    if (err) throw err;

                    if (err) {
                        reject(err);
                    } else {
                        console.log(" resolve (result)   " + result);
                        resolve(result);
                    }
                });
            });
        });

    },

    CheckLogin: function (email, password) {
        console.log(email + " 5555555555555555555");
        console.log(password + " 5555555555555");

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                con.query("SELECT * FROM users WHERE Email= '" + email + "'AND Password='" + MD5(password) + "'", function (err, result, fields) {
                    if (err) throw err;

                    if (err) {
                        reject(err);
                    } else {
                        console.log(" resolve (result)   " + result);
                        resolve(result);
                    }
                });
            });
        });
    },
    //------------------------------------------------------------------------
    Create_User: function (FirstName, LastName, email, password) {
        // console.log(email + " 22222222222222222222222222");
        // console.log(password + " 44444444444444444444444");

        return new Promise(function (resolve, reject) {


            var con = CreateConn();
            con.connect(function (err) {

                if (err) throw err;

                con.query("SELECT * FROM users WHERE Email= '" + email + "'", function (err, result, fields) {
                    if (err) throw err;

                    if (err) {
                        reject(err);
                    } else {
                        if (result != "") {
                            resolve(result);
                            return;
                        }
                    }
                });

                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                console.log(FirstName + "     " + LastName + "       " + email + "               " + password);


                var post = {WorkCategoryID:3,FirstName: FirstName, LastName: LastName, Email: email, Password: MD5(password)};


                con.query("INSERT INTO users SET ?", post, function (err, result, fields) {
                    // con.query("INSRT  INTO users (ID,FirstName,LastName,Email,Password)" +
                    //    "SET(NULL,'"+FirstName+"','"+LastName+"','"+email+"','"+password+"')", function (err, result, fields) {
                    if (err) throw err;

                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
                //-------------------------------------------------

                var post = {userid:76,friendid:68,Confirmed:1};

                con.query("INSERT INTO friends SET ?", post, function (err, result, fields) {
                    // con.query("INSRT  INTO users (ID,FirstName,LastName,Email,Password)" +
                    //    "SET(NULL,'"+FirstName+"','"+LastName+"','"+email+"','"+password+"')", function (err, result, fields) {
                    if (err) throw err;

                    if (err) {
                        reject("false");
                    } else {
                        console.log("$@@@@@@@@@^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^6666" +
                            "********************************************************************");
                        resolve(true);
                    }
                });

            });
        });
    },
    //======================================================================
    GetJobs: function () {

        return new Promise(function (resolve, reject) {


            var con = CreateConn();
            con.connect(function (err) {

                if (err) throw err;

                con.query("SELECT * FROM jobs ", function (err, result, fields) {
                    if (err) throw err;

                    if (err) {
                        reject(err);
                    } else {
                        if (result != "") {
                            resolve(result);
                            return;
                        }
                    }
                });

            });
        });


    },
    //=============================================
    GetUserSkills: function (userid) {
        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                con.query("SELECT * FROM usresskills WHERE userid= '" + userid + "'", function (err, result, fields) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        })
    },
    //======================================================================
    CheckEmailExist: function (email) {
        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                con.query("SELECT * FROM users WHERE Email= '" + email + "'", function (err, result, fields) {


                    if (err) {
                        reject(err);
                    } else {
                        console.log("CheckEmailExist:" + result.length);
                        resolve(result.length);
                    }
                });
            });
        })
    },
    //========================================================================
    GetPostLike:function(post_id){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                con.query("SELECT * FROM users INNER JOIN likepost ON users.ID =likepost.user_id WHERE likepost.post_id= '" + post_id + "' ", function (err, result, fields) {


                    if (err) {
                        reject(err);
                    } else {
                        console.log("GetPostLike:" + result);
                        resolve(result);
                    }
                });
            });
        })

    },
    //========================================================================GetPostLike
    GetCommentsPost:function(post_id){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                con.query("SELECT * FROM  comments WHERE  post_id = '" + post_id + "' ORDER BY time DESC ", function (err, result, fields) {

                    if (err) {
                        reject("");
                    } else {
                        console.log("post_id:" + result);
                        resolve(result);
                    }
                });
            });
        })

    },
    //========================================================================GetPostLike
    GetPosts:function(user_id){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                con.query("SELECT * FROM  posts INNER JOIN   friends ON  friends.friendid =posts.user_id WHERE friends.userid= '" + user_id + "'   ORDER BY last_up DESC", function (err, result, fields) {

                    if (err) {
                        reject(err);
                    } else {
                        console.log("GetUserExperience:" + result);
                        resolve(result);
                    }
                });
            });
        })

    },
    //========================================================================
    GetMyPosts:function(user_id){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                con.query("SELECT * FROM posts WHERE user_id= '" + user_id + "' ", function (err, result, fields) {


                    if (err) {
                        reject(err);
                    } else {
                        console.log("GetUserExperience:" + result);
                        resolve(result);
                    }
                });
            });
        })

    },
    //========================================================================GetMyPosts
GetUserExperience:function(user_id){

    return new Promise(function (resolve, reject) {
        var con = CreateConn();
        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT * FROM experience WHERE userID= '" + user_id + "' ", function (err, result, fields) {


                if (err) {
                    reject(err);
                } else {
                    console.log("GetUserExperience:" + result);
                    resolve(result);
                }
            });
        });
    })

},
    //========================================================================

    LoadMessagesGet:function(user_id){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                con.query(" SELECT users.FirstName,time, msg, users.LastName FROM" +
                    " users INNER JOIN messages ON users.ID =  messages.SenderID  WHERE messages.GeterID = '"+ user_id + "' ORDER BY time DESC", function (err, result, fields) {


                    if (err) {
                        console.log("err:" + err);
                        reject(err);
                    } else {
                        console.log("GetUserExperience:" + result);
                        resolve(result);
                    }
                });
            });
        })

    },
    //========================================================================

    LoadMessagesSend:function(user_id){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                con.query(" SELECT users.FirstName, msg,time, users.LastName FROM" +
                    " users INNER JOIN messages ON users.ID = messages.GeterID WHERE messages.SenderID = '"+ user_id + "' ORDER BY time DESC", function (err, result, fields) {


                    if (err) {
                        console.log("err:" + err);
                        reject(err);
                    } else {
                        console.log("GetUserExperience:" + result);
                        resolve(result);
                    }
                });
            });
        })

    },

    //========================================================================GetUserName

    GetUserInfromation:function(user_id){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                con.query("SELECT * FROM users WHERE ID= '" + user_id + "'", function (err, result, fields) {


                    if (err) {
                        console.log("err:" + err);
                        reject("");
                    } else {
                        console.log("GetUserExperience:" + result);
                        resolve(result);
                    }
                });
            });
        })

    },
    //========================================================================UpdataCom
    UpdataCom:function(post_id){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                con.query("UPDATE posts SET last_up ='NULL'"+" WHERE id="+post_id, function (err, result, fields) {

                    if (err) {
                        console.log(" if (err)  if (err)  if (err) :" + err);
                        reject(err);
                    } else {
                        console.log("InsertUserUpdataFrom:" + result);
                        resolve("true");
                    }
                });
            });
        })

    },
    //========================================================================
    EditPost:function(post_id,msg){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                con.query("UPDATE posts SET post='"+msg+"'"+" WHERE id="+post_id, function (err, result, fields) {

                    if (err) {
                        console.log(" if (err)  if (err)  if (err) :" + err);
                        reject(err);
                    } else {
                        console.log("InsertUserUpdataFrom:" + result);
                        resolve("true");
                    }
                });
            });
        })

    },
    //========================================================================GetUserInfromation
    InsertUserUpdateFrom:function(user_id,user_from){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                con.query("UPDATE users SET location='"+user_from+"'"+" WHERE ID="+user_id, function (err, result, fields) {

                    if (err) {
                        console.log(" if (err)  if (err)  if (err) :" + err);
                        reject(err);
                    } else {
                        console.log("InsertUserUpdataFrom:" + result);
                        resolve("true");
                    }
                });
            });
        })

    },
    //========================================================================GetUserInfromation
    UpdateUserWorkCategory:function(user_id,catgoryId){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                con.query("UPDATE users SET WorkCategoryID='"+catgoryId+"'"+" WHERE ID="+user_id, function (err, result, fields) {

                    if (err) {
                        console.log(" if (err)  if (err)  if (err) :" + err);
                        reject(err);
                    } else {
                        console.log("InsertUserUpdataFrom:" + result);
                        resolve("true");
                    }
                });
            });
        })

    },
    //========================================================================
    Accept:function(user_id,friendid,status){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                con.query("UPDATE friends SET Confirmed="+1+""+" WHERE userid="+user_id+" AND friendid="+friendid, function (err, result, fields) {

                    if (err) {
                        console.log(" if (err)  if (err)  if (err) :" + err);
                        reject(err);
                    } else {
                        console.log("InsertUserUpdataFrom:" + result);
                        resolve("true");
                    }
                });
            });
        })

    },
    //========================================================================GetUserInfromation
    InsertUserUpdateWrokerType:function(user_id,WorkerType){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                console.log("!@!@! WorkerType !@!@: ",WorkerType);
                if (err) throw err;
                con.query("UPDATE users SET WorkerType='"+WorkerType+"'"+" WHERE ID="+user_id, function (err, result, fields) {

                    if (err) {
                        console.log(" if (err)  if (err)  if (err) :" + err);
                        reject(err);
                    } else {
                        console.log("InsertUserUpdateWrokerType:" + result);
                        resolve("true");
                    }
                });
            });
        })

    },
    //========================================================================
    UpdateCurrentJob:function(user_id,Currentjob){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                con.query("UPDATE users SET currentJob='"+Currentjob+"'"+" WHERE ID="+user_id, function (err, result, fields) {

                    if (err) {
                        console.log(" if (err)  if (err)  if (err) :" + err);
                        reject(err);
                    } else {
                        console.log("InsertUserUpdataFrom:" + result);
                        resolve("true");
                    }
                });
            });
        })

    },
    //========================================================================
    AddLike:function(user_id,post_id){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;

                var post = {user_id:user_id,post_id:post_id};
                con.query("INSERT INTO likepost SET ?", post, function (err, result, fields) {
                    // con.query("INSRT  INTO users (ID,FirstName,LastName,Email,Password)" +
                    //    "SET(NULL,'"+FirstName+"','"+LastName+"','"+email+"','"+password+"')", function (err, result, fields) {

                    if (err) throw err;

                    if (err) {
                        reject("false");
                    } else {
                        resolve(true);
                    }
                });
            });
        })

    },
    //========================================================================
    SaveCom:function(user_id,post_id,msg){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;

                var post = {user_id:user_id,post_id:post_id,msg:msg};
                con.query("INSERT INTO comments SET ?", post, function (err, result, fields) {
                    // con.query("INSRT  INTO users (ID,FirstName,LastName,Email,Password)" +
                    //    "SET(NULL,'"+FirstName+"','"+LastName+"','"+email+"','"+password+"')", function (err, result, fields) {

                    if (err) throw err;

                    if (err) {
                        reject("false");
                    } else {
                        resolve(true);
                    }
                });
            });
        })

    },
    //========================================================================
    NewPost:function(user_id,PostMsg){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;

                var post = {user_id:user_id,post:PostMsg};
                con.query("INSERT INTO posts SET ?", post, function (err, result, fields) {
                    // con.query("INSRT  INTO users (ID,FirstName,LastName,Email,Password)" +
                    //    "SET(NULL,'"+FirstName+"','"+LastName+"','"+email+"','"+password+"')", function (err, result, fields) {



                    if (err) throw err;

                    if (err) {
                        reject("false");
                    } else {
                        resolve(true);
                    }
                });
            });
        })

    },
    //========================================================================
    RemoveLike:function(user_id,post_id){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;


                con.query("DELETE FROM likepost WHERE user_id="+user_id+" AND post_id="+post_id, function (err, result, fields) {

                    if (err) throw err;

                    if (err) {
                        reject("false");
                    } else {
                        resolve(true);
                    }
                });
            });
        })

    },
    //========================================================================
    RemovePost:function(post_id){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;


                con.query("DELETE FROM posts WHERE id="+post_id , function (err, result, fields) {

                    if (err) throw err;

                    if (err) {
                        reject("false");
                    } else {
                        resolve(true);
                    }
                });
            });
        })

    },
    //========================================================================AddLike
    InsertUserExperience:function(Parm){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;
                    console.log(Parm.Title);
             var post = {start:Parm.START,end:Parm.END,userID:Parm.userID,Title:Parm.Title, Location: Parm.Location, Company: Parm.Company, Description: Parm.Description};
                con.query("INSERT INTO experience SET ?", post, function (err, result, fields) {
                    // con.query("INSRT  INTO users (ID,FirstName,LastName,Email,Password)" +
                    //    "SET(NULL,'"+FirstName+"','"+LastName+"','"+email+"','"+password+"')", function (err, result, fields) {
                    if (err) throw err;

                    if (err) {
                        reject("false");
                    } else {
                        resolve(true);
                    }
                });
            });
        })

    },
    //==================================================================================================================
    SendMsg:function(data){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;

                var post = {SenderID:data.userID,GeterID:data.SendFor,msg:data.Msg};
                con.query("INSERT INTO messages SET ?", post, function (err, result, fields) {
                    // con.query("INSRT  INTO users (ID,FirstName,LastName,Email,Password)" +
                    //    "SET(NULL,'"+FirstName+"','"+LastName+"','"+email+"','"+password+"')", function (err, result, fields) {
                    if (err) throw err;

                    if (err) {
                        reject("false");
                    } else {
                        resolve(true);
                    }
                });
            });
        })

    },

    //========================================================================InsertUserUpdataFrom
    InsertNewJob:function(data){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;

                var post = {JobTitle:data.JobTitle,JobDescription:data.JobDescription
                    ,location:data.JobLocation,Company:data.Company,userID:data.userID,category:data.SkillCatg};
                con.query("INSERT INTO jobs SET ?", post, function (err, result, fields) {
                    // con.query("INSRT  INTO users (ID,FirstName,LastName,Email,Password)" +
                    //    "SET(NULL,'"+FirstName+"','"+LastName+"','"+email+"','"+password+"')", function (err, result, fields) {
                    if (err) throw err;

                    if (err) {
                        reject("false");
                    } else {
                        resolve(true);
                    }
                });
            });
        })

    },
    //=============================================================================
    addfriend:function(userid,profileid,status){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;

                var post = {userid:userid,friendid:profileid,Confirmed:status};
                con.query("INSERT INTO friends SET ?", post, function (err, result, fields) {
                    // con.query("INSRT  INTO users (ID,FirstName,LastName,Email,Password)" +
                    //    "SET(NULL,'"+FirstName+"','"+LastName+"','"+email+"','"+password+"')", function (err, result, fields) {
                    if (err) throw err;

                    if (err) {
                        reject("false");
                    } else {
                        console.log("$@@@@@@@@@^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^6666" +
                            "********************************************************************");
                        resolve(true);
                    }
                });
            });
        })

    },
    //===================================================================
    removefriend:function(userid,profileid){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;

                con.query("DELETE FROM friends WHERE userid = '" + userid + "' AND friendid ='"+profileid+"' ", function (err, result, fields) {
                    // con.query("INSRT  INTO users (ID,FirstName,LastName,Email,Password)" +
                    //    "SET(NULL,'"+FirstName+"','"+LastName+"','"+email+"','"+password+"')", function (err, result, fields) {
                    if (err) throw err;

                    if (err) {
                        reject("false");
                    } else {
                        console.log("result    :",result);
                        resolve(true);
                    }
                });
            });
        })

    },
    //===================================================================
    GetfriendRequset:function (userid) {
        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;//LIKE '" + FirstName + "%'
//con.query("SELECT * FROM friends WHERE userid = " + userid + " AND Confirmed = 2"

var x=2;

                con.query("SELECT users.FirstName, users.ID, users.LastName FROM users" +
                    " INNER JOIN friends ON users.ID = friends.friendid WHERE " +
                    " friends.userid ="+userid +" AND friends.Confirmed=2", function (err, result, fields) {
                    if (err) throw err;

                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {

                        resolve(result);
                    }
                });
            });
        });
    },
    //===================================================================
    GetUserMayKnowByWork:function (userid,WorkCat) {
        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;//LIKE '" + FirstName + "%'
//con.query("SELECT * FROM friends WHERE userid = " + userid + " AND Confirmed = 2"

                var x=2;

                con.query("SELECT users.ID,users.FirstName,users.LastName from users where ID not in(     SELECT distinct friends.friendid  FROM users INNER JOIN friends ON users.ID=friends.userid " +
                    "   where users.ID="+userid+")"

            , function (err, result, fields) {
                    if (err) throw err;

                    if (err) {
                        console.log(err);my
                        reject(err);
                    } else {
console.log("GetUserMayKnowByWork GetUserMayKnowByWork result");
                        resolve(result);
                    }
                });
            });
        });
    },
    //===================================================================
    GetSkill:function (skill) {
        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;//LIKE '" + FirstName + "%'
                con.query("SELECT * FROM skilessubcategory WHERE SubCategory LIKE '" + skill + "%'", function (err, result, fields) {
                    if (err) throw err;

                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {

                        resolve(result);
                    }
                });
            });
        });
    },
    //===================================================================
    GetProfileFriendStatus:function (userid,profileid) {
        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;//LIKE '" + FirstName + "%'
                con.query("SELECT * FROM friends WHERE userid = '" + userid + "' AND friendid ='"+profileid+"' ", function (err, result, fields) {
                    if (err) throw err;

                    if (err) {

                        reject(err);
                    } else {
                        console.log("$$$$$$$$$$$$$$$$$$444444444"+result+" "+result.length);
                        if(result.length==0)
                            resolve(3);
                        else if(result[0].Confirmed==1)
                            resolve(1);
                        else if (result[0].Confirmed==0)
                            resolve(2);
                        else resolve(4)

                    }
                });
            });
        });
    },
    //===================================================================
    RemoveSkill:function(skill){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;

                con.query("DELETE FROM usresskills WHERE ID="+skill, function (err, result, fields) {
                    // con.query("INSRT  INTO users (ID,FirstName,LastName,Email,Password)" +
                    //    "SET(NULL,'"+FirstName+"','"+LastName+"','"+email+"','"+password+"')", function (err, result, fields) {
                    if (err) throw err;

                    if (err) {
                        reject("false");
                    } else {
                        console.log("result    :",result);
                        resolve(true);
                    }
                });
            });
        })

    },
        //===================================================================RemoveSkill
   RemoveUserExperience:function(userID,MsgID){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;

                con.query("DELETE FROM experience WHERE ID="+MsgID, function (err, result, fields) {
                    // con.query("INSRT  INTO users (ID,FirstName,LastName,Email,Password)" +
                    //    "SET(NULL,'"+FirstName+"','"+LastName+"','"+email+"','"+password+"')", function (err, result, fields) {
                    if (err) throw err;

                    if (err) {
                        reject("false");
                    } else {
                        resolve(true);
                    }
                });
            });
        })

    },
    //========================================================================
    insertskill:function(skill,useid){

        return new Promise(function (resolve, reject) {
            var con = CreateConn();
            con.connect(function (err) {
                if (err) throw err;

                var post = {skill:skill,userid:useid};
                con.query("INSERT INTO usresskills SET ?", post, function (err, result, fields) {
                    if (err) throw err;

                    if (err) {
                        reject("false");
                    } else {
                        resolve(true);
                    }
                });
            });
        })

    },
    //===================================================================
};

// getEmails
// getJobs+Emails
function CreateConn() {
    var conn = mysql.createConnection({
        server: "127.0.0.1",
        port: "3306",
        database: "business-in",
        user: "root",
        password: "",
        host: "localhost",

    });
    return conn;
}
//---------------------------------------------
function CheckLogin3( email, password){
    console.log(email+" 11111111111111111111111");
    console.log(password+" 888888888888888888888");
    con.connect(function(err) {
        if (err)
            throw err;
        con.query("SELECT * FROM users", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
        //Select all customers and return the result object:
        // con.query("SELECT * FROM users WHERE email ="+email+"AND password+="+password, function (err, result, fields) {
        //     if (err) throw err;
        //     console.log(result);
        // });
    });
}
