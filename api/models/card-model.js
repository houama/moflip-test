const { Card } = require("../config/database/sequelize-model");
const Sequelize = require("sequelize");

class CardModel {
  static async getAll() {
    try {
      // Get 2 random data
      const cardData = await Card.findAll({
        order: [[Sequelize.fn("RAND")]],
        limit: 2,
      });

      return cardData;
    } catch (error) {
      console.error(error);
    }
  }

  static async purchase(_id) {
    try {
      // flag the sold as true
      const purchaseCard = await Card.update(
        { sold: true },
        {
          where: { id: _id },
        }
      );
      return purchaseCard;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = CardModel;
