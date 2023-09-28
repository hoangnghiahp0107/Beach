// Lấy tham chiếu đến các phần tử HTML cần sử dụng
var fullscreenIcon = document.getElementById('fullscreen-icon');
var unityCanvas = document.getElementById('unity-canvas');


// Thêm sự kiện click cho icon phóng to
fullscreenIcon.addEventListener('click', function () {
    if (unityCanvas.classList.contains('fullscreen')) {
        // Nếu trò chơi đang hiển thị full màn hình, hủy chế độ full màn hình
        exitFullscreen();
    } else {
        // Nếu trò chơi không hiển thị full màn hình, bật chế độ full màn hình
        enterFullscreen();
    }
});


// Hàm để bật chế độ full màn hình
function enterFullscreen() {
    if (unityCanvas.requestFullscreen) {
        unityCanvas.requestFullscreen();
    } else if (unityCanvas.mozRequestFullScreen) { // Firefox
        unityCanvas.mozRequestFullScreen();
    } else if (unityCanvas.webkitRequestFullscreen) { // Chrome, Safari, Opera
        unityCanvas.webkitRequestFullscreen();
    } else if (unityCanvas.msRequestFullscreen) { // IE/Edge
        unityCanvas.msRequestFullscreen();
    }
}

// Hàm để hủy chế độ full màn hình
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}

// Sự kiện để theo dõi thay đổi chế độ full màn hình
document.addEventListener('fullscreenchange', function () {
    if (document.fullscreenElement) {
        unityCanvas.classList.add('fullscreen');
        fullscreenIcon.classList.add('hide');
    } else {
        unityCanvas.classList.remove('fullscreen');
        fullscreenIcon.classList.remove('hide');
    }
});

// Sự kiện để theo dõi thay đổi chế độ full màn hình trong Firefox
document.addEventListener('mozfullscreenchange', function () {
    if (document.mozFullScreen) {
        unityCanvas.classList.add('fullscreen');
        fullscreenIcon.classList.add('hide');
    } else {
        unityCanvas.classList.remove('fullscreen');
        fullscreenIcon.classList.remove('hide');
    }
});

// Sự kiện để theo dõi thay đổi chế độ full màn hình trong Chrome, Safari, Opera
document.addEventListener('webkitfullscreenchange', function () {
    if (document.webkitIsFullScreen) {
        unityCanvas.classList.add('fullscreen');
        fullscreenIcon.classList.add('hide');
    } else {
        unityCanvas.classList.remove('fullscreen');
        fullscreenIcon.classList.remove('hide');
    }
});

// Sự kiện để theo dõi thay đổi chế độ full màn hình trong IE/Edge
document.addEventListener('MSFullscreenChange', function () {
    if (document.msFullscreenElement) {
        unityCanvas.classList.add('fullscreen');
        fullscreenIcon.classList.add('hide');
    } else {
        unityCanvas.classList.remove('fullscreen');
        fullscreenIcon.classList.remove('hide');
    }
});
