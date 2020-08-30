let express = require('express');
let request = require("request");
let config = require("../config/config.json")
console.log(config)

let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    let options = {
        method: 'GET',
        url: config.YAHOO.API_URL + "/stock/v2/get-analysis",
        qs: { symbol: 'AMRN' },
        headers: {
            'x-rapidapi-host': config.YAHOO.RAPID_API_HOST,
            'x-rapidapi-key': config.YAHOO.RAPID_API_KEY,
            useQueryString: true
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        //console.log(body);
        let analyticdata =  JSON.parse(body);
        res.json(analyticdata);

    });
});

module.exports = router;