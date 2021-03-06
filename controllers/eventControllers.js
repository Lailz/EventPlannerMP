const { Op } = require("sequelize");
const db = require("../db/models");
const { Event } = require("../db/models");

const queryInterface = db.sequelize.getQueryInterface();

exports.eventCreate = async (req, res) => {
  try {
    const newEvent = await Event.bulkCreate(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventList = async (req, res) => {
  try {
    let events;
    if (req.body.date) {
      events = await Event.findAll({
        order: ["startDate", "name"],
        where: {
          startDate: {
            [Op.gt]: req.body.date,
          },
        },
      });
    } else {
      events = await Event.findAll({
        order: ["startDate", "name"],
      });
    }
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventDetail = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId);
    if (event) res.json(event);
    else res.status(404).json({ message: "Not Found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventUpdate = async (req, res) => {
  try {
    const foundEvent = await Event.findByPk(req.params.eventId);
    if (foundEvent) {
      await foundEvent.update(req.body);
      res.status(204).end();
    } else res.status(404).json({ message: "Not Found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventDelete = async (req, res) => {
  try {
    if (req.params.eventId) {
      const foundEvent = await Event.findByPk(req.params.eventId);
      if (foundEvent) {
        await foundEvent.destroy(req.body);
        res.status(204).end();
      } else res.status(404).json({ message: "Not Found" });
    } else {
      await queryInterface.bulkDelete("Events", { id: { [Op.in]: req.body } });
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventListFullyBooked = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        numOfSeats: {
          [Op.eq]: { [Op.col]: "bookedSeats" }, // Go to section Operators https://sequelize.org/master/manual/model-querying-basics.html
        },
      },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventListFiltered = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        name: {
          [Op.substring]: req.body.query,
        },
      },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventListPaginated = async (req, res) => {
  try {
    const events = await Event.findAll(req.body);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
