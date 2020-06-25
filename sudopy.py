import random

class Sudoku:
    def __init__(self, matrix):
        """
        Initializes an object of type Sudoku with a 2D list containing the digits

        Parameters: 
        matrix (list): a 2d list that the object uses to initialize self.grid
        """
        self.grid = matrix

    def __str__(self):
        """
        Creates and returns a string representation of the Sudoku object
        """
        string = ''
        for i in range(9):
            for j in range(9):
                string += str(self.grid[i][j]) + " "
            string += "\n"
        
        return string
        
    def input_num(self, x, y, num):
        """
        Inputs a number in the specified x, y location in self.grid

        Parameters:
        x (int): x location where num should be placed
        y (int): y location where num should be placed
        num (int): number between 1-9 that should be inputted in the 
            appropriate x, y location in self.grid
        """
        self.grid[x][y] = num

    def return_array(self):
        """
        Returns the grid attribute of a Sudoku object
        """
        return self.grid

    def create_RCB_lists(self, x, y):
        """
        Creates three separate lists of all numbers in a given row,
            column, and box
        
        Parameters:
        x (int): x location that should be checked
        y (int): y location that should be checked

        Returns:
        tuple: three elements in the tuple that correspond to the
            row list, column list, and box list
        """
        # create a list of all numbers in a given row
        list_r = self.grid[x]

        # create a list of all numbers in a given column
        list_c = []
        for i in range(9):
            list_c.append(self.grid[i][y])

        # create a list of all numbers in a given box
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
                
        return (list_r, list_c, list_b)

    def check_num(self, x, y, num):
        """
        Checks if a single number is valid in a given row, column, or box

        Parameters:
        x (int): x location that should be checked
        y (int): y location that should be checked
        num (int): number between 1-9 that should be checked for validity in
            the appropriate x, y location in self.grid

        Returns:
        boolean: True if the number is valid in the given location
        """
        if self.grid[x][y] != 0:
            return False
        else:
            list_r, list_c, list_b = self.create_RCB_lists(x, y)

            # check if num is in any of the lists created
            if num in list_r:
                return False
            elif num in list_c:
                return False
            elif num in list_b:
                return False
            else:
                return True

    def check_grid(self):
        """
        Checks each location in self.grid to ensure a valid Sudoku  
        
        Returns:
        boolean: True if Sudoku is valid, False if it is not
        """
        for x in range(9):
            for y in range(9):
                if self.grid[x][y] == 0:
                    return False
                else:
                    list_r, list_c, list_b = self.create_RCB_lists(x, y)

                    # check if all numbers 1-9 are in each list
                    for num in range(1, 10):
                        if num not in list_r:
                            return False
                        if num not in list_c:
                            return False
                        if num not in list_b:
                            return False
            
        return True

    def check_grid_items(self):
        """
        Checks each location in self.grid to see if there is more than one
            instance of a number in a given row, column, or box

        Returns:
        list: a 2D list of booleans. Each location corresponds to a location
            in the Sudoku and is False if more than one instance of a number 
            appears in the row, column, or box or is True otherwise
        """
        list_bool = []
        has_added = False
        for x in range(9):
            list_bool_row = []
            for y in range(9):
                if self.grid[x][y] == 0:
                    list_bool_row.append(False)
                    has_added = True
                else:
                    list_r, list_c, list_b = self.create_RCB_lists(x, y)
                    num = self.grid[x][y]

                    # append False if there is more than one instance of
                    #   a number in any of the lists
                    if list_r.count(num) > 1 or list_c.count(num) > 1 or list_b.count(num) > 1:
                        list_bool_row.append(False)
                        has_added = True

                    # if False hasn't been appended, append True
                    if not has_added:
                        list_bool_row.append(True)
                        has_added = True
                has_added = False
            list_bool.append(list_bool_row)
        
        return list_bool

    def locate_empty(self):
        """
        Helper method for solve(). Finds a location in self.grid that is 0, which represents an empty location

        Returns:
        tuple: the empty location in the grid. x and y are used to find a specific 
            location in a 2D list
        """
        for x in range(9):
            for y in range(9):
                if self.grid[x][y] == 0:
                    return (x, y)
        
        return None

    def solve(self):
        """
        Recursive function that solves a given grid with a backtracking algorithm

        Loops through all possible numbers in a certain cell. If the number is 
            valid (no conflicts in the row, column, or box), it will input the 
            number and continue. If at some point, a cell can not hold any valid 
            numbers, the algorithm will input a different number in an empty cell.

        Returns:
        boolean: True if the solve is valid, False otherwise
        """
        empty_loc = self.locate_empty()
        
        # if there are no empty locations in the grid, the Sudoku is solved
        if not empty_loc:
            return True
        else:
            x, y = empty_loc

        # input numbers in all grid locations such that every number is valid 
        #   and there are no empty locations
        for i in range(1, 10):
            if self.check_num(x, y, i):
                self.input_num(x, y, i)

                if (self.solve()):
                    return True

                self.input_num(x, y, 0)
    
        return False


class Generate:
    def __init__(self, difficulty_level):
        """
        Initializes a Generate object with a difficulty_level attribute

        Parameter:
        String: specified difficulty (either "easy", "medium", "hard", or "expert")
        """
        self.difficulty_level = difficulty_level

    def generate_sudoku(self):
        """
        Selects a random Sudoku with a difficulty based on self.difficulty_level

        self.difficulty_level is used to read a .txt file that contains 200 
            sudokus of a given difficulty. A random sudoku is then chosen 
            from the file

        Returns:
        list: a 2D list intialized with digits that correspond to a unique sudoku
        """
        sudoku = []

        # open file containing the sudokus of the specfied difficulty
        file_name = 'sudokus/sudokus_' + self.difficulty_level + '.txt'
        file = open(file_name, 'r')
        all_lines = file.readlines()
        
        # choose random line from the file
        rand_num = random.randint(0, 400)
        rand_line = all_lines[rand_num]

        # if the line in the text file is blank, move to the next one
        if len(rand_line) <= 2:
            rand_line = all_lines[rand_num + 1]

        # construct 2D list from the .txt sudoku representation
        for i in range(9):
            grid_row = []
            for j in range(9):
                char = rand_line[i*9+j]
                if char == '.':
                    # append a 0 (representing a blank in the grid) if
                    #   the character is a . in the text file
                    grid_row.append(0)
                else:
                    grid_row.append(char)
            sudoku.append(grid_row)
        
        return sudoku