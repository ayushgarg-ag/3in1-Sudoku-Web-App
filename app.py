from flask import Flask, jsonify, request, render_template, make_response, url_for, redirect
import json
from flask_sqlalchemy import SQLAlchemy
from sudopy import Sudoku

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

sudoku_grid_list = []

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route("/solution", methods=['POST', 'GET'])
def solution():
    if request.method == 'POST':
        for i in range(9):
            row_list = []
            for j in range(9):
                id = "" + str(i*9 + j)
                content = request.form[id]
                if content == "":
                    row_list.append(0)
                else:
                    row_list.append(int(content))
            sudoku_grid_list.append(row_list)

        s = Sudoku(sudoku_grid_list)
        print(s)
        s.solve()
        print(s)
        return render_template('solution.html', solved_array = s.return_array())

    #     try:
    #         return redirect('/')
    #     except:
    #         return 'There was an issue adding your task'
    else:
        return render_template('index.html')


# @app.route("/topy", methods=['POST'])
# def receiveArray():
#     data = json.loads(request.get_data())
#     print(data)
#     return jsonify({"1":"1"})

if __name__ == "__main__":
    app.run(debug=True)