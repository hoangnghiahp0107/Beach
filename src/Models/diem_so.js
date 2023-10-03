import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class diem_so extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    diem_so_id: {
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
    point: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'diem_so',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "diem_so_id" },
        ]
      },
      {
        name: "nguoi_dung_id",
        using: "BTREE",
        fields: [
          { name: "nguoi_dung_id" },
        ]
      },
    ]
  });
  }
}
