import { findUser } from "../temp-data.js";

export const loginHandler = async (req, res) => {
  // content-type = 'application/x-www-form-urlencoded
  // username=user1&password=test

  /*
  (value) => result;
  (value) => {
    return result;
  };
  */

  // Falsie: null, undefined, false, '', 0

  let foundUser = await findUser(req.body.username);
  if (foundUser.password !== req.body.password) {
    foundUser = null;
  }

  if (foundUser) {
    req.session.username = foundUser.login;
    req.session.password = foundUser.password;
  }

  // "Flash" variable
  if (!foundUser) {
    req.session.homeErrorMessage = "User not found!";
  }

  res.redirect("/");
};
