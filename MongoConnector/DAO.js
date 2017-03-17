var mongo = require('mongodb').MongoClient
var db_Config = require('./Conf')

function find(col,filter,callback){
  mongo.connect(db_Config.url,function(err,db){
    if (err) throw err
    var dbCol = db.collection(col)
    dbCol.find(filter).toArray(function(err, docs) {
          if (err) throw err
          db.close()
          if(docs){
            docs.isempty = false
            callback(docs)
          }
          else {
            callback({'isempty':true})
          }
      })
})
}

function findOne(col,filter,callback){
  mongo.connect(db_Config.url,function(err,db){
    if (err) throw err
    var dbCol = db.collection(col)
    dbCol.findOne(filter,function(err, docs) {
            if (err) throw err
            db.close()
            if(docs){
              docs.isempty = false
              callback(docs)
            }
            else {
              callback({'isempty':true})
            }
      })
})
}


function find_sort_limit(col,filter,sortOP,limitOP,callback){
  mongo.connect(db_Config.url,function(err,db){
    if (err) throw err
    var dbCol = db.collection(col)
    dbCol.find(filter).sort(sortOP).limit(limitOP).toArray(function(err, docs) {
      if (err) throw err
      db.close()
      callback(docs)})
})
}

function insert(col,query,callback){
  mongo.connect(db_Config.url,function(err,db){
    if (err) throw err
    var dbCol = db.collection(col)
    dbCol.insert(query,function(err) {
      if (err) throw err
      db.close()
      console.log("insert " + col);
      callback()
    })
})
}

function save(col,query,callback){
  mongo.connect(db_Config.url,function(err,db){
    if (err) throw err
    var dbCol = db.collection(col)
    dbCol.save(query,function(err) {
      if (err) throw err
      db.close()
      console.log("save " + col);
      callback()
    })
})
}

function update(col,filter,query,callback){
  mongo.connect(db_Config.url,function(err,db){
    if (err) throw err
    var dbCol = db.collection(col)
    dbCol.update(filter,query,function(err) {
      if (err) throw err
      db.close()}
    )
})
}


exports.find = find;
exports.findOne = findOne;
exports.insert = insert;
exports.update = update;
exports.save = save;
exports.find_sort_limit = find_sort_limit;
