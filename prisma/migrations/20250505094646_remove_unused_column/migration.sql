/*
  Warnings:

  - You are about to drop the column `shortURL` on the `urls` table. All the data in the column will be lost.
  - You are about to drop the column `shortUrlId` on the `urls` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_urls" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "longUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visits" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_urls" ("createdAt", "id", "longUrl", "visits") SELECT "createdAt", "id", "longUrl", "visits" FROM "urls";
DROP TABLE "urls";
ALTER TABLE "new_urls" RENAME TO "urls";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
