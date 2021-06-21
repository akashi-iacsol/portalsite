var express = require('express');
var router = express.Router();
var pool = require('../postgres/pool');

let array = [];

router.post('/', function (req, res) {
  pool.connect().then((client) => {
    client.query(`SELECT p.position_code, p.position_name, p.position_class_max FROM position_master p;`)
      .then((result) => {
        result.rows.forEach((item) => {
          let position_item = {
            itemData: {
              position_code: item.position_code,
              position_name: item.position_name,
              position_class_max: item.position_class_max,
            },
            id: item.position_code,
            name: item.position_name,
            forSelect: true,
            isHide: false,
            isArray: false,
          };
          array.push(position_item)
        })
        res = sendJson(res);
      })
      .catch((error) => {
        console.log(error)
      });
  }).catch((error) => {
    console.log(error)
  });
});

function sendJson(res) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.json({
    array: array,
  });
  return res;
}
module.exports = router;
