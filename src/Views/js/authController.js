function getElement(selector){
  return document.querySelector(selector);
}
document.addEventListener("DOMContentLoaded", function() {
  getAccount();
});


async function getAccount(){
    try {
        const response = await apiGetAccount();
        const users = response.data.map((user)=> {
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
  const taiKhoan = getElement("#tai_khoan").value;
  const matKhau = getElement("#mat_khau").value;
  const hoTen = getElement("#ho_ten").value;
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
    const user = {
      ho_ten: getElement("#ho_ten").value,
      mat_khau: getElement("#mat_khau").value,
      loai_nguoi_dung: getElement("#loai_nguoi_dung"),
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
              <button class="btn btn-primary mx-2" onclick="selectAccount('${user.nguoi_dung_id}')">Xem</button>
              <button class="btn btn-danger" onclick="deleteAccount('${user.nguoi_dung_id}')">Xoá</button>
            </td>
          </tr>
        `
      );
    }, "");
  
    document.getElementById("tblDanhSachSP").innerHTML = html;
  }


  

