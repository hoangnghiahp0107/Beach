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
                user.anh_dai_dien
            );
        });
        renderAccount(users);
    } catch (error) {
        console.log("Lỗi từ máy chủ");
    }
}

async function createAccount() {
    const users = {
      tai_khoan: getElement("#tai_khoan").value,
      mat_khau: getElement("#mat_khau").value,
      ho_ten: getElement("#ho_ten").value,
      anh_dai_dien: getElement("#anh_dai_dien").value
    };
    debugger
    try {
      await apiCreateAccount(users);
      getAccount();
      alert("Tạo tài khoản thành công");
    } catch (error) {
      alert("Tạo tài khoản thất bại");
    }
  }

 function renderAccount(users) {
  const html = users.reduce((result, user, index) => {
    return (
      result +
      `
        <tr>
          <td>${index+1}</td>
          <td>${user.tai_khoan}</td>
          <td>${user.mat_khau}</td>
          <td>${user.ho_ten}</td>
          <td>${user.anh_dai_dien}</td>
          <td style="display: flex">
            <button class="btn btn-primary mx-2" onclick="selectPerson('${user.id}')">Xem</button>
            <button class="btn btn-danger" onclick="deletePerson('${user.id}')">Xoá</button>
          </td>
        </tr>
      `
    );
  }, "");

  document.getElementById("tblDanhSachSP").innerHTML = html;
}
