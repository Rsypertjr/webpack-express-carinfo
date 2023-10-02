import express from "express";
import {db,conn} from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records
router.get("/", async (req, res) => {
    //let collection = await db.collection("records");
    //let results = await collection.find({"position":"manager"}).toArray();

    //let results = await collection.find( { level:"Intern" } ).toArray();
    
 /*
    let db2 = conn.db("test");
    let posts = db.collection("posts");
    if(!posts){
        db.createCollection("posts"); 
        posts = db.collection("posts");
    }

   

    // INSERT ONE
    await posts.insertOne({"title": "Post 1"});
    //let results = await posts.find({}).toArray();

    await posts.insertOne({
        title: "Post Title 1",
        body: "Body of post.",
        category: "News",
        likes: 1,
        tags: ["news", "events"],
        date: Date()   
    });

    let results = await posts.find({}).toArray();

   
  
    // INSERT MANY
    await posts.insertMany([
        {
            title: "Post Title 2",
            body: "Body of Post.",
            category: "Event",
            likes: 2,
            tags: ["news", "events"],
            date: Date()
        },
        {
            title: "Post Title 3",
            body: "Body of post.",
            category: "Technology", 
            likes: 3,
            tags: ["news", "events"],
            date: Date()
        },
        {
             title: "Post Title 4",
             body: "Body of post.",
             category: "Event",
             likes: 4,
             tags: ["news", "events"],
             date: Date()
        }
    ]);
 

    
    let results = await posts.find().toArray();
   
    // FIND
    let results = await posts.find({ category: "Technology"}).toArray();

    

    // Projection
    let results = await posts.find({ category: "Technology"}).project({ title: 1, date: 1}).toArray();

   

    // Note: You cannot use both 0 and 1 in the same object. The only exception is the _id field. You should either specify the fields you would like to include or the fields you would like to exclude.
    let results = await posts.find({}).project({ _id: 0, title: 1, date: 1}).toArray();
   

    // Exclude a category field
    // We will get an error if we try to specify both 0 and 1 in the same object.
    let results = await posts.find({}).project({category: 0}).toArray();
    
    // Update on 1 or the first
    await posts.updateOne({ title: "Post Title 1"},{ $set: {likes: 150 }});
   
    // Update Many
    // await posts.updateMany({ title: "Post Title 1"},{ $set: {likes: 150 }});
    let results = await posts.find({ title: "Post Title 1"}).toArray();
  

    // Delete One
    let results = await posts.deleteOne({ title: "Post Title 4"} );
  

    // Delete Many 
    let results = await posts.deleteMany( { category: "Technology" });


    // Aggregation Pipelines
    let results = await posts.aggregate([
        // Stage 1: Only find documents that have more than 1 like
        {
            $match: { likes: { $gt: 1 }  }
        },
        // Stage 2: Group documents by category and sum each categories likes
        {
            $group: { _id: "$category", totalLikes: { $sum: "$likes" }}
        }

    ]).toArray();
    
    */
   // AGGREGATIONS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /*
    let db2 = conn.db("sample_airbnb");
    let listingsAndReviews = db2.collection("listingsAndReviews");
    if(!listingsAndReviews){
        db2.createCollection("listingsAndReviews"); 
        listingsAndReviews = db2.collection("listingsAndReviews");
    }

    let results = await listingsAndReviews.aggregate([
        {
            $group : { _id : "$property_type" }
        }
    ]).toArray();
    */

    /*
    let db2 = conn.db("sample_restaurants");
    let restaurants = db2.collection ("restaurants");
    if(!restaurants){
        db2.createCollection("restaurants");
        restaurants = db2.collection("restaurants");
    }

    let results = await restaurants.aggregate([
        {
            $project: {
                "name": 1,
                "cuisine": 1,
                "address": 1
            }
        },
        {
            $limit: 5
        }
    ]).toArray();
    */

    /*
    let db2 = conn.db("sample_airbnb");
    let listingsAndReviews = db2.collection("listingsAndReviews");
    if(!listingsAndReviews){
        db2.createCollection("listingsAndReviews"); 
        listingsAndReviews = db2.collection("listingsAndReviews");
    }
    
    let results = await listingsAndReviews.aggregate([
        {
            $sort: { "accommodates": -1 }
        },     
        {
            $project: {
                "name": 1,
                "accommodates": 1
            }
        },
        {
            $limit: 50
        }  
    ]).toArray();
    */

    /*
    let db2 = conn.db("sample_airbnb");
    let listingsAndReviews = db2.collection("listingsAndReviews");
    if(!listingsAndReviews){
        db2.createCollection("listingsAndReviews"); 
        listingsAndReviews = db2.collection("listingsAndReviews");
    }

    let results = await listingsAndReviews.aggregate([
        { $match : { property_type : "House"} },
        { $limit: 2 },
        { $project : {
            "name" : 1,
            "bedrooms" : 1,
            "price" : 1
        }}
    ]).toArray( );
    */

    /*
    // Add Fields
    let db2 = conn.db("sample_restaurants");
    let restaurants = db2.collection ("restaurants");
    if(!restaurants){
        db2.createCollection("restaurants");
        restaurants = db2.collection("restaurants");
    }
    let results = await restaurants.aggregate([
        {
            $addFields: {
                avgGrade: { $avg: "$grades.score" }
            }
        },
        {
            $project: {
                "name" : 1,
                "avgGrade" : 1
            }
        },
        {
            $limit : 5
        }
    ]).toArray();
    */
    /*
    // Aggregate COUNT
    let db2 = conn.db("sample_restaurants");
    let restaurants = db2.collection ("restaurants");
    if(!restaurants){
        db2.createCollection("restaurants");
        restaurants = db2.collection("restaurants");
    }
    let results = await restaurants.aggregate([
        {
            $match: { "cuisine": "Chinese"}
        },
        {
            $count: "totalChinese"
        }
    ]).toArray();
    */

    /*
    // Aggregation Lookup
    let db2 = conn.db("sample_mflix");
    let comments = db2.collection ("comments");
    if(!comments){
        db2.createCollection("comments");
        comments = db2.collection("comments");
    }

    let results = await comments.aggregate([
        {
            $lookup : {
                from: "movies",
                localField: "movie_id",
                foreignField: "_id",
                as: "movie_details",
            },
        },
        {
            $limit : 1
        }
    ]).toArray();
    */

    /*
    // Aggregation Out ( create new collection  )
    let db2 = conn.db("sample_airbnb");
    let listingsAndReviews = db2.collection("listingsAndReviews");
    if(!listingsAndReviews){
        db2.createCollection("listingsAndReviews"); 
        listingsAndReviews = db2.collection("listingsAndReviews");
    }

    let results = await listingsAndReviews.aggregate([
        {
            $group: {
                _id: "$property_type",
                properties: {
                    $push: {
                        name: "$name",
                        accommodates: "$accommodates",
                        price: "$price",
                    },
                },
            },
        },
        {
            $out: "properties_by_type"
        },
    ]).toArray();
    */
    
    /*
    // Using An Index for text search
    let db2 = conn.db("sample_mflix");
    let movies = db2.collection("movies");
    if(!movies){
        db2.createCollection("movies"); 
        movies = db2.collection("movies");
    }

    let results = await movies.aggregate([
        {
            $search : {
                index: "default",   // optional unless you named your index something other than "default"
                text: {
                    query: "star wars",
                    path: "title"
                },
            },
        },
        {
            $project : {
                title: 1,
                year: 1,
            }
        }
    ]).toArray();
    */
  /*
    // SCHEMA VALIDATION
    let db2 = conn.db("test");
    if(!db2.collection("posts"))
        await db2.createCollection("posts2", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: [ "title", "body"],
                    properties: {
                        title: {
                            bsonType: "string",
                            description: "Title of post - Required."
                        },
                        body: {
                            bsonType: "string",
                            description: "Body of post - Required."
                        },
                        category: {
                            bsonType: "string",
                            description: "Category of post - Optional."
                        },
                        likes: {
                            bsonType: "int",
                            description: "Post like count.  Must be an integer - Optional."
                        },
                        tags: {
                            bsonType: ["string"],
                            description: "Must be an array of strings - Optional."
                        },
                        date: {
                            bsonType: "date",
                            description: "Must be a date - Optional."
                        }
                    }
                }
            }
        });

    let results = await db2.collection("posts2").insertOne({
        title: "fake movie",
        body: "fake story",
        category: "fake",
        likes: 0,
        tags: "fake",
        date: Date.now()
    });

*/


    res.send(results).status(200);
});

export default router;