const URL = "http://localhost:8080";

async function apiGetAccount() {
  return await axios({
    method: "GET",
    url: `${URL}/api/auth/get-user`,
  });
}

async function apiGetUserID(userID) {
  return await axios({
    method: "GET",
    url: `${URL}/api/auth/user-id/${userID}`
  })
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

async function apiDeleteAccount(userID){
  return await axios({
    method: "DELETE",
    url: `${URL}/api/auth/delete-user/${userID}`
  })
}

async function apiUpdateAccount(userID, user) {
  return await axios({
    method: "PUT",
    url: `${URL}/api/auth/update-user/${userID}`,
    data: user
  });
}

async function apiGetNews() {
  return await axios({
    method: "GET",
    url: `${URL}/api/news/get-news`,
  });
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

async function apiGetSearchName(name){
  return await axios({
    method: "GET",
    url: `${URL}/api/news/get-search-name/${name}`
  })
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
  return await axios({
    method: "GET",
    url: `${URL}/api/comment/get-comment`,
  });
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
  return await axios({
    method: "GET",
    url: `${URL}/api/image/get-images`,
  });
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

