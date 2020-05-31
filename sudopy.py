from sudokus import *

class Sudoku:
    def __init__(self, matrix):
        self.grid = matrix

    # def get_pencilmarks(self):
    #   return self.pencilmarks

    def input_num(self, x, y, num):
        self.grid[x][y] = num

    def check_RCB(self, x, y, num):
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

    def check_spec_cell(self, x, y):
        if self.grid[x][y] != 0:
            return
        else:
            list_nums = []
            for i in range(1, 10):
                if self.check_RCB(x, y, i):
                    list_nums.append(i)
                    num = i
            if len(list_nums) == 1:
                self.input_num(x, y, num)

    def create_pencil_marks_list(self, x, y):
        if self.grid[x][y] != 0:
            return [0]
        else:
            list_nums = []
            for i in range(1, 10):
                if self.check_RCB(x, y, i):
                    list_nums.append(i)
            return list_nums

    def create_pencil_marks(self):
        pencilmarks = []
        for i in range(9):
            for j in range(9):
                if self.grid[i][j] != 0:
                    pencilmarks.append([0])
                else:
                    pencilmarks.append(self.create_pencil_marks_list(i, j))
        return pencilmarks

    def check_instances_one_RC(self, num):
        pencilmarks = self.create_pencil_marks()
        loc = self.cell_location(num)
        # rows
        list_instances = []
        for i in range(9):
            for j in range(9):
                for k in pencilmarks[(i * 9) + j]:
                    list_instances.append(k)
            instances = list_instances.count(num)
            list_instances = []
            if instances == 1:
                for n in loc:
                    if (n >= (i * 9)) and n < (i * 9 + 9):
                        self.input_num(n // 9, n % 9, num)
                        self.check_instances_one_RC(num)
        # columns
        list_instances = []
        for i in range(9):
            for j in range(9):
                for k in pencilmarks[(j * 9) + i]:
                    list_instances.append(k)
            instances = list_instances.count(num)
            list_instances = []
            if instances == 1:
                for n in loc:
                    if n % 9 == i:
                        self.input_num(n // 9, n % 9, num)
                        self.check_instances_one_RC(num)

    def check_instances_one_B(self, num):
        loc = self.cell_location(num)
        list_instances = []
        for i in range(3):
            for j in range(3):
                for k in range(3):
                    for m in range(3):
                        list_instances.extend(self.create_pencil_marks_list(k + (i * 3), m + (j * 3)))
                instances = list_instances.count(num)
                if instances == 1:
                    for n in loc:
                        if (n >= 27 * i) and (n < 27 * i + 27) and (n % 9 in range((j * 3), 3 + (j * 3))):
                            self.input_num(n // 9, n % 9, num)
                            self.check_instances_one_B(num)
                list_instances = []

    # def check_instances_two(self, num):
    #   pencilmarks = self.create_pencil_marks()
    #   loc = self.cell_location(num)
    #   #rows
    #   list_instances = []
    #   for i in range(1,10):
    #     list_instances = self.pencil_marks_list_row(i)
    #     instances = list_instances.count(num)
    #     list_instances = []
    #     if (instances == 2):
    #       for n in loc:

    def pencil_marks_list_row(self, r):
        pencilmarks = self.create_pencil_marks()
        list = []
        for i in range(9):
            for k in pencilmarks[((r - 1) * 9) + i]:
                list.append(k)
        return list

    def pencil_marks_list_column(self, c):
        pencilmarks = self.create_pencil_marks()
        list = []
        for i in range(9):
            for k in pencilmarks[(i * 9) + (c - 1)]:
                list.append(k)
        return list

    def pencil_marks_list_box(self, hb, vb):
        list = []
        for i in range(3):
            for j in range(3):
                list.extend(self.create_pencil_marks_list(i + ((vb - 1) * 3), j + ((hb - 1) * 3)))
        return list

    # def which_box(self, loc):
    #   for i in range(3):
    #     for j in range(3):
    #       for k in range(3):
    #         for m in range(3):

    def count_nums_in_grid(self, num):
        count = 0
        for i in range(9):
            for j in range(9):
                if self.grid[i][j] == num:
                    count = count + 1
        return count

    def solve(self):
        place_num = True
        while place_num:
            place_num = False
            for i in range(1, 10):
                init_num = self.count_nums_in_grid(i)
                if init_num == 9:
                    continue
                else:
                    self.check_instances_one_RC(i)
                    self.check_instances_one_B(i)
                    for a in range(9):
                        for b in range(9):
                            self.check_spec_cell(a, b)
                    if self.count_nums_in_grid(i) != init_num:
                        place_num = True

    def cell_location(self, num):
        pencilmarks = self.create_pencil_marks()
        list = []
        for i in range(81):
            if pencilmarks[i] != 0 and num in pencilmarks[i]:
                list.append(i)
        return list

    def __str__(self):
        string = ''
        for i in range(9):
            for j in range(9):
                string += str(self.grid[i][j]) + " "
            string += "\n"
        return string

    def return_array(self):
        return self.grid



# count = 0
# for i in range(9):
#   for j in range(9):
#     list2[i][j] = count
#     count = count + 1

# s2 = Sudoku(list2)
# s = Sudoku(list_hard)
# print(s)
# s.solve()
# print(s)
# print(len(list1))
# print(s.cell_location(2))
# import numpy as np
# import matplotlib.pyplot as plt
# x = np.arange(-10, 10, .1)
# y = x ** 3
# plt.plot(x,y)
# plt.show()

# from flask import Flask
# app = Flask(__name__)
#
# @app.route("/")
# def hello():
#     return "Hello World"