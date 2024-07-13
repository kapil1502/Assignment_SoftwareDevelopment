const connection = require("../src/databaseConfig");
const { broadcast } = require("../src/websocket");

async function getAllDishes(req, res) {
  const fetchQuery = "SELECT * FROM DISHES";
  connection.query(fetchQuery, (err, result) => {
    if (err) {
      console.error("Error fetching dishes: " + err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
}

async function toggleStatus(req, res) {
  const dishId = req.params.dishId;
  const updateQuery = "UPDATE DISHES SET isPublished = NOT isPublished WHERE dishId = ?";

  connection.query(updateQuery, [dishId], (err, result) => {
    if (err) {
      console.error("Error while toggling the status: " + err);
      res.status(500).json({ error: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Dish not found" });
    } else {
      const fetchQuery = "SELECT * FROM DISHES";
      connection.query(fetchQuery, (err, dishes) => {
        if (err) {
          console.error("Error fetching dishes after update: " + err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          broadcast({ type: "UPDATE_DISHES", data: dishes });
          res.status(200).json({ message: "Dish status toggled successfully" });
        }
      });
    }
  });
}

module.exports = {
  getAllDishes,
  toggleStatus,
};