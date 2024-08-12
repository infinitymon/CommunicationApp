class AdminController{
    constructor() {
        super();
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
        // Configure Multer storage
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
            cb(null, 'uploads/'); // Ensure this directory exists or handle the creation
            },
            filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
            }
        });

        // Initialize Multer with the defined storage
        const upload = multer({ storage: storage });
        const file = req.file;

        console.log(req.body, "This is file" , req.file);
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        // Verify file extension
        const fileExtension = path.extname(file.originalname);
        if (fileExtension !== '.xlsx') {
            return res.status(400).send('Invalid file type. Please upload an .xlsx file.');
        }

        const filePath = file.path;
        console.log(fileExtension, filePath, file.originalname);

        // Process the file with ExcelJS or any further logic here
        res.status(200).json({ message: 'File uploaded successfully!', file: file.originalname });
    }

}

export default AdminController;