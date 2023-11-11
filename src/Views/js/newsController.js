function getElement(selector) {
  return document.querySelector(selector);
}

document.addEventListener("DOMContentLoaded", function () {
  getNews();
  getNewSpaper();
});

async function getNews() {
  try {
    const response = await apiGetNews();
    const news = response.data.map((product) => {
      return new New(
        product.bao_id,
        product.nguoi_dung_id,
        product.hinh_id,
        product.tieu_de_bao,
        product.noi_dung,
      );
    });
    renderNews(news);
  } catch (error) {
    console.log("Lỗi từ máy chủ");
  }
}

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

async function createNews() {
  const product = {
    nguoi_dung_id: getElement("#nguoi_dung_id").value,
    hinh_id: getElement("#hinh_id").value,
    tieu_de_bao: getElement("#tieu_de_bao").value,
    noi_dung: getElement("#noi_dung").value
  };

  const willCreate = await Swal.fire({
    title: "Bạn có muốn tạo tin tức?",
    text: "Nhấn OK để xác nhận tạo tin tức.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Hủy",
  });

  if (willCreate.isConfirmed) {
    try {
      await apiCreateNews(product);
      Swal.fire('Tạo tin tức thành công', '', 'success').then(() => {
        location.reload();
      });
    } catch (error) {
      Swal.fire('Tạo tin tức thất bại', '', 'error');
    }
  }
}

async function selectNews(newID) {
  try {
    const response = await apiGetNewsID(newID);
    const product = response.data;
    getElement("#nguoi_dung_id").value = product.nguoi_dung_id;
    getElement("#hinh_id").value = product.hinh_id;
    getElement("#tieu_de_bao").value = product.tieu_de_bao;
    getElement("#noi_dung").value = product.noi_dung;
    getElement(".modal-footer").innerHTML = `
      <button class="btn btn-success" onclick="updateNews('${product.bao_id}')">Cập nhật</button>
      <button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
      `;
    $("#myModal").modal("show");
  } catch (error) {
    alert("Lấy thông tin tin tức thất bại");
  }
}

async function deleteNews(newID) {
  const willDelete = await Swal.fire({
    title: "Bạn có muốn xóa tin tức?",
    text: "Nhấn OK để xác nhận xóa tin tức.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Hủy",
  });

  if (willDelete.isConfirmed) {
    try {
      await apiDeleteNew(newID);
      Swal.fire('Xóa tin tức thành công', '', 'success').then(() => {
        window.location.reload();
      });
    } catch (error) {
      Swal.fire('Xóa tin tức thất bại', '', 'error');
    }
  }
}

async function updateNews(newID) {
  const news = {
    nguoi_dung_id: getElement("#nguoi_dung_id").value,
    hinh_id: getElement("#hinh_id").value,
    tieu_de_bao: getElement("#tieu_de_bao").value,
    noi_dung: getElement("#noi_dung").value,
  };

  const willUpdate = await Swal.fire({
    title: "Bạn có muốn cập nhật tin tức?",
    text: "Nhấn OK để xác nhận cập nhật.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Hủy",
  });

  if (willUpdate.isConfirmed) {
    try {
      await apiUpdateNew(newID, news);
      Swal.fire('Cập nhật tin tức thành công', '', 'success').then(() => {
        location.reload();
      });
    } catch (error) {
      Swal.fire('Cập nhật tin tức thất bại', '', 'error');
    }
  }
}

function renderNews(news) {
  const html = news.reduce((result, product) => {
    return (
      result +
      `
          <tr>
            <td>${product.bao_id}</td>
            <td>${product.nguoi_dung_id}</td>
            <td>${product.hinh_id}</td>
            <td>${product.tieu_de_bao}</td>
            <td>${product.noi_dung}</td>
            <td style="display: flex">
              <button class="btn btn-primary mx-2" onclick="selectNews('${product.bao_id}')">Xem</button>
              <button class="btn btn-danger" onclick="deleteNews('${product.bao_id}')">Xoá</button>
            </td>
          </tr>
        `
    );
  }, "");

  document.getElementById("tblDanhSachSP").innerHTML = html;
}

function renderNewSpaper(news) {
  const html = news.reduce((result, product) => {
    const duongDanHinh = product.hinh && product.hinh.duong_dan ? product.hinh.duong_dan : '';
    return (
      result +
      `
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

