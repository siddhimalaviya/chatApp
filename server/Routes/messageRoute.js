const router = require('express').Router()
const { createMessage, getMessages } = require('../Controller/messageController')

router.post('/', createMessage)
router.get('/:chatId', getMessages)

module.exports = router