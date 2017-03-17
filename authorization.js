var db = require('./MongoConnector/DAO')

var app_access_token = '706997686105976|0OZJHFqBqsK_7aGn_Mw_3ETQ2dM'
var secretKEY = 'wow';

var method =  '';
var email = ''
var pass = ''
var externaltoken = ''
var id = ''
var name = ''

module.exports = function(mail) {

  this.method = function(input){
    this.method = input;
    return this;
  };

  this.email = function(input){
    this.email = input;
    return this;
  };

  this.id = function(input){
    this.id = input;
    return this;
  };

  this.pass = function(input){
    this.pass = input;
    return this;
  };

  this.token = function(input){
    this.externaltoken = input;
    return this;
  };

  this.name = function(input){
    this.name = input;
    return this;
  };
};

function check_user(callback){
  console.log(this.method + this.email)
  var check = false;
  switch (this.method) {
    case 'nomal'    :
                if(this.email =='123' && this.pass == '123'){
                  callback(true);
                }else {
                  callback(false);
                }
                 break;
    case 'facebook'   :
                  check_accessToken_fb(this.externaltoken,function(re){
                            callback(re);
                  })
                 break;
    default    :
                 break;
  }
}

function check_accessToken_fb(token, callback) {
  var https = require('https')
  var url2= 'https://graph.facebook.com/debug_token?input_token='+token+'&access_token=706997686105976|0OZJHFqBqsK_7aGn_Mw_3ETQ2dM'
  https.get(url2, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        var temp = JSON.parse(chunk)
        if(temp.data){
          callback(temp.data.is_valid)
          }
          else{
            callback(false)
          }
    }).on('error', (e) => {
      console.log(`auth error`);
      callback(false)
    });
  });
};

exports.check_user  = check_user;
