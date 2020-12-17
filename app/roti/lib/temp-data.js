export const users = [
  { login: "admin", password: "admin", canAdd: true },
  { login: "user1", password: "test", canAdd: false },
  { login: "user2", password: "test", canAdd: false },
  { login: "user3", password: "test", canAdd: false },
  { login: "user4", password: "test", canAdd: false },
  { login: "user5", password: "test", canAdd: false },
];

export const findUser = (username) =>
  users.find((user) => user.login === username);
