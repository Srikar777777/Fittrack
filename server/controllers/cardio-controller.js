const { Cardio, User } = require("../models");

module.exports = {
  // create cardio
  async createCardio(req, res) {
    try {
      const { body } = req;
      const dbCardioData = await Cardio.create(body);

      const dbUserData = await User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { cardio: dbCardioData._id } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "Cardio created but no user with this id!" });
      }

      res.json({ message: "Cardio successfully created!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get one Cardio by id
  async getCardioById(req, res) {
    try {
      const { params } = req;
      const dbCardioData = await Cardio.findOne({ _id: params.id });

      if (!dbCardioData) {
        return res.status(404).json({ message: "No cardio data found with this id!" });
      }

      res.json(dbCardioData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete cardio data
  async deleteCardio(req, res) {
    try {
      const { params } = req;
      const dbCardioData = await Cardio.findOneAndDelete({ _id: params.id });

      if (!dbCardioData) {
        return res.status(404).json({ message: "No cardio data found with this id!" });
      }

      const dbUserData = await User.findOneAndUpdate(
        { cardio: params.id },
        { $pull: { cardio: params.id } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "Cardio deleted but no user with this id!" });
      }

      res.json({ message: "Cardio successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
