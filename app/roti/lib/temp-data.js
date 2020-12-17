import { v4 as uuid } from "uuid";

const users = [
  { login: "admin", password: "admin", canAdd: true },
  { login: "user1", password: "test", canAdd: false },
  { login: "user2", password: "test", canAdd: false },
  { login: "user3", password: "test", canAdd: false },
  { login: "user4", password: "test", canAdd: false },
  { login: "user5", password: "test", canAdd: false },
];

const rotis = [
  {
    id: uuid(),
    title: "Les bases de la théories",
    ranking: 2,
    feedbacks: [
      { ranking: 2, comment: "Un peu basique", user: "user1" },
      { ranking: 1, comment: "Trop théorique", user: "user2" },
      { ranking: 4, comment: "Très théorique", user: "user3" },
    ],
  },
  {
    id: uuid(),
    title: "Augmentations",
    ranking: 4,
    feedbacks: [
      { ranking: 4, comment: "J'aime mon boss", user: "user2" },
      {
        ranking: 4,
        comment: "C'était très intéressant (on reçoit quand le pognon ?)",
        user: "user3",
      },
      { ranking: 4, comment: null, user: "user4" },
    ],
  },
  {
    id: uuid(),
    title: "Télé-travail",
    ranking: 3,
    feedbacks: [
      { ranking: 3, comment: "On aurait pu faire ça en visio", user: "user2" },
    ],
  },
];

export const findUser = async (username) =>
  users.find((user) => user.login === username);

export const listRotis = async () => rotis;

export const addRoti = async (title) => {
  const roti = { id: uuid(), title, ranking: null, feedbacks: [] };
  rotis.push(roti);
  return roti;
};

export const findRoti = async (id) => rotis.find((r) => r.id === id);

export const addFeedback = async (id, ranking, comment = null) => {
  const roti = await findRoti(id);
  if (!roti) {
    throw new Error("ROTI_NOT_FOUND");
  }
  const feedback = { ranking, comment };
  roti.feedbacks.push(feedback);
  roti.ranking = Math.round(
    roti.feedbacks.reduce((n, f) => n + f.ranking, 0) / roti.feedbacks.length
  );
  return roti;
};

export const deleteRoti = async (id) => {
  const index = rotis.findIndex((r) => r.id === id);
  if (index === -1) {
    throw new Error("ROTI_NOT_FOUND");
  }
  rotis.splice(index, 1);
};
