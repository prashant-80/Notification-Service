const { StatusCodes } = require('http-status-codes');
const {TicketRepository} = require('../repositories');
const ticketRepository  = new TicketRepository();
const {MAILER} = require('../config/index');


async function sendEmail(mailFrom,mailTo,subject,text){
    try{
        const response = await MAILER.sendMail({
            from:mailFrom,
            to:mailTo,
            subject:subject,
            text:text
        })
        return response;

    }catch(error){
        console.log(error);
        throw(error);
    }
}


async function createTicket(data){
    try{
        const response  = await ticketRepository.create(data)
        return response;  
    }catch(error){
        console.log(error);
        throw(error)
    }
    
}

async function getpendingEmails(){
    try{
        const response  = await ticketRepository.getpendingTicket();
        return response;

    }catch(error){
        console.log(error);
        throw(error);
    }
}


module.exports={
    sendEmail,
    createTicket,
    getpendingEmails
}