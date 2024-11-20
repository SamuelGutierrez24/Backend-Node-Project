import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import User, { UserDocument } from "../models/user.model";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    // Recupera todos los usuarios
  }

  @Mutation(() => User)
  async createUser(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    // Lógica para crear un usuario
  }

  @Mutation(() => Boolean)
  @Authorized("admin") // Solo un "admin" puede borrar usuarios
  async deleteUser(@Arg("id") id: string): Promise<boolean> {
    // Lógica para eliminar un usuario
  }
}
