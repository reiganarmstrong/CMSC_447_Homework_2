This is my submission for cmsc447-hw2

I made this website through Next.js, which is a full-stack React framework that uses Node.js for the backend.

In order to run this application you will need to have the latest versions of both node and npm installed, instructions for which can be found here: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Once that is installed you will need to clone the main branch of this repository, open a terminal inside CMSC_447_Homework_2 and run the following commands:

`npm install`<br/>
`npm run dev`<br/>

The `npm install` command will install all of the node dependencies required for this app to run and the npm run dev will actually deploy the app. Once deployed you should see something like this in the terminal:


![Screenshot 2023-03-14 at 6 53 17 PM](https://user-images.githubusercontent.com/48657455/225159766-97e05725-e983-4397-a8a1-c60efd36d349.jpg)

It should default to port 3000 however this is not guarenteed. If port 3000 is in use the app will be deployed on the next avaible port and you must take note of where the app is actually deployed in the terminal. Here is an example of when port 3000 is used.

![image](https://user-images.githubusercontent.com/48657455/225160078-417b2812-5673-4f5a-a2af-4de80809c12f.png)

Once this app is successfully deployed you can launch it in the broswer at the link given in the terminal.

The database I used for this project is sqlite3 and the database file can be found in CMSC_447_Homework_2/src/database/data.db

This database is loaded with the default values given in the document.

All the backend work I put in to get the apis to work are housed in CMSC_447_Homework_2/src/pages/api/ where each file in this folder is an endpoint that accomplishes a different task.

If you have manipulated the default values in the database, then you can reset them using the following button on the app once deployed and launched in a browser:

![image](https://user-images.githubusercontent.com/48657455/225160768-31ab685c-50ea-4051-a8f6-71fb7a77f796.png)

The rest of my website consists of three cards, one for creating users, one for searching for users, and one for deleting users. Please note that per the instructor's this app was not meant to handle more than one user with the exact same name.

Each function has an output box next to it that shows the result of the user's request. Here is a preview of the website:

![image](https://user-images.githubusercontent.com/48657455/225161533-f096a55c-08a4-4e11-a610-a934928ca4ae.png)
