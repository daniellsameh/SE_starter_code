const db = require('../../connectors/db');
const roles = require('../../constants/roles');
const { getSessionToken } = require('../../utils/session');

const getUser = async function (req) {
  const sessionToken = getSessionToken(req);
  if (!sessionToken) {
    return res.status(301).redirect('/');
  }

  const user = await db
    .select('*')
    .from('se_project.sessions')
    .where('token', sessionToken)
    .innerJoin('se_project.users', 'se_project.sessions.userid', 'se_project.users.id')
    .innerJoin('se_project.roles', 'se_project.users.roleid', 'se_project.roles.id')
    .first();

  console.log('user =>', user);
  user.isStudent = user.roleid === roles.student;
  user.isAdmin = user.roleid === roles.admin;
  user.isSenior = user.roleid === roles.senior;

  return user;
};

module.exports = function (app) {
  // Register HTTP endpoint to render /users page
  app.get('/dashboard', async function (req, res) {
    try {
      const user = await getUser(req);
      return res.render('dashboard', user);
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("Couldn't fetch user data");
    }
  });

  // Register HTTP endpoint to render /users page
  app.get('/users', async function (req, res) {
    try {
      const users = await db.select('*').from('se_project.users');
      return res.render('users', { users });
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("Couldn't fetch users data");
    }
  });

  // Register HTTP endpoint to render /courses page
  app.get('/createstations', async function (req, res) {
    try {
      const admin = await getUser(req);
      const stations = await db.select('*').from('se_project.stations');
      return res.render('createstations', { admin, stations });
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("Couldn't fetch data for createstations");
    }
  });

  app.get('/createroute', async function (req, res) {
    try {
      const user = await getUser(req);
      const routes = await db.select('*').from('se_project.routes');
      return res.render('createroute', { user, routes });
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("Couldn't fetch data for createroute");
    }
  });

  app.get('/editroute', async function (req, res) {
    try {
      const user = await getUser(req);
      const routes = await db.select('*').from('se_project.routes');
      return res.render('editroute', { user, routes });
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("Couldn't fetch data for editroute");
    }
  });

  app.get('/editstation', async function (req, res) {
    try {
      const user = await getUser(req);
      const stations = await db.select('*').from('se_project.stations');
      return res.render('editstation', { user, stations });
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("Couldn't fetch data for editstation");
    }
  });

  app.get('/managerefunds', async function (req, res) {
    try {
      const user = await getUser(req);
      const refunds = await db.select('*').from('se_project.refund_requests');
      return res.render('managerefunds', { user, refunds });
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("Couldn't fetch data for managerefunds");
    }
  });

  app.get('/manageseniorrequest', async function (req, res) {
    try {
      const user = await getUser(req);
      const seniorrequest = await db.select('*').from('se_project.senior_requests');
      return res.render('manageseniorrequest', { user, seniorrequest });
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("Couldn't fetch data for manageseniorrequest");
    }
  });

  app.get('/managezone', async function (req, res) {
    try {
      const user = await getUser(req);
      const managezone = await db.select('*').from('se_project.zones');
      return res.render('managezone', { user, managezone });
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("Couldn't fetch data for managezone");
    }
  });

  app.get('/seniorrequest', async function (req, res) {
    try {
      const user = await getUser(req);
      const seniorrequest = await db.select('*').from('se_project.senior_requests');
      return res.render('seniorrequest', { user, seniorrequest });
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("Couldn't fetch data for seniorrequest");
    }
  });

  app.get('/purchasesubscription', async function (req, res) {
    try {
      const user = await getUser(req);
      const purchasesubscription = await db.select('*').from('se_project.subscription');
      return res.render('purchasesubscription', { user, purchasesubscription });
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("Couldn't fetch data for purchasesubscription");
    }
  });

  app.get('/refundrequest', async function (req, res) {
    try {
      const user = await getUser(req);
      const refundrequest = await db.select('*').from('se_project.refund_requests');
      return res.render('refundrequest', { user, refundrequest });
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("Couldn't fetch data for refundrequest");
    }
  });

  app.get('/purchaseticket', async function (req, res) {
    try {
      const user = await getUser(req);
      const purchaseticket = await db.select('*').from('se_project.transactions');
      return res.render('purchaseticket', { user, purchaseticket });
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("Couldn't fetch data for purchaseticket");
    }
  });

  app.get('/index', async function (req, res) {
    try {
      const users = await db.select('*').from('se_project.users');
      return res.render('index', { users });
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("Couldn't fetch data for index");
    }
  });

  app.get('/UserPage', async function (req, res) {
    try {
      const users = await db.select('*').from('se_project.users');
      return res.render('UserPage', { users });
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("Couldn't fetch data for UserPage");
    }
  });

  app.get('/adminPage', async function (req, res) {
    try {
      const admin = await db.select('*').from('se_project.users');
      return res.render('AdminPage', { admin });
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("Couldn't fetch data for adminPage");
    }
  });

  app.get('/register', async function (req, res) {
    try {
      const users = await db.select('*').from('se_project.users');
      return res.render('register', { users });
    } catch (error) {
      console.log(error.message);
      return res.status(400).send("Couldn't fetch data for register");
    }
  });
};
