const multer = require('multer');
const path = require('path');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'frontend', 'public', 'upload', 'videos'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'frontend', 'public', 'upload', 'videos'));
        },
        filename: (req, file, cb) => {
            const filename = file.originalname.toString();
            cb(null, filename);
        },
    }),
    limits: {
        fileSize: 5 * 10048 * 10048,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'video/mp4',
            'video/mov',
            'video/avi',
            'video/mkv',
            'video/avc',
            'video/h.264',
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    },

    callbackUpload: (response) => {
        return response.status(200).send({ success: 'upload file video' });
    }
}