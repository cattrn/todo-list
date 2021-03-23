const nodemailer = require("nodemailer")
const nodemailerSendgrid = require("nodemailer-sendgrid")
const { sendgrid_api_key } = require("./config.js")

const emailConfirmation = (newUser, confirmationHash) => {

  const transport = nodemailer.createTransport(
    nodemailerSendgrid({ apiKey: sendgrid_api_key, })
  )

  let url
  if (process.env.SSL) {
    url = `https://immense-forest-31861.herokuapp.com`
  } else {
    url = `http://localhost:${process.env.PORT}`
  }

  const emailHTML = `
  <h2>Thank you for signing up for Todoli</h2>
  <p>To verify your account, please click on the link below.</p>
  <p><a href="${url}/email/${confirmationHash}">${url}/email/${confirmationHash}</a></p>
  <p>This link will expire in 48 hours.</p>
  <p><a href="${url}/signup/resend?email=${newUser.email}">Resend Link</a></p>
  `

  transport.sendMail({
    from: '"Todoli" <caterina.turnbull@gmail.com>',
    to: newUser.email,
    subject: "Todoli Signup Confirmation",
    text: `Thank you for signing up with Todoli. To verify your account, please use the following link. ${url}/email/${confirmationHash}`,
    html: emailHTML,
  }, function (err) {
    if (err) {
      console.log(err)
      return res.render("pages/error", {
        err: { message: err }
      })
    }
  })
  
}

module.exports = {
  emailConfirmation
}