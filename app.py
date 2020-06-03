from flask import Flask, request, render_template
from sudopy import Sudoku
from sudopy_kings import Sudoku_Kings

app = Flask(__name__)

sudoku_grid_list = []
@app.route('/')
def menu():
    return render_template('menu.html')

@app.route('/input_classic')
def input_classic():
    sudoku_grid_list = []
    return render_template('input_classic.html')

@app.route('/input_kings')
def input_kings():
    sudoku_grid_list = []
    return render_template('input_kings.html')

@app.route('/solution', methods=['POST', 'GET'])
def solution():
    sudoku_grid_list = []
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

        if "/input_classic" in request.referrer:
            s = Sudoku(sudoku_grid_list)
        elif "/input_kings" in request.referrer:
            s = Sudoku_Kings(sudoku_grid_list)
        s.solve()

        return render_template('solution.html', solved_array = s.return_array())
    else:
        return render_template('menu.html')

if __name__ == "__main__":
    app.run(debug=True)