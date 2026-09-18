import nodemailer ,{type TransportOptions} from 'nodemailer'
import "dotenv/config";

// console.log('DEBUG: User Value:', process.env.EMAIL_USER); // Check if this logs undefined or your value
// console.log('DEBUG: Pass Value:', process.env.EMAIL_PASS ? 'Present' : 'Missing'); // Check this too


// const transport=nodemailer.createTransport({
//         host:'smtp-relay.brevo.com',
//         port:Number(process.env.EMAIL_PORT),
//         secure:false,
//         auth:{
//             user:process.env.EMAIL_USER,
//             pass:process.env.EMAIL_PASS,
//         }
//     } as TransportOptions)

//     export async function sendEmail(email:string,content:string,subject:string){
//         const mailOptions={
//             from:`"Spooky Stories" <atifsarwar23@gmail.com>`,
//             to:email,
//             subject:subject,
//             html:content
//         }
//     try {
//         const sendEmail= await transport.sendMail(mailOptions)
//         console.log(`email send `,sendEmail)
//         return sendEmail
//     } catch (error) {
//         if(error instanceof Error){
//         throw new Error(error.message)
//         }
//     }

// }



// api way of sending emails
export async function sendEmail(email: string, content: string, subject: string) {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'api-key': process.env.BREVO_API_KEY as string,
        },
        body: JSON.stringify({
            sender: { name: 'Spooky Stories', email: 'atifsarwar23@gmail.com' },
            to: [{ email }],
            subject: subject,
            htmlContent: content,
        }),
    })

    if (!response.ok) {
        const errorBody = await response.text()
        throw new Error(`Brevo API error: ${response.status} - ${errorBody}`)
    }

    return response.json()
}
