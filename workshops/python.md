---
title: Introduction to Python
excerpt: Python is a general-purpose programming language suitable for a wide variety of tasks in the digital humanities. Learning Python fundamentals is a gateway to analyzing data, creating visualizations, composing interactive websites, scraping the internet, and engaging in the distant reading of texts. This workshop first introduces participants to core programming concepts such as data types, variables, and functions. Participants will then learn about basic control flow by writing small programs with loops and conditional statements. They will also learn to problem solve, and practice searching for answers and debugging scripts. The workshop wraps up by exposing participants to intermediate tools for further exploration.
cover_image: /images/workshops/img2.jpg
learning objectives:
    - Understand what Python is and, in general terms, what it can do.
    - Run Python programs, both by interacting directly with the interpreter and by preparing and running scripts.
    - Distinguish among five core data types—integers, floats, strings, booleans, and lists.
    - Become familiar with core programming concepts, including variables, loops, and conditionals.
    - Engage with error output and use the internet and documentation to independently research language features.
    - Learn how to find and import code from external sources to solve more complex problems.
estimated time:
    - 3 - 4 hours
dependencies: 
    workshop prerequisites: 
        command-line: 
            excerpt: Introduction to the Command Line (Required) This workshop makes reference to concepts from the Command Line workshop, and having basic knowledge about how to use the command line will be central for anyone who wants to learn about programming with Python.
            required: true
        data-ethics: 
            excerpt: Data Ethics (Recommended) This workshop will give you a basis for thinking through the ethical considerations of your programming projects.
            recommended: true
    installations:
        pythonguide: 
            excerpt: You can use any installation of Python (but make sure it is of version 3). For our purposes, Anaconda will provide everything necessary for all the workshops that are part of the DHRI curriculum.
            recommended: true
        visual-studio-code: 
            excerpt: (Recommended) You can use any plain text editor, but for our purposes Visual Studio Code ("VS Code") will be used.
            recommended: true
