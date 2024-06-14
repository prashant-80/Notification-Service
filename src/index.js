const express = require('express');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const mailsender = require('./config/email-config')
const app = express();
const amqplib = require('amqplib');
const { EmailService } = require('./services')

async function connectQueue(){
    try{
        const  connection = await amqplib.connect("amqp://localhost")
        const channel = await connection.createChannel();
        await channel.assertQueue("noti-queue")

        channel.consume("noti-queue", async (data) => {
            console.log(`${Buffer.from(data.content)}`);
            const object = JSON.parse(`${Buffer.from(data.content)}`);
            // const object = JSON.parse(Buffer.from(data).toString());
            await EmailService.sendEmail("svkmexam17@gmail.com", object.recepientEmail, object.subject, object.text);
            channel.ack(data);
        })
    }catch(error){
        console.log(error);
        throw(error);
    }
}

app.use(express.json());   //help to parse the incoming request body 
app.use(express.urlencoded({extended:true}));  

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT,  async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    await connectQueue()
    console.log('queue is up');
});
