import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res, next) => {
    const userInfo = req.body

    User.findOne({
        where : {
        email: userInfo.email}
    })

        .then(dbUser => {
            if (!dbUser) {
                return res.json({
                    message: "Invalid Email or Password"
                })
            }
            bcrypt.compare(userInfo.password, dbUser.dataValues.password)
                .then(correct => {
                    if (correct) {
                        const payload = {
                            id: dbUser.dataValues.id,
                            email: dbUser.dataValues.email,
                            role: dbUser.dataValues.role
                        }
                        var token = jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            {
                                expiresIn: 86400
                            })
                        res.json({
                            message: "Success",
                            token: `${token}`
                        })
                    }
                    else {
                        return res.json({
                            message: "Invalid Username or Password"
                        })
                    }
                })
                .catch(next)
        })
})

router.post('/register', async (req, res, next) => {
    const userPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        first_name: req.body.first_name.toLowerCase(),
        last_name: req.body.last_name.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: userPassword,
    });

    //res.set('Content-Type', 'application/json');

    user.save()
        .then(results => {
            res.send({
                data: {
                    _id: results._id,
                    first_name: results.first_name,
                    last_name: results.last_name,
                    email: results.email,
                    role: results.role
                }
            })
        })
        .catch((err) => {
            console.log(err)
            res.send({
                error: err
            })
        })

}
)

export default router