const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const formidable = require('formidable');
const multer = require("multer");
const fs = require("fs");

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const multipart = require('connect-multiparty');
const cloudinary = require('cloudinary');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const multipartMiddleware = multipart();

const upload = multer({
  dest: "./public/uploads/temp"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

cloudinary.config({ 
    cloud_name: 'camberry', 
    api_key:  process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


// Start of Helper pages
app.get('/cart.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'cart.html'));
});
app.get('/chat.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'chat.html'));
});
app.get('/checkout.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'checkout.html'));
});
app.get('/contact.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});
app.get('/edit-profile.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'edit-profile.html'));
});
app.get('/index.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/login.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
app.get('/notification.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'notification.html'));
});
app.get('/order.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'order.html'));
});
app.get('/profile.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'profile.html'));
});
app.get('/register.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});
app.get('/search.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'search.html'));
});
app.get('/shop-list.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'shop-list.html'));
});
app.get('/shop-product.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'shop-product.html'));
});
app.get('/shop.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'shop.html'));
});
app.get('/success.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'success.html'));
});
app.get('/wishlist.html', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'wishlist.html'));
});

// app.post('/upload', multipartMiddleware, function(req, res) {



//   var form = new formidable.IncomingForm();
//   form.parse(req, function (err, fields, files) {
//     console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
//     console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
//     console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
//     console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
//     res.write('File uploaded');
//     res.end();
//   });




//   if (undefined === req.my_hidden){
//     console.log("No files submitted");
//     // res.json({response_body_text: "No files submitted"});

//     res.redirect('/shop-product.html');  //TODO: redirect to failed scan page
//   }  
//   else if (undefined === req.files.image || undefined === req.files.image.path){
//       console.log("No image submitted");
//       res.redirect('/shop-product.html');
//       // res.json({response_body_text: "No image submitted"});
//   }
//   else {
//     console.log("VALIO!!!");
//     res.redirect('/');
//       // cloudinary.v2.uploader.upload( "C:\\Users\\mulev\\Documents\\Business\\GO_parking\\BMW_car.jpeg",//req.files.image.path,
//       //     {
//       //     ocr: "adv_ocr"
//       //     }, function(error, result) {
//       //         if( result.info.ocr.adv_ocr.status === "complete" ) {
//       //         res.json(result); // result.info.ocr.adv_ocr.data[0].textAnnotations[0].description (more specific)
//       //         }
//       //     });
//   }
// });

app.post(
  "/upload",
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    if(undefined === req.file){
      console.log("NO FILE ATTACHED");
      res.redirect('/shop-product.html');
    }

    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./public/uploads/image1.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);


        console.log("targetPath: ", targetPath);






        // TODO: go to the API
        cloudinary.v2.uploader.upload( targetPath,//req.files.image.path,
        {
        ocr: "adv_ocr"
        }, function(error, result) {
            if( result.info.ocr.adv_ocr.status === "complete" ) {


              //const html = '<h1>PLATE NUMBERS:' + result.info.ocr.adv_ocr.data[0].textAnnotations[0].description + '</h1>';
              const html = 
              '<!DOCTYPE html><html><head><style>h1 {text-align: center;}p {text-align: center;}div {text-align: center;}</style></head><body><h1>PLATE NUMBERS:' + result.info.ocr.adv_ocr.data[0].textAnnotations[0].description + '</h1>   <h1><a href="shop-product.html">SCAN Again</a></h1> </body></html>';

              res.send(html);


                // res
                //   .status(200)
                //   .contentType("text/plain")
                //   .end("<h1>PLATE NUMBERS:" + result.info.ocr.adv_ocr.data[0].textAnnotations[0].description + "</h1>");
            //res.json(result); // result.info.ocr.adv_ocr.data[0].textAnnotations[0].description (more specific)
            }
        });






        // res
        //   .status(200)
        //   .contentType("text/plain")
        //   .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);



app.get('/', (req, res, next) => {
    console.log('Serving a home page from: ' + path.join(__dirname, 'views', 'index.html'));
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
  
app.use((req, res, next) => {
  console.log('Page not found!');
  console.log('req.originalUrl: ' + req.originalUrl);
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})