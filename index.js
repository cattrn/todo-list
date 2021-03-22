const express = require("express")
const path = require("path")
const morgan = require("morgan")
const expressLayouts = require('express-ejs-layouts')

const { port } = require("./config")

// Require routes
const homeRouter = require("./routes/home.js")
const signupRouter = require("./routes/signup.js")
const loginRouter = require("./routes/login.js")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/static", express.static(path.join(__dirname, "public")))
app.use(morgan("dev"))

app.use(expressLayouts)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')


// Use routers
app.use("/", homeRouter)
app.use("/signup", signupRouter)
app.use("/login", loginRouter)




app.listen(port, () =>
  console.log(`Server is listening on http://localhost:${port}\n`)
)
