import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class bai_bao extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    bao_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nguoi_dung_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'nguoi_dung',
        key: 'nguoi_dung_id'
      }
    },
    hinh_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'hinh_anh',
        key: 'hinh_id'
      }
    },
    tieu_de_bao: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    noi_dung: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bai_bao',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bao_id" },
        ]
      },
      {
        name: "nguoi_dung_id",
        using: "BTREE",
        fields: [
          { name: "nguoi_dung_id" },
        ]
      },
      {
        name: "hinh_id",
        using: "BTREE",
        fields: [
          { name: "hinh_id" },
        ]
      },
    ]
  });
  }
}
