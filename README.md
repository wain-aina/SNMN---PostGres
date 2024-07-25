Run yarn install to install node packages found in package.json

Make sure you use your own PostGreSQL credentials.

In PgAdmin, create a DB called facts.

Run this command in the query tool: 

CREATE TABLE facts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  content TEXT
);

Run yarn nodemon app.js to initialize the app.
