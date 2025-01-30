/*
  Warnings:

  - You are about to drop the `TelegramGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `TelegramGroup`;

-- CreateTable
CREATE TABLE `telegramGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupId` BIGINT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `telegramGroup_groupId_key`(`groupId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
