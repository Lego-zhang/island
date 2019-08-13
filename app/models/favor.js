const { Sequelize, Model, Op } = require('sequelize');
const { sequelize } = require('../../core/db');
const { LikeError, DisLikeError, NotFound } = require('../../core/http-exception');
const { Art } = require('./art');

class Favor extends Model {
// 业务表
// 表达某个期刊或者书籍进行点赞，这是一个状态

  // 1 添加一条记录
  // 2 fav_nums中添加一条记录
  // 3 必须同时执行
  // 数据库事务可以保持数据的一致性

  static async like(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid,
      },
    });

    if (favor) {
      throw new LikeError();
    }
    return sequelize.transaction(async (t) => {
      await Favor.create({
        art_id,
        type,
        uid,
      }, { transaction: t });
      const art = await Art.getData(art_id, type, false);
      art.increment('fav_nums', { by: 1, transaction: t });
    });
  }

  static async disLike(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid,
      },
    });

    if (!favor) {
      throw new DisLikeError();
    }
    return sequelize.transaction(async (t) => {
      await favor.destroy({
        force: true,
        transaction: t,
      });
      const art = await Art.getData(art_id, type, false);
      art.decrement('fav_nums', { by: 1, transaction: t });
    });
  }

  static async userLikeIt(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        uid,
        art_id,
        type,
      },
    });
    return !!favor;
  }

  static async getMyClassicFavors(uid) {
    const arts = await Favor.findAll({
      where: {
        uid,
        type: {
          [Op.not]: 400,
        },
      },
    });
    if (!arts) {
      throw new NotFound();
    }
    return await Art.getList(arts);
  }
}

Favor.init({
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER,
  uid: Sequelize.INTEGER,
}, {
  sequelize,
  tableName: 'favor',
});

module.exports = {
  Favor,
};
