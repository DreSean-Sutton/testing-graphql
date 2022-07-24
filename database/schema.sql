set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE team (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255)
);
CREATE TABLE public.player (
 id SERIAL PRIMARY KEY,
 first_name VARCHAR (255),
 last_name VARCHAR (255),
 team_id INT NOT NULL REFERENCES team (id)
);
CREATE TABLE public.match (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  winner_team_id INT NOT NULL REFERENCES team (id),
  loser_team_id INT NOT NULL REFERENCES team (id)
);
