import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";
import bcrypt from "bcrypt";
import { taoToken } from "../Config/jwtConfig.js";

const model = initModels(sequelize);

const signUp = async(req,res) => {
    try{
        let { tai_khoan, mat_khau, ho_ten, anh_dai_dien } = req.body;
        let checkTK = await model.nguoi_dung.findAll({
            where:{
                tai_khoan
            }
        })
        if (checkTK.length > 0) {
            res.send("Tài khoản đã tồn tại!");
            return;
        }
        let newData = {
            tai_khoan,
            mat_khau: bcrypt.hashSync(mat_khau, 10),
            ho_ten,
            anh_dai_dien
        };
        await model.nguoi_dung.create(newData);
        res.send("Đăng ký thành công!");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Đã có lỗi trong quá trình xử lý");
    }
}

const login = async(req, res) => {
    try {
        let { tai_khoan, mat_khau } = req.body;

        let checkTK = await model.nguoi_dung.findOne({
            where: {
                tai_khoan
            }
        });

        if (checkTK){
            let checkPass = bcrypt.compareSync( mat_khau, checkTK.mat_khau );
            if(checkPass == true){
                let token = taoToken(checkTK);
                res.status(200).send(token);
            }
            else{
                res.status(400).send("Mật khẩu không đúng");
            }
        }
        else{
            res.status(400).send("Tài khoản không đúng");
        }
        } catch (error) {
            res.status(500).send("Đã có lỗi trong quá trình xử lý");
        }
}

const getUser = async (req, res) => {
    try {
        const data = await model.nguoi_dung.findAll();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi khi lấy dữ liệu");
    }
}

const getUserID = async (req, res) =>{
    const {nguoi_dung_id} = req.params;
    const data = await model.nguoi_dung.findOne({
        where:{
            nguoi_dung_id: nguoi_dung_id
        }
    });
    res.send(data)
}

const deleteUser = async (req, res) => {
    try {
        const { nguoi_dung_id } = req.params;
        
        await model.binh_luan.destroy({
            where: {
                nguoi_dung_id: nguoi_dung_id
            }
        });

        await model.bai_bao.destroy({
            where:{
                nguoi_dung_id: nguoi_dung_id
            }
        })
        
        await model.hinh_anh.destroy({
            where: {
                nguoi_dung_id: nguoi_dung_id
            }
        });

        await model.diem_so.destroy({
            where: {
                nguoi_dung_id: nguoi_dung_id
            }
        });

        await model.nguoi_dung.destroy({
            where: {
                nguoi_dung_id: nguoi_dung_id
            }
        });
        res.send("Xóa ảnh thành công");
    } catch (error) {
        console.log("Lỗi xóa ảnh:", error);
        res.status(500).send("Đã xảy ra lỗi trong quá trình xử lí.");
    }
}

const updateUser = async (req, res) => {
  try {
    const { nguoi_dung_id } = req.params;
    const { tai_khoan, ho_ten, mat_khau, anh_dai_dien } = req.body;

    const hashedPassword = bcrypt.hashSync(mat_khau, 10);

    const checkTK = await model.nguoi_dung.findOne({
      where: {
        tai_khoan
      }
    });

    if (checkTK) {
      return res.status(400).send("Tài khoản đã tồn tại!");
    }

    await model.nguoi_dung.update(
      { tai_khoan, ho_ten, mat_khau: hashedPassword, anh_dai_dien },
      {
        where: {
          nguoi_dung_id
        }
      }
    );
    return res.status(200).send("Cập nhật thành công!");
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    return res.status(500).send("Lỗi khi cập nhật thông tin người dùng");
  }
}


export { signUp, login, getUser, getUserID, deleteUser, updateUser }