import multer from "multer";
import path from "path";

// Storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/book-covers"); // save files here
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `book_${Date.now()}${ext}`); // unique name
    },
});

// File filter to images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPEG, JPG, and PNG images are allowed"), false);
    }
};

export const uploadBookCover = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // max 2MB
}).single("cover"); // expecting field name "cover"
