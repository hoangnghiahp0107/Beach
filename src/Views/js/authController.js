function getElement(selector) {
  return document.querySelector(selector);
}
document.addEventListener("DOMContentLoaded", function () {
  getAccount();
});


async function getAccount() {
  try {
    const response = await apiGetAccount();
    const users = response.data.map((user) => {
      return new User(
        user.nguoi_dung_id,
        user.tai_khoan,
        user.mat_khau,
        user.ho_ten,
        user.loai_nguoi_dung,
        user.anh_dai_dien
      );
    });
    renderAccount(users);
  } catch (error) {
    console.log("Lỗi từ máy chủ");
  }
}

async function createAccount() {
  if (!validate()) {
    return; 
  }
  const taiKhoan = getElement("#tai_khoan").value;
  const matKhau = getElement("#mat_khau").value;
  const hoTen = getElement("#ho_ten").value;
  const loaiNguoiDung = getElement("#loai_nguoi_dung").value;
  const anhDaiDien = getElement("#anh_dai_dien").value;
  const willCreate = await Swal.fire({
    title: "Bạn có muốn tạo tài khoản?",
    text: "Nhấn OK để xác nhận tạo tài khoản.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Hủy",
  });

  if (willCreate.isConfirmed) {
    try {
      const response = await apiCreateAccount({
        tai_khoan: taiKhoan,
        mat_khau: matKhau,
        ho_ten: hoTen,
        loai_nguoi_dung: loaiNguoiDung,
        anh_dai_dien: anhDaiDien
      });
      if (response.data === "Tài khoản đã tồn tại!") {
        Swal.fire('Tài khoản đã tồn tại', '', 'error');
      } else if (response.data === "Đăng ký thành công!") {
        Swal.fire('Tạo tài khoản thành công', '', 'success').then(() => {
          location.reload();
        });
      } else {
        Swal.fire('Lỗi không xác định', '', 'error');
      }
    } catch (error) {
      Swal.fire('Lỗi khi gửi yêu cầu', '', 'error');
      console.error(error);
    }
  }
}

async function selectAccount(userID) {
  resetTB();
  try {
    const response = await apiGetUserID(userID);
    const user = response.data;
    getElement("#tai_khoan").value = user.tai_khoan;
    getElement("#mat_khau").value = user.mat_khau;
    getElement("#ho_ten").value = user.ho_ten;
    getElement("#loai_nguoi_dung").value = user.loai_nguoi_dung;
    getElement("#anh_dai_dien").value = user.anh_dai_dien;
    getElement("#tai_khoan").disabled = true;

    getElement(".modal-footer").innerHTML = `
        <button class="btn btn-success" onclick="updateAccount('${user.nguoi_dung_id}')">Cập nhật</button>
        <button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
      `;
    $("#myModal").modal("show");

  } catch (error) {
    alert("Lấy thông tin người dùng thất bại");
  }
}

async function updateAccount(userID) {
  if (!validate()) {
    return; 
  }
  const user = {
    ho_ten: getElement("#ho_ten").value,
    mat_khau: getElement("#mat_khau").value,
    loai_nguoi_dung: getElement("#loai_nguoi_dung").value,
    anh_dai_dien: getElement("#anh_dai_dien").value,
  };

  const willUpdate = await Swal.fire({
    title: "Bạn có muốn cập nhật tài khoản?",
    text: "Nhấn OK để xác nhận cập nhật.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Hủy",
  });

  if (willUpdate.isConfirmed) {
    try {
      await apiUpdateAccount(userID, user);
      Swal.fire('Cập nhật tài khoản thành công', '', 'success').then(() => {
        location.reload();
      });
    } catch (error) {
      console.log(error);
      Swal.fire('Cập nhật tài khoản thất bại', '', 'error');
    }
  }
}


async function deleteAccount(userID) {
  const willDelete = await Swal.fire({
    title: "Bạn có muốn xóa tài khoản?",
    text: "Nhấn OK để xác nhận xóa tài khoản.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Hủy",
  });

  if (willDelete.isConfirmed) {
    try {
      await apiDeleteAccount(userID);
      Swal.fire('Xóa tài khoản thành công', '', 'success').then(() => {
        window.location.reload();
      });
    } catch (error) {
      Swal.fire('Xóa tài khoản thất bại', '', 'error');
    }
  }
}


function hidePassword(password) {
  return '*'.repeat(password.length);
}

