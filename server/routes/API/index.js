const router = require('express').Router();
const userRoutes = require('./User');
const meetingitemRoutes = require('./MeetingItem');


router.use('/user', userRoutes)
router.use('/meetingitem', meetingitemRoutes)

module.exports = router;
