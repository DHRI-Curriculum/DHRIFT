---
title: Intro to Javascript
description: This is a basic introduction to JavaScript, which is the programming language of the web. The class is designed for anyone interested in developing a website, or creating an interactive data visualization. By the end of this course, you will be able to read JavaScript you find online and adapt it to your needs. You will also have an opportunity to work with common JavaScript libraries/tools and enhance your own research practices.
cover_image: /images/workshop/img2.jpg
readings:
    - Want to learn programming, but not convinced that the Python language is the right language? Check out [Five Reasons Why Learning Python Is The Best Decision](https://medium.com/datadriveninvestor/)
    - "Some concrete ideas for how to use Python: [What Can I Do With Python?](https://realpython.com/what-can-i-do-with-python/)"
goals:
    - description: 'In this workshop, you will learn to:'
    - Become familiar with core programming concepts, including variables, loops, and conditionals.
    - Distinguish among five core data types—integers, floats, strings, booleans, and lists.
    - Engage with error output and use the internet and documentation to independently research language features.
    - Learn how to find and import code from external sources to solve more complex problems.
    - Run Python programs, both by interacting directly with the interpreter and by preparing and running scripts.
    - Understand what Python is and, in general terms, what it can do.

---

# Introduction

Hello! This is *The JavaScripting Masters Student*, a course designed particulary for graduate students who are not pursuing a degree in computer science. The course is designed to help you learn the fundamentals of programming and to help you get started on your own projects. The course is __not__ intended to be a comprehensive introduction to computer science concepts, but rather a step-by-step path to making something useful.

## Learning Outcomes

By the end of the semester, successful students will

- Gain capacity to read and write JavaScript at a beginner level.
- Understand the core programming concepts, including variables, loops, and conditionals.
- Distinguish among five core data types—integers, floats, strings, booleans, and arrays.
- Engage with error output and use the internet and documentation to independently research language features.
- Be familiar with JS libraries like Leaflet and JQuery.
- Create a small project of their own that can live on the web!
- Be ready for further classes that require JavaScript knowledge.

<!-- ## What am I doing here? Why Learn JavaScript?

There are two ways of meaning that question:
MORE

 
1. JavaScript is a good first language to learn.

"JavaScript is the language of the web". You will have heard that, perhaps. MORE

2. Learning JavaScript means learning an adaptable language that can be used to bring your work to people on the web.
MORE -->

## The Process of Learning a Language

There are many ways to learn a language. In the case of human languages, the most effective is said to be full immersion. It can be very motivating to be put in a situation where learning is aligned well with a concrete goal, in this case communicating with the people around you.

In the same way, learning a programming language benefits from having a specific aim, typically a project built in that language. The problem, though, often ends up being that new learners do not know what is possible to do with a language, so it's hard to develop a clear and realistic goal. In order to help learners along their path, this course is designed as a guided process of project-oriented learning. At the end of this text, you will have finished a small project that you can put on the web, therefore getting some idea of what you can do with the language.

## Cool, Inspiring Libraries

What's possible with JavaScript? You can use it to create a map, a data visualization, a website, or any number of things. Below are a few examples of powerful tools that you can use to create your own projects. We will be exploring one of these, Leaflet, later in the course.

- [Chart.js](https://www.chartjs.org/docs/latest/)
- [D3.js](https://d3js.org/)
- [p5.js](https://p5js.org/)
- [leaflet.js](https://leafletjs.com/)

## JavaSCRIPT, not Java


A fundamental part of learning how to program is becoming familiar with the meanings of specialist words in common use. The first thing that trips up a lot of beginners is the name of the programming language, "JavaScript". Often new learners will see references to "Java" and "JavaScript" and think that they are referring to the same language. They are not! But you would be forgiven for thinking so. The confusion could very nearly be called intentional! A bit of history:

Java is a programming language that became popular in the 1990s. It was used primarily for desktop applications, but as the web became a bigger deal, Java was positioned as the language of choice for web development. The creator of JavaScript, Brendan Eich, wanted to hitch a ride on the success of Java and associate his new language with the more established one. Hence, "JavaScript". Other than the name, there is no association between the two.

## Acknowledgements

This material is modeled off of [The JavaScripting English Major](https://the-javascripting-english-major.org/v1/contents) by Moacir P. de Sá Pereira. Its pragmatic approach to teaching programming inspired our own, particularly in the project-oriented design of the course. Similarly [Eloquent JavaScript](https://eloquentjavascript.net/) by Marijn Haverbeke demonstrated to us a step-by-step accretive method of learning that feels fitting for an audience of non-CS majors. We were also influenced by [Learn Python the Hard Way](https://learnpythonthehardway.org/book/) by Zed A. Shaw, in his emphasis on engaging the reader in actual typing and not just memorizing syntax. 

# Getting Started with JavaScript

Let's begin our journey with the JavaScript language. As is tradition, we're first going to explore some ways to print a "Hello World!" message as output to the screen. In doing so, you will be introduced to the basics of working with the JavaScript console. As will become clearer, you can think of the console as an interactive way to run JavaScript commands in your browser. 

To become further acquainted with the console, we will end the lesson by exploring some fundamental data types and variables in JavaScript, and ways you can use these capabilities to calculate and display a variety of conditions.

## Hello, World!

### Alerts

One of the most basic ways to output a message is to use the `alert()` method. This method will display a message to the user visiting your web page, and then wait for the user to click on the "OK" button.

To create an alert, you can write the following line of code...

```JavaScript
alert("Hello, World!");
```

...into the box below, where you can see an instance of the interactive console that we have provided for you. If you click your mouse after the `>` symbol (called the _prompt_), you can begin writing your code, and then hit the <kbd>Enter</kbd> key to run it.

<JSTerminal />

You should now see a pop-up box that displays your message. __Note__: If you do _not_ see a pop-up message, you may need to disable your pop-up blocker.

As you can see, the alert dialog box takes the focus and forces the user to read the specified message on the current webpage. This being the case, it is wise to avoid overusing this method because it stops the user from accessing other parts of the webpage until the box is closed. It is best used as a kind of warning message. For instance, you may have seen developers use it to notify the user that they are heading to a new external website after clicking a link.

You'll notice that our message is enclosed in `()` (parentheses) as well as `""` double quotation marks. You'll understand why as we continue: this indicates part of the _syntax_, or the rules that define the structure of the JavaScript language.

You will also notice that there is a `;` (semicolon) after the `alert` command. Not including the semicolon won't throw an error, but it is good practice to include after each command, or statement--after each single instruction given to the console. You'll see more examples of this (and learn when _not_ to include semicolons) as we progress. For now, just make sure to __include the semicolon__ at the end of each line of code.

### Using Your Browser's Console

While we have provided a console for you embedded into this web page, you can also use a console built into your browser's developer tools to run commands. Most modern browsers allow you access to a developer console where you can work with JavaScript and read or manipulate data on a page. 

To open the developer console, you can use these methods:

__Chrome:__
- Command + Option + i (Mac)
- Ctrl + Shift + i (Windows/Linux).
- Open the Chrome settings menu in the top-right corner of your browser window and select `More Tools` > `Developer Tools`

__Firefox:__
- Command + Option + i (Mac)
- Ctrl + Shift + i (Windows/Linux)

__Safari:__
- Develop menu in Safari’s Advanced preferences
- Right-click on any page element and select Inspect Element
- Command + Option + i

__Opera:__
- Command + Option + i (Mac)
- Ctrl + Shift + i (Windows/Linux)

Using these shortcuts should open a console window that you can use to run commands. After the `>` prompt, create another new `alert` command and hit the <kbd>Enter</kbd> key to run it. You should again see a pop-up box that displays your message. Practice opening your console with these commands to get the feel of it into your fingers.

We should note here that the alert's system dialog box is not related to the design of the webpage currently being shown in the browser. Its appearance depends solely on your current operating system and browser (rather than on the HTML code of the current page). You will learn how to manipulate a webpage's content and appearance directly with JavaScript, HTML, and CSS in later lessons.  

### The console.log() Function

Let's use another technique to display "Hello, World!" This time, we will use the `console.log()` function, which writes a message to be output by the console. In your browser's developer console, write the following line of code:

```JavaScript
console.log("Hello, World!");
```

You should now see the message "Hello, World!" printed out for you in the console itself.

The `console.log()` function is a useful tool for testing and debugging your code. As you continue learning JavaScript and begin building your own webpages, you will find it an effective way to display and understand the results of your programs.

__Note__: If you also receive a message of `undefined` in the console, don't worry! You will understand why this is happening as you continue learning more about how functions work in JavaScript.

For now, let's continue working with the JavaScript console by exploring the way the language deals with data and discrete bits of information.

## Data Types

__Data types__ form the atomic elements of JavaScript programs and are used to store and manipulate data. The basic data types in JavaScript are: __number__, __string__, __boolean__, __array__, and __object__. For now, let's just discuss the first three of these types and how you can use them.

### Numbers

Values of the `number` type are, as you might have guessed, numbers. Try typing the following numbers into the console, hitting the <kbd>Enter</kbd> key after each one:

```JavaScript
> 9;
> 3.8;
> -1.2;
```
<JSTerminal />

We can also perform various mathematical calculations on these numbers. For example, try running each of the following mathematical operations in the console:

```JavaScript
> 5 + 5
> 5 - 5
> 5 / 5
> 5 * 5
> 5 % 6
```

<JSTerminal />

JavaScript calculates the result of these operations for you. Whenever you can use a number, you can also create a mathematical expression using typical algebraic operators. The last example uses the <kbd>%</kbd> (remainder) symbol, which evaluates the remainder of a division.

### Strings

As a data type, a __string__ is simply a series of alphanumeric characters, meaning it can combine both numbers and text into a phrase. Strings are mostly used for displaying or recognizing a series of text in your programs. You have actually already encountered a string--in the `console.log("Hello, World!");` command you ran above, everything enclosed in the double-quotation marks (namely, `Hello, World!`) is considered a string.

Just like with numbers, you can simply type a string (for instance, `"Hello, World!"`) into the console and it will repeat your string back to you. It is important to note that were you to add a number to the string, e.g., `"Hello, World in the Year 3030!";`, the entire phrase would still be considered a string and _not_ a number. This is because you have enclosed it within double-quotation marks, which always indicates a `string` type.

It's worth noting that you can use both single- <kbd>'</kbd> and double-quotation <kbd>"</kbd> marks to identify a string. It is important, however, to keep your use consistent. For instance, if you were to write `"Hello, World!'`, beginning the phrase with double-quotes and ending with a single-quote, you will receive a `SyntaxError` (we'll cover how to deal with errors in a bit more detail later). It is best practice to primarily use double-quotes, as this allows you to use single-quotes _within_ a phrase without the console throwing errors. For example, `"It is Jill's birthday."` is a perfectly valid expression, while `'It is Jill's birthday.'` is not.

__Note__: If you need to use double-quotes inside of a string, there are two ways you can do this. You can, conversely, simply use single-quotation marks to surround a phrase, e.g., `'I wonder what "truth" means today?'`, or you can use a <kbd>\</kbd> (backslash) to precede a double-quotation mark within enclosed double-quotation marks, e.g. `"I wonder what \"truth\" means today?"`. 

Strings can also utilize the `+` operator to __concatenate__, or join, separate string phrases together. For example, `"Hello, " + "World!"` will return `"Hello, World!"`. Try it out in the console below.

<JSTerminal />

## Comparisons

In the table below, you can see more of the various operators available to you as a JS programmer when working with data types. Many of the most useful operators deal in terms of comparison: seeing if one value is equal to, greater than, or lesser than another value. Each of these comparisons will evaluate to either `true` or `false`. It is important to understand how these operators work, so try inputting some of the examples you might be unclear with into the JS console to check out the results for yourself. In the `"5" == "5"` example below, each 5 is actually considered a _string_, rather than a number, because they are enclosed in quotation marks.

<table>
    <caption><strong>Comparison Operators</strong></caption>
    <tr>
        <th>Operator</th>
        <th>Meaning</th>
        <th>Example</th>
        <th>Evaluation</th>
    </tr>
    <tr>
        <th rowspan = "2"> < </th>
        <td> less than? </td>
        <td> 5 < 5 </td>
        <td>false</td>
    </tr>
   <tr>
        <td> less than? </td>
        <td> 5 < 6 </td>
        <td>true</td>
    </tr>
    <tr>
        <th rowspan = "2"> > </th>
        <td> greater than? </td>
        <td> 5 > 5 </td>
        <td>false</td>
    </tr>
    <tr>
        <td> greater than? </td>
        <td> 5 > 4 </td>
        <td>true</td>
    </tr>
    <tr>
        <th rowspan = "2"><=</th>
        <td> less than or equal to? </td>
        <td> 5 <= 5 </td>
        <td>true</td>
    </tr>
    <tr>
        <td> less than or equal to? </td>
        <td> 5 <= 4 </td>
        <td>false</td>
    </tr>
    <tr>
        <th rowspan = "2">>=</th>
        <td> greater than or equal to? </td>
        <td> 5 >= 5 </td>
        <td>true</td>
    </tr>
    <tr>
        <td> greater than or equal to? </td>
        <td> 5 >= 6 </td>
        <td>false</td>
    </tr>
    <tr>
        <th rowspan = "3">==</th>
        <td> equal to? </td>
        <td> 5 == 5 </td>
        <td>true</td>
    </tr>
    <tr>
        <td> equal to? </td>
        <td> 5 == 4 </td>
        <td>false</td>
    </tr>
    <tr>
        <td> equal to? </td>
        <td> 5 == "5" </td>
        <td>true</td>
    </tr>
    <tr>
        <th rowspan = "3">!=</th>
        <td> not equal to? </td>
        <td> 5 != 5 </td>
        <td>false</td>
    </tr>
    <tr>
        <td> not equal to? </td>
        <td> 5 != 4 </td>
        <td>true</td>
    </tr>
    <tr>
        <td> not equal to? </td>
        <td> 5 != "5" </td>
        <td>false</td>
    </tr>
    <tr>
        <th rowspan = "2">===</th>
        <td> "strict" equal to (includes type)? </td>
        <td> 5 === "5" </td>
        <td>false</td>
    </tr>
    <tr>
        <td> "strict equal" to (includes type)? </td>
        <td> 5 === 5 </td>
        <td>true</td>
    </tr>
    <tr>
        <th rowspan = "2">!==</th>
        <td> "strict" not equal to (includes type)? </td>
        <td> 5 !== "5" </td>
        <td>true</td>
    </tr>
    <tr>
        <td> "strict" not equal to (includes type)? </td>
        <td> 5 !== 5 </td>
        <td>false</td>
    </tr>
</table>
<br />

<JSTerminal />

While nearly all of these operators are shared amongst the majority of modern programming languages, the `===` (triple equals) is unique to JavaScript. The distinctions between `==` (double equals) and `===` (triple equals) are important. The double equals `==` operator is used to compare _only_ the value of two variables, while the "strict" triple equals `===` operator is used to compare the value _and_ type of two variables. The strict operator will only return true if the two variables are _exactly_ the same, both in value and in type (e.g., number or string). So, while both `5 === 5` and `"5" === "5"` will return true because they are the same value and type, `5 === "5"` will return false because the latter is testing a number against a string. Also note the difference between the double equals `==` and triple equals `===`, which test for equality, and the `!=` and `!==` operators, which test for _inequality_.

We'll continue to work with comparison/equality operators throughout the course, so don't worry if they're still a bit unclear. Additionally, we have for now purposefully left out the `=` (single equals) operator, as it has a different function than evaluating equality. We'll cover the single equals operator later in this lesson.


### Boolean

Unlike some real-world scenarios, determining what is true and false in JavaScript is refreshingly straightforward. __Booleans__ are data types that are either firmly `true` or `false`. In utilizing the comparison operators from the table earlier, you have already discovered how the console determines truth and falsity. For instance, typing `9 > 5` evaluates to `true`, whereas `5 > 9` evaluates to `false`. Similarly, `5 >= 5` as well as `5 <= 5` both resolve as `true`. If you simply type `true` or `false` into the console, the console recognizes it as a data type and will repeat it back to you.

Booleans may seem simple, but very often in programming you will need a data type that can only have one of two values, akin to a "yes" or "no" or "on" or "off" determination. We will work more with booleans as we progress through the course.

As a final step for this lesson, let's make using data types a bit more interesting by introducing __variables__.

## Variables

Now that we have explored a number of data types and how to use them, let's explore how to create variables in JavaScript to utilize data types more effectively.

You can think of __variables__ as kinds of containers for data. They are named and can be assigned a value based on whatever data type is appropriate. To create a variable, type the `var` keyword along with the name of the variable you want to create, followed by a single equal sign (`=`) and then the value of the variable. For example, `var myMessage = "Hello, World!";` will create a new variable called `myMessage` and assign it the value `"Hello, World!"`. Creating a variable is called __declaring__ or __defining__ it, and attributing a value to it is called __assigning__ it.

As mentioned earlier, this drastically sets apart the single equals `=` operator from the double equals `==` operator. The single equals operator is used to __assign__ a value to a variable, while the double equals operator (as well as the triple equals) is used to __test__ if two values or variables are equal to each other (without modifying either value).

In the example below, we have replicated our `Hello, World!` message, only this time using a variable. You can see that instead of simply logging the string `"Hello, World!"` to the console, we have assigned the string to a variable called `myMessage` and then logged the value of `myMessage` to the console.

```JavaScript
    var myMessage = "Hello, World!";
    console.log(myMessage);
```

Understanding and working effectively with variables is probably the most important part of programming. They allow you to store data in memory, and then use that data to perform all kinds of operations upon it. Take a look at the example below:

```JavaScript
var a = 1;
var b = 2;
var c = a + b;
```

You'll notice that the variable `c` is assigned the value of `a + b`. In other words, here we are assigning the value of a variable to that of the addition of two other variables. What do you think the result would be if we were to `console.log(c);`? 

Now let's make something ever so slightly more interesting. Let's talk about the weather.

```JavaScript
var weather = 'sunny';
var statement = 'The weather is ' + weather + ' today.';
```

Earlier, you saw how we can concatenate strings together to form a compound phrase. You can also use the `+` operator to combine strings and variables. In the above example, the variable `statement`, assigned `"The weather is " + weather + " today."` will return the string `"The weather is sunny today."`.

Any of the data types you have already learned can be assigned to a variable. For example, you can assign a number to a variable, a string to a variable, a boolean to a variable, etc.

As your programs become more complex, it is generally good practice to declare all of your variables at the top of your program. This will make it easier to find and understand your code later. Take a look at the program below:

```JavaScript
var book, author, isbn, description;

book = "Hunger";
author = "Knut Hamsun";
isbn = 0374525285;

description = "The book " + book + " by " + author + " is on ISBN " + isbn;
console.log(description);

book = "The Master and Margarita";
author = "Mikhail Bulgakov";
isbn = 0679760806;

description = "The book " + book + " by " + author + " is on ISBN " + isbn;
console.log(description);
```

As you can see, we have declared all the variables we want to include for our categorization of the books at the top of the program.  It is important to note that these variables persist only for the duration of your particular session with the console. If you close the console, they will be deleted from memory. You will also notice, however, that the values of the variables are __mutable__, meaning that they can be changed as the program progresses. If you run this program in the console, each `console.log()` command will display a new description. __Note__: Certain variable types are __immutable__, meaning that they cannot be changed. We'll explore additional details about immutable variables in later lessons.

### Variable Naming Conventions

There are a few rules for variable naming conventions in JavaScript. 

- Variables must begin with a letter or an underscore. You can't begin a variable name with a number (although you can use numbers after). 
- Variables must not contain spaces or special characters. For example, `myVariable` is a valid variable name, but `my variable` is not.
- Variable names are case sensitive. That is, a variable named `My_Books` is treated as an entirely different variable than one named `my_books`.
- You can't use one of JavaScript's reserved words as a variable name. All programming languages have a supply of words that are used internally by the language. For a complete list, see here: [Reserved Words](https://www.w3schools.com/js/js_reserved.asp).
- Do not include hyphens `-`. Hyphens can be misconstrued by JavaScript as attempts to subtract one value from another and will cause errors.

In general, try to keep your variable names as short and descriptive of their purpose as possible.

## Using typeof

Let's end our discussion of variables with one more nifty tool: the `typeof` operator. The `typeof` operator is used to determine the data type of a variable. For example, if you have a variable named `myVariable`, you can use the `typeof` operator to determine what kind of data it is.

```JavaScript
var myVariable = "Hello, World!";
console.log(typeof myVariable);
```

If you look at your developer console, you should see a `string` correctly identified as the data type of `myVariable`. You can use this operator to determine the data type of any variable you have created. This can become very useful when you are working with data types that are unknown to you or when you are converting data types from one type to another (which we'll begin learning in the next lesson).

## Review Questions

Let's review some of the main concepts we've covered in this lesson and get some practice in.

1. `console.log()` is best used for (select one):

<Quiz>
- testing and debugging your code*
- changing the appearance of a webpage
- warning the user about something
</Quiz>

2. Select all of the following statements that will evaluate to `true`:

<Quiz>
- 5*
- 5 = 5
- 5 == 5*
- 5 != 5
- 5 === 5*
- 5 !== "5"*
</Quiz>

3. Which of these variable names are legal (valid) in JavaScript? (select all that apply)

<Quiz>
- my_books* 
- myBooks*
- my-books
- myBooks1*
- 1my_books
- myBooks&I
</Quiz>

## Challenges

1. In JavaScript, as in algebra, ambiguity in a mathematical expression is resolved by [rules of precedence (PEMDAS)](https://www.purplemath.com/modules/orderops.htm). For example, the expression `5 + 5` is evaluated as `10`, while the expression `5 + 5 * 5` is evaluated as `30`. Using the rules of precedence and the console, rework the expression `5 + 5 * 10 /2` so that it resolves to `50`. Next, utilizing the variables defined below, write an expression that resolves to `true` using the double equals `==` operator.

```JavaScript
var a = 15;
var b = 10;
var c = 30;
var d = 5;
```

<JSTerminal />

2. Using variables, write a simple program that 1) sends an `alert` to the user telling them to open the developer console in their browser and 2) logs a message to the console saying they have won a prize. __Note__: This is an imaginary practice scenario. In reality, you would want to avoid using `console.log()` to send messages to users when actually deploying your website. Any information you want the user of your webpage to see should be presented on the webpage itself.

## Key Terms

Do you recall the meaning of the following terms from this lesson?

- boolean
- string
- variable
- concatenation
- declaration/assignment
- mutability

# If/Then

So far, we have been working with fairly simple programming structures. Our code thus far has been written as a single, linear, ordered list of instructions. However, there are other ways to structure your code that takes account of various conditions and reacts accordingly. 

We are speaking here about __control flow__: the order in which the computer executes statements in a script.

In general, code is run in order from the first line in the file to the last line, unless the computer runs across the (extremely frequent) structures that change the control flow, such as conditionals and loops. We will explore several of these structures in this lesson and learn how to use them to create dynamic, branching programs. To put these skills to work, at the end of the lesson you will learn to build your own small text-based "Choose Your Own Adventure" game that allows players/readers to change the outcomes of a story based on their decisions. Let's get started! 

## Thinking in Code

Let's talk about the process of thinking in code. What does someone think about before they write code? In your head, how might you imagine what the code in action would look like? 

In general, we might present a few initial ideas about the process:

1. The computer reads from top to bottom. It does things according to the instructions it reads, step by step. That's the sense in which we mean 'scripting'. My thought process is about the steps that are necessary to get from the beginning to a defined end. What kind of data do I have? How will it have to be transformed? What will be the result? That's the linear vision of scripting.
2. Digging into the code is a lot more difficult and we really need to envision its structure. What might the structure of the code look like? What is the structure of the data itself? That's the hierarchical vision of scripting.
3. A branching, rather than linear, vision of code is about the decisions that are made in the process of getting to the end. The branches in the program are equivalent to a "decision tree." 

![Decision Tree](/images/decision-tree.drawio.png)

The decision tree is a visual representation of the process of getting to the end of a program. The diagram above shows how code will follow the different "branches" depending on the truth or falsity of a certain condition.

To aid us in thinking about what our program might look like, let's also consider what a typical "Choose Your Own Adventure" game would consist of. In simple terms, it would need:

1. A predefined story (the story that the player is told)
2. A set of choices that the player can make at certain points in the story 
3. An internal way to change the story based on the player's choices (code branching)
4. A set of outcomes that the player can see based on their choices 

Let's keep these ideas in mind and use them as a rough roadmap for the rest of the lesson.

For now, let's not worry about the details of the story. Let's first start by exploring a simple way to allow the player to make choices and a way to store those choices.

## Prompts

One of the simplest ways to gather user input is through the `prompt()` function. This function displays a message to the user and waits for them to enter a response in the response field. The `prompt()` function returns the user's response as a string. Let's take a look at it in detail.

```JavaScript
    var userName = prompt("What is your name?");
```
Here is a simple example of the `prompt()` function in action. The user is asked to enter their name and waits for them to type it out and hit <kbd>Enter</kbd>. Once the user completes their name, their response will be stored in the variable `userName`. In other words, the function __returns__ the value you enter and stores it in the variable. We'll learn more about returns in a later lesson. For now, try running the code in the console below, answer the prompt, and then type `userName` in the console to see that the variable is now populated with the name you have entered.

<JSTerminal />

Pretty nifty, right? `Prompt` code is like `alert` code, with a couple differences:

1. In a prompt, you need a way to capture the user's response. So, you must begin the prompt with a variable declaration.
2. In a prompt, you can specify a second message, which acts as a "default" value. If the user doesn't enter a response, the default message will be stored in the variable. For instance, we might make a prompt like: `var whatAmI = prompt("What am I?", "I am a human!");`, in which `I am a human!` will show in the response field and act as the default return value if the user doesn't enter anything themselves. 

### parseInt()

It's important to note that the user's response to a `prompt` is _always_ a string. If you want to store and handle the user's response as a number (so you can perform arithmetic on it), you will need to convert it to a number using the `parseInt()` function. The `parseInt()` function takes a string and returns the number it represents. For example, `parseInt("5")` will return `5` (the number).

Let's try this out now, this time asking the user their age:

```JavaScript
    var userAge = prompt("How old are you?");
    userAge = parseInt(userAge);
    alert("You are " + userAge + " years old.");
    typeof userAge;
```

<JSTerminal />

For this example we simply update `userAge` with the new conversion value. As you can see by checking with `typeof`, the user's response is now registered as a number.

__Note:__ This is not a foolproof data type conversion tactic and is easily broken. For instance, if you type the response "one" into the prompt instead of 1, the `parseInt` function will return a `NaN` (Not a Number) value. The `NaN` value is a special value that is returned when you try to perform arithmetic on a value that is not recognized as a number. For our purposes at the moment, however, this technique will suffice.

## If/Else Statements

So far so good--we now have a way to capture user input. However, we don't yet have a way to react or respond to that input. For this we can use a different kind of structure called an __if/else statement__. These statements allow us to make decisions based on the value of a variable.

The basic structure of an `if/else` statement is:

```JavaScript
    if (condition) {
        // code to run if condition is true
    } else {
        // code to run if condition is false
    }
```

If statements translate to something like "_If condition is met, then execute the task_". In other words, the code in the `if` "block" will run if the `condition` (whatever it may be) is true and skip the `else` block, and the code in the `else` block will run if the `condition` is false and skip the initial `if` block. Note the beginning and ending curly braces `{}` surrounding each branch of the code: `if` and `else` always utilize curly braces, rather than semicolons. These braces always indicate a particular block of code and you will encounter them in many contexts.

Also note the text following the two forward slashes `//`: these are called __comments__. Comments are used to explain the code and are not executed by the computer. They are purely for human readers. As we continue to build more complex programs, we will often use comments to explain the code. Writing comments for yourself is an important way to make sure that you recall the purpose of the code you are writing if you return to it later. It also helps others reading your code to understand your intentions as well.

Let's look at a more concrete example of an if/else statement, modifying our "get the user's age" program from above and seeing if they are legally eligible to vote (as far as age goes) in the U.S. Try running the code in the console below.

```JavaScript
    var userAge = prompt("How old are you?");
    userAge = parseInt(userAge);
    if (userAge >= 18) {
        alert("You are legally old enough to vote in the U.S.");
    } else {
        alert("You are not legally old enough to vote in the U.S.");
    }
```

<JSTerminal />

After gathering the user input and performing the conversion, we then use an `if/else` statement to determine if the user is old enough to vote (that is, we check to see if they are 18 years or older). 

## Else If Statements

Using `else if`, you can utilize as many statements as you want in your code to check as many conditions as you need. Try running the following example in the console:

```JavaScript    
    var userAge = prompt("How old are you?");
    userAge = parseInt(userAge);

    if (userAge >= 18) {
        alert("You are legally old enough to vote and drive in the U.S.");
    } else if (userAge >= 16) {
        alert("You are not old enough to vote, but you are old enough to drive in the U.S.");
    } else {
        alert("You are not legally old enough to vote or drive in the U.S.");
    }
```

<JSTerminal />

The first `if` statement checks to see if the user is old enough to vote. If they are, the `alert` message is displayed. If they are not, the second statement `else if` checks to see if they are at least able to drive. If they are, the `alert` message is displayed. If they are not, the final `else` statement displays the last `alert` message. The final `else` statement in a series is usually considered a default case or catchall to execute if none of the other `if/else` statements are true.

Along with testing as many conditions as you want, you can also run as many lines of code as you want in each block. You can even chain together a series of `if/else` statements. This is called __nesting__. For example:

```JavaScript
if (condition1){
    // code to run if condition1 is true
    if (condition2){
        // code to run if condition2 is true
        if (condition3){
            // code to run if condition3 is true
        } else {
            // code to run if condition3 is false
        }
    } else {
        // code to run if condition2 is false
    }
} else {
    // code to run if condition1 is false
}
```

As you might be able to tell from just this example, too many nested `if/else` statements can be hard to read and hard to maintain, so try to keep them to a minimum whenever possible.

To help you understand how each block of this conditional cascade is structured, take a look at the diagram below:

![if/else diagram](/images/if-else-diagram.png)

The arrows indicate the beginning (opening) and ending (closing) braces of a particular `if/else` statement. By matching the colors of each statement, you can see how the curly braces are continually nesting and designating their own blocks of code. While many modern code editors have their own built-in syntax highlighting (or coloring) as well as automatic indentation and bracing to make our code more visually understandable, it is still important to keep a close eye on your code and make sure you are following the correct structure and working in the correct block. 

## Switch Statements

Switch statements are another control flow structure used to handle multiple conditions. They are perhaps not as common, but they are useful to cover here briefly, as they can have a cleaner syntax than creating overly complex chains of `if/else` statements.

The basic structure of a switch statement is:

```JavaScript
    switch (variable) {
        case value1:
            // code to run if `variable` is `value1`
            break;
        case value2:
            // code to run if `variable` is `value2`
            break;
        case value3:
            // code to run if `variable` is `value3`
            break;
        default:
            // code to run if `variable` is not `value1`, `value2`, or `value3`
            break;
    }
```

Like the `if/else` statement, the `switch` statement is broken into a series of `case` statements. Each `case` statement is a condition that the `switch` statement will check. The `switch` statement will then execute the code in the block that is associated with the first `case` statement that is evaluated as true. If none of the `case` statements are true, the `default` block will be executed.

The `break` statement is used to break out of the `switch` statement. The `break` statement is not required, but it is recommended to use it. If you omit the `break` statement, the `switch` statement will continue to execute the code in the next `case` statements even if they do not match the case.

Let's take a look at a more concrete example of a `switch` statement. Let's say we were creating a computer game, and wanted to let the player pick a difficulty setting. Take a look at the following code and run it in the console:

```JavaScript
    var difficulty = prompt("What difficulty would you like to play? 1- Easy, 2- Medium, 3- Hard");
    switch (difficulty) {
        case "1":
            alert("You have selected the Easy difficulty.");
            break;
        case "2":
            alert("You have selected the Medium difficulty.");
            break;
        case "3":
            alert("You have selected the Hard difficulty.");
            break;
        default:
            alert("Invalid entry.");
            break;
    }
```
<JSTerminal />

Here we have three different difficulty levels (although you can have as many levels or `cases` as you want in a `switch` statement). The first `case` statement checks to see if the user entered `1`, the second `case` statement checks to see if the user entered `2`, and the final `case` statement checks to see if the user entered `3`. If the user entered `1`, `2`, or `3`, the `alert` message is displayed. If the user entered anything else, the `default` block is executed and an error message is shown. 

While this example could also easily be written using `if/else` statements, in your programming journey there may be times when writing a `switch` statement is more appropriate than writing many unwieldy `if/else` statements. Did you notice how many fewer curly braces you had to keep track of when writing a `switch` structure? Readability is just as important as functionality in programming.

## Choose Your Own Adventure

Now that you have a better understanding of some basic control flow structures in JavaScript, it's time to put them to work creating a simple Choose Your Own Adventure game using `prompt` for input and `alert()` for output. Since our game is meant to be a piece of interactive fiction, we'll want to use a variable to track player choices, and perhaps also let the player input their name to personalize the game and get things started.

```JavaScript
    var playerName, playerChoice;

    var playerName = prompt("What is your name?");
    alert("Welcome, " + playerName + "!");
```

Next, we can begin adding our story. I am going to show you an example, but feel free to get creative and write a story of your own. For my example, I am going to adapt the first two lines of Fredric Brown’s short story “Knock,” written in 1948. These two lines are a complete story in themselves and are widely considered one of the shortest and yet most evocative horror/sci fi stories to date. In Brown’s story, the first two lines are as follows: 

> “The last man on earth sat alone in a room.  There was a knock on the door.”

I’m going to have some fun with this story and let the player decide what to do next. I will also modify the language a bit—because we are creating a Choose Your Own Adventure story, we want to use second person phrasing (you). So, my story will look rather like this:

```JavaScript
    alert(playerName + ", you are the last person on earth, sitting alone in a room. There is a knock on the door... What will you do?");
    playerChoice = prompt("Enter 1 to cautiously approach the door. Enter 2 to hide under the table.");
    if (playerChoice == "1"){
        alert("Your hands are trembling as you approach the door. You pause a moment before it.");
    } else if (playerChoice == "2"){
        alert("As you hide under the table you hear the doorknob rattling.");
    }
    else {
        alert("Invalid entry.");
    }
```

Let's try adding some more options to our story. Using the code editor below, see if you can add further options by nesting additional `if-else if` statements in the areas I have indicated with comments. You'll first want to include a new `prompt()` for `playerChoice` to get the player's new choices.

<CodeEditor language='JavaScript' height = '600px'>
var playerName, playerChoice;
var playerName = prompt("What is your name?");
alert("Welcome, " + playerName + "!");
alert(playerName + ", you are the last person on earth, sitting alone in a room. There is a knock on the door... What will you do?");
playerChoice = prompt("Enter 1 to cautiously approach the door. Enter 2 to hide under the table.");
if (playerChoice == "1"){
    alert("Your hands are trembling as you approach the door. You pause a moment before it.");
    // add new prompt and choices for this branch here
} else if (playerChoice == "2"){
    alert("As you hide under the table you hear the doorknob rattling.");
    // add new prompt and choices for this branch here
}
else {
    alert("Invalid entry.");
}
</CodeEditor>


Were you successfully able to add more options? Study my example below for a minute. For each choice (whether 1 or 2), I have added a new `if/else-if/else` statement within that block:

```JavaScript
    if (playerChoice == "1"){ // here's their first choice #1
        alert("Your hands are trembling as you approach the door. You pause a moment before it.");
        playerChoice = prompt("Enter 1 to bravely open the door. Enter 2 to look through the door's peephole.");
        if (playerChoice == "1"){ //here's their second choice #1
            alert("You swing the door open with courageous gusto.")
        }
        else if (playerChoice == "2"){ //here's their second choice #2
            alert("You cautiously look through the peephole. You make out a vague shape looming before the door.")
        }
        else {
            alert("Invalid entry."); // invalid entry for second choices
        }
    } else if (playerChoice == "2"){ // here's their first choice #2
        alert("As you hide under the table you hear the doorknob rattling.");
        playerChoice = prompt("Enter 1 to stay hidden under the table. Enter 2 to get up and find a weapon to defend yourself with.");
        if (playerChoice == "1"){ //here's their second choice #1
            alert("Whatever is at the door has now begun banging on it loudly.");
        }
        else if (playerChoice == "2"){ //here's their second choice #2
            alert("You quickly but quietly get up and look around. You see a broom in the corner of the room and wield it mightily.");
        }
        else {
            alert("Invalid entry."); // invalid entry for second choices
        }
    }
    else {
        alert("Invalid entry."); // invalid entry for first choices
    }
```

In this way, we are creating a branching structure that follows different paths according to player choice.

Putting it all together then, here is the story so far:

```JavaScript
    var playerName, playerChoice;

    var playerName = prompt("What is your name?");
    alert("Welcome, " + playerName + "!");

    alert(playerName + ", you are the last person on earth, sitting alone in a room. There is a knock on the door... What will you do?");
    playerChoice = prompt("Enter 1 to cautiously approach the door. Enter 2 to hide under the table.");
    if (playerChoice == "1"){
        alert("Your hands are trembling as you approach the door. You pause a moment before it.");
        playerChoice = prompt("Enter 1 to bravely open the door. Enter 2 to look through the door's peephole.");
        if (playerChoice == "1"){
            alert("You swing the door open with courageous gusto.")
        }
        else if (playerChoice == "2"){
            alert("You cautiously look through the peephole. You make out a vague shape looming before the door.")
        }
        else {
            alert("Invalid entry.");
        }
    } else if (playerChoice == "2"){
        alert("As you hide under the table you hear the doorknob rattling.");
        playerChoice = prompt("Enter 1 to stay hidden under the table. Enter 2 to get up and find a weapon to defend yourself with.");
        if (playerChoice == "1"){
            alert("Whatever is at the door has now begun banging on it loudly.");
        }
        else if (playerChoice == "2"){
            alert("You quickly but quietly get up and look around. You see a broom in the corner of the room and wield it mightily.");
        }
        else {
            alert("Invalid entry.");
        }
    }
    else {
        alert("Invalid entry.");
    }
```

Copy/paste my code into the code editor below if you'd like to see it in action.

<CodeEditor language='JavaScript' height = '450px'>
</CodeEditor>

While this approach to creating a Choose Your Own Adventure program works, it is very clunky and quite hard to read. As we said before, simply using a bunch of nested `if/else if` statements makes a program incredibly difficult to build and maintain. You probably noticed this yourself when trying to add more choices to the program. Also, if the player incorrectly inputs a number, this program simply exits rather than prompting them to try again. Thankfully, JavaScript has many tools to help us address these issues. As we continue to learn more about the language, we will learn to use more control flow structures and data types to make our programs more readable and maintainable. Specifically, in the next lesson we will begin learning about loops and how to use them to repeat blocks of code, iterate over a series of values, and make our programs more efficient overall.

## Review Questions

Let's review the concepts we have learned in this lesson.

1. The `prompt()` function always returns a `string`.

<Quiz>
- True*
- False
</Quiz>

2. The code snippet below will throw errors or otherwise not work as intended. Why? Take a moment to look over it carefully, then select all that apply in the quiz below.

```JavaScript
prompt("What is your name?");
if (name = "Sal Ami")
    alert("Hello name!");
else
    alert("It's too bad your name isn't" + name + ".");
```

<Quiz>
- `prompt()` needs to be assigned to a variable.*
- a double-equals (rather than a single equals) operator is needed in the `if` statement.*
- the first `alert` will not correctly display `name` as intended.*
- the `if/else` statement needs curly braces for each part.*
</Quiz>

3. Switch statements should have (select all that apply):

<Quiz>
- `break`*
- curly braces*
- a default case*
</Quiz>

## Challenges

1. Write a program that has the user input a number. If the number is even, `alert` "The number is even." If the number is odd, `alert` "The number is odd."

<CodeEditor language='JavaScript'>
</CodeEditor>

2. Utilizing `switch` statements, write a short Choose Your Own Adventure story that allows the player 3 choices to choose from at a time.

<CodeEditor language='JavaScript' height='400px'>
</CodeEditor>

## Key Terms

Do you recall the meaning of the following terms from this lesson?

- control flow
- return
- comments
- nesting

# Loops and Arrays

In this lesson we will begin exploring how to use __loops__ to repeat blocks of code and iterate over a series of values. We will also learn to work with a very versatile new data type called `arrays`. To put these skills to work, at the end of the lesson we will create a simple library app that allows users to search for a book and see if it is located in the library's collection. 

## Arrays

Let's begin by learning about the `array` data type. So far, you have encountered variables that only contain a single value. An array, in contrast, is a _series_ or a _collection_ of values stored in a single variable. The following is an example of four different arrays:

```JavaScript
var myArray1 = [1, 2, 3, 4, 5];
var myArray2 = ['a', 'b', 'c', 'd', 'e'];
var myArray3 = [true, false, true, false];
var myArray4 = [1, 2, 'dog', true, [1, 2, 3]];
```

Creating an array is just like other variable declarations you have seen, but the items it contains are always denoted by square brackets `[]`. An array can house any of the data types we have encountered so far. The first array, for example, contains a series of numbers, the second array contains a series of letters, and the third array contains a series of booleans. Arrays are very versatile and can also contain a mix of different data types, like in the fourth example. As you can see, this array even contains another array `[1, 2, 3]`!

Arrays are useful when you want to have a series of values that are easily accessible. Creating an individual variable for each of the values in the example above, for instance, would make your code very confusing and hard to work with.

Let's look at how we can access the values in an array.

## Accessing Values in an Array

To work with particular values in an array, we access its __index__. Values in an array are numbered starting from 0. The first value in an array is at index 0, the second value at index 1, and so on. Take a look at the example below:

```JavaScript
var myArray = [1, 2, 'dog', true, [1, 2, 3]];
alert(myArray[0]); // returns 1
```

We access the index of an array by using the square brackets `[]` and the corresponding index number. The code snippet above will `alert` the value at index 0 of the array `myArray`. Remember, 0 is the _first_ value in an array, 1 is the _second_ value, and so on.

Try using `alert` to display the value for each of the items from the example in the code editor below:

<CodeEditor language='JavaScript'>
    </CodeEditor>

As you can see, when you access the value at index 4 (`myArray[4]`), you get the value `1, 2, 3`. Again, this is because the value at index 4 is an array itself.

## Changing Values in an Array

To change the value at a particular index in an array, we use the same syntax. We use the square brackets `[]` and the index number to access the value, and then assign that index a new value.

```JavaScript
var myArray = [1, 2, 'dog', true, [1, 2, 3]];
myArray[0] = 'cat';
alert(myArray[0]); // returns 'cat'
```

In this example, the value at index 0 (originally `1`) will be changed to `'cat'`.

## Adding Values to an Array

To add a new value to the end of an array, we use the `push()` method. __Methods__ are utilized with _dot notation_, and act upon whatever object or value (in the case below, an array) you specify. The `push()` method takes a single value and adds it to the end of the array.

```JavaScript
var myArray = [1, 2, 'dog', true, [1, 2, 3]];
myArray.push('cat');
alert(myArray[5]); // returns 'cat'
```

As you can see, we attach our `push()` method to `myArray` with a `.` (dot), and indicate the value we want to add in the `()` parentheses. This code adds the value `'cat'` to the end of the array `myArray`. Methods are similar to functions, but are used to act upon a specific object. We will learn more about functions in the next lesson, but for now, just keep in mind the general syntax and usage of methods.

## Removing Values from an Array

To remove a value from an array, we can use the `pop()` method. This method removes the last value in the array.

```JavaScript
var myArray = [1, 2, 'dog', true, [1, 2, 3]];
myArray.pop();
alert(myArray[4]);
```

Try running this code in the code editor below.

<CodeEditor language='JavaScript'>
    </CodeEditor>

Oh no, we are now getting a message of `undefined`! But this is exactly what we intended to happen, because the `pop()` method removed the last value in the array. So, when we try to access it, JavaScript finds nothing there.

## Splicing an Array

If we want to remove a range of values from an array or start at a particular index, we can use the `splice()` method. This method takes two parameters: the first parameter is the index number of the first value we want to start from and remove, and the second parameter is the number of values to remove in total.

```JavaScript
var myArray = [1, 2, 'dog', true, [1, 2, 3]];
myArray.splice(0, 2);
alert(myArray[0]); // returns 'dog'
```

In this example, the first two values in the array `myArray` are removed (we start at index 0 and remove two values total). After the operation, the value at index 0 is now `'dog'`.

## Determining the Length of an Array

It may not always be clear to you how many values are actually stored in a particular array at any given time, especially if it becomes very large or you are adding and removing a lot of elements. To determine the number of values in an array, we use the `length` property. The `length` property returns the number of values in an array. For example:

```JavaScript
var myArray = [1, 2, 'dog', true, [1, 2, 3]];
alert(myArray.length); // returns 5
```

We utilize `length` by prefacing it with a `.` (dot) and the array we want to act upon. Note that with `length`, you don't need to include the ending parentheses. This is because, strictly speaking, length is a property (a value), and not a method (which act like functions). Don't worry too much about this difference for now, just keep in mind that `length` does not require parentheses.

As you can see, `length` counts through the values in the array, so it will return 5. It is important to note here that `length` starts with 1, not 0, so although the last value in the array is at index 4, `length` will still return 5. Confusing, right? It is simply a quirk of the language to get used to, so keep it in mind when working with arrays.

As an example, if you want to access the last value in the array, you can use the `[length - 1]` syntax. This will always return the last value in the array:

```JavaScript
var myArray = [1, 2, 'dog', true, [1, 2, 3]];
alert(myArray[myArray.length - 1]); // returns [1, 2, 3]
```

This is a useful way to access the last value in an array even when you don't know how many elements the array holds.

## The sort() Method

Let's take a look at one last method that we can use on arrays. The `sort()` method sorts an array in alphabetical order, and is particularly useful if you have an array of letters or strings:

```JavaScript
var myArray = ['c', 'b', 'a', 'e', 'd'];
myArray.sort();
alert(myArray); // returns ['a', 'b', 'c', 'd', 'e']
```

You can, however, also use the `sort()` method to sort an array in numerical order. For example:

```JavaScript
var myArray = [2, 4, 3, 1, 5];
myArray.sort();
alert(myArray); // returns [1, 2, 3, 4, 5]
```

There are [many other methods](https://www.w3schools.com/js/js_array_methods.asp) you can perform on arrays, and we have only scratched the surface here. But keep in mind that arrays are a powerful tool for storing and manipulating data. Let's now take a look at how we can loop through arrays to make our code more efficient.

## Looping Through an Array

We have so far seen how we can access values in an array, and manipulate them in ways that are useful. But what if we want to do something with every value in an array? For instance, if we wanted to access every value in an array, it would be very tedious to write out the same code over and over, referencing each and every item:

```JavaScript
myArray[0];
myArray[1];
myArray[2];
myArray[3];
...
```

Thankfully, we can do this in a more efficient way. Let's explore a new kind of technique called __looping__. Looping is a way to iterate through a structure and perform an action on each element.

## The For Loop

When you want to loop through an array, the most common way is with a `for` loop. This loop will __iterate__ or step through the array and execute a block of code for each value in the array.

The general structure of a `for` loop is as follows:

```JavaScript
for (var i = 0; i < array.length; i++) {
    // do something
}
```

This may look a little complicated, so let's explore it a bit. The `for` loop is comprised of three parts: the first part is the initialization of the loop, which is the variable `i` in this case (`i` is often used by convention, but the variable name can be anything you want). The second part is the condition that the loop will continue to execute until, and the third part is the incrementor. Each is separated by a semi-colon `;`.

To break it down a little more:
- `var i = 0`: This is the starting point of the loop. It will serve as the index number of the first element in the array.
- `i < array.length`: This is the condition of the loop. It is a boolean expression that determines whether the loop should continue. In other words, it says: "while `i` is less than the `length` of the array, do the following:".
- `i++`: This is the incrementor. `++` is a new operator that means that the value of `i` will increase or __increment__ by 1 each time the loop executes. We use it to increment the index number of the loop so that it will continually move to the next element in the array. 

 Let's see how this works in action using our `myArray` array from earlier:

```JavaScript
var myArray = [1, 2, 'dog', true, [1, 2, 3]];
for (var i = 0; i < myArray.length; i++) {
    alert(myArray[i]);
}
```

Try running this code in the code editor below.

<CodeEditor language='JavaScript'>
    </CodeEditor>

As you can see, the loop iterated through the array and alerted each value in the array. You'll notice that the loop executed the alert 5 times instead of displaying all the values at once. This is because the loop is executing the alert once _for each_ value in the array. In other words, the code inside the `for` loop block executes once for each value in the array based on the current value of `i`. So, if there are 5 values in the array, the loop will execute 5 times.

`for` loops are incredibly important to get the hang of, so let's look at one more example, looping from 1 to 5:

```JavaScript
var num = 5;

// looping from i = 1 to 5
// in each iteration, i is increased by 1
for (var i = 1; i <= num; i++) {
    console.log(i);     // printing the value of i
}
```

If we were to run this, what would we get? Well, in this case we would get the following output:

```
1
2
3
4
5
```

In this case, we started our loop at `i = 1`, rather than `i = 0`. This is because we want to start our loop at 1, not 0. We then check if `i` is less than or equal to `num`, which is 5. If `i` is less than or equal to 5, the loop will continue to execute. If `i` is greater than 5, the loop will stop executing. Thus, we get the output of 1 through 5.

## The While Loop

The `while` loop is similar to the `for` loop, but it will infinitely execute the code inside a loop until a certain specified condition is met. This is useful if you want a certain code block to run until a particular outcome is resolved. Try running the example in the code editor below: 

```JavaScript
var i = 0;
while (i < 5) {
    alert(i);
    i++;
}
```

<CodeEditor language='JavaScript'>
    </CodeEditor>

As you can see, the loop executed the alert 5 times, incrementing the value of `i` each time. In other words, this loop is saying: "while `i` is less than 5, do the following:".

__Note:__ It is very important to make sure your `while` loops ultimately end by satisfying the condition you specify. If you don't, the loop will continue forever, and the user will be required to force-quit your program or close the window to stop it.

## Putting It All Together - The Library App

Let's use the skills we've learned in this lesson to create a simple app that will allow us to sort, display, and search for book titles from our library.

To begin, let's imagine a number of fiction titles that are available in our library and add them to an array. We'll sort this array to put it in alphabetical order.

```JavaScript
var bookTitles = [
    'Too Loud a Solitude',
    'Things Fall Apart',
    'The Master and Margarita',
    'The Three Body Problem',
    'The Woman Destroyed',
    'Beloved',
    'The Tenant of Wildfell Hall',
    "Lady Chatterley's Lover",
];

bookTitles.sort();
var requestedTitle = "";
var libRequests = []
```

Because we want to get book requests from the user, an empty string `requestedTitle` will store the title of the book that the user requested in the prompt, and an empty array `libRequests` will store all the many requests the user may enter.

Next, let's give the user a short welcome message. We will also let them know they can make a request by typing `request` at the prompt, display all book titles by typing `display`, or quit the program by typing `quit`:

```JavaScript
alert("Welcome to the library!\n\nPlease search for a book title when prompted.\n\nType `request` at the prompt to make a request for a book.\n\nYou can also type `display` at the prompt to display all available book titles.\n\nType `quit` at the prompt to quit the program.");
```

Our welcome message gives the user a few options for what they can do. To keep the text display neat, we use `\n` characters (specifically 2 in this case) to create two new lines after each statement.

At this point, we can envision a few things about how our program should operate:
- We want to allow the user to search for books until they decide to quit. So, a `while` loop will be needed.
- We want to check if the user types `request` or `display` at the prompt. If they do, we want to perform the appropriate action. So, we will need several `if/else` statements. 
- We want to iterate through the array of book titles and display each one. So, we can use a `for` loop to accomplish this.

Okay, conceptually we have the basic toolkit. However, we are missing one crucial piece. We want the program to check if a book title the user enters is actually in the library. That is, we want to see if the string the user enters matches an item in the array `bookTitles`. How can we do this? Let's introduce one more new method: `indexOf`.

### indexOf

`indexOf` is a method that returns the index of the first occurrence of a value in an array. If the value is not found, it will return `-1`. Here's an example:

```JavaScript
var myArray = ['dog', 'cat', 'bird', 'fish'];
myArray.indexOf('dog'); // returns 0
myArray.indexOf('cat'); // returns 1
myArray.indexOf('bird'); // returns 2
myArray.indexOf('fish'); // returns 3
myArray.indexOf('cow'); // returns -1
```

Using this method, we can check if a book title the user enters is in the library (if the string the user enters matches an item in the array `bookTitles`). If it doesn't (if the method returns `-1`), we can alert the user that the book they requested is not in the library.

With this method we should now have everything we need. Let's put the whole program together:

```JavaScript
var bookTitles = [
    'Too Loud a Solitude',
    'Things Fall Apart',
    'The Master and Margarita',
    'The Three Body Problem',
    'The Woman Destroyed',
    'Beloved',
    'The Tenant of Wildfell Hall',
    "Lady Chatterley's Lover",
];

bookTitles.sort();
var libRequests = [];
var requestedTitle = "";

alert("Welcome to the library!\n\nPlease search for a book title when prompted.\n\nType `request` at the prompt to make a request for a book.\n\nYou can also type `display` at the prompt to display all available book titles.\n\nType `quit` at the prompt to quit the program.");

var response = "";
while (response != 'quit') {
    response = prompt("Search for a book title or make a request by typing 'request': ");
    // check if the user wants to make a request
    if (response == 'request') {
        requestedTitle = prompt("What book would you like to request? ");
        libRequests.push(requestedTitle); // add the requested title to the library requests array
        alert("You have requested the following titles:" + libRequests + "."); // alert the user their requests
    }
    // check if the user wants to display all the titles
    else if (response == 'display') {
        for (var i = 0; i < bookTitles.length; i++) {
            alert(bookTitles[i]); // display all available book titles
            }
    }
    // otherwise, check if the book the user entered is in the library
    else {
        var bookIndex = bookTitles.indexOf(response);
        if (response != 'quit'){
            // if indexOf returns -1, the book the user entered is not in the library
            if (bookIndex == -1) {
                alert("Sorry, we don't have that book. You can always request it.");
            }
            else {
                alert("Yes, " + response + " is available to check out.");
            }
        }
    }
}
```

Try running and exploring the program:

<CodeEditor language='JavaScript' height='550px'>
    </CodeEditor>

Let's break down the logic of the program a bit. First, we have a `var response = "";` line. This is an empty string variable declaration meant to store the user's response to the prompt. We will use this variable to determine whether or not the user wants to make a request, display, quit, or else search for the book in our library. Next, we have a `while` loop that will continue to execute until the user types `quit`. Within the `while` loop, we first check if the user's response is `request` or `display`. If it is, we can perform the appropriate action using `if/else if` statements. To display all book titles, we use a `for` loop to alert each book. If the response is not a defined user action (i.e., request, display, quit), we can check if the string is in the library. We use the `indexOf` method to check if the `response` string is in the library. If it is, we can alert the user that the book is available to check out. If it isn't (if the method returns `-1`), we can alert the user that the book is not in the library.

Congratulations! You have now successfully created a basic library search program. There are, of course, a number of limitations to this program. For instance: 
- The search parameters are not very robust. The user must type out the full title of the book, with the exact spelling and punctuation of the title. As you might imagine, this is not a very good user experience.
- The `for` loop sends an alert for each book in the library. This is not ideal, especially if we had a large amount of books. We would want to display the books in a more organized manner.

These are basic considerations we would want to take into account if we were actually designing a library search program. However, if you can understand how this program works, you are well on your way to creating complex and robust JavaScript programs. To get some more practice in, try out the challenges below.

## Review Questions

Let's review the concepts we have learned in this lesson.

1. What will be the result of the `alert` in the code below?

```JavaScript
var myArray = [1, 2, 'dog', true, [1, 2, 3]];
myArray.pop();
alert(myArray[4]);
```

<Quiz>
- 1, 2, 3
- true
- undefined*
</Quiz>

2. What will be the result of the `alert` in this code snippet?

```JavaScript
var myArray = [1, 2, 'dog', true, [1, 2, 3]];
alert(myArray.length);
```

<Quiz>
- 4
- 5*
- 6
</Quiz>

3. What will be the result of the `alert` here?

```JavaScript
var myArray = [1, 2, 'dog', true, [1, 2, 3]];
myArray.splice(0, 2);
alert(myArray[0]);
```

<Quiz>
- 1
- 2
- dog*
- true
- [1, 2, 3]
</Quiz>

## Challenges

1. Write a `for` loop that prints all even numbers from 0 to 100 to the console.

<CodeEditor language='JavaScript'>
</CodeEditor>

2. The library program is very case sensitive, requiring the user to enter exact punctuation and capitalization of a book title. This is not a very robust search. Try improving the program using the [toLowerCase method](https://www.w3schools.com/jsref/jsref_tolowercase.asp), which converts all the letters of a string to lowercase, to make the search parameters case insensitive. _Hint: To match the two terms, you will want to perform the `toLowerCase` method both on the user's response as well as on each book title in the library. Try storing these results in new variables!_

## Key Terms

Do you recall the following terms from this lesson?
- `array`
- `index`
- `length`
- `push`
- `pop`
- `splice`
- `sort`
- `indexOf`

# Functions

In the last lesson, we learned how to loop through a series of statements to repeat blocks of code. As you saw, this can be very useful if we want to automate a series of tasks that would otherwise take forever to write out manually. __Functions__ are another technique that can be used to repeat and reuse blocks of code and help us automate tasks. In this lesson, we will learn how to create our own functions and how to use them. To this end, at the bottom of the lesson we will create a simple grading program that will allow you to add, calculate, and display student grades.

## What are Functions?

Functions are blocks of code that are designed to perform a specific task and can be reused. When developing applications, you will likely need to perform the same action in many different places. For example, you may need to perform a specific calculation on a number of different values and in different places in your code. Or, you might want to show an error message whenever an error occurs. Instead of rewriting the same code over and over again to perform these actions, you can wrap the code in a function and then call the function whenever you need to perform the action.

The basic syntax for creating a function is as follows:

```JavaScript
function functionName(parameter1, parameter2, ...) {
    // code to be executed
    return value;
}
```

To create a function, you must first define the function name. Naming conventions for functions are [lower CamelCase](https://wiki.c2.com/?LowerCamelCase), in which the first word is lowercase and the following words begin with a capital letter. Next, you define the function's __parameters__ or __arguments__ within closed parentheses `()`. The parameters are the values that will be __passed__ into the function when it is called. Passing in parameters allows us to reuse the same function for different tasks, because we can pass in different values to the function each time we want to reuse it. The parameters are separated by commas. You can define as many parameters as you want.

Like loops, you can see that functions use curly braces to define their contents. The contents of the function are the code that will be executed whenever the function is called.

For a procedure to be designated a function, it will also __return__ a value. In other words, a function takes some input, transforms that input somehow, and returns an output. 

To make this all clearer, let's look at a basic example of a function. We will create a function called `add` that takes two numbers as parameters and returns the sum of the two numbers.

```JavaScript
function add(num1, num2) {
    return num1 + num2;
}
```
First we define the function `add()` with two parameters to pass in, `num1` and `num2`. To add the two numbers we can simply return `num1 + num2`. Note that we could also have defined a variable `sum` and then returned `sum`, like so:

```JavaScript
function add(num1, num2) {
    var sum = num1 + num2;
    return sum;
}
```

This is functionally the same result. The only difference is that we have created a new variable within the function to store the sum.

## Calling a Function

If you were to run the code above, you would see that nothing happens. This is because we have not __called__ the function yet. To call a function, we simply use the function name followed by parentheses. The parentheses contain the values that will be passed into the function as parameters. Let's try calling the `add()` function with two number values:

```JavaScript
function add(num1, num2) {
    return num1 + num2;
}

add(1, 2);
```

Try running this code in the editor below.

<CodeEditor language='JavaScript'>
    </CodeEditor>

As you can see, the result of the `add()` function above returns 3 to the console. This is because `add()` takes two numbers as parameters and returns the sum of the two numbers. In this case, `num1` is 1 and `num2` is 2. If you change the values of `num1` and `num2` to different numbers, the result will also change. Again, this allows us to reuse the `add()` function to perform the same calculation on different values.

We could also capture the result of the function in a variable and then work with that variable. For example:

```JavaScript
function add(num1, num2) {
    var sum = num1 + num2;
    return sum;
}

var result = add(1, 2);
alert(result);
```

Here we are calling the `add` function and storing the result of the function (the return value) in the variable `result`. We can then use the variable to perform whatever action we want.

__Note:__ Make sure you are passing in the correct number of parameters when calling a function (at least for functions you have created yourself. Built-in functions inherent to JavaScript can behave a little differently, but don't worry about that right now). If you call the function with too few parameters or too many parameters, your function will likely either behave in unexpected ways or throw an error.

It is worth pointing out that you can also call a function with no parameters and also without an explicit `return` statement. For example, we can create a function called `alertHello` that will simply alert "Hello!" to the user.

```JavaScript
function alertHello() {
    alert('Hello!');
}

alertHello();
```

Running this code will alert "Hello!" to the user.

Note that if your code does not have a return statement or if the content does not return a value, JavaScript functions will automatically return `undefined`.

Here's an example:

```JavaScript
function doNothing() {
    // do nothing
}

doNothing();
```

If you type this code into the developer console in your browser, you will see that the function returns `undefined` because you have not provided it with any return value.

Okay, now that we have some basic understanding of how functions operate, let's look at how they create new "scopes" in your code.

## Scope

When you create a function, it designates a new __scope__. Scope is the context in which a particular variable is accessible. In other words, it means where a variable can be available for use (read, manipulated, displayed, etc.) in your code. Depending on how and where you declare your variables, you can have different scopes.

### Rethinking Variable Declarations: `var` vs. `let` and `const`

So far in this course, we have used the `var` keyword to declare variables. While this was the old standard way of declaring variables in JavaScript, in most modern usages it has been replaced by the `let` and `const` keywords. `const` in particular has become the new standard for declaring variables in JavaScript. While you can see that the syntax is the same...

```JavaScript
var name = 'John';
let age = 30;
const isAdmin = true;
```

...the behavior of the keywords is different. From now on, __we will shift to using the `let` and `const` keywords in this course, and in particular, to using `const`.__ What, then, are the differences between these variable declarations?

To understand the differences between these declarations, we need to understand their scope. Let's understand the scope of each of these types and see why `let` and especially `const` are the new standard.

## `var`

`var` declarations can be "globally" and "function/locally" scoped. Global scope means that the variable is available for use anywhere throughout your code. Function scope means that the variable is available for use only within the function it is defined. When declared outside of a function, `var` is global and can be accessed anywhere in your code. When declared inside of a function, `var` is function-scoped and can only be accessed within the function. Take a look at the example below:

```JavaScript
var greet = "hi there";

function newFunction() {
    var hello = "hello";
}
```

In this example, `greet` is globally scoped because it exists outside of the function, while `hello` is function scoped. These variables have different levels of access. To see what I mean, try running the code below in the editor:

```JavaScript
var greet = "hey hi"

function newFunction() {
    var hello = "hello";
}

console.log(greet); // this would work
console.log(hello); // but this will not
```

<CodeEditor language='JavaScript'>
    </CodeEditor>

As you can see, the console trips up at the `console.log(hello);` and throws a `ReferenceError`, which states that '`hello is not defined`. This is because `hello` is only available _inside_ of the function in which it was declared. If you try to access `hello` outside of the function, JavaScript can't find the variable declaration you are referring to. In contrast, `greet` will correctly log the value of `greet` because it is globally scoped.
    
You have also seen how `var` declarations are mutable, insofar as they can be re-declared and reassigned. You can change the value of a `var` at any time:

```JavaScript
// re-declaration
var greet = "hi there";
var greet = "hello there";

// reassignment
var greet = "hi there";
greet = "hello there";
```

While this can be useful in some circumstances, it is not recommended. Once your programs become more complex, you may find yourself accidentally re-declaring or reassigning variables without realizing it. This can cause unexpected behavior and can be a source of bugs. This is a large part of why we will use the `let` and `const` keywords in the future instead of `var`, so let's discuss each of those keywords next.

## `let`

In contrast to `var`, `let` declarations are block-scoped. This means that the variable is only available within the block of code in which it is declared. As you have seen, a block is a section of code surrounded by curly braces. So, a variable declared inside of a block with `let` is only available within that block. Try running the code below in the editor:

```JavaScript
let someValue = 1;

if (someValue > 0) {
    let greet = "hi there";
    console.log(greet); // this will successfully log "hi there"
}

console.log(someValue); // this will successfully log 1
console.log(greet); // but this throws a ReferenceError
```

<CodeEditor language='JavaScript'>
    </CodeEditor>

We can see that using `greet` outside of its block (the curly braces where it was defined) returns an error. Again, this is because `greet` is only available inside of the block in which it was declared. By contrast, `someValue` is available to display because it was declared within its own block outside of the function.

Just like with `var`, you can reassign the values of `let` variables at any time. However, unlike `var`, you cannot re-declare a `let` variable. So while this will work:

```JavaScript
// reassignment
let greet = "hi there";
greet = "hello there";
```

This will not:

```JavaScript
// re-declaration, will error
let greet = "hi there";
let greet = "hello there";
```

If you try running the re-declaration code you will get a `SyntaxError` that says `"Identifier 'greet' has already been declared"`. Using `let` therefore solves the problem of accidentally re-declaring variables. 

__Note:__ While you cannot re-declare a `let` variable within the block is which it was declared, you _can_ re-declare a `let` variable _outside_ of the block in which it was declared:

```JavaScript
let greet = "hi there";
if (true) {
    let greet = "hello there";
    console.log(greet); // this will successfully log "hello there"
}
console.log(greet); // will successfully log "hi there"
```

Do you understand why this works? Because they are block-scoped, both `greet` variables are treated as _entirely different_ variables!

As you can see, `let` is an improvement over `var` in the sense that it can help you avoid accidentally modifying the value of a variable that you did not intend to modify. However, `const` has become the standard for many cases, so let's look at why.

## `const`

In the rest of this course, we will often use `const` to declare variables. Like `let`, `const` is block-scoped. This means that the variable is only available within the block of code in which it is declared. However, unlike `let`, `const` variables are __immutable__. This means that once they are declared, they cannot be updated or re-declared. As you might have guessed, `const` is shorthand for "constant." In other words, `const` is a way to declare variables that you will never want to modify.

The value of a `const` variable always remains the same within its scope. So, if we declare a `const` variable, we can't do any of the following:

```JavaScript
// reassignment
const greet = "hi there";
greet = "wait, say hello there instead"; // throws a TypeError

// re-declaration
const greet = "hi there";
const greet = "I really wish I could say hello there"; // throws a TypeError
```

Running this code would give you a `TypeError` saying `"Cannot assign to constant variable"`. This is because we are trying to change the value of a constant variable.

Okay, now that we have a basic understanding of how scope in JavaScript works, let's move on to utilizing functions to create a simple grading program.

## The Student Grades Program

Using functions, let's create a simple program that will allow us to evaluate student grades.

Let's imagine that students have just submitted several homework assignments and we need to evaluate their grades. We want to:
1. Easily display their grades.
2. A new student has joined and submitted work, so we want to add a student to our list of students.
3. Evaluate their numbered grades to a letter (A, B, C, D, or F).

Functions are perfect for this because we can define each of these three tasks as a separate function. We can then call each of these functions at the appropriate time. Remember, functions should be used to perform a _single_ defined task whenever possible.

## Objects

For this program, we first need a way to store the information about each student. We want to store the name of each student as well as their corresponding grades. While we could solely use arrays to accomplish this, it makes much more sense to utilize a new data type called __objects__. 

Objects are similar to arrays, but they are more flexible. Objects are collections of _key-value_ pairs, and each key-value pair is called a _property_. In real life, all objects have properties. For example, a car has properties such as `make`, `model`, `year`, `color`, and so on. Analogously, we might imagine that a student has properties such as `name`, `grade`, `GPA`, and so on.

To create an object, we use the curly brace `{}` syntax. For example, we could create a student object with the following code:

```JavaScript
let student = {
    name: "Bob",
    grade: "A",
    GPA: 4.0
};
```

Here we have a student object with three properties: `name`, `grade`, and `GPA`. Each key is followed by a colon `:` and the corresponding value. We separate each key-value pair (each property) with commas.

To access the value of a property, we use the `.` syntax with the key. For example, to log the properties of our `student` object, we could write:

```JavaScript
console.log(student.name); // logs "Bob"
console.log(student.grade); // logs "A"
console.log(student.GPA); // logs 4.0
```

As you can see, objects very usefully allow us to associate a number of different properties with a single item.

For our purposes, we have many students rather than just one. How might we accomplish this? Well, we can create an array of objects! Let's try creating an array of student objects.

```JavaScript
let students = [
    {
        name: "Bob",
        grades: [88, 90, 80, 77, 89]
    },
    {
        name: "Alice",
        grades: [100, 95, 92, 89, 97]
    },
    {
        name: "Juan",
        grades: [91, 90, 94, 86, 90]
    }
];
```

Here we have an array of three student objects. Each student object has a `name` property and a `grades` property. The `grades` property is itself an array of numbers (5 different grades).

### Printing the Grades

Next, let's write a function to print all student names and their grades. Because we want to iterate through the array of student objects, we will use a `for` loop.

```JavaScript
// print all student names and their grades
function printGrades(students) {
    for (let i = 0; i < students.length; i++) {
        console.log(students[i].name + ": " + students[i].grades);
    }
}

printGrades(students);
```

As you can see, we are accessing the `name` and `grades` properties of each student object (using the `.` dot operator) and logging them as we loop through. By using `i` as our index, we are accessing each student object in the array.

### Adding a Student

A new student joined our class and submitted his work. So, let's add him to our array of students with a new `addStudent()` function.

```JavaScript
function addStudent(name, grades) {
    let student = {
        name: name,
        grades: grades
    };
    students.push(student);
}

addStudent("Biff", [71, 80, 56, 65, 60]);
```

In the function, we are creating a new student object with `name` and `grades` properties to match the other students. We then add this object to the end of the `students` array using the `push` method. Finally, we call the function with the name and grades of the new student (poor Biff didn't do too well, sadly), which will add the values to the corresponding properties. If you were to run the `printGrades()` function now, you would see that the new student is included in the list of students.

### Converting Grades to Letters

Lastly, let's create a function to convert all student grades to letter grades and print them: 

```JavaScript
function convertGrades(students) {
    for (let i = 0; i < students.length; i++) {
        let grades = students[i].grades;
        let letterGrade = "";
        for (let j = 0; j < grades.length; j++) {
            if (grades[j] >= 90) {
                letterGrade += "A ";
            } else if (grades[j] >= 80) {
                letterGrade += "B ";
            } else if (grades[j] >= 70) {
                letterGrade += "C ";
            } else if (grades[j] >= 60) {
                letterGrade += "D ";
            } else {
                letterGrade += "F ";
            }
        }
        console.log(students[i].name + ": " + letterGrade);
    }
}

convertGrades(students);
```

This function is slightly more complicated, because we need to iterate _both_ through the `students` array and each student's `grades` array, and evaluate the latter numbers to a letter grade. We can accomplish this by using two `for` loops: a `for` loop to iterate through the `students` array (using `i` and `students.length`), and a nested `for` loop to iterate through each student's `grades` (using `j` and `grades.length`). As we work through each student object, we first store the grades values of each student in a variable `grades`. Because `grades` is itself an array of values, we can use the `.length` property to determine the number of grades for each student (5). We then use the `if` statement to determine the letter grade for each number, and add it to the `letterGrade` variable with the `+=` operator (with an extra space at the end to make it more readable).

Let's put the whole program together:

```JavaScript
// array of student objects
let students = [
    {
        name: "Bob",
        grades: [88, 90, 80, 77, 89]
    },
    {
        name: "Alice",
        grades: [100, 95, 92, 89, 97]
    },
    {
        name: "Juan",
        grades: [91, 90, 94, 86, 90]
    }
];

// print all student names and their grades
function printGrades(students) {
    for (let i = 0; i < students.length; i++) {
        console.log(students[i].name + ": " + students[i].grades);
    }
}

//add a new student
function addStudent(name, grades) {
    let student = {
        name: name,
        grades: grades
    };
    students.push(student);
}

// convert grades to letters
function convertGrades(students) {
    for (let i = 0; i < students.length; i++) {
        let grades = students[i].grades;
        let letterGrade = "";
        for (let j = 0; j < grades.length; j++) {
            if (grades[j] >= 90) {
                letterGrade += "A ";
            } else if (grades[j] >= 80) {
                letterGrade += "B ";
            } else if (grades[j] >= 70) {
                letterGrade += "C ";
            } else if (grades[j] >= 60) {
                letterGrade += "D ";
            } else {
                letterGrade += "F ";
            }
        }
        console.log(students[i].name + ": " + letterGrade);
    }
}

// call functions
addStudent("Biff", [71, 80, 56, 65, 60]);
printGrades(students);
convertGrades(students);
```
Try running the program below in the editor. You can observe the results of the program by checking your browser's developer console.

<CodeEditor language='JavaScript' height='600px'>
     </CodeEditor>

*Congratulations*, you have now created a simple grading program utilizing functions!

Functions are a great way to keep your code organized and readable. They are mainly used to create reusable pieces of code that can be employed in multiple places in your program. Remember that functions should ideally always be used to perform a _single_ task, and that their names should be descriptive of the task they are performing.

## Review Questions

Let's review the concepts we have learned in this lesson.

1. What is the naming convention for functions in JavaScript?

<Quiz>
- lowercase_with_underscores
- lower camelCase*
- snake_case
- PascalCase
</Quiz>

2. What will be the result of the following code?

```JavaScript
if (someValue > 0) {
    let greet = "hi there";
}

console.log(greet);
```

<Quiz>
- hi there
- undefined
- ReferenceError*
- TypeError
</Quiz>

3. Should you use the `var` keyword to declare a variable?

<Quiz>
- Yes
- No*
- Don't tell me what to do!
</Quiz>

## Challenges

1. Write a function that always returns the last item in whatever array is passed to it. (Hint: Refer to the [Loops and Arrays](?page=4) lesson if you need a refresher on an easy way to get the last element.)


2. Biff decided to drop your class after his unfortunate grades. Add a function to the Student Grades program that will remove Biff from the list of students using the `pop` method.

3. In the wild, you will often see what are called __arrow functions__. In modern JavaScript, arrow functions are a shorter way to write functions, and utilize the `=>` (arrow) syntax. Check out [this resource](https://www.w3schools.com/js/js_arrow_function.asp) to learn about the syntax for arrow functions. Then, try to reformat the following traditional function using arrow function syntax instead:

```JavaScript
function add(a, b) {
    return a + b;
}
```

<CodeEditor language='JavaScript' height='400px'>
     </CodeEditor>

## Key Terms

Do you recall the meaning of the following terms?

- parameter/argument
- pass (values)
- call (function)
- return value
- constant
- scope
- objects

# Making Mistakes

It is an inevitability to make mistakes while programming. Especially when you are first beginning, it is easy to create errors and to write code that acts erratically or doesn't work at all. In fact, we have already made a few mistakes in previous lessons to illustrate the problems that can arise when learning to work with a new programming language. However, you should be aware that even the most seasoned professional programmers make mistakes as well. Coding can be a frustrating, laborious task at times, and dealing with errors and bugs is a constant process. However, I think you'll also find that coming up with creative ways to address issues that arise in your code can also be a great source of satisfaction.

Thankfully, programmers have developed many tools and strategies to help us deal with errors. In this lesson, we will cover a variety of tools, techniques, and strategies to help you write cleaner code, avoid common programming errors and pitfalls, and generally feel more confident in your ability to address problems.

First, let's jump into some common error types and their causes.

## Common Types of Errors

### Syntax Errors

You may have noticed that JavaScript is a finnicky language. One errant `{` can cause your entire program to break. For all their usefulness, computers are not (yet) very good at discerning meaning or understanding implicit intentions. You must speak to them in a highly specific way for them to understand what you are trying to achieve. 

When writing JavaScript, the most common type of error to make is a __syntax error__. These errors arise when you fail to add or misspell an element of the language that is needed for the code to be understood. For instance, below is an example of a basic syntax error. Can you identify the error? Try running it in the code editor to see the result.

```JavaScript
const oops = 12;
if (oops == 12 {
    alert(oops)
}
```

<CodeEditor language="JavaScript">
    </CodeEditor>

As you can see, we get the message of `SyntaxError: Unexpected token '{'`. In other words, it is telling us that the first curly brace seems out of place. Why? Well, looking closely you'll notice that we did not close the parentheses `)` in the `if` statement, as JavaScript expected us to. Instead, it found a curly brace and didn't know what to do with it. 

When dealing with syntax errors, it is often best to use the error message JavaScript gives you to try and pinpoint where the error might be located. In this example, for instance, the curly brace _is_ where it should be, but is still described as "unexpected." From this you can guess that you are likely missing something immediately before it.

Many code editors nowadays (including VSCode, which we'll begin to work with in the next lesson) have built-in tools that will detect and alert you to syntactical mistakes you are making while writing your code. Syntax errors will inevitably happen, though, so when you see them arise make sure to take a careful look over what you've written for typos or missing elements.

### Type Errors

__Type errors__ are when you try to perform an operation on a value of the wrong type. For instance, below is an example of a type error. Can you identify what is causing the error? Try running it in the code editor to see the result.

```JavaScript
let num = 1;
let oops = num.toUpperCase();
console.log(oops);
```

<CodeEditor language="JavaScript">
    </CodeEditor>

In this example, we are trying to use the `toUpperCase` method on a number. However, `toUpperCase` is only available for strings. You can only uppercase text! Hence the `TypeError` message. 

This error gives us a direct clue for how to fix our code. We would first need to convert the number to a string. For instance, we could use the `toString` method:

```JavaScript 
let num = 1;
let fixed = num.toString().toUpperCase();
console.log(fixed);
```

Here we apply both the `toString` and `toUpperCase` methods to the number, which then allows us to use it as an uppercase string. Note that you can chain methods together to accomplish tasks like this.

If, for whatever reason, you are ever in doubt about the particular type of a value, remember that you can use the `typeof` operator to check its type. This is a useful tool for figuring out where you might be going wrong.

### Reference Errors

When your programs begin to get more complex, it is occasionally difficult to discern what particular scope you are working within. This can cause programs to throw a __Reference Error__. Take a look at the example below. Can you identify what is causing the error? Try running it in the code editor to see the result.

```JavaScript
let someValue = 1;

if (someValue > 0) {
    let oops = "blah blah";
    console.log(oops);
}

console.log(someValue);
console.log(oops); 
```

<CodeEditor language="JavaScript">
    </CodeEditor>


As you can see, we receive the message of `ReferenceError: oops is not defined`. This is telling us that we are trying to use the `oops` variable out of the scope in which it was declared. Always be sure to check the scope of your variables before using them.

## Logical Errors

__Logical errors__ occur where your syntax is actually correct but the code is not producing what you intended. In other words, the program runs successfully, but gives "incorrect" results. These are often harder to fix than other types of errors, as there usually isn't an explicit error message to direct you to the source of the error.

Take a look at this example. It is a perfectly valid and legal code snippet, but won't work as intended. Can you identify where it is going wrong? Try running it in the code editor to see the result.

```JavaScript
function getPassword(){
  let correct = "password";
  let guess = "";
  while (guess == correct) {
    guess = prompt("What is the password?");
  }
  alert("You may enter.");
}

getPassword();
```

<CodeEditor language="JavaScript">
    </CodeEditor>

As you can see, this is not a very good password system. In fact, it lets everyone have access immediately! To correct this, we would need to change the `==` operator to `!=`, to make sure the `while` loop runs only until the correct password is entered.

This is a fairly straightforward example, but for larger pieces of software logical errors can be much more complex and difficult to identify. Let's discuss some general strategies to help you deal with logical errors.

## Strategies to Avoid Mistakes

Below are some general strategies and best practices you can follow to help you think through the structure and design of your programs.

### Writing Pseudo-code

One common mistake for beginners in approaching code and coding problems is trying to solve a problem entirely in JavaScript. While this may seem like an obvious and commonsense approach, it is actually not always the best way to tackle a problem. Often, when creating complex programs, it is often useful to flesh out the structure and logic of your program before even writing any code or when faced with a seemingly unsolvable problem.

This practice is called __pseudo-coding__. Pseudo-code is an amalgamation of code-like expressions and regular English (or whatever natural language you are most comfortable with). There's no correct way to write pseudo-code--you make it up as you go along. As long as it looks a little bit like code and follows the same general pattern and procedure, you're doing well.

The reason we write pseudo-code is that it allows us to flesh out the logic of the program in a clear and accessible way. We use it to skip over unnecessary details in a way that we can easily convert into code later.

Here's a possible example of pseudo-code for our simple password program from before:

```
create function get password
    store correct password in variable
    prompt user for password
    while password is incorrect
        prompt for password
    alert user they may enter
    end function
```

As you can see, pseudo-code is a lot more readable than writing actual code. It provides you with an accessible blueprint of a program's logic and structure that you can then overlay or follow with actual code.

As mentioned, there is no one way to write pseudo-code. You can be as detailed or as abstract as you'd like. As long as you are clarifying the structure of your program to yourself (and others you may be collaborating with), it is sufficient. It is often best, however, to write pseudo-code that more or less matches the syntax and vocabulary of JavaScript.

Whenever you are beginning a new program, it is highly recommended to write pseudo-code first. Not only will it make the overall structure of your program more intelligible, but it will also help you to avoid making logical errors down the road.

### General Tips

Here are some more general tips for dealing with logical errors:

1. Understand what your code is doing step by step.

With a logical error, code behavior is unpredictable. A loop may never happen, it may never end, or it might sometimes work right and sometimes not. The key to finding logic errors is to predict why the code is doing what it's doing and why it's not doing what you want. Follow through your code step by step, identifying _key changes of behavior_. 

2. Form a hypothesis or two before looking at the code. 

Think about what is wrong before you look over the code. Try to describe in plain English (or etc.) what is going wrong. Go through this process before you look at code. The moment you see code, you'll start worrying about details rather than thinking about the bigger picture. Logic errors are almost always about _logic_, and no amount of staring at code will show you the error.

3. Resolve syntax errors.

Go to the console and see if there are any syntax errors. If so, resolve them. Logic errors will not appear until you've resolved all syntax errors. If your code shows no syntax errors but still doesn't work correctly, you've got a logic error.

4. Identify key variables or conditions.

Most logic errors are centered around a condition that's not working right, and conditions are usually based on variables. Begin by taking a careful look at the conditions that control the behavior you're concerned about.

5. Think about your logic.

Logical errors aren't about getting the vocabulary right (remember, those are syntax errors). Logic errors are about telling the computer to do the wrong thing. The computer only does precisely what you tell it to do, so think hard about the logic you've applied and how you might be able to revise it.

## Using console.log() to Debug

To keep things simple, we have been console.logging a lot of our programs just so we can see an immediate result. However, `console.log()` is best used for debugging purposes in your programs. It is a quick and easy way to see the current state of a particular variable or condition. If you are ever uncertain about what result you might get from a particular piece of code, or if it is giving you an error or an otherwise unintended value, try breaking down the code step by step and using `console.log()` to see what is going on at each point.

Keep in mind that `console.log()` is useful no matter the data type: for instance, if you pass in an array, you'll be able to inspect the array's contents. Pass in an object, you can examine the object's attributes/methods. Pass in a string, it'll log the string. A good first step in any debugging process is to see exactly what you're getting back from the code. Pairing `console.log()` with `typeof` can also be particularly effective. Usually, this will give you some insight into what is going wrong.


## Review Questions

1. True or False - A syntax error occurs when code is not typed out correctly.

<Quiz>
- True*
- False
</Quiz>

2. True or False - A reference error occurs when a variable is used outside its scope or before it is declared.

<Quiz>
- True*
- False
</Quiz>

3. True or False - A logical error occurs when code works but is not producing the results you expected.

<Quiz>
- True*
- False
</Quiz>

## Challenges

1. Identify the logical error in the following code.

```JavaScript
// find the even numbers in an array
let someValues = [0, 1, 2, 3, 4, 5];

for (let i = 0; i < someValues.length; i++) {
    if (someValues[i] / 2 == 0) {
        console.log(someValues[i]);
    }
}
```

2. Let's say you are writing a program that allows users to manage a collection of recipes. You want the user to be able to add, remove, edit, and search through their recipes. You also want the user to be able to "favorite" individual recipes and let them search and look through their list of favorites. Write some pseudo-code for a program that allows for each of these features.

## Key Terms

- syntax error
- type error
- reference error
- logical error
- pseudo-code

# VSCode and GitHub 

Up to this point we have been working entirely in the browser and our work has faded into the past at every screen refresh. Ephemerality is not a feature much appreciated in programming. So, to get started on something more permanent, let's set up a practice folder to hold our code. Call it `javascript`, or whatever you want, as long as you promise to remember it. Throughout the rest of this course, we will be working in this folder. 

Click this button to download a couple of files we'll be needing. Unzip the folder and add the files to your working folder.

<Download files='index.html, script.js'><br />

Next, we'll want to get our coding environment set up. This will be the main focus of this particular lesson. We'll first install the VSCode code editor, and then learn how to set up and use a GitHub repository.

Much of your academic career has likely been structured around sending in single documents. For instance, a .pdf or Word document of your latest essay masterpiece. In general, however, going forward in this class you'll want to think of your work in terms of a __project__, which is a collection of files and code that you want to work on. In the coding environment we'll set up and the project we'll create, we'll be working with many files that will all contribute to the same overall project. A website, for instance, is a project, made up of many different files. What we will end up building by the end of this course will all be housed in the same folder and will be managed though a single GitHub repository. This will hopefully make more sense once we get into it.

For now, let's go ahead and install VSCode.

## VSCode

VSCode is a free and open-source code editor that is available for Windows, Mac, and Linux. It is a great tool for developers to use when they are working on code. It supports syntax highlighting, code completion, has built-in GitHub integration, and has an large library of extensions that can be used to extend its functionality.

### Installing VSCode

Navigate to the [homepage of VSCode](https://code.visualstudio.com/) and download the appropriate version for your operating system (stable version).

![VSCode homepage](/images/vscode_homepage.png)

Once it is installed, open up the application. On the left sidebar, you'll see a few different options. Let's look at three of them:

![VSCode sidebar](/images/vs_code_sidebar.png)

- The Explorer Window is the main window that you'll be working with. It is the main way to navigate through your project and to interact with files.
- The Search Window is a window that you can use to search for files or words throughout your project.
- The Source Control Window will allow you to manage your project's files and code through GitHub integration.

These are the main windows you'll be working with, along with the main code editor area, in which you'll be writing code.

### Opening a Project

For now, go ahead and open up the Explorer Window and click Open Folder. Navigate to your working folder for the course, select the folder, and click Select Folder.

In the Explorer, you should now be able to view both the `index.html` file and the `script.js` file, and can open them to view the code for each file.

![New Project](/images/vscode_openproject.png)

Next, let's go ahead and initialize a Git repository for our project.

## Creating a GitHub Account

The first step we'll need to take is to set up a GitHub account. Navigate to the [GitHub homepage](https://github.com/) and click "Sign Up for GitHub". You'll be prompted to create a new account.

![GitHub Sign Up](/images/github_homepage.png)

 __Note:__ Although you don't have to, it is best to use your student email account (.edu) to register with GitHub, as this will allow you access to some features you otherwise would have to pay for.

 Work through the steps to create a new account and return here when you are finished.  

## Getting Acquainted with Git and GitHub

Now that you have a GitHub account, let's go ahead and initialize a repository (folder) for our project. 

First, we should understand a little about how Git and Github work. __Git__ is a _version control system_ that allows you to track changes to your files. If you have used "track changes" in the past with either Microsoft Word or Google Docs, you're likely familiar with the terminology. In effect, you are tracking all of the "versions" or life-histories of your files stored in the repository.

__GitHub__ is an online platform for hosting Git repositories. It functions for some, predominantly programmers, as a social network for sharing and collaborating on code-based projects. Users can share their own projects, as well as search for others, which they can then often work on and contribute to. Digital Humanists, librarians, and other academics are also finding ways Git and GitHub are useful in writing projects and teaching.

A [study of how Digital Humanists use GitHub](https://digitalscholarship.files.wordpress.com/2016/07/spirosmithdh2016githubpresentationfinal.pdf), conducted by Lisa Spiro and Sean Morey Smith, found that a wide range of users, including professors, research staff, graduate students, IT staff, and librarians commonly used the site in their DH work. They used GitHub for a diverse range of activities, such as:

- Developing software
- Sharing data sets
- Creating websites
- Writing articles and books
- Collating online resources
- Keeping research notes
- Hosting syllabi and course materials

Although it has many benefits, using Git and GitHub effectively does take a bit of practice. It is notorious for being a bit of a pain in the neck (leading to such websites as [Oh Shit, Git!](https://ohshitgit.com/)), but it is worth the effort.

## Installing Git

Git, as a version control system, can be enabled in a folder, and then used to save the state of the contents in that folder at different points in the future. It will also keep a record of all changes made in the past. It knows exactly when a file is added to a project and even when it is deleted. It can even resurrect files that have been deleted, if needed.

Let's go ahead and install Git. 

### Installing on macOS

There are several ways to install Git on a Mac. The easiest way is probably to open up the Terminal (search for it in Spotlight if you are unfamiliar with the terminal), type the following command and press <kbd>enter</kbd>:

```bash
$ git --version
```

If you don’t have it installed already, it should prompt you to install it.

You can also find a macOS Git installer available for download [at the Git website](https://git-scm.com/download/mac).

### Installing on Windows

The most up-to-date build is available for download on the Git website. Just go to [the official download page](https://git-scm.com/download/win) and select the version you want to download (likely the 64-bit version).

### Installing on Linux

There are several ways to install Git on Linux, depending on your distribution. You can find the official instructions for installing Git on Linux [on the Git website](https://git-scm.com/download/linux).

## Initializing a Git Repository on GitHub

Next, let's go ahead and initialize a Git repository for our project. In VSCode, click on the Source Control Window and click on the `Initialize Repository` button.

![Initialize Repository](/images/vscode_initgit.png)

You should now be able to see the following:

![Initial Commit](/images/vscode_gitcommit.png)

In Git, every change you make to a file and submit to version control is called a __commit__. A commit is effectively a snapshot of a file or files at a certain point in time. Every commit also has a __commit message__, which is a short description of what the commit is all about, either for yourself or for others you are collaborating with. You should write a brief, descriptive message that encapsulates the changes you have made at that point in time.

Let's go ahead and make our first commit. In VSCode, type "First commit" in the message window and click `Commit`.

You should receive a message that `There are no staged changes to commit`. 

![No Staged Changes](/images/vscode_nostaged.png)

This is because we haven't made any changes to any files yet and because we haven't __staged__ any files yet. Before making a commit, you need to add the files to the "staging environment". Staged files are those that are ready to be committed. This will make more sense later as we continue to work with Git.

For now, go ahead and click `Yes` to the prompt.

Afterwards, you should see a button updated to `Publish Branch`.

![Publish Branch](/images/vscode_publishbranch.png)

Go ahead and click Publish Branch. You should be prompted to sign into GitHub. Go ahead and click `Allow`, and sign in to GitHub with your account.

If you receive a message to `Authorize VSCode`, click Authorize.

![Authorize VSCode](/images/github_authorize.png)

If you are given additional messages to allow VSCode to access your account, click through to allow.

Lastly, you will want to give your repository a name. In VSCode at the top, you should see a text field window for typing the name of your repository. Give it whatever name you want, and click `Publish to public repository`. You can also create private repositories, but for this class we will make our repositories public.

Afterwards, you should see a message that says `Successfully published to GitHub` in the lower right corner of VSCode. (If you also receive a message to `periodically run git fetch`, you can just say no for now.)

![Successfully Published](/images/github_published.png)

If you click through to `Open in GitHub`, you should be able to see the repository you just created, along with a message of your first commit.

![New Repository](/images/github_new_repository.png)

Congratulations! You have successfully created a new GitHub repository for this course.

Let's go ahead and explore our files a bit, make a new change, and make a new commit to our repository.

## Exploring our Files

Back in VSCode, open up the Explorer Window and click on the `index.html` file. 

![index.html](/images/index_scrn.png)

This is an HTML file. It contains the code for the page that we will be working with. We will learn more about HTML in the next lesson.

Now open the `script.js` file. As you can tell by the file extension (`.js`), this is a JavaScript file. It contains the code for the JavaScript that we will be working with.

As a project, each of these files is contributing to the webpage. We will learn more about how later, but for now let's look at the webpage in your browser.

In your file system, (not in VSCode), navigate to your folder containing these two files and double-click the `index.html` file to open it in your browser.

You should see the following:

![Hey it worked!](/images/heyitworked.png)

If you reference both files in VSCode, you can see that text from each is being reflected on the webpage. In the HTML file, we are displaying `This is my project!`. In the JavaScript file, we are providing an alert that says `Hey it worked!`.

### Making a Change

Without worrying about the HTML for now, let's change the `Hey it worked!` message to `My project is going to be awesome!`. Go ahead and make the change in your code editor.

If you save the file now, you should see a new change being registered in the source control window.

![Second Commit](/images/second_commit.png)

The number 1 in the source control icon indicates that there is one file change. If you click on it, you can see that it is tracking all the changes made to the file. The little `M` next to the file name indicates that the file is modified. 

### Staging our Change

You can also see a `+` (plus) sign next to the file name, which allows you to __stage__ a change for commit. Go ahead and click it. You should now see a section that says `Staged Changes`.

![Staged Changes](/images/staged_changes.png)

### Committing our Change

Now that we have staged our change, let's go ahead and commit our change. Be sure to type a message for the commit, like `Second Commit` or `modifying text`.

### Pushing our Changes to GitHub

You should now see a button that says `Sync Changes`. In the lingo of Git, this is called __pushing__ your changes. It is a way to send your changes to the remote repository on GitHub. Simply committing your changes will _not_ make the changes on your remote repository until you push them. Let's go ahead and click `Sync Changes` and click `Ok`to the prompt.

If you navigate to your repository in GitHub, you should see a new commit with the message `Second Commit`.

![New Commit](/images/github_secondcommit.png)

Congratulations! You have successfully pushed your changes to GitHub.

Using Git and GitHub might take a little getting used to, but it is a valuable resource for maintaining, sharing, and collaborating on projects. 

To wrap up, keep in mind that the general process for working with Git is as follows:
1. Make Changes
2. Stage modified files
3. Commit files with message
4. Push to remote repository on GitHub

## Review Questions

1. A version control system like Git allows you to (select all that apply):

<Quiz>
- track changes to your files*
- share your files and collaborate with others*
- restore files you may have deleted on your own machine*
- undo changes and revert to earlier versions*
</Quiz>

2. True or False - You need to stage your files before committing them.

<Quiz>
- True*
- False
</Quiz>

3. True or False - If you commit your changes, they will be immediately reflected in your GitHub repository.

<Quiz>
- True
- False*
</Quiz>

## Challenge

We saw that both the HTML file and the JavaScript file are contributing to the creation of our project webpage. For this challenge, try changing the text that is displayed from the HTML page to whatever you'd like. Once you have made a change and see it reflected in the webpage, stage the change, commit it, and push it to GitHub with an appropriate message.

## Key Terms

Do you recall the meaning of the following terms?

- Git
- GitHub
- stage
- commit
- push

# HTML and CSS

In the last lesson we set up our project and created a repository on GitHub. Now that we have the environment set up and some files to work with, let's begin learning about writing HTML and CSS to modify a webpage. 

We will be refreshing the page a lot, so the first thing I recommend doing is opening your `script.js` file in VSCode and commenting out `//` the alert that says `My project is going to be awesome!` so it doesn't become as much of an annoyance.

```JavaScript
// alert('My project is going to be awesome!');
```

To start us off and provide some context for this lesson, let's understand a bit about how HTML, CSS, and JavaScript work together.

## HTML, CSS, and JavaScript

__HTML__ stands for HyperText Markup Language. It is the standard language used to define the _structure and content_ of a particular webpage. It allows you to add text, images, and other elements to a webpage, and to direct the overall layout of the webpage. For example, you can use HTML to add a header to your webpage, structure text in a series of paragraphs, add a table, a list of bullet points, an image, and much, much more. 

HTML works in tandem with __CSS__, which defines the _style_ of a webpage. CSS stands for Cascading Style Sheets. While HTML directs the overall structure and content of a page, CSS is used to define the particular _stylistic or aesthetic appearance_ of the page. For example, you can use CSS to define the color of text, the font, the size, the background color, the color of elements like buttons, and much more. While you could create a webpage entirely using HTML, it would ultimately be a boring, uninteresting webpage with a white background and black Times New Roman text. This is precisely where CSS comes in.

Both HTML and CSS can also work in tandem with JavaScript files. While HTML and CSS direct the structure and style of a page, JavaScript allows you to add _functionality_ to a webpage. For example, you could use JavaScript to add a button that says "Click Me!" and when the button is clicked, it will display an alert that says "Hey! A button was clicked!". In other words, whatever the user can interact with on a webpage is controlled by JavaScript.

It's worth noting that the three languages are intertwined, and that you can write CSS and JavaScript inside an HTML file. This will make more sense as we continue learning.

In general, just keep in mind that:
- HTML provides the _structure_ of a webpage.
- CSS provides the _style_ of a webpage.
- JavaScript provides the _functionality_ of a webpage.

With this in mind, let's go ahead and dive into the basics of HTML.

## HTML

So far, we have one HTML file to work with in our project: `index.html`. You can tell it is an HTML file by the `.html` extension. The name of the file (index) is an industry standard, because web browsers tend to recognize the index.html page as the opening page to your website directory. See [here](https://www.thoughtco.com/index-html-page-3466505) for more explanation.

Let's take a look at the contents of the file. Open your project in VSCode and open the `index.html` file. You should see the following code display:

```html
<!doctype HTML>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My JavaScripting Master's Student Project</title>
  </head>
  <body>
    <h1>This is my project!</h1>
    <script src="script.js"></script>
  </body>
</html>
```

This is a standard layout for a basic HTML page. The first thing you'll probably notice is that HTML elements are defined by the `<` and `>` characters. Some tags need both opening and closing tags, like `<h1></h1>`, while others only need one tag, like `<meta>`. Tags that are self-closing, or don't require closing tags, are called _void elements_. To close a tag when needed, add a `/` before the name of the element in the last tag.

Let's break down some of the specific elements we are seeing here. The first element is a `<!doctype>` tag. This tag is used to define the type of document that is being created: in this case, an HTML doc. We also see an `<html>` tag after. This tag begins the HTML document proper.

We also have a `<head>` tag. This element is where we put all of the background information, or _metadata_, about the webpage. None of this information is actually visible in a webpage except for the `<title>` tag, which will be displayed as the title of the page in your browser's title bar.

Next, we have the `<body>` tag. This tag begins the body of the webpage, where we put all of the actual content we want to display. In this case, we have a `<h1>` tag. This tag defines a header, or a large series of text, and it has a text content of `"This is my project!"`. For the moment, let's skip the `<script>` tag--we'll discuss that later in the lesson. We end the HTML document by closing the `</body>` and `</html>` tags.

In general, then, the basic template for any HTML document is as follows:

```html
<!doctype HTML>
<html lang="en">
    <head>
        <title>This is the page title.</title>
    </head>
<body>
    <h1>Here's an example large heading.</h1>
    <p>This is an example paragraph of text.</p>
</body>
</html>
```

In other words...
- All HTML documents must start with a document type declaration: `<!doctype HTML>`.
- The HTML document itself begins with `<html>` and ends with `</html>`.
- The `<head>` of the HTML document contains the metadata about the document, such as the `<title>`.
- The visible part of the HTML document is between `<body>` and `</body>`, which can hold any number of elements you want to display.

### Useful Tags

There are many tags you will find yourself using in HTML. Here are some of the most common:

- `<p></p>`: This tag defines a paragraph of text.
- `<h1></h1>`: This tag defines a header, or a large series of text.
- `<h2</h2>`: This tag defines a smaller header, or a smaller series of text. It descends all the way down to `<h6>`.
- `<img src ="..." alt="Text for accessibility purposes" />`: This tag sets an image to display, with an alternative text for accessibility. Note that it is a void element, meaning it doesn't have a closing tag.
- `<a href="...">...</a>`: This tag creates a hyperlink.
- `<div></div>`:  This tag designates a container block or section for other elements.
- `<section></section>`: This tag creates a section of content.

There are many, many other tags you will encounter in the wild. You can find a complete list of tags here: [HTML Tags](https://www.w3schools.com/tags/default.asp).

In your browser, you can observe the HTML for any page you encounter using the same browser's developer tools you used to open the console. It may not make much sense depending on the page you are looking at, but it can often be a good way to to simply get a glimpse of what the HTML looks like. Open the `index.html` page in your browser and right-click on the page and select `View Source`. You should be familiar with the code you are seeing.

### HTML Attributes

In the `<html>` tag in our `index.html` file, you'll also notice we have added `lang="en"`. This is called an _attribute_. Attributes are pieces of information that are added to a tag element, and follow the syntax `attribute="value"`. They allow us to modify the behavior of the element in a variety of ways or to add information. Here we wrote `lang="en"` to define the language of the document as English (a common practice as info for the browser). 

You'll also notice, in the `<script>` tag, that we added a `src` attribute. We'll discuss this in more detail later in this lesson. Throughout the course, you'll be introduced to a variety of useful attributes that you can use to modify elements in your HTML pages. For now, however, just keep in mind the syntax so you can recognize attributes when you see them.

Now that we have some basic understanding of how an HTML document is set up, let's move on to CSS to add some style to our webpage.

## CSS

As mentioned earlier, HTML works in conjunction with CSS to define the style of a webpage. 

Examples of what CSS can help you modify include:
- What background color you want to use for the page or a paragraph.
- What font or font size you want for your headings or your normal text.
- How large you want the images, and whether you want them aligned center, left, or right.
- Where elements appear on the page.
- Whether elements are visible to a user or not.

And much more! 

### Adding A New Stylesheet

CSS files are called _stylesheets_. Let's create a new file called `styles.css` in our project so we can modify the style of our HTML page. The useful thing about stylesheets is that we simply need to create _one_, which will then control the layout of many different HTML documents.

To add a new file in VSCode, simply click on the "New File" button next to your project title in the Explorer window. Type `styles.css` into the name field and hit <kbd>Enter</kbd>. Make sure to add the `.css` extension to the name.

Next, we'll link to the `styles.css` file in our HTML file so it can be applied to our webpage. In our HTML file, we'll connect the files through a void `<link>` tag that lives inside the _parent_, or containing, `<head>` tag. Its `href` attribute is a link to our CSS document. The link tag is as follows:

```html
<link rel="stylesheet" href="styles.css">
```

The `rel` attribute is used to define the relationship between the HTML document and the CSS document. In this case, the relationship is `stylesheet` because we are linking a CSS stylesheet. The `href` attribute is used to define the location of the CSS document. In this case, the location is relative to the location of the HTML document (it lives in the same folder), so we'll just provide the name of the CSS file.

So, open the `index.html` file in VSCode and add the `<link>` to the `<head>` section like so:

```html
<!doctype HTML>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="styles.css">
    <title>My JavaScripting Master's Student Project</title>
  </head>
  <body>
    <h1>This is my project!</h1>
    <script src="script.js"></script>
  </body>
</html>
```

### Styling Elements

Next, let's start adding some styling to our page. In the `styles.css` file, let's add a background color. We'll do this by adding a `background-color` property to the `body` element. 

```css
body {
    background-color: rgb(118, 92, 120);
  }
``` 

To modify an HTML element, you first indicate which element you want to modify, followed by curly braces containing the properties you want to modify. In this case, we want to modify the `background-color` of the `body` element. Lines within the curly braces are called _declarations_, and they change the formatting of the elements in the HTML document. Each line in the declaration sets the value for a property and ends with a semicolon `;`.

To define the color, we use the `rgb()` function. This function takes three numbers as arguments that represent color values, and returns a color in the form `rgb(Red, Green, Blue)`. In this case, I'm using the RGB values for a purplish grey color, but you can use whatever color you'd like. VSCode usually comes equipped with a built-in color picker, so you can just click on the color you want and it will appear in the text field. If you can't see the color picker, you can also determine particular RGB values using [this online resource](https://htmlcolorcodes.com/color-picker/) to get the RGB value you want along with analogous colors. 

__Note:__ High contrast is very important for people with visual disabilities. So, when designing websites always ensure that the contrast between the text color and the background color (or background image) is good! See [this very useful contrast checker](https://webaim.org/resources/contrastchecker/).

If you save the CSS file and open the HTML file in your browser, you should now see the background color change.

Next, let's modify the header element a bit. Let's make it white, a different font, and a little bigger. We'll also set it to be bold and center it.

```css
h1 {
    color: rgb(255, 255, 255);
    font-size: 50px;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    text-align: center;
  }
```

As you can see, each of these aspects have their own properties you can modify. If you add this code to your file and refresh your browser, you should see the header centered and modified accordingly.

Next, let's add a paragraph with some text to our page. We'll start by adding a `<p>` tag to our HTML file, within the `<body>`. I'm going to add a very bad (sorry!) joke to my site, but you can write whatever you'd like.

```html
<!doctype HTML>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="styles.css">
    <title>My JavaScripting Master's Student Project</title>
  </head>
  <body>
    <h1>This is my project!</h1>
    <p>Q: Why did the programmer quit his job?
      A: Because he didn't get arrays.</p>
    <script src="script.js"></script>
  </body>
</html>
```

Next, let's add some styling to the paragraph. We'll follow the same process as we did for the header, but we'll make the text size a bit smaller (20px smaller, to be precise).

```css
p {
    color: rgb(255, 255, 255);
    font-size: 30px;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    white-space: pre-line;
  }
```

The other addition is the `white-space` property. This property allows you to control how whitespace is handled. In this case, I wanted to preserve the line break in the text so the question and answer are on different lines, so I set the value to `pre-line`.

If you save and reload, you should see something like the following:

![First CSS styling](/images/1_css-styling.png)

### CSS Selectors

CSS is made up of selectors with specific properties. Selectors are usually tags, ids, or classes. Let's take a look at both of the latter selectors. `id` will allow us to select a single element by its id and modify it. `class` will allow us to efficiently modify a number of elements with the same class at once.

#### Class

In our project page so far, we applied many of the same styles to the `<h1>` element as well as to the `<p>` element. For instance, we centered them both, made them both white, changed the font, etc. This works, but is ultimately repetitive and inefficient because we had to rewrite the same code. Using the `<div>` tag and classes, we can make this much easier.

First, let's create a class in our CSS file. We'll create a class called `formatText` and use it to style all the text on the page.

```css
.formatText {
    color: rgb(255, 255, 255);
    text-align: center;
    font-family: 'Roboto', sans-serif;
    white-space: pre-line;
  }
```

To create a class, we use the `.` (dot) character followed by the name of the class. We can then use the class in our HTML file. Let's use the `<div>` tag, which acts like a container for other elements, and style it with our class. Everything within the `<div>` tag will then be styled according to the `.formatText` properties.


```html
<!doctype HTML>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="styles.css">
    <title>My JavaScripting Master's Student Project</title>
  </head>
  <body>
    <div class="formatText">
      <h1>This is my project!</h1>
      <p>Q: Why did the programmer quit his job?
        A: Because he didn't get arrays.</p>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

As you can see, we use the `class` selector to style the `<div>` element with the name of the class we created. We include both text elements within the bounds of the `<div>` tag so they are both styled the same.

Back in our CSS file, we can now delete the repetitive bits. Our `<h1>` element now only needs to be distinguished by font size and boldness...

```css
h1 {
    font-size: 50px;
    font-weight: bold;
  }
```

...while our `<p>` element only needs to be distinguished by the text size.

```css
p {
    font-size: 30px;
  }
```

All together, your CSS file should now look something like this:

```css
body {
    background-color: rgb(118, 92, 120);
  }

h1 {
    font-size: 50px;
    font-weight: bold;
  }

p {
    font-size: 30px;
  }

.formatText {
    color: rgb(255, 255, 255);
    text-align: center;
    font-family: 'Roboto', sans-serif;
    white-space: pre-line;
  }
```

Save and reload the page, and you should see the same result as before. What, then, was the point? Well, by using classes we have reduced the amount of code we need to write and made it much more readable and organized. Classes are very useful when you know you want to style many elements at once with a number of common or generic properties. You can apply classes to almost any element, and every element can even have multiple classes! Just separate the names with a space, like so:

```html
<div class="firstClass secondClass thirdClass"></div>
```

This is a particularly powerful feature of classes.

##### ID

In contrast to classes, IDs are unique. They are used to identify a _single_ element in the HTML file rather than many. This is useful when you want to style a single element, but you don't want to style every element with the same properties.

Let's say we wanted to set our joke apart from the header text a bit. Let's add a border around the joke text and provide it with a different background and font color. Let's also add a second joke to the page.

There are several ways we could do this, but the best might be to use a _flexbox_. Flexbox is a method to lay out elements in a way that is more efficient than using absolute positioning (or manually figuring out height, width, and dimensions of the page). It is a way to allow for a dynamic positioning of elements on a particular page. This layout also makes elements responsive, which means that the elements change their behavior according to the kind of device displaying them. No matter if you are viewing the page on a mobile phone or a computer monitor, the elements will be provided with appropriate position and symmetry. In general, flexbox is one of the best methods for vertically and horizontally centering elements because it’s responsive and doesn’t require margin calculations.

Let's start by creating a new section in our HTML file, and adding a new `id` of `joke` to designate it as the joke section. I'll also add a new bad joke, this time at the expense of academics:

```html
<!doctype HTML>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="styles.css">
    <title>My JavaScripting Master's Student Project</title>
  </head>
  <body>
    <div class="formatText">
      <h1>This is my project!</h1>
        <section id="joke">     
          <p>Q: Why did the programmer quit his job?
          A: Because he didn't get arrays.</p>
          <p>Q: What's the difference between an academic and a genie?
          A: One grants wishes, the other wishes for grants.</p>
        </section>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

You can see that we have now designated a new `<section>` with an `id` of `joke`. Next, let's move to our CSS file to define the properties for the section.

The syntax for ids is mostly the same as classes, but instead of using the `.` (dot) character, we use the `#` (hash) character:

```css
#joke {
    border: 5px solid rgb(16, 29, 55);
    background-color: rgb(118, 125, 158);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin: 0 auto;
    color: rgb(255, 230, 204);
  }
```

We have several new things here, so let's break them down. First, we create a border around the joke text. We use the `border` property to set the border width (`5px` = 5 pixels) and style. `solid` indicates a solid fill border, and we set the color to a dark blue. We also use the `display` property to set the display type of our `joke` id to `flex`. This is defining our flexbox layout. We use the `flex-direction` property to set the direction of the layout to `column`. Flexboxes can utilize horizontal rows (this is defining their "direction") as well as a columnar structure. Choosing columns allows us to place jokes one below the other on our page and make it easier to read. In other words, each `<p>` element within the joke `<section>` will appear evenly spaced below the first as a long column of jokes.

 We then use the `justify-content` and `align-items` properties to set the alignment of the elements to `center`. This means that the elements (the jokes) will be aligned in the center of the flex container. We use the `width` property to set the width of the overall flex container to 50% of the width of the screen, and we use the `margin` property to set the margin to `0 auto`. This means that the container will be centered on the screen (the margins will be even on each side and it will warp to 50% of the screen width). Finally, we use the `color` property to set the text color to a light peach color.

 If you save and reload the page, you should now see something like the following:

![joke id](/images/2_css-styling.png)

Nice! You'll notice that even though the id is located within the `.formatText` class (i.e., the parent class) and that its styling is still being applied, you can nest ids and classes within each other to override the particular styling of the parent or container they are in. This allows you to create a complex hierarchy of styles that can be applied to many elements at once.

By creating a joke id we now have a specific section to hold and style all our terrible jokes. At this point I might encourage you to check out the [flexbox guide here](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) to learn a bit more about flexboxes, as they are incredibly useful for modern CSS.

Additionally, while there are far, far too many CSS properties to cover in this course, I also urge you to at least peek through the [entire CSS reference library](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) and bookmark it. Try looking up the `flex` property, or any of the other properties we have used so far.

### External, Internal, and Inline CSS

As a final note about CSS, in this course we are using an _external_ CSS file, meaning it is its own separate file that we have to link to in our HTML. This is the recommended way to utilize CSS. However, it is possible to use CSS directly in your HTML file as well, through both _internal_ and _inline_ methods. If you are curious, you can visit [this page to understand the differences](https://www.w3schools.com/css/css_howto.asp) between these methods. In general, however, just keep in mind that using external CSS files is the preferred method of using CSS.

## JavaScript

So far, we have just been using HTML and CSS to style our page. The only bit of JavaScript we have is linked through the `<script>` tag, located in the `<body>` of the HTML file:

```html
    <script src="script.js"></script>
```

The `src` (source) attribute is used to link to the JavaScript file `script.js`. This is the file that contains the code that will be executed when the page loads. At the moment, the only thing it is doing is alerting the user that your project is going to be awesome.

In the next lesson, we will learn how to use JavaScript to create a more complex webpage with some actual interactivity. For now, let's just review some of the concepts we've learned so far concerning HTML and CSS.

## Review Questions

1. How do we associate a CSS stylesheet with a HTML file? (select one)

<Quiz>
- By including a link to the CSS file in the HTML page's `<head>` element.*
- By including the CSS file in the HTML page's `<body>` element.
- By sheer coincidence.
</Quiz>

2. True or False - ids are created using the `.` (dot) character and classes are created using the `#` (hash) character.

<Quiz>
- True
- False*
</Quiz>

3. True or False - Flexboxes are useful because they allow for a dynamic layout of elements on a page.

<Quiz>
- True*
- False
</Quiz>

## Challenges

1. Add another joke of your own to the jokes section of your page.

2. Add a link in the jokes section to an online list of jokes using the `<a href=""></a>` tag. To learn about this tag, [see this page](https://www.w3schools.com/Html/html_links.asp).

3. Create a new `<section>` in your HTML file to display your favorite poem. In CSS, give it an appropriate id, and define the section as a centered flexbox with a different border, background color, and text color.

4. Push all your changes to the project to GitHub.

## Key Terms

Do you remember the meaning of the following terms?

- self-closing or void tags
- metadata
- attributes
- class
- id
- flexbox

## Download the Project

Here are the course files we created for this lesson if you need a reference:

<Download files='8_index.html, 8_script.js, 8_styles.css'> <br/>

# Interactive Web Design

Now that you have a basic understanding of HTML and CSS, let's begin using JavaScript to add more interactivity to your webpage. 

Just as a note, for the rest of this course, we will be switching back and forth between environments (e.g., VSCode, the browser, the console) as well as between languages (e.g., JavaScript, HTML, and CSS) fairly often. This might be a little confusing and disorienting at first, but with a bit of practice it will eventually begin to feel more natural. 

Before we get to working with JavaScript, there are a few things we'll want to do. The first is to get a local server up and running so we can test our code on the fly, and the next will be to incorporate the jQuery library into our code. Let's accomplish these now.

## Running a Live Server in VSCode

So far, we have simply double-clicked the `index.html` file in your computer's file system and opened it in the browser. This is a perfectly fine way to get started previewing our webpage, but it may cause issues as we add more complexity. To address this, let's add an extension to our VSCode that will allow us to run a local web server to load and preview our webpages.

Open up your project in VSCode. Next, click on the Extensions button in the sidebar.

![vscode extension](/images/open_extensions.png)

In the search field, type `live server` and press enter.

Open the Live Server extension (it will likely be the first search result, see below for specifics), and click Install.

![Live Server](/images/live_server.png)

Once installed, you should see a new button in the taskbar on the bottom-right of VSCode that says "Go Live".

![Go Live](/images/go_live.png)

Clicking this button will open a new window that will load your webpage in the browser. Now, you can make changes to your page and, after saving the file in VScode, you can see your changes immediately reflected in the browser. Try changing some of the text on your page, saving it, and returning to your page in the browser. You should see your changes display, without even needing to reload the page. 

Pretty neat, right?

To shut down the server, simply click on the button (now showing the port #) in the taskbar again.

## Importing jQuery

Next, we will incorporate the __jQuery library__ into our code. JQuery is an open-source JavaScript library that allows us to build our webpage without needing to reinvent the wheel in terms of common functionality. It takes many of the typical tasks that would usually take many lines of JavaScript or HTML code to accomplish, and simplifies them into functions that you can call with a single line of code. In short, it is a "library" in the sense that it provides us with many pre-written functions that we can use to make our webpage writing much more simple and efficient.

First, we need to import the jQuery library into our code. To do this, we need to add another script tag to our HTML file. Above the `script.js` import in the `<body>`, add the following line:

```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```

Here we are importing the jQuery library from the [jQuery CDN](https://code.jquery.com/) (Content Delivery Network). In other words, our `src` attribute is directed to the web server `code.jquery.com` and is told to download the source file `jquery-3.6.0.min.js`, which is the latest version of jQuery (at the time of writing this).

Next, let's learn how to use jQuery to perform some basic tasks.

## Using jQuery

### Selecting Elements

The first function we will cover is the __jQuery selector__, which is one of the most important functions in jQuery. It allows us to select and manipulate HTML elements on our page. It is used to "find" HTML elements based on their name, id, class, type, and other attributes.

All selectors start with a dollar sign followed by parentheses: `$("")`. A selector takes a single argument in the parentheses (set between double quotes `""`), which is the element we want to modify. Let's look at some basic examples.

### Selecting the Header

Currently, our header in the `<h1>` tag seems a bit unnecessary. All it is doing is telling us `This is my project!`, which is information we clearly already know (and which also doesn't do much for the visitor to the site). We could, of course, simply change the text to something more appropriate, but to show you the power of jQuery selectors, let's play around with this element a bit and see how we can use JavaScript to modify it.

First, we could simply hide the header from our page so that visitors to the site would not see it. In your `script.js`, add the following line:

```JavaScript
$("h1").hide();
```

We begin by selecting `$` the `h1` element of our page, and then we use the `.hide()` method to hide the element. This will remove the header from view on our page, but keep it in our HTML code. Save the file and check out your page in the browser. The header with the message `This is my project!` should now be hidden from view.

What happens now if we add a new header to replace the old one? Let's try it out. In your `index.html`, add a new header below the old one:

```html
<h1>This is my project!</h1>
<h1>Bad Jokes Galore!</h1>
```

Save the file and check out your page in the browser. What happens?

Nothing, right? The new header is not visible to the visitor either. This is because by using the `$("h1")` selector to hide, we are selecting _all_ the `h1` elements in our page. In other words, any `<h1>` tag we try to add will be hidden from view.

### Selecting by ID

Let's address this by utilizing an __ID selector__ instead. This will allow us to select a single element. In your `index.html`, let's define an id `noShow` for the header we specifically want to hide, like so:

```html
<h1 id="noShow">This is my project!</h1>
<h1>Bad Jokes Galore!</h1>
```
Next, let's change our selector so that only the element with the id `noShow` is hidden instead of all `h1` elements. In your `script.js`, change the original hide code to the following:

```JavaScript
$("#noShow").hide();
```

To select by id, we use the `#` (hash) symbol followed by the id name (this is, as you might recall, the same when styling by id in CSS). If you save and view the page, you should now see the old header hidden from view, but the new header still visible:

![id selector](/images/id_selector.png)

Great!

...well, perhaps we think these jokes are getting too much flak. In fact, let's consider that these may actually be the best jokes ever. Why don't we change the text of the header to reflect this more positive attitude (no matter how misguided it may be)? We could, of course, simply change the text manually in the HTML file, but we can also use the `.html()` method to change the text of an element entirely in JavaScript.

In your `script.js`, add the following line:

```JavaScript
$("h1").html("The Best Jokes Ever!");
```

If you save and check your page, you should now see the header text changed to `The Best Jokes Ever!`. 

![change header](/images/change_header_text.png)

Keep in mind, again, that because we are specifying the `h1` tag, this will change the text of _all_ `h1` elements in the page to "The Best Jokes Ever!" If you were to add another header anywhere on the page, it would also change the text to "The Best Jokes Ever!". This is clunky and wouldn't be advised for more complex webpages, but will work for now just for demonstration purposes.

### Selecting by Class

Selecting by class is the same as selecting by id, but instead of using the `#` symbol, we use the `.` (dot) symbol. You can select any class element with the following syntax:

```JavaScript
$(".className")
```

This will allow you to modify or manipulate all elements with the class `className` in the page, just as you did with the id selector.

### Appending Elements

Let's say we wanted to add a new joke to our page. We could simply add a new `<p>` tag to our HTML file like we did in earlier lessons, but we can also add elements with jQuery. It makes sense to use JavaScript here anyway--for instance, what if we wanted users to be able to post their own jokes to the page? We would want a way to automatically update the list of jokes rather than doing it manually ourselves in HTML. 

So, let's use the `.append()` method to add a new joke to our `joke` section. In your `script.js`, add the following line:

```JavaScript
$("#joke").append("<p>Q. What do you call a fake noodle? <br /> A. An impasta</p>");
```

Here we are identifying the element with the id `joke` (used for our joke `<section>`) and adding a new paragraph `<p>` element to it. To keep a line break between the question and answer, we use the self-closing HTML `<br />` (break) tag in between. Save the file and check out your page in the browser.

![append joke](/images/append_joke.png)

Cool, we now have three ~~terrible~~ amazing jokes on our page.

To wrap up, keep in mind that...
- `$("")` is the jQuery selector.
- To select an element by id, use `#` followed by the id name.
- To select an element by class, use `.` followed by the class name.
- You can use methods like `.hide()` and `.html()` and `.append()` to modify elements that you select. 

## Adding Interactivity

Okay, we have learned how to use jQuery to select and manipulate elements on our page. However, we still don't have any real interactivity. As a basic example, let's add a button that will allow us to show and hide the jokes section from view on the page.

### Creating a Button

To create the button, add the following code to your `index.html` file, underneath your header tags:

```html
<button id="toggleJokes">Toggle Jokes</button>
```

Here we have a simple `<button>` element set to an id `toggleJokes`. If you save your file, you should now see a button on the page above your jokes section.

You can see that it doesn't look very good at the moment, so why don't we add a bit of styling to make it better? Now, we could simply style the button in our CSS file like we did with other elements in the page. For example, to make the button orange, with larger white text, a border, some padding, and some margin space around the button to separate it from other elements, we could add the following code to our `style.css` file:

```css
#toggleJokes {
    background-color: orange;
    color: white;
    font-size: 20px;
    border: 1px solid white;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
}
```

Here we are styling the button with the id `toggleJokes` using the CSS styling techniques we learned about earlier. This would probably be the best and most efficient way to style the button. However, you can also style an element entirely in JavaScript. Why don't we try this instead?

### CSS Styling in JavaScript

We can use the `.css()` method to add styling to any element. For example, take a look at the code below:

```JavaScript
// modify css styles for the button
$("#toggleJokes").css("background-color", "orange");
$("#toggleJokes").css("color", "white");
$("#toggleJokes").css("font-size", "20px");
$("#toggleJokes").css("padding", "10px");
$("#toggleJokes").css("border-radius", "5px");
$("#toggleJokes").css("border", "2px solid black");
$("#toggleJokes").css("margin", "10px");
```

Here, we are modifying the the many CSS properties of the button with the id `toggleJokes`. When using the `.css()` method, you must specify the property name and the value you want to set it to. As you can see, we use the same properties and values as we do when writing regular CSS styles. JavaScript, HTML, and CSS are very interwoven languages.

Instead of writing a bunch of separate lines, we can also use the `.css()` method to modify the styles of multiple properties of an element at once. To do so, you simply wrap the properties in curly braces and separate them with a comma, writing them out as you would in a typical CSS style sheet:

```JavaScript
// modify css styles for the button
$("#toggleJokes").css({
    "background-color": "orange",
    "color": "white",
    "font-size": "20px",
    "padding": "10px",
    "border-radius": "5px",
    "border": "2px solid black",
    "margin": "10px"
});
```

This is functionally the same, but is cleaner and easier to read. Add this code to your `script.js` file and save your file. You should see something like the following:

![Button Styling](/images/style_button.png)

A bit ugly still, but at least it has some flavor. Again, while it is preferred to define your styles _within your CSS stylesheet_ (like we did initially), you can see how JavaScript can add dynamic styles to your elements as well. Each language forms a part of the whole to define the user's experience.

Speaking of user experience, if you try clicking on the button, you'll notice it doesn't do anything yet. Let's add some proper interactivity to it.

### Making the Button Clickable

We'll want this button to both show and hide the jokes section. Now, we could write a somewhat complex function that would `hide()` the jokes section when the button is clicked (and when the text is displayed), while also `show()` the jokes section when the button is clicked (when the text is hidden), but here's an example of jQuery to the rescue, simplifying things for us. You can simply use the `.toggle()` method to toggle the display (visible/invisible) of a particular element.

To accomplish this, however, we need to make the button clickable in the first place. We can do this by using another jQuery method, `.click()`, which will add a click __event__ to the button. You can think of events as "things that happen" to your HTML elements (text fields being typed in, buttons being clicked, etc). So, in your `script.js`, add the following lines:

```JavaScript
$("#toggleJokes").click(function() {
  $("#joke").toggle();
});
```

First we select the button with the id `toggleJokes` and then add a click event to it. We attach a simple function to the `click()` event so it will run when the click occurs. This function selects the `joke` section and adds a `.toggle()` method to it.

If you save and check your page, you should now be able to click on the button and see the jokes section disappear and reappear. 

Very well done! You're already a successful web developer.

## Additional jQuery Methods

There are many, many more jQuery methods available (way too many to cover). You can find a full list of them [here](http://api.jquery.com/).

As their slogan has it, with jQuery the intent is to "write less, do more". It allows you to very easily perform tasks and manage behaviors on your page without having to write lengthy, complicated code for common situations. As your web project grows more interactive, the potential for using more jQuery grows along with it.

## Review Questions

1. True or False - Unless you specify otherwise, a selector will select all elements of the same type on a page.

<Quiz>
1. True*
2. False
</Quiz>

2. True or False - To select an element by id, use `#` followed by the id name.

<Quiz>
1. True*
2. False
</Quiz>

3. True or False - To select an element by class, use `.` followed by the class name.

<Quiz>
1. True*
2. False
</Quiz>

## Challenges

1. Add an image somewhere on the page. You can [learn how to add images here](https://www.w3schools.com/html/html_images.asp). Note that you will have to save the image within your project folder to be able to load it into your page.

2. Using selectors, give the image [rounded corners](https://www.w3schools.com/css/css3_borders.asp) in CSS or JavaScript.

3. `Prompt()` the user whether the jokes on our page are good or bad. If the user responds with "bad", then change the header text to "The Worst Jokes Ever!". If the user responds with "good", keep the header text as "The Best Jokes Ever!".

4. Add a button to the page that will change the page's overall color scheme (background color, text color, etc.).

5. Push all your changes to GitHub.

## Key Terms

Do you recall these terms?

- jQuery
- selector
- events

## Download the Project

Here are the course files we created for this lesson if you need a reference:

<Download files='9_index.html, 9_script.js, 9_styles.css'> <br/>

# Building a Data-Driven Webpage

Let's begin putting all our knowledge together to build a data-driven webpage that is more useful than simply a list of unfunny jokes. In this lesson, we'll build a digital version of a famous poem that will allow users to click on aspects of the poem to see more information about the literary devices being used. It is meant to be an educational tool for anyone who is interested in the techniques utilized in the poem.

As a preliminary note, this lesson might take you a bit longer to get through. We will be learning about a variety of important new concepts, so take your time and try to understand each step before moving on. 

Are you ready? 

Let's get into it!

## The Poem

Because we are all in NYC and have likely experienced the throbbing, perpetual daylight of Times Square, as a dataset let's work with Walt Whitman's famous poem _Broadway_, published in 1888. Here is the poem in its entirety:

    Broadway
    Walt Whitman

    What hurrying human tides, or day or night!
    What passions, winnings, losses, ardors, swim thy waters!
    What whirls of evil, bliss and sorrow, stem thee!
    What curious questioning glances- glints of love!
    Leer, envy, scorn, contempt, hope, aspiration!
    Thou portal- thou arena- thou of the myriad long-drawn lines and groups!
    (Could but thy flagstones, curbs, facades, tell their inimitable tales;
    Thy windows rich, and huge hotels- thy side-walks wide;)
    Thou of the endless sliding, mincing, shuffling feet!
    Thou, like the parti-colored world itself- like infinite, teeming,
    mocking life!
    Thou visor'd, vast, unspeakable show and lesson!

Our goal will be to create a page that prints these lines and turns certain parts into clickable elements. When the user does click, the page will display a message below the text that contains information about that element.

## Setting Up the Page

Let's create a new page specifically for our poem. Perhaps the simplest way for now will be to just create a link to our page in the `index.html` file. So, within the `<div>` container on your page, add the following code for a link:

```HTML
<h2><a href="poem.html">Walt Whitman's <em>Broadway</em></a></h2>
```

The `<em></em>` tags stand for emphasis, which allows us to italicize words.

Next, create a new file (by clicking the New File button in the VSCode Explorer Window) called `poem.html`. Paste into it this basic structure:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Walt Whitman's Broadway</title>
    <link rel="stylesheet" href="poem.css">
  </head>
  <body>
    <div class="container">
      <h1><em>Broadway</em> by Walt Whitman</h1>
      <div id="intro">
        <p>Welcome to the page for Walt Whitman's poem <em>Broadway</em>. Click on elements to see more information about them.</p>
      </div>
      <div id="poem">
      </div>
      <div id="info">
      </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="poem.js"></script>
  </body>
</html>
```

You'll see that we are adding a new dedicated stylesheet to work with `poem.css`, as well as a new script file to work with `poem.js`. Let's go ahead and create those now (again click New File > `poem.css` and `poem.js`).

Use the "Go Live" button to see your new page and make sure you are seeing the intro text display. 

Now that we have a page, let's convert our poem into usable JavaScript data.

## Converting the Poem into Data

We have seen how both `arrays` and `objects` allow us to store large quantities of data. Here we have 11 lines of a poem, with a variable amount of words per line. We want to be able to manipulate each word as well as each line, if needed.

We could envision an array of `lines`, that stores another array of `words`. But, just like we did with our Student Grades program in a previous lesson, it would probably be best to create an `array` containing a series of `objects`. 

Let's take a look at what this might mean for the first line of the poem. 

```JavaScript
let line1 = [{text:  "What"}, {text: "hurrying"}, {text: "human"}, {text: "tides"}, {text: "or"}, {text: "day"}, {text: "or"}, {text: "night!"}];
```

Here we have the first line of the poem, broken up into words. Each word is an `object` with a `text` property that designates each word of the poem.

### The `map()` Method

To perform an operation on each of these elements, we can use a new JavaScript method called `map()`. This method allows us to iterate over each element of an array and perform an operation (specifically, a function) on each element.

This method takes the function as an argument and runs that function's operations as it iterates. In doing so, it will create a new array that you can use to store the results of the function without altering the original array.  In short, you use `.map()` whenever you want to build an array out of another array. In this case, we want to create a new array that contains the text of each word in the poem.

```JavaScript
let line1TextArray = []
line1TextArray = line1.map(function(word) {
  return word.text;
}); 
```

`.map()` here creates a new array out of the array of word objects, and this new array contains just the `.text` property (the words) of each object. 

Now, we can put the phrase back together using another new method.

### The `join()` Method

The `join()` method returns an array as a string. In other words, when applied to our array of words, it will return them together as a string, with spaces in between each word.

```JavaScript
let line1Text = line1TextArray.join(" ");
```

Let's put it all together in our `poem.js` file to see what it looks like.

```JavaScript
$("#info").html("<p>The info will go here.</p>");
let line1, line1Text; // don’t need the intermediate step of line1TextArray
line1 = [{text:  "What"}, {text: "hurrying"}, {text: "human"}, {text: "tides"}, 
    {text: "or"}, {text: "day"}, {text: "or"}, {text: "night!"}];
line1Text = line1.map(function(word){
    return word.text;
    }).join(" ");
$("#poem").html("<p>" + line1Text + "<br /></p>");
```

If you save and check your page in the browser, you should see that we have successfully displayed the first line of the poem.

![Poem first line](/images/poem_first_line.png)

## Adding Information to the Poem

Next, we'll want a way to display information about certain elements of the poem. To indicate which ones, we can add another property to specific word objects. Let's add a new property `info` that will provide information about the literary device being used.

```JavaScript
    line1 = [{text:  "What", info: "Anaphora: The repetition of a word or phrase at the beginning of (usually successive) lines. For example, the use of What in the first four lines."}, 
        {text: "hurrying"}, {text: "human"}, {text: "tides"}, 
        {text: "or"}, {text: "day"}, {text: "or"}, {text: "night!"}];
```

Here you can see that we have added a new `info` property to the first word of the poem to describe the technique of [anaphora](https://literarydevices.net/anaphora/). 

This way, we can send this info down to the `#info` div on the page when the user clicks the word. 

## Making Elements Clickable

You might recall our brief discussion of _events_ in the previous lesson. Events are the actions that occur when a user interacts with a certain element. For instance, when a user clicks on a button, a certain event occurs. 

We want the user to be able to click on a word to find the appropriate information about it. Do you recall how we might accomplish this?

We can use the `click` event, of course! It will allow us to listen for a user's click on a certain element. To do this, however, we'll need to revamp our code a bit. We want to use word-size chunks of data here, so we'll need to get rid of our `.join()` method from before and instead iterate through the array word by word.

For now, just paste the following to overwrite all your current code:

```JavaScript
$("#info").html("<p>The info will go here.</p>");
let line1, line1Text; // don’t need the intermediate step of line1TextArray
line1 = [{text:  "What", info: "Anaphora: The repetition of a word or phrase at the beginning of (usually successive) lines. For example, the use of What in the first four lines."}, 
    {text: "hurrying"}, {text: "human"}, {text: "tides"}, 
    {text: "or"}, {text: "day"}, {text: "or"}, {text: "night!"}];
// Create a blank string that opens two tags.
line1Text = "<blockquote><p>"; // opening tags for blockquote and p, we close them in the loop below
line1.map(function(word){
  // Add in the word object’s .text property plus a space.
  line1Text = line1Text + word.text + " ";
});
// Break the line and close the two tags.
line1Text = line1Text + "<br />(line 2 would go here)</p></blockquote>";
$("#poem").html(line1Text);
```

If you save and check your page, you'll see functionally the same result as before. We use the `map()` method to iterate through the array of word objects, setting `line1Text` to the `.text` property of each word object and add spacing. We then use the `.html()` method to set the `#poem` `<div>` to the string we created. 

Next we'll want to check if a specific word has an `info` property. We can accomplish this by using an `if` statement within our `map()` method, like so:

```JavaScript
line1.map(function(word){
  // Define a variable that will be the entirety of a single
  // word-sized chunk of information.
  let wordString;
  wordString = word.text;
  // Test to see if the .info property exists.
  if (word.info){
    // If it does, surround wordString in an <a> tag.
    wordString = "<a href='#'>" + wordString + "</a>";
  }
  // Add wordString plus a space to the line1Text.
  line1Text = line1Text + wordString + " ";
});
$("#poem").html(line1Text);
```

For each word in the array, we check to see if it has an `info` property using an `if` statement (if word.info == True). If it does, we add an `<a>` tag to the word, which will turn the word element into a clickable link. By capturing this in `wordString`, we can add it to the overall `line1Text` string phrase as usual. Otherwise, `wordString` will just be the word itself and get added as well.

If you save, you should be able to see the poem with "What" now clickable. If it you do click it, however, nothing will happen yet. Let's add in our `click` event listener:

```JavaScript
$("#poem a").click(function(){
    $("#info").html("<h2>You clicked on a word!</h2>");
  });
```

If you save and click on the word now, you should see "This is where the info will go" replaced by "You clicked on a word!". What's happening here is that we're listening for a click on every element in the page marked with an `<a>` tag (by using `#poem a`). Because we marked "What" with an `<a>`, the `.click` event knows to trigger. When that happens, we're setting the `#info` `<div>` to the text "You clicked on a word!".

All together, the code looks like this: 

```JavaScript
$("#info").html("<p>The info will go here.</p>");
let line1, line1Text; // don’t need the intermediate step of line1TextArray
line1 = [{text:  "What", info: "Anaphora: The repetition of a word or phrase at the beginning of (usually successive) lines. For example, the use of What in the first four lines."}, 
    {text: "hurrying"}, {text: "human"}, {text: "tides"}, 
    {text: "or"}, {text: "day"}, {text: "or"}, {text: "night!"}];
// Create a blank string that opens two tags.
line1Text = "<blockquote><p>"; // opening tags for blockquote and p, we close them in the loop below
line1.map(function(word){
  // Define a variable that will be the entirety of a single
  // word-sized chunk of information.
  let wordString;
  wordString = word.text;
  // Test to see if the .info property exists.
  if (word.info){
    // If it does, surround wordString in an <a> tag.
    wordString = "<a href='#'>" + wordString + "</a>";
  }
  // Add wordString plus a space to the line1Text.
  line1Text = line1Text + wordString + " ";
});
$("#poem").html(line1Text);
$("#poem a").click(function(){
    // Define the text and the word that was clicked.
    let infoText, clickedWord;
    clickedWord = $( this ).text();
    infoText = "<h2>You clicked on the word: " + clickedWord + "</h2>";
    $("#info").html(infoText);
  });
```

Okay, we now have clickable elements that allow us to display info about words. However, we want to actually display the info in the `info` property we wrote out.

There are a few steps we'll need to take to carry this out.

## Accessing the Info Property

We have two things to accomplish here. First, we want to send specific information to the `#info` div. Second, we want that data to be the `info` property of the word that was clicked.

Let's tackle the first part. We'll need to modify our `click` event:

```JavaScript
$("#poem a").click(function(){
    // Define the text and the word that was clicked.
    let infoText, clickedWord;
    clickedWord = $( this ).text();
    infoText = "<h2>You clicked on the word: " + clickedWord + "</h2>";
    $("#info").html(infoText);
  });
```

We have a new element introduced here: the keyword `this`. In this context, `this` indicates a reference to the object that is currently being acted upon (e.g., whatever word that was just clicked). In short, we can use `this` to access the `.text` property of the word that was just clicked, whichever word that may be.

We haven't quite accomplished what we want here, but we're getting there. We can now access at least the `.text` property of the word that was clicked, but we still need to get at the `.info` property.

To do this, we'll need to use __data attributes__. Data attributes allow us to store data on an element and access it. They are custom-made attributes that we can apply on HTML elements.

Let's make one, called `data-info`, and use it to modify the string of text we create in our `.map()` method:

```JavaScript
line1.map(function(word){
  // Define a variable that will be the entirety of a single
  // word-sized chunk of information.
  let wordString;
  wordString = word.text;
  // Test to see if the .info property exists.
  if (word.info){
    // Add the data-info attribute to the word.
    wordString = "<a href='#' data-info='" + word.info + "'>" + wordString + "</a>";
  }
  // Add wordString plus a space to the line1Text.
  line1Text = line1Text + wordString + " ";
});
```

Here we have added a new data attribute and utilized it to store the `.info` property of the word that was clicked. Be careful about copying this correctly: you'll notice that we need to close the opening `<a` and `data-info` attribute with a `>` closing tag, as well as correct opening and closing quotes to indicate the info is a string.

If you check the HTML element inspector in your browser, you should see that the info text is now stored in the `data-info` attribute.

We can now access this data attribute in our `click` event listener, using the `.data` method:

```JavaScript
$("#poem a").click(function(){
    let infoText, clickedWord, clickedInfo; //variables to capture the info text and the clicked text/info
    clickedWord = $( this ).text(); // get the clicked word
    // .data("info") looks for the data-info HTML attribute.
    clickedInfo = $( this ).data("info"); // get the info from the clicked word using .data
    infoText = clickedInfo; // set the info text var to the clicked info
    $("#info").html(infoText); // change the info div to the info text
  });
```

If you save and try to click on the word now, you should be rewarded with the info that was stored in the `.info` property about anaphora.

Okay! So far so good. We've added in the ability to display info about words. However, all we currently have is one line of text. Surely we'd like to add _all_ the lines of the poem, right? Let's go about doing that now.

## JSON

To use our dataset (our poem) more efficiently, we'll use JSON. JSON stands for JavaScript Object Notation. We can use a JSON object (as a separate file) to store our poem data, and then use that data to populate our poem. 

JSON, as a data format, allows us to store data in a structured way and utilize it in a variety of ways in JavaScript. Like object syntax you have seen so far, JSON object data is written in key/value pairs. For instance, here's a object containing details about an example person named Sal Ami in JSON:

```JSON
{
   "firstName": "Sal",
   "lastName": "Ami",
   "age": 30,
   "streetAddress": "404 JavaScript Dr",
   "city": "JavaTown",
   "state": "JA",
   "postalCode": "12345",
   "phoneNumbers": [
      { "Mobile": "111-111-1111" },
      { "Home": "222-222-2222" }
   ]
}
```

As you can see, we store data in key/value pairs as usual, and we can use both object and array syntax.

Using JSON, we can store our poem in a file called `poem.json`. As you might imagine, writing it all out is a bit of a pain, so luckily for you I've already done it. Download the `poem.json` file from the button below and save it to your working folder.

<Download files='poem.json'><br />

If you open the file in VSCode, you can see that we have stored the lines of the text in a similar fashion as we did before, with a `text` property for each word of the poem. I also went ahead and added a few extra literary devices for the first half of the poem and listed them as `info`. 

In general, just keep in mind that:
1. JSON objects are very much like JavaScript objects.
2. JSON objects are written in key/value pairs.
3. JSON objects are surrounded by curly braces `{ }`.
4. Keys must be strings, and values must be a valid JSON data type (string, number, object, array, boolean or null).
5. Keys and values are separated by a colon.
6. Each key/value pair is separated by a comma.
7. Arrays are enclosed in square brackets `[ ]` and each element is separated by a comma.

Now that we have a full JSON file with our poem, let's use it to populate our page with the text. We'll need to revamp our code one more time to accomplish this. 

To clearly observe the logic of what we have so far, let's take a look at the 3 different parts to our program:

```JavaScript
//Part 1 - Define the extra information section for the poem
$("#info").html("<p>Extra info will go here.</p>");

// Part 2 - Display the first line of the poem and access info from the poem object if it exists
let line1, line1Text;
line1 = [{text:  "What", info: "Anaphora: The repetition of a word or phrase at the beginning of (usually successive) lines. For example, the use of What in the first four lines."}, 
    {text: "hurrying"}, {text: "human"}, {text: "tides,"}, 
    {text: "or"}, {text: "day"}, {text: "or"}, {text: "night!"}];
line1Text = "<blockquote><p>"; 
line1.map(function(word){
  let wordString;
  wordString = word.text;
  if (word.info){
    wordString = "<a href='#' data-info='"+ word.info + "'>" + wordString + "</a>";
  }
  line1Text = line1Text + wordString + " ";
});
$("#poem").html(line1Text);

// Part 3 - Add the click event to the poem
$("#poem a").click(function(){
    let infoText, clickedWord, clickedInfo;
    clickedWord = $( this ).text();
    clickedInfo = $( this ).data("info");
    infoText = clickedInfo;
    $("#info").html(infoText);
  });
```

I have deleted all the earlier comments, so just look at the three new ones I've added here. We can see that we have 3 parts to our program:
- Part 1 - Define the extra information section for the poem
- Part 2 - Display the first line of the poem and access `info` from the poem object if it exists
- Part 3 - Add the click event to the poem

It is clear that we'll need to revamp part 2 to display the full data from the JSON file instead of just the first line we manually inputted. Let's do just that. We'll use the `getJSON` method to retrieve the data from the JSON file. We'll also create a new variable that will store all the text of the poem garnered from the JSON file.

```JavaScript
//Part 1 - Define the extra information section for the poem
$("#info").html("<p>Extra info will go here.</p>");

// Part 2 - Display the first line of the poem and access info from the poem object if it exists
$.getJSON("poem.json", function(data){ // data variable is the JSON object
  let poemText; // Define a new variable to hold all text
  poemText = "<blockquote><p>"; // Open the starting tags
  // Now you can iterate (map) over the data variable’s .lines property:
  data.lines.map(function(line){ // We get a variable, line
    // Define a blank lineText.
    let lineText = "";
    // Now iterate over each word. This part should be familiar to you from before
    line.map(function(word){
      let wordString;
      wordString = word.text;
      if (word.info){
        wordString = "<a href='#' data-info='" + word.info + "'>" + wordString + "</a>";
      }
      lineText = lineText + wordString + " "; // Add the word to the lineText variable with spacing
    });
    // Add lineText with a line break to the poemText
    poemText = poemText + lineText + "<br/>";
  });
  // Close the poemText tags
  poemText = poemText + "</p></blockquote>";
  // Replace the content of #poem
  $("#poem").html(poemText);
  // Now that we have the data, we can add the click event to the poem
  $("#poem a").click(function(){
    let infoText, clickedWord, clickedInfo;
    clickedWord = $( this ).text();
    // .data("info") looks for the data-info HTML attribute
    clickedInfo = $( this ).data("info");
    infoText = clickedInfo;
    $("#info").html(infoText);
  });
}); // Close the getJSON method and callback function
```

There is some new syntax and logic here, so try to follow along with the comments. We're first using a selector and the `getJSON()` method to retrieve the data from the JSON file. `getJSON()` takes two arguments: the source of the JSON file, and what's called a __callback function__. Callback functions are functions that are passed in as arguments to other functions. In this case, we're passing in a function that takes one argument, which is the `data` from the JSON file.

In other words, the essential moves of the code are as follows:
- Run the `getJSON()` method, passing in the `poem.json` file as the source.
- Call the callback function, passing in the `data` variable (the JSON object).
- Create a new variable to hold all the text of the poem.
- `map()` over the data variable's `lines` property.
- `map()` over each word in each line.
- Make elements clickable if they have `info` data.
- Add each line to the `poemText` variable with a line break, and add the text to the `#poem` element.
- Run the `click()` method on the `#poem` element, to see if the user clicks on a word.

All together, your program should now look something like this:

```JavaScript
//Part 1 - Define the extra information section for the poem
$("#info").html("<p>Extra info will go here.</p>");

// Part 2 - Display the poem and allow for clicking on words
$.getJSON("poem.json", function(data){ // data variable is the JSON object
  let poemText; // Define a new variable to hold all text
  poemText = "<blockquote><p>"; // Open the starting tags
  // Now you can iterate (map) over the data variable’s .lines property:
  data.lines.map(function(line){ // We get a variable, line
    // Define a blank lineText.
    let lineText = "";
    // Now iterate over each line. This part should be familiar to you from before
    line.map(function(word){
      let wordString;
      wordString = word.text;
      if (word.info){
        wordString = "<a href='#' data-info='" + word.info + "'>" + wordString + "</a>";
      }
      lineText = lineText + wordString + " "; // Add the word to the lineText variable with spacing
    });
    // Add lineText with a line break to the poemText
    poemText = poemText + lineText + "<br/>";
  });
  // Close the poemText tags
  poemText = poemText + "</p></blockquote>";
  // Replace the content of #poem
  $("#poem").html(poemText);
  // Now that we have the data, we can add the click event to the poem
  $("#poem a").click(function(){
    let infoText, clickedWord, clickedInfo;
    clickedWord = $( this ).text();
    // .data("info") looks for the data-info HTML attribute
    clickedInfo = $( this ).data("info");
    infoText = clickedInfo;
    $("#info").html(infoText);
  });
}); // Close the getJSON method and callback function
```

Save and check the page. You should now see the full poem and have a few clickable elements to explore.

Congrats! You now have a workable dataset and some interesting ways to display and interact with it. We've covered quite a lot of new terrain in this lesson, but for the most part, we are still just utilizing the foundational skills and tools you've encountered so far. 

In the next lesson, we'll introduce a brand new tool called Leaflet. We'll learn how to use Leaflet to add interactive maps to our web pages.

But, as major takeaways from this lesson, just keep in mind that:
- We usually want to break down data into smaller, discrete pieces we can manipulate
- JSON allows you to store data in a structured way and work with it
- Data attributes are used to store extra information that you may want to access or display
- Events are used to trigger actions when something happens

## Review Questions

1. True or False - `map()` allows you to iterate over an array, but it doesn't return anything.

<Quiz>
- True
- False*
</Quiz>

2. True or False - We can import a JSON dataset as an `object` in JavaScript.

<Quiz>
- True*
- False
</Quiz>

3. The following code would affect which element?


```JavaScript
$("#poem h3").click(function(){
    // some action
});
```

<Quiz>
- The paragraph element
- The header element*
- The info element
- The body element
</Quiz>

## Challenges

1. Our poem page is quite bland. Spruce it up however you'd like by marshalling your CSS skills.

2. `.map()` is an important method. Get a little practice in by writing a new function that takes an array of integers and, using `.map()`, returns an array of those integers, doubled. So if we give it [1, 2, 3], we receive, in turn, [2, 4, 6]. Display this info in the console.

<CodeEditor language="JavaScript">
</CodeEditor>

3. `.map()` is similar to another method, `.forEach()`. We haven't covered the latter, but you may encounter it in the wild. Read through [this article](https://codeburst.io/javascript-map-vs-foreach-f38111822c0f) to understand the differences between the two, and to learn a little more about `.map()` specifically.

4. Add a new property to the JSON file that stores a wiki link for a particular literary device (e.g., [here for anaphora](https://en.wikipedia.org/wiki/Anaphora_(rhetoric%29). Create a new data attribute to access this property and add it to the info message that is displayed when clicked. 

## Key Terms

Do you recall the meaning of the following terms?

- `.map()`
- `.join()`
- `.getJSON()`
- data attributes
- events
- callbacks

## Download the Project

Here are the course files we created for this lesson if you need a reference:


<Download files='10_index.html, 10_script.js, 10_styles.css, 10_poem.html, 10_poem.css, 10_poem.js, poem.json'> <br/>

# Mapping With Leaflet

The last lesson exposed us to a variety of good programming practices. For instance, we separated out our data into a JSON file instead of simply creating a `line1`, `line2`, `line3`, ... `line11` set of arrays to populate our poem. While that also would have worked, it is repetitive and inefficient. Instead, we made some basic assumptions about our data (that a `.lines` property could exist as an array of word objects that we could `.map()` over) and followed that approach, creating a new JSON file object. Separating out our logic for the program and the data we were working with is a good example of a __modular__ programming approach:  of separating out our code into smaller building blocks that ultimately work together to create a whole project. We have already been doing this with our HTML, CSS, and JS files, but we can do it with our data as well.

In this lesson, we'll work with a new tool called __Leaflet__. Leaflet is an open-source JavaScript library (like jQuery) that will help us add interactive maps to our web pages. Interactive maps have become one of the most popular ways to visualize and explore spatial data. What this will ultimately require us to decide is how to aggregate, categorize, combine, and visualize our data. All of these decisions, plus the context of the map on your page, will influence the story that the map tells. Thinking about your data as a story (no matter what the data is), is a good way to reckon with the ethical dimensions of web development.

On that note, and given current events, it is probably worth mentioning that Leaflet was created by a Ukrainian programmer in Kyiv. On the library's [main page](https://leafletjs.com/), you can read about the maintainers' sentiments on the war. This is a good time to reflect on how even well-established programming libraries can be affected by social and political forces, and also how they can be utilized in ways that were once unimaginable.

Keeping these ideas in mind, let's get started working with Leaflet.

## Web Maps

You are likely very familiar with web maps. I personally have found myself quite lost in NYC before. While "being lost" is not necessarily a bad way of being sometimes, if you have a specific destination (not to mention a certain time) in mind, having a map is quite helpful. You know what I mean--Google or Apple provide us with interactive geo-location almost every second of our lives.

Before we begin integrating web maps into our project, it might be helpful to consider the basic "layering" of a web map. Take a look at the map below. It was created using Leaflet, and you can see some of the code (HTML, CSS, and JavaScript) powering it on the side. Click on stuff and zoom and drag around on the map.

<HTMLEditor >

<html>
 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"/>
 <script src="https://unpkg.com/leaflet@1.7.0/dist/leaflet.js"></script>
    <div id="map"></div>
</html>
<css>
#map {
    height: 600px;
    width: 600px;
}
</css>
<javascript>
```
var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('Here is a pop-up<br> on a marker')
    .openPopup();
```
</javascript>

</HTMLEditor>
<br />

You'll notice that there are several "layers" to this map. Web maps can be layered in many ways, but the most basic can resolve into just a few:
1. The background or tile layer--the map itself, with all its internal data about streets, boroughs, cities, etc.
2. The foreground layer--the parts that overlay the map: the markers, lines, and other elements.
3. The popup layer--the text or notification that appears when you click on a marker or other element on the map.
4. The control layer--the buttons that control the map, such as the zoom buttons. This layer is usually on top of the other layers.

These layers all work together to comprise the interactivity of the map. For our purposes, we will mostly work with the foreground layer and the popup layer.

## Getting Started with Leaflet

Leaflet is fairly straightforward to get started with and allows for a wide array of customization.

If you look at the JavaScript code for the map above, you'll notice a bunch of `L`s. Leaflet creates an object, `L`, that has a bunch of methods that we can use to create and manipulate maps. Our map is, itself, an object. The tile layer? A different object. Markers are objects, polylines are objects, polygons are objects, popups are objects--you get the point. And all these objects have properties and methods we can modify, too.

To better understand how this all works, let's get to work setting up our own map. Leaflet has an official [quick starter guide here](https://leafletjs.com/examples/quick-start/) that we'll more or less follow, but we'll add some more context. 

Let's say we want to add a map of New York to our page with Whitman's _Broadway_ poem. Using Leaflet, let's get a map to show and add a bit of spatial context to our page.

## HTML

First, open your `poem.html` file. My recommendation here is to simply overwrite all your existing HTML by copy/pasting the following:

```HTML
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Walt Whitman's Broadway</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
    integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
    crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
    integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
    crossorigin=""></script>
    <link rel="stylesheet" href="poem.css">
  </head>
  <body>
    <div class="container">
      <h1><em>Broadway</em> by Walt Whitman</h1>
      <div id="intro">
        <p>Welcome to the page for Walt Whitman's poem <em>Broadway</em>. Click on elements to see more information about them.</p>
      </div>
      <div id="poem"> </div>
      <div id="info"></div>
      <h2>Map of New York</h2>
      <div id="map"></div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="map.js"></script>
    <script src="poem.js"></script>
  </body>
</html>
```

You'll notice we have added a few new things here. First, before our `poem.css` file, we added a new `<link>` tag to link to Leaflet's CSS file. You _must_ always include Leaflet's CSS file in the `<head>` section of your documents when adding maps. Also in the `<head>` we added a new `<script>` tag to link to Leaflet's JavaScript file. _This is also required_ for Leaflet to work.

Next, within our `<div>` `container`, we added a new `<div>` with an `id` of `map` at the end. This is where we'll put our map. It will appear underneath the poem and info divs. To offset it a bit, we also included a new `<h2>` tag with the text "Map of New York" to appear above the map.

Lastly, we have added a new `<script>` tag to link to our own new JavaScript file named `map.js`. This is where we'll add our own JavaScript code for the map.

Everything else in the HTML should be familiar to you. This will be about all the work we need to do on our HTML file in this lesson.

## CSS

The next step we'll need to take is to specify a height for our map. Leaflet's one demand of CSS is that it be a certain height. We can do this by adding a `height` property to our `#map` id. In your `poem.css` file, add the following:

```CSS
#map {
  height: 400px;
}
```

You can change the height to whatever you'd like, but it must be there.

If you save your files and click "Go Live", you should see our new header with a considerable amount of whitespace beneath it. That is where our map will live. Currently, however, the map is not visible. This is because we need to initialize the map in JavaScript.

## Initializing the Map

Create a new file called `map.js` and add the following:

```JavaScript
// Create a new Leaflet map
let poemMap;
poemMap = L.map("map");
```

`poemMap` is now designated an object that we can use to modify the map on the page. Note the syntax: `.map()` is a method that `L` (Leaflet) has that creates a map in the `<div>` with the `id` given as the parameter. (`L.map()` here is not to be confused with the ordinary `.map()` method you've seen before! A little confusing, I know...) If you save everything and check the browser, you should see a map element appear.

Unfortunately, the map is currently blank and grey. This is because we have not yet added a tile layer to the map. Remember, the tile or background layer is the map itself, with all its internal data about streets, boroughs, cities, etc.

Let's go ahead and add the tile layer now. Below the initialization of the map, add the following:

```JavaScript
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(poemMap);

poemMap.setView([40.7128, -74.0060], 16);
```

Let's take a look at what this code does. First, we add a new `.tileLayer` to the map. The first parameter is the URL of the tile layer source (in this case, [openstreetmap.org](https://www.openstreetmap.org/)). The second parameter is an object that contains the following properties:

- `maxZoom`: The maximum zoom level that the map can be zoomed to.
- `attribution`: The attribution text (to show the source of the map) that appears at the bottom of the map.

Whenever we create a new object like this `tileLayer`, we need to add it to the map. We do this by calling the `.addTo()` method on the object. This method takes one parameter, which is the map we want to add the tile layer to (`poemMap`).

Next, we use the `.setView()` method. This method takes two parameters: an array of the latitude (north-south) and longitude (east-west) of the center of the map, and the zoom level. We set the center of the map to New York City (using its coordinates) and the zoom level to 16. As we specified earlier, the max zoom level here is 18.

If you save and check your page, you should now see a map with New York City at its center. Nice!

## Adding Markers

Because our poem is about Broadway, why don't we add a marker to the map indicating where Times Square is located? We can get the official coordinates of Times Square simply by Googling "Times Square coordinates". The result is 40.7580 N, and 73.9855 W. Let's add a marker to the map at these coordinates:

```JavaScript
const timesSquare = L.marker([40.7580, -73.9855]).addTo(poemMap);
```

First, we create a new `.marker()` object. This object takes one parameter, which is an array of the latitude and longitude of the location we want to mark. We then add this marker to the map.

If you scroll up on the map or zoom out, you should now see a marker appear at the coordinates. Next, let's add a popup to the marker. To do this, we need to add a `.bindPopup()` method to the marker. This method takes one parameter, which is simply the text we want to appear in the popup.

```JavaScript
timesSquare.bindPopup("<b>Times Square</b>");
```

Here we bind the popup to the marker with the bold text "Times Square". If you save and click on the marker, you should now see the popup appear.

![Times Square](/images/times-square.png)

## Adding Shapes

Besides popups and markers, you can add shapes to the map like lines, polygons, and circles. Let's add a circle to the map.

```JavaScript
const circle = L.circle([40.7580, -73.9855], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(poemMap);
```

Here we have added a circle with a radius of 500 meters. The circle is reddish (in terms of both border and fill) and has a 50% opacity so we can see the map underneath. To add the circle, we simply need to specify the coordinates of the center and add it to the map with the `.addTo()` method.

We can also add polylines to the map. Let's add a polyline from Times Square to the Graduate Center:

```JavaScript
const polyline = L.polyline([
    [40.7580, -73.9855],
    [40.7486, -73.9840]
], {
    color: 'blue'
}).addTo(poemMap);
```

Here we simply need to specify the start and end coordinates of the polyline. We can also specify the color of the line.

Lines, circles, and polygons are usually used to show a path or provide some contextual boundaries. We can also bind a popup to a line, circle, or polygon. For example, let's add a popup to the line from Times Square to the Graduate Center:

```JavaScript
polyline.bindPopup("<b>Times Square to the Graduate Center</b>");
```

If you click on the line on the map, you should now see a popup appear.

You can similarly add popups to circles and polygons. Let's add a popup to the circle:

```JavaScript
circle.bindPopup("I'm a circle!");
```

## Coordinates and Events

Leaflet has many methods for working with coordinates. For example, we can get the latitude and longitude of a marker by calling the `.getLatLng()` (getLatitudeLongitude) method:

```JavaScript
const latLng = timesSquare.getLatLng();
console.log(latLng.lat);
console.log(latLng.lng);
```

If you check your console in the browser, you should now see the latitude and longitude of our Times Square marker display.

If we wanted to pan (or shift the map's view) to Times Square, we could do so by calling the `.panTo()` method on the map:

```JavaScript
poemMap.panTo(timesSquare.getLatLng());
```

If you check your page, you should now see the map shift to the location of the Times Square marker.

Every time something happens in Leaflet, e.g. the user clicks on a marker or map zoom changes, the corresponding object in Leaflet sends an event which you can access with a function. It allows you to react to user interaction. For example, let's add a function to the map that logs the latitude and longitude of the point on the map that the user clicks on.

```JavaScript
poemMap.on('click', function(e) {
    const latLng = e.latlng;
    console.log(latLng.lat);
    console.log(latLng.lng);
});
```

Here we add a function to the map that is called whenever the user clicks on the map. The `.on()` method takes two parameters: the event name and a function that is called when the event occurs. The event name is `click` and the function has a parameter `e`, which is the map click event object that is created.

When the user clicks on the map, the `.on()` method calls the function we defined. We can access these coordinates by getting the `.latlng` (lowercase) property of the `e` object and then the `.lat` and `.lng` properties on the new `.latLng` object. (Note the differences between the new object we create--it has a capital `L` in the name.)

If you check your developer console in the browser, you should now see the latitude and longitude of the point on the map that the user clicks on.

Leaflet has [very extensive documentation](https://leafletjs.com/reference.html) on all its methods, properties, and events that I recommend you look through. We'll discuss more strategies for using documentation in a coming lesson, but it's good to take a preliminary look.

## Review Questions

1. Modular programming emphasizes separating the functionality of a program into smaller, independent pieces.

<Quiz>
- True*
- False
</Quiz>

2. After initializing your map, you should add the tile layer.

<Quiz>
- True*
- False
</Quiz>

3. The `.addTo()` method adds an object to a map.

<Quiz>
- True*
- False
</Quiz>

## Challenges

1. Create a marker at the location of your favorite restaurant, bar, cafe, or event space in NYC.

2. Draw some polylines that replicate a walk to the nearest subway station from your favorite spot in step 1. (Note: It doesn't need to be super precise: just use the `click` event and `console.log()` to map out the general coordinates of your walk at each turn.)

3. Push all your code to GitHub.

## Key Terms

Do you recall the following key terms?

- modular programming
- layers
- markers
- popups
- events

## Download the Project

Here are the course files we created for this lesson if you need a reference:

<Download files='11_index.html, 11_script.js, 11_styles.css, 11_poem.html, 11_poem.css, 11_poem.js, poem.json, 11_map.js'> <br/>

# Working With GeoSpatial Data

In this lesson, we'll marshall our hard-earned skills with jQuery, JSON, and Leaflet to add a bit more complexity to our mapping project. We'll use a dataset of geospatial data to add some more interesting features to our maps. Specifically, we'll use a dataset that defines the locations of neighborhoods across New York City and incorporate it into our project.

Using this dataset will allow us to:
- Add neighborhoods boundaries as a new layer to the map
- Add popups to the neighborhood polygons
- List all neighborhoods on the page and add buttons and links to pan to each neighborhood's location

Because we are combining all of the skills we've learned throughout this course, I recommend taking it slowly and carefully. Be sure to understand the concepts, syntax, and major moves of each part before moving on. 

Without further ado, let's get started!

## The Dataset

We have said that we'd like to use a dataset that defines the locations of neighborhoods across New York City. We'll talk about good ways to find datasets in the coming weeks (as you begin your own final projects), but for now, let's use the dataset [from this source](https://data.beta.nyc/dataset/pediacities-nyc-neighborhoods/resource/35dd04fb-81b3-479b-a074-a27a37888ce7). If you click on the link, you can see a nice map of NYC that shows the boundaries of the neighborhoods. We'll do something similar with this dataset on our own maps.

Let's use the dataset as a local file in our project folder. You can download it from the source website or simply use the download button below:

<Download files='nycneighborhoods.json'><br />

You'll see that we get a JSON file that contains the data we need. Make sure you save it in your working directory for this course. Let's open this file in VSCode and take a look at it:

![NYC Dataset](/images/nyc-dataset.png)

It all looks a little confusing, doesn't it? Let's break down what we are seeing here.

The JSON file we have here is an example of __GeoJSON__. [GeoJSON](https://geojson.org/) is a subset of JSON that defines a set of specifically _geographic_ features. In other words, it is a standardized format for representing spatial data and is used by many different mapping applications.

Just like regular JSON files you have seen, GeoJSON files utilize key-value pairs to define the features.

You'll notice our dataset is of the _type_ `"FeatureCollection"`. This is a special type of JSON object that contains a list or collection of multiple features. Each feature is itself a JSON object that additionally has the key `"type"` with a value of `"Feature"`. Each feature has a number of properties that define the object. For instance, you can see that we have properties of `neighborhood`, `boroughCode`, `borough`, and `id`. Each of these has a value that we will be able to access and use later. Each feature also has a property called `geometry` that contains the coordinates of the feature (the neighborhood). Each feature is defined as a polygon with an array of coordinates that define the shape of the polygon (the neighborhood in question). Remember that spatial data can be points, lines, or polygons--we are dealing with polygons here because we are circumscribing the shape of each neighborhood. If you scroll through the file, you'll see that we have a feature for each of the neighborhoods in NYC. 

Okay, let's prepare our page so we can use the dataset.

## Preparing the Page

Let's create a few new files. First, create a new HTML file in your working directory called `nyc-data.html`. Go ahead and add the following:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>NYC Neighborhoods</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
    integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
    crossorigin=""/>
    <link rel="stylesheet" href="nyc-data.css">
   <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
   integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
   crossorigin=""></script>
  </head>
  <body>
    <div class="container">
      <h1>NYC Neighborhoods</h1>
      <div id="map"></div>
    </div>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="nyc-data.js"></script>
  </body>
</html>
```

This should all be fairly familiar stuff to you. We get the necessary Leaflet and jQuery files, and we add a custom CSS file as well as a new JavaScript file to work with. To be able to navigate to the page, you can simply add another link to it in your `index.html` file, like we did with our poem:

```html
<h2><a href="nyc-data.html">NYC Neighborhoods</a></h2>
```

Next, go ahead and create the new CSS file, `nyc-data.css`, and add the following:

```css
#map { 
    height: 600px; 
    width: 75%;
}
```

This will set the size of the map to be 75% of the width of the page and 600px tall.

Next, create a new JavaScript file, `nyc-data.js`, and add the following to create the initial map:

```JavaScript
let nycMap;
nycMap = L.map("map");

// create tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(nycMap);

nycMap.setView([40.7128, -74.0060], 16);
```

Check to make sure your map displays properly. If so, let's move on to the next step.

## Adding the Data

There are several different ways we could add this data to our map, but perhaps the simplest way will be to use Leaflet's built-in `L.geoJSON` method. This function takes in a GeoJSON object and adds it to a map.

To use this method, however, we'll need to make a minor change to our `nycneighborhoods.json` file. In the file itself, we'll want to store the JSON object as a JavaScript variable we can work with.

The first thing we'll need to do is change the file type from `.json` to `.js`, as a JavaScript file. You can change the file extension easily by simply right-clicking the file in the Explorer Window and selecting Rename. Change the file name to `nycneighborhoods.js`.

Now, in your `nycneighborhoods.js` file, create a new variable at the very top of the file to store the data like so:

```JavaScript
const nyc = {
"type": "FeatureCollection",
...
...
...
```

This allows us to work directly with the `nyc` variable to add the data to our map. This is the easiest way I've found to utilize the `L.geoJSON()` method to add data to a map without having to worry about taking extra steps to "parse" the data. Otherwise, Leaflet seems to have difficulty working directly with GeoJSON data, and you'll receive an `"Invalid GeoJSON object"` error. 

There is, however, one more step to take. We'll need to include the dataset as a source in our HTML file. So, in the `<head>` of your `nyc-data.html` file, add the following:

```html
<script src="nycneighborhoods.js"></script>
```

Now, we can finally create a new Leaflet layer with the data and add it to our map. In your `nyc-data.js` file, add the following line of code:

```JavaScript
L.geoJSON(nyc).addTo(nycMap);
```

The `nyc` variable we created earlier is the data in our dataset. We can use the `L.geoJSON` method to add this data to our map. If you save and check your page, you should now see the neighborhoods of NYC outlined over the map:

![Nyc Neighborhoods](/images/nyc-neighborhoods1.png)

Pretty neat, right? Make sure you are seeing this correctly display before moving on.

## Styling the Data

Let's add a bit of fill color to the polygons to make them stand out:

```JavaScript
// add some fill color to the map
L.geoJSON(nyc, {
    style: function(feature) {
        return {
            color: "blue",
            fillColor: "yellow",
            fillOpacity: 0.5
        };
    }
}).addTo(nycMap);
```

The `style` function takes in a `feature` (in this case, our neighborhood polygons) and returns a style object, which we add to our map. The style object here has three properties: `color`, `fillColor`, and `fillOpacity`. The `color` property sets the color of the polygon border, the `fillColor` property sets the color of the polygon interior, and the `fillOpacity` property sets the opacity of the polygon interior.

You should now see the polygons styled as a pale yellow with a blue border:

![NYC Neighborhoods](/images/nyc-neighborhoods2.png)

## Adding Popups to the Data

Let's add some popups to our map to show the name of each neighborhood. To do this, we'll need to add a new property to our object: `onEachFeature`. This property takes in a function that will be called for each feature (each neighborhood) in the dataset:

```JavaScript
// show each borough on the map
L.geoJSON(nyc, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.borough + "</h3> <hr> <h3>" + feature.properties.neighborhood + "</h3>");
    }
}).addTo(nycMap);
```

The `onEachFeature` property takes in a function with two arguments: the feature and the layer. The feature is the neighborhood itself, and the layer is the Leaflet layer that will be added to the map. We can use the `bindPopup` method to add a popup to the layer. Using HTML in the popup, we can display the name of the neighborhood and the borough by getting the `properties` object from the feature and accessing the `borough` and `neighborhood` properties. In between the `<h3>` tags, we can put a horizontal rule `<hr>` to separate the borough and neighborhood names. Finally, as always, we add the layer to the map.

If you save, you should now be able to click on each neighborhood to see a popup with the name of the neighborhood and the borough.

![NYC Neighborhoods](/images/nyc-neighborhoods3.png)

Great! Now, let's add a bit more functionality to our page.

## Adding Buttons

Let's say we wanted to add a button to our page that pans the map to a particular neighborhood. Let's create a new button in our `nyc-data.html` file, below our map `<div>` tag:

```html
<button id="pan-to-flatbush">Pan to Flatbush</button>
```

In our `nyc-data.js` file, we can then use jQuery to check for a click event on the button, and find the neighborhood in the dataset:

```JavaScript
$("#pan-to-flatbush").click(function() {
    // find flatbush neighborhood property in the dataset
    let flatbush = nyc.features.find(function(feature) {
        return feature.properties.neighborhood === "Flatbush";
    });
    console.log(flatbush);
});
```

We can use the `find` method to find the neighborhood in the dataset that matches the name we want to pan to. The `find` method takes in a function that will be called for each feature (each neighborhood) in the dataset. In this case, we want to find the neighborhood that matches the name "Flatbush". The `find` method will return the first neighborhood that matches the function. To see the result, we `console.log()` the neighborhood we find, just to make sure we are pulling in the correct data.

If you save and click the Flatbush button, you should see the feature object for Flatbush logged to the console:

![Find Flatbush](/images/find_flatbush.png)

Perfect, we have successfully found the neighborhood we want to pan to. Now, let's use the `panTo` method to pan the map to the neighborhood. Let's fill out this section of code to accomplish this:

```JavaScript
// use jquery to see if flatbush button is clicked
$("#pan-to-flatbush").click(function() {
    // find flatbush neighborhood property in the dataset
    let flatbush = nyc.features.find(function(feature) {
        return feature.properties.neighborhood === "Flatbush";
    });
    console.log(flatbush);
    // find the coordinates of flatbush property
    let coordinates = nyc.features.find(function(feature) {
        return feature.properties.neighborhood === "Flatbush";
    }).geometry.coordinates;
    console.log(coordinates);
    nycMap.panTo(new L.LatLng(coordinates[0][0][1], coordinates[0][0][0]));
});
```

To pan the map to the neighborhood, we need to find the coordinates of the neighborhood. We can do this by accessing the `geometry` property from the feature and accessing the `coordinates` property. The `coordinates` property is an array of arrays, and we `console.log(coordinates)` to make sure we are pulling in the correct data. We then use the `panTo` method to pan the map to the coordinates.

If you save and click the Flatbush button, you should see the map pan to Flatbush. It's not perfect (it doesn't pan to the exact center, but to the outer border of the neighborhood), but it's pretty close. To pan exactly to the center of the polygon would require a bit more complex calculations on our part, but this will work for demonstration purposes.

## Listing All Neighborhoods

We now have a simple external button control that allows us to pan the map to Flatbush. What if we wanted to list _all_ the neighborhoods of NYC and allow the user to click on each to pan to it? 

Below our Flatbush button, let's add a new `<div>` for displaying the entire list of neighborhoods:

```html
<div id ="neighborhoods"></div>
```

Next, in our `nyc-data.js` file, we'll want to loop through the dataset objects, pulling out the neighborhood name from each so we can display it in the list.

```JavaScript
// get a list of all the neighborhoods in the dataset
let neighborhoods = nyc.features.map(function(feature) {
    return feature.properties.neighborhood;
}).filter(function(neighborhood) {
    return neighborhood !== "";
}).sort();
console.log(neighborhoods);
```

We can use the `map` method to loop through the dataset and return an array of neighborhood names. The `filter` method then allows us to remove any neighborhoods that are blank (in case there are blank property names in the dataset). We then use the `sort` method to sort the neighborhoods alphabetically. Finally, we `console.log()` the neighborhoods array to make sure we are pulling in the correct data.

If you check your console, you should see the list of sorted neighborhoods as output:

![Neighborhoods List](/images/neighborhoods_list.png)

Let's go ahead and write these out to our neighborhoods `<div>`:

```Javascript
// display all the neighborhoods in the neighborhoods div
neighborhoods.forEach(function(neighborhood) {
    $("#neighborhoods").append("<a href ='#'><li>" + neighborhood + "</li></a>");
    // display in columns
    if (neighborhoods.indexOf(neighborhood) % 4 === 0) {
        $("#neighborhoods").append("<br>");
    }
});
```

Here we utilize the `forEach` method to loop through the neighborhoods array and `append` each neighborhood to the `<div>` with the id of `neighborhoods`. As you may recall from [an earlier lesson's Challenge #3](?page=10), `forEach` is similar to `map()`, with the important difference being that `forEach` does not create a new array (which would be unnecessary in this case). You'll notice that we are surrounding each neighborhood with an `<a href>` tag and a `<li>` (list item) tag. This is because we want to be able to turn each name into a clickable element. We can use the `indexOf` method to find the index of the neighborhood in the array. If the index is divisible by 4, we add a `<br>` tag to separate the neighborhoods into spaced columns to make things a little easier to read.

To enable a basic columnar structure, we also need to add a line of code to our `nyc-data.css` file:

```CSS
#neighborhoods {
    columns: 100px 3
}
```

This allows us to create a simple columnar structure with 3 columns, each 100px wide.

If you save all files and check your page, you should see the list of neighborhoods displayed in columns:

![Neighborhoods List](/images/neighborhoods_list_columns.png)

You'll notice that there are several duplicates in the dataset (e.g., Jamaica Bay, Broad Islands, Pelham Islands, etc.), and that we are not always getting groups of 4. The data probably needs to be cleaned up (in this case, removing redundancies), which is always a good idea when working with data in your actual projects. We won't worry about this for now.

In any case, we now have a full list of clickable elements. Finally, let's add a click event to each neighborhood to pan the map to that neighborhood.

```JavaScript
// if the neighborhood is clicked, find the neighborhood on the map and pan to it
$("#neighborhoods").on("click", "li", function() {
    let neighborhoodText = $(this).text(); // get the text of the neighborhood
    let coordinates = nyc.features.find(function(feature) {
        return feature.properties.neighborhood === neighborhoodText; //check if the text matches the neighborhood in the dataset
    }).geometry.coordinates; // get the coordinates of the neighborhood
    nycMap.panTo(new L.LatLng(coordinates[0][0][1], coordinates[0][0][0]));
    // zoom in
    nycMap.setZoom(16);
    // add a marker to the neighborhood polygon
    L.marker(new L.LatLng(coordinates[0][0][1], coordinates[0][0][0])).addTo(nycMap);
    // add a popup to the marker
    L.marker(new L.LatLng(coordinates[0][0][1], coordinates[0][0][0])).bindPopup("<h3>" + neighborhoodText + "</h3>").addTo(nycMap);
});
```

We can use the `.on(click)` method to add a click event to the `<li>` tag (i.e., each neighborhood name). We then use the `$(this).text` method to get the text of the particular `<li>` tag that was clicked. Remember, in this context, `this` simply points to whatever element is being acted upon. It is flexible in that we don't have to specify an individual element of the type. Next, we check if the `neighborhoodText` matches the `neighborhood` property in the dataset. If it does, we can use the `find` method to find the neighborhood in the dataset and grab the coordinates. Using the coordinates, we `panTo` the location. We also zoom in on the neighborhood and add a marker with a popup to the spot.

If you save your page, you should now be able to click on each neighborhood and the map will automatically zoom toward the neighborhood in question. Cool!

Again, you'll notice we are not displaying the marker in the exact center of the neighborhood polygon. Because each polygon is differently shaped and built-up from a large variety of coordinates, we'll just place the marker at the border of the neighborhood like we did before. Figuring out how to center each marker would probably be an important task if we were planning to use this website professionally, however.

The last step we should probably take is to give attribution to our dataset source. Even if the source is open and freely available for use, it's wise to give attribution in case there are mistakes or otherwise undesirable elements in the data. This is not only a way to protect yourself, but also to let others know where to find/work with your data themselves.

For our purposes, we can simply provide a link to the source at the top of our page, by adding a link below our header:

```HTML
<a href = "https://data.beta.nyc/dataset/pediacities-nyc-neighborhoods/resource/35dd04fb-81b3-479b-a074-a27a37888ce7" alt="Data Source">Here's the source for NYC neighborhood boundaries.</a>
```

## What Have We Done?

Let's take a moment to review the variety of skills and techniques we've utilized to create this new page. Although the page is fairly simple looking, we've accomplished some rather complex tasks. We have:

- A base layer map of the world
- An overlay of neighborhoods in NYC specifically, using a geospatial dataset
- The ability to click around on the map and see each neighborhood
- An external button that allows us to navigate to a particular location on the map, based on the data we have
- An entire list of clickable neighborhoods pulled from the dataset

We are only scratching the surface of what jQuery, JSON, and Leaflet can do working in tandem, but we have accomplished quite a lot. These are the skills we'll employ to put together your own final projects with your own datasets, your own stylistic creativity, and your own intentions for the final result.

## Review Questions

1. Each object in a GeoJSON dataset is called a:

<Quiz>
- Property
- Feature* 
- Coordinate
</Quiz>

2. True or False - The `geometry` property contains coordinate data for a particular feature.

<Quiz>
- True*
- False
</Quiz>

3. When using a dataset pulled from an online source, it is wise to: (select all that apply)

<Quiz>
- Check the data for redundancies, duplicates, or otherwise erroneous material*
- `console.log()` your retrievals of the data for testing purposes*
- Give attribution for your source*
</Quiz>

## Challenges

1. Create another button that pans the map to your favorite neighborhood.

2. Draw some polylines to connect the boundaries of different neighborhoods.

3. If a neighborhood is in Manhattan, change the color of the neighborhood polygons to red. (Hint: You'll need to check for the `borough` property and perform `style` changes accordingly.)

## Key Terms

Do you recall the meaning of the following terms?

- GeoJSON
- FeatureCollections/Features
- Geometry

## Download the Project

Here are the course files we created for this lesson if you need a reference:

<Download files='12_index.html, 12_script.js, 12_styles.css, 12_poem.html, 12_poem.css, 12_poem.js, poem.json, 12_map.js, 12_nyc-data.css, 12_nyc-data.html, 12_nyc-data.js, nycneighborhoods.js'> <br/>

# Reading Documentation

Throughout this course, we have often referred you to "the documentation" for various libraries and tools. As you may have experienced when looking through these resources, documentation can be overwhelmingly large, complex, and confusing. Learning to read documentation is an important skill, but it's one that takes time.

So, in this lesson, we'll look to some strategies to help you:
1. Better navigate through technical jargon.
2. Better understand the structure and style of documentation.
3. Feel more confident in your ability to read documentation overall.

## What is Documentation?

Documentation, at its core, is a collection of descriptions/explanations for employing a particular product or service. Unfortunately, documentation can run the gamut from being very thorough to very vague. Oftentimes, the more niche a product is, and the smaller the community, the less in-depth the documentation. 

This is also, partly, due to the nature of documentation's audience. If documentation is too overly thorough in its explanations, experienced developers might find it bloated. On the other hand, if documentation is too sparse, new developers might find it difficult to understand. Writing efficient documentation means hitting the sweet spot between thoroughness, understandability, and ease of use.

## "Getting Started" vs. "Documentation"

Most documentation for a tool has two separate sections, written from different perspectives.

1. "Getting Started" is a section that describes how to get started using the tool. It is meant to be a quick introduction for how to install, configure, and use the product in a basic way. Leaflet's ["Quick Start" guide](https://leafletjs.com/examples/quick-start/) is a good example of this, with basic comprehension and implementation instructions.
2. Compare, now, Leaflet's Quick Start to [Leaflet's full docs](https://leafletjs.com/reference.html). This is more like a dictionary or glossary of presets, methods, and actions. Information density is prioritized rather than presenting a readable tutorial you can follow along with directly.

## The Art of ~~Reading~~ Referencing

For the most part, documentation isn't meant to be "read" in the traditional sense. Rather, it is meant to be _referenced_. If you have a sense of the overall structure, you can usually jump through non-chronologically. Using <kbd>ctrl</kbd> + <kbd>f</kbd> to maneuver through search terms is often the best approach.

Let's take a look at the [CSS reference docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference). It is, in short, overwhelming. It contains the full list of CSS properties and values, as well as a lot of information about them. However, if we want to achieve something simple, such as changing the font properties of a particular piece of text, we can simply <kbd>ctrl</kbd> + <kbd>f</kbd> `font` to find all the relevant properties:

![MDN font](/images/mdn-font.png)

This is a good example of how documentation works. The baseline property, in this case, `font`, is our first highlighted result. Everything else is in some sense a derivative of the baseline property; for instance, we can specify directly the font size, the weight, the [kerning](https://developer.mozilla.org/en-US/docs/Web/CSS/font-kerning), etc. 

In general, when searching for terms, first look to the most basic (i.e., probably the least wordy and jargony) instance. It will likely provide you with the foundational concept of the language that you're looking for and let you expand upon it.

Here is a list of reference docs for the tools we are using in this course. Spend a little bit of time looking at each one, discerning its structure and how you can best use it. Search around for some terms and click/scroll around to see what comes up.

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- [jQuery](https://api.jquery.com/)
- [Leaflet](https://leafletjs.com/reference.html)
- [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

The MDN reference docs are usually the most comprehensive, and besides searching for terms you can also use the sidebar to navigate through additional resources. This is also the case with the Leaflet and jQuery docs.

If you ever find yourself without internet and need offline documentation, one useful tool is [Zeal](https://zealdocs.org/), an offline documentation browser. It contains most (although not all) of the docsets for the tools and languages that we've used in this course so far.

## Beyond the Docs

### Google Searches

There are a number of reasons why learning with official documentation is the best approach for really coming to grips with a language. However, we may have inflated this a little. While documentation is best utilized when you have a very specific end goal, and when you already have a basic sense of how this goal might be accomplished, these factors may not always be in place. Especially when you are first starting out with a language or tool, you may not know the best search parameters to use in docs. 

If you aren't quite sure what you are looking for (and <kbd>ctrl</kbd> + <kbd>f</kbd> isn't being helpful), simply Googling around is the best way to go when faced with a particular problem. There are, however, some best practices for this as well. 

For example, let's say you created a button on a page, and you wanted to add some space around it so other elements aren't cramming it. How would you go about doing this? What sort of keywords would you use? What language is suitable?

Programming isn't always that different from other software contexts you have encountered. Thinking about the typical Word or Google doc you might write, when thinking about space around something you are probably dealing with `margins` in some form. Aside from <kbd>ctrl</kbd> + <kbd>f</kbd> `margin` in the docs, you could also turn to Google. In this case your search parameters could be something like: "adding margins around a button css", or even simply, "adding space around a button css." Note that although Google will likely figure it out, we are explicitly searching here for CSS. Specifying the language is important, as it will help us narrow down our search results.

### Handling Errors

We have talked about the basics of understanding errors before, but its worth noting that documentation often provides info on how to deal with possible errors that may arise in a program. There may be errors that can arise that are specific to the tool, and the docs can be the best place to go when dealing with these issues. However, this may not always be the case. If the docs are less than clear, again, simply Googling a confusing error message can be a useful approach if it has you stumped. This is not necessarily to say you should simply copy/paste an entire error. For example, copy/pasting this behemoth of an error message...
    
```
Uncaught (in promise) TypeError: _super.call is not a function
    at new ObservableQuery (b1f6a7d9f98d979758232d0dc3c394ce.js:26213)
    at QueryManager.watchQuery (b1f6a7d9f98d979758232d0dc3c394ce.js:27305)
    at b1f6a7d9f98d979758232d0dc3c394ce.js:27332
    at new Promise (<anonymous>)
    at QueryManager.query (b1f6a7d9f98d979758232d0dc3c394ce.js:27330)
    at ApolloClient.query (b1f6a7d9f98d979758232d0dc3c394ce.js:27981)
    at Object.require.2.react (b1f6a7d9f98d979758232d0dc3c394ce.js:29740)
    at newRequire (b1f6a7d9f98d979758232d0dc3c394ce.js:41)
    at require.39 (b1f6a7d9f98d979758232d0dc3c394ce.js:66)
    at b1f6a7d9f98d979758232d0dc3c394ce.js:71
```

... would not give you very good results. A solution might be to:

1. First, articulate your code that's breaking into a series of smaller steps. Often, programmers recommend a method called [Rubber Duck Debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging). This is a technique similar to writing pseudo-code, in that you first try to articulate your problem in spoken or written natural language. Attempting to explain the problem in simple language will very often lead you to a solution, or the beginning of a solution. In describing what the code is supposed to do and observing what it actually does, any incongruity between these two becomes apparent. 

2. Second, begin your search. Hopefully you now have a rough idea of what your code is and isn't doing correctly, so begin by including keywords from your error message and try to find results that fit your particular use case. For example, in the error above, if you Google "javascript uncaught (in promise) typeerror", you will find quite a few people have run into the same problem!

The first hit of this result is [this](https://stackoverflow.com/questions/57673148/how-to-fix-uncaught-in-promise-typeerror-cannot-read-property-method-of-un) question on the notorious Stack Overflow. Its worth taking a minute to discuss this site.

![Stack Overflow](/images/error_google.png)

### Stack Overflow

Stack Overflow is a very commonly used resource for programmers. It is a great place to find answers to all kinds of questions, and even to share your knowledge with others if you feel up to it. It is essentially a question/answer forum, and, at this point, contains over 21 million programming questions. If you have a question or issue about your code, it is very likely someone else has had it too. Whether or not you will always find an answer to your problem is more dubious, but it can be informational in other ways as well.  

Let's say we wanted to figure out how to disable a button using jQuery (for instance, a "submit" button that only works when a form is filled out on the page). We could search for "disable button jquery" in Google. The first hit of this result is not actually pointing us to documentation, but rather to [this Stack Overflow question](https://stackoverflow.com/questions/1594952/jquery-disable-enable-submit-button/62723465#62723465).

![Stack Overflow](/images/stack_overflow_example.png)

Always, take a quick look at the question to make sure it's relevant to your problem. Then scroll down through the answers and the discussions to find what you're looking for. You may also notice snarky debates—another "feature" of Stack Overflow. (Unfortunately, in many cases this is why I wouldn't recommend _asking_ questions as a beginner on StackOverflow, as folks and moderators can be less than friendly. It is still a great place for _finding_ answers through search, however). In this particular case, there are many, many answers, and almost each one is a different way to solve the problem. It is worth pointing out that this question was asked over 12 years ago, which is something you might want to consider, as some things may possibly be out of date. In any case, there is a plethora of information on the page that should help point you in the right direction.

As you might imagine, implementing code snippets from Stack Overflow is an incredibly common practice, and is even the source of many jokes, like this meme:

![Joke](/images/so_joke.jpg)

Don't feel the need to reinvent the wheel if you find a working solution on Stack Overflow. However, do pay close attention to any code you wrangle with, and make sure you understand what it is doing and how it fits into your overall program/project.

### Other Resources

While Stack Overflow is a great resource for programmers, it is not the only resource. There are many, many others, like [GitHub](https://github.com/), [CodeProject](https://www.codeproject.com/), different subreddits (like r/webdev, r/learnjavascript, etc.) on [Reddit](https://www.reddit.com/), and much more. I would especially recommend reddit, as the communities are very active and usually inviting of folks who are just learning to code.

If you would like to go really in-depth learning Leaflet, I would highly recommend Malcom Maclean's [Leaflet Tips and Tricks](https://leanpub.com/leaflet-tips-and-tricks/read).

## Final Thoughts

In general, keep in mind that documentation is best used as a reference for what you can do with a particular piece of software. It is not always the best place to start for beginners, but you will likely always end up arriving at the official documentation in one way or another. Beyond that, simply Googling around can be a good jumping off point. The absolute most important thing to learn is how to find answers to your questions. This means learning how to ask the _right_ questions. As a recap, when searching, be sure to:
1. Include the language/tool you are searching in as a search parameter.
2. Break down your search into keywords.
3. Be specific.
4. Don't be afraid to copy/paste and tweak results to fit your programs, but be sure to understand what the code is doing as best you can.

As you begin putting together your final project in the remaining weeks, try to keep these resources and strategies in mind, and refer back to them as needed.

## Review Questions

1. You should read documentation straight through, from top to bottom.

<Quiz>
- True
- False*
</Quiz>

2. You should copy and paste your entire error message when searching for guidance through Google.

<Quiz>
- True
- False*
</Quiz>

3. To get the most out of your Google searches, you should: (select all that apply)

<Quiz>
- Include the target language/tool you are searching in as a search parameter.*
- Break down your search into keywords.*
- Be specific.*
- Say please.
</Quiz>

## Challenges

Here's a basic rectangle class in HTML:   

```HTML
<div class="rectangle">
    <p>I am a rectangle</p>
</div>
```

1. Using this [CSS reference guide](https://www.w3schools.com/cssref/), look into how you might do the following: 
    1. Give the rectangle a width, height, and background color.
    2. Give the box a thick border.
    3. Center the rectangle on the page.
    4. Center the "I am a rectangle" text within the rectangle.
    5. Add a drop shadow to the rectangle.

2. Using the [jQuery reference](https://api.jquery.com/), look into how you might do the following:
    1. Check if the user has pressed the <kbd>enter</kbd> key on the keyboard.
    2. Add a hover event to an element (like a button) so that it will change color when the mouse is hovering over it.
    3. Scroll to the top of the page if the user clicks a button.

3. Using the [JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) and/or Google, look into how you might do the following:
    1. Find the index of a substring within a string (like "dog" in "The dog jumped.").
    2. Given an array of numbers (e.g., `[40, 38, 37, 93, 55, 66]`, filter out any values that are less than 50.
    3. Given a decimal number (like `.36`), round it up to the nearest whole number.
    4. Create a random number between 1 and 100.

## Key Terms

- Documentation
- Reference
- Rubber Duck Debugging 

# Starting Your Project 

Congratulations on making it this far! We've covered quite a lot of ground in a rather short amount of time. At this point, you should be well-equipped to get your hands dirty starting your own projects. 

That being the case, the remaining few weeks will be entirely devoted to working on your own projects. Your projects will largely be self-directed, based on your own particular creative aspirations or research interests. There are, however, a few requirements. Let's go through them.

## Project Requirements

Your projects should demonstrate that you understand the major concepts covered in this course. At a baseline level, this means your project should include:

- A homepage that includes a brief description of your project and its purpose.
- Interactive content that allows the user to explore the project (buttons, links, images, text, etc).
- Dataset(s) pertinent to the project, whether it be data you've created yourself, or data you've imported from a data source.
- Some sort of visualization of the data you are working with (e.g., a map).
- A style appropriate to the project or to your personal aesthetic tastes.
- A new GitHub repository dedicated to the project and a working version that you can share with others.

Depending on the kind of project you are creating, it might be weighted towards one or more of these requirements over the others. This is fine, as long as you are, again, able to show that you understand the material we've covered.

## Project Components

The above requirements will expect you to demonstrate knowledge with JavaScript, HTML, CSS, jQuery, JSON, Leaflet, and GitHub. In other words, in practical terms your project will be comprised of _at least_ one of each of the following:

- HTML file
- CSS file
- JavaScript file
- JSON file
- Leaflet map
- GitHub repository

Keep in mind that all of these components are meant to _work together_ to tell a particular story or demonstrate a particular idea or purpose.

It will be up to you to decide how you want to structure your project. Will it be comprised of multiple web pages? Will it be a single web page with multiple components? The design will probably depend on your own creative ideas, the kind of project you are developing, and your ultimate goals for the user of the site. We'll talk through some strategies for putting your site together next week, but it will be helpful to have some idea of how you might structure your project before you begin writing any code.

## Project Ideas

As mentioned, your projects are self-directed and individually tailored. The content and structure of your site can be based on whatever you'd like. However, let's discuss some ideas to help you get off the ground.

As a starting point for your projects, ask yourself: 

1. What kind of story do I want to tell?
2. What kind of data will I need?
3. What kind of visualizations will I want?
4. How will the website be structured?
5. How will the user interact with the website?

Here are some sample ideas for projects:

- An exploration of an essay, poem, or work of fiction
- A Choose Your Own Adventure game
- A walking tour of the city
- An exploration of green spaces, parks, wildlife, etc.
- An exploration of libraries, archives, or museums
- Observations/celebrations of ethnic or cultural diversity
- Observations on geography and political affiliations, income levels, access to healthcare, etc.
- An investigation of the impacts of climate change

These are just suggestions, but feel free to use them as a starting point. For example, let's say you wanted to create a walking tour. What might your site consist of? A few things off the top of my head could be:

- Polylines indicating the tour on a map
- A dataset with coordinates of the walk and interesting features along the way
- Markers and popups giving information on the map
- Images to show some of the views of the walk
- Text to describe the walk
- Links to landmarks, businesses (restaurants, bars, cafes) etc. along the way

These are just basic elements that could be the foundation of an interesting guided tour. Feel free to get creative and expand on your ideas to make something particularly unique!

## Project Scope

It is very important to keep in mind that there are only a few weeks remaining in the semester. While it is fine to have big ideas and plans for your project, be very mindful of the __scope__ of your project and what you can actually accomplish in the allotted time. In other words, try to narrow down your project to a _single achievable goal_. Creating big, complex, beautiful websites takes a lot of time and effort, and is not necessarily the point of this project. 

Instead, try to provide major milestones for yourself to work towards that comprise the essential parts of your project. Keep your project goals direct, to the point, and attuned to the project requirements. You can always build upon your work later, but don't get bogged down in too much detail or minor features until you have a sufficient working version of the site.

## Where to Find Data?

Okay, now that we've discussed some of the basics for your project, let's look to some ways to gather data. Depending on your project, you might be gathering/creating your dataset yourself, or you might be importing data from a source online. For the latter option, here are a few recommendations for finding datasets:

- [NYC Open Data](https://opendata.cityofnewyork.us/): Official source for data in New York City.
- [USGS (United States Geological Survey)](https://www.usgs.gov/): Official source for geological data in the United States.
- [Google's Dataset Search](https://datasetsearch.research.google.com/): Search for datasets on Google.
- [Kaggle](https://www.kaggle.com/datasets): Search for a variety of datasets on Kaggle.
- [Data.gov](https://www.data.gov/): US Gov data covering everything from climate change to crime.
- [Datahub.io](https://datahub.io/): Mostly business and finance datasets
- [EarthData](https://earthdata.nasa.gov/): NASA data
- [Data.world](https://data.world/): Data from various sources

### Use JSON Data

Each of these websites has a search engine that can help you find datasets that you might be interested in. In general, keep in mind that __we want to use JSON files__. Some sites will give you an option of multiple formats. If not, you may want to convert the data into JSON. For instance, if you encounter CSV files (which is common), you can use the [CSVtoJSON](https://csv.keyangxiang.com/) tool to convert the data into JSON. There are many online converters out there, so don't be discouraged if your data is not in a format you want.

Okay, enough prepping. Let's get started! Attempt the Challenges below to get going with your ideas. __Above all, remember to have fun with your projects!__

## Challenges

1. Write a short project proposal to share your ideas with the class (a paragraph or two will suffice).

2. Begin gathering or creating a dataset relevant to your ideas.

3. Create a new folder and a new GitHub repository for the project. Begin uploading your essential files you'll be working with (an HTML file, a CSS file, a JS file, your data, etc.). If you need a refresher with GitHub, review the [GitHub lesson](?page=7).

# Putting the Project Together

Hopefully you have a good idea of what you'd like your project to achieve. While there is no one right answer for how to structure your project, there are some best practices that you can employ to help you envision the final product. In this lesson, we'll cover a few strategies for thinking about your project holistically.

## Wireframing

__Wireframing__ is the practice of creating a rough outline of a project in order to help you visualize the final product. It usually involves drawing a basic sketch of what the project will look like and figuring out minor details later on. This helps determine how the information is presented and how the various bits of information interact. Because this entanglement of information is the center of wireframing, there is no focus on fonts or colors or graphics. For instance, here's a basic wireframe for YouTube culled from [this site](https://www.visual-paradigm.com/learning/handbooks/agile-handbook/wireframe.jsp):

![Wireframe](/images/wireframe_example.png)

If you've ever used modern-day YouTube, this should look pretty familiar to you. It highlights only the essential aspects of what the site is meant to accomplish and what the user experience should be. Again, the point of wireframing is to help you visualize the final product; in other words, it serves as a blueprint for design. For your project, it can help you plan out:

- __Content:__ What content will be displayed?
- __Structure:__ How are the pieces of the application fitting together?
- __Information Hierarchy:__ How is the information organized and displayed together? What is most important?
- __Functionality:__ How will the overall interface work?
- __Behavior:__ How will the users interact with the interface? What will be the results?

Try grabbing a notebook or using [this site](https://app.diagrams.net/) to draw a simple wireframe plan for your project.

## CSS Styling

### Flexbox Layout

Remember flexboxes? We used them to center and space our jokes page to make them look nice and to allow it to display well on mobile devices. They are not required for you to use in your projects, but they will likely come in handy in allowing you to effectively structure the content of your pages. For instance, we could have used them style our columns of NYC neighborhoods we created earlier to make the page much cleaner looking.

If you need a refresher on flexboxes, feel free to review [the lesson on CSS](?page=8) or look through the very handy [flexbox guide here](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

It's worth pointing out that flexboxes are similar to CSS `grids`. Depending on what you are trying to achieve, one might be better suited for your purposes than the other. I'd encourage you to [look over this resource](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Relationship_of_Grid_Layout) and especially [this resource](https://webdesign.tutsplus.com/articles/flexbox-vs-css-grid-which-should-you-use--cms-30184) to learn about the differences between `grid` and `flexbox`, and to decide which might be best for your project.

### Styling Elements

Keep in mind that basically anything you display on the page can be styled. You can style the entire page, individual elements, or even individual parts of elements. For instance, let's say we wanted to add a bit of style to our "Flatbush" button from our map page we created in previous lessons. We want it to change color when the mouse hovers over it, and change color again once it's clicked. To accomplish this, we could use jQuery and CSS like so:

```JavaScript
// change the color of the button when the mouse hovers over it and when it is clicked
$("#flatbush").mouseover(function() {
    $("#flatbush").css("background-color", "orange");
}).mouseout(function() {
    $("#flatbush").css("background-color", "white");
}).click(function() {
    $("#flatbush").css("background-color", "yellow");
}
);
```

`mouseover` and `mouseout` are jQuery events that are triggered when the mouse enters or leaves the element. The button's normal state is colored white, but when the mouse hovers over it, it changes color to orange. When the mouse is clicked, the button changes color to yellow.

Alternatively, we could accomplish this entirely in CSS (without needing jQuery) to style the button when the mouse hovers over it and when it is clicked:

```CSS
#flatbush {
    background-color: white;
    border: 1px solid black;
    padding: 10px;
}

#flatbush:hover {
    background-color: orange;
}

#flatbush:active {
    background-color: yellow;
}
```

The above CSS code will change the button's background color to orange when the mouse hovers over it, and to yellow when it is clicked. This latter option is probably the most appropriate way to go, as it is usually best to keep style changes to your CSS files if possible, but both options are available to you. There is almost always more than one way to accomplish a particular task.

These are very simple examples meant to get you thinking about the overall design of your page, and how you can make individual elements more perceptible and visually appealing. Remember, for accessibility purposes, you should try to provide a solid contrast with the colors you are using, especially if you are styling text.

## Incorporating GeoJSON Data

If you have a GeoJSON dataset you'd like to work with, keep in mind the preliminary step we covered in the [Working With GeoSpatial Data](?page=12) lesson. If you recall, we first needed to convert the file to a JavaScript object, by changing the file extension to `.js` and then storing the data in a variable:

```JavaScript
const varToStoreData = { // store all the data in a const variable
"type": "FeatureCollection",
...
...
...
```

This is the easiest way to utilize the `L.geoJSON()` method to add data to a map without having to worry about taking extra steps to "parse" the data. Otherwise, Leaflet seems to have difficulty working directly with JSON data. Once this is done, also remember that you need to include the new `.js` file in your HTML file's `<head>`:

```HTML
<head>
    <script src="your_dataset.js"></script>
```

This method should work well in most cases.

## General Advice

In general, while working on your projects, keep the following in mind:

- __Don't be afraid to ask for help__. If you need help, you can always reach out to your instructor or to your fellow classmates. Even for solo projects, programming is almost always a collaborative venture (whether in drawing advice from colleagues, friends, or complete strangers online).
- __Break down your project into smaller steps__. This will help you to better understand the overall purpose of your project and allow you to better understand the steps you need to take to complete it.
- __Break your code itself down into logical chunks__. This is especially important for large projects, as it helps you keep your code organized and focused on the task at hand.
- __Review previous lessons, check documentation, and search the web for resources__. This will help you to better understand the concepts you are employing and to better understand the code you are writing.
- __Limit your scope__. Focus on the basics of building your site first, and worry about the complex aspects later.

## Challenge

Your only challenge here is to continue working on your projects. __Good luck!__

# Going Live

The last step in building your project is to go live with your project, or to deploy it to the web. This is, of course, the final step in the process of building a web application. Thankfully, GitHub has a built-in deployment tool that will allow you to deploy your project very easily.

### Deploying to the Web

Once you are finished with your project, follow the instructions below to deploy your project to the web.

1. __Stage, commit, and push all your changes to GitHub.__ Once you are finished working on your project, make sure to push all your changes to GitHub. 

2. __Navigate to your GitHub repository in your browser__. Make sure you are logged in to GitHub and click through to your project repository.

3. __Go to the Settings tab at the top, and then to the Pages tab in the sidebar__.

4. __Under Branch, choose `master`__.

5. __Click the Save button__.

6. __Refresh the page, or click on the Pages tab again__. You should see a new message saying "Your site is live at...". This will include your username, repository name, and the URL of your site.

7. __Click Visit Site to view your published site__.

And that's it! You should now be able to see your site live on the web and be able to share it with others. For instance, here is my URL of the practice site we built together in this course: https://zipper3030.github.io/Javascript/

__Congratulations on all your work!__ You have accomplished quite a lot in this course and had to overcome many difficult challenges along the way. I hope the course has inspired you to continue to improve your skills and knowledge with programming and web development. Good luck with your future endeavors!