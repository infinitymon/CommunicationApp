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
        try {
            let data = await Calls.findAll({ where: { agent: req.query.agent}})
            return this.apiResponse(res, "Records fetched successfully", 200, data)
        } catch (e) {
            return next(new appError(e?.message, 500))
        }
    }
    
    async resolution (req, res, next){
        try{
            const callRec = await Calls.findOne({ where: { id: req.body.id } });

            if (!callRec) {
                return res.status(404).json({ message: 'Call record not found' });
            }

            callRec.resolution = req.body.resolution

            await callRec.save();

            res.status(200).json({message: "resolution updated successfully" , data: callRec})
        }
        catch(e){
            next(e);
        }
    }

    async followUp (req, res, next){
        try{
            const callRec = await Calls.findOne({ where: { id: req.body.id } });

            if (!callRec) {
                return res.status(404).json({ message: 'Call record not found' });
            }

            callRec.followupStatus = req.body.followUp

            await callRec.save();

            res.status(200).json({message: "followup updated successfully" , data: callRec})
        }
        catch(e){
            next(e);
        }
    }

    async recUpload (req, res, next){
        try{
            const callRec = await Calls.findOne({ where: { id: req.body.id } });

            if (!callRec) {
                return res.status(404).json({ message: 'Call record not found' });
            }

            callRec.recording = req.body.recording

            await callRec.save();

            res.status(200).json({message: "followup updated successfully" , data: callRec})
        }
        catch(e){
            next(e);
        }
    }

    async typeUpdate (req, res, next){
        try {
            const callRec = await Calls.findOne({ where: { id: req.body.id } });

            if (!callRec) {
                return res.status(404).json({ message: 'Call record not found' });
            }

            callRec.type = req.body.type

            await callRec.save();


            res.status(200).json({ message: 'Call type updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating call type', error });
        }
    }
}

export default CallController