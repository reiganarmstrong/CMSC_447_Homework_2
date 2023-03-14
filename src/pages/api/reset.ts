// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const sqlite3 = require("sqlite3").verbose();

const starting_users = [
  ["Steve Smith", 211, 80],
  ["Jian Wong", 122, 92],
  ["Chris Peterson", 213, 91],
  ["Sai Patel", 524, 94],
  ["Andrew Whitehead", 425, 99],
  ["Lynn Roberts", 626, 90],
  ["Robert Sanders", 287, 75],
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "PUT") {
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

    // Syncronizes the following commands
    db.serialize(() => {
      //   Clears any existing table
      db.run("DROP TABLE IF EXISTS users", (err: { message: any }) => {
        if (err) {
          console.error(err.message);
        }
        console.log("Cleared users table.");
      });

      // Create a table called users
      db.run(
        "CREATE TABLE IF NOT EXISTS users(Name TEXT, Id INTEGER PRIMARY KEY, Points INTEGER)",
        (err: { message: any }) => {
          if (err) {
            console.error(err.message);
          }
          console.log("Created users table.");
        }
      );

      // Adding all starting users
      for (let i = 0; i < starting_users.length; i++) {
        db.run(
          `INSERT INTO users(Name, Id, Points) VALUES (?,?,?)`,
          starting_users[i],
          (err: { message: any }) => {
            if (err) {
              console.error(err.message);
            }
            console.log(`Added ${starting_users[i][0]} to database`);
          }
        );
      }
    });

    // close the database connection
    db.close((err: { message: any }) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Close the database connection.");
    });

    res.status(200).json({ message: "Success" });
  } else {
    res.status(400).json({
      message: "Failure, only put requests work for resetting databases",
    });
  }
}
