from flask import Flask, render_template, request
import MySQLdb
import unittest

app = Flask(__name__)

# Connecting to the database
for i in range(100):
    try:
        db = MySQLdb.connect("localhost", "root", "password", "game_database")
    except Exception as e:
        print(e)
        continue
    break


@app.route("/", methods = ['GET', 'POST'])
def game_main():
    if request.method == 'POST':
        user = request.values.get('User')
        score = request.values.get('Score')
        insert_user_score(user, score)

    scores = fetch_rows(10)
    return render_template("game_main.html", scores=scores)


@app.route("/leaderboard")
def leaderboard():
    scores = fetch_rows(5000)
    total_score = fetch_total_score()
    total_games = fetch_total_games()
    return render_template("full_leaderboard.html", scores=scores, total_score=total_score, total_games=total_games)

@app.route("/leaderboardasc")
def leaderboardasc():
    scores = fetch_rows_rev(5000)
    total_score = fetch_total_score()
    total_games = fetch_total_games()
    return render_template("full_leaderboard_asc.html", scores=scores, total_score=total_score, total_games=total_games)


def fetch_rows(num_rows):
    ''' Retreives rows from the database consisting of a username and a score

    Arguments:
        num_rows: The limit on the number of rows to fetch
    '''

    cursor = db.cursor()
    for i in range(100):
        try:
            cursor.execute("SELECT user, score FROM user_scores ORDER BY score DESC LIMIT %s", (num_rows,))
            rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(e)
            continue

def fetch_rows_rev(num_rows):
    ''' Retreives rows from the database consisting of a username and a score

    Arguments:
        num_rows: The limit on the number of rows to fetch
    '''

    cursor = db.cursor()
    for i in range(100):
        try:
            cursor.execute("SELECT user, score FROM user_scores ORDER BY score ASC LIMIT %s", (num_rows,))
            rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(e)
            continue


def fetch_total_score():
    ''' Returns the sum of all scores in the user_scores table
    '''

    cursor = db.cursor()
    for i in range(100):
        try:
            cursor.execute("SELECT SUM(score) FROM user_scores")
            rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(e)
            continue


def fetch_total_games():
    ''' Returns the total number of games played
    '''

    cursor = db.cursor()
    for i in range(100):
        try:
            cursor.execute("SELECT COUNT(id) FROM user_scores")
            rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(e)
            continue


def insert_user_score(user, score):
    ''' Inserts a username and score into the user_scores table
    '''

    cursor = db.cursor()
    for i in range(100):
        try:
            cursor.execute("INSERT INTO user_scores (user, score) VALUES (%s, %s)", (user, score))
            db.commit()
        except Exception as e:
            print(e)
            continue
        break


# Unit tests for the database functions
# To run the tests, uncomment unittest.main() at the bottom
class TestDatabaseFunctions(unittest.TestCase):
    def test_fetch_rows1(self):
        actual = fetch_rows(1)
        string = "abc"
        self.assertEqual(type(actual[0][0]), type(string))

    def test_fetch_rows2(self):
        actual = fetch_rows(1)
        num = 10
        self.assertEqual(type(actual[0][1]), type(num))

    def test_fetch_total_score(self):
        actual = fetch_total_score()
        num = 10
        self.assertEqual(type(int(actual[0][0])), type(num))

    def test_fetch_total_games(self):
        actual = fetch_total_games()
        num = 10
        self.assertEqual(type(actual[0][0]), type(num))


if __name__ == "__main__":
    # unittest.main()
    app.run(debug = True, host = "0.0.0.0", port = 5000)