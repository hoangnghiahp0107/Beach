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

function formatDate(dateString) {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

function renderComment(news) {
    const html = news.reduce((result, product) => {
        const duongDanHinh = product.nguoi_dung && product.nguoi_dung.anh_dai_dien ? product.nguoi_dung.anh_dai_dien : '';
        return (
            result +
            ` 
                <section id="cm_part">
                    <div class="container mt-5">
                        <div class="d-flex justify-content-center row">
                            <div class="col-md-8">
                                <div class="bg-white p-2"> <!-- Div Phan Comment-->
                                <img src="../../../public/img/${duongDanHinh}" alt="Hình ảnh" width="60" class="rounded-circle">
                                <div class="d-flex flex-row user-info"> 
                                    <div class="d-flex flex-column justify-content-start ml-2" style="float: right; width: 93%;"> <!-- Phan text cm voi Ten user-->
                                    <p class="d-block font-weight-bold name">${product.nguoi_dung.ho_ten}</p>
                                    <p class="d-block date">${formatDate(product.ngay_binh_luan)}</p>
                                    <div class="button-edit-delete"><button class="btn btn-success btn-sm shadow-none" type="button"><i class="fa-solid fa-x"></i></button>
                                        <button class="btn btn-success btn-sm shadow-none" type="button"><i class="fa-solid fa-pen-to-square"></i></button>
                                    </div>
                                    <div class="mt-2">
                                        <p class="comment-text">${product.noi_dung}</p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `
        );
    }, "");
    document.getElementById("comment").innerHTML = html;
}