import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";
const model = initModels(sequelize);

const getNews = async(req, res) => {
    try {
        const data = await model.bai_bao.findAll();
        res.send(data);
    } catch (error) {
       console.log(error);
       res.status(500).send("Lỗi khi lấy dữ liệu");
    }
}

const createNews = async(req, res) => {
    try {
        let { nguoi_dung_id, hinh_id, tieu_de_bao, noi_dung } = req.body;
        let newData = {
            nguoi_dung_id,
            hinh_id,
            tieu_de_bao,
            noi_dung
        }
        await model.bai_bao.create(newData);
        res.send("Tạo tin tức thành công")
    } catch (error) {
        console.log(error);
        res.status(500).send("Đã có lỗi trong quá trình xử lý");
    }
}

const getNewsId = async(req, res) => {
    const {bao_id} = req.params;
    const data = await model.bai_bao.findOne({
        where:{
            bao_id: bao_id
        }
    });
    res.send(data);
}

const deleteNew = async (req, res) => {
    try {
        const { bao_id } = req.params;
        await model.binh_luan.destroy({
            where:{
                bao_id: bao_id
            }
        })
        
        await model.bai_bao.destroy({
            where:{
                bao_id: bao_id
            }
        })

        res.send("Xóa tin tức thành công");
    } catch (error) {
        console.log("Lỗi xóa tin tức:", error);
        res.status(500).send("Đã xảy ra lỗi trong quá trình xử lí.");
    }
}

const updateNew = async (req, res) => {
    try {
        const { bao_id } = req.params;
        const { nguoi_dung_id, hinh_id, tieu_de_bao, noi_dung } = req.body;
        await model.bai_bao.update(
            { nguoi_dung_id, hinh_id, tieu_de_bao, noi_dung },
            {
                where: {
                    bao_id
                }
            }
        );

        return res.status(200).send("Cập nhật thành công!");
    } catch (error) {
        console.error("Lỗi khi cập nhật tin tức", error);
        return res.status(500).send("Lỗi khi cập nhật tin tức");
    }
}

export {getNews, createNews, getNewsId, deleteNew, updateNew}