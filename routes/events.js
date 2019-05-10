var express = require('express');
var request = require('request')
var router = express.Router();

var userToken = process.argv[2];
var botToken = process.argv[3];

/* GET event. */
router.get('/', function(req, res) {
    res.send('I need a POST request...')
});

/* POST event. */
router.post('/', function(req, res) {
    var payload = req.body;

    var challenge = payload.challenge;
    if (challenge) {
        res.send(challenge)
    } else if (payload.command === "/parrotbomb") {
        res.send();
        try {
            request.get('https://slack.com/api/channels.history?channel=' + payload.channel_id + '&count=1', {
                auth: {
                    bearer: userToken
                }
            }, function (error, res, body) {
                if (error) {
                    console.error(error);
                    return
                }
                var messages = JSON.parse(body)["messages"];
                var message = messages[0];

                var parrots = ['sad_parrot', 'fast_parrot', 'confused_parrot', 'nyan_parrot', 'upvote_party_parrot', 'slow_parrot', 'dreidel_parrot', 'beer_parrot', 'fieri_parrot', 'shuffle_parrot', 'sirenparrot', 'sassy_parrot', 'matrix_parrot', 'xmas_parrot', 'stable_parrot', 'banana_parrot', 'nyan_parrot', 'explody_parrot', 'thumbs_parrot', 'hd_parrot', 'cop_parrot', 'slow_parrot'];
                for (var i = 0; i < parrots.length; i++) {
                    request.post('https://slack.com/api/reactions.add', {
                        json: {
                            name: parrots[i],
                            channel: payload.channel_id,
                            timestamp: message.ts
                        },
                        auth: {
                            bearer: botToken
                        }
                    }, function (error, res, body) {
                        if (error) {
                            console.error(error);
                            return
                        }

                        return
                    });
                }
            });
        } catch (e) {
            console.log("ERROR");
            console.log(e);
            console.log(e.message);
        }
    } else {
        console.log(payload.event);
    }
});

module.exports = router;
