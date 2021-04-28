import { AddressInfo } from "net";
import { app } from "./app";

const server = app.listen(3333, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
