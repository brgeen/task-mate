CREATE TABLE to_do_list(
   id serial PRIMARY KEY,
   task VARCHAR NOT NULL,
   complete BOOLEAN NOT NULL
);


INSERT INTO to_do_list("task", "complete")
VALUES
   ('clean bathroom', 'false');

UPDATE to_do_list
SET "complete" = FALSE
WHERE "id" = '2';