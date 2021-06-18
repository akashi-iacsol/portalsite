var express = require('express');
var router = express.Router();
var pool = require('../postgres/pool');

let employee_number = "";
let employee_last_name = "";
let employee_first_name = "";
let department = [];
let authority_code = [];

/* GET users listing. */
router.post('/', function (req, res) {
  pool.connect(function (err, client) {
    if (err) {
      console.log(err);
    } else {
      client.query(`SELECT e.employee_number, e.employee_last_name, e.employee_first_name FROM employee_master e  WHERE e.employee_id = '${req.body.employee_id.replace(/\"/g, "\'")}';`, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          employee_number = String(result.rows[0].employee_number);
          employee_last_name = String(result.rows[0].employee_last_name);
          employee_first_name = String(result.rows[0].employee_first_name);

          client.query(`SELECT d.department_code, d.department_name FROM department_management dm LEFT JOIN department_master d ON dm.department_code = d.department_code WHERE dm.employee_number = '${employee_number.replace(/\"/g, "\'")}';`, function (err, result) {
            if (err) {
              console.log(err);
            } else {
              department = result.rows;
              client.query(`SELECT a.authority_code FROM authority_management a WHERE a.employee_number = '${employee_number.replace(/\"/g, "\'")}';`, function (err, result) {
                if (err) {
                  console.log(err);
                } else {
                  authority_code = []
                  authority_code = result.rows;
                  console.log(authority_code)
                  res = sendJson(res);
                }
              });
            }
          });
        }
      });
    }
  });
});
function sendJson(res) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
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
