document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const newID = urlParams.get('bao_id');
    if (newID) {
        getNewsID(newID);
        getCommentsDetails(newID);
    }
});

async function getNewsID(newID) {
    try {
        const response = await apiGetNewsID(newID);
        if (Array.isArray(response.data)) {
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
            renderNewsID(news);
        } else if (typeof response.data === 'object') {
            const news = [response.data]; 
            renderNewsID(news);
        } else {
            console.error("Invalid data structure: response.data is not an array or object.");
        }
    } catch (error) {
        console.log("Lỗi từ máy chủ");
        console.error(error);
    }
}

async function getCommentsDetails(newID) {
    try {
        const response = await apiGetCommentDetails(newID);
        if (Array.isArray(response.data)) {
            const news = response.data.map((product) => {
                return new Comment(
                    product.binh_luan_id,
                    product.nguoi_dung_id,
                    product.bao_id,
                    product.ngay_binh_luan,
                    product.noi_dung,
                    product.nguoi_dung
                );
            });
            renderComment(news);
        } else if (typeof response.data === 'object') {
            const news = [response.data]; 
            renderComment(news);
        } else {

        }
    } catch (error) {
        console.log("Lỗi từ máy chủ");
        console.error(error);
    }
}

async function deleteComment(commentID) {
    const willDelete = await Swal.fire({
      title: "Bạn có muốn xóa bình luận?",
      text: "Nhấn OK để xác nhận xóa bình luận.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Hủy",
    });
  
    if (willDelete.isConfirmed) {
      try {
        await apiDeleteComment(commentID);
        Swal.fire('Xóa bình luận thành công', '', 'success').then(() => {
          window.location.reload();
        });
      } catch (error) {
        Swal.fire('Xóa bình luận thất bại', '', 'error');
      }
    }
  }

