-- CreateTable
CREATE TABLE "compromissos" (
    "id" SERIAL NOT NULL,
    "start_datetime" TIMESTAMPTZ(3) NOT NULL,
    "end_datetime" TIMESTAMPTZ(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "compromissos_pkey" PRIMARY KEY ("id")
);
