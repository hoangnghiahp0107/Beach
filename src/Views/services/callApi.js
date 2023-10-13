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

async function apiUpdateUser(userID, user) {
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

async function apiDeleteNew(newID){
  return await axios({
    method: "DELETE",
    url: `${URL}/api/news/delete-new/${newID}`
  })
}

async function apiUpdateNew(newID, news) {
  return await axios({
    method: "PUT",
    url: `${URL}/api/auth/update-new/${newID}`,
    data: news
  });
}
