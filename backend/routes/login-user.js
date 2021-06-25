var express = require('express');
var router = express.Router();
var pool = require('../postgres/pool');
var conf = require('../config/default.json');

let login_user = {};

router.post('/', async function (req, res) {
  try {
    const client = await pool.connect()
    const employee_result = await client.query(`SELECT e.employee_number, e.employee_last_name, e.employee_first_name FROM employee_master e  WHERE e.employee_id = '${req.body.employee_id.replace(/\"/g, "\'")}';`)
    login_user = {
      employee_number: employee_result.rows[0].employee_number,
      employee_last_name: employee_result.rows[0].employee_last_name,
      employee_first_name: employee_result.rows[0].employee_first_name,
    };

    const belongs_result = await client.query(`SELECT d.department_code, d.department_name FROM department_management dm LEFT JOIN department_master d ON dm.department_code = d.department_code WHERE dm.employee_number = '${Number(login_user.employee_number)}';`)
    login_user.department = belongs_result.rows;


    const authority_result = await client.query(`SELECT a.authority_code FROM authority_management a WHERE a.employee_number = '${Number(login_user.employee_number)}';`)
    login_user.authority_code = authority_result.rows;

    res = await sendJson(res);

  } catch (error) {
    console.log(error)
  };
});

function sendJson(res) {
  res.header('Access-Control-Allow-Origin', conf.response_header.acao);
  res.json({
    login_user: login_user
  });
  return res;
}
module.exports = router;
