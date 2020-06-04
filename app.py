from flask import Flask, request, render_template
from sudopy import Sudoku
from sudopy_kings import Sudoku_Kings
import ctypes

app = Flask(__name__)

sudoku_grid_list = []
@app.route('/')
def menu():
    return render_template('menu.html')

@app.route('/input_classic_play')
def input_classic_play():
    # sudoku_grid_list = []
    return render_template('input_classic_play.html')

@app.route('/input_classic_solve')
def input_classic_solve():
    # sudoku_grid_list = []
    return render_template('input_classic_solve.html')

@app.route('/input_kings')
def input_kings():
    sudoku_grid_list = []
    return render_template('input_kings.html')

@app.route('/play', methods=['POST', 'GET'])
def play():
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

            # if "/input_classic_play" in request.referrer:
            s = Sudoku(sudoku_grid_list)
            s.solve()
            # elif "/input_kings" in request.referrer:
            #     s = Sudoku_Kings(sudoku_grid_list)
            
            return render_template('play.html', play_array = s.return_array())
        else:
            return render_template('menu.html')

@app.route('/check', methods=['POST', 'GET'])
def check():
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

        s = Sudoku(sudoku_grid_list)
        print(s)
        print(s.check_grid_items())

        return render_template('check.html', is_solved = s.check_grid(), play_array=s.return_array(), check_array = s.check_grid_items())
    else:
        return render_template('menu.html')


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

        if "/input_classic_solve" in request.referrer:
            s = Sudoku(sudoku_grid_list)
        elif "/input_kings" in request.referrer:
            s = Sudoku_Kings(sudoku_grid_list)
        s.solve()

        return render_template('solution.html', solved_array = s.return_array())
    else:
        return render_template('menu.html')

if __name__ == "__main__":
    app.run(debug=True)
