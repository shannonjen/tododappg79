const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const bcrypt = require('bcrypt-as-promised')

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile.js')[environment];
const knex = require('knex')(knexConfig);

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
function(username, password, cb){
  return knex('users')
  .where('username', username)
  .first()
  .then(function(user){
    bcrypt.compare(password, user.hashed_password)
    .then(function(){
      return cb(null, { user }, {message: 'Logged In Successfully'})
    })
    .catch(function(){
      return cb(null, false, {message: 'Incorrect email or password'})
    })
  })
  .catch(function(err){
    cb(err)
  })
}
))


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
},
function(jwtPayload, cb) {
  return knex('users')
  .where('id', jwtPayload.id)
  .first()
  .then(function(user){
    return cb(null, user);
  })
  .catch(function(err){
    return cb(err);
  })
}
))
