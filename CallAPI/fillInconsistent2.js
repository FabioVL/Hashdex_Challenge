var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("crypto");
  dbo.collection("cryptodata").find({}).toArray(function(err, result) {
    if (err) throw err;

    var cryptoList = [];
    var inconsistent2 = [];

    for(var i in result) {

      var obj = {

        id: result[i].id,
        name: result[i].name,
        idCMC: result[i].idCMC,
        symbolCMC: result[i].symbolCMC,
        idCC: result[i].idCC,
        symbolCC: result[i].symbolCC
      }

      cryptoList.push(obj);

    }

    var i = 0;
    var j = 0;

    var auxArray = [];
    for(i = 0; i < cryptoList.length; i++) auxArray[i] = 0;

    for(i = 0; i < cryptoList.length; i++) {

      for(j = i+1; j < cryptoList.length; j++) {

        if((cryptoList[i].symbolCMC == cryptoList[j].symbolCMC || cryptoList[i].symbolCMC == cryptoList[j].symbolCC)//  || cryptoList[i].symbolCC == cryptoList[j].symbolCC) 
            && cryptoList[i].symbolCMC != undefined && cryptoList[j].symbolCC != undefined) {

              if(auxArray[i] == 0){

                dbo.collection("inconsistent2").updateOne(

                  { name: cryptoList[i].name},
                  { $set: {id: cryptoList[i].id, name: cryptoList[i].name, idCMC: cryptoList[i].idCMC, symbolCMC: cryptoList[i].symbolCMC, idCC: cryptoList[i].idCC, symbolCC: cryptoList[i].symbolCC}},
                  { upsert: true},
                  function(err, res) {
                    if(err) throw err;
                    console.log("OK");
                    db.close();
                  
                });
                auxArray[i] = 1;
              }

              if(auxArray[j] == 0){

                dbo.collection("inconsistent2").updateOne(

                  { name: cryptoList[j].name},
                  { $set: {id: cryptoList[j].id, name: cryptoList[j].name, idCMC: cryptoList[j].idCMC, symbolCMC: cryptoList[j].symbolCMC, idCC: cryptoList[j].idCC, symbolCC: cryptoList[j].symbolCC}},
                  { upsert: true},
                  function(err, res) {
                    if(err) throw err;
                    console.log("OK");
                    db.close();
                  
                });

                auxArray[j] = 1;
              }


        }

      }

    }

    db.close();

  });
});