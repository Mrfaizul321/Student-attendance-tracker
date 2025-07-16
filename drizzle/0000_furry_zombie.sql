CREATE TABLE `attendance` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentId` int NOT NULL,
	`present` boolean NOT NULL DEFAULT false,
	`day` int NOT NULL,
	`date` varchar(20) NOT NULL,
	CONSTRAINT `attendance_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `grades` (
	`id` int NOT NULL,
	`grade` varchar(10) NOT NULL,
	CONSTRAINT `grades_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(20) NOT NULL,
	`grade` varchar(10) NOT NULL,
	`RollNo` varchar(50) NOT NULL,
	`contact` varchar(11) NOT NULL,
	CONSTRAINT `students_id` PRIMARY KEY(`id`)
);
