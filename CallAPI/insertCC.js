var request = require('request');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function(err, db) {

	if (err) throw err;
	var dbo = db.db("crypto");

	request('https://min-api.cryptocompare.com/data/all/coinlist', function(error, response, body) {

		if(error) throw error;
		var parsedData = JSON.parse(body);

  		for(var i in parsedData.Data) {

	  		var obj = {

		  		id: i,
		  		name: parsedData.Data[i].CoinName.toUpperCase(),
		  		idCMC: "",
		  		symbolCMC: "",
		  		idCC: parsedData.Data[i].Id,
		  		symbolCC: parsedData.Data[i].Symbol

		  	}

		  	dbo.collection("cryptodata").updateOne(

		  		{ name: obj.name},
		  		{ $set: {id: obj.i, name: obj.name, idCC: obj.idCC, symbolCC: obj.symbolCC}},
		  		{ upsert: true},
		  		function(err, res) {
		  			if(err) throw err;
		  			console.log("OK!");
		  			db.close();
		  		
		  	});
	  	}

	});

});

