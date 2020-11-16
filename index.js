
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nimyg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: false }));

client.connect((err) => {
  const houseCollection = client.db(process.env.DB_NAME).collection("houseCollection");
  const  userCollection = client.db(process.env.DB_NAME).collection("userCollection");
  const bookingCollection = client.db(process.env.DB_NAME).collection("bookingCollection");
  const houseRentCollection = client.db(process.env.DB_NAME).collection("houseRentCollection");
  console.log("hello");

  app.get("/getHouse", (req, res) => {
    houseCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

 
  app.get("/getHouse/:email", (req, res) => {
    const email = req.params.email;
    console.log({ email });
    orders.find({ email: email }).toArray((err, documents) => {
      console.log(documents);
      res.send(documents);
    });
  });

  app.post("/addHouse", (req, res) => {
    console.log(req.body);
    console.log(req.files);
    const file = req.files.file;
    const name = req.body.name;
    const email = req.body.email;
    const project = req.body.project;
    const detail = req.body.detail;
    const price = req.body.price;
    const newImg = file.data;
    const orderStatus = req.body.orderStatus;
    const encImg = newImg.toString("base64");

    var image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(encImg, "base64"),
    };

    orders
      .insertOne({ name, email, image, project, detail, price, orderStatus })
      .then((result) => {
        console.log("added to server");
        res.send(result.insertedCount > 0);
      });
  });


 
}
);

app.listen(port);