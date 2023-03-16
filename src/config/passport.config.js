import passport from "passport";
import GithubStrategy from 'passport-github2';
import userService from '../models/users.js';

const initializePassport = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userService.findOne({ _id: id });
        done(null, user)
    })


    passport.use('github', new GithubStrategy({
        clientID: "Iv1.3d637644249a83f3",
        clientSecret: "3b1020db862cb39fb3d0bfb70520fcdefb7af5b0",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = await userService.findOne({ email: profile.emails[0].value });
            if(!user){
                let newUser = {
                    first_name: profile._json.login,
                    last_name: "",
                    age: 18,
                    email: profile.emails[0].value,
                    password: ""
                }
                let result = await userService.create(newUser);
                done(null, result)
            }else{
                done(null, user)
            }
        } catch (error) {
            done(error)
        }
    }))
}

export default initializePassport;