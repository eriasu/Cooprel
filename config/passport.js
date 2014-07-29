/**
 * Created by Elias on 2014/07/29.
 */
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
module.exports = function(passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);

        });
    });


    passport.use('local-signup', new LocalStrategy({
            usernameField: 'usuario',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, usuario, password, done) {
            process.nextTick(function () {
                User.findOne({'local.usuario': usuario}, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'Ese usuario ya a sido utilizado'));
                    }
                    else {
                        var newUser = new User();
                        newUser.local.usuario = usuario;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));
};