from sudokus import *


class Sudoku:
    def __init__(self, matrix):
        self.grid = matrix

    def input_num(self, x, y, num):
        self.grid[x][y] = num

    def check_grid(self):
        for x in range(9):
            for y in range(9):
                if self.grid[x][y] == 0:
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

                    for num in range(1, 10):
                        if num not in list_r:
                            return False
                        if num not in list_c:
                            return False
                        if num not in list_b:
                            return False
        return True

    def check_grid_items(self):
        list_bool = []
        has_added = False
        for x in range(9):
            list_bool_row = []
            for y in range(9):
                if self.grid[x][y] == 0:
                    list_bool_row.append(False)
                    has_added = True
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

                    num = self.grid[x][y]

                    if list_r.count(num) > 1 or list_c.count(num) > 1 or list_b.count(num) > 1:
                        list_bool_row.append(False)
                        has_added = True

                    if not has_added:
                        list_bool_row.append(True)
                        has_added = True
                has_added = False
            list_bool.append(list_bool_row)
        return list_bool

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

            if num in list_r:
                return False
            elif num in list_c:
                return False
            elif num in list_b:
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

# s = Sudoku(list_hard)
# s.solve()
# s.input_num(0, 0, 5)
# s.check_grid_items()

# if orig != 0
#     black readonly
# else
#     if play != 0
#         if check
#             input normal
#         else:
#             input red
#     else:
#         input red