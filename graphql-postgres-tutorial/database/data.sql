INSERT INTO team ("name")
  VALUES
    ('lakers'),
    ('nuggets'),
    ('celtics');

INSERT INTO player ("first_name", "last_name", "team_id")
  VALUES
    ('kobe', 'bryant', 1),
    ('Shaquille', 'O'' Neal', 1),
    ('1st nuggets', 'player1', 2),
    ('2nd nuggets', 'player2', 2),
    ('1st celtics', 'player1', 3),
    ('2nd celtics', 'players2', 3);

INSERT INTO match ("date", "winner_team_id", "loser_team_id")
  VALUES
    ('04/12/96', 1, 2),
    ('04/12/96', 2, 3),
    ('04/12/96', 1, 3);
