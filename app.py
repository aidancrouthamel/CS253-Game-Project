from flask import Flask, render_template, request
app = Flask(__name__)


## Main page = 0
## Leaderboard page = 1
current_page = 0

@app.route("/")
def game_main():
    return render_template("game_main.html")


@app.route("/leaderboard")
def leaderboard():
    return render_template("full_leaderboard.html")
    

if __name__ == "__main__":
    app.run(debug = True, host = "0.0.0.0", port = 5000)