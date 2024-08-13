import multer from "multer";
import path from 'path'

class AdminController{
    constructor() {
    }

    async index(req, res) {
        try {
            const data = await this.model.getAll();
            res.render('admin/index', { data });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async upload(req, res) {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        // Verify file extension
        const fileExtension = path.extname(file.originalname);
        if (fileExtension !== '.xlsx') {
            return res.status(400).send('Invalid file type. Please upload an .xlsx file.');
        }

        const filePath = file.path;

        // Process the file with ExcelJS or any further logic here
        res.status(200).json({ message: 'File uploaded successfully!', file: file.originalname });
    }

}

export default AdminController;