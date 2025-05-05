-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_urls" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shortUrlId" TEXT,
    "longUrl" TEXT NOT NULL,
    "shortURL" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visits" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_urls" ("createdAt", "id", "longUrl", "shortURL", "shortUrlId", "visits") SELECT "createdAt", "id", "longUrl", "shortURL", "shortUrlId", "visits" FROM "urls";
DROP TABLE "urls";
ALTER TABLE "new_urls" RENAME TO "urls";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
