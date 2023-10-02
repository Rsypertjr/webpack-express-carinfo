import express from "express";
import {db, conn} from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records
router.get("/", async (req, res) => {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

//This section will help you get a single record by id
router.get("/:id", async (req, res) => {
    let collection = await db.collection("records");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

if (!result) res.send("Not found").status(404);
else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res ) => {
    let newDocument = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };
    let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});


// This section will help you create a new record.
router.post("/carsearch", async (req, res ) => {
    console.log(req);
    let newDocument = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };

    let db2 = conn.db("carsearches");
    let searches = db.collection("searches");
    if(!searches){
        db.createCollection("searches"); 
        searches = db.collection("searches");
    }   

    // INSERT ONE Car Search
    let newSearch = {
        searchString: req.body.searchString,
        results: req.body.results
    };
  
    let existing = await searches.find({}).toArray();
    let check = existing.find((item) => item.searchString === req.searchString);


    if(!check){
        let result = await searches.insertOne(newSearch);
        res.send(result).status(204);
    }
    else
        res.send("Error").status(500);
   
});

// This section will help yu update a record by id. 
router.patch("/:id", async (req, res) => {
    const query = {_id: new ObjectId(req.params.id) };
    const updates = {
        $set: {
            name: req.body.name,
            position: req.body.postion,
            level: req.body.level
        }
    }

    let collection = await db.collection("records");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});

// This section will help you delete a record 
router.delete("/:id", async (req, res) => {
    const query = {_id: new ObjectId(req.params.id) };

    const collection = db.collection("records");
    let result = await collection .deleteOne(query);

    res.send(result).status(200);
})

export default router;
