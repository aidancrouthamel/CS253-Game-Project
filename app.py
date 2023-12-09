from flask import Flask, render_template, request
import MySQLdb

app = Flask(__name__)
db = MySQLdb.connect("localhost", "root", "password", "game_database")

## Main page = 0
## Leaderboard page = 1
current_page = 0

@app.route("/")
def game_main():
    scores = fetch_rows(10)
    return render_template("game_main.html", scores=scores)


@app.route("/leaderboard")
def leaderboard():
    scores = fetch_rows(5000)
    return render_template("full_leaderboard.html", scores=scores)


def fetch_rows(num_rows):
    cursor = db.cursor()
    for i in range(100):
        try:
            cursor.execute("SELECT user, score FROM user_scores ORDER BY score DESC LIMIT %s", (num_rows,))
            rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(e)
            continue
        break


if __name__ == "__main__":
    app.run(debug = True, host = "0.0.0.0", port = 5000)