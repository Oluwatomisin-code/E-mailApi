const express = require('express')
const nodemailer = require('nodemailer')
const { emailTemp } = require('./emailTemp')
const multer = require("multer")
const cors = require("cors")

// initiate express app
const app = express();


//express bodyparser
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//cors for all route
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE,OPTIONS");
    next();
});


app.get("/", (req, res) => {
    res.json("The speedfixer backend")
})
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage });
app.post('/api/sendMail', upload.single("img"), (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.file)
    let data = req.body;
    let file = req.file;
    let attach = '/uploads/' + file.filename;
    console.log(attach)

    let transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: '587',
        secure: false,
        auth: {
            user: 'support@thespeedfixer.com',
            pass: 'Thespeedfixermail@20',
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let mailOptions = {
        from: '"Thespeedfixer" <support@thespeedfixer.com>',
        to: 'thespeedfixer@gmail.com',
        subject: 'A Speedfix Request',
        text: 'testing one two',
        html: emailTemp(data),
        attachments: [{
            // filename: '${file.filename}',
            path: __dirname + attach,
        }]
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json("your request was not sent successfully, please retry")


        } else {
            console.log('msg sent: %s', info);
            res.status(201).json("Your request was sent successsfully, You will be contacted via your email")
        }

    })
})

let port = process.env.PORT || 5000

app.listen(port, () => console.log('now listening on port 5000'))