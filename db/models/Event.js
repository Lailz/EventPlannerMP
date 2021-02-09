module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "Event",
    {
      organizer: {
        type: DataTypes.STRING(20),
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notContains: "event",
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      numOfSeats: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
      },
      bookedSeats: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          reachedMax(value) {
            if (this.numOfSeats < parseInt(value)) {
              throw new Error("This event is fully booked");
            }
          },
        },
      },
      startDate: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
          isAfter: "2011-11-05",
          checkEndDate(value) {
            if ((this.endDate === null) !== (value === null)) {
              throw new Error("It's either both or neither!");
            }
          },
        },
      },
      endDate: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
          after(value) {
            if (this.startDate > value) {
              throw new Error("Nope!");
            }
          },
          checkStartDate(value) {
            if ((this.startDate === null) !== (value === null)) {
              throw new Error("It's either both or neither!");
            }
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      validate: {},
      timestamps: false,
    }
  );
