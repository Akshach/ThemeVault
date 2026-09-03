import { MongoClient, type Db } from "mongodb"

const options = {}
let clientPromise: Promise<MongoClient> | undefined

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("Please add your MongoDB URI to .env.local")
  }

  if (process.env.NODE_ENV === "development") {
    // Preserve the connection across module reloads caused by HMR.
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
      globalWithMongo._mongoClientPromise = new MongoClient(uri, options).connect()
    }
    return globalWithMongo._mongoClientPromise
  }

  if (!clientPromise) {
    clientPromise = new MongoClient(uri, options).connect()
  }
  return clientPromise
}

export async function getDatabase(): Promise<Db> {
  const client = await getClientPromise()
  return client.db("themevault")
}
