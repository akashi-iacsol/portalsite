var express = require('express');
var router = express.Router();
var pool = require('../postgres/pool');
var conf = require('../config/default.json');

let employee_number = "";
let employee_last_name = "";
let employee_first_name = "";
let department = [];
let authority_code = [];

router.post('/', function (req, res) {
  pool.connect().then((client) => {
      client.query(`SELECT e.employee_number, e.employee_last_name, e.employee_first_name FROM employee_master e  WHERE e.employee_id = '${req.body.employee_id.replace(/\"/g, "\'")}';`)
        .then((result) => {
          employee_number = String(result.rows[0].employee_number);
          employee_last_name = String(result.rows[0].employee_last_name);
          employee_first_name = String(result.rows[0].employee_first_name);

          client.query(`SELECT d.department_code, d.department_name FROM department_management dm LEFT JOIN department_master d ON dm.department_code = d.department_code WHERE dm.employee_number = '${employee_number.replace(/\"/g, "\'")}';`)
            .then((result) => {
              department = result.rows;

              client.query(`SELECT a.authority_code FROM authority_management a WHERE a.employee_number = '${employee_number.replace(/\"/g, "\'")}';`)
                .then((result) => {
                  authority_code = result.rows;
                  res = sendJson(res);
                })
                .catch((error) => {
                  console.log(error)
                });
            })
            .catch((error) => {
              console.log(error)
            });
        })
        .catch((error) => {
          console.log(error)
        });
  }).catch((error) => {
    console.log(error)
  });
});

function sendJson(res) {
  res.header('Access-Control-Allow-Origin', conf.response_header.acao);
  res.json({
    login_user: {
      employee_number: employee_number,
      employee_last_name: employee_last_name,
      employee_first_name: employee_first_name,
      department: department,
      authority_code: authority_code,
    }
  });
  return res;
}
module.exports = router;
