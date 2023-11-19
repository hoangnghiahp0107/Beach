function getElement(selector) {
  return document.querySelector(selector);
}
document.addEventListener("DOMContentLoaded", function () {
  getImages();
});


async function getImages() {
  try {
    const response = await apiGetImage();
    const images = response.map((image) => new Images(
      image.hinh_id,
      image.nguoi_dung_id,
      image.ten_hinh,
      image.duong_dan
    ));
    renderImages(images);
  } catch (error) {
    console.log("Lỗi từ máy chủ", error);
  }
}

async function selectImg(imageID) {
  try {
    const response = await apiGetImgID(imageID);
    const img = response.data;
    getElement("#nguoi_dung_id").value = img.nguoi_dung_id;
    getElement("#ten_hinh").value = img.ten_hinh;
    getElement("#duong_dan_text").value = img.duong_dan;

    getElement(".modal-footer").innerHTML = `
            <button class="btn btn-success" onclick="updateImg('${img.hinh_id}')">Cập nhật</button>
            <button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
        `;
    $("#myModal").modal("show");

  } catch (error) {
    console.log(error);
    alert("Lấy thông tin hình ảnh dùng thất bại");
  }
}

function openFileInput() {
  getElement("#duong_dan").click();
}

function displaySelectedFile(input) {
  const fileName = input.files[0].name;
  getElement("#duong_dan_text").value = fileName;
}


async function createImage() {
  if (!validate()) {
    return; 
  }
  const images = {
    nguoi_dung_id: getElement("#nguoi_dung_id").value,
    ten_hinh: getElement("#ten_hinh").value,
  };
  const formData = new FormData();
  formData.append("nguoi_dung_id", images.nguoi_dung_id);
  formData.append("ten_hinh", images.ten_hinh);
  formData.append("file", getElement("#duong_dan").files[0]);

  const willCreate = await Swal.fire({
    title: "Bạn có muốn thêm hình ảnh?",
    text: "Nhấn OK để xác nhận thêm hình ảnh.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Hủy",
  });

  if (willCreate.isConfirmed) {
    try {
      await apiCreateImg(formData);
      Swal.fire('Thêm ảnh thành công', '', 'success').then(() => {
        location.reload();
      });
    } catch (error) {
      Swal.fire('Thêm ảnh thất bại', '', 'error');
      console.log(error)
    }
  }
}

async function deleteImage(imageID) {
  const willDelete = await Swal.fire({
    title: "Bạn có muốn xóa hình ảnh?",
    text: "Nhấn OK để xác nhận xóa hình ảnh.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Hủy",
  });

  if (willDelete.isConfirmed) {
    try {
      await apiDeleteImage(imageID);
      Swal.fire('Xóa hình ảnh thành công', '', 'success').then(() => {
        window.location.reload();
      });
    } catch (error) {
      Swal.fire('Xóa hình ảnh thất bại', '', 'error');
    }
  }
}


function renderImages(images) {
  const html = images.reduce((result, image) => {
    return (
      result +
      `
            <tr>
              <td>${image.hinh_id}</td>
              <td>${image.nguoi_dung_id}</td>
              <td>${image.ten_hinh}</td>
              <td>${image.duong_dan}</td>
              <td style="display: flex">
                <button class="btn btn-primary mx-2" onclick="selectImg('${image.hinh_id}'); resetTB();">Xem</button>
                <button class="btn btn-danger" onclick="deleteImage('${image.hinh_id}')">Xoá</button>
              </td>
            </tr>
          `
    );
  }, "");

  document.getElementById("tblDanhSachSP").innerHTML = html;
}

async function updateImg(imageID) {
  if (!validate()) {
    return; 
  }
  const images = {
    nguoi_dung_id: getElement("#nguoi_dung_id").value,
    ten_hinh: getElement("#ten_hinh").value,
  };
  const formData = new FormData();
  formData.append("nguoi_dung_id", images.nguoi_dung_id);
  formData.append("ten_hinh", images.ten_hinh);
  formData.append("file", getElement("#duong_dan").files[0]);

  const willUpdate = await Swal.fire({
    title: "Bạn có muốn cập nhật hình ảnh?",
    text: "Nhấn OK để xác nhận cập nhật.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Hủy",
  });

  if (willUpdate.isConfirmed) {
    try {
      await apiUpdateImg(imageID, formData);
      Swal.fire('Cập nhật hình ảnh thành công', '', 'success').then(() => {
        location.reload();
      });
    } catch (error) {
      console.log(error);
      Swal.fire('Vui lòng chọn ảnh khác nếu muốn cập nhật', '', 'error');
    }
  }
}

function clearModalInputs() {
  document.getElementById("nguoi_dung_id").value = "";
  document.getElementById("ten_hinh").value = "";
  document.getElementById("duong_dan_text").value = "";
    
  document.getElementById("tbAccount").textContent = "";
  document.getElementById("tbImage").textContent = "";
  document.getElementById("tbLink").textContent = "";
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

  let ten_hinh = getElement("#ten_hinh").value;
  if (!ten_hinh.trim()) {
    isValid = false;
    getElement("#tbImage").innerHTML = "Vui lòng nhập tên hình!";
  } else {
    getElement("#tbImage").innerHTML = "";
  }

  let duong_dan = getElement("#duong_dan_text").value;
  if (!duong_dan.trim()) {
    isValid = false;
    getElement("#tbLink").innerHTML = "Vui lòng chọn đường dẫn!";
  } else {
    getElement("#tbLink").innerHTML = "";
  }

  return isValid;
}

function resetTB(){
  getElement("#tbAccount").textContent = " ";
  getElement("#tbImage").textContent=" ";
  getElement("#tbLink").textContent=" ";
}

async function logout() {
  try {
    const token = localStorage.getItem("localStorageToken");

    await apiLogout(token);

    localStorage.removeItem("localStorageToken");

    Swal.fire('Đăng xuất thành công', '', 'success').then(() => {
      window.location.href = "index.html"; 
    });
  } catch (error) {
    Swal.fire('Lỗi khi đăng xuất', '', 'error');
    console.error(error);
  }
}