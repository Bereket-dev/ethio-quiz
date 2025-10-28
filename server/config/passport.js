const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALL_BACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let email = profile.emails?.[0]?.value || null;
        if (!email) throw new Error("Email is not found in the google.");
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email,
            isVerified: true,
          });
        } else if (user && !user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }

        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);

module.exports = passport;
