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
    const result = await client.query(`SELECT p.position_code, p.position_name, p.position_class_max FROM position_master p;`)
    for (let item of result.rows) {
      let custom_item = {
        itemData: {
          position_code: item.position_code,
          position_name: item.position_name,
          position_class_max: item.position_class_max,
        },
        id: item.position_code,
        name: item.position_name,
        forSelect: true,
      };
      array.push(custom_item);
    }
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
