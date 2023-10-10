import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";
import bcrypt from "bcrypt";
import { taoToken } from "../Config/jwtConfig.js";

const model = initModels(sequelize);

const apiCreateAccount = async(req,res) => {
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

const apiLoginAccount = async(req, res) => {
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

const apiGetUser = async (req, res) => {
    try {
        const data = await model.nguoi_dung.findAll();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi khi lấy dữ liệu");
    }
}

export { apiCreateAccount, apiGetUser, apiLoginAccount }