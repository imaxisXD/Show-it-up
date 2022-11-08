function userInfoGetter() {
  return localStorage.getItem("userDetails") !== undefined
    ? JSON.parse(localStorage.getItem("userDetails") || "{}")
    : localStorage.clear();
}
export default userInfoGetter;
