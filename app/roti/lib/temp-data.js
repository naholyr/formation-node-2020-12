import { v4 as uuid } from "uuid";
import Redis from "ioredis";

const client = new Redis({ host: "127.0.0.1", port: 6379 });

const users = [
  { login: "admin", password: "admin", canAdd: true },
  { login: "user1", password: "test", canAdd: false },
  { login: "user2", password: "test", canAdd: false },
  { login: "user3", password: "test", canAdd: false },
  { login: "user4", password: "test", canAdd: false },
  { login: "user5", password: "test", canAdd: false },
  { login: "nchambrier", password: "test", canAdd: true },
  { login: "marwa", password: "test", canAdd: true },
];

export const findUser = async (username) =>
  users.find((user) => user.login === username);

// type Feedback = { user: string, comment: ?string, ranking: number }
// type Roti = { id: string, title: string, ranking?: number, feedbacks: Feedback[] }

// Modèle de donnée cible:
/*
ids = List<id> (id du roti)
r:$id:t = string (titre de mon roti)
r:$id:f = List<string> (user)
r:$id:f:$user = string (json du feedback)
*/

// Modèle de donnée temporaire:
/*
ids = List<id>
r:$id = string (JSON du roti, feedbacks inclus)
*/

// () => Array<Roti>
export const listRotis = async () => {
  const ids = await client.lrange("ids", 0, -1); // Array<id: string>
  const idList = ids.map((id) => `r:${id}`); // Array<key: string>
  const listRotisJson = await client.mget(idList); // Array<rotiJson: string>
  return listRotisJson.map((rotiJson) => JSON.parse(rotiJson)); // Array<roti: object>
};

// (title: string) => Roti
export const addRoti = async (title) => {
  if (!title || title.length < 5) {
    throw new Error("ROTI_TITLE_TOO_SHORT");
  }
  const roti = { id: uuid(), title, ranking: null, feedbacks: [] };
  await client.lpush("ids", roti.id);
  await client.set(`r:${roti.id}`, JSON.stringify(roti));
  return roti;
};

export const findRoti = async (id) => {
  //rotis.find((r) => r.id === id);
  const roti = await client.get(`r:${id}`); // json: string
  return JSON.parse(roti); // object
};

export const addFeedback = async ({ id, user, ranking, comment = null }) => {
  const roti = await findRoti(id);
  if (!roti) {
    throw new Error("ROTI_NOT_FOUND");
  }
  if (roti.feedbacks.some((f) => f.user === user)) {
    throw new Error("ROTI_FEEDBACK_ALREADY_EXIST");
  }
  if (!user) {
    throw new Error("ROTI_FEEDBACK_USER_REQUIRED");
  }
  if (ranking !== 1 && ranking !== 2 && ranking !== 3 && ranking !== 4) {
    throw new Error("ROTI_FEEDBACK_INVALID_RANKING");
  }
  const feedback = { ranking, comment, user };
  roti.feedbacks.push(feedback);
  roti.ranking = Math.round(
    roti.feedbacks.reduce((n, f) => n + f.ranking, 0) / roti.feedbacks.length
  );
  await client.set(`r:${id}`, JSON.stringify(roti));
  return roti;
};

export const deleteRoti = async (id) => {
  await client.lrem("ids", 0, id);
  await client.del(`r:${id}`);
};
