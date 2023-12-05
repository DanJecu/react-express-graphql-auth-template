import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "./data-source";
import cookieParser from "cookie-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express, { Request, Response } from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { MyContext } from "./context/MyContext";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./config/auth";
import { sendRefreshToken } from "./config/sendRefreshToken";

(async () => {
  const app = express();

  AppDataSource.initialize();

  const apolloServer = new ApolloServer<MyContext>({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
  });

  await apolloServer.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: process.env.CLIENT_ORIGIN,
      credentials: true,
    }),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
    })
  );

  app.use(cookieParser());

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) return res.send({ ok: false, accessToken: "" });

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
      console.log(error);
      return res.send({ ok: false, accessToken: "" });
    }

    const user = await User.findOne({ where: { id: payload.userId } });

    if (!user) return res.send({ ok: false, accessToken: "" });

    if (user.tokenVersion !== payload.tokenVersion)
      res.send({ ok: false, accessToken: "" });
    // Refresh cookie
    sendRefreshToken(res, createRefreshToken(user));
    // Get new access token
    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  app.listen({ port: 4000 }, () => {
    console.log("🚀 Server ready at: http://localhost:4000/graphql");
  });
})();
