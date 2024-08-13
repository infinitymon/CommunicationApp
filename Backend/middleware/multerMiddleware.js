import multer from 'multer'
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = './uploads';

        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        // Delete all files in the directory before uploading the new one
        fs.readdir(uploadPath, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(uploadPath, file), err => {
                    if (err) throw err;
                });
            }
        });

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        console.log(file.originalname, "dskdjl")
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({storage})

export default upload