const multer = require("multer");
const { cloudinary } = require("../Cloudinary/cloudinary");
const { Logo } = require("../Model/logo");
const { Supports } = require("../Model/support");
const fs = require('fs');
const { Banners } = require("../Model/Banners");
const uploadImage = async (files) => {

    const imageUrl = [];


    for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrl.push(result.secure_url);
    }
    return imageUrl



}


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


const UploadPdf = async (req, res) => {
    uploadPdf(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const filePath = req.file.path;

        try {
            const result = await cloudinary.uploader.upload(filePath, {
                resource_type: 'auto', // required for non-image uploads
                public_id: `pdfs/${Date.now()}-${req.file.originalname}`,
                access_mode: 'public'
            });

            // Clean up local file
            fs.unlinkSync(filePath);

            // Save to DB (modify fields as needed)
            return result.secure_url
        } catch (uploadErr) {
            fs.unlinkSync(filePath);
            res.status(500).json({ error: uploadErr.message });
        }
    });
};








const addCountry = async (req, res) => {


    try {
        const { name } = req.body
        const files = req.files
        const imageUrl = await uploadImage(files)


        const newLogo = new Logo({ name, imageUrl })
        const result = newLogo.save()

        if (result) {
            return res.send({
                message: 'Logo Updated Successfully',
                data: imageUrl
            })
        }

        return res.status(401).send({
            message: 'Logo Upload Failed'
        })

    } catch (error) {
        return res.send({
            message: error.message
        })
    }
}








const uploadLogo = async (req, res) => {


    try {
        const { name } = req.body
        const files = req.files
        const imageUrl = await uploadImage(files)


        const newLogo = new Logo({ name, imageUrl })
        const result = newLogo.save()

        if (result) {
            return res.send({
                message: 'Logo Updated Successfully',
                data: imageUrl
            })
        }

        return res.status(401).send({
            message: 'Logo Upload Failed'
        })

    } catch (error) {
        return res.send({
            message: error.message
        })
    }
}



const dashboardBanners = async (req, res) => {


    try {
        const banners = await Banners.find({}).sort({createdAt:-1,region:1})
        if (banners) {
            res.send({
                data: banners,
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }

}

const getQueries = async (req, res) => {
    try {
        const result = await Supports.find({}).sort({ createdAt: -1 }).lean()
        if (result) {
            res.send({

                data: result
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }

}

module.exports = {
    uploadLogo, getQueries, UploadPdf,dashboardBanners
}