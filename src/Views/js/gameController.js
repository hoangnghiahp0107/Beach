if (localStorage.getItem('localStorageToken')) {
    // Nếu có dữ liệu, chuyển đến trang user.html
    document.getElementById('account-link').href = '../../../Views/layout/user.html';
} else {
    // Nếu không có dữ liệu, chuyển đến trang login.html
    document.getElementById('account-link').href = '../../../Views/layout/login.html';
}