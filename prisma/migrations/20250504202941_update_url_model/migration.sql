/*
  Warnings:

  - You are about to alter the column `clicks` on the `urls` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

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
    "clicks" INTEGER
);
INSERT INTO "new_urls" ("clicks", "createdAt", "id", "longUrl", "shortURL", "shortUrlId") SELECT "clicks", "createdAt", "id", "longUrl", "shortURL", "shortUrlId" FROM "urls";
DROP TABLE "urls";
ALTER TABLE "new_urls" RENAME TO "urls";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
