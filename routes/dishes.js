const express=require("express");
const {getAllDishes, toggleStatus}=require("../controllers/dishes");
const router = express.Router();

router.get("/getAll", getAllDishes);
router.put("/:dishId/toggle-status", toggleStatus);

module.exports = router;