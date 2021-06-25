var express = require('express');
var router = express.Router();
var ActiveDirectory = require('activedirectory2').promiseWrapper;
var conf = require('../config/default.json');

router.post('/', async function (req, res) {

    let url = `ldap://${conf.active_directory.host}:${conf.active_directory.port}`;
    let dc_2ld = conf.active_directory.dc_2ld;
    let dc_tld = conf.active_directory.dc_tld;
    let samAccountName = req.body.samAccountName;
    let username = samAccountName + "@" + dc_2ld + "." + dc_tld;
    let password = req.body.password;

    let config = {
        url: url,
        baseDN: `dc="${dc_2ld}",dc="${dc_tld}"`,
        username: username,
        password: password,
    }

    let ad = new ActiveDirectory(config);
    await ad.authenticate(username, password, async function (err, auth) {
        if (err) {
            console.log('ERROR: ' + JSON.stringify(err));
            await sendJson(res, {error: err})
            return;
        }

        if (auth) {
            await ad.findUser(samAccountName, async function (err, user) {
                if (err) {
                    console.log('ERROR: ' + JSON.stringify(err));
                    await sendJson(res, {error: err})
                    return;
                }

                if (!user) {
                    let message = 'User: ' + samAccountName + ' not found.';
                    console.log(message);
                    await sendJson(res, {error: message})
                }
                else {
                    await sendJson(res, user);
                }
            });
        } else {
            let message = 'Authentication failed!'
            console.log(message);
            await sendJson(res, {error: message})
        }
    });
});
async function sendJson(res, user) {
    await res.header('Access-Control-Allow-Origin', conf.response_header.acao);
    await res.json({
        user: user
    });
    return await res;
}
module.exports = router;
