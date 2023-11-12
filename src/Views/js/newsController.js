function getElement(selector) {
  return document.querySelector(selector);
}

document.addEventListener("DOMContentLoaded", function () {
  getNews();
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


async function createNews() {
  if (!validate()) {
    return; 
  }
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
  if (!validate()) {
    return; 
  }

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
              <button class="btn btn-primary mx-2" onclick="selectNews('${product.bao_id}'); resetTB();">Xem</button>
              <button class="btn btn-danger" onclick="deleteNews('${product.bao_id}')">Xoá</button>
            </td>
          </tr>
        `
    );
  }, "");

  document.getElementById("tblDanhSachSP").innerHTML = html;
}



function clearModalInputs() {
  document.getElementById("nguoi_dung_id").value = "";
  document.getElementById("hinh_id").value = "";
  document.getElementById("tieu_de_bao").value = "";
  document.getElementById("noi_dung").value = "";

  document.getElementById("tbAccount").textContent = "";
  document.getElementById("tbImage").textContent = "";
  document.getElementById("tbTitle").textContent = "";
  document.getElementById("tbContent").textContent = "";
}

document.getElementById("btnThemSP").addEventListener("click", clearModalInputs);

function validate() {
  let isValid = true;

  let nguoi_dung_id = getElement("#nguoi_dung_id").value;
  if (!nguoi_dung_id.trim()) {
    isValid = false;
    getElement("#tbAccount").innerHTML = "Vui lòng nhập ID của người dùng!";
  } else {
    getElement("#tbAccount").innerHTML = "";
  }

  let hinh_id = getElement("#hinh_id").value;
  if (!hinh_id.trim()) {
    isValid = false;
    getElement("#tbImage").innerHTML = "Vui lòng nhập ID của hình ảnh!";
  } else {
    getElement("#tbImage").innerHTML = "";
  }

  let tieu_de_bao = getElement("#tieu_de_bao").value;
  if (!tieu_de_bao.trim()) {
    isValid = false;
    getElement("#tbTitle").innerHTML = "Vui lòng nhập tiêu đề!";
  } else {
    getElement("#tbTitle").innerHTML = "";
  }

  let noi_dung = getElement("#noi_dung").value;
  if (!noi_dung.trim()) {
    isValid = false;
    getElement("#tbContent").innerHTML = "Vui lòng nhập nội dung!";
  } else {
    getElement("#tbContent").innerHTML = "";
  }

  return isValid;
}

function resetTB(){
  getElement("#tbAccount").textContent = " ";
  getElement("#tbImage").textContent=" ";
  getElement("#tbTitle").textContent=" ";
  getElement("#tbContent").textContent=" ";
}

async function logout() {
  try {
    const token = localStorage.getItem("accessToken");

    await apiLogout(token);

    localStorage.removeItem("accessToken");

    Swal.fire('Đăng xuất thành công', '', 'success').then(() => {
      window.location.href = "/src/Views/index.html"; 
    });
  } catch (error) {
    Swal.fire('Lỗi khi đăng xuất', '', 'error');
    console.error(error);
  }
}
