const router = require('express').Router()
const { createChat, findUserChats, findChat } = require('../Controller/chatController')

router.post('/', createChat)
router.get('/:userId', findUserChats)
router.get('/find/:firstId/:secondId', findChat)
module.exports = router
