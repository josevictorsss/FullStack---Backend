import { AddressInfo } from "net";
import { app } from "./app";

const { PORT = 3333 } = process.env;

const server = app.listen(PORT, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running in http://localhost:${PORT}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
