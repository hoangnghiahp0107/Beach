function getElement(selector) {
    return document.querySelector(selector);
}

document.addEventListener("DOMContentLoaded", function () {
    getNewSpaper();
});

function handleSearch(event) {
    event.preventDefault(); 
    const searchTerm = document.querySelector('.search-bar input[name="q"]').value;
    getNewSpaperByName(searchTerm);
}

async function getNewSpaper() {
    try {
        const response = await apiGetNewsIndex();
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

async function getNewSpaperByName(name) {
    try {
        const response = await apiGetSearchName(name);
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

        if (news.length > 0) {
            renderNewSpaperName(news, name);
        } else {
            console.log("No data received from the server");
        }
        const encodedName = encodeURIComponent(name);
        window.location.href = `/src/Views/layout/index.html#?name=${encodedName}`;

    } catch (error) {
        console.log("Lỗi từ máy chủ");
    }
}


function renderNewSpaperName(news, searchName) {
    const html = news.reduce((result, product) => {
        const duongDanHinh = product.hinh && product.hinh.duong_dan ? product.hinh.duong_dan : '';
        if (product.tieu_de_bao.toLowerCase().includes(searchName.toLowerCase())) {
            return (
                result +
                ` 
                    <a class="page" href="/src/Views/layout/details.html?bao_id=${product.bao_id}" data-new-id="${product.bao_id}">
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
        } else {
            return result;
        }
    }, "");
    document.getElementById("newspaper").innerHTML = html;
}


function renderNewSpaper(news) {
    const html = news.reduce((result, product) => {
        const duongDanHinh = product.hinh && product.hinh.duong_dan ? product.hinh.duong_dan : '';
        return (
            result +
            ` 
                    <a class="page" href="/src/Views/layout/details.html?bao_id=${product.bao_id}" data-new-id="${product.bao_id}">
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

function truncateContent(content, maxLength = 60) {
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

