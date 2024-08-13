import Calls from '../models/Calls.js';
import appError from "../utils/AppError.js";

class CallController{
    constructor(){
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
        console.log(req.query, req.query.agent)
        try {
            let data = await Calls.findAll({ where: { agent: req.query.agent}})
            return this.apiResponse(res, "Records fetched successfully", 200, data)
        } catch (e) {
            return next(new appError(e?.message, 500))
        }
    }  
}

export default CallController