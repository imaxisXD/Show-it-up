function userFetcher(user: string) {
  return `*[_type == "users" && _id == '${user}']`;
}

export default userFetcher;
