const { Resistance, User } = require("../models");

module.exports = {
  // create Resistance
  async createResistance(req, res) {
    try {
      const { body } = req;
      const dbResistanceData = await Resistance.create(body);

      const dbUserData = await User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { resistance: dbResistanceData._id } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "Resistance created but no user with this id!" });
      }

      res.json({ message: "Resistance successfully created!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get one Resistance by id
  async getResistanceById(req, res) {
    try {
      const { params } = req;
      const dbResistanceData = await Resistance.findOne({ _id: params.id });

      if (!dbResistanceData) {
        return res.status(404).json({ message: "No resistance data found with this id!" });
      }

      res.json(dbResistanceData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete resistance data
  async deleteResistance(req, res) {
    try {
      const { params } = req;
      const dbResistanceData = await Resistance.findOneAndDelete({ _id: params.id });

      if (!dbResistanceData) {
        return res.status(404).json({ message: "No resistance data found with this id!" });
      }

      const dbUserData = await User.findOneAndUpdate(
        { resistance: params.id },
        { $pull: { resistance: params.id } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "Resistance deleted but no user with this id!" });
      }

      res.json({ message: "Resistance successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
