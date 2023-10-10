const URL = "http://localhost:8080";

async function apiCreateAccount(user) {
  return await axios({
    method: "POST",
    url: `${URL}/api/auth/signup`,
    data: user,
  });
}

async function apiGetAccount() {
  return await axios({
    method: "GET",
    url: `${URL}/api/auth/get-user`,
  });
}
