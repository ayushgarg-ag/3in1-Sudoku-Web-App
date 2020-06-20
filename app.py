from flask import Flask, request, render_template
from sudopy import Sudoku
from sudopy_kings import Sudoku_Kings
import ctypes

app = Flask(__name__)

sudoku_grid_list = []
play_list = []


@app.route('/')
def menu():
    return render_template('menu.html')


@app.route('/input_classic_play')
def input_classic_play():
    return render_template('input_classic_play.html')


@app.route('/input_classic_solve')
def input_classic_solve():
    return render_template('input_classic_solve.html')


@app.route('/input_kings')
def input_kings():
    sudoku_grid_list = []
    return render_template('input_kings.html')


@app.route('/play', methods=['POST', 'GET'])
def play():
    global play_list
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
        if '/input_classic_play' in request.referrer:
            play_list = s.return_array()
            return render_template('play.html', is_solved="None", input_array=play_list, play_array=None)
        elif '/play' in request.referrer:
            return render_template('play.html', is_solved=s.check_grid(), check_array=s.check_grid_items(), play_array=s.return_array(), input_array=play_list)

    else:
        return render_template('play.html', is_solved="None", input_array=play_list, play_array=None)


'''
for i 
    for j
        if play == null
            if input != 0
                readonly from input
            else
                normal no value
        else
            if input != 0
                readonly from input
            else if check
                normal value from play
            else 
                error
'''

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

        return render_template('solution.html', solved_array=s.return_array())
    else:
        return render_template('menu.html')


if __name__ == "__main__":
    app.run(debug=True, port=5500)
