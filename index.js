const express = require("express")
const db = require("./db/database")
const path = require("path")
const morgan = require("morgan")
const expressLayouts = require('express-ejs-layouts')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const { port, access_secret } = require("./config")

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

// Passport auth
const passportOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: access_secret
}

passport.use(
  new JwtStrategy(passportOptions, async (jwtPayload, done) => {
    console.log(jwtPayload)
    console.log(passport)
    try {
      db.oneOrNone("SELECT * FROM users WHERE id = $1", jwtPayload.sub)
      .then((user) => {
        if (user == null) throw new Error('Email or password invalid')
        return done(null, user)
      }).catch((err) => {
        console.log(err)
        // TODO: error catching
      }) 
    } catch (error) {
      console.error(error)
      return done(error, false)
    }
  })
)

app.use(passport.initialize())


// Use routers
app.use("/signup", signupRouter)
app.use("/login", loginRouter)
app.use("/", homeRouter)




app.listen(port, () =>
  console.log(`Server is listening on http://localhost:${port}\n`)
)
