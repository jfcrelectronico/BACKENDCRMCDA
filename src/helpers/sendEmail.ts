
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_PASS,
  },
});


transporter.verify().then(()=>{ 
    console.log("Listo para envio de correo");
}).catch((error)=> {console.log("error en envio")}
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

