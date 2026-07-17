CREATE TABLE `library_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`kind` text NOT NULL,
	`hanzi` text DEFAULT '' NOT NULL,
	`romanization` text DEFAULT '' NOT NULL,
	`title` text DEFAULT '' NOT NULL,
	`author` text DEFAULT '' NOT NULL,
	`era` text DEFAULT '' NOT NULL,
	`body` text DEFAULT '' NOT NULL,
	`translation` text DEFAULT '' NOT NULL,
	`meaning` text DEFAULT '' NOT NULL,
	`tone_pattern` text DEFAULT '' NOT NULL,
	`tags` text DEFAULT '' NOT NULL,
	`source` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
