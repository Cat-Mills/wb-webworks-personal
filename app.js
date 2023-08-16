import express from 'express'
import nunjucks from 'nunjucks'
import session from 'express-session'

const port = 4545

const app = express()

app.use(express.urlencoded({extended: false})) //Top level middleware. Translates from json object to javascript object.

app.use(session({ //Runs for every request(app.___) that comes in.
    resave: false,
    saveUninitialized: true,
    secret: 'secretsecretigotasecret'
}))

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

//logging in and out
app.get('/',(req,res) => {
    const {email} = req.session
    if(email){ //checks to see if there is an email submitted
        res.render('index.html.njk', {email})
    } else {
        res.render('index.html.njk')
    }
})

app.get('/login',(req,res) => {
    res.render('login.html.njk')
})

app.post('/dashboard', (req,res) => {
    // const email = req.body.email
    const {email} = req.body //destructuring the email property from the req.body object
    req.session.email = email //adds an email property to the session object.
    res.render('dashboard.html.njk') //sends to confirmation dashboard
    
})

app.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err)
        }
        res.redirect('/')
    }) //err callback function will only run if logout doesn't work
})




























app.listen(port,() => console.log(`Running in ${port}.`))