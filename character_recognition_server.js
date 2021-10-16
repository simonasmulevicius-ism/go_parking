const express = require('express');
const app = express();
const multipart = require('connect-multiparty');
const cloudinary = require('cloudinary');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

const multipartMiddleware = multipart();

cloudinary.config({ 
    cloud_name: 'camberry', 
    api_key:  process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

// cloudinary.v2.uploader.upload( "C:\\Users\\mulev\\Documents\\Business\\GO_parking\\BMW_car.jpeg",//req.files.image.path,
//     {
//     ocr: "adv_ocr"
//     }, function(error, result) {


//         if( result.info.ocr.adv_ocr.status === "complete" ) {
//             console.log(result);
//             console.log(result.info.ocr.adv_ocr.data[0].textAnnotations[0].description);
            
//         //res.json(result); // result.info.ocr.adv_ocr.data[0].textAnnotations[0].description (more specific)
//         }
//     });

app.post('/upload', multipartMiddleware, function(req, res) {
    console.log("req:", req);

    if (undefined === req.files.image || undefined === req.files.image.path){
        console.log("No image submitted");
        res.json({response_body_text: "No image submitted"});
    }
    else {
        cloudinary.v2.uploader.upload( "C:\\Users\\mulev\\Documents\\Business\\GO_parking\\BMW_car.jpeg",//req.files.image.path,
            {
            ocr: "adv_ocr"
            }, function(error, result) {
                if( result.info.ocr.adv_ocr.status === "complete" ) {
                res.json(result); // result.info.ocr.adv_ocr.data[0].textAnnotations[0].description (more specific)
                }
            });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})