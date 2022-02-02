const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const IncomingUpdate = require('../models/IncomingUpdate');

const signToken = userID => {
    return JWT.sign({
        iss: "NoobCoder",
        sub: userID
    }, "NoobCoder", { expiresIn: "1h" });
}

userRouter.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err){
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
            console.log(err);
        }
        if (user)
            res.status(400).json({ message: { msgBody: "Username is already taken", msgError: true } });
        else {
            const newUser = new User({ username, password, role });
            newUser.save(err => {
                if (err){
                    res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
                    console.log(err);
                }
                else
                    res.status(201).json({ message: { msgBody: "Account successfully created", msgError: false } });
            });
        }

    });
});

userRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, username, role } = req.user;
        const token = signToken(_id);
        // prevention of cross-site scripting attacks with httpOnly. sameSite prevents cross-site request forgery attacks
        res.cookie("access_token", token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
});

userRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { username: '', role: '' }, success: true })
});

userRouter.post('/incomingupdate', passport.authenticate('jwt', { session: false }), (req, res) => {
    const incomingupdate = new IncomingUpdate(req.body);
    incomingupdate.save(err => {
        if (err)
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        else {
            req.user.incomingupdates.push(incomingupdate);
            req.user.save(err => {
                if (err)
                    res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
                else
                    res.status(200).json({ message: { msgBody: "Successfully created Incoming Update", msgError: false } });
            });
        }
    })

});

userRouter.get('/incomingupdates', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById({ _id: req.user._id }).populate('incomingupdates').exec((err, document) => {
        if (err)
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        else {
            res.status(200).json({ incomingupdates: document.incomingupdates, authenticated: true });
        }
    })

});

userRouter.get('/admin', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.role === 'admin') {
        res.status(200).json({ message: { msgBody: "You are authorized as admin", msgError: false } });
    }
    else
        res.status(403).json({ message: { msgBody: "Your not an admin, go away", msgError: true } });

});
// save user state if authenticated
userRouter.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
});

module.exports = userRouter;