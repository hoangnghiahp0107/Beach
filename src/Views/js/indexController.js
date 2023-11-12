function getElement(selector) {
    return document.querySelector(selector);
}

document.addEventListener("DOMContentLoaded", function () {
    getNewSpaper();
});

async function getNewSpaper() {
    try {
        const response = await apiGetNews();
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
        renderNewSpaper(news);
    } catch (error) {
        console.log("Lỗi từ máy chủ");
    }
}

function renderNewSpaper(news) {
    const html = news.reduce((result, product) => {
        const duongDanHinh = product.hinh && product.hinh.duong_dan ? product.hinh.duong_dan : '';
        return (
            result +
            ` 
                    <a class="page" href="/src/Views/details.html?bao_id=${product.bao_id}" data-new-id="${product.bao_id}">
                    <div class="card">
                    <img class="card-image" src="../../../public/img/${duongDanHinh}" alt="Hình ảnh">
                    <div class="card-content">
                        <h2 class="card-title">${truncateTitle(product.tieu_de_bao)}</h2>
                        <div class="card-user">
                        <div class="card-user-info">
                            <div class="card-bottom">
                            <h5 class="content-news">${truncateContent(product.noi_dung)}</h5>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </a> 
          `
        );
    }, "");
    document.getElementById("newspaper").innerHTML = html;
}

function truncateContent(content, maxLength = 70) {
  if (content.length > maxLength) {
    return content.substring(0, maxLength) + '...';
  }
  return content;
}

function truncateTitle(content, maxLength = 30) {
  if (content.length > maxLength) {
    return content.substring(0, maxLength) + '...';
  }
  return content;
}   


