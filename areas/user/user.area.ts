import { Area, container } from "https://deno.land/x/alosaur/src/mod.ts";
import { UserController } from "./user.controller.ts";

@Area({
  baseRoute: "/api/users",
  controllers: [UserController],
})
export class UserArea {
}
