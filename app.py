from flask import Flask, request, render_template
from sudopy import Sudoku, Generate
import ctypes

app = Flask(__name__)

sudoku_grid_list = []
play_list = []
has_gen = False

@app.route('/')
def menu():
    global has_gen
    has_gen = False
    return render_template('menu.html')


@app.route('/input_play')
def input_play():
    return render_template('input_play.html')


@app.route('/input_solve')
def input_solve():
    return render_template('input_solve.html')


@app.route('/play', methods=['POST', 'GET'])
def play():
    global play_list
    global has_gen
    sudoku_grid_list = []
    if request.method == 'POST':
        if 'play' in request.referrer:
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
            if '/input_play' in request.referrer:
                play_list = s.return_array()
                return render_template('play.html', is_solved="None", input_array=play_list, play_array=None)
            elif '/play' in request.referrer:
                return render_template('play.html', is_solved=s.check_grid(), check_array=s.check_grid_items(), play_array=s.return_array(), input_array=play_list)
        elif '/' in request.referrer:
            if request.form.get('easy') != None:
                content = request.form.get('easy')
            elif request.form.get('medium') != None:
                content = request.form.get('medium')
            elif request.form.get('hard') != None:
                content = request.form.get('hard')
            else:
                content = request.form.get('expert')
            if not has_gen:
                g = Generate(content)
                play_list = g.generate_sudoku()
                has_gen = True
            return render_template('play.html', is_solved="None", input_array=play_list, play_array=None)
    else:
        return render_template('play.html', is_solved="None", input_array=play_list, play_array=None)

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

        if "/input_solve" in request.referrer:
            s = Sudoku(sudoku_grid_list)
        s.solve()

        return render_template('solution.html', solved_array=s.return_array())
    else:
        return render_template('menu.html')

if __name__ == "__main__":
    app.run(debug=True, port=6750)
