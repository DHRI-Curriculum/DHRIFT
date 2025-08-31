---
title: 'Python for Researchers'
cover title: Python
description: This is a hands-on introduction to Python, designed for graduate students and researchers interested in automating research tasks, analyzing data, and creating reproducible computational workflows. By the end of this course, you'll be able to collect data from web APIs, clean and analyze it with pandas, create publication-quality visualizations, and share your work professionally, even without a computer science background.
cover_image: /images/python/test.png

readings:
    - "Think Python (Free Online Book): [Think Python](https://greenteapress.com/wp/think-python-2e/) - An excellent, gentle introduction to programming"
    - "Python for Everybody: [Python for Everybody](https://www.py4e.com/) - Free materials focused on data retrieval and processing"
    - "Pandas Documentation: [10 Minutes to Pandas](https://pandas.pydata.org/pandas-docs/stable/user_guide/10min.html) - Quick start guide for data analysis"
    - "Real Python Tutorials: [Real Python](https://realpython.com/) - High-quality tutorials on specific topics"

long_pages: true

authors:
    - 'Stephen Zweibel'

editors:
    - 'Stephen Zweibel'

goals:
    - description: 'In this workshop, you will learn to:'
    - "Understand core programming concepts: variables, data types, operators, control flow (conditionals, loops), functions, and scope."
    - "Distinguish among Python's core data structures: strings, numbers, lists, and dictionaries."
    - Write and run Python code in the browser REPL, in script files, and in Jupyter notebooks.
    - Set up a professional Python development environment on your own computer.
    - Collect and process data from web APIs programmatically.
    - Clean, filter, and analyze tabular data using the pandas library.
    - Create publication-quality visualizations with matplotlib and seaborn.
    - Understand modern AI-assisted programming workflows while maintaining the ability to debug and verify code.
    - Package and share reproducible research projects on GitHub.
programming_language: 'python'
---

# Introduction

Welcome to *Python for Researchers*, a course for researchers outside computer science who want to use programming in their work. We'll focus on practical tasks you can use right away: analyzing texts, processing survey data, and making clear visualizations.

## Learning Outcomes

By the end of this course, successful students will:

- Write Python code confidently at a beginner-to-intermediate level
- Understand core programming concepts that apply across all languages
- Automate repetitive research tasks that might otherwise take weeks by hand
- Collect data from online sources programmatically
- Clean, analyze, and visualize data using professional tools
- Share reproducible computational research that others can verify and build upon
- Understand how AI tools are changing programming workflows
- Be prepared for continued learning in data science and computational methods

## Why Learn Python?

Programming, at its heart, is about teaching a computer to do tedious work for you. As researchers, we often face tasks that involve scale and repetition:

1. **Scale:** Reading thousands of documents, processing hundreds of survey responses, analyzing millions of data points. What would take months by hand can be done in minutes with code.

2. **Reproducibility:** When you analyze data by hand or in Excel, it's hard for others (or even yourself months later) to understand exactly what you did. Code documents your process, making your research transparent and reproducible.

3. **Flexibility:** Unlike point-and-click software with fixed features, programming lets you build the tool you need for your research question.

4. **Community:** Python has an enormous, welcoming community. Whatever problem you're trying to solve, someone has built a tool (called a "library") to help you.

Python is a good first language because:
- Its syntax is readable and beginner-friendly
- It is widely used in data analysis and scientific computing
- It provides libraries for many research tasks
- It is free and open-source
- Skills learned in Python transfer to other languages

## The Process of Learning to Program

Learning to program is similar to learning a human language. You need:

1. **Vocabulary:** The basic commands and keywords (like `print`, `if`, `for`)
2. **Grammar:** How to structure these commands into valid statements
3. **Idioms:** Common patterns that experienced programmers use
4. **Fluency:** The ability to express your ideas naturally in code

Just as you wouldn't learn French by memorizing a dictionary, you won't learn Python by memorizing commands. Instead, we'll learn by doing: building small programs that gradually increase in complexity.

## What We'll Build Together

This course is project-driven. We'll start with the basics, but we're building toward a complete research workflow. By the end, you'll create a data analysis project that:

- Collects real data from New York City's 311 service request system
- Cleans and processes thousands of records
- Answers research questions through analysis
- Creates publication-quality visualizations
- Shares everything in a professional, reproducible format

## How This Course Works

Each lesson builds on the previous ones, introducing new concepts through practical examples. We'll use several different environments:

1. **Browser-based REPL:** For your first steps, we'll use an interactive Python environment right in your browser. No installation needed!
2. **Professional setup:** Once you're comfortable with basics, we'll set up Python on your computer
3. **Jupyter notebooks:** The standard tool for data science, combining code, results, and narrative
4. **GitHub:** Where you'll share your final project with the world

Don't worry if these terms are unfamiliar, we'll explain everything step by step.

## Acknowledgements

This material draws inspiration from several excellent resources: *Think Python* by Allen Downey for its clear explanations of fundamental concepts; *Python for Everybody* by Charles Severance for its focus on practical data tasks; the pandas and matplotlib communities for their exceptional documentation; and countless Stack Overflow contributors who've answered beginners' questions with patience and clarity.

# Getting Started with Python

Let's begin. As is tradition in programming, our first program will display the words "Hello, World!". This serves as a simple check that the environment is working.

But there's something deeper happening here. When you write your first program, you're joining a community of millions who started the same way. Every expert programmer, from the creators of your favorite apps to NASA engineers, wrote this same simple program when they were learning.

## Hello, World!

### Understanding How Python Runs

Before we write our first line of code, let's understand what we're actually doing. Python is an **interpreted language**. There's a program (the Python interpreter) that reads your code line by line and executes it. Think of the interpreter as a literal-minded assistant who follows your instructions as written.

We'll start in the **REPL** (Read-Evaluate-Print Loop), which is like having a conversation with Python. You type a command, Python executes it immediately and shows you the result, then waits for your next command. It's perfect for learning because you get instant feedback.

### The `print()` Function

The most basic way to display output in Python is with the `print()` function. A **function** in programming is a named command that performs a specific task. Functions are like verbs in human language: they do things.

Type the following into the Python REPL below and press <kbd>Enter</kbd>:

```pycon
>>> print("Hello, World!")
```

<PythonREPL/>

Let's break down what just happened:

- **`print`**: This is the function name. It tells Python "display the following on screen"
- **`()`**: Parentheses always follow a function name. They hold what we're giving to the function
- **`"Hello, World!"`**: This is a **string** (text data) that we're asking Python to display
- The quotes (either single `'` or double `"`) tell Python that this is literal text, not a command

**Syntax Notes:**
- Python is **case-sensitive**: `print` works, but `Print` or `PRINT` will cause an error
- The quotes around text are required. Try `print(Hello)` without quotes and you'll get an error because Python thinks Hello is a variable name (which doesn't exist yet)
- You can use either single or double quotes: `'Hello'` or `"Hello"` both work
- In Python, you don't need semicolons at the end of lines (unlike many other languages)

Try modifying the message:

```pycon
>>> print("Hello, Python!")
>>> print('My name is Ada')  # Single quotes work too
>>> print("It's a beautiful day")  # Double quotes are useful when your text contains apostrophes
```

<PythonREPL/>

<Info>The `#` symbol starts a comment - text that Python ignores. We use comments to leave notes for ourselves and other programmers.</Info>


## Data Types and Variables

Programming is fundamentally about working with different kinds of information. Just as in research you work with different types of sources (texts, numbers, images), in programming we work with different **data types**. Each type has its own properties and uses.

### Numbers

Python understands two main types of numbers, and the distinction matters for your calculations:

#### Integers (whole numbers)

Integers (`int` for short) are whole numbers without decimal points. Use them for counting discrete things:

```pycon
>>> 42
>>> -17
>>> 1_000_000  # Python lets you use underscores for readability in large numbers
>>> 2024
```

<PythonREPL/>

#### Floating-point numbers (decimals)

Floats (`float` for short) are numbers with decimal points. Use them for measurements and calculations that need precision:

```pycon
>>> 3.14159
>>> -273.15  # Absolute zero in Celsius
>>> 2.0      # Even .0 makes it a float
>>> 1.23e5   # Scientific notation: 123000.0
```

<PythonREPL/>

**Why the distinction matters:** Operations with integers stay as integers when possible (except division), while operations with floats always produce floats. This affects both precision and performance in large calculations.

You can perform all the arithmetic operations you'd expect:

```pycon
>>> 10 + 5      # Addition
>>> 10 - 5      # Subtraction  
>>> 10 * 5      # Multiplication
>>> 10 / 5      # Division (always returns a float!)
>>> 2 ** 8      # Exponentiation (2 to the power of 8)
>>> 10 // 3     # Floor division (returns an integer) - more advanced
>>> 10 % 3      # Modulo (remainder after division) - more advanced
```

<PythonREPL/>

<Info>Note: Division (`/`) always returns a float, even when dividing evenly. If you need an integer result, use floor division (`//`).</Info>

### Strings

Strings are how Python represents text. They're called "strings" because they're a string (sequence) of characters. Strings must be enclosed in quotes:

```pycon
>>> "Hello, World!"
>>> 'Python is fun'
>>> """This is a
multi-line
string"""  # Triple quotes allow line breaks
>>> ""  # An empty string is valid
```

<PythonREPL/>

**Quote flexibility:** Python lets you choose your quote style. This is helpful:
- Use double quotes when your text contains apostrophes: `"It's nice"`
- Use single quotes when your text contains double quotes: `'She said "Hello"'`
- Use triple quotes for multi-line text or when your text contains both types of quotes

### Booleans

Booleans represent truth values: either `True` or `False` (note the capital letters!). They're named after George Boole, a mathematician who founded the field of Boolean algebra. These are the foundation of all decision-making in programs:

```pycon
>>> True
>>> False
>>> 5 > 3       # Comparison expressions evaluate to booleans
>>> 2 == 2      # Is 2 equal to 2?
>>> 1 != 1      # Is 1 not equal to 1?
```

<PythonREPL/>

Booleans will become crucial when we learn about conditions and loops. They're how programs make decisions.

### Checking Types

When you're unsure what type of data you're working with, Python's `type()` function tells you:

```pycon
>>> type(42)
>>> type(3.14)
>>> type("hello")
>>> type(True)
>>> type(5 > 3)  # What type does a comparison produce?
```

<PythonREPL/>

This is really useful when debugging. Many errors come from trying to perform an operation on the wrong type of data.

### Variables: Giving Names to Values

So far, every value we've created has disappeared after we used it. Variables let us store values and refer to them by name. Think of a variable as a labeled box where you can store a value and retrieve it later.

Creating a variable uses **assignment** with the `=` operator (single equals sign):

```pycon
>>> message = "Hello, World!"
>>> year = 2024
>>> pi = 3.14159
>>> is_running = True
```

Now we can use these names instead of typing the values:

```pycon
>>> print(message)
>>> print(year)
>>> next_year = year + 1
>>> print(next_year)
```

<PythonREPL/>

**Variable naming rules and conventions:**
- Must start with a letter or underscore: `name`, `_private`
- Can contain letters, numbers, underscores: `data_2024`, `user_name`
- Cannot contain spaces or special characters: `my-var` is invalid
- Cannot be Python keywords: `for`, `if`, `class` are reserved
- Case matters: `name`, `Name`, and `NAME` are different variables

