const multer = require('multer');
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, '../uploads/'));
    },
    filename: function (req, file, callback) {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        callback(null, uniqueName);
    },
});

// File filter to allow only images
const fileFilter = (req, file, callback) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        callback(null, true);
    } else {
        callback(new Error('Only image files (png, jpg, jpeg, gif) are allowed'));
    }
};

// Multer upload instance for single image
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
