var request = require('request');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function(err, db) {

	if (err) throw err;
	var dbo = db.db("crypto");

	request('https://api.coinmarketcap.com/v2/listings/', function(error, response, body) {

		if(error) throw error;
		var parsedData = JSON.parse(body);
  		for(var i in parsedData.data) {

	  		var obj = {

		  		id: parsedData.data[i].symbol.toUpperCase(),
		  		name: parsedData.data[i].name.toUpperCase().replace(/\sTOKEN/g, '').replace(/\s/g, ''),
		  		idCMC: parsedData.data[i].id,
		  		symbolCMC: parsedData.data[i].symbol.toUpperCase(),
		  		idCC: "",
		  		symbolCC: ""

		  	}

		  	console.log(obj);

		  	dbo.collection("cryptodata").updateOne(

		  		{ name: obj.name},
		  		{ $set: {id: obj.id, name: obj.name, idCMC: obj.idCMC, symbolCMC: obj.symbolCMC}},
		  		{ upsert: true},
		  		function(err, res) {
		  			if(err) throw err;
		  			console.log("OK!");
		  			db.close();
		  		
		  	});
	  	}

	});

});

