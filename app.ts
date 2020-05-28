import {
  App,
} from "https://deno.land/x/alosaur/src/mod.ts";
import { UserArea } from "./areas/user/user.area.ts";
import { client } from "./mysqlconfig.ts";
// Create alosaur application
const app = new App({
  areas: [UserArea],
});

await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
        id int(11) NOT NULL AUTO_INCREMENT,
        name varchar(50) NOT NULL,
        lastName varchar(100) NOT NULL,
        email varchar(100) NOT NULL,
        created_at timestamp not null default current_timestamp,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`);

app.listen();
