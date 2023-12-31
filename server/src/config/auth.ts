import { sign } from "jsonwebtoken";
import { User } from "src/entity/User";

export const createAccessToken = (user: User) => {
  return sign(
    {
      userId: user.id,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "1h",
    }
  );
};

export const createRefreshToken = (user: User) => {
  return sign(
    {
      userId: user.id,
      tokenVersion: user.tokenVersion,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};
