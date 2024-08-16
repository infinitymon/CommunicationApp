import path from 'path'
import ExcelJS from 'exceljs';
import Call from '../models/Calls.js';

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

        // Create a new ExcelJS workbook
        const workbook = new ExcelJS.Workbook();

        try {
            // Read the uploaded Excel file
            await workbook.xlsx.readFile(filePath);
            const worksheet = workbook.getWorksheet(1); // Read the first worksheet
            // Get all sheets
            const sheets = workbook.worksheets;;

            // Array to hold the rows to be inserted into the database
            const rowsData = [];

            worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                if(rowNumber === 1) return;
                // Process each row
                const rowData = {
                    type: 'Pending',
                    from: row.getCell(4).value,
                    to: '',
                    createdDate: new Date(),
                    followupStatus: '',
                    resolution: '',
                    agent: row.getCell(1).value?.toLowerCase(),
                };
                console.log(rowNumber, row.getCell(1).value, row.getCell(4).value, rowsData.length);
    
                rowsData.push(rowData);
            });

            // Process rows data in chunks
            const chunkSize = 100;
            for (let i = 0; i < rowsData.length; i += chunkSize) {
                const chunk = rowsData.slice(i, i + chunkSize);
                await Call.bulkCreate(chunk);
            }


            // Insert the rowsData array into your database here
            // For example, using an ORM or direct database query

            res.status(200).json({ message: 'File uploaded and processed successfully!', data: rowsData });
        } catch (err) {
            console.error('Error reading Excel file:', err);
            res.status(500).send('Error processing the file.');
        }
    }

}

export default AdminController;