**Python naming conventions (PEP 8 style guide):**
- Use **snake_case** for variables and functions: `student_count`, `calculate_average`
- Use **CAPITAL_SNAKE_CASE** for constants: `MAX_ATTEMPTS`, `PI`
- Use **PascalCase** for classes (we'll learn about these later): `StudentRecord`
- Choose descriptive names: `temperature` is better than `t`
- Avoid single letters except in short loops (we'll see this later)

Variables can be reassigned. The box can hold different values over time:

```pycon
>>> count = 10
>>> print(count)
>>> count = count + 1  # Take the current value, add 1, store it back
>>> print(count)
```

**Compound Assignment Operators**: Python provides shortcuts for common operations. Instead of writing `count = count + 1`, you can write `count += 1`. The `+=` operator adds the right side to the variable and stores the result back in the variable.

```pycon
>>> count += 1  # Same as: count = count + 1
>>> print(count)
```

Other compound operators work the same way: `-=`, `*=`, `/=`, etc.

<PythonREPL/>

### Getting User Input

Sometimes you want your program to interact with the user. Python provides the `input()` function for this:

```pycon
>>> name = input("What's your name? ")
>>> print("Hello, " + name)
```

The `input()` function:
- Displays the prompt message to the user
- Waits for the user to type something and press Enter
- Returns what the user typed as a string
- Always returns a string, even if the user types numbers

```pycon
>>> age_text = input("Enter your age: ")
>>> age_number = int(age_text)  # Convert string to integer
>>> print("Next year you'll be " + str(age_number + 1))
```

<PythonREPL/>

### Essential Built-in Functions

You just used `int()` to convert a string to a number. Python comes with several built-in functions like this that you'll use constantly. Let's explore the most important ones.

When you need to convert between different types of data, Python provides three main conversion functions. The `int()` function converts text or decimal numbers to whole numbers. The `float()` function converts text or whole numbers to decimal numbers. And the `str()` function converts numbers (or anything else) back to text.

```pycon
>>> int("123")      # Text to number
123
>>> float("3.14")   # Text to decimal
3.14
>>> str(123)        # Number to text
'123'
```

Recall: to check the data type at any time, use `type(value)`.

The `len()` function tells you how long something is - how many characters in a string, how many items in a list, and so on:

```pycon
>>> len("hello")
5
>>> len("Python programming")
18
```

```pycon
>>> # Converting between types
>>> text_number = "42"
>>> real_number = int(text_number)
>>> print("Text: " + text_number)
>>> print("Number: " + str(real_number))
>>> print("Length of text: " + str(len(text_number)))
```

<PythonREPL/>

## Review Questions

What will be displayed when you run `print("Hello")`?

<Quiz>
- Hello*
- "Hello"
- print("Hello")
- Nothing
</Quiz>

Which of the following are valid variable names in Python? (Select all that apply)

<Quiz>
- user_name*
- 2nd_place
- _private*
- my-variable
- firstName*
- class
- CONSTANT_VALUE*
</Quiz>

What is the data type of `3.0`?

<Quiz>
- int
- float*
- str
- bool
</Quiz>

What value does `10 / 5` produce?

<Quiz>
- 2
- 2.0*
- 5
- 0.5
</Quiz>

## Challenges

1. **Temperature Converter:** Create variables for a temperature in Celsius (like `celsius = 25`). Calculate the Fahrenheit equivalent using the formula: F = C × 9/5 + 32. Store the result in a new variable and print both temperatures with descriptive messages.

2. **Personal Info:** Create variables for your first name, last name, age, and whether you're a student (boolean). Print a formatted sentence using all these variables.

3. **Type Investigation:** Create a variable with the value `"123"`. Check its type. Now create another variable that converts this to an actual number using `int()`. What happens if you try to add 10 to each variable?

### Challenge 1: Temperature Converter
<Secret>
```python
# Temperature Converter Solution
celsius = 25
fahrenheit = celsius * 9/5 + 32
print("Temperature in Celsius: " + str(celsius))
print("Temperature in Fahrenheit: " + str(fahrenheit))
# Or with more descriptive output:
print(str(celsius) + "°C is equal to " + str(fahrenheit) + "°F")
```
</Secret>

### Challenge 2: Personal Info
<Secret>
```python
# Personal Info Solution
first_name = "Ada"
last_name = "Lovelace"
age = 36
is_student = True

print("Name: " + first_name + " " + last_name)
print("Age: " + str(age))
print("Student status: " + str(is_student))
# Or as a sentence using string concatenation:
print("My name is " + first_name + " " + last_name + ", I am " + str(age) + " years old.")
print("Student status: " + str(is_student))
```
</Secret>

### Challenge 3: Type Investigation

<Secret>
```python
# Type Investigation Solution
text_number = "123"
print("Type of text_number: " + str(type(text_number)))

# Convert to integer
real_number = int(text_number)
print("Type of real_number: " + str(type(real_number)))

# Try adding 10 to each
# This will cause an error if uncommented:
# result1 = text_number + 10  # TypeError!

# This works:
result2 = real_number + 10
print("Real number + 10 = " + str(result2))

# But this would work (string concatenation):
result3 = text_number + "10"  # "12310"
print("Text + '10' = " + result3)
```
</Secret>

## Review Questions

Which statement about variable assignment is correct?

<Quiz>
- Variables must be declared before use
- Variable names can start with numbers
- Variables can be reassigned to different values*
- Variables cannot contain underscores
</Quiz>

### Keywords

- Data type
- Integer (`int`)
- Float (`float`)
- String (`str`)
- Boolean (`bool`)
- Variable
- Assignment (`=`)
- `type()` function
- Case-sensitive
- Comment (`#`)

# Working with Text: String Manipulation

Now that you’ve seen numbers, strings, variables, and input, let’s deepen your text skills, the most common data you’ll handle in research.

Strings are perhaps the most versatile data type in Python. As researchers, much of our data comes in the form of text: survey responses, historical documents, social media posts, or bibliographic records. Learning to manipulate strings effectively is essential for any text-based research.

## Creating and Combining Strings

We've seen basic strings, but Python offers several ways to create and work with text:

### String Literals

The simplest strings are **literals**: text you type directly in quotes:

<CodeEditor language="python">

simple = "Hello, World!"
with_apostrophe = "It's a beautiful day"
with_quotes = 'She said "Hello" to me'
empty = ""  # An empty string is valid

# Display the strings
print(simple)
print(with_apostrophe)
print(with_quotes)
print("Empty string: '" + empty + "'")
</CodeEditor>

### Multi-line Strings

For longer text, use triple quotes (either `'''` or `"""`):

<CodeEditor language="python">

poem = """Roses are red,
Violets are blue,
Python is awesome,
And so are you!"""
print(poem)
</CodeEditor>

Triple-quoted strings preserve all formatting, including line breaks and indentation. They're great for:
- Long text passages
- Documentation (we'll see this with functions)
- SQL queries or other code within Python
- Any text that spans multiple lines

### String Concatenation

The simplest way to combine strings is with the `+` operator:

<CodeEditor language="python">

first_name = "Ada"
last_name = "Lovelace"
full_name = first_name + " " + last_name
print(full_name)

# Watch out - you need to explicitly include spaces:
greeting = "Hello"
name = "World"
print(greeting + name)  # No space!
print(greeting + " " + name)  # Better
</CodeEditor>

You can only concatenate strings with other strings:

<CodeEditor language="python">

age = 25
# This will cause an error:
# message = "I am " + age + " years old"  # TypeError!

# You must convert the number to a string first:
message = "I am " + str(age) + " years old"
print(message)
</CodeEditor>

### F-Strings: The Modern Way

While concatenation works, it quickly becomes cumbersome. Python 3.6 introduced **f-strings** (formatted string literals). They're much more elegant:

<CodeEditor language="python">

name = "Ada"
age = 36
occupation = "mathematician"

# The old way (concatenation):
old_way = "My name is " + name + ", I am " + str(age) + " years old, and I work as a " + occupation + "."

# The new way (f-string):
new_way = f"My name is {name}, I am {age} years old, and I work as a {occupation}."

print(old_way)
print(new_way)  # Same result, much cleaner!
</CodeEditor>

F-strings start with `f` before the opening quote. Inside the string, anything in curly braces `{}` is evaluated as Python code:

<CodeEditor language="python">

name = "Ada"
age = 36
items = 3
price = 19.99

# Start simple - just insert variables:
print(f"Hello there, {name}!")

# You can even do calculations inside the braces:
print(f"Next year I'll be {age + 1}")
print(f"I bought {items} books for ${price * items}")
</CodeEditor>

F-strings can also format numbers:

<CodeEditor language="python">

pi = 3.14159265359
print(f"Pi rounded to 2 decimals: {pi:.2f}")

percentage = 0.875
print(f"Success rate: {percentage:.1%}")  # Converts to percentage!

large_number = 1234567
print(f"Population: {large_number:,}")  # Adds comma separators
</CodeEditor>

## String Methods

Strings in Python are **objects**. They come with built-in functions (called **methods**) that can manipulate them. You call a method by adding a dot `.` after the string, followed by the method name and parentheses.

### Case Methods

<CodeEditor language="python">

text = "Hello, World!"
# Basic case conversion:
print(text.upper())       # HELLO, WORLD!
print(text.lower())       # hello, world!

# More advanced case methods:
print(text.capitalize())  # Hello, world! (first letter only)
print(text.title())       # Hello, World! (title case)
print(text.swapcase())    # hELLO, wORLD! (flip all cases)
</CodeEditor>

Important: String methods don't change the original string (strings are **immutable**). They return a new string:

<CodeEditor language="python">

original = "Hello"
uppercase = original.upper()
print(original)  # Still "Hello"
print(uppercase)  # "HELLO"
</CodeEditor>

### Searching and Checking

Beyond just checking if a string contains something with the `in` operator, Python provides several methods for finding and analyzing text within strings.

The `.count()` method tells you how many times a substring appears. The `.index()` method finds the position of a substring but raises an error if it's not found. The `.find()` method also finds positions but returns -1 instead of erroring when the substring isn't found.

For checking string beginnings and endings, use `.startswith()` and `.endswith()` - these are really useful for validating file extensions or URL schemes.

<CodeEditor language="python">

email = "student@university.edu"

# Check if string contains something:
print("@" in email)  # True

# String search and analysis methods:
print(email.count("u"))  # How many times does "u" appear?
print(email.index("@"))  # What position is "@" at?
print(email.find("edu"))  # Where does "edu" start? (-1 if not found)

# String checking methods:
print(email.startswith("student"))  # Does it begin with "student"?
print(email.endswith(".edu"))  # Does it end with ".edu"?
</CodeEditor>

### Cleaning and Modifying

Python provides powerful methods for cleaning and transforming strings. The `.strip()` method removes whitespace (spaces, tabs, newlines) from the beginning and end of a string - essential for cleaning user input or data from files.

The `.replace()` method substitutes one substring with another throughout the entire string. It replaces ALL occurrences, not just the first one.

The `.split()` method breaks a string into a list of parts. Called with no arguments, it splits on any whitespace. You can also specify what to split on, useful for processing CSV data or parsing formatted text.

<CodeEditor language="python">

messy = "  Hello, World!  \n"
print("Original: " + repr(messy))
print("Cleaned: " + messy.strip())  # Remove whitespace from both ends

text = "Hello, World!"
print(text.replace("World", "Python"))  # Replace "World" with "Python"
print(text.replace("o", "0"))  # Replace ALL letter "o" with "0"

# Break strings into lists:
sentence = "Python is awesome"
words = sentence.split()  # Split on any whitespace
print("Words: " + str(words))

csv_line = "Ada,Lovelace,1815"
data = csv_line.split(",")  # Split on comma
print("CSV data: " + str(data))
</CodeEditor>

### String Validation Methods

Python provides methods to check what kind of characters a string contains:

<CodeEditor language="python">

print("hello")
# Check if string contains only certain types of characters:
print("hello".isalpha())     # Only letters? True
print("hello123".isalpha())  # Only letters? False
print("123".isdigit())       # Only digits? True
print("hello123".isalnum())  # Only letters/numbers? True
print("  ".isspace())        # Only whitespace? True
print("Hello".isupper())     # All uppercase? False
print("HELLO".isupper())     # All uppercase? True
</CodeEditor>

## String Indexing and Slicing

Strings are **sequences**: ordered collections of characters. Each character has a position (index), starting from 0:

<CodeEditor language="python">

text = "Python"
#       012345  <- Index positions

print(text[0])  # First character: 'P'
print(text[1])  # Second character: 'y'
print(text[5])  # Last character: 'n'

# Negative indices count from the end:
print(text[-1])  # Last character: 'n'
print(text[-2])  # Second-to-last: 'o'
</CodeEditor>

**Slicing** lets you extract portions of a string using the syntax `[start:end]`. The key rule to remember: slicing includes the start position but excludes the end position. Think of it as "from start up to (but not including) end."

<CodeEditor language="python">

text = "Python Programming"
#       0123456789012345678  <- Position numbers

# Basic slicing: [start:end] - includes start, excludes end
print(text[0:6])   # Characters 0,1,2,3,4,5 → "Python"
print(text[7:18])  # Characters 7 through 17 → "Programming"

# Shortcuts - omit start or end:
print(text[:6])    # From beginning up to position 6 → "Python"
print(text[7:])    # From position 7 to the end → "Programming"

# Advanced: Step parameter [start:end:step]
# The third number is the "step" - how many positions to jump each time
print(text[::2])   # Start at beginning, go to end, take every 2nd character
print(text[::-1])  # Negative step (-1) reverses the string!
</CodeEditor>

## Escape Sequences

Sometimes you need to include special characters in strings. **Escape sequences** start with a backslash `\`:

<CodeEditor language="python">

# Common escape sequences:
print("Hello\nWorld")    # \n = newline
print("Hello\tWorld")    # \t = tab
print("She said \\"Hi\\"") # \" = quotation mark

# Raw strings (ignore escape sequences):
print(r"C:\Users\new_folder")  # r prefix makes it raw
</CodeEditor>

## Review Questions

What does the following code print?
```python
name = "Python"
print(name[1:4])
```

<Quiz>
- Pyth
- yth*
- ytho
- Pyt
</Quiz>

Which method would you use to remove spaces from the beginning and end of a string?

<Quiz>
- .remove()
- .strip()*
- .clean()
- .delete()
</Quiz>

What is the result of `"3" + "7"` in Python?

<Quiz>
- 10
- "10"
- "37"*
- Error
</Quiz>

How would you check if an email string contains "@"?

<Quiz>
- email.contains("@")
- "@" in email*
- email.has("@")
- email.find("@") > 0
</Quiz>

## Challenges

1. **Name Formatter:** Given the string `"  jOHN   dOE  "`, use string methods to clean and format it as "John Doe" (remove extra whitespace, proper capitalization).

2. **Research Citation Builder:** Create variables for author (`"Zweibel, Stephen"`), title (`"Python for Research"`), and year (`2024`). Use f-strings to format them as: "Zweibel, Stephen. 'Python for Research' (2024)."

3. **Text Analyzer:** Given the text `"Hello world! This is a sample text for analysis."`, count total characters, count words (split on spaces), and check if it contains the word "sample".

### Challenge 1: Name Formatter
<Secret>
```python
# Name Formatter Solution
messy_name = "  jOHN   dOE  "

# Step by step cleaning
cleaned = messy_name.strip()  # Remove outer whitespace  
cleaned = cleaned.lower()     # Convert to lowercase
cleaned = cleaned.title()     # Proper capitalization

# Handle multiple spaces (using replace repeatedly)
cleaned = cleaned.replace("  ", " ")
cleaned = cleaned.replace("  ", " ")  # In case there were triple spaces
cleaned = cleaned.replace("  ", " ")  # In case there were quadruple spaces

print("Original: " + repr(messy_name))
print("Cleaned: " + cleaned)
```
</Secret>

### Challenge 2: Research Citation Builder
<Secret>
```python
# Research Citation Builder Solution
author = "Zweibel, Stephen"
title = "Python for Research"
year = 2024

# Build citation using f-strings
citation = f"{author}. '{title}' ({year})."

print("Citation: " + citation)

# Alternative with more formatting
formatted_citation = f"{author}. '{title}' ({year})."
print("Formatted citation: " + formatted_citation)

# You could also build it step by step using string concatenation
part1 = author + "."
part2 = f"'{title}'"
part3 = f"({year})."

full_citation = part1 + " " + part2 + " " + part3
print("Built citation: " + full_citation)
```
</Secret>

### Challenge 3: Text Analyzer
<Secret>
```python
# Text Analyzer Solution
text = "Hello world! This is a sample text for analysis."

# Count total characters
total_chars = len(text)
print(f"Total characters: {total_chars}")

# Count words (split on spaces)
words = text.split()
word_count = len(words)
print(f"Word count: {word_count}")

# Check if it contains "sample"
contains_sample = "sample" in text
print(f"Contains 'sample': {contains_sample}")

# Additional analysis using string methods
print(f"Text in uppercase: {text.upper()}")
print(f"Text starts with 'Hello': {text.startswith('Hello')}")
print(f"Text ends with period: {text.endswith('.')}")

# Count specific characters
exclamation_count = text.count("!")
print(f"Number of exclamation marks: {exclamation_count}")

# Find position of "sample" 
sample_position = text.find("sample")
print(f"Position of 'sample': {sample_position}")
print("Note: -1 means not found, any other number is the position")
```
</Secret>

## Key Terms

- String concatenation (`+`)
- F-string (formatted string literal)
- String method
- Immutable
- String indexing
- String slicing
- Escape sequence
- `.upper()`, `.lower()`, `.strip()`, `.replace()`, `.split()`
- `.startswith()`, `.endswith()`
- `.isalpha()`, `.isdigit()`, `.isalnum()`


# Collections: Lists and Dictionaries

With text fundamentals in place, we’ll organize multiple values using lists (ordered) and dictionaries (labeled) to model real-world data.

So far, we've worked with individual pieces of data: a single number, a single string. But research involves collections of data like lists of participants, sets of measurements, records with multiple fields. Python provides powerful data structures for organizing collections of information.

## Lists: Ordered Collections

A **list** is Python's most versatile data structure. It's an ordered, mutable (changeable) collection that can hold any type of data. Think of it as a numbered sequence of boxes, where each box can hold any Python object.

### Creating Lists

Lists are created with square brackets `[]`, with items separated by commas:

<CodeEditor language="python">

# An empty list
empty_list = []
print(f"Empty list: {empty_list}")

# A list of strings
books = ["1984", "Brave New World", "Fahrenheit 451"]
print(f"Books: {books}")

# A list of numbers
temperatures = [20.5, 21.0, 19.8, 22.1, 20.9]
print(f"Temperatures: {temperatures}")

# Lists can contain mixed types (though usually not recommended)
mixed = [42, "hello", 3.14, True]
print(f"Mixed list: {mixed}")

# Lists can contain other lists!
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(f"Matrix: {matrix}")
</CodeEditor>

### Accessing List Items

Like strings, lists use **zero-based indexing**. The first item is at index 0:

<CodeEditor language="python">

fruits = ["apple", "banana", "cherry", "date"]

print(f"First item: {fruits[0]}")
print(f"Second item: {fruits[1]}")
print(f"Last item: {fruits[-1]}")
print(f"Second-to-last: {fruits[-2]}")

# Trying to access beyond the list causes an error:
# print(fruits[10])  # This would cause an IndexError
</CodeEditor>

<Info>Off-by-one errors are the most common bug in programming. Remember: if a list has 4 items, the valid indices are 0, 1, 2, and 3.</Info>

### Modifying Lists

Unlike strings, lists are **mutable**: you can change them after creation.

**Basic list methods:**
- `.append(item)` - adds one item to the end of the list
- `.insert(index, item)` - adds item at a specific position
- `.remove(item)` - removes the first occurrence of an item  
- `.pop()` - removes and returns the last item

<CodeEditor language="python">

colors = ["red", "green", "blue"]
print(f"Original: {colors}")

# Change an existing item
colors[1] = "yellow"
print(f"After change: {colors}")

# Add items to the end
colors.append("purple")
print(f"After append: {colors}")

# Insert at a specific position
colors.insert(1, "orange")  # Insert at index 1
print(f"After insert: {colors}")

# Remove items
colors.remove("yellow")  # Remove first occurrence
print(f"After remove: {colors}")

# Remove and return last item
last_color = colors.pop()
print(f"Popped item: {last_color}")
print(f"Final list: {colors}")
</CodeEditor>

### List Slicing

Like strings, you can extract portions of lists using the same `[start:end:step]` syntax. But unlike strings, lists are mutable, so you can also assign new values to slices.

<CodeEditor language="python">

numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(f"Original: {numbers}")
print(f"Slice [2:5]: {numbers[2:5]}")  # Get items at positions 2, 3, 4
print(f"Slice [:3]: {numbers[:3]}")   # First 3 items
print(f"Slice [7:]: {numbers[7:]}")   # From position 7 to end
print(f"Slice [::2]: {numbers[::2]}") # Every 2nd item
print(f"Slice [::-1] (reversed): {numbers[::-1]}") # Reverse the list

# Because lists are mutable, you can assign to slices!
# This replaces positions 2, 3, 4 with new values
numbers[2:5] = [20, 30, 40]
print(f"After assigning to slice: {numbers}")
</CodeEditor>

### Useful List Operations

Python provides several built-in functions that work great with lists of numbers. The `sum()` function adds up all the numbers in a list. The `max()` and `min()` functions find the largest and smallest numbers respectively. And you already know `len()` - it counts how many items are in the list.

When you need to sort a list, you have two options. The `sorted()` function returns a new sorted list without changing your original list. In contrast, the `.sort()` method modifies your original list directly.

<CodeEditor language="python">

grades = [85, 92, 78, 95, 88]

# Length of list
print(f"Number of grades: {len(grades)}")

# Check membership
print(f"Is 92 in grades? {92 in grades}")
print(f"Is 100 in grades? {100 in grades}")

# Mathematical operations (with number lists)
print(f"Sum of grades: {sum(grades)}")
print(f"Highest grade: {max(grades)}")
print(f"Lowest grade: {min(grades)}")
average = sum(grades) / len(grades)
print(f"Average: {average:.2f}")

# Sorting
grades.sort()  # Sorts in-place (modifies the original)
print(f"Sorted grades (in-place): {grades}")

# Or create a new sorted list
names = ["Charlie", "Alice", "Bob"]
sorted_names = sorted(names)  # Returns new list
print(f"Original names: {names}")
print(f"New sorted list of names: {sorted_names}")
</CodeEditor>

### List Methods

Lists have many useful methods for adding, removing, and manipulating items. When you want to add a single item to the end of a list, use `.append()`. If you need to add multiple items at once, `.extend()` takes another list and adds all its items to your list. For more precise control, `.insert()` lets you add an item at any specific position.

For removing items, you have several options. The `.remove()` method finds and removes the first occurrence of a specific item. The `.pop()` method removes and returns the last item (handy when you need to use that item). If you want to empty the entire list, `.clear()` removes everything.

When you need to find items, `.count()` tells you how many times an item appears in the list, and `.index()` tells you the position of the first occurrence. For reordering, `.reverse()` flips the list backwards, and `.sort()` arranges items in order (both modify the original list).

<CodeEditor language="python">

tasks = ["read", "write", "review"]
print(f"Initial tasks: {tasks}")

# Add multiple items
tasks.extend(["edit", "submit"])
print(f"After extend: {tasks}")

# Count occurrences
numbers = [1, 2, 3, 2, 2, 4]
print(f"Count of 2s: {numbers.count(2)}")

# Find index of item
print(f"Index of 'write': {tasks.index('write')}")

# Reverse the list
tasks.reverse()
print(f"Reversed tasks: {tasks}")

# Clear all items
tasks.clear()
print(f"Cleared tasks: {tasks}")
</CodeEditor>

## Dictionaries: Labeled Data

While lists are great for ordered sequences, you sometimes need to organize data with meaningful labels instead of numeric positions. This is where **dictionaries** come in.

A dictionary is a collection of **key-value pairs**. Instead of accessing items by position (index), you access them by name (key). Think of it like a real dictionary where you look up a word (key) to find its definition (value).

### Creating Dictionaries

Dictionaries use curly braces `{}` with key-value pairs separated by colons:

<CodeEditor language="python">

# Empty dictionary
empty_dict = {}
print(f"Empty dictionary: {empty_dict}")

# Student information
student = {
    "name": "Ada Lovelace",
    "age": 36,
    "major": "Mathematics",
    "gpa": 3.9,
    "enrolled": True
}
print(f"Student info: {student}")

# Dictionary with different key types (usually strings though)
mixed_keys = {
    "name": "Example",
    42: "the answer",
    3.14: "pi approximation"
}
print(f"Mixed keys: {mixed_keys}")
</CodeEditor>

**Important notes:**
- Keys must be unique (no duplicates)
- Keys must be immutable (strings, numbers, tuples)
- Values can be any type, including lists or other dictionaries
- Order is preserved in Python 3.7+ (but don't rely on it for logic)

### Accessing Dictionary Values

Use square brackets with the key:

<CodeEditor language="python">

person = {
    "first_name": "Marie",
    "last_name": "Curie",
    "field": "Physics",
    "nobel_prizes": 2
}

print(f"First name: {person['first_name']}")
print(f"Field: {person['field']}")

# Accessing a non-existent key causes an error:
# print(person["middle_name"])  # This would cause a KeyError (key not found error)

# Safer access with .get() method
# .get() returns None if key doesn't exist (instead of an error)
print(f"Middle name: {person.get('middle_name')}")
# You can also provide a default value if the key is missing
print(f"Middle name (with default): {person.get('middle_name', 'N/A')}")
</CodeEditor>

### Modifying Dictionaries

<CodeEditor language="python">

course = {
    "code": "PYTHON101",
    "title": "Intro to Python",
    "credits": 3
}
print(f"Original course: {course}")

# Add or update values
course["instructor"] = "Dr. Smith"
course["credits"] = 4  # Update existing
print(f"After update: {course}")

# Remove items
del course["credits"]  # Using del keyword
print(f"After del: {course}")

# Or use pop() to remove and return value
instructor = course.pop("instructor")
print(f"Popped instructor: {instructor}")
print(f"Final course: {course}")
</CodeEditor>

### Dictionary Methods

Dictionaries have several useful methods for getting information about their contents. The `.keys()` method returns all the dictionary keys, like getting a table of contents. The `.values()` method returns all the values stored in the dictionary. And the `.items()` method returns both keys and values together as pairs.

Since these methods return special dictionary views (not regular lists), you can convert them to lists using the `list()` function if needed.

<CodeEditor language="python">

inventory = {
    "apples": 5,
    "bananas": 3,
    "oranges": 2
}

# .keys() gets all the keys
print(f"Keys: {inventory.keys()}")
print(f"Keys as list: {list(inventory.keys())}")

# .values() gets all the values  
print(f"Values: {inventory.values()}")

# .items() gets both keys and values
print(f"Items: {inventory.items()}")

# Update multiple values at once
inventory.update({"apples": 10, "pears": 4})
print(f"After update: {inventory}")

# Clear all items
inventory.clear()
print(f"Cleared inventory: {inventory}")
</CodeEditor>

## Combining Lists and Dictionaries

The real power comes from combining these structures. Here are common patterns:

### List of Dictionaries

Good for tabular data where each item has the same fields:

<CodeEditor language="python">

# Student records
students = [
    {"name": "Alice", "grade": 92, "major": "CS"},
    {"name": "Bob", "grade": 85, "major": "Math"},
    {"name": "Charlie", "grade": 88, "major": "CS"}
]

# Access individual records
print(f"First student: {students[0]}")
print(f"First student's name: {students[0]['name']}")

# Add a new student
students.append({"name": "Diana", "grade": 95, "major": "Physics"})
print(f"Students after adding Diana: {students}")

# Find average grade (manual calculation)
alice_grade = students[0]["grade"]
bob_grade = students[1]["grade"] 
charlie_grade = students[2]["grade"]
diana_grade = students[3]["grade"]

total = alice_grade + bob_grade + charlie_grade + diana_grade
average = total / len(students)
print(f"Class average: {average:.1f}")
</CodeEditor>

### Dictionary of Lists

Useful for grouping related items:

<CodeEditor language="python">

# Organize books by genre
library = {
    "fiction": ["1984", "Dune", "Foundation"],
    "non_fiction": ["Educated", "Cosmos"],
    "poetry": ["Leaves of Grass", "The Wasteland"]
}

# Add a book to a genre
library["fiction"].append("Neuromancer")

# Check all fiction books
print(f"Fiction books: {library['fiction']}")

# Count total books (manual calculation)
fiction_count = len(library["fiction"])
non_fiction_count = len(library["non_fiction"])
poetry_count = len(library["poetry"])

total_books = fiction_count + non_fiction_count + poetry_count
print(f"Total books: {total_books}")
</CodeEditor>

### Nested Dictionaries

For hierarchical data:

<CodeEditor language="python">

# University structure
university = {
    "name": "State University",
    "departments": {
        "Computer Science": {
            "faculty": 25,
            "students": 300,
            "courses": ["CS101", "CS102", "CS201"]
        },
        "Mathematics": {
            "faculty": 20,
            "students": 250,
            "courses": ["MATH101", "MATH102", "MATH201"]
        }
    }
}

# Navigate the structure
cs_faculty = university["departments"]["Computer Science"]["faculty"]
print(f"CS faculty count: {cs_faculty}")

# Add a new course
university["departments"]["Mathematics"]["courses"].append("MATH301")
math_courses = university["departments"]["Mathematics"]["courses"]
print(f"Updated Math courses: {math_courses}")
</CodeEditor>

## Review Questions

What will `[1, 2, 3][1]` return?

<Quiz>
- 1
- 2*
- 3
- Error
</Quiz>

How do you add an item to the end of a list called `my_list`?

<Quiz>
- my_list.add(item)
- my_list.append(item)*
- my_list.insert(item)
- my_list += item
</Quiz>

What happens when you try to access a dictionary key that doesn't exist?

<Quiz>
- Returns None
- Returns 0
- Returns empty string
- Raises KeyError*
</Quiz>

Which of these can be a dictionary key? (Select all that apply)

<Quiz>
- "name"*
- 42*
- [1, 2, 3]
- 3.14*
- {"a": 1}
- (1, 2)*
</Quiz>

## Challenges

1. **Student Records:** Create a list with three student dictionaries, each containing name, age, and major. Practice accessing and modifying the data using indexing and dictionary keys.

2. **Inventory Manager:** Create a dictionary representing a bookstore inventory with book titles as keys and quantities as values. Practice adding new books and updating quantities.

3. **Recipe Calculator:** Create a recipe dictionary with ingredient names as keys and amounts as values. Calculate the total cost by multiplying each amount by a given price per unit.

### Challenge 1: Student Records
<Secret>
```python
# Student Records Solution
students = [
    {"name": "Alice", "age": 20, "major": "Computer Science"},
    {"name": "Bob", "age": 22, "major": "Mathematics"}, 
    {"name": "Charlie", "age": 19, "major": "Physics"}
]

# Display initial data
print("Initial student records:")
print("Student 1: " + students[0]["name"] + " is " + str(students[0]["age"]) + " years old, majoring in " + students[0]["major"])
print("Student 2: " + students[1]["name"] + " is " + str(students[1]["age"]) + " years old, majoring in " + students[1]["major"])
print("Student 3: " + students[2]["name"] + " is " + str(students[2]["age"]) + " years old, majoring in " + students[2]["major"])

# Modify some data
students[0]["age"] = 21  # Alice had a birthday
students[2]["major"] = "Engineering"  # Charlie changed majors

# Add a new field to all students
students[0]["gpa"] = 3.8
students[1]["gpa"] = 3.5
students[2]["gpa"] = 3.9

print("\nUpdated records:")
print(students[0]["name"] + " is now " + str(students[0]["age"]) + " with GPA: " + str(students[0]["gpa"]))
print(students[2]["name"] + " changed major to " + students[2]["major"] + " with GPA: " + str(students[2]["gpa"]))

# Calculate some statistics using built-in functions
ages = [students[0]["age"], students[1]["age"], students[2]["age"]]
gpas = [students[0]["gpa"], students[1]["gpa"], students[2]["gpa"]]

print("\nStatistics:")
print("Average age: " + str(sum(ages) / len(ages)))
print("Highest GPA: " + str(max(gpas)))
print("Total students: " + str(len(students)))
```
</Secret>

### Challenge 2: Inventory Manager
<Secret>
```python
# Inventory Manager Solution
inventory = {
    "The Great Gatsby": 12,
    "To Kill a Mockingbird": 8,
    "1984": 15,
    "Pride and Prejudice": 6
}

# Display initial inventory
print("Initial inventory:")
print(f"The Great Gatsby: {inventory['The Great Gatsby']} copies")
print(f"To Kill a Mockingbird: {inventory['To Kill a Mockingbird']} copies") 
print(f"1984: {inventory['1984']} copies")
print(f"Pride and Prejudice: {inventory['Pride and Prejudice']} copies")

# Add new books
inventory["Dune"] = 10
inventory["The Hobbit"] = 7

# Update existing quantities (sales and restocking)
inventory["The Great Gatsby"] -= 3  # Sold 3 copies
inventory["1984"] += 5  # Restocked 5 copies

print("\nUpdated inventory:")
print("After adding new books and updating quantities:")

# Display all books (we know the keys)
book_titles = list(inventory.keys())
print(f"Total unique titles: {len(book_titles)}")
print(f"Books in stock: {book_titles}")

# Calculate total books using values
all_quantities = list(inventory.values())
print(f"Total books in inventory: {sum(all_quantities)}")
print(f"Average books per title: {sum(all_quantities) / len(all_quantities):.1f}")

# Check specific books
print("\nSpecific lookups:")
print(f"Copies of Dune: {inventory['Dune']}")
print(f"Copies of 1984 after restock: {inventory['1984']}")
```
</Secret>

### Challenge 3: Recipe Calculator
<Secret>
```python
# Recipe Calculator Solution
recipe = {
    "flour": 2.5,      # cups
    "sugar": 1.0,      # cups  
    "eggs": 3,         # whole eggs
    "butter": 0.5,     # cups
    "milk": 1.25       # cups
}

# Price per unit (in dollars)
prices = {
    "flour": 0.20,     # per cup
    "sugar": 0.15,     # per cup
    "eggs": 0.25,      # per egg
    "butter": 0.75,    # per cup
    "milk": 0.12       # per cup
}

print("Recipe ingredients and amounts:")
print(f"Flour: {recipe['flour']} cups")
print(f"Sugar: {recipe['sugar']} cups")
print(f"Eggs: {recipe['eggs']} eggs")
print(f"Butter: {recipe['butter']} cups")
print(f"Milk: {recipe['milk']} cups")

print("\nCost calculation:")
flour_cost = recipe["flour"] * prices["flour"]
sugar_cost = recipe["sugar"] * prices["sugar"]
eggs_cost = recipe["eggs"] * prices["eggs"]
butter_cost = recipe["butter"] * prices["butter"]
milk_cost = recipe["milk"] * prices["milk"]

print(f"Flour: {recipe['flour']} cups × ${prices['flour']:.2f} = ${flour_cost:.2f}")
print(f"Sugar: {recipe['sugar']} cups × ${prices['sugar']:.2f} = ${sugar_cost:.2f}")
print(f"Eggs: {recipe['eggs']} eggs × ${prices['eggs']:.2f} = ${eggs_cost:.2f}")
print(f"Butter: {recipe['butter']} cups × ${prices['butter']:.2f} = ${butter_cost:.2f}")
print(f"Milk: {recipe['milk']} cups × ${prices['milk']:.2f} = ${milk_cost:.2f}")

total_cost = flour_cost + sugar_cost + eggs_cost + butter_cost + milk_cost
print(f"\nTotal recipe cost: ${total_cost:.2f}")

# Additional calculations using built-in functions
ingredient_amounts = list(recipe.values())
print(f"Total volume/count: {sum(ingredient_amounts)} units")
print(f"Most expensive ingredient cost: ${max([flour_cost, sugar_cost, eggs_cost, butter_cost, milk_cost]):.2f}")
```
</Secret>

## Key Terms

- List
- Index / Indexing
- Zero-based indexing
- Mutable vs Immutable
- Slice / Slicing
- `.append()`, `.insert()`, `.remove()`, `.pop()`
- `.sort()` vs `sorted()`
- Dictionary
- Key-value pair
- `.keys()`, `.values()`, `.items()`
- `.get()`
- Nested data structures


# Control Flow: Making Decisions and Repeating Actions

Once you can store data, you need logic and loops to make decisions and process many items efficiently.

So far, our programs have been linear: they execute from top to bottom, line by line. But real programs need to make decisions and repeat actions. We call this **control flow**, and it transforms simple scripts into intelligent programs.

## Conditional Statements: Making Decisions

Life is full of decisions: "If it's raining, take an umbrella." "If the data is valid, process it; otherwise, show an error." Python programs make decisions the same way, using `if` statements.

### The Basic `if` Statement

The simplest decision is "if this is true, do something":

<CodeEditor language="python">

temperature = 22

if temperature > 20:
    print("It's warm today!")
    print("No jacket needed.")

print("Have a nice day!")  # This always runs
</CodeEditor>

**Critical points:**
- The condition (`temperature > 20`) must evaluate to `True` or `False`
- The colon `:` at the end of the `if` line is required
- The indented block only runs if the condition is `True`
- **Indentation matters!** Python uses indentation to define blocks of code

### Comparison Operators

These operators create boolean values for our conditions:

<CodeEditor language="python">

x = 10
y = 5

print(f"x == y: {x == y}")   # Equal to
print(f"x != y: {x != y}")   # Not equal to
print(f"x > y: {x > y}")    # Greater than
print(f"x < y: {x < y}")    # Less than
print(f"x >= y: {x >= y}")   # Greater than or equal to
print(f"x <= y: {x <= y}")   # Less than or equal to

# String comparisons work alphabetically
print(f"'apple' < 'banana': {'apple' < 'banana'}")
print(f"'Zoo' < 'ant': {'Zoo' < 'ant'}")  # Capital letters come before lowercase!
</CodeEditor>

**Common mistake:** Using `=` instead of `==`
- `=` is assignment (storing a value)
- `==` is comparison (checking equality)

### Adding `else`: Either/Or Decisions

You often want to do one thing if a condition is true, and something else if it's false:

<CodeEditor language="python">

age = int(input("Enter your age: "))

if age >= 18:
    print("You are an adult.")
    print("You can vote!")
else:
    print("You are a minor.")
    print(f"You can vote in {18 - age} years.")
</CodeEditor>

### Multiple Conditions with `elif`

For more than two possibilities, use `elif` (short for "else if"):

<CodeEditor language="python">

score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Your grade is: {grade}")
</CodeEditor>

Python checks conditions from top to bottom and executes the first block where the condition is `True`. Once a condition matches, the rest are skipped.

### Combining Conditions

Use logical operators to combine multiple conditions:

<CodeEditor language="python">

age = int(input("Enter your age: "))
has_license = True

# AND: Both conditions must be true
if age >= 18 and has_license:
    print("You can rent a car!")

# OR: At least one condition must be true
weekend = False
holiday = True
if weekend or holiday:
    print("No work today!")

# NOT: Inverts the condition
raining = False
if not raining:
    print("Let's go for a walk!")
</CodeEditor>

### Nested Conditions

You can put `if` statements inside other `if` statements:

<CodeEditor language="python">

has_ticket = input("Do you have a ticket? (yes/no): ").lower() == "yes"
age = int(input("Enter your age: "))

if has_ticket:
    print("You have a ticket!")
    if age >= 17:
        print("You can see the R-rated movie.")
    else:
        print("You can only see PG-13 or below.")
else:
    print("You need to buy a ticket first.")
</CodeEditor>

But be careful: too much nesting makes code hard to read. You can often simplify with `and`/`or`.

## Loops: Repeating Actions

Imagine you need to print "Hello" 100 times. You could write 100 print statements, but that's ridiculous. Loops let you repeat code efficiently.

### The `for` Loop: Iterating Over Collections

The `for` loop is Python's workhorse for repetition. It iterates (goes through) each item in a collection:

<CodeEditor language="python">

# Start simple - loop through a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(f"I like {fruit}!")

print("-" * 10)

# You can loop through strings too (each character)
for letter in "Hello":
    print(letter)

print("-" * 10)

# More advanced - loop through dictionary keys and access values
scores = {"Alice": 92, "Bob": 85, "Charlie": 88}
for name in scores:
    print(f"{name} scored {scores[name]}")
</CodeEditor>

The loop variable (`fruit`, `letter`, `name`) takes on each value in turn. You can name it anything, but choose descriptive names.

### The `range()` Function

What if you just want to repeat something a certain number of times? Use `range()`:

<CodeEditor language="python">

# range(n) generates numbers from 0 to n-1
for i in range(5):
    print(f"This is iteration {i}")

print("-" * 10)

# range(start, stop) generates from start to stop-1
for num in range(1, 6):
    print(f"Counting: {num}")

print("-" * 10)

# range(start, stop, step) with custom step
for even in range(0, 11, 2):
    print("Number: " + str(even))
</CodeEditor>

**Important:** `range(5)` generates 0, 1, 2, 3, 4 (not 5!). This matches Python's zero-based indexing.

### Looping with Indices

Sometimes you need both the item and its position:

<CodeEditor language="python">

colors = ["red", "green", "blue"]

# Method 1: Using range and len
print("Method 1: range(len())")
for i in range(len(colors)):
    print(f"{i}: {colors[i]}")

print("-" * 10)

# Method 2: Using enumerate (more Pythonic!)
print("Method 2: enumerate()")
for i, color in enumerate(colors):
    print(f"{i}: {color}")

print("-" * 10)

# Start enumeration at 1 instead of 0
print("Enumerate starting at 1:")
for num, color in enumerate(colors, 1):
    print(f"Color #{num}: {color}")
</CodeEditor>

### The `while` Loop: Conditional Repetition

The `while` loop continues as long as a condition is true:

<CodeEditor language="python">

count = 0
while count < 5:
    print(f"Count is {count}")
    count += 1  # Always update the condition!

print("Loop finished.")

# The input() based example won't run here, but the logic is:
# password = ""
# while password != "secret":
#     password = input("Enter password: ") # This line would prompt the user
#     if password != "secret":
#         print("Wrong password, try again!")
# print("Access granted!")
</CodeEditor>

**Warning:** If the condition never becomes `False`, you get an infinite loop! Always ensure the loop will eventually end.

### Loop Control: `break` and `continue`

Sometimes you need to exit a loop early or skip certain iterations:

<CodeEditor language="python">

# break: Exit the loop immediately
print("Break example:")
for i in range(10):
    if i == 5:
        break
    print("Value: " + str(i))

# continue: Skip the rest of this iteration
print("Continue example:")
for i in range(5):
    if i == 2:
        continue  # Skip when i is 2
    print("Processing: " + str(i))

# Practical example: Find first negative number
print("Find first negative:")
numbers = [4, 8, -2, 5, -7, 3]
for num in numbers:
    if num < 0:
        print(f"Found negative: {num}")
        break
else:  # This else belongs to the for loop!
    print("No negative numbers found")
</CodeEditor>

### Nested Loops

Loops can contain other loops:

<CodeEditor language="python">

# Multiplication table
# Note: i and j are traditional names for loop counters in nested loops
for i in range(1, 4):    # i represents rows (1, 2, 3)
    for j in range(1, 4):    # j represents columns (1, 2, 3)
        result = i * j
        print(f"{i} x {j} = {result}")
    print("-" * 10)  # Separator line after each row

# Processing nested data
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for row in matrix:
    row_str = ""
    for value in row:
        row_str += str(value) + " "
    print("Row: " + row_str)
</CodeEditor>

## Common Patterns

### Accumulation Pattern

Building up a result over iterations:

<CodeEditor language="python">

# Sum numbers
numbers = [10, 20, 30, 40, 50]
total = 0  # Initialize accumulator
for num in numbers:
    total += num
print(f"Sum: {total}")

# Build a string
words = ["Python", "is", "awesome"]
sentence = ""  # Initialize accumulator
for word in words:
    sentence += word + " "
print(sentence.strip())  # Remove trailing space
</CodeEditor>

### Filtering Pattern

Selecting items that meet a condition:

<CodeEditor language="python">

# Find all even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = []  # Initialize empty result list
for num in numbers:
    if num % 2 == 0:
        evens.append(num)
print(f"Even numbers: {evens}")

# Note: There are more advanced ways to do this that you'll learn later,
# but for now, the loop approach above is the clearest!
</CodeEditor>

## Review Questions

What is the output of this code?
```python
x = 10
if x > 5:
    print("A")
elif x > 0:
    print("B")
else:
    print("C")
```

<Quiz>
- A*
- B
- A and B
- C
</Quiz>

How many times will this loop print "Hello"?
```python
for i in range(3, 8):
    print("Hello")
```

<Quiz>
- 3
- 5*
- 6
- 8
</Quiz>

What does the `continue` statement do in a loop?

<Quiz>
- Exits the loop completely
- Skips to the next iteration*
- Pauses the loop
- Restarts the loop from beginning
</Quiz>

Which operator checks if two values are equal?

<Quiz>
- =
- ==*
- !=
- >=
</Quiz>

## Challenges

1. **FizzBuzz:** Write a program that prints numbers from 1 to 30. But for multiples of 3, print "Fizz" instead of the number, for multiples of 5 print "Buzz", and for multiples of both 3 and 5 print "FizzBuzz".

2. **Password Validator:** Create a program that keeps asking for a password until the user enters one that meets all requirements: at least 8 characters, contains both uppercase and lowercase, and has at least one digit.

3. **Prime Checker:** Write a program that checks if a number is prime (only divisible by 1 and itself). Use a loop to check all potential divisors.

### Challenge 1: FizzBuzz
<Secret>
```python
# FizzBuzz Solution
for num in range(1, 31):
    if num % 3 == 0 and num % 5 == 0:
        print("FizzBuzz")
    elif num % 3 == 0:
        print("Fizz")
    elif num % 5 == 0:
        print("Buzz")
    else:
        print(num)
```
</Secret>

### Challenge 2: Prime Checker
<Secret>
```python
# Prime Checker Solution
number = int(input("Enter a number to check: "))

if number < 2:
    print(f"{number} is not prime")
else:
    is_prime = True
    for divisor in range(2, number):
        if number % divisor == 0:
            is_prime = False
            break
    
    if is_prime:
        print(f"{number} is prime!")
    else:
        print(f"{number} is not prime")

# More efficient version (only check up to square root)
# import math
# for divisor in range(2, int(math.sqrt(number)) + 1):
```

</Secret>

### Challenge 3: Password Validator
<Secret>
```python
# Password Validator Solution
while True:
    password = input("Enter a password: ")
    
    # Check all requirements
    has_min_length = len(password) >= 8
    
    # Check for uppercase letter
    has_upper = False
    for char in password:
        if char.isupper():
            has_upper = True
            break
    
    # Check for lowercase letter
    has_lower = False
    for char in password:
        if char.islower():
            has_lower = True
            break
    
    # Check for digit
    has_digit = False
    for char in password:
        if char.isdigit():
            has_digit = True
            break
    
    if has_min_length and has_upper and has_lower and has_digit:
        print("Password accepted!")
        break
    else:
        print("Password does not meet requirements:")
        if not has_min_length:
            print("- Must be at least 8 characters")
        if not has_upper:
            print("- Must contain uppercase letter")
        if not has_lower:
            print("- Must contain lowercase letter")
        if not has_digit:
            print("- Must contain a digit")
        print("Try again.\n")
```

</Secret>

## Key Terms

- Control flow
- Conditional statement
- `if`, `elif`, `else`
- Comparison operators (`==`, `!=`, `>`, `<`, `>=`, `<=`)
- Logical operators (`and`, `or`, `not`)
- Loop
- `for` loop
- `while` loop
- `range()`
- `enumerate()`
- `break`, `continue`
- Iteration
- Infinite loop
- Nested loops

# Functions: Building Reusable Code

After practicing control flow, functions let you package logic, reduce repetition, and make programs easier to test and reuse.

As your programs grow, you'll find yourself writing similar code in multiple places. Maybe you're calculating averages in three different parts of your program, or validating user input in several locations. Functions let you write code once and use it many times, making your programs cleaner, more reliable, and easier to understand.

## What Are Functions?

A **function** is a named block of code that performs a specific task. Think of it as a mini-program within your program. We've already used built-in functions like `print()`, `len()`, and `input()`. Now we'll create our own.

Functions are like recipes:
- They have a name (like "make_pancakes")
- They might need ingredients (parameters/inputs)
- They contain steps (the code)
- They might produce something (return value)

### Basic Function Structure

Functions are defined using the `def` keyword:

<CodeEditor language="python">

# Define a simple function
def greet():
    """Display a friendly greeting."""
    print("Hello!")
    print("Welcome to Python programming!")

# Defining doesn't run the function - it just creates it
# To run it, you must "call" it:
greet()
</CodeEditor>

Key points:
- `def` starts the definition
- Function name follows Python naming conventions (lowercase, underscores)
- Parentheses `()` are required, even if empty
- Colon `:` ends the first line
- Function body is indented
- The triple-quoted string is a **docstring** (documentation)

### Functions with Parameters

Most functions need information to work with. **Parameters** are variables that receive values when you call the function:

<CodeEditor language="python">

def greet_person(name):
    """Greet a person by name."""
    print(f"Hello, {name}!")
    print(f"Nice to meet you, {name}.")

# Call with different arguments
greet_person("Alice")
print("-" * 10)
greet_person("Bob")
print("-" * 10)

# We call the value you pass an "argument"
user = "Charlie"
greet_person(user)
</CodeEditor>

Multiple parameters are separated by commas:

<CodeEditor language="python">

def introduce(first_name, last_name, age):
    """Introduce a person with their full name and age."""
    print(f"This is {first_name} {last_name}.")
    print(f"They are {age} years old.")

introduce("Ada", "Lovelace", 36)
print("-" * 10)
introduce("Alan", "Turing", 41)
</CodeEditor>

### Return Values

Functions can send data back using `return`:

<CodeEditor language="python">

def add_numbers(a, b):
    """Add two numbers and return the result."""
    result = a + b
    return result

# Store the returned value
sum1 = add_numbers(5, 3)
print(f"5 + 3 = {sum1}")

# Use the returned value directly
print(f"10 + 20 = {add_numbers(10, 20)}")

# You can return any type of data
def get_info():
    """Return a dictionary of information."""
    return {"name": "Python", "version": 3.11, "awesome": True}

info = get_info()
print(f"Info from function: {info['name']}")
</CodeEditor>

**Important:** When a function hits `return`, it immediately exits:

<CodeEditor language="python">

def check_age(age):
    """Check if someone is an adult."""
    if age >= 18:
        return "Adult"
    # This next line only runs if the condition above was false
    return "Minor"

print(f"Age 25 is: {check_age(25)}")
print(f"Age 16 is: {check_age(16)}")
</CodeEditor>

Functions without explicit `return` statements return `None`:

<CodeEditor language="python">

def say_hello():
    print("Hello!")
    # No return statement

result = say_hello()  # This will print "Hello!"
print(f"The return value is: {result}") # This will print "None"
</CodeEditor>

### Default Parameters

You can give parameters default values, making them optional:

<CodeEditor language="python">

def greet(name="World", punctuation="!"):
    """Greet someone with customizable punctuation."""
    print(f"Hello, {name}{punctuation}")

greet()  # Uses both defaults
greet("Alice")  # Uses default punctuation
greet("Bob", "?")  # Overrides both
greet(punctuation="...")  # Named argument, skips name
</CodeEditor>

Parameters with defaults must come after parameters without defaults.

### Variable Scope

Variables created inside functions are **local** - they only exist within that function:

<CodeEditor language="python">

def calculate():
    # This 'result' is local to the function
    result = 10 + 20
    return result

answer = calculate()
print(f"The answer is {answer}")
# print(result)  # This would cause a NameError because 'result' is local to calculate()

# Global vs local variables
name = "Global Alice"  # Global variable

def change_name():
    name = "Local Bob"  # Creates a new local variable, does not affect the global one
    print(f"Inside function: {name}")

change_name()
print(f"Outside function: {name}")  # Global variable is unchanged
</CodeEditor>

This isolation is a feature, not a bug! It prevents functions from accidentally interfering with each other.

## Why Functions Matter

### 1. Code Reuse

Without functions, you repeat code:

```python
# Bad: Repetitive code
student1_grades = [85, 92, 88, 90, 87]
total1 = sum(student1_grades)
average1 = total1 / len(student1_grades)
print(f"Student 1 average: {average1:.1f}")

student2_grades = [78, 85, 82, 88, 84]
total2 = sum(student2_grades)
average2 = total2 / len(student2_grades)
print(f"Student 2 average: {average2:.1f}")

# Good: Using a function
def calculate_average(grades):
    """Calculate the average of a list of grades."""
    return sum(grades) / len(grades)

student1_grades = [85, 92, 88, 90, 87]
print(f"Student 1 average: {calculate_average(student1_grades):.1f}")

student2_grades = [78, 85, 82, 88, 84]
print(f"Student 2 average: {calculate_average(student2_grades):.1f}")
```

### 2. Organization

Functions make code readable and organized:

```python
def load_data(filename):
    """Load data from a file."""
    # Code to load data
    pass

def clean_data(data):
    """Clean and prepare data for analysis."""
    # Code to clean data
    pass

def analyze_data(data):
    """Perform statistical analysis."""
    # Code to analyze
    pass

def create_report(results):
    """Generate a report from results."""
    # Code to create report
    pass

# Main program is now clear:
raw_data = load_data("survey_results.csv")
cleaned_data = clean_data(raw_data)
results = analyze_data(cleaned_data)
create_report(results)
```

### 3. Testing and Debugging

Functions can be tested independently:

```python
def is_valid_email(email):
    """Check if an email address is valid."""
    if "@" not in email:
        return False
    if email.count("@") != 1:
        return False
    parts = email.split("@")
    if len(parts[0]) == 0 or len(parts[1]) == 0:
        return False
    if "." not in parts[1]:
        return False
    return True

# Easy to test:
print(is_valid_email("user@example.com"))  # True
print(is_valid_email("invalid.email"))     # False
print(is_valid_email("@example.com"))      # False
print(is_valid_email("user@"))             # False
```

## Common Function Patterns

### Validation Functions

Functions that check if something is valid:

<CodeEditor language="python">

def is_positive(number):
    """Check if a number is positive."""
    return number > 0

def is_valid_age(age):
    """Check if age is in valid range."""
    return 0 <= age <= 120

def is_strong_password(password):
    """Check password strength."""
    if len(password) < 8:
        return False
    
    # Check for uppercase letter
    has_upper = False
    for char in password:
        if char.isupper():
            has_upper = True
            break
    
    # Check for lowercase letter
    has_lower = False
    for char in password:
        if char.islower():
            has_lower = True
            break
    
    # Check for digit
    has_digit = False
    for char in password:
        if char.isdigit():
            has_digit = True
            break
    
    return has_upper and has_lower and has_digit

print(f"Is 10 positive? {is_positive(10)}")
print(f"Is -5 positive? {is_positive(-5)}")
print(f"Is 25 a valid age? {is_valid_age(25)}")
print(f"Is 'Password123' strong? {is_strong_password('Password123')}")
print(f"Is 'weak' strong? {is_strong_password('weak')}")
</CodeEditor>

### Transformation Functions

Functions that convert data from one form to another:

<CodeEditor language="python">

def celsius_to_fahrenheit(celsius):
    """Convert Celsius to Fahrenheit."""
    return celsius * 9/5 + 32

def format_name(first, last):
    """Format a name as 'Last, First'."""
    return f"{last}, {first}"

def clean_text(text):
    """Clean and normalize text."""
    cleaned = text.strip().lower()
    # Keep replacing double spaces until none are left
    while "  " in cleaned:
        cleaned = cleaned.replace("  ", " ")
    return cleaned

print(f"20°C is {celsius_to_fahrenheit(20)}°F")
print(f"Formatted name: {format_name('Ada', 'Lovelace')}")
print(f"Cleaned text: '{clean_text('  Some  Messy Text  ')}'")
</CodeEditor>

### Aggregation Functions

Functions that summarize collections:

<CodeEditor language="python">

def calculate_statistics(numbers):
    """Calculate mean, min, and max of numbers."""
    if not numbers:
        return None
    return {
        "mean": sum(numbers) / len(numbers),
        "min": min(numbers),
        "max": max(numbers),
        "count": len(numbers)
    }

stats = calculate_statistics([10, 20, 30, 40, 50])
print(f"Statistics: {stats}")
print(f"Average: {stats['mean']}")
</CodeEditor>

## Review Questions

What does a function return if it has no explicit `return` statement?

<Quiz>
- 0
- False
- None*
- Error
</Quiz>

Which statement about function parameters is correct?

<Quiz>
- Parameters with defaults must come before parameters without defaults
- Parameters with defaults must come after parameters without defaults*
- All parameters must have defaults
- No parameters can have defaults
</Quiz>

What happens to variables created inside a function?

<Quiz>
- They become global variables
- They are only accessible within that function*
- They replace global variables with the same name
- They cause an error
</Quiz>

When does a function stop executing? (Select all that apply)

<Quiz>
- When it reaches the end of its code block*
- When it encounters a return statement*
- When it encounters an error*
- Only when the program ends
</Quiz>

## Challenges

1. **Temperature Converter Functions:** Create two functions: `celsius_to_fahrenheit(c)` and `fahrenheit_to_celsius(f)`. Then create a third function `convert_temperature(value, unit)` that uses the appropriate conversion based on the unit ("C" or "F").

2. **Data Validator:** Write a function `validate_data(data_dict)` that takes a dictionary with keys "name", "age", and "email". It should return a dictionary with validation results for each field.

3. **Statistics Calculator:** Create a function `analyze_grades(grades_list)` that returns a dictionary containing the mean, median, highest, lowest, and pass rate (percentage >= 60).

### Challenge 1: Temperature Converter
<Secret>
```python
def celsius_to_fahrenheit(celsius):
    """Convert Celsius to Fahrenheit."""
    return celsius * 9/5 + 32

def fahrenheit_to_celsius(fahrenheit):
    """Convert Fahrenheit to Celsius."""
    return (fahrenheit - 32) * 5/9

def convert_temperature(value, unit):
    """Convert temperature to the opposite unit."""
    unit = unit.upper()
    if unit == "C":
        result = celsius_to_fahrenheit(value)
        return f"{value}°C = {result:.1f}°F"
    elif unit == "F":
        result = fahrenheit_to_celsius(value)
        return f"{value}°F = {result:.1f}°C"
    else:
        return "Invalid unit. Use 'C' or 'F'"

# Test the functions
print(convert_temperature(100, "C"))  # Boiling point
print(convert_temperature(32, "F"))   # Freezing point
print(convert_temperature(37, "C"))   # Body temperature
```
</Secret>

### Challenge 2: Data Validator
<Secret>
```python
def validate_data(data_dict):
    """Validate user data dictionary."""
    results = {}
    
    # Validate name
    if "name" in data_dict:
        name = data_dict["name"]
        if type(name) == str and len(name.strip()) > 0:
            results["name"] = "Valid"
        else:
            results["name"] = "Invalid: Name must be non-empty string"
    else:
        results["name"] = "Missing"
    
    # Validate age
    if "age" in data_dict:
        age = data_dict["age"]
        if (type(age) == int or type(age) == float) and 0 <= age <= 120:
            results["age"] = "Valid"
        else:
            results["age"] = "Invalid: Age must be between 0 and 120"
    else:
        results["age"] = "Missing"
    
    # Validate email
    if "email" in data_dict:
        email = data_dict["email"]
        if type(email) == str and "@" in email and "." in email.split("@")[1]:
            results["email"] = "Valid"
        else:
            results["email"] = "Invalid: Email format incorrect"
    else:
        results["email"] = "Missing"
    
    return results

# Test cases
test1 = {"name": "Alice", "age": 25, "email": "alice@example.com"}
test2 = {"name": "", "age": 150, "email": "invalid"}
test3 = {"name": "Bob", "age": 30}  # Missing email

print(validate_data(test1))
print(validate_data(test2))
print(validate_data(test3))
```
</Secret>

### Challenge 3: Statistics Calculator
<Secret>
```python
def analyze_grades(grades_list):
    """Analyze a list of grades and return statistics."""
    if not grades_list:
        return None
    
    # Sort for median calculation
    sorted_grades = sorted(grades_list)
    n = len(sorted_grades)
    
    # Calculate median
    if n % 2 == 0:
        median = (sorted_grades[n//2 - 1] + sorted_grades[n//2]) / 2
    else:
        median = sorted_grades[n//2]
    
    # Calculate pass rate
    passing = []
    for grade in grades_list:
        if grade >= 60:
            passing.append(grade)
    pass_rate = (len(passing) / len(grades_list)) * 100
    
    return {
        "mean": sum(grades_list) / len(grades_list),
        "median": median,
        "highest": max(grades_list),
        "lowest": min(grades_list),
        "pass_rate": pass_rate,
        "total_students": len(grades_list)
    }

# Test the function
grades = [78, 92, 45, 88, 67, 73, 85, 90, 52, 95]
stats = analyze_grades(grades)
for key, value in stats.items():
    if type(value) == float:
        print(f"{key}: {value:.1f}")
    else:
        print(f"{key}: {value}")
```
</Secret>

## Key Terms

- Function
- `def` keyword
- Parameter vs Argument
- `return` statement
- Docstring
- Default parameter
- Scope (local vs global)
- Function call
- None return value


# Your Local Python Environment

You’ve practiced in the browser; now we’ll set up a local environment so you can build real projects with files and libraries.

Up until now, we've been working in the browser-based Python REPL. It's been great for learning the basics, but it's time to level up. We're going to set up Python on your own computer, which opens up a whole new world of possibilities.

## Why Go Local?

Working on your own computer (what programmers call working "locally") is like the difference between cooking in someone else's kitchen versus your own. When you work locally, you can:

- **Save your work permanently:** Create actual Python files (.py) that persist
- **Work with your own data:** Process files from your research
- **Install powerful libraries:** Access thousands of specialized tools
- **Use professional development tools:** Code editors, debuggers, version control
- **Build real projects:** Create applications you can share with others

This transition might feel like a big step, but don't worry. We'll go through it together, step by step.

## What We'll Install

We need three essential tools for professional Python development:

1. **Python itself:** The interpreter that runs your code
2. **pip:** Python's package manager for installing libraries
3. **Visual Studio Code (VS Code):** A free, powerful code editor

Think of it this way:
- Python is like having a fully equipped workshop
- pip is like having access to a tool store where you can get specialized equipment
- VS Code is like having a well-organized workbench with good lighting

## Step 1: Installing Python

### For Windows Users

1. **Download Python:**
   - Go to [python.org/downloads](https://python.org/downloads)
   - Click the big yellow button to download the latest version
   - The site automatically detects you're on Windows

2. **Run the Installer:**
   - Double-click the downloaded file
   - **CRITICAL:** Check the box that says "Add Python to PATH"
   - This is the most important step! If you miss this, Python won't work from the command line
   - Click "Install Now"
   - Wait for installation to complete

3. **Verify Installation:**
   - Open Command Prompt or PowerShell (search for it in Start menu)
   - Type `python --version` and press Enter
   - You should see something like `Python 3.11.5`
   - If you see an error, Python wasn't added to PATH properly

### For Mac Users

1. **Check if Python is Already Installed:**
   - Open Terminal (find it in Applications > Utilities)
   - Type `python3 --version`
   - If you see a version 3.8 or higher, you're good!

2. **If You Need to Install:**
   - Go to [python.org/downloads](https://python.org/downloads)
   - Download the macOS installer
   - Double-click the .pkg file
   - Follow the installation wizard
   - Verify with `python3 --version` in Terminal

3. **Important Note for Mac:**
   - On Mac, use `python3` instead of `python`
   - Use `pip3` instead of `pip`
   - This avoids conflicts with the older Python 2 that comes with macOS

### For Linux Users

Python usually comes pre-installed on Linux. To check:

```bash
python3 --version
```

If you need to install or update:

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip

# Fedora
sudo dnf install python3 python3-pip

# Arch
sudo pacman -S python python-pip
```

## Step 2: Understanding pip

**pip** (Pip Installs Packages) is Python's package manager. It's like an app store for Python libraries. When you installed Python, pip came with it automatically.

To verify pip is installed:

```bash
pip --version  # Windows
pip3 --version  # Mac/Linux
```

Common pip commands you'll use:
- `pip install library_name` - Install a library
- `pip list` - See what's installed
- `pip show library_name` - Get info about a library
- `pip uninstall library_name` - Remove a library

## Step 3: Installing Visual Studio Code

VS Code is a free, professional code editor from Microsoft. It's become the most popular choice for Python development.

1. **Download VS Code:**
   - Go to [code.visualstudio.com](https://code.visualstudio.com)
   - Click the download button for your operating system
   - The site auto-detects your OS

2. **Install VS Code:**
   - **Windows:** Run the installer, accept defaults
   - **Mac:** Open the .dmg file, drag VS Code to Applications
   - **Linux:** Follow instructions for your distribution

3. **Install the Python Extension:**
   - Open VS Code
   - Click the Extensions icon in the left sidebar (looks like four squares)
   - Search for "Python"
   - Install the official Python extension by Microsoft
   - This adds Python-specific features like syntax highlighting, debugging, and IntelliSense

## Your First Python File

Let's create your first Python program on your local machine!

1. **Create a Project Folder:**
   - Create a new folder called `python_projects` somewhere easy to find (like Desktop or Documents)
   - This will be your workspace for all Python projects

2. **Open the Folder in VS Code:**
   - Open VS Code
   - Go to File > Open Folder
   - Select your `python_projects` folder

3. **Create a Python File:**
   - Click the New File icon (or File > New File)
   - Name it `hello.py` (the .py extension is important!)

4. **Write Your First Program:**
   ```python
   # hello.py
   # My first Python program running locally!
   
   def greet(name):
       """Greet someone by name."""
       return f"Hello, {name}! Welcome to Python."
   
   # Get user input
   user_name = input("What's your name? ")
   
   # Use our function
   message = greet(user_name)
   print(message)
   
   # Some calculations
   birth_year = int(input("What year were you born? "))
   current_year = 2024
   age = current_year - birth_year
   
   print(f"You are approximately {age} years old.")
   ```

5. **Run Your Program:**
   - In VS Code, right-click in the editor
   - Select "Run Python File in Terminal"
   - Or press the Run button (▶) in the top right
   - You'll see a terminal appear at the bottom with your program running!

## Installing Essential Libraries

Let's install the libraries we'll need for data science work. Open a terminal (Terminal on Mac/Linux, Command Prompt or PowerShell on Windows) and run these commands:

```bash
# Jupyter for interactive notebooks
pip install jupyter

# Data analysis essentials
pip install pandas numpy

# Visualization libraries
pip install matplotlib seaborn

# Web requests for APIs
pip install requests

# All in one line (if you prefer)
pip install jupyter pandas numpy matplotlib seaborn requests
```

Each library serves a specific purpose:
- **Jupyter:** Interactive notebook environment for exploratory coding
- **pandas:** The powerhouse for data manipulation
- **numpy:** Numerical computing foundation
- **matplotlib:** Basic plotting library
- **seaborn:** Statistical data visualization
- **requests:** For fetching data from the web

## Troubleshooting Common Issues

### "Python is not recognized" (Windows)
- You didn't check "Add Python to PATH" during installation
- Solution: Reinstall Python, making sure to check that box

### "pip: command not found"
- pip isn't in your system PATH
- Try `python -m pip` instead of just `pip`
- Or `python3 -m pip` on Mac/Linux

### "Permission denied" errors
- On Mac/Linux, you might need to use `pip3 install --user library_name`
- This installs for your user only, not system-wide

### VS Code can't find Python
- Make sure the Python extension is installed
- Click on the Python version in the bottom status bar
- Select the correct Python interpreter

## Review Questions

What does pip stand for?

<Quiz>
- Python Internal Packages
- Pip Installs Packages*
- Python Installation Program
- Package Internet Protocol
</Quiz>

Why is it important to add Python to PATH during installation?

<Quiz>
- It makes Python run faster
- It allows Python to be run from any terminal/command prompt*
- It installs additional features
- It's required for VS Code
</Quiz>

What file extension do Python files use?

<Quiz>
- .python
- .py*
- .pyt
- .txt
</Quiz>

## Key Terms

- Local development
- Python interpreter
- pip (package manager)
- VS Code
- PATH environment variable
- Library/Package
- Terminal/Command Prompt
- File extension (.py)

# Working with Files and Data

With a local setup, you can read, write, and process files, automate tasks, and prepare data for analysis.

Now that you have Python running locally, you can work with actual files on your computer. Python gets really powerful here: you can process hundreds or thousands of files automatically, extract data, and save results.

## File Paths: Finding Your Files

Before you can work with a file, Python needs to know where to find it. A **file path** is like an address for a file on your computer.

### Understanding Paths

There are two types of paths:

1. **Absolute paths:** Complete address from the root of your file system
   - Windows: `C:\Users\YourName\Documents\data.txt`
   - Mac/Linux: `/Users/YourName/Documents/data.txt`

2. **Relative paths:** Address relative to where your Python script is running
   - `data.txt` (file in same folder as your script)
   - `data/survey_results.txt` (file in a subfolder called 'data')
   - `../shared/data.txt` (file in a parent folder's subfolder)

For most projects, use relative paths - they make your code portable.

## Reading Text Files

The most basic file operation is reading text. Python makes this elegant:

```python
# reading_files.py

# Method 1: Simple but not ideal
file = open("sample.txt", "r")  # "r" means read mode
content = file.read()
print(content)
file.close()  # Always close files!

# Method 2: Better - using 'with' (automatically closes file)
with open("sample.txt", "r") as file:
    content = file.read()
    print(content)
# File automatically closed when we exit the 'with' block

# Method 3: Read line by line
with open("sample.txt", "r") as file:
    for line in file:
        print(f"Line: {line.strip()}")  # strip() removes newline characters
```

The `with` statement is Python's way of ensuring files are properly closed, even if an error occurs. Always use it for file operations.

## Writing Files

Creating or modifying files is just as straightforward:

```python
# writing_files.py

# Write mode ('w') creates a new file or overwrites existing
with open("output.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("This is a new file.\n")
    
# Append mode ('a') adds to the end of existing file
with open("output.txt", "a") as file:
    file.write("This line was added later.\n")

# Writing multiple lines at once
lines = [
    "First line",
    "Second line", 
    "Third line"
]

with open("multiple.txt", "w") as file:
    for line in lines:
        file.write(line + "\n")  # Add newline after each
```

## Working with CSV Files

CSV (Comma-Separated Values) files are everywhere in research. While you could parse them manually, Python's `csv` module makes it much easier:

```python
import csv

# Reading CSV files
with open("data.csv", "r") as file:
    csv_reader = csv.reader(file)
    
    # Skip header if needed
    header = next(csv_reader)
    print(f"Columns: {header}")
    
    # Read each row
    for row in csv_reader:
        print(row)  # row is a list

# Reading CSV as dictionaries (more convenient!)
with open("data.csv", "r") as file:
    csv_reader = csv.DictReader(file)
    
    for row in csv_reader:
        # Now row is a dictionary with column names as keys
        print(f"Name: {row['name']}, Age: {row['age']}")

# Writing CSV files
data = [
    ["Name", "Age", "City"],  # Header
    ["Alice", 30, "New York"],
    ["Bob", 25, "Boston"],
    ["Charlie", 35, "Chicago"]
]

with open("output.csv", "w", newline="") as file:
    csv_writer = csv.writer(file)
    csv_writer.writerows(data)

# Writing CSV from dictionaries
people = [
    {"name": "Alice", "age": 30, "city": "New York"},
    {"name": "Bob", "age": 25, "city": "Boston"}
]

with open("people.csv", "w", newline="") as file:
    fieldnames = ["name", "age", "city"]
    csv_writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    csv_writer.writeheader()  # Write column names
    csv_writer.writerows(people)
```

## Introduction to pandas

While the `csv` module works, **pandas** is the professional tool for data analysis. It's like Excel, but programmable and much more powerful.

```python
import pandas as pd

# Reading data is one line!
df = pd.read_csv("data.csv")

# Display first few rows
print(df.head())

# Basic information about your data
print(df.info())  # Column names, types, non-null counts
print(df.describe())  # Statistical summary

# Accessing specific columns
print(df["name"])  # Single column
print(df[["name", "age"]])  # Multiple columns

# Filtering data
adults = df[df["age"] >= 18]
print(adults)

# Adding new columns
df["birth_year"] = 2024 - df["age"]

# Grouping and aggregation
average_age_by_city = df.groupby("city")["age"].mean()
print(average_age_by_city)

# Saving results
df.to_csv("processed_data.csv", index=False)
```

We'll dive much deeper into pandas in upcoming lessons, but you can already see how powerful it is.

### Counting Categories and Finding Top Values

Before our project, learn two common patterns:

```python
# Count category frequencies in a column
counts = df["city"].value_counts()
print(counts.head(5))  # Top 5 cities

# Get the most frequent category name
most_common_city = df["city"].value_counts().idxmax()
print(most_common_city)

# Group then count within groups (e.g., complaints per borough)
# df.groupby("borough")["complaint_type"].value_counts()

# Sort counts explicitly when needed
sorted_counts = counts.sort_values(ascending=False)

# Reorder a Series to a specific order using reindex
day_order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
# Example: day_counts.reindex(day_order)
```

<Info>
You’ll use `value_counts()`, `idxmax()`, and `reindex()` in the NYC 311 project below. This preview keeps the project steps focused on analysis, not new syntax.
</Info>

## Working with JSON

JSON (JavaScript Object Notation) is the standard format for web APIs and modern data exchange. It looks like Python dictionaries and lists:

```python
import json

# Python data structure
data = {
    "name": "Research Project",
    "year": 2024,
    "participants": [
        {"id": 1, "name": "Alice", "role": "Lead"},
        {"id": 2, "name": "Bob", "role": "Analyst"}
    ],
    "active": True
}

# Writing JSON to file
with open("project.json", "w") as file:
    json.dump(data, file, indent=2)  # indent makes it readable

# Reading JSON from file
with open("project.json", "r") as file:
    loaded_data = json.load(file)
    print(loaded_data["participants"][0]["name"])  # "Alice"

# Converting between JSON strings and Python objects
json_string = '{"name": "Test", "value": 42}'
parsed = json.loads(json_string)  # String to Python
print(parsed["value"])  # 42

back_to_string = json.dumps(parsed)  # Python to string
print(back_to_string)
```

## Error Handling with Files

Files might not exist, might be corrupted, or you might not have permission to access them. Handle these gracefully:

```python
def read_file_safely(filename):
    """Read a file with proper error handling."""
    try:
        with open(filename, "r") as file:
            return file.read()
    except FileNotFoundError:
        print(f"Error: The file '{filename}' was not found.")
        return None
    except PermissionError:
        print(f"Error: You don't have permission to read '{filename}'.")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None

# Usage
content = read_file_safely("maybe_exists.txt")
if content:
    print("File contents: " + str(content))
else:
    print("Could not read file.")
```

## Practical Example: Research Data Pipeline

Let's combine everything into a realistic research scenario:

```python
"""
Research Data Pipeline
Process survey responses, clean data, and generate summary report
"""

import csv
import json
from datetime import datetime

def load_survey_data(filename):
    """Load survey responses from CSV."""
    responses = []
    try:
        with open(filename, "r") as file:
            reader = csv.DictReader(file)
            for row in reader:
                # Convert age to integer
                row["age"] = int(row["age"])
                # Convert satisfaction to float
                row["satisfaction"] = float(row["satisfaction"])
                responses.append(row)
        print(f"Loaded {len(responses)} responses")
        return responses
    except FileNotFoundError:
        print(f"Error: Could not find {filename}")
        return []

def analyze_responses(responses):
    """Analyze survey responses and compute statistics."""
    if not responses:
        return {}
    
    total = len(responses)
    
    # Calculate averages using loops
    total_age = 0
    total_satisfaction = 0
    for r in responses:
        total_age += r["age"]
        total_satisfaction += r["satisfaction"]
    
    avg_age = total_age / total
    avg_satisfaction = total_satisfaction / total
    
    # Count by category
    categories = {}
    for r in responses:
        cat = r["category"]
        categories[cat] = categories.get(cat, 0) + 1
    
    return {
        "total_responses": total,
        "average_age": round(avg_age, 1),
        "average_satisfaction": round(avg_satisfaction, 2),
        "categories": categories,
        "analysis_date": datetime.now().isoformat()
    }

def save_report(analysis, filename):
    """Save analysis results to JSON."""
    with open(filename, "w") as file:
        json.dump(analysis, file, indent=2)
    print(f"Report saved to {filename}")

def generate_summary(analysis):
    """Generate human-readable summary."""
    summary = []
    summary.append("=" * 50)
    summary.append("SURVEY ANALYSIS REPORT")
    summary.append("=" * 50)
    summary.append(f"Total Responses: {analysis['total_responses']}")
    summary.append(f"Average Age: {analysis['average_age']}")
    summary.append(f"Average Satisfaction: {analysis['average_satisfaction']}/5.0")
    summary.append("\nResponses by Category:")
    
    for cat, count in analysis["categories"].items():
        percentage = (count / analysis["total_responses"]) * 100
        summary.append(f"  {cat}: {count} ({percentage:.1f}%)")
    
    summary.append(f"\nAnalysis Date: {analysis['analysis_date']}")
    
    return "\n".join(summary)

# Main pipeline - run the analysis
# Load data
responses = load_survey_data("survey_responses.csv")

if responses:
    # Analyze
    results = analyze_responses(responses)
    
    # Save detailed results
    save_report(results, "analysis_results.json")
    
    # Generate and save summary
    summary = generate_summary(results)
    print("\n" + summary)
    
    with open("summary_report.txt", "w") as file:
        file.write(summary)
    print("\nSummary report saved to summary_report.txt")
```

This pipeline demonstrates a complete workflow: loading data, processing it, and saving results in multiple formats.

## Review Questions

What is the advantage of using `with open()` instead of just `open()`?

<Quiz>
- It's faster
- It automatically closes the file when done*
- It allows writing to the file
- It works with more file types
</Quiz>

What mode would you use to add content to an existing file without erasing it?

<Quiz>
- "r"
- "w"
- "a"*
- "x"
</Quiz>

In pandas, what does `df.head()` do?

<Quiz>
- Reads the file header
- Shows column names only
- Displays the first few rows of the DataFrame*
- Sorts data by the first column
</Quiz>

What's the difference between `json.dump()` and `json.dumps()`?

<Quiz>
- There is no difference
- dump() writes to a file, dumps() returns a string*
- dumps() is faster
- dump() is deprecated
</Quiz>

## Challenges

1. **File Statistics:** Write a program that reads a text file and reports: number of lines, number of words, number of characters, and the most common word.

2. **CSV Processor:** Create a program that reads a CSV file of student grades, calculates each student's average, assigns letter grades, and writes the results to a new CSV.

3. **JSON Configuration:** Build a program that reads settings from a JSON config file (like database connection, file paths, etc.) and uses those settings to process data files.

### Challenge 1: File Statistics
<Secret>
```python
def analyze_text_file(filename):
    """Analyze a text file and return statistics."""
    try:
        with open(filename, "r") as file:
            content = file.read()
            lines = content.split("\n")
            words = content.split()
            
            # Count word frequency
            word_count = {}
            for word in words:
                word_lower = word.lower().strip(".,!?;:")
                word_count[word_lower] = word_count.get(word_lower, 0) + 1
            
            # Find most common word
            most_common_word = ""
            highest_count = 0
            for word, count in word_count.items():
                if count > highest_count:
                    highest_count = count
                    most_common_word = word
            most_common = (most_common_word, highest_count)
            
            stats = {
                "lines": len(lines),
                "words": len(words),
                "characters": len(content),
                "most_common_word": most_common[0],
                "most_common_count": most_common[1]
            }
            
            return stats
            
    except FileNotFoundError:
        print(f"File {filename} not found")
        return None

# Test it
stats = analyze_text_file("sample.txt")
if stats:
    print(f"Lines: {stats['lines']}")
    print(f"Words: {stats['words']}")
    print(f"Characters: {stats['characters']}")
    print(f"Most common word: '{stats['most_common_word']}' ({stats['most_common_count']} times)")
```

</Secret>

### Challenge 2: CSV Grade Processor
<Secret>
```python
import csv

def process_grades(input_file, output_file):
    """Read student grades, calculate averages, assign letter grades."""
    
    def get_letter_grade(average):
        """Convert numeric grade to letter grade."""
        if average >= 90:
            return "A"
        elif average >= 80:
            return "B"
        elif average >= 70:
            return "C"
        elif average >= 60:
            return "D"
        else:
            return "F"
    
    results = []
    
    with open(input_file, "r") as infile:
        reader = csv.DictReader(infile)
        
        for row in reader:
            # Extract grades (assuming columns like: name, grade1, grade2, grade3)
            name = row["name"]
            grades = []
            for key in row:
                if key.startswith("grade"):
                    grades.append(float(row[key]))
            
            # Calculate average
            average = sum(grades) / len(grades) if grades else 0
            letter = get_letter_grade(average)
            
            results.append({
                "name": name,
                "average": round(average, 2),
                "letter_grade": letter
            })
    
    # Write results
    with open(output_file, "w", newline="") as outfile:
        fieldnames = ["name", "average", "letter_grade"]
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)
    
    print(f"Processed {len(results)} students")
    print(f"Results saved to {output_file}")

# Usage
process_grades("student_grades.csv", "final_grades.csv")
```
</Secret>

### Challenge 3: JSON Configuration
<Secret>
```python
import json
import os

def load_config(config_file="config.json"):
    """Load configuration from JSON file."""
    try:
        with open(config_file, "r") as file:
            config = json.load(file)
            print(f"Configuration loaded from {config_file}")
            return config
    except FileNotFoundError:
        print(f"Config file not found. Creating default configuration...")
        default_config = {
            "input_directory": "./data",
            "output_directory": "./output",
            "file_extension": ".txt",
            "processing_options": {
                "skip_empty": True,
                "max_files": 100,
                "verbose": True
            }
        }
        with open(config_file, "w") as file:
            json.dump(default_config, file, indent=2)
        print(f"Default configuration saved to {config_file}")
        return default_config

def process_with_config(config):
    """Process files according to configuration."""
    input_dir = config["input_directory"]
    output_dir = config["output_directory"]
    extension = config["file_extension"]
    options = config["processing_options"]
    
    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created output directory: {output_dir}")
    
    # Process files
    files_processed = 0
    for filename in os.listdir(input_dir):
        if filename.endswith(extension):
            if files_processed >= options["max_files"]:
                break
            
            input_path = os.path.join(input_dir, filename)
            
            with open(input_path, "r") as file:
                content = file.read()
                
                if options["skip_empty"] and not content.strip():
                    if options["verbose"]:
                        print(f"Skipping empty file: {filename}")
                    continue
                
                # Process content (example: convert to uppercase)
                processed = content.upper()
                
                # Save processed file
                output_path = os.path.join(output_dir, f"processed_{filename}")
                with open(output_path, "w") as outfile:
                    outfile.write(processed)
                
                files_processed += 1
                if options["verbose"]:
                    print(f"Processed: {filename} -> processed_{filename}")
    
    print(f"Total files processed: {files_processed}")

# Main program
config = load_config()
process_with_config(config)
```
</Secret>

## Key Terms

- File path (absolute vs relative)
- File modes ("r", "w", "a")
- `with` statement
- CSV (Comma-Separated Values)
- JSON (JavaScript Object Notation)
- pandas DataFrame
- Error handling (try/except)
- File I/O (Input/Output)

# Collecting Data from the Web

Finally, we’ll fetch structured data from web APIs, then apply your pandas and visualization skills to build research-ready datasets.

The internet is the largest repository of data ever created. From government databases to museum collections, from weather stations to library catalogs, vast amounts of information are available through web APIs (Application Programming Interfaces). Learning to collect this data programmatically transforms you from someone who can analyze data to someone who can gather it at scale.

## Understanding Web APIs

An API is like a restaurant menu for data. Instead of visiting a website and clicking around to find information, you send a structured request and get structured data back. It's the difference between reading a newspaper (website) and having a research assistant who hands you just the information you need (API).

### How APIs Work

When you visit a website, your browser:
1. Sends a request to a server
2. Receives HTML/CSS/JavaScript back
3. Renders it visually

When you use an API:
1. Your program sends a request to a server
2. Receives structured data (usually JSON) back
3. Your program processes the data

It's much more efficient for data collection because you skip the visual presentation and get straight to the information.

## The requests Library

Python's `requests` library is your tool for talking to APIs. It handles all the complex networking details, letting you focus on the data.

```python
import requests

# The simplest API call
response = requests.get("https://api.github.com")
print(response.status_code)  # 200 means success
print(response.json())  # Parse JSON response into Python dictionary
```

### Understanding HTTP Status Codes

When you make a request, the server responds with a status code that tells you what happened:

- **200-299: Success**
  - 200: OK - Everything worked fine
  - 201: Created - Something was created successfully
- **300-399: Redirection**
  - 301: Moved permanently - The resource has a new location
- **400-499: Client errors (your fault)**
  - 400: Bad request - You sent invalid data
  - 401: Unauthorized - You need to log in or provide an API key
  - 403: Forbidden - You're not allowed to access this
  - 404: Not found - The resource doesn't exist
  - 429: Too many requests - You're being rate-limited (slow down!)
- **500-599: Server errors (their fault)**
  - 500: Internal server error - Something went wrong on their end
  - 503: Service unavailable - The server is temporarily down

## Starting Simple: JSONPlaceholder

Let's begin with JSONPlaceholder, a fake API designed specifically for learning. It requires no setup, no API keys, and always returns clean, predictable data. This lets you focus on understanding how APIs work without worrying about authentication or messy data.

```python
import requests
import json

def explore_jsonplaceholder():
    """
    Explore a simple API designed for learning.
    No API key needed.
    """
    # Get all users
    print("Fetching users...")
    response = requests.get("https://jsonplaceholder.typicode.com/users")
    
    if response.status_code == 200:
        users = response.json()
        print(f"Found {len(users)} users")
        
        # Look at the first user
        first_user = users[0]
        print(f"\nFirst user details:")
        print(f"Name: {first_user['name']}")
        print(f"Email: {first_user['email']}")
        print(f"City: {first_user['address']['city']}")
    else:
        print(f"Error: {response.status_code}")

# Try it!
explore_jsonplaceholder()

# Get posts by a specific user
def get_user_posts(user_id):
    """Get all posts written by a specific user."""
    url = f"https://jsonplaceholder.typicode.com/posts?userId={user_id}"
    response = requests.get(url)
    
    if response.status_code == 200:
        posts = response.json()
        print(f"\nUser {user_id} has written {len(posts)} posts")
        
        # Show first post title
        if posts:
            print(f"First post title: {posts[0]['title']}")
    
    return posts

posts = get_user_posts(1)
```

### Understanding the Response Structure

APIs return data in JSON format, which Python converts to dictionaries and lists:

```python
# Let's examine the structure of API responses
def understand_json_structure():
    """Learn to navigate JSON responses."""
    
    # Get a single post
    response = requests.get("https://jsonplaceholder.typicode.com/posts/1")
    post = response.json()
    
    # JSON becomes a Python dictionary
    print(f"Type of response: {type(post)}")
    print(f"Keys in the response: {post.keys()}")
    
    # Access data like any dictionary
    print(f"\nPost ID: {post['id']}")
    print(f"Title: {post['title']}")
    print(f"Body preview: {post['body'][:50]}...")
    
    # Get comments for this post
    comments_url = f"https://jsonplaceholder.typicode.com/posts/1/comments"
    comments = requests.get(comments_url).json()
    
    # JSON array becomes Python list
    print(f"\nThis post has {len(comments)} comments")
    print(f"First comment by: {comments[0]['name']}")

understand_json_structure()
```

## Real Example: The Metropolitan Museum of Art

Let's work with real cultural data. The Met Museum API provides access to 470,000+ artworks with zero authentication required!

```python
import requests
import time

# Metropolitan Museum of Art API functions
# No API key needed - completely free!

def search_met_artworks(query):
    """
    Search for artworks by keyword.
    
    Args:
        query: Search term (e.g., "impressionism", "cats", "van gogh")
    
    Returns:
        List of artwork IDs
    """
    print(f"Searching for artworks about '{query}'...")
    
    base_url = "https://collectionapi.metmuseum.org/public/collection/v1"
    search_url = f"{base_url}/search"
    params = {"q": query}
    
    try:
        response = requests.get(search_url, params=params)
        
        if response.status_code == 200:
            data = response.json()
            total = data.get("total", 0)
            object_ids = data.get("objectIDs", [])
            
            print(f"Found {total} artworks")
            return object_ids
        else:
            print(f"Search failed with status {response.status_code}")
            return []
            
    except requests.exceptions.RequestException as e:
        print(f"Network error: {e}")
        return []

def get_met_artwork_details(object_id):
    """
    Get detailed information about a specific artwork.
    
    Args:
        object_id: The Met's ID for the artwork
        
    Returns:
        Dictionary with artwork details
    """
    base_url = "https://collectionapi.metmuseum.org/public/collection/v1"
    url = f"{base_url}/objects/{object_id}"
    
    try:
        response = requests.get(url)
        
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Could not get details for artwork {object_id}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"Network error: {e}")
        return None

def explore_met_collection(search_term, limit=5):
    """
    Search and display information about artworks.
    
    Args:
        search_term: What to search for
        limit: Maximum number of artworks to display
    """
    # Search for artworks
    artwork_ids = search_met_artworks(search_term)
    
    if not artwork_ids:
        print("No artworks found")
        return
    
    # Limit the number we'll look at
    artwork_ids = artwork_ids[:limit]
    
    print(f"\nExploring {len(artwork_ids)} artworks...")
    print("-" * 60)
    
    artworks = []
    for i, artwork_id in enumerate(artwork_ids, 1):
        print(f"Fetching artwork {i}/{len(artwork_ids)}...")
        
        # Get details
        details = get_met_artwork_details(artwork_id)
        
        if details:
            # Extract key information
            artwork_info = {
                "title": details.get("title", "Unknown"),
                "artist": details.get("artistDisplayName", "Unknown artist"),
                "date": details.get("objectDate", "Unknown date"),
                "medium": details.get("medium", "Unknown medium"),
                "department": details.get("department", ""),
                "url": details.get("objectURL", ""),
                "image": details.get("primaryImage", "")
            }
            
            artworks.append(artwork_info)
            
            # Display information
            print(f"\n{i}. {artwork_info['title']}")
            print(f"   Artist: {artwork_info['artist']}")
            print(f"   Date: {artwork_info['date']}")
            print(f"   Medium: {artwork_info['medium']}")
            if artwork_info['url']:
                print(f"   View online: {artwork_info['url']}")
        
        # Be polite to the API
        if i < len(artwork_ids):
            time.sleep(0.5)
    
    return artworks

# Let's explore.
# Search for impressionist paintings
impressionist_art = explore_met_collection("impressionism", limit=3)

# Try different searches
print("\n" + "=" * 60)
japanese_art = explore_met_collection("japanese", limit=3)
```

## Another Free API: Open-Meteo Weather

Open-Meteo provides weather data worldwide with no registration required. This is great for learning about geographic and time-series data:

```python
import requests
from datetime import datetime
import time

def get_weather_no_key(latitude, longitude, city_name=""):
    """
    Get weather forecast using Open-Meteo (no API key needed!).
    
    Args:
        latitude: Latitude of location
        longitude: Longitude of location  
        city_name: Optional name for display
        
    Returns:
        Dictionary with weather data
    """
    # Build the API URL
    base_url = "https://api.open-meteo.com/v1/forecast"
    
    # Parameters for the request
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current_weather": True,
        "hourly": "temperature_2m,precipitation",
        "daily": "temperature_2m_max,temperature_2m_min,precipitation_sum",
        "temperature_unit": "fahrenheit",  # or "celsius"
        "precipitation_unit": "inch",      # or "mm"
        "timezone": "auto"
    }
    
    try:
        print(f"Fetching weather for {city_name if city_name else 'location'}...")
        response = requests.get(base_url, params=params)
        
        if response.status_code == 200:
            data = response.json()
            
            # Extract current weather
            current = data["current_weather"]
            
            # Create summary
            weather_summary = {
                "location": city_name if city_name else f"({latitude}, {longitude})",
                "time": current["time"],
                "temperature": f"{current['temperature']}°F",
                "windspeed": f"{current['windspeed']} mph",
                "conditions": interpret_weather_code(current["weathercode"])
            }
            
            # Display results
            print(f"\nCurrent weather in {weather_summary['location']}:")
            print(f"Temperature: {weather_summary['temperature']}")
            print(f"Conditions: {weather_summary['conditions']}")
            print(f"Wind speed: {weather_summary['windspeed']}")
            
            # Show tomorrow's forecast
            if "daily" in data:
                tomorrow_max = data["daily"]["temperature_2m_max"][1]
                tomorrow_min = data["daily"]["temperature_2m_min"][1]
                tomorrow_precip = data["daily"]["precipitation_sum"][1]
                
                print(f"\nTomorrow's forecast:")
                print(f"High: {tomorrow_max}°F, Low: {tomorrow_min}°F")
                print(f"Precipitation: {tomorrow_precip} inches")
            
            return data
        else:
            print(f"Error: Status code {response.status_code}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"Network error: {e}")
        return None

def interpret_weather_code(code):
    """
    Convert weather codes to human-readable descriptions.
    """
    weather_codes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy", 
        3: "Overcast",
        45: "Foggy",
        48: "Depositing rime fog",
        51: "Light drizzle",
        61: "Slight rain",
        71: "Slight snow",
        95: "Thunderstorm"
    }
    return weather_codes.get(code, "Unknown conditions")

# Get weather for major cities (no API key needed!)
cities = [
    {"name": "New York", "lat": 40.7128, "lon": -74.0060},
    {"name": "London", "lat": 51.5074, "lon": -0.1278},
    {"name": "Tokyo", "lat": 35.6762, "lon": 139.6503}
]

for city in cities:
    weather = get_weather_no_key(city["lat"], city["lon"], city["name"])
    print("-" * 40)
    time.sleep(1)  # Be polite between requests
```

## Handling Common API Challenges

### Rate Limiting

Most APIs limit how many requests you can make. Here's how to handle this gracefully:

```python
import time

def respectful_api_calls(urls, delay=1.0):
    """
    Make multiple API calls with delays to respect rate limits.
    
    Args:
        urls: List of URLs to fetch
        delay: Seconds to wait between requests
        
    Returns:
        List of responses
    """
    results = []
    total = len(urls)
    
    for i, url in enumerate(urls, 1):
        print(f"Fetching {i}/{total}...")
        
        try:
            response = requests.get(url)
            
            if response.status_code == 429:  # Too Many Requests
                print("Rate limited. Waiting longer...")
                time.sleep(delay * 3)  # Triple the delay
                response = requests.get(url)  # Retry
            
            results.append(response.json())
            
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            results.append(None)
        
        # Don't delay after the last request
        if i < total:
            time.sleep(delay)
    
    return results
```

### Error Handling

APIs can fail for many reasons. Always handle errors gracefully:

```python
def safe_api_request(url, params=None, max_retries=3):
    """
    Make an API request with proper error handling and retries.
    
    Args:
        url: The API endpoint
        params: Query parameters
        max_retries: Maximum number of retry attempts
        
    Returns:
        Response data or None if failed
    """
    for attempt in range(max_retries):
        try:
            response = requests.get(url, params=params, timeout=10)
            
            # Check for successful response
            if response.status_code == 200:
                return response.json()
            elif response.status_code == 404:
                print(f"Resource not found (404)")
                return None
            elif response.status_code == 500:
                print(f"Server error on attempt {attempt + 1}")
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)  # Exponential backoff
                    continue
            else:
                print(f"Unexpected status code: {response.status_code}")
                return None
                
        except requests.exceptions.ConnectionError:
            print(f"Connection error on attempt {attempt + 1}")
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)
                continue
                
        except requests.exceptions.Timeout:
            print(f"Request timed out on attempt {attempt + 1}")
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)
                continue
                
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            return None
    
    print(f"Failed after {max_retries} attempts")
    return None
```

## Building a Multi-Source Research Dataset

Let's combine multiple free APIs to create a rich dataset:

```python
import pandas as pd
import json
import time
from datetime import datetime

def collect_cultural_data(topics, artworks_per_topic=5):
    """
    Collect artwork data for multiple topics.
    No API keys required!
    """
    print("=" * 60)
    print("COLLECTING CULTURAL DATA")
    print("=" * 60)
    
    all_artworks = []
    
    for topic in topics:
        print(f"\nSearching for {topic}...")
        
        # Search the Met collection using standalone functions
        artwork_ids = search_met_artworks(topic)
        
        if artwork_ids:
            # Limit number per topic
            for artwork_id in artwork_ids[:artworks_per_topic]:
                details = get_met_artwork_details(artwork_id)
                
                if details:
                    # Extract and structure the data
                    artwork_data = {
                        "search_topic": topic,
                        "title": details.get("title", ""),
                        "artist": details.get("artistDisplayName", ""),
                        "date": details.get("objectDate", ""),
                        "medium": details.get("medium", ""),
                        "department": details.get("department", ""),
                        "culture": details.get("culture", ""),
                        "period": details.get("period", ""),
                        "has_image": bool(details.get("primaryImage")),
                        "on_display": details.get("isPublicDomain", False),
                        "collected_at": datetime.now().isoformat()
                    }
                    
                    all_artworks.append(artwork_data)
                
                time.sleep(0.5)  # Rate limiting
    
    return all_artworks

def collect_weather_context(locations):
    """
    Collect weather data for multiple locations.
    """
    print("\n" + "=" * 60)
    print("COLLECTING WEATHER CONTEXT")
    print("=" * 60)
    
    weather_data = []
    
    for loc in locations:
        weather = get_weather_no_key(
            loc["lat"], 
            loc["lon"], 
            loc.get("name", "Unknown")
        )
        
        if weather:
            # Structure the weather data
            weather_record = {
                "location": loc.get("name", "Unknown"),
                "latitude": loc["lat"],
                "longitude": loc["lon"],
                "current_temp": weather["current_weather"]["temperature"],
                "windspeed": weather["current_weather"]["windspeed"],
                "weather_code": weather["current_weather"]["weathercode"],
                "collected_at": datetime.now().isoformat()
            }
            
            weather_data.append(weather_record)
        
        time.sleep(1)
    
    return weather_data

def save_research_data(cultural_data, weather_data, output_prefix="research"):
    """
    Save collected data to files.
    """
    print("\n" + "=" * 60)
    print("SAVING RESEARCH DATA")
    print("=" * 60)
    
    # Convert to DataFrames
    if cultural_data:
        df_culture = pd.DataFrame(cultural_data)
        culture_file = f"{output_prefix}_cultural_data.csv"
        df_culture.to_csv(culture_file, index=False)
        print(f"Saved {len(df_culture)} cultural records to {culture_file}")
    
    if weather_data:
        df_weather = pd.DataFrame(weather_data)
        weather_file = f"{output_prefix}_weather_data.csv"
        df_weather.to_csv(weather_file, index=False)
        print(f"Saved {len(df_weather)} weather records to {weather_file}")
    
    # Also save as JSON for complete preservation
    all_data = {
        "cultural_data": cultural_data,
        "weather_data": weather_data,
        "metadata": {
            "collection_date": datetime.now().isoformat(),
            "cultural_records": len(cultural_data),
            "weather_records": len(weather_data)
        }
    }
    
    json_file = f"{output_prefix}_combined.json"
    with open(json_file, "w") as f:
        json.dump(all_data, f, indent=2)
    print(f"Saved combined data to {json_file}")

# Run the complete data collection using functions
# Cultural topics to explore
topics = ["renaissance", "impressionism", "ancient egypt"]
cultural_data = collect_cultural_data(topics, artworks_per_topic=3)

# Locations for weather context
locations = [
    {"name": "New York", "lat": 40.7128, "lon": -74.0060},
    {"name": "Paris", "lat": 48.8566, "lon": 2.3522},
    {"name": "Cairo", "lat": 30.0444, "lon": 31.2357}
]
weather_data = collect_weather_context(locations)

# Save everything
save_research_data(cultural_data, weather_data)

print("\n" + "=" * 60)
print("Data collection complete.")
print(f"Collected {len(cultural_data)} artwork records")
print(f"Collected {len(weather_data)} weather records")
print("=" * 60)
```

## Best Practices for API Usage

1. **Always read the documentation:** Each API has its own rules and patterns
2. **Start with small requests:** Test with one record before requesting thousands
3. **Respect rate limits:** Add delays between requests (usually 0.5-1 second is polite)
4. **Handle errors gracefully:** Networks fail, servers go down - your code should cope
5. **Cache responses when appropriate:** Don't request the same data repeatedly
6. **Give attribution:** Credit your data sources in documentation and papers

## Troubleshooting Common Issues

### "Connection refused" or timeout errors
- Check your internet connection
- The server might be down - try again later
- You might be making requests too quickly

### Empty or unexpected responses
- Print the full response to see what you're getting
- Check if the API requires parameters you're not providing
- Verify the URL is correct (watch for typos!)

### JSON decode errors
- The response might not be JSON (check `response.text` to see raw content)
- The server might be returning an HTML error page
- You might have hit a rate limit

APIs are built for programs. Start simple, then add complexity as you go.

## Review Questions

What does a 404 HTTP status code mean?

<Quiz>
- Server error
- Success
- Resource not found*
- Unauthorized
</Quiz>

Why should you add delays between API requests?

<Quiz>
- To make your program slower
- To avoid overwhelming the server and respect rate limits*
- To save memory
- It's required by Python
</Quiz>

What format do most web APIs return data in?

<Quiz>
- HTML
- JSON*
- CSV
- PDF
</Quiz>

## Key Terms

- API (Application Programming Interface)
- HTTP status codes
- JSON response
- Rate limiting
- requests library
- Error handling
- Data parsing

# Jupyter Notebooks: Interactive Research Computing

Jupyter notebooks have transformed how researchers work with data. Instead of writing a script that runs from start to finish, you create an interactive document that mixes code, results, visualizations, and narrative text. It's like a lab notebook for computational research: you can experiment, document your thinking, and share your entire research process.

## What Makes Notebooks Special

Traditional programming separates code from its output. You write a script, run it, and see results in a terminal. Notebooks are different:

1. **Interactive:** Run code in pieces, see results immediately
2. **Iterative:** Modify and re-run cells without starting over
3. **Visual:** Charts and tables appear inline with your code
4. **Narrative:** Mix markdown text with code for documentation
5. **Shareable:** Others can read and reproduce your entire analysis

## Starting Jupyter

You installed Jupyter earlier with `pip install jupyter`. Let's use it:

```bash
# In your terminal, navigate to your project folder
cd python_projects

# Start JupyterLab (the modern interface)
jupyter lab

# Or use classic Jupyter Notebook
jupyter notebook
```

Your browser will open with the Jupyter interface. Click "New" → "Python 3" to create your first notebook.

## Understanding Cells

Notebooks are made of **cells**. Each cell can be one of three types:

1. **Code cells:** Contain Python code that can be executed
2. **Markdown cells:** Contain formatted text for documentation
3. **Raw cells:** Unformatted text (rarely used)

### Essential Shortcuts

Learning these shortcuts will transform your notebook experience:

- **Run cell:** `Shift + Enter` (run and move to next)
- **Run cell in place:** `Ctrl + Enter` (stay on same cell)
- **Command mode:** `Esc` (blue cell border)
- **Edit mode:** `Enter` (green cell border)

In command mode:
- **Add cell above:** `A`
- **Add cell below:** `B`
- **Delete cell:** `DD` (press D twice)
- **Change to Markdown:** `M`
- **Change to Code:** `Y`
- **Save notebook:** `Ctrl + S` or `Cmd + S`

## Your First Research Notebook

Let's create a real research notebook analyzing historical data:

```python
# Cell 1: Setup and Imports
"""
Historical Weather Analysis
==========================
Analyzing temperature trends over time
Author: Your Name
Date: November 2024
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime

# Configure visualization settings
plt.style.use('seaborn-v0_8-darkgrid')
sns.set_palette("husl")

# Display settings for pandas
pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', 100)

print("Setup complete.")
```

```markdown
# Cell 2: (Change to Markdown with M key)
## Data Collection

We'll analyze temperature data to understand climate patterns. The data comes from NOAA's climate database, which provides historical temperature records for cities worldwide.

Our research questions:
1. How have temperatures changed over the past century?
2. Are seasonal patterns shifting?
3. Which regions show the most change?
```

```python
# Cell 3: Generate Sample Data (in practice, you'd load real data)
np.random.seed(42)  # For reproducibility

# Create synthetic historical temperature data
years = range(1920, 2024)
months = range(1, 13)

data = []
for year in years:
    # Add slight warming trend
    base_temp = 15 + (year - 1920) * 0.02
    
    for month in months:
        # Seasonal variation
        seasonal = 10 * np.sin((month - 1) * np.pi / 6)
        
        # Random variation
        random_var = np.random.normal(0, 2)
        
        temp = base_temp + seasonal + random_var
        
        data.append({
            'year': year,
            'month': month,
            'temperature': round(temp, 1),
            'date': pd.Timestamp(year, month, 1)
        })

# Convert to DataFrame
df = pd.DataFrame(data)
print(f"Created {len(df)} temperature records")
df.head()
```

```python
# Cell 4: Data Exploration
# Basic statistics
print("Dataset Overview")
print("=" * 50)
df.info()

print("\nTemperature Statistics")
print("=" * 50)
df['temperature'].describe()
```

```python
# Cell 5: Create New Features
# Add decade column for grouping
df['decade'] = (df['year'] // 10) * 10

# Add season
def get_season(month):
    if month in [12, 1, 2]:
        return 'Winter'
    elif month in [3, 4, 5]:
        return 'Spring'
    elif month in [6, 7, 8]:
        return 'Summer'
    else:
        return 'Fall'

df['season'] = df['month'].apply(get_season)

# Calculate yearly averages
yearly_avg = df.groupby('year')['temperature'].mean().reset_index()
yearly_avg.columns = ['year', 'avg_temperature']

print("Feature engineering complete")
df.head()
```

## Data Visualization in Notebooks

One of Jupyter's greatest strengths is inline visualization:

```python
# Cell 6: Visualization Setup
# Use this magic command to display plots inline
%matplotlib inline

# For interactive plots (optional)
# %matplotlib widget

# Set figure size defaults
plt.rcParams['figure.figsize'] = (12, 6)
```

```python
# Cell 7: Temperature Trends
fig, axes = plt.subplots(2, 2, figsize=(15, 10))

# 1. Overall trend
ax1 = axes[0, 0]
ax1.plot(yearly_avg['year'], yearly_avg['avg_temperature'], 
         linewidth=2, color='darkblue')
ax1.set_title('Average Temperature Over Time', fontsize=14, fontweight='bold')
ax1.set_xlabel('Year')
ax1.set_ylabel('Temperature (°C)')
ax1.grid(True, alpha=0.3)

# Add trend line
z = np.polyfit(yearly_avg['year'], yearly_avg['avg_temperature'], 1)
p = np.poly1d(z)
ax1.plot(yearly_avg['year'], p(yearly_avg['year']), 
         "r--", alpha=0.8, label=f'Trend: {z[0]:.4f}°C/year')
ax1.legend()

# 2. Seasonal patterns by decade
ax2 = axes[0, 1]
seasonal_avg = df.groupby(['decade', 'season'])['temperature'].mean().unstack()
seasonal_avg.plot(kind='bar', ax=ax2)
ax2.set_title('Seasonal Temperatures by Decade', fontsize=14, fontweight='bold')
ax2.set_xlabel('Decade')
ax2.set_ylabel('Temperature (°C)')
ax2.legend(title='Season')
ax2.set_xticklabels(ax2.get_xticklabels(), rotation=45)

# 3. Monthly distribution
ax3 = axes[1, 0]
monthly_temps = df.pivot_table(values='temperature', 
                                index='month', 
                                columns='decade', 
                                aggfunc='mean')
for decade in monthly_temps.columns[-3:]:  # Last 3 decades
    ax3.plot(monthly_temps.index, monthly_temps[decade], 
             marker='o', label=f'{decade}s')
ax3.set_title('Monthly Temperature Patterns', fontsize=14, fontweight='bold')
ax3.set_xlabel('Month')
ax3.set_ylabel('Temperature (°C)')
ax3.legend()
ax3.grid(True, alpha=0.3)

# 4. Temperature distribution
ax4 = axes[1, 1]
for decade in [1920, 1970, 2020]:
    decade_data = df[df['decade'] == decade]['temperature']
    ax4.hist(decade_data, alpha=0.5, label=f'{decade}s', bins=30)
ax4.set_title('Temperature Distribution Changes', fontsize=14, fontweight='bold')
ax4.set_xlabel('Temperature (°C)')
ax4.set_ylabel('Frequency')
ax4.legend()

plt.tight_layout()
plt.show()

# Statistical summary
print("\nTemperature increase per decade:")
decade_means = df.groupby('decade')['temperature'].mean()
for i in range(1, len(decade_means)):
    prev = decade_means.iloc[i-1]
    curr = decade_means.iloc[i]
    change = curr - prev
    print(f"{decade_means.index[i]}s: {change:+.2f}°C from previous decade")
```

## Interactive Analysis

Notebooks excel at exploratory data analysis where you investigate as you go:

```python
# Cell 8: Interactive Investigation
def analyze_year(year):
    """Analyze temperature patterns for a specific year."""
    year_data = df[df['year'] == year]
    
    fig, axes = plt.subplots(1, 2, figsize=(12, 4))
    
    # Monthly temperatures
    axes[0].plot(year_data['month'], year_data['temperature'], 
                 marker='o', linewidth=2, markersize=8)
    axes[0].set_title(f'Monthly Temperatures in {year}')
    axes[0].set_xlabel('Month')
    axes[0].set_ylabel('Temperature (°C)')
    axes[0].grid(True, alpha=0.3)
    axes[0].set_xticks(range(1, 13))
    
    # Comparison with decade average
    decade = (year // 10) * 10
    decade_avg = df[df['decade'] == decade].groupby('month')['temperature'].mean()
    
    axes[1].bar(year_data['month'], year_data['temperature'] - decade_avg.values, 
                color=['red' if x > 0 else 'blue' 
                       for x in year_data['temperature'] - decade_avg.values])
    axes[1].set_title(f'{year} vs {decade}s Average')
    axes[1].set_xlabel('Month')
    axes[1].set_ylabel('Temperature Difference (°C)')
    axes[1].axhline(y=0, color='black', linestyle='-', linewidth=0.5)
    axes[1].grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.show()
    
    # Statistics
    print(f"\nStatistics for {year}:")
    print(f"Average temperature: {year_data['temperature'].mean():.2f}°C")
    print(f"Hottest month: {year_data.loc[year_data['temperature'].idxmax(), 'month']}")
    print(f"Coldest month: {year_data.loc[year_data['temperature'].idxmin(), 'month']}")
    
# Try different years
analyze_year(1920)
analyze_year(2023)
```

## Sharing Your Research

### Exporting Notebooks

Notebooks can be exported to various formats:

```bash
# HTML (for sharing via web)
jupyter nbconvert --to html your_notebook.ipynb

# PDF (requires LaTeX)
jupyter nbconvert --to pdf your_notebook.ipynb

# Python script
jupyter nbconvert --to python your_notebook.ipynb

# Markdown
jupyter nbconvert --to markdown your_notebook.ipynb
```

### Best Practices for Research Notebooks

1. **Start with purpose:** Document your research questions
2. **Organize logically:** Setup → Data → Analysis → Results
3. **Document everything:** Use markdown cells liberally
4. **Name cells:** Give sections clear headings
5. **Clean before sharing:** Remove experimental/debug cells
6. **Version control:** Notebooks work with Git
7. **Reproducibility:** Include environment info

```python
# Cell to include at the start of shared notebooks
import sys
print(f"Python version: {sys.version}")
print(f"Pandas version: {pd.__version__}")
print(f"NumPy version: {np.__version__}")
print(f"Matplotlib version: {plt.matplotlib.__version__}")
```

## Review Questions

What is the keyboard shortcut to run a cell and move to the next one?

<Quiz>
- Ctrl + Enter
- Shift + Enter*
- Alt + Enter
- Enter
</Quiz>

Which cell type would you use to write documentation?

<Quiz>
- Code cell
- Markdown cell*
- Raw cell
- Text cell
</Quiz>

What does the %matplotlib inline magic command do?

<Quiz>
- Makes plots interactive
- Displays plots within the notebook*
- Saves plots to files
- Increases plot quality
</Quiz>

## Key Terms

- Jupyter Notebook
- Cell (Code, Markdown, Raw)
- Kernel
- Magic commands (%matplotlib, etc.)
- .ipynb file
- nbconvert
- Inline visualization

---

# Building Your Research Project: Understanding Your City

Now we'll put the pieces together by analyzing data from New York City's 311 service (non-emergency complaints such as noise, streetlights, and potholes). This project follows a typical research workflow.

If this seems big, we'll build it step by step.

## Why This Project Matters

Cities collect data about citizen complaints to understand problems and allocate resources. By analyzing this data, we can answer questions like:
- What bothers people most in NYC?
- Do different neighborhoods have different problems?
- How quickly does the city respond?
- Are there patterns we can learn from?

Urban planners, sociologists, and policy makers use this dataset. The steps here mirror common research practice.

## Project Setup: Creating Your Workspace

We need to organize our files properly. Good organization prevents confusion later.

### Step 1: Create Your Project Folder

Open your terminal or command prompt and type:

```bash
# Navigate to your Desktop (or wherever you want to work)
cd Desktop

# Create a new folder for our project
mkdir nyc_311_project

# Go into that folder
cd nyc_311_project

# Create subfolders to organize our work
mkdir data
mkdir notebooks
mkdir output
```

You've just created this structure:
```
nyc_311_project/
    data/       # Where we'll save data files
    notebooks/  # Where we'll write our analysis
    output/     # Where we'll save results
```

<Download files='nyc_311_raw.json'></Download>

<Info>
Working offline or on a restricted network? Download the sample 311 dataset above, move it into your `nyc_311_project/data/` folder as `311_raw.json`, and use this fallback cell in your notebook to load it if the API is unavailable.
</Info>

```python
# Fallback: load local sample if network/API is unavailable
import pandas as pd, json, os

local_path = os.path.join('data', '311_raw.json')
df_raw = None

if os.path.exists(local_path):
    try:
        df_raw = pd.read_json(local_path)
    except ValueError:
        # If not JSON-lines, try standard JSON array
        with open(local_path, 'r') as f:
            data = json.load(f)
        df_raw = pd.DataFrame(data)

if df_raw is not None:
    print(f"Loaded {len(df_raw)} rows from local sample")
```

### Step 2: Start Jupyter

Still in your terminal, type:
```bash
jupyter notebook
```

Your browser will open. Click "New" → "Python 3" to create a new notebook. Save it as `311_analysis.ipynb`.

## Part 1: Understanding the Data (Start Small!)

Before diving into thousands of records, let's understand what we're working with.

```python
# Cell 1: Import what we need
"""
NYC 311 Service Request Analysis
=================================
First, let's explore what New Yorkers complain about.

First, we import the tools we need:
- requests: to get data from the internet
- pandas: to work with data tables
- matplotlib: to make charts
"""

import requests
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime, timedelta

print("✓ Tools loaded successfully!")
print(f"Starting analysis at {datetime.now().strftime('%I:%M %p')}")
```

### What is an API endpoint?

The NYC 311 data lives at a web address (URL) called an "endpoint". Think of it like a data vending machine - you send a request, it sends back data.

```python
# Cell 2: Get a tiny sample first
"""
Let's start with just 10 records to understand the data structure.
It's like looking at a sample before buying the whole thing.
"""

# The URL where NYC stores 311 data
url = "https://data.cityofnewyork.us/resource/erm2-nwe9.json"

# Ask for just 10 records
params = {
    "$limit": 10  # Only get 10 records for now
}

print("Requesting 10 sample records...")
response = requests.get(url, params=params)

# Check if it worked
if response.status_code == 200:
    print("✓ Retrieved data")
    
    # Convert the JSON data to a Python list
    sample_data = response.json()
    
    # How many records did we get?
    print(f"Received {len(sample_data)} records")
    
    # Look at the first record's structure
    if sample_data:
        first_record = sample_data[0]
        print(f"\nThe data has these fields:")
        for key in list(first_record.keys())[:10]:  # Show first 10 fields
            print(f"  - {key}")
else:
    print(f"❌ Error: {response.status_code}")
```

### Understanding JSON Data

The data comes back as JSON, which Python converts to dictionaries and lists. Let's examine it:

```python
# Cell 3: Explore the data structure
"""
Each record is a dictionary with information about one complaint.
Let's see what a real complaint looks like.
"""

if sample_data:
    # Take the first complaint
    complaint = sample_data[0]
    
    print("=" * 50)
    print("SAMPLE COMPLAINT DETAILS")
    print("=" * 50)
    
    # Show the most interesting fields
    important_fields = [
        'complaint_type',    # What kind of complaint
        'descriptor',        # More details
        'borough',          # Which part of NYC
        'created_date',     # When reported
        'status',           # Current status
        'agency'            # Who handles it
    ]
    
    for field in important_fields:
        if field in complaint:
            value = complaint[field]
            print(f"{field:15} : {value}")
    
    print("\nLoaded data from NYC Open Data")
```

## Part 2: Getting More Data (Scaling Up)

Since we understand the structure, let's get more data to analyze:

```python
# Cell 4: Get data from the last week
"""
Let's get serious - fetch all complaints from the last 7 days.
We'll add date filtering to get recent data.
"""

def fetch_recent_complaints(days_back=7, limit=1000):
    """
    Get recent 311 complaints from NYC.
    
    Parameters:
    -----------
    days_back : int
        How many days of history to get
    limit : int
        Maximum number of records to fetch
        
    Returns:
    --------
    list : List of complaint records
    """
    
    print(f"Fetching complaints from the last {days_back} days...")
    
    # Calculate the date range
    end_date = datetime.now()
    start_date = end_date - timedelta(days=days_back)
    
    # Format dates for the API (YYYY-MM-DDTHH:MM:SS)
    start_str = start_date.strftime('%Y-%m-%dT00:00:00')
    end_str = end_date.strftime('%Y-%m-%dT23:59:59')
    
    # Build the query
    params = {
        '$limit': limit,
        '$where': f"created_date between '{start_str}' and '{end_str}'"
    }
    
    # Make the request
    try:
        response = requests.get(url, params=params)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Retrieved {len(data)} complaints")
            return data
        else:
            print(f"❌ Error: {response.status_code}")
            return []
            
    except Exception as e:
        print(f"❌ Something went wrong: {e}")
        return []

# Get the data
complaints = fetch_recent_complaints(days_back=7, limit=1000)
```

### Converting to a DataFrame

Pandas DataFrames are like Excel sheets in Python. They make data analysis much easier:

```python
# Cell 5: Convert to DataFrame
"""
A DataFrame is like a smart spreadsheet.
It can sort, filter, and calculate things automatically.
"""

# Convert our list of complaints to a DataFrame
df = pd.DataFrame(complaints)

# How big is our dataset?
print(f"Dataset shape: {df.shape[0]} rows, {df.shape[1]} columns")

# Show the first few rows (like preview in Excel)
print("\nFirst 5 complaints:")
df.head()
```

## Part 3: Cleaning the Data

Real data is messy. Let's clean it up:

```python
# Cell 6: Basic data cleaning
"""
Data cleaning is like organizing a messy desk:
- Remove duplicates
- Fix formats
- Handle missing values
"""

print("BEFORE CLEANING")
print(f"Total records: {len(df)}")
print(f"Columns: {df.shape[1]}")

# Keep only the columns we care about
columns_to_keep = [
    'unique_key',         # Unique ID for each complaint
    'created_date',       # When reported
    'closed_date',        # When resolved (if resolved)
    'agency',             # Which agency handles it
    'complaint_type',     # Type of complaint
    'descriptor',         # More details
    'borough',            # Location
    'status'              # Current status
]

# Some columns might not exist, so let's check
columns_that_exist = []
for col in columns_to_keep:
    if col in df.columns:
        columns_that_exist.append(col)
df_clean = df[columns_that_exist].copy()

print(f"\nAFTER SELECTING COLUMNS")
print(f"Columns kept: {len(df_clean.columns)}")

# Convert date strings to actual dates
if 'created_date' in df_clean.columns:
    df_clean['created_date'] = pd.to_datetime(df_clean['created_date'])
    print("✓ Converted created_date to datetime format")

if 'closed_date' in df_clean.columns:
    df_clean['closed_date'] = pd.to_datetime(df_clean['closed_date'])
    print("✓ Converted closed_date to datetime format")

<Info>
Pandas datetime basics: after converting with `pd.to_datetime(...)`, a Series gains the `.dt` accessor for datetime properties and methods. For example, `series.dt.day_name()` gives day of week, `series.dt.hour` gives the hour, and `(end - start).dt.total_seconds()` converts timedeltas to seconds.
</Info>

# Remove duplicates
before = len(df_clean)
df_clean = df_clean.drop_duplicates(subset='unique_key', keep='first')
after = len(df_clean)
print(f"✓ Removed {before - after} duplicate records")

print(f"\nCLEAN DATASET")
print(f"Final shape: {df_clean.shape[0]} rows, {df_clean.shape[1]} columns")
```

## Part 4: Basic Analysis (What Can We Learn?)

Next, let's look for patterns in the data.

```python
# Cell 7: Most common complaints
"""
What do New Yorkers complain about most?
Let's count complaint types and visualize them.
"""

# Count each complaint type
complaint_counts = df_clean['complaint_type'].value_counts()

# Show top 10 (simple listing)
print("TOP 10 COMPLAINT TYPES")
for i, (complaint, count) in enumerate(complaint_counts.head(10).items(), 1):
    print(f"{i:2}. {complaint}: {count}")

# Now make a proper chart
plt.figure(figsize=(10, 6))
complaint_counts.head(10).plot(kind='barh')  # Horizontal bar chart
plt.title('Top 10 NYC 311 Complaint Types', fontsize=14, fontweight='bold')
plt.xlabel('Number of Complaints')
plt.ylabel('Complaint Type')
plt.tight_layout()
plt.show()
```

```python
# Cell 8: Complaints by borough
"""
Do different parts of NYC have different problems?
Let's see how complaints vary by borough.
"""

if 'borough' in df_clean.columns:
    # Count by borough
    borough_counts = df_clean['borough'].value_counts()
    
    # Remove 'Unspecified' if it exists
    if 'Unspecified' in borough_counts.index:
        borough_counts = borough_counts.drop('Unspecified')
    
    print("COMPLAINTS BY BOROUGH")
    print("=" * 40)
    
    total = borough_counts.sum()
    for borough, count in borough_counts.items():
        percentage = (count / total) * 100
        print(f"{borough:15} {count:4} ({percentage:.1f}%)")
    
    # Visualize (bar chart for clarity)
    plt.figure(figsize=(8, 5))
    borough_counts.plot(kind='bar', color='steelblue', edgecolor='navy')
    plt.title('311 Complaints by Borough', fontsize=14, fontweight='bold')
    plt.xlabel('Borough')
    plt.ylabel('Number of Complaints')
    plt.tight_layout()
    plt.show()
else:
    print("Borough information not available in this dataset")
```

```python
# Cell 9: Response times
"""
How quickly does NYC respond to complaints?
Let's calculate the time from report to resolution.
"""

if 'closed_date' in df_clean.columns:
    # Filter for closed complaints only
    closed = df_clean[df_clean['closed_date'].notna()].copy()
    
    if len(closed) > 0:
        # Calculate response time in hours
        closed['response_hours'] = (
            closed['closed_date'] - closed['created_date']
        ).dt.total_seconds() / 3600
        
        # Remove negative times (data errors)
        closed = closed[closed['response_hours'] > 0]
        
        # Basic statistics
        print("RESPONSE TIME STATISTICS")
        print("=" * 40)
        print(f"Average: {closed['response_hours'].mean():.1f} hours")
        print(f"Median: {closed['response_hours'].median():.1f} hours")
        print(f"Fastest: {closed['response_hours'].min():.1f} hours")
        print(f"Slowest: {closed['response_hours'].max():.1f} hours")
        
        # Which complaints get resolved fastest?
        print("\nFASTEST RESOLVED COMPLAINT TYPES")
        print("=" * 40)
        
        # Group by complaint type and calculate median response time
        response_by_type = closed.groupby('complaint_type')['response_hours'].agg([
            'count',   # How many
            'median'   # Typical response time
        ])
        
        # Only include types with at least 5 complaints
        response_by_type = response_by_type[response_by_type['count'] >= 5]
        
        # Sort by median response time
        response_by_type = response_by_type.sort_values('median')
        
        # Show top 5 fastest
        for complaint_type, row in response_by_type.head(5).iterrows():
            print(f"{complaint_type:30} {row['median']:.1f} hours")
    else:
        print("No closed complaints found in this dataset")
else:
    print("Closed date information not available")
```

## Part 5: Time Patterns

When do people complain most?

```python
# Cell 10: Complaints by day of week
"""
Are there more complaints on certain days?
Maybe weekends are different from weekdays?
"""

# Extract day of week from created_date
df_clean['day_of_week'] = df_clean['created_date'].dt.day_name()
df_clean['hour'] = df_clean['created_date'].dt.hour

# Count by day
day_counts = df_clean['day_of_week'].value_counts()

# Put days in order (Monday to Sunday)
day_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
day_counts = day_counts.reindex(day_order)

<Info>
`reindex(day_order)` rearranges the bars into calendar order. If a day is missing, it will appear as NaN; use `.fillna(0)` to display 0 instead.
</Info>

# Visualize
plt.figure(figsize=(10, 5))
day_counts.plot(kind='bar', color='skyblue', edgecolor='navy')
plt.title('311 Complaints by Day of Week', fontsize=14, fontweight='bold')
plt.xlabel('Day of Week')
plt.ylabel('Number of Complaints')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# Any patterns?
busiest_day = day_counts.idxmax()
quietest_day = day_counts.idxmin()
print(f"Busiest day: {busiest_day} ({day_counts[busiest_day]} complaints)")
print(f"Quietest day: {quietest_day} ({day_counts[quietest_day]} complaints)")
```

```python
# Cell 11: Complaints by hour
"""
What time of day do people call 311?
This tells us about daily life patterns in NYC.
"""

hour_counts = df_clean['hour'].value_counts().sort_index()

plt.figure(figsize=(12, 5))
hour_counts.plot(kind='line', marker='o', linewidth=2, markersize=8)
plt.title('311 Complaints by Hour of Day', fontsize=14, fontweight='bold')
plt.xlabel('Hour (0 = Midnight, 12 = Noon, 23 = 11 PM)')
plt.ylabel('Number of Complaints')
plt.grid(True, alpha=0.3)
plt.xticks(range(0, 24))
plt.tight_layout()
plt.show()

peak_hour = hour_counts.idxmax()
quiet_hour = hour_counts.idxmin()
print(f"Peak complaint hour: {peak_hour}:00 ({hour_counts[peak_hour]} complaints)")
print(f"Quietest hour: {quiet_hour}:00 ({hour_counts[quiet_hour]} complaints)")
```

## Part 6: Creating Your Research Report

Let's create a professional summary of our findings:

```python
# Cell 12: Generate a summary report
"""
A good research report summarizes findings clearly.
Let's create one automatically!
"""

def generate_report(df, filename="311_analysis_report.txt"):
    """
    Generate a text report of our analysis.
    
    Parameters:
    -----------
    df : DataFrame
        The cleaned 311 data
    filename : str
        Where to save the report
    """
    
    # Prepare the report content
    report_lines = []
    report_lines.append("=" * 60)
    report_lines.append("NYC 311 SERVICE REQUEST ANALYSIS")
    report_lines.append("=" * 60)
    report_lines.append("")
    report_lines.append(f"Report Generated: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}")
    report_lines.append(f"Analysis Period: {df['created_date'].min()} to {df['created_date'].max()}")
    report_lines.append(f"Total Complaints Analyzed: {len(df):,}")
    report_lines.append("")
    
    report_lines.append("KEY FINDINGS")
    report_lines.append("-" * 40)
    
    # Top complaints
    report_lines.append("\n1. Most Common Complaints:")
    for i, (complaint, count) in enumerate(df['complaint_type'].value_counts().head(5).items(), 1):
        percentage = (count / len(df)) * 100
        report_lines.append(f"   {i}. {complaint}: {count} ({percentage:.1f}%)")
    
    # By borough
    if 'borough' in df.columns:
        report_lines.append("\n2. Complaints by Borough:")
        borough_counts = df['borough'].value_counts()
        for borough, count in borough_counts.head().items():
            if borough != 'Unspecified':
                percentage = (count / len(df)) * 100
                report_lines.append(f"   - {borough}: {count} ({percentage:.1f}%)")
    
    # Time patterns
    report_lines.append("\n3. Temporal Patterns:")
    busiest_day = df['day_of_week'].value_counts().idxmax()
    peak_hour = df['hour'].value_counts().idxmax()
    report_lines.append(f"   - Busiest Day: {busiest_day}")
    report_lines.append(f"   - Peak Hour: {peak_hour}:00")
    
    # Response times (if available)
    if 'closed_date' in df.columns:
        closed = df[df['closed_date'].notna()]
        if len(closed) > 0:
            response_times = (closed['closed_date'] - closed['created_date']).dt.total_seconds() / 3600
            response_times = response_times[response_times > 0]  # Remove negative values
            
            report_lines.append("\n4. Response Times:")
            report_lines.append(f"   - Average: {response_times.mean():.1f} hours")
            report_lines.append(f"   - Median: {response_times.median():.1f} hours")
    
    report_lines.append("")
    report_lines.append("=" * 60)
    report_lines.append("END OF REPORT")
    
    # Join all lines
    report_text = "\n".join(report_lines)
    
    # Display the report
    print(report_text)
    
    # Save to file
    with open(filename, 'w') as f:
        f.write(report_text)
    
    print(f"\n✓ Report saved to {filename}")
    
    return report_text

# Generate our report
report = generate_report(df_clean)
```

## Part 7: Saving Your Work

Let's save our cleaned data and visualizations:

```python
# Cell 13: Save everything
"""
Save your work as you go.
Let's save our data and create a summary visualization.
"""

# Save the cleaned data
output_file = "cleaned_311_data.csv"
df_clean.to_csv(output_file, index=False)
print(f"✓ Saved cleaned data to {output_file}")

# Create a summary visualization with subplots
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 1. Top complaint types
ax1 = axes[0, 0]
df_clean['complaint_type'].value_counts().head(5).plot(
    kind='barh', ax=ax1, color='steelblue'
)
ax1.set_title('Top 5 Complaint Types')
ax1.set_xlabel('Number of Complaints')

# 2. By borough
ax2 = axes[0, 1]
if 'borough' in df_clean.columns:
    borough_data = df_clean['borough'].value_counts()
    if 'Unspecified' in borough_data.index:
        borough_data = borough_data.drop('Unspecified')
    borough_data.plot(kind='bar', ax=ax2, color='coral')
    ax2.set_title('Complaints by Borough')
    ax2.set_ylabel('Number of Complaints')
    ax2.set_xticklabels(ax2.get_xticklabels(), rotation=45)

# 3. By day of week
ax3 = axes[1, 0]
day_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
day_data = df_clean['day_of_week'].value_counts().reindex(day_order)
day_data.plot(kind='line', ax=ax3, marker='o', color='green')
ax3.set_title('Complaints by Day of Week')
ax3.set_ylabel('Number of Complaints')
ax3.set_xticklabels(ax3.get_xticklabels(), rotation=45)
ax3.grid(True, alpha=0.3)

# 4. By hour
ax4 = axes[1, 1]
hour_data = df_clean['hour'].value_counts().sort_index()
hour_data.plot(kind='area', ax=ax4, color='purple', alpha=0.5)
ax4.set_title('Complaints by Hour of Day')
ax4.set_xlabel('Hour (0-23)')
ax4.set_ylabel('Number of Complaints')
ax4.grid(True, alpha=0.3)

plt.suptitle('NYC 311 Service Requests Analysis', fontsize=16, fontweight='bold')
plt.tight_layout()

# Save the figure
plt.savefig('311_analysis_summary.png', dpi=300, bbox_inches='tight')
print("✓ Saved visualization to 311_analysis_summary.png")

plt.show()
```

## Wrap-Up: Analysis Complete

You just:
1. **Collected** real data from NYC's API
2. **Cleaned** messy real-world data
3. **Analyzed** patterns and trends
4. **Visualized** your findings
5. **Reported** your results professionally

These are common steps in data analysis.

## What You Learned

Through this project, you've practiced:
- **API requests:** Getting data from the internet
- **Data cleaning:** Handling messy, real-world data
- **Pandas:** Working with DataFrames
- **Data analysis:** Finding patterns and insights
- **Visualization:** Creating clear, informative charts
- **Documentation:** Writing clear explanations

## Next Steps: Make It Your Own

Now try modifying the analysis:

1. **Different time period:** Change `days_back` to 30 for a month of data
2. **Different borough:** Filter for just Manhattan or Brooklyn
3. **Specific complaints:** Focus on noise complaints or heating issues
4. **New questions:** What agencies handle the most complaints? Are there seasonal patterns?

Example modification:
```python
# Focus on just noise complaints
noise_df = df_clean[df_clean['complaint_type'].str.contains('Noise', case=False, na=False)]
print(f"Found {len(noise_df)} noise-related complaints")

# When do noise complaints happen?
noise_df['hour'].value_counts().sort_index().plot(kind='bar')
plt.title('Noise Complaints by Hour')
plt.show()
```

## Troubleshooting Common Issues

### "No data returned"
- Check your internet connection
- The API might be temporarily down (try again in a few minutes)
- You might have a typo in the URL

### "KeyError" when accessing columns
- That column might not exist in your data
- Use `df.columns` to see what columns are available
- Some datasets might have different column names

### Charts look weird
- Make sure you have data to plot
- Check for NaN (missing) values
- Try a different chart type

### Memory errors with large datasets
- Reduce the `limit` parameter
- Work with fewer days of data
- Close other programs to free up memory

Note: Real data is often messy. Handling these issues is part of the learning process.

## Key Takeaways

- **Start small:** Test with a few records before processing thousands
- **Check your data:** Always look at what you actually received
- **Clean carefully:** Real data has missing values, duplicates, and errors
- **Visualize to understand:** Charts reveal patterns that numbers hide
- **Document everything:** Your future self will thank you

You can apply these techniques to other datasets.

# Sharing Your Research: Git and GitHub

Your analysis is complete, your visualizations are polished, and your insights are clear. But research isn't finished until it's shared. GitHub has become the standard platform for sharing computational research, and learning to use it effectively is as important as learning to code.

## Why Version Control Matters

Imagine you're writing a paper. You save versions like `draft1.docx`, `draft2_final.docx`, `draft2_final_REALLY_final.docx`. You email versions to collaborators, trying to merge their changes. It's chaos.

Git solves this for code (and any text files). It tracks every change, who made it, when, and why. You can experiment fearlessly, knowing you can always return to a working version.

## Understanding Git vs GitHub

- **Git:** Version control software on your computer
- **GitHub:** A website that hosts Git repositories online

Think of Git as track changes for your entire project, and GitHub as Google Drive for sharing it.

## Setting Up Git

First, configure Git with your information:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Creating a Repository

Let's share your 311 analysis project:

```bash
# Navigate to your project folder
cd nyc_311_project

# Initialize Git
git init

# Check what files Git sees
git status
```

## The .gitignore File

Some files shouldn't be tracked (large data files, passwords, temporary files). Create a `.gitignore` file:

```
# .gitignore
# Data files (too large for GitHub)
data/
*.csv
*.xlsx

# Jupyter
.ipynb_checkpoints/
*/.ipynb_checkpoints/*

# Python
__pycache__/
*.py[cod]
*$py.class
*.so

# Virtual environments
venv/
env/
ENV/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Credentials (NEVER commit these!)
*.env
config.ini
secrets.json
api_keys.txt
```

## Your First Commit

```bash
# Stage all files (except those in .gitignore)
git add .

# Commit with a descriptive message
git commit -m "Initial commit: NYC 311 analysis project"

# See your commit history
git log --oneline
```

## Creating a README

The README.md file is your project's front page. It should explain what your project does, how to use it, and what others need to know:

```markdown
# NYC 311 Service Request Analysis

## Overview
This project analyzes patterns in New York City's 311 service requests to understand urban complaints, response times, and temporal patterns.

## Research Questions
1. What are the most common types of urban complaints?
2. How do response times vary by complaint type and borough?
3. Are there temporal patterns in complaint frequency?
4. Which city agencies handle which types of problems?

## Data Source
Data is collected from NYC Open Data's 311 Service Requests API:
- Dataset: [311 Service Requests from 2010 to Present](https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9)
- API Documentation: [Socrata Open Data API](https://dev.socrata.com/)

## Project Structure

nyc_311_analysis/
│
├── notebooks/          # Jupyter notebooks
│   └── 311_analysis.ipynb
│
├── scripts/           # Python scripts
│   ├── collect_data.py
│   └── analyze.py
│
├── data/             # Data files (not tracked in Git)
│   ├── 311_raw.csv
│   └── 311_clean.csv
│
├── output/           # Analysis results
│   ├── 311_report.txt
│   └── figures/
│
├── requirements.txt  # Python dependencies
└── README.md        # This file


## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- pip package manager


### Installation
1. Clone this repository:
   git clone https://github.com/yourusername/nyc_311_project.git
   cd nyc_311_project


2. Install required packages:
   pip install -r requirements.txt


3. Run the analysis:

   jupyter lab notebooks/311_analysis.ipynb


## Key Findings

### Most Common Complaints
1. Noise - Residential: 2,341 requests
2. Heat/Hot Water: 1,892 requests
3. Illegal Parking: 1,654 requests

### Resolution Times
- Median resolution time: 48.3 hours
- Fastest resolved: Noise complaints (median: 3.2 hours)
- Slowest resolved: Street conditions (median: 287.4 hours)

### Temporal Patterns
- Peak complaint hour: 10 AM
- Peak complaint day: Monday
- Lowest volume: Sunday 3-5 AM

## Future Work
- Predictive modeling for resolution times
- Sentiment analysis of complaint descriptions
- Geographic clustering analysis
- Seasonal pattern investigation

## Contributors
- Your Name (@yourgithubusername)

## License
This project is licensed under the MIT License - see LICENSE file for details.

## Acknowledgments
- NYC Open Data for providing the data
- Course instructors for guidance
- Python data science community for excellent libraries

## Contact
For questions or collaboration opportunities, please open an issue or contact [your.email@example.com]
```

## Pushing to GitHub

1. Create a new repository on GitHub.com (WITHOUT initializing with README)
2. Connect your local repository to GitHub:

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/yourusername/nyc_311_analysis.git

# Push your code
git push -u origin main
```

## Best Practices for Research Repositories

### 1. Reproducibility File

Create `REPRODUCIBILITY.md`:

```markdown
# Reproducibility Information

## Environment
- Operating System: macOS 13.0
- Python Version: 3.10.5
- Analysis Date: November 2024

## Package Versions
See requirements.txt for exact versions used.

To recreate the exact environment:

    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt


## Data Collection
Data was collected on 2024-11-15 using the NYC Open Data API.
To recollect similar data, run:

    python scripts/collect_data.py --days 7 --limit 2000


## Random Seeds
All random operations use seed 42 for reproducibility:

    np.random.seed(42)

```

### 2. Citation File

Create `CITATION.cff`:

```yaml
cff-version: 1.2.0
title: "NYC 311 Service Request Analysis"
authors:
  - family-names: "Your Last Name"
    given-names: "Your First Name"
    orcid: "https://orcid.org/0000-0000-0000-0000"
date-released: 2024-11-15
url: "https://github.com/yourusername/nyc_311_analysis"
```

## Review Questions

What is the purpose of a .gitignore file?

<Quiz>
- To ignore Git commands
- To specify files that shouldn't be tracked by Git*
- To hide files from GitHub
- To delete temporary files
</Quiz>

What should always be included in a research repository?

<Quiz>
- All raw data files
- README with documentation*
- Your API keys
- Temporary files
</Quiz>

## Final Thoughts

You've completed a journey from Python basics to professional research computing. You can now:
- Write Python code to solve real problems
- Collect and analyze data from APIs
- Create publication-quality visualizations
- Share reproducible research on GitHub

The tools and techniques you've learned form the foundation of modern computational research. Whether you're analyzing historical texts, processing survey data, or investigating urban patterns, you now have the skills to turn questions into insights through code.

Remember: programming is a craft that improves with practice. Keep building, keep sharing, and keep learning. The Python community is vast and welcoming - you're now part of it.

Good luck with your research.


# Appendix: The New Workflow - Programming with AI Assistants

You've finished the core material. You can write code, debug programs, and build small projects. The goal is to think computationally and solve problems with code.

Let's discuss a major shift happening in programming: the rise of AI assistants like ChatGPT, Claude, and GitHub Copilot. These tools are changing how people write code, but they're not replacing the need to understand programming. Instead, they're creating a new workflow where programmers become directors rather than typists.

## What Are AI Programming Assistants?

AI assistants are like having a knowledgeable (but sometimes inconsistent) programming tutor available 24/7. They can:
- Explain code and concepts in plain English
- Generate code from your descriptions
- Help debug errors
- Suggest improvements to existing code
- Answer programming questions

But here's the key issue: **they make confident mistakes**. They'll generate code that looks good but has subtle bugs. They'll explain concepts convincingly but get details wrong. They hallucinate functions that don't exist. This is why the skills you've learned are essential: you need to catch these mistakes.

## The Calculator Analogy

Think about calculators and mathematics. When calculators became common, math education didn't disappear. Instead, it evolved:
- Students still learn arithmetic by hand first
- Only after mastering basics do they use calculators
- Understanding math lets you catch calculator errors
- Calculators handle computation; humans handle reasoning

AI assistants are the same for programming:
- You need to understand code to use them effectively
- They handle syntax; you handle logic and design
- You must verify their output is correct
- They're tools that amplify your abilities, not replace them

## When NOT to Use AI Assistants (Yet)

If you're still building fundamental skills, avoid AI code generation for the first 3-6 months. Use AI only for:
- **Explaining concepts:** "What does this error mean?"
- **Understanding code:** "Can you explain what this function does?"
- **Learning syntax:** "Show me the syntax for a Python dictionary"
- **Debugging help:** "Why might this code produce this error?"

Don't use AI to:
- Write your homework or exercises from scratch
- Complete coding challenges meant to build your skills
- Generate solutions without understanding them
- Skip the struggle of learning (that struggle builds understanding!)

## The New Workflow: Human as Director

Once you have solid fundamentals, here's how experienced programmers work with AI:

### 1. Decompose the Problem (Human Job)
Break big tasks into small, specific pieces. This is the most important skill.

**Bad decomposition:** "Build me a data analysis program"

**Good decomposition:** 
- "Write a function that reads a CSV file into a pandas DataFrame"
- "Add error handling if the file doesn't exist"
- "Create a function to calculate summary statistics"
- "Generate a bar chart of the top 10 categories"

### 2. Write Clear Prompts (Human Job)
Be specific about what you want:

**Weak prompt:** "Process my data"

**Strong prompt:** "Write a Python function that takes a pandas DataFrame with columns 'date' and 'sales', groups by month, calculates the mean sales per month, and returns a new DataFrame with columns 'month' and 'average_sales'. Include docstring and type hints."

### 3. Review Generated Code (Critical Human Job)
This is where your learning pays off. Check for:
- **Logic errors:** Does the code actually solve your problem?
- **Edge cases:** What happens with empty data? Missing values?
- **Efficiency:** Is there a better approach?
- **Security:** Any risky operations?
- **Style:** Is it readable and maintainable?

### 4. Test and Iterate (Human Job)
- Run the code with sample data
- Test edge cases
- When it breaks (it will), understand why
- Refine your prompts based on what went wrong

## A Practical Example

Let's see this workflow in action. Imagine you need to analyze survey responses.

### Step 1: Decompose
"I need to:
1. Load survey responses from a CSV
2. Clean the data (remove duplicates, handle missing values)
3. Calculate satisfaction scores by age group
4. Create a visualization"

### Step 2: First Prompt to AI
"Write a Python function that loads a CSV file containing survey responses with columns 'respondent_id', 'age', 'satisfaction_rating' (1-5 scale). The function should return a pandas DataFrame and handle the case where the file doesn't exist."

### Step 3: Review AI's Response
The AI might generate:
```python
import pandas as pd

def load_survey_data(filename):
    """Load survey responses from CSV file."""
    try:
        df = pd.read_csv(filename)
        return df
    except FileNotFoundError:
        print(f"Error: File {filename} not found")
        return None
```

Your review:
- ✅ Basic structure is correct
- ✅ Handles FileNotFoundError
- ❌ No validation that required columns exist
- ❌ Doesn't specify data types
- ❌ Returns None (harder to work with than empty DataFrame)

### Step 4: Refine
"Good start. Please modify to:
1. Verify the required columns exist
2. Convert satisfaction_rating to numeric, coercing errors
3. Return an empty DataFrame instead of None if file not found
4. Add parameter type hints"

### Step 5: Test
Create a small test CSV and verify:
- Does it load correctly?
- What happens with missing columns?
- What about non-numeric satisfaction ratings?

## Common AI Mistakes to Watch For

### 1. Hallucinated Functions
AI often invents functions that don't exist:
```python
# AI might generate:
df.remove_outliers()  # This method doesn't exist!
```

### 2. Outdated Syntax
AI training data includes old code:
```python
# AI might use Python 2 syntax:
print "Hello"  # Missing parentheses for Python 3
```

### 3. Incorrect Logic
Subtle bugs that look correct:
```python
# AI generates code to find average:
average = sum(numbers) / len(numbers) - 1  # Wrong! Shouldn't subtract 1
```

### 4. Poor Error Handling
```python
# AI might generate:
try:
    risky_operation()
except:  # Bad! Catches all exceptions including KeyboardInterrupt
    pass  # Bad! Silently ignores errors
```

### 5. Inefficient Approaches
```python
# AI might generate a loop where vectorization would be better:
results = []
for i in range(len(df)):
    results.append(df.iloc[i]['column'] * 2)
    
# Better:
results = df['column'] * 2
```

## Building Your AI Collaboration Skills

### Start with Explanation, Not Generation
Ask AI to explain existing code before asking it to write new code:
- "What does this function do?"
- "Why might this code produce this error?"
- "What's the difference between these two approaches?"

### Use AI for Boring Tasks
AI excels at repetitive, well-defined tasks:
- Writing docstrings for your functions
- Creating test cases
- Converting between data formats
- Generating boilerplate code

### Always Understand What You Use
Never copy-paste AI code without understanding it:
1. Read through the code line by line
2. Run it with print statements to see intermediate values
3. Modify it slightly to ensure you grasp how it works
4. Write comments explaining the logic to yourself

### Learn from AI's Mistakes
When AI generates incorrect code, it's a learning opportunity:
- Why is it wrong?
- What concept did the AI misunderstand?
- How would you fix it?
- What would be a better prompt to avoid this mistake?

## The Skills That Matter Most

As AI tools improve, certain human skills become more valuable:

### 1. Problem Decomposition
Breaking complex problems into manageable pieces. AI can't do this for you - it requires understanding the problem domain.

### 2. Code Review and Quality Assurance
Spotting bugs, security issues, and inefficiencies. This requires experience and deep understanding.

### 3. System Design
Deciding how components fit together, what architecture to use, how to handle scale. AI can implement pieces but can't design systems.

### 4. Domain Knowledge
Understanding the problem you're solving. A biologist using Python needs biology knowledge more than Python expertise.

### 5. Debugging and Troubleshooting
When things go wrong (and they will), you need to understand the code to fix it.

## A Final Thought: You're Not Being Replaced

The printing press didn't eliminate writers - it created more demand for writing. Calculators didn't eliminate mathematicians - they freed them to tackle harder problems. AI assistants won't eliminate programmers - they'll amplify what programmers can accomplish.

The fundamentals you've learned in this course aren't becoming obsolete. They're becoming prerequisites. You now have the knowledge to:
- Direct AI assistants effectively
- Catch their mistakes
- Understand what they generate
- Know when to trust them and when to be skeptical
- Use them as tools rather than crutches

Programming is becoming more about problem-solving and less about syntax memorization. The future programmer directs AI assistants instead of typing every line of code. You've learned to read the code - now you can guide the process.

## Your Next Steps

1. **Solidify fundamentals first:** Complete projects without AI assistance for at least 3 months
2. **Start with AI explanation:** Use AI to explain code before using it to generate code
3. **Practice decomposition:** Break every problem into tiny, specific pieces
4. **Build review skills:** Generate code with AI, then find its bugs without running it
5. **Stay curious:** AI is a tool for learning, not a replacement for understanding

Remember: The goal isn't to use AI to avoid learning programming. The goal is to learn programming so well that you can use AI to accomplish things you never could alone.

You now have a solid foundation to work with both traditional programming and AI-assisted tools.

## Key Terms

- AI Assistant / LLM (Large Language Model)
- Prompt engineering
- Code review
- Hallucination (AI generating false information)
- Problem decomposition
- Human-in-the-loop
