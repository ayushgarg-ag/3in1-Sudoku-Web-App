# A 3-in-1 Sudoku Web Application
## Solve a Sudoku, Generate and Play a Sudoku of Varying Difficulty, or Input and Play Your Own Sudoku

### *Currently looking for a new site to host the app*

## Table of Contents

[Brief Overview](#headers)  
[About Us](#about)  
[Website Walkthrough](#walkthrough)  
[Technologies Used](#technology)  
&emsp;&emsp;[Python](#python)  
&emsp;&emsp;[Javascript](#js)  
&emsp;&emsp;[jQuery](#jquery)  
&emsp;&emsp;[HTML](#html)  
&emsp;&emsp;[CSS](#css)  
[Features](#features)  
&emsp;&emsp;[Overall Features](#overallfeatures)  
&emsp;&emsp;[Player Interface Features](#interfacefeatures)  
[File Descriptions](#filedescriptions)  
[Credits](#credits)    


<a id="overview"></a>

## Brief Overview
This project is a multi-dimensional Sudoku web application, which runs with a Flask API web framework in Python. The application allows users the option to generate and play a random Sudoku based on varying difficulty (easy, medium, hard, or expert), input their own Sudokus (e.g. from a newspaper or other website) and play it, or solve any Sudoku of their choosing. The overall goal of this application is to give a seamless user experience by creating an intuitive interface and unique aesthetic, combined with a multitude of features that enhance speed and navigation throughout the Sudoku.

<a id="about"></a>

## About Us
This website was co-created and designed from scratch by <b>Ayush Garg</b> and <b>Suchit Sharma</b> in the summer of 2020.

As avid fans of solving Sudokus, we set out on this multi-week project to learn about some new technologies and frameworks, get a glimpse into unifying backend and frontend code, and create a one-stop-shop for all things Sudoku!

<p>Having encountered many interesting features across Sudoku mobile and web applications, we sought to combine all of them into one place for the enjoyment of friends and family, as well as any and all Sudoku lovers! We encourage you to give it a try!</p>

For any questions, reporting of bugs, or requests for additional features, email us at 
agss.projects@gmail.com.

<a id="walkthrough"></a>

## Website Walkthrough

### Themes

<img src="/static/css/images/DarkTheme.png" width="25%"><img src="/static/css/images/TanTheme.png" width="25%"><img src="/static/css/images/LightTheme.png" width="25%"><img src="/static/css/images/RetroTheme.png" width="25%">

### Menu

<img src="/static/css/images/MenuScreenShot.png" width="50%">

### Play Path

<img src="/static/css/images/InputPlayerScreenShot.png" width="50%">
<img src="/static/css/images/PlayScreenShot.png" width="50%">

### Solve Path

<img src="/static/css/images/InputSolveScreenShot.png" width="50%">
<img src="/static/css/images/SolutionScreenShot.png" width="50%">


<a id="technology"></a>

## Technologies Used

<a id="python"></a>

### Python
+ The *Flask API Web Framework* is employed to organize and render all of the HTML files in the application. It also allows us to easily transfer data from Python to Javascript, and vice versa, in order to incorporate certain functionality like the solver, generator, and inputter. 

+ The *Jinja 2 Templating Engine* is used to build HTML that can be returned to the user through an HTTP request. For our purposes, values are passed in the `render_template()` method in `app.py` to the HTML files, so that the placeholder variables of Jinja 2 can store the dynamic data. Furthermore, Jinja 2’s support for “template inheritance” allows us to utilize the same baseline HTML document while only making specific changes to each additional page.

+ *Object-oriented programming* creates the Sudoku objects and Generate objects. Sudoku objects are used to solve and validate the Sudokus while Generate objects are used to generate a random Sudoku based on a specified level of difficulty.

+ *Recursion* is the main technique used to implement the solving algorithm. It works by inputting a valid number in each cell and recursively filling all cells until all numbers are valid.

<a id="js"></a>

### Javascript
+ *Javascript functions* comprise the primary structure of the functionality since they are invoked from the HTML to accomplish specific tasks.

+ *Javascript global variables* are used to maintain and track information necessary for the implementation of numerous functions. These variables primarily involve Objects, Arrays, and the primitive data types of booleans, numbers, and strings.

+ Javascript is frequently used to access, alter, add, and delete parts of the *HTML DOM* (Document Object Model).
    - DOM Elements (e.g. `document.getElementById`)
    - DOM Nodes (e.g. `document.documentElement`)
    - DOM Events (e.g. `onmousedown`, `onmouseup`, `onclick`)
    - DOM CSS (e.g. `document.getElementById(id).style.property`)
    - DOM Content (e.g. `document.getElementById(id).innerHTML`)
    - DOM Collections (e.g. `document.getElementsByClassName`)

<a id="jquery"></a>

### jQuery
+ *jQuery* is used as a Javascript library to simplify HTML DOM manipulation, catch event function triggers, and exchange data with the server through AJAX.

+ *jQuery Event Methods* such as `keydown()` or `mousedown()` are used to notify the Javascript file of user interaction with the page while handlers such as `event.preventDefault()` restrict certain actions by the user.

+ *jQuery Selectors* are used to specify for which HTML DOM elements the event method should trigger. In most cases, this is set to the root document itself.

+ *AJAX calls* are made in jQuery to check for when the page has finished loading with the `.load()` method.

<a id="html"></a>

### HTML
+ The *HTML Web Storage API* supports the ability to store data within the user’s browser, with all pages on the web application accessing and changing the same data. This route was chosen over cookies as it is more secure and can store larger amounts of data with little adverse effects on performance. For our purposes, `window.localStorage` was used to maintain the user’s theme choice across pages.

+ *HTML Forms* collect the user input in the Sudoku, which include the values of the 81 cells in the grid. This form is sent with a form method of `POST` and a form action that depends on the page.

+ *HTML Form Validation* checks if the user input is valid in the input pages and if it is complete in the play page.

+ *HTTP POST Requests* collect the data in the form and send it as an HTTP request transaction to the appropriate page to be processed.

<a id="css"></a>

### CSS
+ *CSS Flexboxes* are used to design a page layout for the dynamic user interface. The layout allows us to arrange and align the mode and option div elements in a consistent way across pages.

+ *CSS Grid Layout Module*, which allows for specified placement of items in a row/column format, is used to build the actual Sudoku grid.

+ *CSS Variables* form the basis of the runtime feature of changing themes throughout our web application as these variables are accessed and manipulated in the Javascript. Variables also have the added benefit of eliminating repetition and clutter, as well as enhancing clarity in the main CSS document.

+ *CSS Functions* such as `linear-gradient()` are used to produce more appealing aesthetics, while properties like `filter()` define more complex visual effects.

+ *CSS Pseudo-selectors* and *pseudo-elements* define special styles and states of elements, such as when inputs are focused on or selected.

+ *Responsive dimensions* are used to define properties such as `max-width` and `max-height`.

<a id="features"></a>

## Features

<a id="overallfeatures"></a>

### Overall Features

#### Dynamic Themes
+ With a goal to create a minimalist yet aesthetic design, we give the user the ability to choose between four themes: dark, tan, light, and retro. Simply click on the *“Change Theme”* button located on every page to browse through the different choices. Once a theme has been chosen, elements around the document have their styles changed according to the specified CSS variables.

#### Home Icon
+ After exiting the menu page, an icon will appear on the left-side of each page that can redirect users back to the menu page.

#### Generating and Playing a Sudoku
+ The user can choose between 4 levels of difficulty (easy, medium, hard, expert) and the application will automatically preload a random Sudoku with that difficulty into the interactive player interface.

#### Inputting a Sudoku
+ This Sudoku application also allows users to input their own Sudokus to play and/or solve. Under the options on the menu page, users can select to either play or solve a Sudoku. Based on those specifications, users are then able to input their Sudokus. The user can input as many numbers into either inputter (as long as it is valid), and for better navigation, users are able to use arrow keys to traverse the grid. If the inputted Sudoku is invalid, a warning message will appear and allow users to go back to change the inputs. 

#### Solving a Sudoku
+ Input any valid Sudoku and the solver will give you a correct solution that follows all Sudoku rules. The solution will return very quickly, even to the world’s hardest Sudoku!

#### Interactive Player Interface
+ Once the user has chosen a Sudoku to play, they are brought to the player interface, which incorporates many unique features that ease the Sudoku experience.

<a id="interfacefeatures"></a>

### Player Interface Features

#### Multiple Selection
+ Users can select multiple cells at once to input the same digits across the selected cells.

+ In order to select, users can either (1) hold the SHIFT key and use arrow keys (2) hold the SHIFT key and click individual cells or (3) drag the cursor across multiple cells.

+ In order to deselect, users can press the ESCAPE key or click on any cell without holding down the SHIFT key.

+ Selections appear in a different color to easily distinguish selected cells, and the shift indicator next to the home icon will be on if there are any selected cells in the grid.

#### User Inputs (Normal, Pencilmarks, or Colors)
+ *“Normal”* mode allows users to input numbers that they believe exist in the final solution.
+ *“Pencilmarks”* mode allows users to keep notes in specific cells if there are multiple possibilities. Users can easily delete specific pencilmarks in a cell by inputting the desired number again as a pencilmark in that cell. Normal numbers will automatically overwrite pencilmarks.
+ *“Colors”* mode allows users to input colors into the grid. This allows users to distinguish certain cells from each other.
+ All modes allow for the user to either click on the interactive table containing the numbers/colors or by pressing a number on the keyboard.
+ Modes can be changed by either clicking on the specific mode or by pressing the SPACE bar.

#### 3 Option Toggles
+ **Auto Delete Pencilmarks**: Automatically deletes pencilmarks that are in the same row, column, or box as a Normal number that has just been inputted. This eliminates the need to delete pencilmarks if the user inputs a Normal number.
+ **Highlight Numbers**: Allows users to easily see all instances of a number simply by focusing onto a cell with that number.
+ **Highlight Row, Column, and Box**: Shows the user all the cells in the grid that exist in the focused cell’s row, column, and box.

#### Other Options
+ **Auto Fill Pencilmarks**: Automatically inputs all possible pencilmarks in every cell . To undo this change, simply click *“Undo.”*
+ **Undo**: Users can easily undo their previous changes by clicking the *“Undo”* button.

#### Checking the Sudoku
+ After completing the Sudoku, users can click *“Check”*. Note that only Sudokus that only have Normal numbers in every cell can be checked. Otherwise, a warning will be shown. If the Sudoku is correct, a success message will be shown. If it is incorrect, an incorrect message will be shown and errors will be highlighted in red.

#### Restarting the Sudoku
+ Users can elect to restart the Sudoku by clicking *“Restart.”* This will revert the grid back to its starting state while all options that have been toggled will remain on.

#### Timing
+ A timer will begin upon starting the Sudoku and will end upon either successfully completing it or restarting.

#### Accessibility
+ The entire Sudoku can be completed by just using keys on the keyboard or by just clicking with the mouse.

<a id="filedescriptions"></a>

## File Descriptions

#### `/sudopy.py`
This file contains 2 classes: Sudoku and Generate. 

#### Sudoku Class
The Sudoku object is initialized with a passed 2D list. This list is then used to accomplish two main goals of solving the passed list and identifying if the passed list is a valid Sudoku. 

Solving: The solver utilizes a backtracking algorithm. Using the numbers already in the cell, it iterates over every cell and attempts to fill each one with a valid number. If the inputted number results in an invalid Sudoku, then a different valid number takes its place. The grid is then filled recursively until all cells contain a valid number. This algorithm follows depth-first traversing, where it attempts to input as many valid numbers as possible before backtracking.

Validation: The validator checks every row, column, and box, and if there exists more than one instance of a number from 1-9, then the Sudoku is invalid.

#### Generate Class
The Generate object is initialized with a string that indicates a certain difficulty (easy, medium, hard, or expert). The intention of this class is to return a random Sudoku with a given difficulty.  It achieves this by parsing through a .txt file of 200 Sudokus with the same name as the initialized string, choosing a random line, building that line into a list that can be used to initialize a Sudoku object, and finally returning it. 

#### `/app.py`
This page controls all of the app routing through Flask. Depending on which route has been called, the defined functions render the appropriate template and send certain variables that will be accessed by Jinja 2 in the HTML document. The file imports the Sudoku and Generate classes from sudopy.py

The app route for `/solution` gathers the form request data from `input_solve.html` and creates the Sudoku object based on the numbers inputted by the user. The `solve()` method is then called and passed as a variable to solution.html so the completed Sudoku can be displayed to the user.

The app route for `/play` changes depending on which page created the “POST” request (either `input_play.html`, `menu.html`, or `play.html`). If the call was from `input_play.html`, it builds the Sudoku object based on the inputted numbers and returns the template for `play.html`. If it was called from `menu.html`, then it knows the user has chosen to play a Sudoku of a specified difficulty. It will check which difficulty level, create a Sudoku of that level with the Generate object, and then send that Sudoku to `play.html`. Lastly, if the call was from “play.html” itself, then the user has finished playing the Sudoku and wants to check if their solution is correct. Therefore, it will use the methods in the Sudoku class to send back a boolean of if the Sudoku is solved and which items are wrong, if any.

#### `/templates/menu.html` and `/static/javascript/menu.js`
The menu page can redirect users to three different pages: `solution.html` (if the user wants to solve a Sudoku), `input_play.html` (if the user wants to input and play their own Sudoku), or `play.html` (if the user chooses the difficulty level of the Sudoku they want to play.

#### `/templates/input_play.html` and `/static/javascript/base.js`
Upon entering a valid Sudoku and clicking *“Play,”* the user will be redirected to play.html, where the inputted numbers are preloaded as the starting numbers.

#### `/templates/play.html` and `/static/javascript/play.js`
After completing the Sudoku, the user can check the Sudoku to see if the solution is correct. This will redirect the user back to `play.html` with a message. If the solution is incorrect, the errors will be highlighted red.

#### `/templates/input_solve.html` and `/static/javascript/base.js`
Upon entering a valid Sudoku and clicking *“Solve,”* the user will be redirected to solution.html, where a solution to the inputted Sudoku will be displayed.

#### `/templates/solution.html` and `/static/javascript/base.js`
After seeing the solution to the inputted Sudoku, the user can choose to return to menu.html to solve a different Sudoku or utilize a different option.

#### `/static/css/main.css`
This is the main CSS document that is utilized by all of the HTML pages. The initial CSS variables are stored here, so they can be manipulated by the Javascript documents to create different themes.

**For a more in-depth look into the inner-workings of these files, feel free to open them in the repository and look at the documentation provided.**

<a id="credits"></a>

## Credits
All Sudokus inside the `/sudokus` folder were generated from https://qqwing.com/generate.html.
