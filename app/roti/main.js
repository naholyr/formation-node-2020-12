import { server } from "./server.js";
import lipstick from "lipstick";

const port = process.env.PORT;

lipstick.listen(server, port, () => {
  console.log(`Server ready [%s]: http://127.0.0.1:${port}`, process.pid);
});
