import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(process.env.DATABASE_URL);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
}

// get all comments for a specific event
export async function getAllComments(client, eventId) {
  const db = client.db();
  const comments = await db
    .collection("comments")
    .find({ eventId: eventId })
    .sort({ _id: -1 })
    .toArray();
  return comments;
}
