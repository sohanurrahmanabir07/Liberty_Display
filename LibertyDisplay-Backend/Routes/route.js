

const express = require('express')
const { getProducts, addProduct, uploadVideo, deleteProduct, getCategories, addCategory, deleteCategory, updateProduct, updateCategory, downloadPdfFiles, getLogo, pdfUpload, uploadBanner, getBanners, deleteBanner, AddBlog, getBlogs, deleteBlog, addService, getServices, updateService, deleteService, businessProducts, addCertificate, deleteCertificate, getCertificate, addCountry, getCountry, deleteCountry } = require('../Controller/Controller')
const { register, login } = require('../Controller/AuthController')
const router = express.Router()
const multer = require('multer')
const { uploadLogo, getQueries, UploadPdf, dashboardBanners } = require('../Controller/AdminController')
const { cloudinary } = require('../Cloudinary/cloudinary')
const { extractPublicId } = require('cloudinary-build-url')
const { checkCache } = require('../Middleware/Middleware')

const upload = multer({ dest: 'uploads/' })

// __________Api testing Route______________
router.get('/', (req, res) => {
    res.send('The Server Is Working')
})

// ====== GET Routes ======
router.get('/getProducts', getProducts)
router.get('/getCategories', getCategories)
router.get('/getCertificate', getCertificate)
router.get('/getLogo', getLogo)
router.get('/getCountry', getCountry)
router.get('/getBanners', getBanners)
router.get('/dashboardBanners', dashboardBanners)
router.get('/getBlogs', getBlogs)
router.get('/download/:fileId', downloadPdfFiles)
router.get('/getQueries', getQueries)
router.get('/getServices', getServices)
router.get('/getBusinessProducts', businessProducts)

// ====== POST Routes ====== 
router.post('/register', register)
router.post('/login', login)
router.post('/addProduct', upload.any(), addProduct)
router.post('/addCategory', upload.fields([
    { name: 'image' },
    { name: 'bannerImage' }
]), addCategory)
router.post('/addCertificate', upload.fields([
    { name: 'image' },
]), addCertificate)
router.post('/addBlog', upload.fields([
    { name: 'images' }
]), AddBlog)

router.post('/addVideo', upload.fields([
    { name: 'video' }
]), uploadVideo)


router.post('/uploadBanner', upload.array('images', 10), uploadBanner)
router.post('/logoUpload', upload.array('images', 5), uploadLogo)
router.post('/upload-pdf', UploadPdf)
router.post('/pdf', upload.single('pdf'), pdfUpload)
router.post('/addService', addService)
router.post('/addCountry', upload.array('images'), addCountry)
// ====== PUT Routes ======
router.put('/updateProduct/:id', upload.any(), updateProduct)
router.put('/updateService/:id', updateService)
router.put('/updateCategory/:id', upload.fields([
    { name: 'image' },
    { name: 'bannerImage' }
]), updateCategory)

// ====== DELETE Routes ======
router.delete('/deleteProduct', deleteProduct)
router.delete('/deleteCategory', deleteCategory)
router.delete('/deleteBanner', deleteBanner)
router.delete('/deleteBlog', deleteBlog)
router.delete('/deleteCountry', deleteCountry)
router.delete('/deleteService', deleteService)
router.delete('/deleteCertificate', deleteCertificate)

router.post('/del', async (req, res) => {
    try {







        cloudinary.uploader.destroy('vutxydvmew4iwzbvvdfx')
            .then((result) => res.send(result))
            .catch((err) => console.log('Error', err))


    } catch (error) {
        return res.send(error.message)
    }

})

module.exports = {
    router
}