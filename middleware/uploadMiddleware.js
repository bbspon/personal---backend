// const multer = require("multer");
// const path = require("path");

// // Storage config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const folder = file.mimetype.startsWith("video")
//       ? "uploads/videos"
//       : "uploads/images";
//     cb(null, folder);
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}-${file.fieldname}${ext}`);
//   },
// });

// // File filter
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|webp|mp4|mov|avi/;
//   const extname = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimetype = allowedTypes.test(file.mimetype);
//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images or videos are allowed"));
//   }
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;


const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "uploads/misc";

    if (file.mimetype.startsWith("image")) {
      folder = "uploads/images";
    } else if (file.mimetype.startsWith("video")) {
      folder = "uploads/videos";
    } else if (file.mimetype === "application/pdf" || file.mimetype === "application/msword" || file.mimetype.includes("presentation") || file.mimetype.includes("officedocument")) {
      folder = "uploads/documents";
    }

    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|mp4|mov|avi|pdf|doc|docx|ppt|pptx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image, video, or document files are allowed"));
  }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;
