const nodemailer = require("nodemailer")

const sendEmail = async ({to,subject,html})=>{
    if(!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD){
        throw new Error("Mailtrap Requiremnets are not fullfilled")
    }

    const host = process.env.SMTP_HOST
    const port = process.env.SMTP_PORT
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASSWORD
    const from = process.env.SMTP_EMAIL_FROM


    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: false,
        auth:{
            user,
            pass
        }
    })
    // console.log(transporter)

    

    const email = await transporter.sendMail({
        from,
        to,
        subject,
        html
    })
    // if(!email)
    //     throw new Error("Email not sent")
    console.log("Email sent successfully");
    
}

module.exports = sendEmail