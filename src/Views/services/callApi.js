const URL = "http://localhost:8080";

async function apiGetAccount() {
  try {
    const localStorageToken = localStorage.getItem("localStorageToken"); 
    const response = await axios({
      method: "GET",
      url: `${URL}/api/auth/get-user`,
      headers: {
        token: `${localStorageToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    window.location.href = "error.html"; 
    throw error;
  }
}


async function apiGetUserID(userID) {
  try {
    const localStorageToken = localStorage.getItem("localStorageToken");
    const response = await axios({
      method: "GET",
      url: `${URL}/api/auth/user-id/${userID}`,
      headers: {
        token: localStorageToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

async function apiCreateAccount(user) {
  return await axios({
    method: "POST",
    url: `${URL}/api/auth/signup`,
    data: user
  });
}

async function apiLoginAccount(user) {
  return await axios({
    method: "POST",
    url: `${URL}/api/auth/login`,
    data: user
  });
}

async function apiLogout(token) {
  try {
    const response = await axios({
      method: 'POST',
      url: `${URL}/api/auth/logout`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (response.status === 200) {
      console.log('Đã đăng xuất thành công');
    } else {
      console.log('Đăng xuất không thành công');
    }
  } catch (error) {
    console.error('Lỗi trong quá trình xử lý đăng xuất', error);
  }
}

async function apiDeleteAccount(userID) {
  try {
    const localStorageToken = localStorage.getItem("localStorageToken");
    const response = await axios({
      method: "DELETE",
      url: `${URL}/api/auth/delete-user/${userID}`,
      headers: {
        token: localStorageToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user account:", error);
    throw error;
  }
}

async function apiUpdateAccount(userID, user) {
  try {
    const localStorageToken = localStorage.getItem("localStorageToken");
    const response = await axios({
      method: "PUT",
      url: `${URL}/api/auth/update-user/${userID}`,
      data: user,
      headers: {
        token: localStorageToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user account:", error);
    throw error;
  }
}

async function apiGetNewsIndex() {
  return await axios({
    method: "GET",
    url: `${URL}/api/news/get-news-index`,
  });
}

async function apiGetNews() {
  try {
    const localStorageToken = localStorage.getItem("localStorageToken"); 
    const response = await axios({
      method: "GET",
      url: `${URL}/api/news/get-news`,
      headers: {
        token: `${localStorageToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    window.location.href = "error.html"; 
    throw error;
  }
}

async function apiCreateNews(news) {
  return await axios({
    method: "POST",
    url: `${URL}/api/news/create-news`,
    data: news
  });
}

async function apiGetNewsID(newID){
  return await axios({
    method: "GET",
    url: `${URL}/api/news/new-id/${newID}`
  })
}

async function apiGetSearchName(name) {
  try {
      const response = await axios({
          method: "GET",
          url: `${URL}/api/news/get-search-name/${name}`
      });
      return response;
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
  }
}


async function apiDeleteNew(newID){
  return await axios({
    method: "DELETE",
    url: `${URL}/api/news/delete-new/${newID}`
  })
}

async function apiUpdateNew(newID, news) {
  return await axios({
    method: "PUT",
    url: `${URL}/api/news/update-new/${newID}`,
    data: news
  });
}

async function apiGetComment() {
  try {
    const localStorageToken = localStorage.getItem("localStorageToken"); 
    const response = await axios({
      method: "GET",
      url: `${URL}/api/comment/get-comment`,
      headers: {
        token: `${localStorageToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    window.location.href = "error.html"; 
    throw error;
  }
}

async function apiCreateComment(comment) {
  return await axios({
    method: "POST",
    url: `${URL}/api/comment/create-comment`,
    data: comment
  });
}

async function apiGetCommentID(commentID){
  return await axios({
    method: "GET",
    url: `${URL}/api/comment/get-comment-id/${commentID}`
  })
}

async function apiGetCommentDetails(baoID){
  return await axios({
    method: "GET",
    url: `${URL}/api/comment/get-comment-details/${baoID}`
  })
}

async function apiDeleteComment(commentID){
  return await axios({
    method: "DELETE",
    url: `${URL}/api/comment/delete-comment/${commentID}`
  })
}

async function apiUpdateComment(commentID, comment) {
  return await axios({
    method: "PUT",
    url: `${URL}/api/comment/update-comment/${commentID}`,
    data: comment
  });
}

async function apiGetImage() {
  try {
    const localStorageToken = localStorage.getItem("localStorageToken"); 
    const response = await axios({
      method: "GET",
      url: `${URL}/api/image/get-images`,
      headers: {
        token: `${localStorageToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    window.location.href = "error.html"; 
    throw error;
  }
}

async function apiGetImgID(imageID){
  return await axios({
    method: "GET",
    url: `${URL}/api/image/get-img-id/${imageID}`
  })
}

async function apiDeleteImage(imageID){
  return await axios({
    method: "DELETE",
    url: `${URL}/api/image/delete-image/${imageID}`
  })
}

async function apiCreateImg(image) {
  try {
    const response = await axios.post(`${URL}/api/image/upload`, image);
    return response.data;
  } catch (error) {
    console.error('Error during image upload:', error);
    throw error; 
  }
}

async function apiUpdateImg(imageID, images) {
  return await axios({
    method: "PUT",
    url: `${URL}/api/image/update-image/${imageID}`,
    data: images
  });
}



