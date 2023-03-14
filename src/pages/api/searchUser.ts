import type { NextApiRequest, NextApiResponse } from "next";
const sqlite3 = require("sqlite3").verbose();

const parseUsers = (users: [{ Name: string; Id: number; Points: number }]) => {
  let users_String = "";
  for (let i = 0; i < users.length; i++) {
    if (i != 0) {
      users_String += ", ";
    }
    if (i == users.length - 1 && users.length > 1) {
      users_String += "and ";
    }
    users_String += `${users[i].Name} with Id = ${users[i].Id} and Points = ${users[i].Points}`;
  }
  return users_String;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const query = req.query;
    const { name } = query;
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
      db.all(
        "SELECT * FROM users WHERE Name=?",
        [name],
        (
          err: { message: any },
          rows: [{ Name: string; Id: number; Points: number }]
        ) => {
          if (err) {
            code = 500;
            message = err.message;
            console.error(message);
          } else if (rows.length > 0) {
            code = 200;
            message = `Success! Found the following users with the name ${name} in the database: \n${parseUsers(
              rows
            )}`;
            console.log(message);
          } else {
            code = 404;
            message = `Failed. Found no user with that name.`;
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
    res.status(400).json({ message: "Failed, use a get request" });
  }
}

export { parseUsers };
