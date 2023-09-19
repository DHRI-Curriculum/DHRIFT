---
title: Introduction to R
description: R is an increasingly popular language for data analysis, especially in academia. 
programming_language: R
learning objectives:
    - Familiarize you with R language
    - Understand R syntax, logic, and 

    
facilitators: 
    name: "Sam O'Hana"
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
    - 'Yuxiao Luo'
    - 'Leanne Fan'
    - "Sam O'Hana"


editors:
    - 'Di Yoong'
    - 'Lisa Rhody' 
    - 'Stephen Zweibel'

ethical considerations:
    - understanding where your data comes from
    - carefully drawing conclusions
    - relationship between theory and data anlaysis

projects:
    description: "Projects that use the skills you'll learn in this workshop:"
    The Fossil Fuel Non-Proliferation Tracker:
        description: The data presented here is based on the Fossil-Fuel Non-Proliferation Database which semi-automatically searches the internet to identify existing climate change supply-side policies. We also rely on data from the Global Fossil Fuel Divestment Commitments Database (managed by Stand.Earth), CAIT Climate Data Explorer, ourworldindata.org, Carbon Brief, Go Fossil Free, The Fossil Fuel Registry, BP Statistical Review of World Energy, Shift Data Project, and reference other available data sources such as the “Fossil Fuel Supply Cuts Database“ beside others. The data used in this Tracker is updated from various sources on a rolling basis.
        link: https://fossilfueltracker.org/app/ffnpt

        
resources:
    Why R is Hard to Learn: 
        description: This article helps beginner learners articulate the "un-intuitive" parts of the R language.
        link: https://r4stats.com/articles/why-r-is-hard-to-learn/

goals:
    - description: 'In this workshop, you will learn to:'
    - Become familiar with core R programming concepts, including data vs. functions, tabular data, and operators.


---

# Why Learn R?

R has become a standard language for statistical computing and data analysis, especially in academia. It is open-source, contributing to its widespread adoption and increasing role as a standard for writing reproducible code. 

# Intended Audience
Are you a student in academic fields like humanities, social sciences, or various science programs where R isn't typically taught? This workshop isn't about diving deep into data wrangling or how to use R to run statistial models; instead, it lays the foundation for you to appreciate R's functionality, syntax and logic. While you don't need to install R or R Studio (more on these later) to get started, by the end of the workshop, you will be able to get started with those. 

We'll start with math puzzles and practical challenges to provide you with rapid feedback and tangible outcomes. 

# Interacting With R

This workshop is meant to be __interactive__--it intends to immediately engage you with the concepts you are learning. To that end, all of the R programming you will learn about can be done here, __directly in your browser__. Throughout the workshop, you will encounter several designated code sections in which you can write and run your R code. These emulators are meant to allow you quick and easy access to coding principles. However, there are many ways to interact with R, and you will also learn about how to interact with your R installation locally on your machine. 

With that said, let's get started!

## The Interactive Session

One of the most basic ways to interact with R is through an "interactive session."  This is a special space that allows us to run little one-line bits of R, experimenting and exploring what it can do, without having to save it. Think of this interactive space as a playground. Later on, we will be working with R in a more robust way, executing longer R scripts.



```r
2+3

```

```
32 +3
```

## A Little Math

Let's try a little math in the R prompt. In the Python REPL environment below <span style = "color:green">(shown in green text)</span>, type the following mathematical operations after the Python prompt (the `>>>`), and hit <kbd>enter</kbd> or <kbd>return</kbd> after each operation.


<CodeEditor>
    1+1
</CodeEditor>

<CodeEditor>
    1+2
</CodeEditor>

## First Puzzle

You see the following series of numbers and the end result of 8. Play with the code editor to come up with the right arithamtic operations to end up with 8!
(does up arrow give you previous line?)

10 [] 5 [] 6 [] 4 = 8


<CodeEditor>
    1+1
</CodeEditor>

10/5*6-4
(10/5)*6-4

## Getting used Boolean operations

<CodeEditor>

3 == 3
4 == 10
4 == "hello"

</CodeEditor>

Why might something like this be useful...these statements are obviously true or false!


# Data types

Data type are classifications associated with specific data that let the computer know how to interpret the value and how a programmer intends to use a piece of data. We've already encoutered a data type, integers, in the previous section when we tried the expression 3 + 3. Data types are common in many programming language, and each data type has its own unique properties. In R, certain functions can only take specific data types, and attempts at using a different data type can result in errors.

Here is a list of some of the data types you might use:

 - int stands for integers, or whole numbers.

 - dbl stands for doubles, or numbers with decimals.

 - chr stands for character vectors, or strings.

There are data types but these are the basic ones to get us started.

## typeof()

typeof() is a handy function that returns the data type of your data. If you’re ever in doubt, check your data with typeof()!

What do you think 5.44445 is?

How about "5.44445"?

<CodeEditor>
typeof(5.44445)
typeof("5.44445")

</CodeEditor>

So typeof() is our first function! Function is simply a way of doing something, a way of saving some code for reuse, and a way of taking an input, transforming that input, and returning an output. 

## Creating objects

This is where we leave simple calculator land and enter...computer language!

Let's look at the difference between:

<CodeEditor>
2 / 3
</CodeEditor>

and...

<CodeEditor>
head_size <- 2 / 3
</CodeEditor>

We are going from values to objects. Storing values in objects allows you to do interesting things with them later. To create an object, you pick a succinct, easy to remember name and then use the assignment operator <- to give the name a value.

The format is name <- value. 

The value on the right is assigned to the object on the left.

This statement can be interpreted as “2/3 goes into head_size”. For historical reasons, you can also use = for assignments, but not in every context. Because = can throw unexpected results in some situations, it is good practice to always use <- for assignments.

Which of the following object names is invalid?

- site_num

- R2

- 1st_try

- fish.scale.size

Try assigning numbers of each of these variable names. What happens?

You might have noticed that assigning a value to an object doesn’t print anything. To print the value, you can either use parentheses around the assignment or type the object name:

<CodeEditor>

head_size <- 40 # doesn't print anything
(head_size <- 40) # prints output

head_size # prints output if you've already assigned a value to the object

</CodeEditor>

Important aside: The comments written to the right of the hash mark don’t get run as code. Using informative comments is good coding practice. Clear comments are essential for when you want someone else to run your code and be able to interpret what you’re typing.

















my_sequence <- c(1,2,3,4)
my_new_sequence <- c(1,3,5,100)
mixed_vector <- c(1,"yes", 5, 100, TRUE)

print(mixed_vector)


# open a comma separated value file

read.csv("internet_usage_regions.csv")

full_dataset <- read.csv("internet_usage_regions.csv")

# sample data

head(full_dataset)
tail(full_dataset)

print(full_dataset)

# extract & show individual variables 

full_dataset$Region
full_dataset$Percentage

region_list <- full_dataset$Region

head(region_list)

# remove objects

rm(my_sequence)

# square brackets to extract values or vectors from a dataframe. *Row first, then column!*

full_dataset[5,3]

full_dataset[5,]
full_dataset[5,1:3]

central_asia_data <- full_dataset[full_dataset$Region == "Central Asia", ]



