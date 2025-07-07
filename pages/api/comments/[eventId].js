import {
  connectDatabase,
  insertDocument,
  getAllComments,
} from "@/helpers/db-util";

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Could not connect to database" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      client.close();
      return;
    }

    const newComment = { eventId, email, name, text };

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);

      newComment.id = result.insertedId;
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed" });
      client.close();
      return;
    }

    res.status(201).json({ message: "Added comment", comment: newComment });
  } else if (req.method === "GET") {
    try {
      const comments = await getAllComments(client, eventId);

      res.status(200).json({ comments: comments });
    } catch (error) {
      res.status(500).json({ message: "Fetching comments failed" });
      client.close();
      return;
    }
  }

  client.close();
}
