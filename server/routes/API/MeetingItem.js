const express = require('express');
const meetingRouter = express.Router();
const passport = require('passport');
const MeetingItem = require('../../models/MeetingItem');


meetingRouter.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
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
                    res.status(200).json({ message: { msgBody: "Successfully created meeting item", msgError: false }, meetingitem });
            });
        }
    })
});

meetingRouter.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const deletedInfo = await MeetingItem.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: { msgBody: "Successfully deleted meeting item", msgError: false }, deletedInfo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
    }
});



module.exports = meetingRouter; 