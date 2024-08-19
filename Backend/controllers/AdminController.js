import path from 'path'
import ExcelJS from 'exceljs';
import Calls from '../models/Calls.js';
import appError from "../utils/AppError.js";

class AdminController{
    constructor() {
        this.index = this.index.bind(this)
    }

    apiResponse(res, message, statusCode, data = {}, token = undefined){
        res.status(statusCode).json({
            message,
            success: true,
            data,
            token
        })
    } 

    async index (req, res, next){
        try {
            let data = await Calls.findAll()
            return this.apiResponse(res, "Records fetched successfully", 200, data)
        } catch (e) {
            return next(new appError(e?.message, 500))
        }
    }

    async index (req, res, next){
        try {
            // Extracting page and limit from query parameters, setting defaults
            const page = parseInt(req.query.page, 10) || 1;
            const limit = 100;
            
            // Calculating offset based on current page and limit
            const offset = (page - 1) * limit;
            
            // Fetching data with limit and offset for pagination
            const callRecords = await Calls.findAll({
                limit: limit,
                offset: offset
            });
    
            // Optionally, you can also fetch the total number of records
            const totalRecords = await Calls.count();
    
            // Returning paginated response
            return this.apiResponse(res, "Records fetched successfully", 200, {
                callRecords,                    // <-- This is now directly under res.data
                totalRecords: totalRecords,
                totalPages: Math.ceil(totalRecords / limit),
                currentPage: page,
                pageSize: limit
            });
        } catch (e) {
            return next(new appError(e?.message, 500));
        }
    }

    async upload(req, res) {
        console.log(req.file)
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
                    from: '',
                    to: row.getCell(4).value,
                    createdDate: new Date(),
                    followupStatus: '',
                    resolution: '',
                    agent: row.getCell(1).value?.toLowerCase(),
                };
    
                rowsData.push(rowData);
            });

            // Process rows data in chunks
            const chunkSize = 100;
            for (let i = 0; i < rowsData.length; i += chunkSize) {
                const chunk = rowsData.slice(i, i + chunkSize);
                await Calls.bulkCreate(chunk);
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