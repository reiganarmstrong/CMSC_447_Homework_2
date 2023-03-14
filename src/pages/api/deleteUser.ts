import type { NextApiRequest, NextApiResponse } from "next";
import { parseUsers } from "./searchUser";
const sqlite3 = require("sqlite3").verbose();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "DELETE") {
    console.log(req.query);
    const { Name } = req.query;
    // create a database object
    let db = new sqlite3.Database(
      "./src/database/data.db",
      (err: { message: any }) => {
        if (err) {
          console.error(err.message);
        }
        console.log("Connected to the data database.");
      }
    );
    let code: number = 200;
    let message: string = "";
    let deleted_users: string = "";
    // Syncronizes the following commands
    await db.serialize(() => {
      let users: any;
      db.all(
        "SELECT * FROM users WHERE Name=?",
        [Name],
        (
          err: { message: any },
          rows: [{ Name: string; Id: number; Points: number } | null]
        ) => {
          if (err) {
            code = 500;
            message = err.message;
            console.error(message);
          } else if (!rows.length) {
            code = 404;
            message = `Failed. Found no user with that name.`;
            console.log(message);
          } else {
            users = rows;
          }
        }
      );
      db.run(
        "DELETE FROM users WHERE Name = ?",
        [Name],
        (err: { message: any }) => {
          if (message == "") {
            if (err) {
              code = 500;
              message = err.message;
              console.error(message);
            } else {
              code = 200;
              message = `Success! Deleted ${parseUsers(users)} from database.`;
              console.log(message);
            }
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
    res.status(400).json({ message: "Failed, use a delete request" });
  }
}
