const { isEmpty } = require("lodash");
const { v4 } = require("uuid");
const db = require("../../connectors/db");
const roles = require("../../constants/roles");
const {getSessionToken}=require('../../utils/session')
const getUser = async function (req) {
  const sessionToken = getSessionToken(req);
  if (!sessionToken) {
    return res.status(301).redirect("/");
  }
  console.log("hi",sessionToken);
  const user = await db
    .select("*")
    .from("se_project.sessions")
    .where("token", sessionToken)
    .innerJoin(
      "se_project.users",
      "se_project.sessions.userid",
      "se_project.users.id"
    )
    .innerJoin(
      "se_project.roles",
      "se_project.users.roleid",
      "se_project.roles.id"
    )
   .first();

  console.log("user =>", user);
  user.isNormal = user.roleid === roles.user;
  user.isAdmin = user.roleid === roles.admin;
  user.isSenior = user.roleid === roles.senior;
  console.log("user =>", user)
  return user;
};

module.exports = function (app) {
  // example
  app.get("/users", async function (req, res) {
    try {
       const user = await getUser(req);
      const users = await db.select('*').from("se_project.users")
        
      return res.status(200).json(users);
    } catch (e) {
      console.log(e.message);
      return res.status(400).send("Could not get users");
    }
   
  });
 
app.put("/api/v1/station/:stationId",async function(req,res){
  const{stationName: string}=req.body
const stationName = stationName. find(stationName => stationId == parseInt (req-params. id)) ;
if (!stationName) res.status(404).send( The stationName with the given ID was res.send (stationName);


const {error} = validateStationName(req.body);
  if (error) {
    res.status(400).send (error.details [0] message) ;
    return;
  }

stationName = req.body.name;
res.send(stationName);
  

function validateStationName(stationName){
  const schema = {
      name: Joi.string().min(3). required ()
      };
      return Joi. validate (stationName, schema);
    
      Const Admin = await getAdmin(req)
}
}



app.delete("/api/v1/station/:stationId",async function(req,res){const{}=req.body
const stationName = stationName. find(stationName => stationId == parseInt (req-params. id)) ;
if (!stationName) res.status(404).send( The stationName with the given ID was res.send (stationName);

const index = courses.indexOf(stationName);
stationName.splice(index, 1);

res.send(stationName);

Const Admin = await getAdmin(req)
};

app.put("/api/v1/requests/senior/:requestId",async function(req,res){const{seniorStaus:string}=req.body
if (age < 65){
  new Promise((resolve, reject) => {
    reject(new Error("senior status rejected!"));
  }).catch(alert);
}
else{

}
Const Admin = await getAdmin(req)
}
app.put("/api/v1/zones/:zoneId",async function(req,res){const{price:integer}=req.body

const zones = zones. find(zones => zoneId == parseInt (req-params. id)) ;
if (!zones) res.status(404).send( The zones with the given ID was res.send (zones);


const {error} = validateZone(req.body);
  if (error) {
    res.status(400).send (error.details [0] message) ;
    return;
  }

zones = req.body.name;
res.send(zones);
  

function validateZone(zones){
  const schema = {
      name: Joi.string().min(3). required ()
      };
      return Joi. validate (zones, schema);

}

Const Admin = await getAdmin(req)


}






  
};
