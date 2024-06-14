const { StatusCodes } = require('http-status-codes');
const {EmailService} = require('../services');

async function create(req,res){
    try{
            const response  = await EmailService.createTicket({
                subject:req.body.subject,
                content:req.body.content,
                recepientEmail:req.body.recepientEmail
            })
            return res
                    .status(StatusCodes.OK)
                    .json(response)
    }catch(error){
        console.log(error);
        throw(error)
    }
}


module.exports={
    create
}