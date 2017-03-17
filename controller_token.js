var jwt = require('jwt-simple');

var secret = 'wow'
var connectionTime = 30;

exports.getNewToken = function(email,callback){
  var date = new Date();
  var min = date.getMinutes();
  date.setMinutes(min + connectionTime);
  console.log(email)
  var payload = { 'email' : email, 'year':date.getFullYear(),'month':date.getMonth(),'date':date.getDate(),'hour':date.getHours(),'minutes':date.getMinutes(),'sec':date.getSeconds() };
  var token = jwt.encode(payload, secret);
  callback(token)
}

exports.checkToken = function(token,callback){
  var date = new Date();

  var decoded = jwt.decode(token, secret);
  var date2 = new Date(decoded.year,decoded.month,decoded.date,decoded.hour,decoded.minutes,decoded.sec);
    //console.log(decoded); //=> { foo: 'bar' }
    console.log(date)
    console.log(date2)
    if(date.getTime() < date2.getTime()){
      callback(true)
    }else{
      callback(false)
      }
}

exports.getTokenData = function(token,callback){
  var decoded = jwt.decode(token, secret);

  callback(decoded)
}
