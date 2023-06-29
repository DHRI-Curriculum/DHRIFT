---
title: Introduction to Python
description: Python is a general-purpose programming language suitable for a wide variety of tasks in the digital humanities. Learning Python fundamentals is a gateway to analyzing data, creating visualizations, composing interactive websites, scraping the internet, and engaging in the distant reading of texts. This workshop first introduces participants to core programming concepts such as data types, variables, and functions. Participants will then learn about basic control flow by writing small programs with loops and conditional statements. They will also learn to problem solve, and practice searching for answers and debugging scripts. The workshop wraps up by exposing participants to intermediate tools for further exploration.
programming_language: python
learning objectives:
    - Understand what Python is and, in general terms, what it can do.
    - Run Python programs, both by interacting directly with the interpreter and by preparing and running scripts.
    - Distinguish among five core data types—integers, floats, strings, booleans, and lists.
    - Become familiar with core programming concepts, including variables, loops, and conditionals.
    - Engage with error output and use the internet and documentation to independently research language features.
    - Learn how to find and import code from external sources to solve more complex problems.
    
facilitators: 
    name: 'Stephen Zweibel'
    description: 'Here is a short bio.'

estimated time:
    - 3 - 4 hours

dependencies: 
    workshop prerequisites: 
        command-line: 
            description: Introduction to the Command Line (Required) This workshop makes reference to concepts from the Command Line workshop, and having basic knowledge about how to use the command line will be central for anyone who wants to learn about programming with Python.
            required: true
        data-ethics: 
            description: Data Ethics (Recommended) This workshop will give you a basis for thinking through the ethical considerations of your programming projects.
            recommended: true

authors:
    - 'Kalle Westerling'
    - 'Di Yoong'
    - 'Lisa Rhody'
    - 'Jojo Karlin'
    - 'Stephen Zweibel'
    - 'Patrick Smyth'

editors:
    - 'Di Yoong'
    - 'Lisa Rhody' 
    - 'Stephen Zweibel'

