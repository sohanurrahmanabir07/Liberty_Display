const multer = require("multer");

const storagePdf = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'pdfUploads/'), // local folder
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const uploadPdf = multer({
    storage: storagePdf,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
}).single('pdf'); // field name in form


module.exports={
    uploadPdf
}