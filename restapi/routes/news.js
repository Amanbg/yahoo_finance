let express = require('express');
let request = require('request');
let config = require('../config/config.json');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let options = {
        method: 'GET',
        url: config.YAHOO.API_URL + "/stock/get-news",
        qs: {region: 'US', category: 'NBEV'},
        headers: {
            'x-rapidapi-host': config.YAHOO.RAPID_API_HOST,
            'x-rapidapi-key': config.YAHOO.RAPID_API_KEY,
            useQueryString: true
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        //console.log(body);
        let newsData =  JSON.parse(body);
        res.json(newsData);

    });
});

module.exports = router;
