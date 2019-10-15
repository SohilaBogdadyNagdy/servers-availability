var promise = require("promise");
var request = require("request");

exports.findServers = async function (req, res) {
    var data = req.body;
    var promise_list = [];
    var availabe_servers = [];
    try {
        var servers_url = [];
        data.forEach(obj => {
            servers_url.push(obj["url"])
        });
        servers_url.forEach(async (url) => {
            promise_list.push(
                check_server(url).then(
                    function (url) {
                        availabe_servers.push(url);
                    },
                    function (err) {
                        console.log(err);
                    }
                )
            )
        });
        Promise.all(promise_list).then(function () {
            return res.status(200).json({
                status: 200,
                data: availabe_servers
            });
        }).catch(function () {
            return res.status(204).json({
                status: 204
            });
        })


    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

function check_server(url) {
    return new Promise(function (fullfill, reject) {
        var timeout = 5000;
        var timer = setTimeout(function () {
            reject("timeout");
        }, timeout);
        var options = {
            url: url,

        }
        request.get(options, function (err, res) {
            if (err) {
                reject(err);
            }
            if (res.statusCode <= 200 || res.statusCode > 300) {
                fullfill(url);
            }
        });

    });
}