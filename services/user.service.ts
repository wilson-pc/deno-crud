import { client } from "../mysqlconfig.ts";
import { UserModel } from "../models/user.ts";

export class UserService {
  async getAll(): Promise<UserModel[]> {
    return await client.query(`select * from users`);
  }
  async getOne(id: number): Promise<UserModel[]> {
    return await client.query(
      "select * from users where id = ?",
      [id],
    );
  }
  async create(user: UserModel) {
    let us = new UserModel();
    us.name = user.name ?? "";
    us.lastName = user.lastName ?? "";
    us.email = user.email ?? "";
    return await client.execute(
      `INSERT INTO users(name,lastName,email) values(?,?,?)`,
      [
        us.name,
        us.lastName,
        us.email,
      ],
    );
  }
  async update(id: number, user: UserModel) {
    let dat = await this.getOne(id);

    let us = new UserModel();
    us.name = user.name ?? dat[0].name;
    us.lastName = user.lastName ?? dat[0].lastName;
    us.email = user.email ?? dat[0].email;
    return await await client.execute(
      `update users set name = ?,lastName=?,email=? where id = ?`,
      [us.name, us.lastName, us.email, id],
    );
  }
  async delete(id: number) {
    return await await client.execute(`delete from users where id = ?`, [id]);
  }
}