function renderAccount(users) {
  const html = users.reduce((result, user) => {
    return (
      result +
      `
          <tr>
            <td>${user.nguoi_dung_id}</td>
            <td>${user.tai_khoan}</td>
            <td>${user.ho_ten}</td>
            <td>${hidePassword(user.mat_khau)}</td>
            <td>${user.loai_nguoi_dung}</td>
            <td style="display: flex">
              <button class="btn btn-primary mx-2" id="select" onclick="selectAccount('${user.nguoi_dung_id}'); resetTB();">Xem</button>
              <button class="btn btn-danger" onclick="deleteAccount('${user.nguoi_dung_id}')">Xoá</button>
            </td>
          </tr>
        `
    );
  }, "");

  document.getElementById("tblDanhSachSP").innerHTML = html;
}

function clearModalInputs() {
  document.getElementById("tai_khoan").value = "";
  document.getElementById("ho_ten").value = "";
  document.getElementById("mat_khau").value = "";
  document.getElementById("loai_nguoi_dung").value = "";
  document.getElementById("anh_dai_dien").value = "";
  getElement("#tai_khoan").disabled = false;


  document.getElementById("tbAccount").textContent = "";
  document.getElementById("tbName").textContent = "";
  document.getElementById("tbPassword").textContent = "";
  document.getElementById("tbRole").textContent = "";
  document.getElementById("tbImage").textContent = "";
}

document.getElementById("btnThemSP").addEventListener("click", clearModalInputs);


function validate() {
  let isValid = true;

  let tai_khoan = getElement("#tai_khoan").value;
  if (!tai_khoan.trim()) {
    isValid = false;
    getElement("#tbAccount").innerHTML = "Vui lòng nhập tài khoản!";
  } else if (tai_khoan.length < 3 || tai_khoan.length > 10) {
    isValid = false;
    getElement("#tbAccount").innerHTML = "Tài khoản phải có độ dài từ 3 đến 10 ký tự!";
  } else if (!/^[a-zA-Z0-9]+$/.test(tai_khoan)) {
    isValid = false;
    getElement("#tbAccount").innerHTML = "Tài khoản không được chứa ký tự đặc biệt!";
  } else {
    getElement("#tbAccount").innerHTML = "";
  }

  let ho_ten = getElement("#ho_ten").value;

  if (!ho_ten.trim()) {
    isValid = false;
    getElement("#tbName").innerHTML = "Vui lòng nhập họ tên!";
  } else if (!/^[\sa-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/.test(ho_ten)) {
    isValid = false;
    getElement("#tbName").innerHTML = "Họ tên không hợp lệ";
  } else {
    getElement("#tbName").innerHTML = "";
  }

  let mat_khau = getElement("#mat_khau").value;

  if (!mat_khau.trim()) {
    isValid = false;
    getElement("#tbPassword").innerHTML = "Vui lòng nhập mật khẩu!";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|;:'",.<>?/`~[\]\\\-]).{7,}/.test(mat_khau)) {
    isValid = false;
    getElement("#tbPassword").innerHTML = "Mật khẩu phải có ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt và có độ dài ít nhất 7 ký tự!";
  } else {
    getElement("#tbPassword").innerHTML = "";
  }

  let loai_nguoi_dung = getElement("#loai_nguoi_dung").value;

  if (!loai_nguoi_dung.trim()) {
    isValid = false;
    getElement("#tbRole").innerHTML = "Vui lòng nhập loại người dùng!";
  } else if (loai_nguoi_dung !== "user" && loai_nguoi_dung !== "admin") {
    isValid = false;
    getElement("#tbRole").innerHTML = "Loại người dùng không hợp lệ. Chỉ chấp nhận 'user' hoặc 'admin'.";
  } else {
    getElement("#tbRole").innerHTML = "";
  }

  let anh_dai_dien = getElement("#anh_dai_dien").value;
  if (!anh_dai_dien.trim()) {
    isValid = false;
    getElement("#tbImage").innerHTML = "Vui lòng nhập hình ảnh!";
  } else {
    getElement("#tbImage").innerHTML = "";
  }

  
  return isValid;
}

function resetTB(){
  getElement("#tbAccount").textContent = " ";
  getElement("#tbName").textContent = " ";
  getElement("#tbPassword").textContent = " ";
  getElement("#tbRole").textContent = " ";
  getElement("#tbImage").textContent=" ";
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