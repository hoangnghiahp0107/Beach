import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _bai_bao from  "./bai_bao.js";
import _binh_luan from  "./binh_luan.js";
import _diem_so from  "./diem_so.js";
import _hinh_anh from  "./hinh_anh.js";
import _nguoi_dung from  "./nguoi_dung.js";

export default function initModels(sequelize) {
  const bai_bao = _bai_bao.init(sequelize, DataTypes);
  const binh_luan = _binh_luan.init(sequelize, DataTypes);
  const diem_so = _diem_so.init(sequelize, DataTypes);
  const hinh_anh = _hinh_anh.init(sequelize, DataTypes);
  const nguoi_dung = _nguoi_dung.init(sequelize, DataTypes);

  binh_luan.belongsTo(bai_bao, { as: "bao", foreignKey: "bao_id"});
  bai_bao.hasMany(binh_luan, { as: "binh_luans", foreignKey: "bao_id"});
  bai_bao.belongsTo(hinh_anh, { as: "hinh", foreignKey: "hinh_id"});
  hinh_anh.hasMany(bai_bao, { as: "bai_baos", foreignKey: "hinh_id"});
  bai_bao.belongsTo(nguoi_dung, { as: "nguoi_dung", foreignKey: "nguoi_dung_id"});
  nguoi_dung.hasMany(bai_bao, { as: "bai_baos", foreignKey: "nguoi_dung_id"});
  binh_luan.belongsTo(nguoi_dung, { as: "nguoi_dung", foreignKey: "nguoi_dung_id"});
  nguoi_dung.hasMany(binh_luan, { as: "binh_luans", foreignKey: "nguoi_dung_id"});
  diem_so.belongsTo(nguoi_dung, { as: "nguoi_dung", foreignKey: "nguoi_dung_id"});
  nguoi_dung.hasMany(diem_so, { as: "diem_sos", foreignKey: "nguoi_dung_id"});
  hinh_anh.belongsTo(nguoi_dung, { as: "nguoi_dung", foreignKey: "nguoi_dung_id"});
  nguoi_dung.hasMany(hinh_anh, { as: "hinh_anhs", foreignKey: "nguoi_dung_id"});

  return {
    bai_bao,
    binh_luan,
    diem_so,
    hinh_anh,
    nguoi_dung,
  };
}
