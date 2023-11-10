import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";
const model = initModels(sequelize);

const getImages = async (req, res) => {
    try {
        const data = await model.hinh_anh.findAll();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("Lỗi khi lấy dữ liệu")
    }
}

const getImageID = async (req, res) =>{
    const {hinh_id} = req.params;
    const data = await model.hinh_anh.findOne({
        where:{
            hinh_id: hinh_id
        }
    });
    res.send(data)
}

const createImage = async (req, res) => {
    try {
        const { nguoi_dung_id, ten_hinh } = req.body;

        if (!nguoi_dung_id || !ten_hinh) {
            return res.status(400).send("Thiếu thông tin người dùng hoặc tên hình.");
        }

        const duong_dan = req.files[0].filename;

        if (!duong_dan) {
            return res.status(400).send("Không tìm thấy đường dẫn hình ảnh.");
        }

        let newData = {
            nguoi_dung_id,
            ten_hinh,
            duong_dan
        }

        await model.hinh_anh.create(newData);
        res.send("Tạo hình ảnh thành công");
    } catch (error) {
        console.log(error);
        res.status(500).send("Đã có lỗi trong quá trình xử lý");
    }
}

const deleteImage = async (req, res) => {
    try {
        const { hinh_id } = req.params;
        await model.hinh_anh.destroy({
            where:{
                hinh_id: hinh_id
            }
        });
        res.status(200).send("Xóa hình ảnh thành công");
    } catch (error) {
        console.log("Lỗi khi xóa hình ảnh: ", error);
        res.status(500).send("Đã xảy ra lỗi trong quá trình xử lý.");
    }
}



export { getImages, deleteImage, getImageID, createImage }