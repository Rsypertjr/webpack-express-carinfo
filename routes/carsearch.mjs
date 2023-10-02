import express from "express";
import {db, conn} from "../db/conn.mjs";
import { ObjectId } from "mongodb";


const router = express.Router();


// This section will help you create a new record.
router.post("/", async (req, res, next ) => {
    //console.log(req);
   

    let db2 = conn.db("carsearches");
    let searches = db.collection("searches");
    if(!searches){
        db.createCollection("searches"); 
        searches = db.collection("searches");
    }   

    // INSERT ONE Car Search
    let newSearch = {
        carsite_url: req.body.carsite_url,
        searchString: req.body.searchString,
        results: req.body.searchItems,
        carSiteLabel: req.body.carSiteLabel,
        carMakeLabel: req.body.carMakeLabel,
        carModelLabel:req.body.carModelLabel,
        yearLabel: req.body.yearLabel,
        location: req.body.location
    };
   
    
    console.log("New Search: ", newSearch);
  
    let existing = await searches.find({}).toArray();
    let already = existing.filter((item) =>  { return item.searchString === req.body.searchString });
    

    if(already.length === 0){
        
            let result = await searches.insertOne(newSearch).then((result) =>  res.send(result).status(204)).catch(next);
           
       // } catch (e) {
       //     res.status(400).send("Car record Insert Didn't work!");
       // }
    }
    else if(already.length > 0)
        res.send({message: "Record Already Exists!",record: already}).status(204);
    else;
        
   
});

router.get("/", async (req, res ) => {
    //console.log(req);
   

    let db2 = conn.db("carsearches");
    let searches = db.collection("searches");
    if(!searches){
        db.createCollection("searches"); 
        searches = db.collection("searches");
    }   

    try {
        let results = await searches.find({}).toArray();   
        res.send(results).status(204);
    }catch(e){
        res.status(400).send("Get All Car Records failed!");
    }
});

router.use((err, req, res, next) => {
    // handle error in this middleware
});

export default router;
