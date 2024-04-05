
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_PASS,
  },
  tls: {
    rejectUnauthorized: false, 
  },
});


transporter.verify().then(()=>{ 
    console.log("Listo para envio de correo");
}).catch((error)=> {console.log("error en envi",error)}
);


export const sendEmail=(to: string, subject: string, html: string)=>{
    transporter.sendMail({from:process.env.USER_EMAIL,to,subject,html},(error: any,info:any)=>{
        if(error)
        {
            console.log("NO se puede enviar correo",error);
        }
        else{
            console.log("Correo enviado");
            console.log(info.accepted);
        }
    })
}

