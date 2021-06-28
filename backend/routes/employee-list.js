var express = require('express');
var router = express.Router();
var pool = require('../postgres/pool');
var conf = require('../config/default.json');

let array = [];

router.post('/', async function (req, res) {
  array = [];
  try {
    const client = await pool.connect()
    await selectItem(client)
    res = await sendJson(res);
  } catch (error) {
    console.log(error)
  };
});

async function selectItem(client) {
  try {
    const result = await client.query(`SELECT d.department_code, d.department_name, d.superior_employee_number, d.higher_department_code FROM department_master d WHERE d.higher_department_code IS NULL;`)
    for (let item of result.rows) {
      let custom_item = {
        itemData: {
          department_code: item.department_code,
          department_name: item.department_name,
          superior_employee_number: item.superior_employee_number,
          higher_department_code: item.higher_department_code,
        },
        id: item.department_code,
        name: item.department_name,
        forSelect: false,
      };
      const employee_array = await selectEmployee(client, custom_item.id);
      const department_array = await selectDepartment(client, custom_item.id);
      custom_item.array = employee_array.concat(department_array);
      array.push(custom_item);
    }
  } catch (error) {
    console.log(error)
  };
}

async function selectDepartment(client, higher_department_code) {
  try {
    let children_array = [];
    const result = await client.query(`SELECT d.department_code, d.department_name, d.superior_employee_number, d.higher_department_code FROM department_master d WHERE d.higher_department_code = '${Number(higher_department_code)}';`)
    for (let item of result.rows) {
      let custom_item = {
        itemData: {
          department_code: item.department_code,
          department_name: item.department_name,
          superior_employee_number: item.superior_employee_number,
          higher_department_code: item.higher_department_code,
        },
        id: item.department_code,
        name: item.department_name,
        forSelect: false,
      };
      const employee_array = await selectEmployee(client, custom_item.id);
      const department_array = await selectDepartment(client, custom_item.id);
      custom_item.array = employee_array.concat(department_array);
      children_array.push(custom_item);
    }
    return children_array;
  } catch (error) {
    console.log(error)
  };
}

async function selectEmployee(client, department_code) {
  try {
    let children_array = [];
    const result = await client.query(`SELECT e.employee_number, e.employee_id, e.employee_last_name, e.employee_first_name, e.phone_number, e.mail_address, e.slack_user_name, e.position_code, e.position_class FROM department_management dm LEFT JOIN employee_master e ON dm.employee_number = e.employee_number WHERE dm.department_code = '${Number(department_code)}';`)
    for (let item of result.rows) {
      let custom_item = {
        itemData: {
          employee_number: item.employee_number,
          employee_id: item.employee_id,
          employee_last_name: item.employee_last_name,
          employee_first_name: item.employee_first_name,
          phone_number: item.phone_number,
          mail_address: item.mail_address,
          slack_user_name: item.slack_user_name,
          position_code: item.position_code,
          position_class: item.position_class,
        },
        id: item.employee_number,
        name: "・" + item.employee_last_name + " " + item.employee_first_name,
        forSelect: true,
      };
      
      let sub_array = [];
      const belongs_result = await client.query(`SELECT dm.department_code FROM department_management dm WHERE dm.employee_number = '${Number(custom_item.id)}';`)
      for (let item of belongs_result.rows) {
        sub_array.push(item.department_code);
      }
      custom_item.itemData.department_array = sub_array;
      children_array.push(custom_item);
    }
    return children_array;
  } catch (error) {
    console.log(error)
  };
}

function sendJson(res) {
  res.header('Access-Control-Allow-Origin', conf.response_header.acao);
  res.json({
    array: array,
  });
  return res;
}
module.exports = router;
