const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = 5000;

//MiddleWare
app.use(cors());
app.use(express.json());
//Db connection Url
const uri =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("student");
    const userCollection = database.collection("user");
    //Get request
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const user = await userCollection.findOne(query);
      console.log("Load user with id", id);
      res.send(user);
    });
    //Post Data
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      console.log("Requested body =", req.body);
      console.log("Result = ", result);
      res.json(result);
    });
    //Update
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const updateUser = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updateUser.name,
          email: updateUser.email,
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      console.log("Updating user", req);
      res.json(result);
    });
    //Delete Api
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      console.log("deleting id", result);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running my express server");
});
app.listen(port, () => {
  console.log("Server is running on port :", port);
});
