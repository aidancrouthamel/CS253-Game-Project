from flask import Flask, render_template, request
app = Flask(__name__)

@app.route("/")
def game_main():
    return render_template("game_main.html")


if __name__ == "__main__":
    app.run(debug = True, host = "0.0.0.0", port = 5000)