const URL = "http://localhost:8080";

async function apiGetAccount() {
  return await axios({
    method: "GET",
    url: `${URL}/api/auth/get-user`,
  });
}

async function apiCreateAccount(user) {
  return await axios({
    method: "POST",
    url: `${URL}/api/auth/signup`,
    data: user,
  });
}

async function apiLoginAccount(user) {
  return await axios({
    method: "POST",
    url: `${URL}/api/auth/login`,
    data: user,
  });
}




