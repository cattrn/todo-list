const express = require("express")
const db = require("./db/database")
const path = require("path")
const morgan = require("morgan")
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const { redirectToLogin, redirectToHome } = require('./redirectMiddleware')

const { port } = require("./config")

// Require routes
const homeRouter = require("./routes/home.js")
const allTasksRouter = require("./routes/allTasks.js")
const addTaskRouter = require("./routes/addTask.js")
const editTaskRouter = require("./routes/editTask.js")
const settingsRouter = require("./routes/settings.js")
const signupRouter = require("./routes/signup.js")
const loginRouter = require("./routes/login.js")
const logoutRouter = require("./routes/logout.js")
const emailRouter = require("./routes/email.js")
const apiRouter = require("./routes/api.js")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/static", express.static(path.join(__dirname, "public")))
app.use(morgan("dev"))

app.use(expressLayouts)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')


// Configure session middleware
const IN_PROD = process.env.NODE_ENV === 'production'

app.use(session({
    secret: "15192174f3cf78acd0a397d744ddadde8934aded16de78eecd824fb818838d0af9bd6700b8b672fff59fe33baeb1c9e38291f44660868dd06e7499d2",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour
      secure: IN_PROD
    }
  })
)


// Use routers
app.use("/signup", redirectToHome, signupRouter)
app.use("/login", redirectToHome, loginRouter)
app.use("/logout", redirectToLogin, logoutRouter)
app.use("/email", emailRouter)
app.use("/api", redirectToLogin, apiRouter)
app.use("/alltasks", redirectToLogin, allTasksRouter)
app.use("/addtask", redirectToLogin, addTaskRouter)
app.use("/editask", redirectToLogin, editTaskRouter)
app.use("/settings", redirectToLogin, settingsRouter)
app.use("/", redirectToLogin, homeRouter)




app.listen(port, () =>
  console.log(`Server is listening on http://localhost:${port}\n`)
)
