var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var projects = require('./routes/projects-route');
var applications = require('./routes/projectsApplication-route');
var auth = require('./routes/auth-route');
var profile = require('./routes/profile-route');
var notifications = require('./routes/notification-route');
var tags = require('./routes/tags-route');
var deleteRoute = require('./routes/delete-route');
var app = express();
var mongoose = require("mongoose");
var passport = require('passport');
var admin = require("firebase-admin");
var strategy = require('./strategies/local-strategy.js');
var cfg = require("./config.js");
var cors = require("cors");
var socketIO = require("socket.io");
var io = socketIO();
var socketAuth = require('socketio-jwt-auth');
var UserModel = require("./data/models/UserModel");
var ProjectModel = require("./data/models/ProjectModel");
var ProjectChatModel = require("./data/models/ProjectChatModel");
var ProjectChatMessageModel = require("./data/models/ProjectChatMessageModel");
var serviceAccount = require("./serviceAccountKey.json");
//const antiSpam = require('socket-anti-spam')

/*
antiSpam.init({
  banTime: 30, // Ban time in minutes 
  kickThreshold: 2, // User gets kicked after this many spam score 
  kickTimesBeforeBan: 1, // User gets banned after this many kicks 
  banning: true, // Uses temp IP banning after kickTimesBeforeBan 
  heartBeatStale: 40, // Removes a heartbeat after this many seconds 
  heartBeatCheck: 4, // Checks a heartbeat per this many seconds 
  io: io, // Bind the socket.io variable 
});
*/

app.io = io;

//Set promise library
mongoose.Promise = global.Promise;

//Db setup
mongoose.connect(cfg.mongoDBURL, {
  useMongoClient: true
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pro5-4210f.firebaseio.com/"
});

//Allow cross origin 
app.use(cors());

//Setup authentication
passport.use(strategy);
app.use(passport.initialize());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/projects', passport.authenticate('jwt', cfg.jwtSession), projects);
app.use('/projectsDev', projects);
app.use('/auth', auth);
app.use('/tags', tags);
app.use('/profile', passport.authenticate("jwt", cfg.jwtSession), profile);
app.use('/notifications', passport.authenticate("jwt", cfg.jwtSession), notifications);
app.use('/deleteAccount', passport.authenticate("jwt", cfg.jwtSession), deleteRoute);
app.use('/projects/applications', passport.authenticate('jwt', cfg.jwtSession), applications);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || err.statusCode || 500);
  console.log(err);
  res.send(err.message);
});


/*********** CHAT BEREICH *************/

io.use(socketAuth.authenticate({
  secret: cfg.jwtSecret,
  algorithm: 'HS256',
  succeedWithoutToken: false
}, (payload, done) => {
  UserModel.findById(payload.id).exec().then((user) => {
    if (!user) return done(null, false, "User does not exist!");
    return done(null, user);
  }).catch((e) => {
    return done(e);
  })
}));

io.on("connection", (socket) => {
  console.log("Connected");
  socket.emit('success', {
    message: 'Connected to general chat!'
  });

  socket.on("disconnect", () => {
    console.log("Disconnect");
  });

  socket.on('room', (room) => {
    //TODO Check if user is allowed to connect to room socket.request.user
    let allowed = false;
    ProjectModel.findById(room).exec().then((project) => {
      for (let id of project.members) {
        if (id.toString() == socket.request.user.id.toString()) {
          allowed = true;
          break;
        }
      }

      if (!allowed) throw new Error("Not allowed!");

      //Leave all rooms first
      Object.keys(socket.rooms).forEach(function (key) {
        socket.leave(socket.rooms[key]);
      });

      //Join new room

      socket.join(room, () => {

        ProjectChatModel.findOne({
          project: room
        }).populate("messages.author", "firstname lastname profilepicture").exec().then((result) => {
          console.log(result);
          if (result) {
            socket.emit("authorized", result.messages.slice(Math.max(result.messages.length - 20, 0)));
          } else {
            socket.emit("authorized", null);
          }
        });
      });
    }).catch((e) => {
      //TODO Disconnect Client
    });
  });

  socket.on("new-message", (message) => {
    //Broadcast to all rooms the socket is connected to

    //TODO VALIDATE MESSAGE
    let count = 0;
    if (message && message.length > 0 && message.length < 999) {
      Object.keys(socket.rooms).forEach(function (key) {
        count++;
        if (count > 1) return;
        let messageObj = {
          message: message,
          author: socket.request.user.id.toString(),
          sent: new Date().toISOString()
        };

        findOneOrCreate(socket.rooms[key]).then((result) => {
          result.messages.push(messageObj);
          return result.save();
        }).then((result) => {
          return UserModel.findById(socket.request.user.id.toString()).select("firstname lastname profilepicture").lean().exec();
        }).then((user) => {
          messageObj.author = user;
          io.sockets.in(socket.rooms[key]).emit("new-message", messageObj);
        }).catch((e) => {});
      });
    } else {
      socket.emit("message-error", "Message was invalid!");
    }
  })
});

function findOneOrCreate(projectId) {
  return new Promise((resolve, reject) => {
    ProjectChatModel.findOne({
      project: projectId
    }).then((result) => {
      if (!result) {
        new ProjectChatModel({
          project: projectId
        }).save().then((result) => {
          resolve(result);
        });
      } else {
        resolve(result);
      }
    }).catch((error) => {
      reject(error);
    });
  });
}



module.exports = app;