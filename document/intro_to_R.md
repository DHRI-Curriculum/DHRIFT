---
title: Introduction to R
description: R is an increasingly popular language for data analysis, especially in academia. 
programming_language: R
learning objectives:
    - Familiarize you with R language
    - Understand R syntax, logic, and 

    
facilitators: 
    name: 'Leanne Fan'
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

# Interacting With R

This workshop is meant to be __interactive__--it intends to immediately engage you with the concepts you are learning. To that end, all of the R programming you will learn about can be done here, __directly in your browser__. Throughout the workshop, you will encounter several designated code sections in which you can write and run your R code. These emulators are meant to allow you quick and easy access to coding principles. However, there are many ways to interact with R, and you will also learn about how to interact with your R installation locally on your machine. 

With that said, let's get started!

## The Interactive Session

One of the most basic ways to interact with R is through an "interactive session."  This is a special space that allows us to run little one-line bits of R, experimenting and exploring what it can do, without having to save it. Think of this interactive space as a playground. Later on, we will be working with R in a more robust way, executing longer R scripts.



```r
x = 5  # radius of a circle
```

```
par(mar = c(4, 4, .2, .1))
plot(cars, pch = 19)
plot(pressure, pch = 17)
```


As you can see, it first shows the current Python version along with some hints for help or licensing information. Next, you will see three very important greater-than signs: `>>>`. 

These greater-than symbols `>>>` are how you know that you have entered an interactive session with Python, as distinct from the normal `$` terminal prompt (or `%` if you are on MacOS). Let's work with this environment a bit.

## A Little Math

Let's try a little math in the Python prompt. In the Python REPL environment below <span style = "color:green">(shown in green text)</span>, type the following mathematical operations after the Python prompt (the `>>>`), and hit <kbd>enter</kbd> or <kbd>return</kbd> after each operation.


<CodeEditor>
    1+1
</CodeEditor>

You should see the text `Hello World!` appear in the output below the code editor in the shell.

