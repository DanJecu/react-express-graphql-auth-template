import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from "../entity/User";

import { MyContext } from "../context/MyContext";
import { createAccessToken, createRefreshToken } from "../config/auth";
import { isAuth } from "../middleware/isAuth";
import { sendRefreshToken } from "../config/sendRefreshToken";
import { AppDataSource } from "../data-source";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  helloProtectedRoute(@Ctx() { payload }: MyContext) {
    console.log(payload);
    return `your userid is ${payload?.userId}`;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
    await AppDataSource.getRepository(User).increment(
      { id: userId },
      "tokenVersion",
      1
    );
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("login") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("invalid login");
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("invalid login");
    }

    // login successful

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
    };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await hash(password, 12);

    try {
      await User.insert({
        email,
        password: hashedPassword,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
}
