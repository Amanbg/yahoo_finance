let express = require('express');
let request = require('request');
let config = require('../config/config.json');
let router = express.Router();

/* GET News listing. */
router.get('/', function(req, res, next) {
    try {
        let params = req.query;
        if (params.region == undefined || params.category == undefined) {
            throw new Error('Param Not found')
        }

        let options = {
            method: 'GET',
            url: config.YAHOO.API_URL + "/stock/get-news",
            qs: { region: params.region, category: params.category },
            headers: {
                'x-rapidapi-host': config.YAHOO.RAPID_API_HOST,
                'x-rapidapi-key': config.YAHOO.RAPID_API_KEY,
                useQueryString: true
            }
        };

        request(options, function(error, response, body) {
            if (error) throw new Error(error);

            let newsData = JSON.parse(body);
            res.json(newsData);

        });
    } catch (error) {
    	res.json({Error: error.message})
    }
});

module.exports = router;