import {
  Controller,
  Get,
  Post,
  Param,
  Area,
  Body,
  Put,
  Delete,
  Req,
  App,
} from "https://deno.land/x/alosaur/src/mod.ts";
import { client } from "./mysqlcongig.ts";

@Controller("/users")
export class HomeController {
  @Get("/get")
  async getUsers() {
    return await client.query(`select * from users`);
  }
  @Get("/one/:id")
  async one(@Param("id") id: number) {
    //  let id = request.url.split("/")[request.url.split("/").length - 1];
    return await client.query("select * from users where id = ?", [id]);
  }
  @Post("/create")
  async create(@Req() request: any, @Body() body: any) {
    //console.log(await request);
    return await client.execute(`INSERT INTO users(name) values(?)`, [
      body.name,
    ]);
  }
  @Delete("/delete/:id")
  async delete(@Param("id") id: number) {
    //console.log(await request);
    return await await client.execute(`delete from users where id = ?`, [id]);
  }
  @Put("/update/:id")
  async update(@Param("id") id: number, @Body() body: any) {
    //console.log(await request);
    return await await client.execute(
      `update users set name = ? where id = ?`,
      [body.name, id]
    );
  }
}

// Declare module
@Area({
  controllers: [HomeController],
})
export class HomeArea {}

// Create alosaur application
const app = new App({
  areas: [HomeArea],
});

await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
        id int(11) NOT NULL AUTO_INCREMENT,
        name varchar(100) NOT NULL,
        created_at timestamp not null default current_timestamp,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`);

app.listen();
