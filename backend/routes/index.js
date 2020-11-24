const express = require('express');
const router = express.Router();
const multer = require('multer')

const multerImageConfig = require('../config/multerImage');
const multerVideoConfig = require('../config/multerVideo');
const render = require('../render');
const controllerMessage = require('../controller/messages');
const controllerUser = require('../controller/user');
/**
 * @author Hector Rodrigues Da Silva
 */

router
    .get('/', render.index)
    .get('/get/chat/fullcam/message/all', controllerMessage.getAllMessages)
    .get('/get/chat/fullcam/message/count', controllerMessage.getCountMessages)
    .get('/get/chat/fullcam/user/all', controllerUser.getUsers)
    .patch('/patch/chat/fullcam/user/:id', controllerUser.updateUser)
    .post('/post/chat/fullcam/login', controllerUser.loginUser)
    .post('/post/chat/fullcam/user', controllerUser.setUser)
    .post('/post/chat/fullcam/message', controllerMessage.setMessage)
    .post('/post/chat/fullcam/upload/image', multer(multerImageConfig).single('file'), (req, res) => multerImageConfig.callbackUpload(res))
    .post('/post/chat/fullcam/upload/video', multer(multerVideoConfig).single('video'), (req, res) => multerVideoConfig.callbackUpload(res))

module.exports = router;