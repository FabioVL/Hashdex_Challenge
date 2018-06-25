var request = require('request');
var MongoClient =  require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function(err, db) {

	if (err) throw err;
	var dbo = db.db('crypto');

	request('https://api.coinmarketcap.com/v2/listings/', function (error, response, body) {

		if(error) throw error;
		console.log('statusCode:', response && response.statusCode);

		var dataC = JSON.parse(body);

		var num_crypto = dataC.metadata.num_cryptocurrencies;

		var i = 1;

		for(i = 1; i < num_crypto; i+=100) {

			request('https://api.coinmarketcap.com/v2/ticker/?start='+i+'&limit=100&sort=id', function (error, response, body) {

				if(error) throw error;
				var parsedData = JSON.parse(body);

				for(var j in parsedData.data) {

					var obj = {

						idCMC: parsedData.data[j].id,
						marketcapCMC: parsedData.data[j].quotes.USD.market_cap
					}

				  	dbo.collection("cryptodata").updateOne(

				  		{ idCMC: obj.idCMC},
				  		{ $set: {marketcapCMC: obj.marketcapCMC}},
				  		{ upsert: true},
				  		function(err, res) {
				  			if(err) throw err;
				  			console.log("OK!");
				  			// db.close();
				  		
				  	});
				  	
				}

			});

		}

	});
});