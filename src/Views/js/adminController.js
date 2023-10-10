import nguoi_dung from "../../Models/nguoi_dung.js";

async function getAccount(){
    try {
        const response = await apiGetAccount();
        const users = response.data.map((user)=> {
            return new nguoi_dung(
                user.nguoi_dung_id,
                user.tai_khoan,
                user.mat_khau,
                user.ho_ten,
                user.anh_dai_dien
            );
        });
        renderPerson(users);
        console.log(users);
    } catch (error) {
        console.log("Lỗi từ máy chủ");
    }
}

async function createAccount() {
    debugger
    const users = {
      tai_khoan: getElement("#tai_khoan").value,
      mat_khau: getElement("#mat_khau").value,
      ho_ten: getElement("#ho_ten").value,
      anh_dai_dien: getElement("#anh_dai_dien").value
    };
    try {
      await apiCreateAccount(users);
      getAccount();
      alert("Tạo tài khoản thành công");
    } catch (error) {
      alert("Tạo tài khoản thất bại");
    }
  }

  function renderPerson(users) {
    const html = users.reduce((result, product, index) => {
      return (
        result +
        `
          <tr>
            <td>${index+1}</td>
            <td>${users.tai_khoan}</td>
            <td>${users.mat_khau}</td>
            <td>${users.ho_ten}</td>
            <td>${users.anh_dai_dien}</td>
            <td>
              <button class="btn btn-primary" onclick="selectPerson('${users.id}')">Xem</button>
              <button class="btn btn-danger" onclick="deletePerson('${users.id}')">Xoá</button>
            </td>
          </tr>
        `
      );
    }, "");
  
    document.getElementById("tblDanhSachSP").innerHTML = html;
  }