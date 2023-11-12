document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const newID = urlParams.get('bao_id');
    if (newID) {
        getNewsID(newID);
        getCommentsDetails(newID);
    }
});

async function getNewsID(newID) {
    try {
        const response = await apiGetNewsID(newID);
        if (Array.isArray(response.data)) {
            const news = response.data.map((product) => {
                return new New(
                    product.bao_id,
                    product.nguoi_dung_id,
                    product.hinh_id,
                    product.tieu_de_bao,
                    product.noi_dung,
                    product.hinh
                );
            });
            renderNewsID(news);
        } else if (typeof response.data === 'object') {
            const news = [response.data]; 
            renderNewsID(news);
        } else {
            console.error("Invalid data structure: response.data is not an array or object.");
        }
    } catch (error) {
        console.log("Lỗi từ máy chủ");
        console.error(error);
    }
}

async function getCommentsDetails(newID) {
    try {
        const response = await apiGetCommentDetails(newID);
        if (Array.isArray(response.data)) {
            const news = response.data.map((product) => {
                return new Comment(
                    product.binh_luan_id,
                    product.nguoi_dung_id,
                    product.bao_id,
                    product.ngay_binh_luan,
                    product.noi_dung,
                    product.nguoi_dung
                );
            });
            renderComment(news);
        } else if (typeof response.data === 'object') {
            const news = [response.data]; 
            renderComment(news);
        } else {
            console.error("Invalid data structure: response.data is not an array or object.");
        }
    } catch (error) {
        console.log("Lỗi từ máy chủ");
        console.error(error);
    }
}



function renderNewsID(news) {
    const html = news.reduce((result, product) => {
        const duongDanHinh = product.hinh && product.hinh.duong_dan ? product.hinh.duong_dan : '';
        return (
            result +
            ` 
                <div class="container details">
                    <h2 class="title-details">${product.tieu_de_bao}</h2>
                    <img class="card-image hinhAnh" src="../../../public/img/${duongDanHinh}" alt="Hình ảnh">
                    <h5 class="content-news">${product.noi_dung}</h5>
                </div>
            `
        );
    }, "");
    document.getElementById("newspaperid").innerHTML = html;
}

function renderComment(news) {
    const html = news.reduce((result, product) => {
        const duongDanHinh = product.nguoi_dung && product.nguoi_dung.anh_dai_dien ? product.nguoi_dung.anh_dai_dien : '';
        return (
            result +
            ` 
                <div class="container details d-flex justify-content-left align-items-center" style="border: 1px solid black"> 
                    <div style="padding: 50px">
                        <img style="width: 30px; height: 30px; border-radius: 50%;" src="../../../public/img/${duongDanHinh}" alt="Hình ảnh">
                        <p>${product.ngay_binh_luan}</p>
                    </div>
                    <div style="padding-left: 30px">
                        <p>${product.noi_dung}</p>
                    </div>
                </div>
            `
        );
    }, "");
    document.getElementById("comment").innerHTML = html;
}