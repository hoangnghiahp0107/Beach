import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";
const model = initModels(sequelize);

const getComment = async (req, res) => {
    try {
        const data = await model.binh_luan.findAll();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("Lỗi khi lấy dữ liệu");
    }
}

const createComment = async (req, res) => {
    try {
        let { nguoi_dung_id, bao_id, ngay_binh_luan, noi_dung } = req.body;
        let newData = {
            nguoi_dung_id,
            bao_id,
            ngay_binh_luan,
            noi_dung
        }
        await model.binh_luan.create(newData);
        res.send("Thêm bình luận thành công")
    } catch (error) {
        console.log(error);
        res.status(500).send("Đã có lỗi trong quá trình xử lý");
    }
}

const getCommentID = async (req, res) => {
    const { binh_luan_id } = req.params;
    const data = await model.binh_luan.findOne({
        where: {
            binh_luan_id: binh_luan_id
        },
    });
    res.send(data);
}

const getCommentDetailsID = async (req, res) => {
    const { bao_id } = req.params;
    const data = await model.binh_luan.findAll({
        where: {
            bao_id: bao_id
        },
        include: ["nguoi_dung"]
    });
    res.send(data);
}

const updateComment = async (req, res) => {
    try {
        const { binh_luan_id } = req.params;
        const { nguoi_dung_id, bao_id, ngay_binh_luan, noi_dung } = req.body;
        await model.binh_luan.update(
            { nguoi_dung_id, bao_id, ngay_binh_luan, noi_dung },
            {
                where: {
                    binh_luan_id: binh_luan_id
                }
            }
        );
        return res.status(200).send("Cập nhật thành công!");
    } catch (error) {
        console.error("Lỗi khi cập nhật bình luận", error);
        return res.status(500).send("Lỗi khi cập nhật bình luận");
    }
}

const deleteComment = async (req, res) => {
    try {
        const { binh_luan_id } = req.params;
        await model.binh_luan.destroy({
            where: {
                binh_luan_id: binh_luan_id
            }
        });
        res.status(200).send("Xóa bình luận thành công");
    } catch (error) {
        console.log("Lỗi khi xóa bình luận: ", error);
        res.status(500).send("Đã xảy ra lỗi trong quá trình xử lý.");
    }
}

export { getComment, createComment, getCommentID, updateComment, deleteComment, getCommentDetailsID }