readings:
    - Want to learn programming, but not convinced that the Python language is the right language? Check out [Five Reasons Why Learning Python Is The Best Decision](https://medium.com/datadriveninvestor/)
    - "Some concrete ideas for how to use Python: [What Can I Do With Python?](https://realpython.com/what-can-i-do-with-python/)"

ethical considerations:
    - Python works by reducing data to portable units and presenting them in a way that prioritizes readability. These units are known as "data types" and include strings (words/letters), integers (numbers), booleans (true or false statements), and lists (groups of strings). The python grammar, which dictates how python statements ought to be ordered, values simplicity, efficiency, and concision. You can read more about Python values at [the Zen of Python](https://www.python.org/dev/peps/pep-0020/).
    - As we learn about the Python data types and grammar, keep in mind that working within any digital format requires making seemingly neutral choices that carry ethical consequences. When using python, be aware of the ways the ways that data is transformed into computable form. What choices are you making about your data? What is being included, and what is left out? What are reductions and assumptions necessary to encode your data? If you are more interested in thinking further about data types and our choices in relation to data, you should have a look at our [Data Literacies workshop](https://www.github.com/DHRI-Curriculum/data-literacies).

projects:
    description: "Projects that use the skills you'll learn in this workshop:"
    The NEH Impact Index:
        excerpt: Built by former Digital Fellow Patrick Smyth, The NEH Impact Index makes visible the distribution of funds by National Endowment for the Humanities across the United States. The website uses python to map projects, communities, and cultural institutions who have received NEH support. You can check out the code on Github.
        link: http://www.nehimpact.org/about
    Mapping Arts NYC: 
        excerpt: Mapping Arts NYC, created in 2019 by the Graduate Center’s Data for Public Good fellows, “is a project that explores the geography and representation of arts and culture in New York City over time.” It includes a number of Python scripts written to clean and make sense of all the data.
        link: http://gcdiprojects.org/MappingArtsNYC/
resources:
    Digital Fellows’ Python Cheat Sheet: 
        excerpt: See the Digital Fellows’ Python Cheat Sheet for handy commands that we cover in this workshop.
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


# Interacting with Python

<CodeEditor>
print('Hello, world!')
print("This is a string.")
14
</CodeEditor>

<EditorWithTabs>
print('hi')
33
</EditorWithTabs>

Let's begin by starting an "interactive session" session with Python. This means we will be using Python in the terminal, which is a special space that allows us to run little bits of Python, experimenting and exploring what it can do, without having to save it. Think of this interactive space as a playground. Later on, we will be working with Python in a more robust way, doing what we call saving and executing Python scripts.

For now, though, let's start an interactive session with Python, which is accessed through the terminal.

Open your terminal and type:

```console
$ python
```

at the prompt. You should see something like this

```pycon
Python 3.7.6 (default, Jan  8 2020, 13:42:34)
[Clang 4.0.1 (tags/RELEASE_401/final)] :: Anaconda, Inc. on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

Unlike the normal `$` terminal prompt (or `%` if you are on MacOS), the Python prompt looks like this:

```pycon
>>>
```

These greater-than symbols `>` are how you know that you have entered an interactive session with Python. Now you are interacting directly with Python, rather than in the regular terminal. Keep an eye on these greater-than symbols, as a common early source of confusion is entering terminal commands into the Python prompt or entering Python commands into the terminal.

## A Little Math

Let's try a little math at the Python prompt. In the example below, type the text that appears after the Python prompt (the `>>>`). The line below is the output that is returned. This will be a standard convention when giving examples using the Python prompt.

```pycon
>>> 2 + 3
5

>>> 14 - 10
4

>>> 10 * 10
100

>>> 6 / 3
2

>>> 21 % 4
1
```

The first four operations above are addition, subtraction, multiplication, and division, respectively. The last operation is modulo, or mod, which returns the remainder after division.

Note the way you interact with Python at the prompt. After entering an expression such as `2 + 3`, Python "evaluates" it to a simpler form, `5`, and then prints out the answer for you. **This process is called the Read Eval Print Loop, or REPL**. Reading takes commands from you, the input is evaluated or run, the result is printed out, and the prompt is shown again to wait for more input. The normal terminal (the one with the `$`) is another example of a REPL.

The REPL is useful for quick tests and, later, can be used for exploring and debugging your programs interactively. You might consider it a kind of playground for testing and experimenting with python expressions.

## Challenge

1. For a few minutes, practice moving in and out of Python's interactive mode (aka the REPL). You can get out of Python by hitting <kbd>control</kbd> + <kbd>d</kbd> (or <kbd>control</kbd> + <kbd>z</kbd> or <kbd>control</kbd> + <kbd>z</kbd> + <kbd>enter</kbd> if you're on a computer running Windows) or by typing `exit()`. You can get back in the REPL by typing `python` at the `$` prompt. Remember that you're in the REPL when you see `>>>`, and you're in bash or your terminal when you see the `$`.

2. One "operator" (math symbol) we didn't learn is the exponent—you know, "x raised to the power of..." If you were Guido van Rossum, the creator of Python, how would you define this operator?

## Solution

2. The exponent operator is two asterisks (`**`). For example, the number `3` to the power of `2` would be expressed as `3**2`.

## Evaluation

What are the characteristics of the REPL? Select all that apply.
<Quiz>
- The REPL has a prompt that begins with `$`.
- The REPL has a prompt that begins with `>>>`.*
- The REPL and the terminal are the same thing.
- The REPL can be used to evaluate mathematical expressions like `2 + 2`.*
</Quiz>

## Keywords

Do you remember the glossary terms from this section?

- [REPL](/terms/repl.md)

# Types

Types are classifications that let the computer know how a programmer intends to use a piece of data. You can just think of them as, well, types of data.

We've already seen one type in the last section: the integer. In this section, we'll learn four more: the floating point number, the string, the boolean, and the list.

Enter these lines as you see them below:

```pycon
>>> type(1)
<class 'int'>

>>> type(1.0)
<class 'float'>

>>> type("Hello there!")
<class 'str'>

>>> type(True)
<class 'bool'>

>>> type([1, 2, 3])
<class 'list'>
```

Each of the responses show how the different types of data registers as different "types" for Python:

**Integers** (like `1` above) are whole numbers.

**Floats** (like `1.0` above) are numbers with decimals, and are treated a little differently than integers.

**Strings** (like `"Hello there!"` above) are arbitrary sets of characters, such as letters and numbers. You can think of them as a way to store text.

**Booleans**: (like `True` above) is a fancy term for values representing "true" and "false," or "truthiness" and "falsiness." In Python they are always capitalized: `True` and `False`.

**Lists**: (like `[1, 2, 3]` above) are ordered collections of values. You can put any of the other types in a list: `["hello", "goodbye", "see ya later"]` is also a valid list.

Don't worry about trying to actively remember these types. We'll be working with each in turn in the following sections.

<PythonREPL/>

## What's the deal with type()?

`type()` is a function. You can think of functions in Python in a few different ways:

1. A way of doing something in Python.
2. A way of saving some code for reuse.
3. A way of taking an input, transforming that input, and returning an output. The input goes in the parentheses `()`.

These are all valid ways of thinking about functions. We'll be learning more about functions in later sections.

## Challenge

Open your web browser, and google the phrase "python function." Skim through the first few results. What words do you recognize, and which ones look unfamiliar? What do you think the unfamiliar ones mean? Try to rephrase some of this new language, and guess what they mean in your own words.

## Solution

When you google "python function," you may see some phrases that look unfamiliar, like "return value" or "pass parameters." These are advanced terms for inputting and outputting data from a function. It's important to become familiar with the Python's terminology about functions, as it will be helpful later on when you start working with these components.

## Evaluation

Select all the following that accurately describe the data type categories.

- Booleans represent only `True` or `False` values.*
- Integers can be expressed with numbers like `1` or letters `one`.
- Strings can contain numbers within quotations, like `"1"`.*
- Lists can contain strings, like `['banana, 'coffee', 'eggs']`.*

## Keywords

Do you remember the glossary terms from this section?

- [Function](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/function.md)
- [Boolean](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/boolean.md)
- [Float](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/float.md)
- [Integer](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/integer.md)
- [String](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/string.md)
- [List](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/list.md)
- [Type()](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/type.md)

# Variables

A variable is **a symbol that refers to an object**, such as a string, integer, or list. If you're not already at the Python prompt, open your terminal and type `python` at the `$`. You're in the right place when you see `>>>`.

Try these commands in order:

```pycon
>>> x = 5

>>> x
5

>>> x + 10
15

>>> y = "hello"

>>> y
'hello'

>>> y + " and goodbye"
'hello and goodbye'
```

As you can see from the examples above, the `=` sign lets you assign symbols like `x` and `y` to data.

Variables can be longer words as well, and they can be set to lists:

```pycon
>>> books = ['Gender Trouble', 'Cruising Utopia','Living a Feminist Life']

>>> books
['Gender Trouble', 'Cruising Utopia', 'Living a Feminist Life']

>>> type(books)
<class 'list'>
```

Variables can have letters, numbers, and underscores, **but should start with a letter**.

If you are curious about learning more about naming conventions for variables, you can check out the PEP8 style guide's section on [Naming Conventions](https://www.python.org/dev/peps/pep-0008/#naming-conventions). PEP8 is the widely accepted guide for Python programmers everywhere.

## Challenge

So I just told you that variables shouldn't start with a number or an underscore. What does that even mean? Will your computer explode if you write `1_book = "Gender Trouble"`?

Only one way to find out. Try giving weird names to variables and see if you can learn a bit about the rules.

## Solution

There are a few rules regarding the way that you write the variable statement. This is because Python reads everything left to right, and needs things to be in a certain order.

First, you cannot use any numbers or special characters to start a variable name. So `1_book`, `1book`, or any variable that contains special characters `@`, `#`, `$`, `$`, etc, wouldn't be acceptable in Python. You must start the variable with a letter and avoid using special characters.

You can incorporate numbers after you've started with a letter. So `book_1` or `b1` is acceptable, though you cannot use special characters at any point in the variable name.

Second, you might also notice that variable syntax requires you to write the variable name first, followed by an equal sign `=`, and then the value, or data. You cannot start the variable statement with the data value, because python always recognizes the first thing written as the thing to be assigned. The thing that comes after the `=` is the data that becomes attached to the preceding variable.

## Evaluation

Select all the variable expressions that are allowed in Python.

- `1 = one`
- `one = 1`*
- `$$$ = "dollar_signs"`
- `first_book = "Orlando"`*

## Keywords

Do you remember the glossary terms from this section?

- [Variables](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/variables.md)

# Running Scripts

So far, you've interacted with Python one line at a time in the REPL. This is what we call the Interactive Mode, which is, as we mentioned, like a playground for experimenting and exploring different Python expressions, such `2 + 2` or `type("some stuff")`. The code that we write in the REPL is not saved after you exit, which means that this space is for running Python expressions and *not* for writing longer programs.

For the rest of this session, we're going to expand beyond the REPL to write and execute longer programs. To do this, we will begin to work with a text editor, where we write out Python scripts, and run those scripts from the terminal.

This is a big move, so let's take it slow. To reiterate, the major change is that we will be working across two spaces, the terminal and the text editor, rather than just the terminal alone. We will be writing our scripts into the text editor, and using the terminal to run those scripts.

## Your First Script

First, let's begin with the text editor. Open your text editor of choice (such as Visual Studio Code) and create a new file with this line:


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
Hello world!
```

You should see the text `Hello world!` appear as output in the terminal window.

Congratulations! You've written your first script. That's a big deal!

There are a couple of important things to note here:
- First, it bears repeating that you are moving between two different spaces, the text editor and the terminal. You wrote your Python script in the text editor, and used the terminal to run the script.
- Second, within in the text editor, you included the `print()` function because, unlike in the REPL, things aren't automatically printed out when writing scripts. When you're in the text editor, you always need to include the `print()` function so that your output will appear in the terminal.

## A Note on Text

Fundamentally, Python programs are just text files. You can write them in any text editor, like Visual Studio Code or Notepad on Windows. When you pass the text file to Python, it runs the code in the file one line at a time. There's nothing special about `.py` files—they're just regular text files. This makes them work well with command line tools like Git. The tools you can learn through the DHRI Curriculum—the command line, Git, markdown, grep—are all designed to work well together, and the medium through which they all work is plain text.

## Challenge

1. Rewrite your program so that you assign the message to a variable, then print the variable. This will make your program two lines instead of one. There's a fancy programmer word for rewriting your code without changing its behavior—"refactoring."

2. (optional) Are you already getting sick of typing `python hello.py` again and again? Try typing `!!` in the command line (the `$`). This will run your last line of code again. Additionally, you can press the <kbd>up arrow</kbd> at the terminal prompt, and keep pressing it to scroll through the most recent commands.

3. (even more optional) If you're on Windows and have a minute, try pressing the <kbd>windows</kbd> button on your keyboard and searching for a program called `IDLE` that comes with Python. It's a special editor (or IDE) that lets you run Python code from inside it. You might like it more than Git Bash.

## Solution

1. You should type the following into `hello.py`:

    ```python
    greeting = "Hello World!"
    print(greeting)
    ```

    Then, making sure you're in the right directory, run `python hello.py` in the terminal `$`. You should see the following output:

    ```console
    $ python hello.py
    Hello world!
    ```

## Evaluation

What are the differences between the terminal, REPL, and text editor? Select the correct statement from the below options.

- You can run scripts from the **terminal** that were written on the text editor. *
- The **REPL** allows you to save scripts for later use.
- The **text editor** allows you to test code on the fly.

## Keywords

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

In this below example, the syntax error is a common one—mismatched single and double quotes, which is not allowed in Python. You can replicate the below error by opening the REPL (type `python` in the command line) and entering the line after the `>>>` prompt.

```pycon
>>> print('This string has mismatched quotes. But Python will help us figure out this bug.")
  File "<stdin>", line 1
    print('This string has mismatched quotes. But Python will help us figure out this bug.")
                                                                                           ^
SyntaxError: EOL while scanning string literal
```

Note the caret (`^`) underneath the mismatched quote, helpfully pointing out where the error lies. Similarly, if this error happened when running a script, Python would tell us the filename and the line number for the line on which the error occurs.

**Traceback errors**: These errors occur during the execution of a Python program when the program finds itself in an untenable state and must stop. Traceback errors are often logical inconsistencies in a program that is valid Python code. A common traceback error is referring to a variable that hasn't been defined, as below.

```pycon
>>> print(not_a_variable)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'not_a_variable' is not defined
```

Traceback errors try to tell you a little about what happened in the program that caused the problem, including the category of error, such as `NameError` or `TypeError`.

## Debugging

Debugging is a fancy word for fixing problems with a program. Here are some common strategies for debugging a program when first learning Python:

- If the error is a syntax error:
    - Look at where the caret is pointing.
    - Pay attention to grammatical features such as quotes, parentheses, and indentation.
    - Consider reading the program, or the offending line, backward. It's surprising, but this often helps to detect the issue.
- If the error is a traceback error:
    - First look at the line where the error occured, then consider the general category of error. What could have gone wrong?
    - If the error is a name error (NameError), check your spelling.
    - Try copying the last line of the error and pasting it into Google. You'll often find a quick solution this way.
- If you changed the program and expect a different output, but are getting old output, you may not have saved the file. Go back and make sure the file has been correctly saved.

## Challenge

Try to create as many errors as you can in the next few minutes. After getting your first two syntax errors, try instead to get traceback errors. Some areas to try include mathematical impossibilities and using math operations on types that do not support them.

## Solution

Some examples of **syntax errors** include...

- Starting the variable name with a special character.

    ```pycon
    >>> %greeting = "Hello World"
      File "<stdin>", line 1
        %greeting = "Hello World"
        ^
    SyntaxError: invalid syntax
    ```

- Starting a variable by writing the data values before the variable.

    ```pycon
    >>> "hey there!" = greeting
      File "<stdin>", line 1
    SyntaxError: can't assign to literal
    ```

- Including spaces in a variable.

    ```pycon
    >>> pleasant greeting = "Hello!"
      File "<stdin>", line 1
        pleasant greeting = "Hello!"
                        ^
    SyntaxError: invalid syntax
    ```

Some examples of **traceback errors** include...

- Concatenating data types, like strings and integers.

    ```pycon
    >>> greeting = "hello" + 1
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    TypeError: can only concatenate str (not "int") to str
    ```

- Using Booleans (`True` or `False`) without capitalizing them.

    ```pycon
    >>> greeting = false
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    NameError: name 'false' is not defined

    >>> greeting = False

    >>> greeting
    False
    ```

## Evaluation

If you get an error, what can you do to debug it? Select all that apply:

- If it's a _syntax error_, look for the caret as a starting point.*
- If it's a _traceback error_, make sure all your variables are defined.*
- Copy the error message into a Google search.*
- Run spell check on your code.

## Keywords

Do you remember the glossary terms from this section?

- [Syntax Errors](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/syntax_error.md)
- [Traceback Errors](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/traceback_error.md)

# Functions

Broadly defined, a function is a block of reusable code that performs a specific task. Often, a function takes an input, transforms the input, and returns an output. Imagine, for instance, a [penny press](https://en.wikipedia.org/wiki/Elongated_coin) at a popular tourist attraction that accepts a penny (the input), flattens and embosses the penny (the transformation), and spits out an elongated coin with a new design, perhaps an image of the Statue of Liberty (the output)! Or, for those of you who remember high school algebra, the function `f(x) = x + 1` means that given an input `x`, the function will return `x + 1`. For example, if I substituted `2` for `x`, my function would read `f(2) = 2 + 1`, or `f(2) = 3`. In this case, my input was `2`, the transformation was to add `1`, and the output was `3`. These are the basic concepts that make up a function in Python as well! 

## Writing your first function

In a text editor, let's write a Python function that prints the output from our alegebraic equation `f(x) = x + 1` above:

```python
def add_one(x):
  print(x + 1)
```

Let's break that down. When creating a function, we begin by writing `def` before our chosen function name. The function name is typically descriptive in nature. We named the above function `add_one` following [Python naming conventions](https://www.python.org/dev/peps/pep-0008/#function-and-variable-names), as the function will be ADDING 1 to our inputted integer. We always need a closed parentheses `()` after our function name, which in this case, takes one argument (or input), which we will temporarily call `x` (we can name this parameter whatever we want, as long as we use the same name within the body of the function). Then, we end the first line with a `:`, return, and indent by 2 spaces to write code describing what this function should "do." In this case, we want the function to `print` the result of adding `1` to our input, or `x`. Remember, we need parentheses every time we print something!

Next, if we want to call our function from the terminal, we will need to actually pass in an argument to see a result! Let's add the following line of code below our function (make sure this next line isn't indented):

```python
add_one(2)
```

Here, we are telling the computer to pass in `2` to see if we get our expected output of `3`. Now, save this file to your Desktop as `function.py`, and run the script from your terminal:

```console
$ cd Desktop
$ python function.py
```

Did you get `3`? 

### Optional 
To see the magic of the function in action, try going back to your text editor and adding extra lines of code with different arguments, making sure to hit "save" after doing so:

```python
add_one(155)
add_one(5)
add_one(-1)
```

Call `function.py` again from the terminal. Do you notice how the function printed the sum of each of these numbers plus one? Writing this function helped us to automate this simple process of addition for each given input! Granted, creating a whole function just to add "one" to something may seem unnecessarily complicated, but once you have learned the basics of function-writing, the possibilities are powerful and limitless!

### Advanced
Note that writing a function this way only prints the result, but does not actually `return` it. Read more about the difference between `print` and `return` [here](https://pythonprinciples.com/blog/print-vs-return/). If we wanted our function to actually perform the operation AND print it, we could revise our code as follows:

```python
def add_one(x):
  return x + 1

print(add_one(2))
```

## Writing your second function

Our functions do not have to be "mathematical" in nature. Let's say that I wanted to say a friendly hello, but didn't want to type out a long sentence every time I wanted to do so. I could automate this process by writing the following function:

```python
def greet():
  print("Hello! How are you today?")
```

Remember, we also need to call the function if we want it to run. So, add the following line after your code:

```python
greet()
```

Save the file as `greet.py`, and call it from your terminal. You might have noticed that this time, we didn't pass in an argument! Note that a function doesn't have to take an input (or argument), or it can take several arguments! There is a lot of flexibility involved in writing your own functions, which you can craft carefully to do exactly what you want them to! Read more about some of the many things you can do with functions on the online web tutorial [W3Schools](https://www.w3schools.com/python/python_functions.asp).

## Challenge

How could we change our greeting function to say hello to a specific person? Hint: your print statement will need to use string interpolation. We did this in "3. Variables" when we assigned y to "hello" `y = "hello"`, and then added `y + " and goodbye"`, which yielded the result `"hello and goodbye"`.

## Solution
```python
def greet(person):
  print("Hello " + person + "! How are you today?")

greet("Sarah")
```
The result of calling this in your terminal prints `"Hello Sarah! How are you today?"`

## Evaluation

Which of the following are not true about a function?:

- A function can be reused
- A function can take any number of arguments (including no arguments)
- A function needs to be called in order to run
- A function can only perform mathematical operations*

## Keywords
- [argument] - "An argument is the value that is sent to the function when it is called." -https://www.w3schools.com/python/python_functions.asp
- [parameter] - "A parameter is the variable listed inside the parentheses in the function definition." -https://www.w3schools.com/python/python_functions.asp 
- [function] A function is block of reusable code that performs a specific task.

# Lists

Remember lists? They look like this:

```python
books = ['Gender Trouble', 'Cruising Utopia', 'Living a Feminist Life']
```

For now, let's just create a list and print it out. In a text editor, our script will look like this:

```python
books = ['Gender Trouble', 'Cruising Utopia', 'Living a Feminist Life']
print(books)
```

Save this to a new file called `loop.py` and run it with `python loop.py`. You should see the list printed out in the terminal.

So far, we've only learned one function: `type()`. Let's try out another, called `len()`, which returns the number of items in a list or the number of characters in a string. 

First, let's "comment out" the `print(books)` statement with the hastag `#`, which tells python to ignore that line of code. Then, type out the following lines in your loop.py file:

```python
books = ['Gender Trouble', 'Cruising Utopia', 'Living a Feminist Life']
# print(books)

list_length = len(book)

print(list_length)
```

Let's take apart this unfamiliar line of code: `list_length = len(book)`
- First, we have saved a list of books to the variable, `books`.
- Second, look to the next line this statement. `list_length = len(book)` takes the `books` variable from the previous line as an *argument* (or input data) for the `len()` function. That's why `books` is within the parenthesis. This syntax means that python will run the `len()` function on the items in `books`. Then, it sets the result of that process to a new variable, called `list_length`.
- Finally, we print the `list_length` value.

This might appear a bit complex at first, but if you read the line slowly you should be able to connect the dots.

Notice that when you run the code above, you don't see the `books` list printed out. That's because that line has become a comment. If you put a `#` (hash or pound) at the beginning of a line, that line will be ignored.

## List Indexing

A useful property of a list is the list index. This allows you to pick out an item from within the list by a number starting from zero:

```python
print(books[0]) # Gender Trouble
print(books[1]) # Cruising Utopia
```

Note that the first item in the list is `item[0]`. The second item is `item[1]`. That's because counting in Python, and in almost all programming languages, starts from `0`.

Additionally, you can print out the last item in a list using negative numbers, where `-1` denotes the last item in the list:

```python
print(books[-1]) # Living a Feminist Life
```

## Slicing Lists

There are many things you can do with list indexing, like slicing. Slicing consists of taking a section of a list, using the list index to pick out a range of list items. For example, you could take out the first _two_ items of a list with a slice that begins with `0` and ends with `2`.

The slice syntax consists of square brackets, start point and end point, and a colon to indicate the gap in between. This should print out the first two items of your list.

```python
print(books[0:2])
```

Note a couple of things. First, the start point is *inclusive*, meaning that Python will include the `[0]` item in your range, and the end point is _exclusive_, so Python won't print the `[2]` item. Instead, it will print everything up until that `[2]` item.

For ultimate brevity, you can also write this expression as:

```python
print(books[:2])
```

The empty value before the colon allows Python to assume the range starts at the first list item, at `[0]`. You can also end the slice with `:`, if you want the list range to include all subsequent items until the end of the list. The example below will print everything from the second item to the end of the list.

```python
print(books[1:])
```

With a list that contains three items total, list slicing might not seem very impressive right now. However, this will become a powerful tool once we get to more sophisticated text analysis and start to encounter lists that contain hundreds (or thousands!) of items.

## Challenge

Create a new list of books in the REPL, with at least 5 books in your list. Make sure the total number of books in the list is an **odd** number. How do you get python to print out the book in the middle of the list? What about the three books in the middle? Remember that the first value in a slice is _inclusive_, and the final value is _exclusive_.

## Solution

```pycon
>>> books = ['Gender Trouble', 'Cruising Utopia', 'Living a Feminist Life', 'Radiant Textuality', 'The Undercommons']

>>> books[2] # ['Living a Feminist Life']

>>> books[1:4] # ['Cruising Utopia', 'Living a Feminist Life', 'Radiant Textuality']
```

## Evaluation

How would you get Python to print the length of the last book in the list? Hint: this number reflects the length of the _string_ which is the last item in the list. Choose the correct expression from the options below.

- `len(books)`
- `print(books[-1])`
- `print(len[-1])`
- `print(len(books[-1]))`*

## Keywords

Do you remember the glossary terms from this section?

- [list](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/list.md)
- [list indexing](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/list_indexing.md)
- [len()](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/len.md)

# Loops

What if we want to print out each item in the list separately? For that, we'll need something called a loop:

```python
books = ['Gender Trouble', 'Cruising Utopia', 'Living a Feminist Life']
# print(books)

for book in books:
    print("My favorite book is " + book)
```

What's happening here? This kind of loop is called a "for loop", and tells Python: "for each item in the list, do something." Let's break it down:

```python
for <variable name> in <list name>:
    <do something>
```

Indented code like this is known as a "code block." Python will run the `<do something>` code in the code block once for each item in the list. You can also refer to `<variable name>` in the `<do something>` block.

You can also loop through items within a string. For example, type the following into your `loop.py` file:

```python
for letter in "hello":
    print(letter)
```

The result should print out each letter of the string `hello`, one by one.

## A Note on Variable Names

In this section, we've discussed books in the context of a list. Why do we use the variable name `books` in this section for our list of book names? Why not just use the variable name `x`, or perhaps `f`?

While the computer might not care if our list of books is called `x`, giving variables meaningful names makes a program considerably easier to read than it would be otherwise. Consider this for loop:

```python
y = ['Gender Trouble', 'Cruising Utopia', 'Living a Feminist Life']

for x in y:
    print(x)
```

Which is easier to read, this for loop or the one used in the example?

When variable names accurately reflect what they represent, and are therefore meaningful, we call them "semantic." Always try to create semantic variable names whenever possible.

## Challenge

1. Here's a list of numbers:

    ```python
    prime_numbers = [2, 3, 5, 7, 11]
    ```

    Write some code to print out the square of each of these numbers. Remember that the square of a number is that number times itself. The solution is below, but you're not allowed to look at it until you've tried to solve it yourself for 3.5 minutes. (Seriously! That's 210 seconds.)

2. First, ignore this challenge because it's too hard. Next, look up a new concept—"f-string" (a formatting technique for strings)—on Google and use it to write a loop that gives the following output:

    ```pycon
    The square of 2 is 4.
    The square of 3 is 9.
    The square of 5 is 25.
    The square of 7 is 49.
    The square of 11 is 121.
    ```

    Note: the "f-string" is a new string formatting method for Python 3. You can [read more about this new string formatting method](https://realpython.com/python-f-strings/#f-strings-a-new-and-improved-way-to-format-strings-in-python).

## Solution

1. To get the square of the elements in the list `prime_numbers`, you can:

    ```python
    prime_numbers = [2, 3, 5, 7, 11]

    for num in prime_numbers:
        print(num * num)
    ```

2. Using "f-strings" to output the list of results in the challenge would look something like this:

    ```python
    prime_numbers= [2,3,5,7,11]
    for num in prime_numbers:
        print(f"The square of {num} is {num * num}")
    ```

## Evaluation

What are different ways for describing what a "for loop" can do?

- for each item in a list, multiply it against itself.*
- print the contents of a list.*
- add a new item to a list.
- loop through characters in a string.

## Keywords

Do you remember the glossary terms from this section?

- [for-loop](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/for_loop.md)
- [f-string](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/f-string.md)

# Conditionals

Conditionals allow programs to change their behavior based on whether some statement is true or false. Let's try this out by writing a script that will give different outputs (consisting of book titles) based on the specified field of study:

```python
field = "Media Studies"

if field == "Media Studies":
    print("Grammophone, Film, Typewriter")
else:
    print("I don't know what field you're talking about! I'm just a little program...")
```

In our first line, we set a variable `field` to the string `"Media Studies"`, representing our chosen field of study. The `if` statement checks whether the field is set to the string "Media Studies". If it is, the code in the block beneath is executed, so the string `"Grammophone, Film, Typewriter"` will be printed.

It's important to note at this point the use of the double equals sign `==` in `if` statements. The double equals is an _equality_ operator, and it checks to see if the two values on either side are equivalent. Contrast this with the single equals that you've already seen, `=`, which is an _assignment_ operator, that assigns a value to a variable. In the line `field = "Media Studies"`, you are using the assignment operator `=` to set the variable's value to "Media Studies", (a string) while in the `if` statement, you're using the equality operator `==` to check if the field is equivalent to "Media Studies".

You'll also notice the inclusion of a new line, the `else` statement. The `else` statement handles any inputs that aren't "Media Studies", and the program merely prints out that it doesn't know what you should bring.


Try this script out both with the variable set to "Media studies" and the variable set to some other value, representing another field of study.

What if we want our program to handle more fields of study, giving different messages for each one? Other cases after the first `if` statement are handled with `elif`, which is a shortened version of `else if`:

```python
field = "Media Studies"

if field == "Media Studies":
    print("Grammophone, Film, Typewriter")
elif field == "Critical University Studies":
    print("The Undercommons")
elif field == "Textual Scholarship":
    print("Radiant Textuality")
else:
    print("I don't know what field you're talking about! I'm just a little program...")
```

You can add as many `elif` statements as you need, meaning that conditionals in Python have one `if` statement, any number of `elif` statements, and one `else` statement that catches any input not covered by `if` or `elif`. Over the next sections, we'll work on improving this little application, making it able to handle user input directly.

## Challenge

Add two more `elif` statements to this program to make it better able to handle different potential fields of study. Change the field of study a couple of times, making sure to save after each change, to test out your code.

## Solution

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

## Evaluation

What is the difference between the double equals (`==`) and single equals (`=`)?

- The double equals checks to see if one value is equivalent to the other, as in `2 == 2`.*
- The double equals assigns the value on the right to the variable on the left, as in `x == 2`.
- The single equals checks to see if one value is equivalent to the other, as in `2 = 2`.
- The single equals assigns the value on the right to the variable on the left, as in `x = 2`.*

## Keywords

Do you remember the glossary terms from this section?

- [if-Statement](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/if_statement.md)

# Input

**Note:** If you're using Python 2.7, replace all `input()` functions in the code below with `raw_input()`. You can check your version by running `python --version` in the command line.


Python allows you to take input directly from the user using the `input()` function.

Let's try it out by setting the function to a variable, which we will call `greeting`. Open the Python REPL and type:

```pycon
>>> greeting = input()
```

When you press <kbd>enter</kbd>, you should see a blank line. Type in your favorite greeting. I'm going to type `hey you!`. Then, press <kbd>enter</kbd>.

```pycon
>>> greeting = input()
hey you!
```

Python has saved your input text to the variable `greeting`. When you type in `greeting` one more time, it will print out that input text. Pretty nifty, right?

```pycon
>>> greeting = input()
hey you!

>>> greeting
'hey you!'
```

You can play around with `input()` by adding some prompt text within the parenthesis. Whatever you put inside the parenthesis, enclosed by quotes, will prompt the user to type in their text, which is then assigned to the variable set to `input()`. Sounds complicated, so give it some practice:

```pycon
>>> feelings = input('How are you feeling today? ')
How are you feeling today?
```

Note that there's a little space after the question mark and before the closing quotation mark, which is to improve readability.

We can answer with `like a rollercoaster of emotions`. Then, when we type in our variable `feelings` and press enter, we'll get our input printed back at us.

```pycon
>>> feelings = input('How are you feeling today? ')
How are you feeling today? like a rollercoaster of emotions

>>> feelings
'like a rollercoaster of emotions'
```

## Challenge

Remember this loop?

```python
field = "Media Studies"

if field == "Media Studies":
    print("Grammophone, Film, Typewriter")
elif field == "Critical University Studies":
    print("The Undercommons")
elif field == "Textual Scholarship":
    print("Radiant Textuality")
else:
    print("I don't know what field you're talking about! I'm just a little program...")
```

Now, that we understand a bit about how `input()` works, let's use it to improve our book application. We are going to use `input()` to ask for the field before displaying the output. To do this, add one more line of code that sets the `field` variable to an `input()`. Make sure you include a little prompt that asks the user what book they want to select or read that day.

## Solution

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

## Evaluation

If we wanted to calculate the length of an input using `len()`, how would we write that expression?

- `input() = len()`
- `response = len().input()`
- `len(input()) = length_of_response`
- `length_of_response = len(input())`*

## Keywords

Do you remember the glossary terms from this section?

- [input()](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/input.md)

# Doing Things to Lists

Okay. Let's make our little book application a little more robust. We are going to create a list of books (remember lists?) that we can then manipulate in all sorts of ways.

First, go back to your terminal and enter the REPL, or Python's interactive mode. When you see the `>>>`, create a list with at least three books that are important to your research right now. Shorten the titles to one or two words if need be. Let's call this list our `library`. Remember the proper syntax for creating a list includes square brackets with commas separating the list items. Because the items are strings, they should also be inside quotes.

```pycon
library = ["Orlando", "Confessions of the Fox", "These Waves of Girls"]
```

Next, let's sort our `library` in alphabetical order. There's a handy method called `sort()` for doing just this kind of thing. What's a _method_, you might ask? Well, _methods_ are very similar to _functions_, and you'll remember that functions are ways of doing things, like `print()` and `type()`. Methods are also ways of doing things, but these things are attached to what we call _objects_ in Python. Objects are part of object-oriented-programming, and that's definitely not necessary to learn right now. Suffice it to say that methods are just like functions, that is, they are ways of doing things to your data.

To sort the list, use the `sort()` method on your list. It should look like this:

```pycon
library = ["Orlando", "Confessions of the Fox", "These Waves of Girls"]
library.sort()
print(library)
```

What happened here? Let's take it line by line. First, we created a list `library` with three items attached to it. Then, we applied the `sort()` method to the library list. Finally, we printed the `library`, which is now sorted in alphabetical order.

You'll see that we have a couple of new things happening with symbols.
- First, the period `.` which is an _operator_ in Python. The period operator is another part of object-oriented-programming, and it basically means that we are applying a task to whatever precedes the period. In this case, we are applying the `sort()` method to our `library` list. It's kind of like attaching a function to our `library`.
- Second, we have the parenthesis `()` after `sort`. When you get more comfortable with programming, you'll often use the parentheses to include what we call _arguments_ that allows us to do more complex things to data. Let's see how an argument works with the `append()` method.

What if we want to add items to the list? We can use the `append()` method for that. Try:

```pycon
library = ["Orlando", "Confessions of the Fox", "These Waves of Girls"]
library.append("La Frontera")
print(library)
```

Here, we added `"La Frontera"` as an argument to the `append()` method by putting the string between the parenthesis. It basically means that we will be appending this specific title to the library list.

When you print `library`, you should see your new book appear at the end of the list. Pretty cool, right? Go ahead and add a couple more books to your list.

What if you wanted to take out some of the books? We can use `pop()` to remove the last item, or "pop" it off, from our list.

```pycon
library = ["Orlando", "Confessions of the Fox", "These Waves of Girls", "La Frontera", "Dawn"]
library.pop()
print(library)
```

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

Now, create a conditional statement that matches the user's response to series of options for doing things to the `library` list. You can include `sort()`, `append()`, and `pop()`. I'll do the first one, `sort()`, for you:

```python
library = ["Orlando", "Confessions of the Fox", "These Waves of Girls"]
response = input("What do you want to do with your books today? ")
if response == "sort":
    library.sort()
    print(library)
else:
    print("I don't know what you want me to do!")
```

See how the order of statements build on each other toward the final product? First, we create a library of books. Then, we set the user's response about what to do with those books. Then, we create a conditional statement that matches the response to specific tasks. The first condition checks to see if the user wants to "sort" the books, then sorts them, then prints the final result.

After adding a few more conditions, test out your code! You should have a little library app that sorts, adds, and removes books from your list.

## Solution

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
## Evaluation

Select the following statements that truly describe `sort()`, `append()`, and `pop()`.

- methods are like functions which are attached to objects.*
- `sort()`, `append()`, and `pop()` are functions.
- `append()` always takes an argument.*
- `pop()` can be applied to a string.

Advanced question: If you `sort()` the library in between adding and popping a book, you'll end up with a different list than if you didn't run sort() in between `append()` and `pop()`. Can you guess why?

## Keywords

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

This is a lot of work, and it's a pretty ugly solution. If we wanted to add more cases to our program, we would have to write them in twice every time, and it still wouldn't fix inputs like `SorT`. The best way to improve our program would be to convert the input to lower case before we send it to our `if/else` block.

## Googling for Answers

Even if you're a super rad Python programmer, you're not going to remember every function name or how to do things you might not have touched in awhile. One thing programmers get very good at is googling for answers. In fact, this is arguably the most important skill in modern-day programming. So let's use Google to find out how to convert strings to lower case.

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

OK, that seems to work. Let's incorporate this transformation into our library app:

```python
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
```

This new script should handle any combination of upper or lowercase characters. The new second line sets the response variable to a new value, `response.lower()`, which is a lowercase version of the original input.

There's no shame in googling for answers! Error messages are especially useful to google when you run into them. Keep an eye out for _Stack Overflow_ answers, as they tend to have useful examples. The [official Python documentation](https://docs.python.org/3/) will also frequently come up, but I would recommend avoiding it as a resource until you have more programming experience. It's a great resource, but the way information is presented can be confusing until you get the hang of reading documentation.

Before moving on to the next section, complete the first challenge below. This challenge will teach the skills necessary to complete write more advanced scripts in this workshop.

## Challenge

*Note: the first challenge is **required** in order to complete further sections.

1. We are going to use `while` loops to get Python to repeat loops over and over again. This involves adding a `while` statement to your library app. The code should look like this, and it goes right after the `library` list and before your `input` statement.

    ```python
    while True:
        ...
    ```

    Make sure that everything under `while True:` is indented (this creates a "code block," or a group of lines that will be executed together).

    To stop the loop, you can press <kbd>control</kbd> + <kbd>c</kbd> in the terminal. This stops the program from being run, what we call "interrupting" the program. You can also add a `break` statement somewhere in your code which will automatically exit the program. For example:

    ```python
        if response == "sort":
            library.sort()
            print(library)
            break
        ...
        else:
            print("I don't know what you want me to do!")
    ```

    Once you get the loop to work, you can add more `elif` statements to add more books to the list. Then, run the program, adding books, sorting them and removing them. Read more about `while` loops [here](https://www.w3schools.com/python/python_while_loops.asp).

2. (optional) OK, I told you not to look at the Python documentation. But doesn't that make you really want to go look at the Python documentation? How bad could this "documentation" really be? What terrible secrets might it hold?

    Fine. Have a look at the [Python documentation on built-in functions](https://docs.python.org/3/library/functions.html). Don't say I didn't warn you.

## Solution

1. Here's how you would include a `while` statement in our library application:

    ```python
    library = ["Orlando", "Confessions of the Fox", "These Waves of Girls"]
    while True:
        response = input("What do you want to do with your books today? ")
        response = response.lower()
        if response == "sort":
            library.sort()
            print(library)
        elif response == "add":
            library.append("La Frontera")
            print(library)
        elif response == "add again":
            library.append("In the Dreamhouse")
            print(library)
        elif response == "more books":
            library.append("Giovanni's Room")
            print(library)
        elif response == "moar":
            library.append("Nightwood")
            print(library)
            break
        elif response == "remove":
            library.pop()
            print(library)
        else:
            print("I don't know what you want me to do!")
    ```

## Evaluation

If we wanted to make a string like `'hello'` uppercase, we would use the method `upper()`, in the following way:

- `upper('hello')`
- `upper().'hello'`
- `'hello'.upper()`*
- `'hello'(upper)`

## Keywords

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

```python
import random

motivational_phrases = [
        "Importing modules is easy!",
        "Programming! Yay!",
        "You write lists like a pro!",
    ]

print(random.choice(motivational_phrases))
```

The `random.choice` function chooses a random item from a list and returns it. The `.` syntax indicates that the function is coming from the `random` library.

## Challenge

1. As with our library app, this positive saying generator could be improved by making it so the program doesn't have to run again every time to get new output. Add a while loop for the final version. Remember to include a `break` statement or use <kbd>control</kbd> + <kbd>c</kbd> to get out of the loop! Read more [about while loops here](https://www.w3schools.com/python/python_while_loops.asp).

2. The real point of this section is to learn `import`, which is where Python really starts to get interesting. Python comes with many libraries (importable collections of code), written by others that can be pulled into your program, allowing you to use that functionality. In this challenge, do a little research on Python libraries that might solve a problem for you or address a domain that you're interested in.

Think of something you're interested in doing (statistics, text analysis, web scraping, quantitative analysis, processing Excel/PDF/image files) and search google "<_thing you are interested in_> python library". You're almost certain to find some useful results. For example, if you wanted to find Python libraries for dealing with cleaning up HTML files, you might search one of these:

> working with html python library

> html parser python library

In your research, you may also want to look at the libraries that come with Python. You can find a list of libraries in these libraries [here](https://docs.python.org/3/py-modindex.html).

## Solution

1. Here's how you could add a `while` loop to our positive saying generator:

    ```python
    import random

    while True:
        motivational_phrases = [
            "Importing modules is easy!",
            "Programming! Yay!",
            "You write lists like a pro!",
            ]

        # Because this is input, the user will need to hit enter to see a new phrase
        input(random.choice(motivational_phrases))
    ```

## Evaluation

What is a module? Select all that apply:

- A module is a file of code.*
- Applications can incorporate many different modules.*
- A module needs to be downloaded and installed.
- A module needs to be imported with an `import` statement.*

## Keywords

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

When you encounter an object, how can you learn its methods and atributes so you can use them? There are two main ways. The first, and likely the most practical, is to read the documentation of the library you're using.

However, you can also use the `dir()` function, which will tell you which methods and attributes are available in an object.

Let's use the REPL for a moment—open it by typing `python` at the command line.

```pycon
>>> s = 'Hello, world!'

>>> dir(s)
['__add__', '__class__', '__contains__', '__delattr__', '__dir__', '__doc__',
...
'startswith', 'strip', 'swapcase', 'title', 'translate', 'upper', 'zfill']
```

The above output shows some of the methods and attributes for Python strings that can be accessed using the dot (`.`) syntax. Also, be aware that Python doesn't print all the possible methods and attributes, just what it considers to be most important. Also, when using `dir()`, you'll mostly want to ignore the methods and attributes that have underscores around them. They mainly have to do with the internals of the Python language. For now, ignore the information within underscores (like `__add__`) and focus on the stuff surrouned by single quotes (like `startswith`).

You can also use `dir()` to see what functions are available from Python libraries that you import. Try importing the `random` library again and see what you get when you enter `dir(random)`.

```pycon
>>> import random

>>> dir(random)
['BPF', 'LOG4', 'NV_MAGICCONST', 'RECIP_BPF', 'Random', 'SG_MAGICCONST', 'SystemRandom', 'TWOPI', '_BuiltinMethodType', '_MethodType', '_Sequence', '_Set', '__all__', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', '_acos', '_bisect', '_ceil', '_cos', '_e', '_exp', '_inst', '_itertools', '_log', '_os', '_pi', '_random', '_sha512', '_sin', '_sqrt', '_test', '_test_generator', '_urandom', '_warn', 'betavariate', 'choice', 'choices', 'expovariate', 'gammavariate', 'gauss', 'getrandbits', 'getstate', 'lognormvariate', 'normalvariate', 'paretovariate', 'randint', 'random', 'randrange', 'sample', 'seed', 'setstate', 'shuffle', 'triangular', 'uniform', 'vonmisesvariate', 'weibullvariate']
```

Try entering other objects based on Python types we've already learned to the `dir()` function. For example, you might try `dir([1, 2, 3])` to see what methods are available when using lists.

## Challenge

*Advanced Final Challenge*:

Let's try out a library for web scraping, called `requests`. It allows you to send queries over web browsers (which we call HTTP requests) in order to grab data from websites. It is a foundational module for web scraping tasks. While `requests` is relatively easy to grasp at first, it has a bit of a learning curve. With some practice, though, it can yield sophisticated web scraping results.

For this challenge, let's get some hands-on practice using `requests`, to scrape the surface of what it can do. Feel free to attempt as much of this challenge as you are comfortable with.

First, import requests into your REPL:

```pycon
>>> import requests
```

Then, let's set up a request _object_. Basically, we will declare a variable `r` to represent the content from a website that we want to scrape. After the equal sign `=`, we call the `requests` module, and within that module, a method called `get`, which includes the parameter of the website URL, enclosed in single quotes. Like so:

```pycon
>>> import requests

>>> r = requests.get('https://www.nytimes.com')
```

Now, let's examine that request object. Use the `dir` function to see what methods and attributes are available to `r`. Focus on the items within single quotes, rather than the underscores. Look up any of the items that seem interesting but unclear to you. Try to find out what at least one of these methods does, such as `encoding`. Can you try out some of these methods in the REPL? This would involve adding the dot operator `.` to your variable `r`, followed by the method.

Even if you don't understand the results—that's okay! This is an advanced challenge, meant to expose you to the beginning of your exploration with this module. This is only the first step to running more robust web scraping experiments.

## Solution

First, checking out what methods are available to the `r` object:

```pycon
>>> dir(r)
['__attrs__', '__bool__', '__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__enter__', '__eq__', '__exit__', '__format__', '__ge__', '__getattribute__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__nonzero__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__setstate__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_content', '_content_consumed', '_next', 'apparent_encoding', 'close', 'connection', 'content', 'cookies', 'elapsed', 'encoding', 'headers', 'history', 'is_permanent_redirect', 'is_redirect', 'iter_content', 'iter_lines', 'json', 'links', 'next', 'ok', 'raise_for_status', 'raw', 'reason', 'request', 'status_code', 'text', 'url']
```

Then, trying out some of the methods:

```pycon
>>> r.status_code
200

>>> r.encoding
'utf-8'

>>> r.cookies
<RequestsCookieJar[Cookie(version=0, name='nyt-a', value='04u7q0SFZ2OpnpLqevHY65', port=None, port_specified=False, domain='.nytimes.com', domain_specified=True, domain_initial_dot=True, path='/', path_specified=True, secure=True, expires=1627494229, discard=False, comment=None, comment_url=None, rest={'SameSite': 'none'}, rfc2109=False), Cookie(version=0, name='nyt-gdpr', value='1', port=None, port_specified=False, domain='.nytimes.com', domain_specified=True, domain_initial_dot=True, path='/', path_specified=True, secure=False, expires=1595979829, discard=False, comment=None, comment_url=None, rest={}, rfc2109=False), Cookie(version=0, name='nyt-geo', value='PT', port=None, port_specified=False, domain='.nytimes.com', domain_specified=True, domain_initial_dot=True, path='/', path_specified=True, secure=False, expires=1595979829, discard=False, comment=None, comment_url=None, rest={}, rfc2109=False), Cookie(version=0, name='nyt-purr', value='cfhspnahhu', port=None, port_specified=False, domain='.nytimes.com', domain_specified=True, domain_initial_dot=True, path='/', path_specified=True, secure=True, expires=1627494229, discard=False, comment=None, comment_url=None, rest={'SameSite: Lax': None}, rfc2109=False)]>

```

What do these methods do? For the `r.status_code`, the `200` return value means that the request was successful, because 200 is the HTTP code for a successful request. This is opposed to 400 codes, like 404 error, which indicates a failure to reach the website.

The most useful method, however, is likely `text`:

```pycon
>>> r.text
...
```

`text` allows you to access the text content of the site you have requested, which is extremely useful when you want to scrape websites for information, for instance.

This is just the tip of the iceberg for using `requests`. In order to get more information, you'll have to read up on the module. Here is [an excellent tutorial](https://scotch.io/tutorials/getting-started-with-python-requests-get-requests) to get started.

## Evaluation

Why would someone use `dir()`? Select all that apply:

- to examine a function like `print()`.*
- to see what can be done with an object, like a string or a list.*
- to see what can be done with a variable that's been assigned to a value.*
- to examine a particular method, like `sort()`.

## Keywords

Do you remember the glossary terms from this section?

- [Modules](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/module.md)
- [requests](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/requests.md)
- [Objects](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/object.md)
- [dir()](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/dir.md)
