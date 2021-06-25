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
    const result = await client.query(`SELECT s.system_code, s.system_name FROM system_master s;`)
    for (let item of result.rows) {
      let custom_item = {
        itemData: {
          system_code: item.system_code,
          system_name: item.system_name,
        },
        id: item.system_code,
        name: item.system_name,
        forSelect: false,
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

async function selectItemChildren(client, system_code) {
  try {
    let children_array = [];
    const result = await client.query(`SELECT a.authority_code, a.system_code, a.authority_name FROM authority_master a WHERE a.system_code = '${Number(system_code)}';`)
    for (let item of result.rows) {
      let custom_item = {
        itemData: {
          authority_code: item.authority_code,
          system_code: item.system_code,
          authority_name: item.authority_name,
        },
        id: item.authority_code,
        name: item.authority_name,
        forSelect: true,
      };
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
