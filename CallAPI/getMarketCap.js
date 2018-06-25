var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("crypto");
  dbo.collection("cryptodata").find({}).toArray(function(err, result) {
    if (err) throw err;

    for(var i in result){

    	if(result[i].marketcapCMC != undefined) {
    		console.log("Moeda: " + result[i].name);
    		console.log("\tMarketCap CMC: " + result[i].marketcapCMC);
    	}
    }
    db.close();
  });
});