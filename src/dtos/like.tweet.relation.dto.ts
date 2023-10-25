import { Like, Tweet } from "@prisma/client";

export interface LikeWithTweetRelation extends Like {
  tweet: Tweet;
}
