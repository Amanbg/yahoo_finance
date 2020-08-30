let express = require('express');
let request = require("request");
let config = require("../config/config.json")
let router = express.Router();

/* GET Analysis listing. */
router.get('/', function(req, res, next) {
    try {
        let params = req.query;
        if(params.symbol == undefined){
        	throw new Error('Param Not found')
        }

        let options = {
            method: 'GET',
            url: config.YAHOO.API_URL + "/stock/v2/get-analysis",
            qs: { symbol: params.symbol },
            headers: {
                'x-rapidapi-host': config.YAHOO.RAPID_API_HOST,
                'x-rapidapi-key': config.YAHOO.RAPID_API_KEY,
                useQueryString: true
            }
        };

        request(options, function(error, response, body) {
            if (error) throw new Error(error);

            let analyticdata = JSON.parse(body);
            res.json(analyticdata);

        });
    } catch (error) {
    	res.json({Error: error.message})
    }

});

module.exports = router;