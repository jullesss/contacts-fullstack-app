import { DataSource, DataSourceOptions, Repository } from "typeorm";
import path from "node:path";
import "dotenv/config";
import { User } from "./entities/user.entity";

const DataSourceConfig = (): DataSourceOptions => {
  const entitiesPath = path.join(__dirname, "entities/**.{js,ts}");
  const migrationsPath = path.join(__dirname, "migrations/**.{js,ts}");

  if (!process.env.DATABASE_URL) {
    throw new Error("Env variável DATABASE_URL não existe");
  }

  return {
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationsPath],
  };
};

const AppDataSource: DataSource = new DataSource(DataSourceConfig());

export { AppDataSource };

const userRepo: Repository<User> = AppDataSource.getRepository(User);
/* const contactRepo = AppDataSource.getRepository(Contact)
 */

export { userRepo };
