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
        forSelect: true,
      };
      const sub_array = await selectItemChildren(client, custom_item.id);
      if (sub_array.length != 0) {
        custom_item.array = sub_array
      }
      array.push(custom_item);
    }
  } catch (error) {
    console.log(error)
  };
}

async function selectItemChildren(client, higher_department_code) {
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
        forSelect: true,
      };
      const sub_array = await selectDepartmentNext(client, custom_item.id);
      if (sub_array.length != 0) {
        custom_item.array = sub_array
      }
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
