import { addFeedback, addRoti, findRoti } from "../temp-data.js";

export const newRotiHandler = async (req, res) => {
  // const errorMessage = req.flash("homeErrorMessage"); // TODO API Flash variable in middleware
  const errorMessage = req.session.errorMessage;
  delete req.session.errorMessage; // One-time usage variable

  res.render("roti-new", {
    errorMessage,
  });
};

export const postRotiHandler = async (req, res) => {
  try {
    const roti = await addRoti(req.body.title);
    process.emit("broadcastWSEvent", "home", "newRoti", roti);
    console.log("New roti added: ", roti);
    res.redirect("/");
  } catch (error) {
    req.session.errorMessage = error.message;
    res.redirect("/roti-new");
  }
};

export const findRotiHandler = async (req, res) => {
  const errorMessage = req.session.errorMessage;
  delete req.session.errorMessage; // One-time usage variable
  const successMessage = req.session.successMessage;
  delete req.session.successMessage; // One-time usage variable

  const roti = await findRoti(req.params.id);
  if (!roti) {
    req.session.homeErrorMessage = "ROTI NOT FOUND!";
    res.redirect("/");
    return;
  }

  const addedFeedback = roti.feedbacks.find(
    (f) => f.user === req.session.username
  );
  const canAddFeedback = req.session.username && !addedFeedback;

  res.render("roti", {
    roti,
    addedFeedback,
    canAddFeedback,
    errorMessage,
    successMessage,
  });
};

export const addFeedBackHander = async (req, res) => {
  try {
    const feedBackData = {
      id: req.params.id,
      user: req.session.username,
      ranking: Number(req.body.ranking),
      comment: req.body.comment,
    };
    const roti = await addFeedback(feedBackData);
    console.log("Roti updated: ", roti);
    req.session.successMessage = "FEEDBACK ADDED ! ";
    process.emit(
      "broadcastWSEvent",
      "roti-" + roti.id,
      "newFeedback",
      roti.feedbacks[roti.feedbacks.length - 1]
    );
    res.redirect("/roti/" + req.params.id);
  } catch (error) {
    req.session.errorMessage = error.message;
    res.redirect("/roti/" + req.params.id);
  }
};
