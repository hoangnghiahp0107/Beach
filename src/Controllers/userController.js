import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";
import bcrypt from "bcrypt";

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
            res.send("Email đã tồn tại!");
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


export {signUp}