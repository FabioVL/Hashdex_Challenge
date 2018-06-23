var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("crypto");
  dbo.collection("cryptodata").find({}).toArray(function(err, result) {
    if (err) throw err;

    for(var i in result) {

    	if(result[i].symbolCMC != result[i].symbolCC 
    		&& result[i].symbolCMC != undefined 
    		&& result[i].symbolCC != undefined)

    		dbo.collection("inconsistent1").updateOne(

		  		{ name: result[i].name},
		  		{ $set: {id: result[i].id, name: result[i].name, idCMC: result[i].idCMC, symbolCMC: result[i].symbolCMC, idCC: result[i].idCC, symbolCC: result[i].symbolCC}},
		  		{ upsert: true},
		  		function(err, res) {
		  			if(err) throw err;
		  			console.log("OK!");
		  			db.close();
		  		
		  	});

    }
  });
});