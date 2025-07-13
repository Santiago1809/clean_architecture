import { MONGO_DB_NAME, MONGO_URL, PORT } from "./config/envs";
import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: MONGO_URL!,
    dbName: MONGO_DB_NAME!,
  }).then(() => {
    new Server({ port: Number(PORT), routes: AppRoutes.routes }).start();
  });
}
