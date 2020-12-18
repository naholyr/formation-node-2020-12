import { v4 as uuid } from "uuid";
import Redis from "ioredis";

const client = new Redis({ host: "127.0.0.1", port: 6379 });

await client.flushall();

await Promise.all(
  [
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
        {
          ranking: 3,
          comment: "On aurait pu faire ça en visio",
          user: "user2",
        },
      ],
    },
  ].map(async (roti) => {
    await client.set("r:" + roti.id, JSON.stringify(roti));
    await client.rpush("ids", roti.id);
  })
);

await client.quit();

console.log("OK");

process.exit(0);
