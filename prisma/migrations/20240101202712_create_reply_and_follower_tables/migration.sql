-- CreateTable
CREATE TABLE "follower" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "follower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reply" (
    "id" UUID NOT NULL,
    "content" VARCHAR(280) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,
    "tweet_id" UUID NOT NULL,

    CONSTRAINT "reply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "follower" ADD CONSTRAINT "follower_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
