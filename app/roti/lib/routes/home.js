import { findUser, listRotis } from "../temp-data.js";

export const homeHandler = async (req, res) => {
  const { username } = req.session;
  const user = await findUser(username);
  const rotis = await listRotis();

  const errorMessage = req.session.homeErrorMessage;
  delete req.session.homeErrorMessage; // One-time usage variable

  /*
  const roti = rotis[0];
  const addedFeedback = roti.feedbacks.find((f) => f.user === "user1");
  const canAddFeedback = !addedFeedback;
  res.render("roti", { roti, addedFeedback, canAddFeedback });
  */

  /*
  res.render("roti-new", { errorMessage });
  */

  res.render("home", {
    errorMessage,
    authenticated: Boolean(user),
    username,
    canAdd: user?.canAdd,
    rotis,
  });
};
