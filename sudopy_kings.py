from sudokus import *


class Sudoku_Kings:
    def __init__(self, matrix):
        self.grid = matrix

    def input_num(self, x, y, num):
        self.grid[x][y] = num

    def check_num(self, x, y, num):
        if self.grid[x][y] != 0:
            return False
        else:
            list_r = self.grid[x]
            list_c = []
            for i in range(9):
                list_c.append(self.grid[i][y])
            list_b = []
            mod_r = (x + 1) % 3
            mod_c = (y + 1) % 3

            if mod_r == 0:
                list_mr = [x, x - 1, x - 2]
            elif mod_r == 1:
                list_mr = [x, x + 1, x + 2]
            else:
                list_mr = [x - 1, x, x + 1]

            if mod_c == 0:
                list_mc = [y, y - 1, y - 2]
            elif mod_c == 1:
                list_mc = [y, y + 1, y + 2]
            else:
                list_mc = [y - 1, y, y + 1]

            for i in list_mr:
                for j in list_mc:
                    list_b.append(self.grid[i][j])

            # King's Move Constraint 
            list_k = []
            pos = [[x+1, y+1], [x+1, y-1], [x-1, y+1], [x-1, y-1]]
            for i in pos:
                if(i[0] >= 0 and i[0] < 9 and i[1] >= 0 and i[1] < 9):
                    x = i[0]
                    y = i[1]
                    list_k.append(self.grid[x][y])

            if num in list_r:
                return False
            elif num in list_c:
                return False
            elif num in list_b:
                return False
            elif num in list_k:
                return False
            else:
                return True

    def __str__(self):
        string = ''
        for i in range(9):
            for j in range(9):
                string += str(self.grid[i][j]) + " "
            string += "\n"
        return string

    def return_array(self):
        return self.grid

    def solve(self):
        empty_loc = self.locate_empty()
        if not empty_loc:
            return True
        else:
            x, y = empty_loc

        for i in range(1, 10):
            if self.check_num(x, y, i):
                self.input_num(x, y, i)

                if (self.solve()):
                    return True

                self.input_num(x, y, 0)
        return False
    
    def locate_empty(self):
        for i in range(9):
            for j in range(9):
                if self.grid[i][j] == 0:
                    return (i, j)
        return None