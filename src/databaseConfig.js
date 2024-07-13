require("dotenv").config();
const mysql=require("mysql");

const connection=mysql.createConnection({
    host: process.env.DATABASE_HOST_NAME,
    user: process.env.DATABASE_HOST_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
                   
 const tableDefinitionQuery =`CREATE TABLE IF NOT EXISTS DISHES (
     dishId INT PRIMARY KEY NOT NULL,
     dishName VARCHAR(300) NOT NULL,
     imageUrl VARCHAR(300),
     isPublished BOOL DEFAULT 0
   );`
                   
   connection.query(tableDefinitionQuery, (err, result) =>{
      if(err){
          console.log("There was an error recieved during the Table generation processes.");
      }
  })

    });
    
  module.exports=connection;             