/*
  Warnings:

  - You are about to drop the column `clicks` on the `urls` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_urls" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shortUrlId" TEXT NOT NULL,
    "longUrl" TEXT NOT NULL,
    "shortURL" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visits" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_urls" ("createdAt", "id", "longUrl", "shortURL", "shortUrlId") SELECT "createdAt", "id", "longUrl", "shortURL", "shortUrlId" FROM "urls";
DROP TABLE "urls";
ALTER TABLE "new_urls" RENAME TO "urls";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
