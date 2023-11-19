import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
    try {
        let { token } = req.headers;
        console.log(verifyToken(token))
        if (verifyToken(token)) {
            next();
        }
    } catch (error) {
        res.status(403).send(`Không có quyền truy cập`);
    }
};


const checkRole = (req, res, next) => {
    try {
        const { token } = req.headers;
        const decoded = verifyToken(token);
        if (decoded) {
            const { loai_nguoi_dung } = decoded;
            if (loai_nguoi_dung === 'admin') {
                next();
            } else {
                res.status(403).send(`Bạn không có quyền truy cập`);
            }
        } else {
            res.status(403).send(`Không có quyền truy cập`);
        }
    } catch (error) {
        console.error("Error checking token:", error);
        res.status(500).send(`Lỗi trong quá trình xác thực token`);
    }
};

const taoToken = (data) => {
    return jwt.sign({ data }, "HOANGNGHIA", { expiresIn: "7d" });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, "HOANGNGHIA");
        return decoded.data; 
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

export { checkToken, taoToken, verifyToken, checkRole };
