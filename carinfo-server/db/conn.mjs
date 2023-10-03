import { MongoClient, ServerApiVersion} from "mongodb";

const ATLAS_URI = "mongodb+srv://rsypertjr:Syp3rtDatabase123!@cluster0.nttvk9d.mongodb.net/?retryWrites=true&w=majority";

const connectionString = ATLAS_URI || "";

const client = new MongoClient(connectionString,{
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
      }
});

let conn;
    try {
      // Connect the client to the server	(optional starting in v4.7)
      conn = await client.connect();     
      console.log("You successfully connected to MongoDB!");
    } catch(e) {
        console.error(e);
    }
 // run().catch(console.dir);

let dbname = "carsearches";
let db = conn.db(dbname);

// Send a ping to confirm a successful connection     
db.command({ ping: 1 });
console.log("Pinged your deployment. You successfully connected to MongoDB " +  dbname + "!");

// export modules
export { db, conn}