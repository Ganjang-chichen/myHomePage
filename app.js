var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var ipfilter = require('express-ipfilter');
var fs = require('fs');

var moment = require('moment');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var learnRouter = require('./routes/learn')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const BAN_LIST_PATH = path.join(__dirname, 'public/json/ban_list.json');
const BAN_WORD_PATH = path.join(__dirname, 'public/json/ban_word.json');
const FORBIDEN_URL_WORD_LIST = JSON.parse(fs.readFileSync(BAN_WORD_PATH).toString()).ban_word;

if(!fs.existsSync(BAN_LIST_PATH)){
  let ban_doc = {
    "ban_ip_list" : [],
    "ban_info" : [],
    "404_log" : []
  }
  fs.writeFileSync(BAN_LIST_PATH, JSON.stringify(ban_doc));
}else {
  let ban_data = fs.readFileSync(BAN_LIST_PATH);
  let banJSON = JSON.parse(ban_data.toString());
  let ban_ip_list = banJSON.ban_ip_list;
  // console.log("ban list");
  // console.log(ban_ip_list);
  app.use(ipfilter.IpFilter(ban_ip_list));
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/learn', learnRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
  console.log(`case 0 - ${ip}`);
  console.log(req.params);
  console.log(req.query);
  console.log(req.url);
  URL_Censor(ip, req.url);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

function URL_Censor(ip, url) {
  let update_ban_data = fs.readFileSync(BAN_LIST_PATH);
  let update_banJSON = JSON.parse(update_ban_data.toString());
  IS_FUCKING_HACKER = false;

  let unknown_data = {
    "ip" : ip,
    "time" : moment().format('YYYY-MM-DD HH:mm:ss'),
    "url" : url
  }

  for(let i = 0; i < FORBIDEN_URL_WORD_LIST.length; i++){
    if(url.toLowerCase().includes(FORBIDEN_URL_WORD_LIST[i])){
      IS_FUCKING_HACKER = true;
      break;
    }
  }
  if(IS_FUCKING_HACKER){

    update_banJSON.ban_ip_list.push(ip);
    update_banJSON.ban_info.push(unknown_data);

    fs.writeFileSync(BAN_LIST_PATH, JSON.stringify(update_banJSON));
  }else {
    
    update_banJSON['404_log'].push(unknown_data);

    fs.writeFileSync(BAN_LIST_PATH, JSON.stringify(update_banJSON));
  }
}