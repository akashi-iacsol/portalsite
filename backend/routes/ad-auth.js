var express = require('express');
var router = express.Router();
var ActiveDirectory = require('activedirectory2').promiseWrapper;

router.post('/', async function (req, res) {

    let url = 'ldap://192.168.129.3:389';
    let dc1 = "iacsol";
    let dc2 = "local";
    let samAccountName = req.body.samAccountName;
    let username = samAccountName + "@" + dc1 + "." + dc2;
    let password = req.body.password;

    let config = {
        url: url,
        baseDN: `dc="${dc1}",dc="${dc2}"`,
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
    await res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
    await res.json({
        user: user
    });
    return await res;
}
module.exports = router;
