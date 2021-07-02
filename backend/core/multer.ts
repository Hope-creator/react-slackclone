import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    cb(null, "image-" + Date.now() + "." + ext);
  },
});

const upload = multer({ storage: storage });

export default upload;
