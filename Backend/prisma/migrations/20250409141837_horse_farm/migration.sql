-- CreateEnum
CREATE TYPE "section_enum" AS ENUM ('resources', 'management', 'animal_welfare');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "farms" (
    "id" UUID NOT NULL,
    "fk_user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "zip_code" INTEGER,
    "place" TEXT,
    "person_in_charge" TEXT,

    CONSTRAINT "farms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "id" SERIAL NOT NULL,
    "farm_id" UUID NOT NULL,
    "question_key" TEXT NOT NULL,
    "section" "section_enum" NOT NULL,
    "string_answer" TEXT,
    "string_array_answer" TEXT[],
    "numeric_answer" INTEGER,
    "numeric_array_answer" INTEGER[],
    "file_url" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "farms" ADD CONSTRAINT "farms_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
