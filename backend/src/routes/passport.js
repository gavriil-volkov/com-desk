import passportLocal from 'passport-local';
import passportGithub2 from 'passport-github2';
import passportGoogle20 from 'passport-google-oauth20';
import User from '../models/user.module.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const LocalStrategy = passportLocal.Strategy;
const GitHubStrategy = passportGithub2.Strategy;
const GoogleStrategy = passportGoogle20.Strategy;

function Passport(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
  },
    function (email, password, done) {

      User.findOne({ email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
      });
    }
  ));

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
    function (accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(async function () {

        let gituser = await User.findOne({ githubId: profile.id });

        if (!gituser) {
          gituser = new User({ githubId: profile.id, firstname: profile.username, gitHub: profile.username, admin: false });
          await gituser.save();
        }
        return done(null, gituser);
      });
    }
  ));

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
    function (accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(async function () {

        let googleuser = await User.findOne({ googleId: profile.id });

        if (!googleuser) {
          googleuser = new User({ googleId: profile.id, firstname: profile.name.givenName, surname: profile.name.familyName, admin: false, });
          await googleuser.save();
        }

        return done(null, googleuser);
      });
    }
  ));

  //Записывает юзера в сессию по id
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // Находит юзера в БД по id, который записан в сессии
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

}
export default Passport
