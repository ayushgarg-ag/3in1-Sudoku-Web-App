from flask import Flask, request, render_template
from sudopy_kings import Sudoku_Kings

app = Flask(__name__)

sudoku_grid_list = []
@app.route('/')
@app.route('/index')
def index():
    sudoku_grid_list = []
    return render_template('index.html')

@app.route("/solution", methods=['POST', 'GET'])
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

        s = Sudoku_Kings(sudoku_grid_list)
        print(s)
        s.solve()
        print(s)
        return render_template('solution.html', solved_array = s.return_array())
    else:
        return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)