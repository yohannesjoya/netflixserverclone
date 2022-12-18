const express = require("express");
const port = 7000;
const mysql = require("mysql");
const cors = require("cors");
const { json } = require("express");
const server = express();

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "jonetflix",
  password: "jonetflix",
  database: "netflixclone",
});
mysqlConnection.connect((err) => {
  if (err) {
    console.log("---------\nthere is mysql connection error\n-----------");
  } else {
    console.log("********\nmysql Connected Successfuly\n**********");
  }
});

// MIDDLE WARES
server.use(
  cors({
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200,
  })
);
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.get("/", (req, res) => {
  res.end("<h1>welcome to Joyas netflix clone server</h1>");
});

server.get("/loginaccess", (req, res) => {
  const asked = req.query.emailpass;

  const emailpass = asked.split("~");
  const email = emailpass[0];
  const password = emailpass[1];
  const Check = `select * from account where email='${email}'`;
  const access = {
    VALID: null,
    user: null,
  };
  mysqlConnection.query(Check, (err, result) => {
    if (err) {
      console.log("err");
      throw err;
    }
    // console.log(result)
    if (result.length <= 0) {
      console.log("account do not exist");
      access.VALID = "ACC_N_EXIST";
      res.json(access);
    } else {
      if (result[0].password === password) {
        console.log("password matched");
        access.VALID = "CORRECT";
        access.user = result[0];
        res.json(access);
      } else {
        console.log("password donot matched");
        access.VALID = "INCORRECT";
        res.json(access);
      }
    }
  });
});
server.post("/addtolist", (req, res) => {
  console.log(req.body);
});

server.listen(port, () => {
  console.log(`listening to netflix server port ${port}`);
});