readings:
    - Want to learn programming, but not convinced that the Python language is the right language? Check out [Five Reasons Why Learning Python Is The Best Decision](https://medium.com/datadriveninvestor/)
    - "Some concrete ideas for how to use Python: [What Can I Do With Python?](https://realpython.com/what-can-i-do-with-python/)"

ethical considerations:
    - Python works by reducing data to portable units and presenting them in a way that prioritizes readability. These units are known as "data types" and include strings (words/letters), integers (numbers), booleans (true or false statements), and lists (groups of strings). The python grammar, which dictates how python statements ought to be ordered, values simplicity, efficiency, and concision. You can read more about Python values at [the Zen of Python](https://www.python.org/dev/peps/pep-0020/).
    - As we learn about the Python data types and grammar, keep in mind that working within any digital format requires making seemingly neutral choices that carry ethical consequences. When using python, be aware of the ways the ways that data is transformed into computable form. What choices are you making about your data? What is being included, and what is left out? What are reductions and assumptions necessary to encode your data? If you are more interested in thinking further about data types and our choices in relation to data, you should have a look at our [Data Literacies workshop](https://www.github.com/DHRI-Curriculum/data-literacies).

projects:
    description: "Projects that use the skills you'll learn in this workshop:"
    The NEH Impact Index:
        description: Built by former Digital Fellow Patrick Smyth, The NEH Impact Index makes visible the distribution of funds by National Endowment for the Humanities across the United States. The website uses python to map projects, communities, and cultural institutions who have received NEH support. You can check out the code on Github.
        link: http://www.nehimpact.org/about
    Mapping Arts NYC: 
        description: Mapping Arts NYC, created in 2019 by the Graduate Center’s Data for Public Good fellows, “is a project that explores the geography and representation of arts and culture in New York City over time.” It includes a number of Python scripts written to clean and make sense of all the data.
        link: http://gcdiprojects.org/MappingArtsNYC/
        
resources:
    Digital Fellows’ Python Cheat Sheet: 
        description: See the Digital Fellows’ Python Cheat Sheet for handy commands that we cover in this workshop.
        link: https://curriculum.dhinstitutes.org/shortcuts/workshop/python

goals:
    - description: 'In this workshop, you will learn to:'
    - Become familiar with core programming concepts, including variables, loops, and conditionals.
    - Distinguish among five core data types—integers, floats, strings, booleans, and lists.
    - Engage with error output and use the internet and documentation to independently research language features.
    - Learn how to find and import code from external sources to solve more complex problems.
    - Run Python programs, both by interacting directly with the interpreter and by preparing and running scripts.
    - Understand what Python is and, in general terms, what it can do.

---

# Interacting With Python

This workshop is meant to be _interactive_--it intends to immediately engage you with the concepts you are learning. To that end, all of the Python programming you will learn about can be done here, __directly in your browser__. Throughout the workshop, you will encounter several designated code sections in which you can write and run your Python code. These emulators are meant to allow you quick and easy access to coding principles. However, there are many ways to interact with Python, and you will also learn about how to interact with your Python installation locally on your machine. 

With that said, let's get started!

## The Interactive Session

One of the most basic ways to interact with Python is through an "interactive session."  This is a special space that allows us to run little one-line bits of Python, experimenting and exploring what it can do, without having to save it. Think of this interactive space as a playground. Later on, we will be working with Python in a more robust way, executing longer Python scripts.

An interactive session, otherwise known as the __REPL__ (Read-Evaluate-Print Loop), is a basic environment that takes single user inputs, executes them, and returns the results to the user. A typical REPL environment in the terminal looks as follows:

```pycon
Python 3.7.6 (default, Jan  8 2020, 13:42:34)
[Clang 4.0.1 (tags/RELEASE_401/final)] :: Anaconda, Inc. on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
```
As you can see, it first shows the current Python version along with some hints for help or licensing information. Next, you will see three very important greater-than signs: `>>>`. 

These greater-than symbols `>>>` are how you know that you have entered an interactive session with Python, as distinct from the normal `$` terminal prompt (or `%` if you are on MacOS). Let's work with this environment a bit.

## A Little Math

Let's try a little math in the Python prompt. In the Python REPL environment below <span style = "color:green">(shown in green text)</span>, type the following mathematical operations after the Python prompt (the `>>>`), and hit <kbd>enter</kbd> or <kbd>return</kbd> after each operation.

```pycon
>>> 2 + 3
>>> 14 - 10
>>> 10 * 10
>>> 6 / 3
>>> 21 % 4
```

<PythonREPL/>

The first four operations above are addition, subtraction, multiplication, and division, respectively. The last operation is _modulo_, or mod, which returns the remainder after division.

Note the way you interact with Python at the prompt. After entering an expression such as `2 + 3`, Python "evaluates" it to a simpler form, `5`, and then prints out the answer for you. **This process is what is meant by the Read Eval Print Loop, or REPL**. Reading takes commands from you, the input is evaluated or run, the result is printed out, and the prompt is shown again to wait for more input.

The REPL is useful for quick tests and, later, can be used for exploring and debugging your programs interactively. As mentioned, you might consider it a kind of playground for testing and experimenting with Python expressions.

## Opening the REPL in the Terminal

Although we have provided you with an emulated REPL environment to work with here in your browser, you can also begin an interactive session locally in your own computer's terminal or command prompt. If you have Python installed, you simply need to open your terminal and type:

```console
$ python
```

at the prompt and hit <kbd>enter</kbd>. This will start the Python REPL environment, and you can interact it with it just as you did with the math example above. You can get out of Python by hitting <kbd>control</kbd> + <kbd>d</kbd> (or <kbd>control</kbd> + <kbd>z</kbd> or <kbd>control</kbd> + <kbd>z</kbd> + <kbd>enter</kbd> if you're on a computer running Windows) or by typing `exit()`. You can get back in the REPL again by typing `python` at the regular `$` prompt. 

<Info>Remember that you're in the Python REPL when you see `>>>`, and you're in bash or your terminal when you see the `$`.</Info>

## Challenge

One operator (math symbol) we didn't learn is the exponent—e.g., "x raised to the power of..." If you were Guido van Rossum, the creator of Python, how would you define this operator?

### Solution

<Secret>The exponent operator is two asterisks. For example, the number 3 to the power of 2 would be expressed as 3**2.</Secret>

## Evaluation

What are the characteristics of the REPL? Select all that apply.

<Quiz>
- The REPL has a prompt that begins with `$`.
- The REPL has a prompt that begins with `>>>`.*
- The REPL and the terminal are the same thing.
- The REPL can be used to evaluate mathematical expressions like `2 + 2`.*
</Quiz>

### Keywords

Do you remember the glossary terms from this section?

- [REPL](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/REPL.md)

# Types

Types are classifications that let the computer know how a programmer intends to use a piece of data. You can just think of them as, well, types of data.

We've already seen one type in the last section with our math examples: the integer. In this section, we'll learn four more: the floating point number, the string, the boolean, and the list.

In the Python REPL environment below, write the following commands one line at a time, hitting <kbd>enter</kbd> after each to see the result.

```pycon
>>> type(1)
>>> type(1.0)
>>> type("Hello there!")
>>> type(True)
>>> type([1, 2, 3])
```

<PythonREPL/>

What do you suppose is happening here? Well, each of the responses show how the different types of data register as different "types" for Python:

**Integers** (like `1` above) are whole numbers.

**Floats** (like `1.0` above) are numbers with decimals, and are treated a little differently than integers.

**Strings** (like `"Hello there!"` above) are arbitrary sets of characters, such as letters and numbers. You can think of them as a way to store text.

**Booleans**: (like `True` above) is a fancy term for values representing "true" and "false," or "truthiness" and "falsiness." In Python they are always capitalized: `True` and `False`.

**Lists**: (like `[1, 2, 3]` above) are ordered collections of values. You can put any of the other types in a list: `["hello", "goodbye", "see ya later"]` is also a valid list.

Don't worry about trying to actively remember these types. We'll be working with each in turn in the following sections.

## Challenge

Using the Python REPL, find __1)__ the type of `("12")`, and __2)__ the type of `(["dog", 13, 3.0])`. What do you think the results will be for each?

<PythonREPL/>

### Solution

<Secret>
1: Writing type("12") will return the type of string. While 12 is an integer, enclosing a number within quotation marks will result in a type of string. 
2: Writing type(["dog", 13, 3.0]) will result in a list. Individually, while dog is a string, 13 is an integer, and 3.0 is a float, putting these elements together in brackets results in a list object being returned. As you can see, a list can contain items of different types.
</Secret>

## What's the deal with type()?

`type()` is a function. You can think of functions in Python in a few different ways:

1. A way of doing something in Python.
2. A way of saving some code for reuse.
3. A way of taking an input, transforming that input, and returning an output. The input goes in the parentheses `()`.

These are all valid ways of thinking about functions. We'll be learning more about functions in later sections.

## Challenge

Open your web browser, and google the phrase "python function." Skim through the first few results. What words do you recognize, and which ones look unfamiliar? What do you think the unfamiliar ones mean? Try to rephrase some of this new language, and guess what they mean in your own words.

### Solution

<Secret>
When you google "python function," you may see some phrases that look unfamiliar, like "return value" or "pass parameters." These are advanced terms for inputting and outputting data from a function. It's important to become familiar with the Python's terminology about functions, as it will be helpful later on when you start working with these components.
</Secret>

## Evaluation

Select all the following that accurately describe the data type categories.

<Quiz>
- Booleans represent only `True` or `False` values.*
- Integers can be expressed with numbers like `1` or letters `one`.
- Strings can contain numbers within quotations, like `"1"`.*
- Lists can contain strings, like `['banana, 'coffee', 'eggs']`.*
</Quiz>

### Keywords

Do you remember the glossary terms from this section?

- [Boolean](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/boolean.md)
- [Float](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/float.md)
- [Integer](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/integer.md)
- [String](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/string.md)
- [List](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/list.md)
- [Type()](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/type.md)
- [Function](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/function.md)

# Variables

A variable is **a symbol that refers to an object**, such as a string, integer, or list. Try each of the following commands in order in the Python REPL below, hitting <kbd>enter</kbd> after each:

```pycon
>>> x = 5
>>> x
>>> y = "hello"
>>> y
>>> y + " and goodbye"
```

<PythonREPL/>

As you can see from the examples above, the `=` sign lets you assign symbols like `x` and `y` to data.

Variables can be longer words as well, and they can be set to lists. For instance, type the following into the REPL:

```pycon
>>> books = ['Gender Trouble', 'Cruising Utopia','Living a Feminist Life']
>>> books
>>> type(books)
```

<PythonREPL/>

...you can see that we have assigned the `list` variable `books` three different book items to work with.

Variables can have letters, numbers, and underscores, **but should generally start with a letter**.

If you are curious about learning more about naming conventions for variables, you can check out the PEP8 style guide's section on [Naming Conventions](https://www.python.org/dev/peps/pep-0008/#naming-conventions). PEP8 is the widely accepted guide for Python programmers everywhere.

## Challenge

So I just told you that variables shouldn't start with a number. What does that even mean? Will your computer explode if you write `1_book = "Gender Trouble"`?

Only one way to find out. Try giving weird names to variables and see if you can learn a bit about the rules:

<PythonREPL/>

### Solution

<Secret>
There are a few rules regarding the way that you write the variable statement. This is because Python reads everything left to right, and needs things to be in a certain order.
First, you cannot use any numbers or special characters to start a variable name. So 1_book, 1book, or any variable that contains special characters @, #, $, $, etc, wouldn't be acceptable in Python. You must start the variable with a letter and avoid using special characters.
You can incorporate numbers after you've started with a letter. So book_1 or b1 is acceptable, though you cannot use special characters at any point in the variable name.
Second, you might also notice that variable syntax requires you to write the variable name first, followed by an equal sign =, and then the value, or data. You cannot start the variable statement with the data value, because Python always recognizes the first thing written as the thing to be assigned. The thing that comes after the = is the data that becomes attached to the preceding variable.
</Secret>

## Evaluation

Select all the variable expressions that are allowed in Python.

<Quiz>
- `1 = one`
- `one = 1`*
- `$$$ = "dollar_signs"`
- `first_book = "Orlando"`*
</Quiz>

### Keywords

Do you remember the glossary terms from this section?

- [Variables](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/variables.md)

# Running Scripts

So far, you've interacted with Python one line at a time in the REPL. This is what we call the Interactive Mode, which is, as we mentioned, like a playground for experimenting and exploring different Python expressions, such `2 + 2` or `type("some stuff")`. The code that we write in the REPL is not saved after you exit the terminal, which means that this space is for running Python expressions and *not* for writing longer programs.

For the rest of this session, we're going to expand beyond the REPL to write and execute longer programs. To do this, we will begin to work with a code editor, where we write out lengthier Python scripts.

## Your First Script

To open the code editor, click the RUN button below. Then, type the following line into the code editor and click the RUN button in the slide-out panel:

```python
print("Hello World!")
```

<CodeEditor>
</CodeEditor>

You should see the text `Hello World!` appear in the output below the code editor in the shell.

Congratulations! You've written your first script. That's a big deal!

## Running A Script Locally with the Terminal and a Text Editor

While we have provided you with a code editor to work with here in the browser, when programming your own projects you will likely be working with a text editor and the terminal installed locally on your machine. First, let's begin with the text editor. Open your text editor of choice (such as Visual Studio Code) and create a new file with this line:

```python
print("Hello world!")
```

Save it with the name `hello.py` to a known location, such as your desktop. Open your terminal and move to the desktop directory:

```console
$ cd Desktop
```

Once you're in the folder with your `hello.py` file, move to the terminal. Do *not* enter the Python Interactive Mode (the REPL), which is unnecessary to run python scripts. Instead, lookout for the `$` symbol that lets you know you're in the terminal. (If you find yourself in the Interactive mode (`>>>`), then try exiting it with <kbd>control</kbd> + <kbd>d</kbd>. You should see the `$` symbol, letting you know you're back in the terminal. If you still do not see the `$` symbol, type `exit()` followed by <kbd>enter</kbd> after the Python prompt, `>>>`.)

Now that you're in the terminal, type the following, and press enter:

```console
$ python hello.py
```

You should see the text `Hello world!` appear as output in the terminal.

<Info>You might have noticed some suggestions pop up when you were typing in the code editor. This is a handy feature called "code completion", which is the computer trying to understand what you are typing and giving you quick suggestions. Many code editors have this feature and it can be useful to save you time and help you understand what a particular function needs as parameters.</Info>

## A Note on Text

Fundamentally, Python programs are just text files. You can write them in any text editor, like Visual Studio Code or Notepad on Windows. When you pass the text file to Python, it runs the code in the file one line at a time. There's nothing special about `.py` files—they're just regular text files. This makes them work well with command line tools like Git. The tools you can learn through the DHRI Curriculum—the command line, Git, markdown, grep—are all designed to work well together, and the medium through which they all work is plain text.

## Challenge

Rewrite your program so that you assign the "Hello World!" message to a variable, then print the variable. This will make your program two lines instead of one. There's a fancy programmer word for rewriting your code without changing its behavior—"refactoring."

<CodeEditor></CodeEditor>

### Solution

Your code should look something like this:

<Secret>
```python
greeting = "Hello World!"
print(greeting)
```
</Secret>

Then, when you run the code, you should see the following output:

<Secret>
```console
Hello world!
```
</Secret>

## Evaluation

What are the differences between the terminal, REPL, and text editor? Select the correct statement from the below options.

<Quiz>
- You can run scripts from the **terminal** that were written on the text editor.*
- The **REPL** allows you to save scripts for later use.
- The **text editor** allows you to test code on the fly.
</Quiz>

### Keywords

Do you remember the glossary terms from this section?

- [REPL](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/repl.md)
- [Scripts](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/scripts.md)
- [print()](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/print.md)

# Errors in Python

Our usual response when seeing an error on a computer screen is a stress response. Our heart rate elevates and, if we cannot do what we were asking the computer to do, our frustration mounts. This is because many errors when interacting with programs are not useful or informative, and because we often have no capability to fix the program in front of us.

In Python, errors are our friends. This might be hard to accept initially, but the errors you see when running Python scripts generally do a good job of pointing you to what's going wrong in your program. When you see an error in Python, therefore, try not to fall into the stress response you may be used to when interacting with your computer normally.

## Two Kinds of Errors

In Python, there are two kinds of errors you will encounter frequently. One appears before the program runs, and the other appears during the execution of a program.

**Syntax errors**: When you ask Python to run a program or execute a line in the REPL, it will first check to see if the program is valid Python code—that is, that it follows the grammatical or syntactical rules of Python. If it doesn't, before the program even runs, you'll see a syntax error printed out to the screen.

As an example, type the following in the Python REPL below:

`print('This string has mismatched quotes.")`

<PythonREPL/>

You should receive an error:  `SyntaxError: EOL while scanning string literal`, which points out that our line has faulty syntax. Note the caret (`^`) underneath the mismatched quote, helpfully pointing out where the error lies. Similarly, if this error happened when running a script, Python would tell us the filename and the line number for the line on which the error occurs.

**Traceback errors**: These errors occur during the execution of a Python program when the program finds itself in an untenable state and must stop. Traceback errors are often logical inconsistencies in a program that is valid Python code. A common traceback error is referring to a variable that hasn't been defined, as below.

As an example, type the following in the Python REPL below:

`print(not_a_variable)`

You should receive a Traceback error, indicating that we have not declared the variable `not_a_variable`. Traceback errors try to tell you a little about what happened in the program that caused the problem, including the category of error, such as `NameError` or `TypeError`.

## Debugging

Debugging is a fancy word for fixing problems with a program. Here are some common strategies for debugging a program when first learning Python:

__If the error is a syntax error:__

1. Look at where the caret is pointing.
2. Pay attention to grammatical features such as quotes, parentheses, and indentation.
3. Consider reading the program, or the offending line, backward. It's surprising, but this often helps to detect the issue.

__If the error is a traceback error:__

1. First look at the line where the error occured, then consider the general category of error. What could have gone wrong?
2. If the error is a name error (NameError), check your spelling.
3. Try copying the last line of the error and pasting it into Google. You'll often find a quick solution this way.

If you changed the program and expect a different output, but are getting old output, you may not have saved the file. Go back and make sure the file has been correctly saved.

## Challenge

In the Python REPL below, try to create as many errors as you can in the next few minutes. After getting your first two syntax errors, try instead to get traceback errors. Some areas to try include mathematical impossibilities and using math operations on types that do not support them.

<PythonREPL/>

### Solution

TODO: possibly fix up solutions (in terms of display)
Some examples of **syntax errors** include...

- Starting the variable name with a special character:

<Secret>
```pycon
>>> %greeting = "Hello World"
    File "<stdin>", line 1
    %greeting = "Hello World"
    ^
SyntaxError: invalid syntax
```
</Secret>

- Starting a variable by writing the data values before the variable:

<Secret>
```pycon
>>> "hey there!" = greeting
    File "<stdin>", line 1
SyntaxError: can't assign to literal
```
</Secret>

- Including spaces in a variable:

<Secret>
```pycon
>>> pleasant greeting = "Hello!"
    File "<stdin>", line 1
    pleasant greeting = "Hello!"
                    ^
SyntaxError: invalid syntax
```
</Secret>

Some examples of **traceback errors** include...

- Concatenating data types, like strings and integers:

<Secret>
```pycon
>>> greeting = "hello" + 1
Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
TypeError: can only concatenate str (not "int") to str
```
</Secret>

- Using Booleans (`True` or `False`) without capitalizing them:

<Secret>
```pycon
>>> greeting = false
Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
NameError: name 'false' is not defined

>>> greeting = False

>>> greeting
False
```
</Secret>

## Evaluation

If you get an error, what can you do to debug it? Select all that apply:

<Quiz>
- If it's a _syntax error_, look for the caret as a starting point.*
- If it's a _traceback error_, make sure all your variables are defined.*
- Copy the error message into a Google search.*
- Check for spelling errors in your code.*
</Quiz>

### Keywords

Do you remember the glossary terms from this section?

- [Syntax Errors](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/syntax_error.md)
- [Traceback Errors](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/traceback_error.md)

# Functions

Broadly defined, a function is a block of reusable code that performs a specific task. Often, a function takes an input, transforms the input, and returns an output. Imagine, for instance, a [penny press](https://en.wikipedia.org/wiki/Elongated_coin) at a popular tourist attraction that accepts a penny (the input), flattens and embosses the penny (the transformation), and spits out an elongated coin with a new design, perhaps an image of the Statue of Liberty (the output)! Or, for those of you who remember high school algebra, the function `f(x) = x + 1` means that given an input `x`, the function will return `x + 1`. For example, if I substituted `2` for `x`, my function would read `f(2) = 2 + 1`, or `f(2) = 3`. In this case, my input was `2`, the transformation was to add `1`, and the output was `3`. These are the basic concepts that make up a function in Python as well! 

## Writing your first function

Let's write a Python function that prints the output from our algebraic equation `f(x) = x + 1` before. Try running the code in the editor below.

<CodeEditor>
def add_one(x):
  print(x + 1) 
add_one(2)
</CodeEditor>

As output, you should get the number `3`. Let's break this code down to understand how it works.

First, we create a function:

```python
def add_one(x):
  print(x + 1)
```
 
When creating a function, we begin by writing `def` before our chosen function name. The function name is typically descriptive in nature. We named the above function `add_one` following [Python naming conventions](https://www.python.org/dev/peps/pep-0008/#function-and-variable-names), as the function will be ADDING 1 to our inputted integer. We always need a closed parentheses `()` after our function name, which in this case, takes one argument (or input), which we will temporarily call `x` (we can name this parameter whatever we want, as long as we use the same name within the body of the function). Then, we end the first line with a `:`, return, and indent by 2 spaces to write code describing what this function should "do." In this case, we want the function to `print` the result of adding `1` to our input, or `x`. Remember, we need parentheses every time we print something!

Next, if we want to call our function, we will need to actually pass in an argument to see a result. To do so, we write the following line of code below our function (making sure this next line _isn't_ indented):

```python
add_one(2)
```

Here, we are telling the computer to pass in `2` to see if we get our expected output of `3`.

### Optional 

To see the magic of the function in action, try adding extra lines of code that call the function with different arguments in the code editor, like the following:

```python
add_one(155)
add_one(5)
add_one(-1)
```

<CodeEditor>
def add_one(x):
  print(x + 1) 
</CodeEditor>

Do you notice how the function printed the sum of each of these numbers plus one? Writing this function helped us to automate this simple process of addition for each given input! Granted, creating a whole function just to add "one" to something may seem unnecessarily complicated, but once you have learned the basics of function-writing, the possibilities are powerful and limitless!

### Advanced
Note that writing a function this way only prints the result, but does not actually `return` it. Read more about the difference between `print` and `return` [here](https://pythonprinciples.com/blog/print-vs-return/). If we wanted our function to actually perform the operation AND print it, we could revise our code as follows:

```python
def add_one(x):
  return x + 1

print(add_one(2))
```

## Writing your second function

Our functions do not have to be "mathematical" in nature. Let's say that I wanted to say a friendly hello, but didn't want to type out a long sentence every time I wanted to do so. We could automate this process with a function. In the code editor below, write the following lines:

```python
def greet():
    print("Hello! How are you today?")`  
greet()
```

<CodeEditor></CodeEditor>

First we define our `greet()` function, and add a line to print to the screen. Lastly, we call the function so it will run. You might have noticed that this time, we didn't pass in an argument! Note that a function doesn't have to take an input (or argument), or it can take several arguments! There is a lot of flexibility involved in writing your own functions, which you can craft carefully to do exactly what you want them to! Read more about some of the many things you can do with functions on the online web tutorial [W3Schools](https://www.w3schools.com/python/python_functions.asp).

## Challenge

How could we change our greeting function to say hello to a specific person? Hint: your print statement will need to use string interpolation. We did this in the "Variables" section when we assigned y to "hello" `y = "hello"`, and then added `y + " and goodbye"`, which yielded the result `"hello and goodbye"`.

<CodeEditor></CodeEditor>

### Solution
<Secret>
<CodeEditor>
def greet(person):
  print("Hello " + person + "! How are you today?")
greet("Sarah")
</CodeEditor>
</Secret>
As you can see, the result of calling this function prints `"Hello Sarah! How are you today?"`

## Evaluation

Which of the following are not true about a function?:

<Quiz>
- A function can be reused
- A function can take any number of arguments (including no arguments)
- A function needs to be called in order to run
- A function can only perform mathematical operations*
</Quiz>

### Keywords
- [argument](https://www.w3schools.com/python/python_functions.asp)
- [parameter](https://www.w3schools.com/python/python_functions.asp) 
- [function](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/function.md)

# Lists

Remember lists? They look like this:

```python
books = ['Gender Trouble', 'Cruising Utopia', 'Living a Feminist Life']
```

Let's create a list together and print it out. In the code editor below, write the following lines:

```python
books = ['Gender Trouble', 'Cruising Utopia', 'Living a Feminist Life']
print(books)
```

<CodeEditor></CodeEditor>

You should see the list printed out in the output.

Let's try out another built-in function, called `len()`, which returns the number of items in a list or the number of characters in a string. 

Take a look at the code provided for you in the editor below:

<CodeEditor>
books = ['Gender Trouble', 'Cruising Utopia', 'Living a Feminist Life']
# print(books)
list_length = len(books)
print(list_length)
</CodeEditor>

First, we have our list of books from before. Next, we "comment out" the `print(books)` statement with the hashtag `#`, which tells Python to _ignore_ that line of code. Comments are not read by the interpreter and are only for us humans. 

Next, let's break down this unfamiliar line of code: `list_length = len(books)`

- __First__, we have saved a list of books to the variable, `books`.
- __Second__, `list_length = len(book)` takes the `books` variable from the previous line as an *argument* (or input data) for the `len()` function. That's why `books` is within the parentheses. This syntax means that Python will run the `len()` function on the items in `books`. Then, it sets the result of that process to a new variable, called `list_length`.
- __Finally__, we print the `list_length` value.

This might appear a bit complex at first, but if you read the line slowly you should be able to connect the dots.

Notice that when you run the code above, you don't see the `books` list printed out. That's because that line has become a comment. If you put a `#` (hash or pound) at the beginning of a line, that line will be ignored.

## List Indexing

A useful property of a list is the list index. This allows you to pick out an item from within the list by a number starting from zero:

For instance, add the following lines of code to the program below:

```python
print(books[0]) # Gender Trouble
print(books[1]) # Cruising Utopia
```

<CodeEditor>
books = ['Gender Trouble', 'Cruising Utopia', 'Living a Feminist Life']
print(books)
</CodeEditor>

Indexing lets us get at individual items from a particular list. Note that the first item in the list is `item[0]`. The second item is `item[1]`. That's because counting in Python, and in almost all programming languages, starts from `0`.

Additionally, you can print out the last item in a list using negative numbers, where `-1` denotes the last item in the list. For instance, if you were to add:

```python
print(books[-1]) # Living a Feminist Life
```

to the books program, it would print the last item in the books list. `-2` would print the second to last item, `-3` the third to last, and so on.

## Slicing Lists

There are many things you can do with list indexing, like _slicing_. Slicing consists of taking a section of a list, using the list index to pick out a range of list items. For example, you could take out the first _two_ items of a list with a slice that begins with `0` and ends with `2`.

The slice syntax consists of square brackets, start point and end point, and a colon to indicate the gap in between. This should print out the first two items of your list.  Go ahead and add the following line to the code below to see slicing in action:

```python
print(books[0:2])
```

<CodeEditor>
books = ['Gender Trouble', 'Cruising Utopia', 'Living a Feminist Life']
</CodeEditor>

Note a couple of things. First, the start point is *inclusive*, meaning that Python will include the `[0]` item in your range, and the end point is _exclusive_, so Python won't print the `[2]` item. Instead, it will print everything _up until_ that `[2]` item.

For ultimate brevity, you can also write this expression as:

```python
print(books[:2])
```

The empty value before the colon allows Python to assume the range starts at the first list item, at `[0]`. You can also end the slice with `:`, if you want the list range to include all subsequent items until the end of the list. 

The example below will print everything from the second item to the end of the list.

```python
print(books[1:])
```

With a list that contains three items total, list slicing might not seem very impressive right now. However, this will become a powerful tool once we get to more sophisticated text analysis and start to encounter lists that contain hundreds (or thousands!) of items.

## Challenge

In the REPL below, create a new list of books with at least 5 books in your list. Make sure the total number of books in the list is an **odd** number. How do you get python to print out the book in the middle of the list? What about the three books in the middle? Remember that the first value in a slice is _inclusive_, and the final value is _exclusive_.

<PythonREPL/>

### Solution

<Secret>
```pycon
>>> books = ['Gender Trouble', 'Cruising Utopia', 'Living a Feminist Life', 'Radiant Textuality', 'The Undercommons']

>>> books[2] # ['Living a Feminist Life']

>>> books[1:4] # ['Cruising Utopia', 'Living a Feminist Life', 'Radiant Textuality']
```
</Secret>

## Evaluation

How would you get Python to print the length of the last book in the list? Hint: this number reflects the length of the _string_ which is the last item in the list. Choose the correct expression from the options below.

<Quiz>
- `len(books)`
- `print(books[-1])`
- `print(len[-1])`
- `print(len(books[-1]))`*
</Quiz>

### Keywords

Do you remember the glossary terms from this section?

- [list](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/list.md)
- [list indexing](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/list_indexing.md)
- [len()](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/len.md)

# Loops

What if we want to print out each item in the list separately? For that, we'll need something called a _loop_.

Add the following lines of code to the editor below:

```python
for book in books:
    print("My favorite book is " + book)
```

<CodeEditor>
books = ['Gender Trouble', 'Cruising Utopia', 'Living a Feminist Life']
</CodeEditor>

What's happening here? This kind of loop is called a "for loop", and tells Python: "for each item in the list, do something." Let's break it down:

```python
for <variable name> in <list name>:
    <do something>
```

Indented code like this is known as a "code block." Python will run the `<do something>` code in the code block once for each item in the list. You can also refer to `<variable name>` in the `<do something>` block.

You can also loop through items within a string. Type the following code into the editor below:

```python
for letter in "hello":
    print(letter)
```

<CodeEditor></CodeEditor>
 
The result should print out each letter of the string `hello`, one by one.

## A Note on Variable Names

In this section, we've discussed books in the context of a list. Why do we use the variable name `books` in this section for our list of book names? Why not just use the variable name `x`, or perhaps `f`?

While the computer might not care if our list of books is called `x`, giving variables meaningful names makes a program considerably easier to read than it would be otherwise. Consider this for loop:

```python
y = ['Gender Trouble', 'Cruising Utopia', 'Living a Feminist Life']

for x in y:
    print(x)
```

Which is easier to read, this `for` loop or the one used in the previous example?

When variable names accurately reflect what they represent, and are therefore meaningful, we call them _semantic_.  Always try to create semantic variable names whenever possible.

## Challenge

1. Here's a list of numbers:

<CodeEditor>
prime_numbers = [2, 3, 5, 7, 11]
</CodeEditor>

Write some code to print out the square of each of these numbers. Remember that the square of a number is that number times itself. The solution is below, but you're not allowed to look at it until you've tried to solve it yourself for 3.5 minutes. (Seriously! That's 210 seconds.)

2. Look up a new concept—"f-string" (a formatting technique for strings)—on Google and, using the code editor above, use it to write a loop that gives the following output:

```pycon
The square of 2 is 4.
The square of 3 is 9.
The square of 5 is 25.
The square of 7 is 49.
The square of 11 is 121.
```

__Note:__ the "f-string" is a new string formatting method for Python 3. You can [read more about this new string formatting method](https://realpython.com/python-f-strings/#f-strings-a-new-and-improved-way-to-format-strings-in-python).

### Solution

1. To get the square of the elements in the list `prime_numbers`, you can:

<Secret>
```python
prime_numbers = [2, 3, 5, 7, 11]

for num in prime_numbers:
    print(num * num)
```
</Secret>

2. Using "f-strings" to output the list of results in the challenge would look something like this:

<Secret>
```python
prime_numbers= [2,3,5,7,11]
for num in prime_numbers:
    print(f"The square of {num} is {num * num}")
```
</Secret>

## Evaluation

What are different ways for describing what a "for loop" can do?

<Quiz>
- for each item in a list, multiply it against itself.*
- print the contents of a list.*
- add a new item to a list.
- loop through characters in a string.
</Quiz>

### Keywords

Do you remember the glossary terms from this section?

- [for loop](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/for_loop.md)
- [f-string](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/f-string.md)

# Conditionals

Conditionals allow programs to change their behavior based on whether some statement is true or false. Let's try this out by writing a script that will give different outputs (consisting of book titles) based on the specified field of study. Type the following into the code editor below:

```python
field = "Media Studies"

if field == "Media Studies":
    print("Grammophone, Film, Typewriter")
else:
    print("I don't know what field you're talking about! I'm just a little program...")
```

<CodeEditor></CodeEditor>

In our first line, we set a variable `field` to the string `"Media Studies"`, representing our chosen field of study. The `if` statement checks whether the field is set to the string "Media Studies". If it is, the code in the block beneath is executed, so the string `"Grammophone, Film, Typewriter"` will be printed.

It's important to note at this point the use of the double equals sign `==` in `if` statements. The double equals is an _equality_ operator, and it checks to see if the two values on either side are equivalent. Contrast this with the single equals that you've already seen, `=`, which is an _assignment_ operator, that assigns a value to a variable. In the line `field = "Media Studies"`, you are using the assignment operator `=` to set the variable's value to "Media Studies", (a string) while in the `if` statement, you're using the equality operator `==` to check if the field is equivalent to "Media Studies".

You'll also notice the inclusion of a new line, the `else` statement. The `else` statement handles any inputs that aren't "Media Studies", and the program merely prints out that it doesn't know what you should bring. You can think of `else` like a fail-safe that catches variables not directly accounted for.

Try this script out both with the variable set to "Media studies" and the variable set to some other value, representing another field of study.

What if we want our program to handle more fields of study, giving different messages for each one? Other cases after the first `if` statement are handled with `elif`, which is a shortened version of `else if`. Add the following code into the editor below:

```python
if field == "Media Studies":
    print("Grammophone, Film, Typewriter")
elif field == "Critical University Studies":
    print("The Undercommons")
elif field == "Textual Scholarship":
    print("Radiant Textuality")
else:
    print("I don't know what field you're talking about! I'm just a little program...")\
```

<CodeEditor>
field = "Media Studies"
</CodeEditor>

Now, if you were to change the `field` variable, you could run other blocks of code. You can add as many `elif` statements as you need, meaning that conditionals in Python have one `if` statement, any number of `elif` statements, and one `else` statement that catches any input not covered by `if` or `elif`. Over the next sections, we'll work on improving this little application, making it able to handle user input directly.

## Challenge

Add two more `elif` statements to the program to make it better able to handle different potential fields of study. Change the field of study a couple of times, making sure to save after each change, to test out your code.

<CodeEditor>
field = "Media Studies"
if field == "Media Studies":
    print("Grammophone, Film, Typewriter")
elif field == "Critical University Studies":
    print("The Undercommons")
elif field == "Textual Scholarship":
    print("Radiant Textuality")
else:
    print("I don't know what field you're talking about! I'm just a little program...")
</CodeEditor>

### Solution

<Secret>
```python
field = "Media Studies"

if field == "Media Studies":
    print("Grammophone, Film, Typewriter")
elif field == "Critical University Studies":
    print("The Undercommons")
elif field == "Textual Scholarship":
    print("Radiant Textuality")
elif field == "Critical Race Studies"
    print("The New Jim Crow")
elif field == "DH Methodologies"
    print("Algorithmic Criticism")
else:
    print("I don't know what field you're talking about! I'm just a little program...")
```
</Secret>

## Evaluation

What is the difference between the double equals (`==`) and single equals (`=`)?

<Quiz>
- The double equals checks to see if one value is equivalent to the other, as in `2 == 2`.*
- The double equals assigns the value on the right to the variable on the left, as in `x == 2`.
- The single equals checks to see if one value is equivalent to the other, as in `2 = 2`.
- The single equals assigns the value on the right to the variable on the left, as in `x = 2`.*
</Quiz>

### Keywords

Do you remember the glossary terms from this section?

- [if-Statement](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/if_statement.md)

# Working With Input

<Info>
If you're using your terminal and text editor to get through the workshop (instead of the built-in emulator in the browser) and are using Python 2.7, replace all `input()` functions in the code below with `raw_input()`. You can check your version by running `python --version` in the command line.
</Info>

### Taking Input

Python allows you to take input directly from the user using the `input()` function.

Let's try it out by setting the function to a variable, which we will call `greeting`. In the REPL below, write the following line of code:

```pycon
>>> greeting = input()
```

When you press <kbd>enter</kbd>, you should see a pop-up asking for input. Type in your favorite greeting. I'm going to type `hey you!`. Then, press <kbd>enter</kbd>. 

<PythonREPL/>

Next, write `greeting` into the REPL. You should see something like the following appear:

```pycon
>>> greeting = input()
greeting
hey you!
```

Python has saved your input text to the variable `greeting`. When you type in `greeting`, it will print out that input text. Pretty nifty, right?

```pycon
>>> greeting = input()
hey you!

>>> greeting
'hey you!'
```

You can play around with `input()` by adding some prompt text within the parenthesis. Whatever you put inside the parenthesis, enclosed by quotes, will prompt the user to type in their text, which is then assigned to the variable set to `input()`. Sounds complicated, so give it some practice with the REPL. 

For instance, if we were to type the following:

```pycon
>>> feelings = input('How are you feeling today? ')
```

We can answer with `like a rollercoaster of emotions`. Then, when we type in our variable `feelings` and press enter, we'll get our input printed back at us. Note that there's a little space after the question mark and before the closing quotation mark, which is to improve readability.

```pycon
>>> feelings = input('How are you feeling today? ')
How are you feeling today? like a rollercoaster of emotions

>>> feelings
'like a rollercoaster of emotions'
```

## Challenge

Remember this loop?

<CodeEditor>
field = "Media Studies"
if field == "Media Studies":
    print("Grammophone, Film, Typewriter")
elif field == "Critical University Studies":
    print("The Undercommons")
elif field == "Textual Scholarship":
    print("Radiant Textuality")
else:
    print("I don't know what field you're talking about! I'm just a little program...")
</CodeEditor>

Now, that we understand a bit about how `input()` works, let's use it to improve our book application. We are going to use `input()` to ask for the field before displaying the output. To do this, add one more line of code in the editor above that sets the `field` variable to an `input()`. Make sure you include a little prompt that asks the user what book they want to select or read that day.

### Solution

<Secret>
```python
field = input("Which field of study do you want to read about today? ")

if field == "Media Studies":
    print("Grammophone, Film, Typewriter")
elif field == "Critical University Studies":
    print("The Undercommons")
elif field == "Textual Scholarship":
    print("Radiant Textuality")
else:
    print("I don't know what field you're talking about! I'm just a little program...")
```
</Secret>

## Evaluation

If we wanted to calculate the length of an input using `len()`, how would we write that expression?

<Quiz>
- `input() = len()`
- `response = len().input()`
- `len(input()) = length_of_response`
- `length_of_response = len(input())`*
</Quiz>

### Keywords

Do you remember the glossary terms from this section?

- [input()](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/input.md)

# Doing Things to Lists

Okay. Let's make our little book application a little more robust. We are going to create a list of books (remember lists?) that we can then manipulate in all sorts of ways.

First, create a new list in the code editor with at least three books that are important to your research right now. Shorten the titles to one or two words if need be. Let's call this list our `library`. Remember the proper syntax for creating a list includes square brackets with commas separating the list items. Because the items are strings, they should also be inside quotes. For instance, your code might look something like:

```python
library = ["Orlando", "Confessions of the Fox", "These Waves of Girls"]
```

<CodeEditor></CodeEditor>

Next, let's sort our `library` in alphabetical order. There's a handy method called `sort()` for doing just this kind of thing. What's a _method_, you might ask? Well, _methods_ are very similar to _functions_, and you'll remember that functions are ways of doing things, like `print()` and `type()`. Methods are also ways of doing things, but these things are attached to what we call _objects_ in Python. Objects are part of object-oriented-programming, and that's definitely not necessary to learn right now. Suffice it to say that methods are just like functions, that is, they are ways of doing things to your data.

To sort the list, use the `sort()` method on your list that you created above. Your code should look like this:

```python
library = ["Orlando", "Confessions of the Fox", "These Waves of Girls"]
library.sort()
print(library)
```
What happened here? Let's take it line by line. First, we created a list `library` with three items attached to it. Then, we applied the `sort()` method to the library list. Finally, we printed the `library`, which is now sorted in alphabetical order.

You'll see that we have a couple of new things happening with symbols.
- First, the period `.` which is an _operator_ in Python. The period operator is another part of object-oriented-programming, and it basically means that we are applying a task to whatever precedes the period. In this case, we are applying the `sort()` method to our `library` list. It's kind of like attaching a function to our `library`.
- Second, we have the parenthesis `()` after `sort`. When you get more comfortable with programming, you'll often use the parentheses to include what we call _arguments_ that allows us to do more complex things to data. Let's see how an argument works with the `append()` method.

What if we want to add items to the list? We can use the `append()` method for that. For instance, try the following:

<CodeEditor>
library = ["Orlando", "Confessions of the Fox", "These Waves of Girls"]
library.append("La Frontera")
print(library)
</CodeEditor>

You can see that we have added `"La Frontera"` as an argument to the `append()` method by putting the string between the parenthesis. It basically means that we will be appending this specific title to the library list.

When you print `library`, you should see your new book appear at the end of the list. Pretty cool, right? Go ahead and add a couple more books to your list.

What if you wanted to take out some of the books? We can use `pop()` to remove the last item, or "pop" it off, from our list.

<CodeEditor>
library = ["Orlando", "Confessions of the Fox", "These Waves of Girls", "La Frontera", "Dawn"]
library.pop()
print(library)
</CodeEditor>

The last item that you added to your list should be missing from the `library` when you print the list.

## Challenge

Remember the `input()` function from the last lesson? This challenge uses that function in combination with what you know about list methods to create a little library app. You will play around with the input button, asking the user what kinds of things they want to do with their library, and writing some code that does those things and prints out the results.

First, create a new file called `library.py`. Save it to your current working folder.

Second, create a list of `library` books, with at least three books (you can use the same ones as before).

```python
library = ["Orlando", "Confessions of the Fox", "These Waves of Girls"]
```

Then, add an input statement that will save the user's response to a variable, like `response`.

```python
response = input("What do you want to do with your books today? ")
```

Now, create a conditional statement that matches the user's response to series of options for doing things to the `library` list. We'll let them sort the library (`sort()`), add new items (`append()`), and remove the last item (`pop()`). I'll do the first one, `sort()`, for you:

<CodeEditor>
library = ["Orlando", "Confessions of the Fox", "These Waves of Girls"]
response = input("What do you want to do with your books today? ")
if response == "sort":
    library.sort()
    print(library)
else:
    print("I don't know what you want me to do!")
</CodeEditor>

See how the order of statements build on each other toward the final product? First, we create a library of books. Then, we set the user's response about what to do with those books. Then, we create a conditional statement that matches the response to specific tasks. The first condition checks to see if the user wants to "sort" the books, then sorts them, then prints the final result.

Next, add `pop()` and `append()` to the program. 

After adding a few more conditions, test out your code! You should have a little library app that sorts, adds, and removes books from your list.

### Solution

<Secret>
```python
library = ["Orlando", "Confessions of the Fox", "These Waves of Girls"]
response = input("What do you want to do with your books today? ")
if response == "sort":
    library.sort()
    print(library)
elif response == "add":
    library.append("La Frontera")
    print(library)
elif response == "remove":
    library.pop()
    print(library)
else:
    print("I don't know what you want me to do!")
```
</Secret>

## Evaluation

Select the following statements that truly describe `sort()`, `append()`, and `pop()`.

<Quiz>
- methods are like functions which are attached to objects.*
- `sort()`, `append()`, and `pop()` are functions.
- `append()` always takes an argument.*
- `pop()` can be applied to a string.
</Quiz>

&nbsp;

__Advanced question:__ If you `sort()` the library in between adding and popping a book, you'll end up with a different list than if you didn't run `sort()` in between `append()` and `pop()`. Can you guess why?

### Keywords

Do you remember the glossary terms from this section?

- [append](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/append.md)
- [sort()](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/sort.md)
- [pop()](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/pop.md)

# Finding Answers with Google

Our library app is working pretty well, but you may have noticed that it's case sensitive:

```
What do you want to do with your books today?
Sort
I don't know what you want me to do!
```

How could we fix our program to handle cases like this? We could add a bunch of new `elif` statements, like this:

```python
...
elif response == "Sort":
    library.sort()
    print(library)
elif response == "SORT":
    library.sort()
    print(library)
...
```

But this is a lot of work, and it's a pretty ugly solution. If we wanted to add more cases to our program, we would have to write them in twice every time, and it still wouldn't fix inputs like `SorT`. The best way to improve our program would be to convert the input to lower case before we send it to our `if/else` block.

Even if you're a super rad Python programmer, you're not going to remember every function name or how to do things you might not have touched in awhile. One thing programmers get very good at is googling for answers. In fact, this is arguably the most important skill in modern-day programming. So, let's use Google to find out how to convert strings to lower case.

Let's try the search term [make string lowercase](http://lmgtfy.com/?q=make+string+lowercase+Python):

![make string lower case Python Google search](/images/python/google_search.png)

While Google searches change over time, some of your results likely come from a site called Stack Overflow. This is a questions and answers site for programmers that usually has strong answers to questions about Python.

![Google search results with stack overflow answer on top](/images/python/google_result.png)

On [this _Stack Overflow_ page](https://stackoverflow.com/questions/6797984/how-do-i-lowercase-a-string-in-python), take a quick look at the question to make sure it's relevant to your problem. Then scroll down to the answers to find what we're looking for. You may also notice snarky debates—another "feature" of _Stack Overflow_.

## Implementing Our Answer

According to this answer, we can make a string lowercase by adding `.lower()` to the end of it, like this:

```pycon
>>> "SORT".lower()
'sort'
```

Let's incorporate this transformation into our library app:

<CodeEditor>
library = ["Orlando", "Confessions of the Fox", "These Waves of Girls"]
response = input("What do you want to do with your books today? ")
response = response.lower()
if response == "sort":
    library.sort()
    print(library)
elif response == "add":
    library.append("La Frontera")
    print(library)
elif response == "remove":
    library.pop()
    print(library)
else:
    print("I don't know what you want me to do!")
</CodeEditor>

This new script should handle any combination of upper or lowercase characters. The new second line sets the response variable to a new value, `response.lower()`, which is a lowercase version of the original input.

There's no shame in googling for answers! Error messages are especially useful to google when you run into them. Keep an eye out for _Stack Overflow_ answers, as they tend to have useful examples. The [official Python documentation](https://docs.python.org/3/) will also frequently come up, but I would recommend avoiding it as a resource until you have more programming experience. It's a great resource, but the way information is presented can be confusing until you get the hang of reading documentation.

Before moving on to the next section, complete the first challenge below. This challenge will teach the skills necessary to complete write more advanced scripts in this workshop.

## Challenge

Let's use a new type of loop, the `while` loop, to make our library app more interactive. We'll use a `while` loop to keep asking the user for input until they type `exit`.

A typical `while` loop looks like this:

```python
while condition:
    # do something
```

We are going to use `while` loops to get Python to repeat loops over and over again. This involves adding a new variable to use as a condition, and a `while` statement. The code should look like this, and it goes right after the `library` list and before your `input` statement.

```python
user_exit = False
while user_exit == False:
    ...
```

Make sure that everything under `while True:` is indented (this creates a "code block," or a group of lines that will be executed together). The `while` loop will keep running until the `user_exit` condition is no longer `False`. Our plan is to make it so that when the user types `exit`, the `user_exit` condition will be `True`, and the loop will stop running.

Give it a shot! Try adding the condition and `while` loop to the program below:

<CodeEditor>
library = ["Orlando", "Confessions of the Fox", "These Waves of Girls"]
# add a new variable condition and while loop here
response = input("What do you want to do with your books today? ")
response = response.lower()
if response == "sort":
    library.sort()
    print(library)
elif response == "add":
    library.append("La Frontera")
    print(library)
elif response == "remove":
    library.pop()
    print(library)
# add an exit condition here
else:
    print("I don't know what you want me to do!")
</CodeEditor>

Once you get the loop to work, you can add more `elif` statements to add more books to the list. Then, run the program, adding books, sorting them and removing them. You can read more about `while` loops [here](https://www.w3schools.com/python/python_while_loops.asp).

### Solution

Here's how you would include a `while` statement in our library application:

<Secret>
library = ["Orlando", "Confessions of the Fox", "These Waves of Girls"]
user_exit = False
while user_exit == False:
    response = input("What do you want to do with your books today? ")
    response = response.lower()
    if response == "sort":
        library.sort()
        print(library)
    elif response == "add":
        library.append("La Frontera")
        print(library)
    elif response == "remove":
        library.pop()
        print(library)
    elif response == "exit":
        print(library)
        user_exit = True
    else:
        print("I don't know what you want me to do!")
</Secret>

## Evaluation

If we wanted to make a string like `'hello'` uppercase, we would use the method `upper()`, in the following way:

<Quiz>
- `upper('hello')`
- `upper().'hello'`
- `'hello'.upper()`*
- `'hello'(upper)`
</Quiz>

### Keywords

Do you remember the glossary terms from this section?

- [lower()](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/lower.md)
- [Method](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/method.md)

# A Little Motivation

Early on, we learned a bit about lists, which look like this:

```python
["Gender Trouble", "Cruising Utopia", "Living a Feminist Life"]
```

We're going to create a small application that will print a random motivational saying every time a user presses <kbd>enter</kbd>. Our first step will be to create a list of positive sayings:

```python
motivational_phrases = [
        "Importing modules is easy!",
        "Programming! Yay!",
        "You write lists like a pro!",
    ]
```

You're still using the same list format. Remember lists open with a square bracket `[`, have items separated with commas, and end with a square bracket `]`, like this:

```python
[1, 2, 3, 4, 5]
```

However, our positivity list above spreads the list out over multiple lines for greater readability, which is allowed in Python. Remember that you can change the strings in the list to whatever phrases you choose.

## Importing a module

Now that we have our sayings, let's use it in conjunction with some functionality from a module that's built into Python: the `random` module.

First we need to __import__ the module.  In the code editor below, write the following line of code _above_ our motivational phrases...

`import random`

...and the following line of code _below_ our motivational phrases:

`print(random.choice(motivational_phrases))`

<CodeEditor>
motivational_phrases = [
        "Importing modules is easy!",
        "Programming! Yay!",
        "You write lists like a pro!",
    ]
</CodeEditor>

Now, each time you run the code, you should see a different motivational phrase as output. The `random.choice` function chooses a random item from a list and returns it. The `.` syntax indicates that the function is coming from the `random` library.

## Challenge

The real point of this section is to learn `import`, which is where Python really starts to get interesting. Python comes with many libraries (importable collections of code), written by others that can be pulled into your program, allowing you to use that functionality. In this challenge, do a little research on Python libraries that might solve a problem for you or address a domain that you're interested in.

Think of something you're interested in doing (statistics, text analysis, web scraping, quantitative analysis, processing Excel/PDF/image files) and search google "<_thing you are interested in_> python library". You're almost certain to find some useful results. For example, if you wanted to find Python libraries for dealing with cleaning up HTML files, you might search one of these:

> working with html python library

> html parser python library

In your research, you may also want to look at the libraries that come with Python. You can find a list of libraries in these libraries [here](https://docs.python.org/3/py-modindex.html).

## Evaluation

What is a module? Select all that apply:

<Quiz>
- A module is a file of code.*
- Applications can incorporate many different modules.*
- A module needs to be downloaded and installed.
- A module needs to be imported with an `import` statement.*
</Quiz>

### Keywords

Do you remember the glossary terms from this section?

- [Modules](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/module.md)
- [Random](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/random.md)
- [while loops](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/while_loop.md)

# Objects in Python

Objects in Python (and other programming languages) are basically containers that can hold data and/or functions inside them. When a function is inside an object, we usually call the function a "method." When data is inside an object, we usually call it an "attribute." The terminology isn't that important, though. What we do need to know is that you can access these "methods" and "attributes" with a `.` (a dot or period).

When we added `sort()`, `append()`, `pop()`, and `lower()` to our library app, we briefly saw how some methods contained inside certain objects in Python, like Lists (for sort, append, and pop), and String objects, like lower.

```pycon
>>> loud_greeting = "HELLO!"

>>> loud_greeting.lower()
'hello!'
```

Many, or most, objects in Python have methods that allow you to use them in different ways. As you move into using more advanced Python, you'll find that understanding what methods are available becomes more important.

## Examining Objects

When you encounter an object, how can you learn its methods and attributes so you can use them? There are two main ways. The first, and likely the most practical, is to read the documentation of the library you're using.

However, you can also use the `dir()` function, which will tell you which methods and attributes are available in an object.

Let's use the REPL for a moment. First, type the following line:

`>>> s = 'Hello, world!'`

Then, use the `dir()` function on `s`:

`>>> dir(s)`

<PythonREPL/>

You should get output like this:

```pycon
['__add__', '__class__', '__contains__', '__delattr__', '__dir__', '__doc__',
...
'startswith', 'strip', 'swapcase', 'title', 'translate', 'upper', 'zfill']
```

The above output shows some of the methods and attributes for Python strings that can be accessed using the dot (`.`) syntax. Also, be aware that Python doesn't print all the possible methods and attributes, just what it considers to be most important. Also, when using `dir()`, you'll mostly want to ignore the methods and attributes that have underscores around them. They mainly have to do with the internals of the Python language. For now, ignore the information within underscores (like `__add__`) and focus on the stuff surrouned by single quotes (like `startswith`).

You can also use `dir()` to see what functions are available from Python libraries that you import. Try importing the `random` library again and see what you get when you enter `dir(random)` in the REPL.

<PythonREPL/>

You should see something like this:

```pycon
>>> import random

>>> dir(random)
['BPF', 'LOG4', 'NV_MAGICCONST', 'RECIP_BPF', 'Random', 'SG_MAGICCONST', 'SystemRandom', 'TWOPI', '_BuiltinMethodType', '_MethodType', '_Sequence', '_Set', '__all__', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', '_acos', '_bisect', '_ceil', '_cos', '_e', '_exp', '_inst', '_itertools', '_log', '_os', '_pi', '_random', '_sha512', '_sin', '_sqrt', '_test', '_test_generator', '_urandom', '_warn', 'betavariate', 'choice', 'choices', 'expovariate', 'gammavariate', 'gauss', 'getrandbits', 'getstate', 'lognormvariate', 'normalvariate', 'paretovariate', 'randint', 'random', 'randrange', 'sample', 'seed', 'setstate', 'shuffle', 'triangular', 'uniform', 'vonmisesvariate', 'weibullvariate']
```

Try entering other objects based on Python types we've already learned to the `dir()` function. For example, you might try `dir([1, 2, 3])` to see what methods are available when using lists.

## Challenge

_Final Challenge_

In this final challenge, we will work more with the `random` library. We'll use the random library to create a basic dice rolling program that will give us a random number between 1 and 6.

Take a look at the following code:

<CodeEditor>
import random
# create a 'roll' function to return a random # between 1-6
def roll():
    return random.randint(1, 6)
# roll the die and print the results
print(f'You rolled a {roll()}.')
</CodeEditor>

First, we `import` the random library into our program. Then, we create a `roll` function that returns a random number between 1 and 6. We'll use the `randint` function from the random library to generate a random number. The `randint` function takes two arguments, the minimum and maximum number that can be returned. We'll use `1` and `6` for the minimum and maximum numbers to create a standard die. To get at our result, we `return` the outcome of the function. 

We'll then `print` the result of `roll` to see exactly what number we rolled. To do so, we use the [`f` string formatting operator](https://realpython.com/python-f-strings/). `f` strings easily allow us to format a string with variables. The `{}` is where we'll put the result of calling `roll`.

If you run this code, you should see a random number generated between 1 and 6.

### Challenge

Starting with the code above, roll the die twice, storing each result. Using both rolls, write a simple program that prints each roll and compares them. If the first roll is greater than the second, print "First roll wins!" If the second roll is greater than the first, print "Second roll wins!". If the rolls are equal, print "Tie!".

### Solution

<Secret>
<CodeEditor>
import random
# create a 'roll' function to return a random # between 1-6
def roll():
    return random.randint(1, 6)
die1 = roll()
die2 = roll()
print(f'The first roll is a {die1}.')
print(f'The second roll is a {die2}.')
if die1 > die2:
    print('First roll wins!')
elif die2 > die1:
    print('Second roll wins!')
else:
    print('Tie!')
</CodeEditor>
</Secret>

# Theory to Practice

Congratulations on completing the Intro to Python workshop! So far, you've learned quite a bit about variables, functions, loops, modules, and other foundational concepts to further your Python journey. For next steps, consider our
suggested introduction to [Python libraries](https://digitalfellows.commons.gc.cuny.edu/2018/02/13/python_libraries/), or trying some of the tutorials or projects listed below. Maybe you want to learn how to
clean text with [Regex](https://automatetheboringstuff.com/2e/chapter7/), or want to dig into web scraping with the Python library [`requests`](https://requests.readthedocs.io/en/master/). Or, if you are interested in strengthening your foundational skills, read one of the most suggested (and free!) beginner Python book,  [How to Think Like a Computer Scientist - Python Edition](https://runestone.academy/runestone/books/published/thinkcspy/index.html). See a full list of our suggestions below. 

### Review Your Knowledge: 10 Questions from the Lessons

__1. Which of the following is not true about a function? (Select one):__

<Quiz>
- A function can only perform mathematical operations.*
- A function can be reused.
- A function can take any number of arguments (including no arguments).
- A function needs to be called in order to run.
</Quiz>

Revisit the [Functions](/workshops/python/?page=7) lesson to learn more.

__2. What are the differences between the terminal, REPL, and text editor? Select the correct statement from the options below.__

<Quiz>
- You can run scripts from the terminal that were written on the text editor.*
- The REPL allows you to save scripts for later use.
- The text editor allows you to test code on the fly.
- The REPL doesn’t allow you to test code on the fly.
</Quiz>

Revisit the [Running Scripts](/workshops/python/?page=5) lesson to learn more.

__3. If we wanted to calculate the length of an input using len(), how would we write that expression? (Select one):__

<Quiz>
- length_of_response = len(input())*
- input() = len()
- response = len().input()
- len(input()) = length_of_response
</Quiz>

Revisit the [Input](/workshops/python/?page=11) lesson to learn more.

__4. What is the difference between the double equals (==) and single equals (=)? (Select all that apply):__

<Quiz>
- The double equals checks to see if one value is equivalent to the other, as in 2 == 2.*
- The single equals assigns the value on the right to the variable on the left, as in x = 2.*
- The double equals assigns the value on the right to the variable on the left, as in x == 2.
- The single equals checks to see if one value is equivalent to the other, as in 2 = 2.
</Quiz>

Revisit the [Conditionals](/workshops/python/?page=10) lesson to learn more.

__5. Select all the variable expressions that are allowed in Python. (Select all that apply):__

<Quiz>
- one = 1*
- first_book = "Orlando"*
- 1 = one
- $$$ = "dollar_signs"
</Quiz>

Revisit the [Variables](/workshops/python/?page=4) lesson to learn more.

__6. Select all the following that accurately describe the data type categories. (Select all that apply):__

<Quiz>
- Booleans represent only True or False values.*
- Strings can contain numbers within quotations, like "1".*
- Lists can contain strings, like ["banana", 'coffee', 'eggs'].*
- Integers can be expressed with numbers like 1 or letters one.
- Lists can contain strings, like ['banana, 'coffee', 'eggs'].
- Lists can contain strings, like ['banana', 'coffee', 'eggs'].*
</Quiz>

Revisit the [Data Types](/workshops/python/?page=3) lesson to learn more.
 
__7. What are different ways for describing what a “for loop” can do? (Select all that apply):__

<Quiz>
- for each item in a list, multiply it against itself.*
- print the contents of a list.*
- add a new item to a list.*
- loop through characters in a string.*
</Quiz>

Revisit the [Loops](/workshops/python/?page=9) lesson to learn more.

__8. Select the following statements that truly describe sort(), append(), and pop(). (Select all that apply):__

<Quiz>
- methods are like functions which are attached to objects.*
- append() always takes an argument.*
- sort(), append(), and pop() are functions.
- pop() can be applied to a string.
- sort(), append(), and pop() are methods.*
</Quiz>

Revisit the [Doing Things to Lists](/workshops/python/?page=12) lesson to learn more.

__9. What are the characteristics of the REPL? (Select all that apply):__

<Quiz>
- The REPL has a prompt that begins with >>>.*
- The REPL can be used to evaluate mathematical expressions like 2 + 2.*
- The REPL has a prompt that begins with $.
- The REPL and the terminal are the same thing.
</Quiz>

Revisit the [Interacting With Python](/workshops/python/?page=2) lesson to learn more.

__10. Why would someone use dir()? (Select all that apply):__

<Quiz>
- to examine a function like print().*
- to see what can be done with an object, like a string or a list.*
- to see what can be done with a variable that’s been assigned to a value.*
- to examine a particular method, like sort().
</Quiz>

Revisit the [Objects in Python](/workshops/python/?page=2) lesson to learn more.

## __Suggested Further Readings and Tutorials__

Hannah Aizenman, a former Digital Fellow, wrote up a great blog post introducing python "libraries," or collections of python code, for various project types, from creating a website, to getting, exploring, and visualizing data, and working with images, video, spreadsheets, among other ideas. Check out her suggestions in [How Do I Solve [insert problem here] With Python?](https://digitalfellows.commons.gc.cuny.edu/2018/02/13/python_libraries/) 

### Other Tutorials

- If you feel like you're ready for more tutorials, you should check out [Google's Python Class](https://developers.google.com/edu/python), a solid introduction that also begins to explore intermediate concepts and modules. 
- To begin using Python for manipulating and analyzing text based data, check out [Python Programming for the Humanities](https://www.karsdorp.io/python-course/), and jump straight into chapter 2.
- For those interested in more general computer science concepts, [How to Think Like a Computer Scientist - Python Edition](https://runestone.academy/runestone/books/published/thinkcspy/index.html) offers a good introduction to python.
- If you learn best by watching videos, Paul Vierthaler’s recorded and uploaded his DH class, [Hacking the Humanities](https://www.youtube.com/playlist?list=PL6kqrM2i6BPIpEF5yHPNkYhjHm-FYWh17), to Youtube. Includes a general introduction to coding principles, introduction to python, with emphasis on text analysis, data manipulation, and web scraping.
- If you learn best by copying and practicing, [Learn Python the Hard Way](https://learnpythonthehardway.org/book/), by Zed A. Shaw, is an excellent a hands-on resource. Although the online and print book versions cost money, you can test out a sample for free. 

### Projects or Challenges to Try

- [Automate the Boring Stuff](https://automatetheboringstuff.com/) contains many little projects for strengthening beginner and intermediate python skills. You might [play around with *regular expressions*](https://automatetheboringstuff.com/2e/chapter7/) (or *regex*), which is a method for locating and manipulating certain patterns of text (think of it like a high powered `ctrl-F`). Once you feel more comfortable with regex, you might write a program that [organizes or renames the files on your computer](https://automatetheboringstuff.com/2e/chapter10/). Just be sure to practice with a sample folder & files before moving on to your own documents!
- Interested in web scraping (aka grabbing information from the web)?
  The python library
  [`requests`](https://requests.readthedocs.io/en/master/) handles
  requests over the internet. See this handy step-by-step [tutorial on
  Real Python](https://realpython.com/python-requests/). 
- *Advanced Challenge*: This is more complicated stuff, but if you're
  interested in working with CSV data and visualization techniques,
  you might check out Python libraries for data analysis, like Bokeh
  and Pandas. See Programming Historian's [Visualizing Data with Bokeh
  and
  Pandas](https://programminghistorian.org/en/lessons/visualizing-with-bokeh)
  for a tutorial. To learn more about Pandas from the ground up, check
  out
  [Learn Data Science's useful introduction](https://www.learndatasci.com/tutorials/python-pandas-tutorial-complete-introduction-for-beginners/).  

## Discussion Questions

- What kind of data types are available? What is the difference between a string and a list? Why do these differences matter?
- Describe the process of using both a text editor and a terminal to write and execute Python scripts. 
- How do you write a program that can "make decisions" based on certain conditions? What are the parts that you would need?
- In what ways does the internet (using google) help someone to use and learn Python? 
- What are "libraries" or "modules", where do they come from, and what are they used for?