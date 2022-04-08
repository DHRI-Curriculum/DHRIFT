# Modules

A module is a python file (like a script) that contains a number of functions and expressions that you want to include in your program. Programmers often import modules written by other programmers and use them like building blocks for their applications. 

In order to use modules, you need to add them to your script with `import` and then indicate which function you want to use with the dot syntax `.`. For example, we might use the function `choice` from the [`random`](https://docs.python.org/3/library/random.html) module, to generate random numbers. 

```pycon
>>> import random
>>> numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
>>> random.choice(numbers)
1
>>> random.choice(numbers)
3
>>> random.choice(numbers)
3
>>> random.choice(numbers)
1
>>> random.choice(numbers)
4
>>> random.choice(numbers)
9
```

# Readings

- An in depth explanation of [modules](https://docs.python.org/3/tutorial/modules.html) from the Python docs. 

# Tutorials

- A step-by-step tutorial on w3schools that demonstrates [how modules are composed](https://www.w3schools.com/python/python_modules.asp). 
