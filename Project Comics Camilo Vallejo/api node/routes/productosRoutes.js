const express = require('express');
const router = express.Router();
const comicsController = require('../controllers/comicsController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null, './uploads')
    },
    filename: (req,file, callback) =>{
        const ext = file.originalname.split('.').pop()
        callback(null, `${Date.now()}.${ext}`)
    }
})

const upload = multer({storage})



router.get('/comics/listar', comicsController.obtenercomics);
router.post('/comics/crear',  upload.single('imagen'), comicsController.crearcomic);
router.get('/comics/detalle/:id', comicsController.obtenercomicId);
router.put('/comics/actualizar/:id', upload.single('imagen'),  comicsController.updateProduct);
router.delete('/comics/eliminar/:id', comicsController.eliminarcomic);

// Definir el resto de las rutas CRUD aquí

module.exports = router;
