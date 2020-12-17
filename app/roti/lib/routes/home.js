import { findUser } from "../temp-data.js";

export const homeHandler = (req, res) => {
  const { username } = req.session;
  const user = findUser(username);

  res.render("home", {
    errorMessage: null,
    authenticated: Boolean(user),
    username,
    canAdd: user?.canAdd,
    rotis: [
      { title: "Réunion du matin, chagrin", note: 1, id: 1 },
      { title: "Qu’est-ce qu’on mange ?", note: 4, id: 2 },
    ],
  });
};
