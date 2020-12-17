import { findUser } from "../temp-data.js";

export const loginHandler = (req, res) => {
  // content-type = 'application/x-www-form-urlencoded
  // username=user1&password=test

  /*
  (value) => result;
  (value) => {
    return result;
  };
  */

  // Falsie: null, undefined, false, '', 0

  let foundUser = findUser(req.body.username);
  if (foundUser.password !== req.body.password) {
    foundUser = null;
  }

  if (foundUser) {
    req.session.username = foundUser.login;
    req.session.password = foundUser.password;
  }

  res.render("home", {
    errorMessage: foundUser ? "" : "user not found !",
    authenticated: Boolean(foundUser), // boolean
    username: foundUser?.login, // string | undefined
    canAdd: foundUser?.canAdd, // boolean | undefined
    rotis: [
      { title: "Réunion du matin, chagrin", note: 1, id: 1 },
      { title: "Qu’est-ce qu’on mange ?", note: 4, id: 2 },
    ],
  });
};
