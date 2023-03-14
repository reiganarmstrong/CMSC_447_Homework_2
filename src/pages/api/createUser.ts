import type { NextApiRequest, NextApiResponse } from "next";
const sqlite3 = require("sqlite3").verbose();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    let data = JSON.parse(req.body);
    // create a database object
    let db = new sqlite3.Database(
      "./src/database/users.db",
      (err: { message: any }) => {
        if (err) {
          console.error(err.message);
        }
        console.log("Connected to the data database.");
      }
    );
    let code: number = 200;
    let message: string = "";
    // Syncronizes the following commands
    await db.serialize(() => {
      db.run(
        "INSERT INTO users(Name, Points) VALUES (?,?)",
        [data.full_name, data.points],
        (err: { message: any }) => {
          if (err) {
            code = 500;
            message = err.message;
            console.error(message);
          } else {
            code = 200;
            message = `Success! Inserted ${data.full_name} with ${data.points} points into database.`;
            console.log(message);
          }
          res.status(code).json({ message: message });
        }
      );
    });

    // close the database connection
    db.close((err: { message: any }) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Close the database connection.");
    });
  } else {
    res.status(400).json({ message: "Failed, use a post request" });
  }
}
