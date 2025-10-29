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
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const photo = profile.photos?.[0]?.value;

        // Check if user already exists
        let user = await User.findOne({ email });

        if (!user) {
          // Create new user
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: email,
            profileImage: photo,
            isVerified: true,
          });
        } else {
          // User exists → Update googleId if missing
          if (!user.googleId) {
            user.googleId = profile.id;
          }
          if (!user.profileImage) {
            user.profileImage = photo;
          }
          if (!user.isVerified) {
            user.isVerified = true;
          }
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
