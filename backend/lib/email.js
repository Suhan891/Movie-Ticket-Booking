const nodemailer = require("nodemailer")

const sendEmail = async ({to,subject,html})=>{
    if(!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD){
        return res.status(500).json({
            success: false,
            message: "MailTrap Requirements are not fulfilled"
        })
    }

    const host = process.env.SMTP_HOST
    const port = process.env.PORT
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASSWORD
    const from = process.env.SMTP_EMAIL_FROM


    const transporter = nodemailer.create({
        host,
        port,
        secure: false,
        auth:{
            user,
            pass
        }
    })

    await transporter.sendEmail({
        from,
        to,
        subject,
        html
    })
}

module.exports = sendEmail