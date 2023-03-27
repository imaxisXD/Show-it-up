function userInfoGetter() {
  return localStorage.getItem("userDetails") !== null
    ? JSON.parse(localStorage.getItem("userDetails") || "{}")
    : null;
}
export default userInfoGetter;
