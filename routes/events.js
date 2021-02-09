const express = require("express");
const {
  eventCreate,
  eventList,
  eventDetail,
  eventUpdate,
  eventDelete,
  eventListFullyBooked,
  eventListFiltered,
  eventListPaginated,
} = require("../controllers/eventControllers");

const router = express.Router();

router.post("/", eventCreate);

router.get("/", eventList);

router.get("/filtered", eventListFiltered);

router.get("/paginated", eventListPaginated);

router.get("/full", eventListFullyBooked);

router.get("/:eventId", eventDetail);

router.put("/:eventId", eventUpdate);

router.delete("/:eventId?", eventDelete);

module.exports = router;
