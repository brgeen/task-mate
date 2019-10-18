CREATE TABLE to_do_list(
   id serial PRIMARY KEY,
   task VARCHAR NOT NULL,
   complete VARCHAR (5) NOT NULL,
   created_on TIMESTAMP NOT NULL,
);