function getElement(selector) {
    return document.querySelector(selector);
}

async function createUser() {
    const taiKhoan = getElement("#tai_khoan").value;
    const hoTen = getElement("#ho_ten").value;
    const matKhau = getElement("#mat_khau").value;
    const nhapLaiMK = getElement("#nhap_lai_mk").value;
  
    if (matKhau !== nhapLaiMK) {
      Swal.fire('Mật khẩu nhập lại không trùng khớp', '', 'error');
      return;
    }
  
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

  

async function loginAccount() {
    const taiKhoan = getElement("#tai_khoan_login").value;
    const matKhau = getElement("#mat_khau_login").value;
  
    try {
      const response = await apiLoginAccount({
        tai_khoan: taiKhoan,
        mat_khau: matKhau,
      });
  
      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem("accessToken", token);
  
        Swal.fire('Đăng nhập thành công', '', 'success').then(() => {
          window.location.href = "/src/Views/index.html";
        });
      } else if (response.status === 400) {
        Swal.fire('Tài khoản hoặc mật khẩu không đúng', '', 'error');
      } else {
        Swal.fire('Lỗi không xác định', '', 'error');
      }
    } catch (error) {
      Swal.fire('Lỗi khi gửi yêu cầu', '', 'error');
      console.error(error);
    }
  }

  
  