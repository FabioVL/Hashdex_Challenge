var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("crypto");
  dbo.collection("inconsistent2").find({}).toArray(function(err, result) {
    if (err) throw err;
    for(var i in result){

    	console.log("Moeda: " + result[i].name + " \n\tCMC: " + result[i].symbolCMC + " e CC: " + result[i].symbolCC);
    }
    console.log(result.length);
    db.close();
  });
});