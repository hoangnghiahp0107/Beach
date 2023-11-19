const selectImage = document.querySelector('.select-image');
const inputFile = document.querySelector('#file');
const imgArea = document.querySelector('.img-area');

selectImage.addEventListener('click', function () {
	inputFile.click();
})

inputFile.addEventListener('change', function () {
	const image = this.files[0]
	if(image.size < 2000000) {
		const reader = new FileReader();
		reader.onload = ()=> {
			const allImg = imgArea.querySelectorAll('img');
			allImg.forEach(item=> item.remove());
			const imgUrl = reader.result;
			const img = document.createElement('img');
			img.src = imgUrl;
			imgArea.appendChild(img);
			imgArea.classList.add('active');
			imgArea.dataset.img = image.name;
		}
		reader.readAsDataURL(image);
	} else {
		alert("Image size more than 2MB");
	}
})


function myFunction() {
	
  var x = document.getElementById("myDIV");

  if (x.style.display === "none") {
	x.style.display = "block";
	
} else {
	x.style.display = "none";
	
  }
} 



  
function myFunction1() {
	const iconElement = document.getElementById('angleRightIcon');
  const passwordElement = document.getElementById("password");
  const passwordContainer = document.getElementById("myDIV122");

  if (passwordContainer.style.display === "none") {
    passwordContainer.style.display = "block";
    iconElement.classList.remove("fa-solid fa-angle-right");
    iconElement.classList.add("fa-solid fa-angle-down");
    passwordElement.type = "password";
  } else {
    passwordContainer.style.display = "none";
    iconElement.classList.remove("fa-solid fa-angle-down");
    iconElement.classList.add("fa-solid fa-angle-right");
    passwordElement.type = "text";
  }
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