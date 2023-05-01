var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express();

app.use(bodyParser.json())
app.use(express.static('public')) // Static files from public directory
app.use(bodyParser.urlencoded ({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', ()=>console.log("Error While Connecting to Database"))
db.once('open', ()=> console.log("Connected to Database"))

app.post("/sign_up", (req, res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password
    }

    db.collection('users').insertOne(data, (err, collection)=>{
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successully");
    });

    return res.redirect('intro.html');

})

app.get("/", (req, res)=> {
    res.set({
        "ALLow-access-ALLow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);

console.log("Listening on port 3000 !");