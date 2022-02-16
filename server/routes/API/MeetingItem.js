const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const MeetingItem = require('../../models/MeetingItem');


userRouter.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const meetingitem = new MeetingItem(req.body);
    meetingitem.save(err => {
        if (err)
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        else {
            req.user.meetingitems.push(meetingitem);
            req.user.save(err => {
                if (err)
                    res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
                else
                    res.status(200).json({ message: { msgBody: "Successfully created meeting item", msgError: false }, meetingitem});
            });
        }
    })
});



module.exports = userRouter; 