const multer = require('multer');
const path = require('path');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'frontend', 'public', 'upload', 'images'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'frontend', 'public', 'upload', 'images'));
        },
        filename: (req, file, cb) => {
            const filename = file.originalname.toString();
            cb(null, filename);
        },
    }),
    limits: {
        fileSize: 2 * 2048 * 2048,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            'image/pjpeg',
            'image/png',
            'image/gif',
            'image/webp',
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    },

    callbackUpload: (response) => {
        return response.status(200).send({ success: 'upload file image' });
    }
}