// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
if (!process.env.MONGODB_DB) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_DB"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    // strict: true,
    deprecationErrors: true,
  },
};

const MongoDbClient = new MongoClient(uri, options);

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default MongoDbClient;