function renderNewsID(news) {
    const html = news.reduce((result, product) => {
        const duongDanHinh = product.hinh && product.hinh.duong_dan ? product.hinh.duong_dan : '';
        return (
            result +
            ` 
                <div class="container details">
                    <h2 class="title-details">${product.tieu_de_bao}</h2>
                    <img class="card-image hinhAnh" src="../../../public/img/${duongDanHinh}" alt="Hình ảnh">
                    <h5 class="content-news">${product.noi_dung}</h5>
                </div>
            `
        );
    }, "");
    document.getElementById("newspaperid").innerHTML = html;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

async function taoComment() {
    const noi_dung = getElement("#noi_dung").value;
    const localStorageToken = localStorage.getItem('localStorageToken');
    if (!localStorageToken) {
        window.location.href = 'login.html';
        return;
    }
    const decodedToken = localStorageToken ? JSON.parse(atob(localStorageToken.split('.')[1])) : null;
    const nguoi_dung_id = decodedToken && decodedToken.data && decodedToken.data.nguoi_dung_id;
    const currentDateTime = new Date();
    const year = currentDateTime.getFullYear();
    const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
    const day = String(currentDateTime.getDate()).padStart(2, '0');
    const hours = String(currentDateTime.getHours()).padStart(2, '0');
    const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
    const urlParams = new URLSearchParams(window.location.search);
    const bao_id = urlParams.get('bao_id');
    const ngay_binh_luan = `${year}-${month}-${day}T${hours}:${minutes}`;
  
    const comments = {
      nguoi_dung_id,
      ngay_binh_luan,
      noi_dung,
      bao_id
    };
  
    const willCreate = await Swal.fire({
      title: "Bạn có muốn thêm bình luận?",
      text: "Nhấn OK để xác nhận thêm bình luận.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Hủy",
    });
  
    if (willCreate.isConfirmed) {
      try {
        await apiCreateComment(comments);
        Swal.fire('Thêm bình luận thành công', '', 'success').then(() => {
          location.reload();
        });
      } catch (error) {
        Swal.fire('Thêm bình luận thất bại', '', 'error');
      }
    }
  }
  

function renderComment(news) {
    const tokenFromLocalStorage = localStorage.getItem('localStorageToken');
    const decodedToken = tokenFromLocalStorage ? JSON.parse(atob(tokenFromLocalStorage.split('.')[1])) : null;

    news.forEach(product => {
        const duongDanHinh = product.nguoi_dung && product.nguoi_dung.anh_dai_dien ? product.nguoi_dung.anh_dai_dien : '';
        if (!duongDanHinh) {
            duongDanHinh = 'ys.jpg';
        }

        const isUserComment = decodedToken && decodedToken.data && decodedToken.data.nguoi_dung_id === product.nguoi_dung_id;

        const section = document.createElement('section');
        section.id = 'cm_part';
        section.innerHTML = `
            <div class="container mt-5">
                <div class="d-flex justify-content-center row">
                    <div class="col-md-8">
                        <div class="bg-white p-2">
                            <img src="../../../public/img/${duongDanHinh}" alt="Hình ảnh" width="60" class="rounded-circle">
                            <div class="d-flex flex-row user-info"> 
                                <div class="d-flex flex-column justify-content-start ml-2" style="float: right; width: 93%;">
                                    <p class="d-block font-weight-bold name">${product.nguoi_dung.ho_ten}</p>
                                    <p class="d-block date">${formatDate(product.ngay_binh_luan)}</p>
                                    <div class="button-edit-delete">
                                        ${isUserComment ? 
                                            `<button class="btn btn-danger btn-sm shadow-none" type="button" onclick="deleteComment('${product.binh_luan_id}')"><i class="fa-solid fa-x"></i></button>` : ''}
                                        ${isUserComment ? 
                                            `<button class="btn btn-success btn-sm shadow-none" type="button" onclick="selectComment('${product.binh_luan_id}')"><i class="fa-solid fa-pen-to-square"></i></button>` : ''}
                                    </div>
                                    <div class="mt-2">
                                        <p id="noi_dung_${product.binh_luan_id}" class="comment-text">${product.noi_dung}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById("comment").appendChild(section);
    });
}

async function selectComment(commentID) {
    try {
        const response = await apiGetCommentID(commentID);
        const comment = response.data;
        const noiDungElement = document.getElementById(`noi_dung_${commentID}`);
        if (noiDungElement) {
            noiDungElement.innerHTML = `
                <textarea id="noi_dung_${commentID}" class="form-control">${comment.noi_dung}</textarea>
                <button class="btn btn-success mt-2" onclick="updateComment('${commentID}')" style="width: 100px;">Xác nhận</button>
            `;
        } else {
            alert("Không tìm thấy phần tử có id='noi_dung'");
        }
    } catch (error) {
        alert("Lấy thông tin bình luận thất bại");
    }
}

async function updateComment(commentID) {
    const noi_dung = getElement(".form-control").value;
    const localStorageToken = localStorage.getItem('localStorageToken');
    const decodedToken = localStorageToken ? JSON.parse(atob(localStorageToken.split('.')[1])) : null;
    const nguoi_dung_id = decodedToken && decodedToken.data && decodedToken.data.nguoi_dung_id;
    const currentDateTime = new Date();
    const year = currentDateTime.getFullYear();
    const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
    const day = String(currentDateTime.getDate()).padStart(2, '0');
    const hours = String(currentDateTime.getHours()).padStart(2, '0');
    const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
    const urlParams = new URLSearchParams(window.location.search);
    const bao_id = urlParams.get('bao_id');
    const ngay_binh_luan = `${year}-${month}-${day}T${hours}:${minutes}`;
    const comment = {
        nguoi_dung_id,
        bao_id,
        ngay_binh_luan,
        noi_dung
    };

    const willUpdate = await Swal.fire({
        title: "Bạn có muốn cập nhật bình luận?",
        text: "Nhấn OK để xác nhận cập nhật.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Hủy",
    });

    if (willUpdate.isConfirmed) {
        try {
            await apiUpdateComment(commentID, comment);
            Swal.fire('Cập nhật bình luận thành công', '', 'success').then(() => {
                location.reload();
            });
        } catch (error) {
            Swal.fire('Cập nhật bình luận thất bại', '', 'error');
        }
    }
}

if (localStorage.getItem('localStorageToken')) {
    document.getElementById('account-link').href = 'user.html';
} else {
    document.getElementById('account-link').href = 'login.html';
}

function getElement(selector) {
    return document.querySelector(selector);
}