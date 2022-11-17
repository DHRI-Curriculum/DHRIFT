---
title: Creating Simulations
excerpt: In this workshop, you will learn to create a basic computer simulation in Python. Specifically, you’ll build a simulation that tracks the population growth/decline of an (imaginary) species of Critter, accounting for age, food availability, ability to reproduce, ecological disasters, and other factors.
cover_image: /images/workshops/img2.jpg
learning objectives:
    - Use classes to model and manipulate software objects.
    - Write your own functions and methods to perform custom computational tasks.
    - Simulate basic real-world processes to make predictions or model outcomes.
estimated time:
    - 3 - 4 hours
dependencies: 
    workshop prerequisites: 
        python:
            excerpt: (required) This workshop relies heavily on concepts from the Python workshop, and having a basic understanding of how to use the commands discussed in the workshop will be central for anyone who wants to learn about text analysis with Python and NLTK.
            required: true
    installations:
        pythonguide: 
            excerpt: You can use any installation of Python (but make sure it is of version 3). For our purposes, Anaconda will provide everything necessary for all the workshops that are part of the DHRI curriculum.
            recommended: true
        visual-studio-code: 
            excerpt: (Recommended) You can use any plain text editor, but for our purposes Visual Studio Code ("VS Code") will be used.
            recommended: true

authors:
    current: 'Zach Lloyd'
---

# Creating Simulations With Python

In this workshop, you will learn how to create very basic simulations in Python. The workshop will employ the logic of Python's object-oriented methodology to create two small simulations:  a dice rolling simulation, and a Critter simulation that tracks the population growth of an imaginary species of critter based on a variety of factors.

## Requirements

As mentioned on the front page, all that is required for this workshop is an installed version of [Python 3.x](https://www.python.org/downloads/) and [VSCode](https://code.visualstudio.com/). The full source code and a .txt file for displaying output (more on that later) are provided in the repo for you, but I encourage you to work through (i.e., type) out the code yourself to get used to the process.

---

## Part 1 - Throwing Some Dice

General outline:

__A)__ Create a simple dice rolling function:  demonstrates classes and objects on a basic level

Concepts we'll focus on:
- Class declaration and naming conventions
- Constructors/init
- Methods (functions within classes)
- Objects and instantiation

__B)__ Dice roller simulation:  roll the dice function as many times as we want, and evaluate the results

Concepts we'll focus on:
- Passing methods as arguments into other classes/functions
- Specifying iterations
- Using stats methods
- Printing results


### Getting Started

Create a new Python file called `DiceSim.py`. Because we will be using random numbers, and because we want to perform statistical methods on values, we will need to import two files at the top:

```python
import random
import statistics as stats
```
This import will allow us to use Python's `random` module. _Note: If you have used other programming languages you might be familiar of the concept of [seeding](https://www.w3schools.com/python/ref_random_seed.asp).  For our purposes, we do not need to explicitly seed random number generation when using Python's random library, as it will use either current system time or OS random resources by default._

Because we will be referencing the statistics library a few times in our code, we can `import` it `as stats`, just to shorten what we have to type every time.

### Creating Our Class

Next, let's create a `class` to represent our die object.  You can think of a class like a user-defined blueprint or prototype from which objects are created. Classes provide a means of bundling data and functionality together. Creating a new class creates a new type of object, allowing new instances of that type to be made. Each class instance can have features attached to it for maintaining and modifying its state.

For example, if we were to define a `Car` class, we might consider what attributes a car has:  brand, mileage, top speed, diesel or gas, stick or auto, 2-door or 4-door, etc. We could begin defining these characteristics as part of the overall class `Car` using variables. Variables particular to a class are called __data members__. We could then consider what actions a car can perform:  e.g., drive, brake, refuel, etc., and begin to write some functions in our `Car` class that describe these actions. Generally, functions that are specific to a certain class are called __methods__.  Unlike functions, methods use __.__ (dot) notation in order to be called--you'll see exactly what that means here shortly.

Because we are creating a dice simulator here, let's go ahead and create a new class `Die`:

```python
# create a new die class
class Die:  
    def __init__(self, sides):  
        self.sides = sides
```

We begin by defining our class. By convention, class names in Python are always _uppercase_. We then initialize our class using the `__init__` method.  

The `__init__` method is a special method that Python runs automatically whenever we create a new "instance" (a new object) of a class. This method has two leading underscores and two trailing underscores, a convention that helps prevent Python’s default method names from conflicting with your own method names. The `self` parameter is required in the method definition, and it must come first before any other parameters. It _must_ be included in the definition because whenever we call this method later, the method call will automatically pass the `self` argument. Every method call associated with an object (in this case, our die object) automatically passes `self`, which is a reference to the object itself; it gives the individual instance access to the attributes and methods in the class.

Our other parameter is `sides`. We include this in our `__init__` because every die object that is created will have a certain number of sides (typically 6) as an attribute. In short, your `__init__` parameters should always include characteristics that you want _every newly created object in your class_ to have.  

Next, we define our parameters, prefixed with `self`. Any variable prefixed with `self` is available to every method in the class, and we’ll also be able to access these variables through any instance created from the class. The line `self.sides`, for instance, takes the value associated with the parameter `sides` and assigns it to the local variable `sides`, which is then attached to the instance being created.

### Creating Our Method

Next, let's create a __method__ that allows us to roll our die object. Make sure you are indenting the method so that it is _within_ our die class.

```python
    # create a 'roll' method to return a random # between 1-6
    def roll(self):
        return random.randint(1, self.sides)
```

We first define (`def`) our method, and pass in the parameter `self`, which allows us to access the data members of our class. Next, we generate a random number using the `random` library. The `randint` function returns an integer in a range between the first value (1) and the second (self.sides). We will then `return` the value from the method so we can check the results.

### Displaying Results

Now that we have our class and our method set up, we can create (or _instantiate_) a new die object and give it a roll:

```python
die = Die(6)   
print(die.roll())
```

To create a new object, you begin as you would with any variable definition. Here we indicate that our `die` (lowercase) object will belong to our class `Die`. Because we also need to pass in a value for how many sides our object has, we will give it a value of `6`.

Next, we use a `print` statement to display the results of our roll method. To call our roll method, we must use our die object and __.__ (dot) notation--recall that methods _need to act upon an object or instance of the class_ in order to be called.

And that's it! You have successfully created a new die object that can be rolled.  If you check the results in your terminal, you should see your roll displayed.

#### Challenge!

If the user rolls a six, tell them that they won a prize. If they didn't roll a 6 display, that they're a loser.

__Solution__: Create a new variable that stores a roll. Then, use an `if else` statement to generate a message:

```python
r = die.roll()
if r == 6:
    print(f"You won a prize for rolling {r}!")
else:
    print(f"You rolled a {r}, not nearly as cool as a 6...")
```

---

## The Dice Simulator

### Creating a New Class

Let's say that we wanted to throw our die object 1000 times (instead of just once) and analyze the results of all the rolls. We can simulate this process by creating a new class.

Let's call our class `DiceSim`. What we want this class to do is to roll our die an x amount of times, and print the results. Thinking this through, we will likely want two methods:  1) a method that utilizes our `roll()` method we've already created above and runs it 1000 times, and 2) a method that analyzes the results of those 1000 rolls.  Let's do just that:

```python
class DiceSim:
    """Rolls our dice x amount of times and prints the results

    Parameters:
        dice_method: The dice method that we'll pass in
        iterations: The number of times to run the sim"""

    def __init__(self, dice_method, iterations):
        # take initial parameters
        self.dice_method = dice_method
        self.iterations = iterations
        self.results = []
        self.run()
```

We will pass in our two parameters for the class, one for our roll method and the other for the number of iterations we want the simulator to run. Like before, we prefix each variable with `self` so that we can access the values from anywhere within our class. We also create a new empty list `results`, so that we have a place to store the results of our dice rolls. We also have one method call, `run()`. Calling a method in the initializer area like this means that it will run every time a new object of the `DiceSim` class is created.

### Creating Our Class Methods

Next, let's create the methods for our simulator class. We will want one to run our roll method, and one to analyze and print our results:

```python
    # run our die roll method and store the results
    def run(self):
        for i in range(self.iterations):
            result = self.dice_method()
            self.results.append(result)
        self.report()

    # report the results of the analysis
    def report(self):
        max_num = max(self.results)
        min_num = min(self.results)
        mean = stats.mean(self.results)
        median = stats.median(self.results)
        mode = stats.mode(self.results)
        std_dev = stats.stdev(self.results)
        variance = stats.variance(self.results)
        print(
            f"""Number of Simulations: {self.iterations}
            Max: {max_num}
            Min: {min_num}
            Mean: {mean}
            Median: {median}
            Mode: {mode}
            Standard Deviation: {std_dev}
            Variance: {variance}"""
        )
```

In our `run()` method, we use a `for` loop to cycle through by the number of iterations we will set. We then store the results of the die roll method in a local variable `result`, and `append()` that result to our `results` list. We then call our next method, `report()`, to analyze the results.

The `report()` method uses Python's built-in `max()` and `min()` functions to catch the highest and lowest roll in the list. Using the `stats` library, we also check the mean, median, mode, standard deviation, and variance of the results and print it to the terminal.

Our last step is to create a new instance of our simulator class:

```python
die1 = Die(6)
sim = DiceSim(die1.roll, 1000)
```
First, we create a new instance of our `Die` class (remember, you can create as many new objects of a class as you'd like!) and give it 6 sides. Then, we create a new `sim` object. As parameters, we pass in our roll method and 1000, for the number of iterations to run.

And that's it! If you run the program in your terminal, you should see a report of the results of the simulation.

### Key Terms

- __class__: Classes allow us to create new types of software objects, with their own attributes and functionalities.
- __method__: Methods are functions that belong to a class. They are called using __.__ (dot) notation.
- __self__: The keyword self represents an instance of a class and binds its attributes with the given arguments.
- __return__: The return statement allows you to access a value once a given function or method has finished running.

---

## Part 2 - Critter Simulator

__Goal:__  Create a simulation that tracks the population growth of a proposed (imaginary) species of Critter, taking into account a variety of biological and environmental factors.

__General Process:__
1. Create global variables to define initial parameters for use in the simulation
2. Create Critter class and constructors/initializers for each critter object
3. Consider what critters need to survive, creating relevant methods (reproducing, gathering food, etc.).
4. Create 'run year' function to simulate a yearly run-through of all variables and factors
5. Create 'populate simulator' function to produce our starting population
6. Print results of each aspect of simulation to monitor changes
7. Add more complexity/factors to the simulator (e.g., disasters)

__Concepts to focus on:__
- Creating logical environment parameters
- Component-driven design: separating out functions so that each has a single general purpose
- Working with lists
- Coordinating data among member functions

## Getting Started

Create a new Python file called `CritterSim.py`. Because we will be using a lot of random values in our program, we'll first want to `import` the `random` module at the beginning of the file, like so:

```python
import random
```

## Setting Up Our Global Variables

When we write variables outside a specific function or class, they are considered __global__ variables. Global variables can be accessed and used anywhere in your program. This is in contrast to __local__ variables, which have limited scope (i.e., they can only be accessed in the particular function or class in which they live).

Global variables are useful when you want multiple functions to be able to easily access their values. It is important to note, however, that it is generally good coding practice to _keep your use of global variables to a minimum_. Too many global variables will make your programs confusing for other programmers looking over your code, and will require more overhead/computing power than is usually necessary.

Since our program is relatively small, and just to keep things simple for our example, we'll set up our initial parameters for the simulation as a series of global variables below our `import` statement, like so:

```python
# initial global parameters - variables that can be accessed anywhere in your program
startPopulation = 50  # the beginning population
year = 0  # the starting year
resources = 2   # the number of units of food each able critter can produce
food = 0    # total value of food available (able critters * resources)
fertility_x = 10  # lowest age at which critter can give birth
fertility_y = 20  # upper age at which critter can give birth
disasterChance = 10 # chance of a disaster occurring
critterList = []  # list to hold all critter objects
```

As you can see, each variable is commented to give some context for its use. These variables will make more sense once we actually start to employ them, but let's do a quick run-through of their purposes:

`startPopulation` is the initial number of Critters we want to start with in our simulation. Although 50 is not a realistic number (considering the real-life genetic consequences of inbreeding), it will work for the purposes of our simulation.

`year` will be the variable we'll use to track what year of the simulation it is.

`resources` is the number of individual `food` units our critters can produce. For our simulation, each critter will need exactly one unit of food to survive, so to give them a fighting chance we'll let each _able_ (more on that later) critter produce 2 units.

`food`constitutes the total number of units of food that all critters produce and have to eat in a given year.

`fertility_x` constitutes the lowest possible age at which a critter can give birth (so they're not too young). Let's be optimistic with these critters and propose they can live for a rather long time (perhaps 50 years or so), and set the low fertility level to 10.

`fertility_y` constitutes the highest possible age at which a critter can give birth (so they're not too old). To start, let's keep the fertility period rather short and set the maximum age to 20 (we can always adjust it later).



`critterList` is a list that will contain the entire population of our critters. We will access and modify this list continuously in order to assess our total population growth.

## Creating the Critter Class

Now that we have our initial parameters, let's begin writing our Critter class:

```python
# create our Critter class
class Critter:
    def __init__(self, age):
        self.sex = random.randint(0,1)  # 0 for male, 1 for female
        self.age = age # we'll set the age differently based on diff factors
```

We begin by defining our class, passing the `self` parameter like usual. Our other parameter is `age`. We include this in our `__init__` because every critter object that is created will have an age that we want to track and modify. In short, as a reminder, your `__init__` parameters should always include characteristics that you want _every newly created object in your class_ to have. Because we want our critters to reproduce, we also give them a variable `sex`. For every critter instance created, we will assign them a random sex:  0 for male, 1 for female.

## Creating Our Class Methods

Now that we have set up some very basic characteristics of our critters, we will want to let them perform some actions. We can do this by writing __methods__. Let's create two very basic methods, `gather()` and `reproduce()`.

### Gather()

Because we will certainly want our critters to eat, let's create a method that allows them to gather food. Make sure you properly indent your method so it is contained _within_ the Critter class.

```python
    # method for critters to gather food
    def gather(food, resources):
        ableCritters = 0  # start with a fresh value, then add based on current population
        for critter in critterList:
            if critter.age > 10 and critter.age < 40:
                ableCritters +=1
        food += ableCritters * resources
        print(f"Food stockpile: {food}.")
        print(f"Able critters: {ableCritters}.")
```

We first define our `gather` method, and pass two arguments into it:  `food` and `resources`, which we have already declared above as global variables. We then create a new variable, local to the `gather` method:  `ableCritters`. Because we wouldn't want our newborn baby critters going out to gather food until they've grown up a bit, we will use `ableCritters` to ensure they won't gather food until they're of a certain age. For now, let's set this value to 10 (anticipating a generous long life and old age for our critters), and let them enjoy their retirement from gathering food at 40. So, using a `for` loop we'll then cycle through our critter list and see if any existing critters are over the age of 10 and under the age of 40. If they are, we'll add them to the number able to gather food and store the number. Next, we'll use this value, multiplied by our resource value, to determine the current total quantity of food stores. Lastly, we print out the results of both our food stockpile and our number of able critters.

Next, still in our gather method body, we will want to (unfortunately) reduce our critter population if starvation occurs:

```python
        # if there are not enough able critters to produce food in the pop, food will deplete
        if food < len(critterList):   
            del critterList[0:int(len(critterList) - food)] # del a slice of the list based on how many critters starve
                # since we are starting from the beginning of our list, we are likely killing older critters (because they have aged)
            food = 0
            print(f"Some critters starved to death! :(")
        else:
            food -= len(critterList) # otherwise, just remove food equal to the amount of critters, the rest is stored for next year

        print(f"Population after starvation/feeding is: {len(critterList)}.")
        print(f"After eating, food stockpile is currently {food}.") # food = initial food - pop after eating
```

As mentioned, for each critter to survive they will need exactly one unit of food per year. So, in this method, we first check to see if our food stockpile is smaller than the amount of existing critters. If so, we use the `del` statement to remove a slice of our critter list. As you can see, we are taking a slice starting from the beginning of the list and removing an amount equal to the excess amount of critters. While this is not quite as random as it could be (because we are always starting at the beginning of our list), it would make sense that more elderly critters are not able to reach the food stockpile as quickly as their younger, more able counterparts. If some critters starve, then we display a message telling us so. If no critters starve, we simply remove an amount of food equal to the critter population, and store the surplus for next year. We then print our overall results.

### Reproduce()

For a population growth simulation, another basic action our critters should take is to reproduce:

```python
    def reproduce(fertility_x, fertility_y):
        for critter in critterList:
            if critter.sex == 1:    # if the critter is female and of defined fertile age
                if critter.age >= fertility_x:
                    if critter.age <= fertility_y:
                        if random.randint(0, 4) == 1:  # give a 1 in 5 (20%) chance of pregnancy
                            critterList.append(Critter(0)) # add newborn critter                
```

Our method will take the two fertility parameters we established before. Next, using a series of nested `for` loops, we'll take a look at each critter in the list to see if they are suitable candidates for giving birth. We first check if they are female, and if so, check if they are within our circumscribed fertility age. If both of these conditions are satisfied, we'll then give the critter a 20% chance of getting pregnant with a simple `random` calculation. If the result is a 1, we'll create a new critter and append it to the critter list with an age of 0.   

#### Challenge!

Occasionally, new critters may not be born during a year. To analyze this, once the reproduction cycle has finished, print out a short message to the terminal saying "New critters have been born!", if indeed new critters were born that year.

__Solution:__  At the start of the reproduce method, create a new local variable to record how many critters we start out with. Then, outside of the `for` loop, compare that initial value with the new quantity or length (`len()`) of the critter list. So, your modified code should look something like this:

```python
    def reproduce(fertility_x, fertility_y):
        # Challenge: print statement to show that new critters were born
        initial_pop = len(critterList)    # create a local var to store how many critters we start with

        for critter in critterList:
            if critter.sex == 1:    # if the critter is female and of defined fertile age
                if critter.age >= fertility_x:
                    if critter.age <= fertility_y:
                        if random.randint(0, 4) == 1:  # give a 1 in 5 (20%) chance of pregnancy
                            critterList.append(Critter(0)) # add newborn critter                

        # If new critters have been added, print the message
        if initial_pop < len(critterList):    
            print("New critters were born!")
```

Note that you would not want to print out the message inside the `for` loop, because then you would display the message _every single_ time a new critter is created (making your terminal readout very messy), rather than after _all_ new critters are created.

## Simulation Functions

Our next step will be to write the functions that will control our simulation in a systematic way. I say functions (not methods), because these will live outside of our Critter class (in fact, we'd likely want to create a _new_ Simulation class to control all these aspects). Because our program is relatively simple, however, we'll simplify our code using functions.

Let's write two new functions: `popSim()`, to initially populate our simulation with critters, and `runYear()`, to simulate each yearly run-through of the simulation.

### Populate Simulator()

```python
# function to initially populate our critter list with Critter objects
def popSim():
    for x in range(startPopulation):
        critterList.append(Critter(random.randint(2,45)))
```
To begin our simulation, we'll start by calling the `popSim()` function. The function takes our `startPopulation` variable defined in our globals above, and populates our critterList with that many objects. To give our simulation an added element of randomness, each starting critter will be created with a random age between 2 and 45.

### Run Year()

Next we will want to create the function that allows our simulation to loop each year:

```python
def runYear(food, resources, fertility_x, fertility_y):
    Critter.gather(food, resources)
    Critter.reproduce(fertility_x, fertility_y)

    # age our existing critters
    for critter in critterList:
        if critter.age > 50:
            critterList.remove(critter)
        else:
            critter.age +=1

    # set up chance for a disaster
    if random.randint(0, 100) < disasterChance:  
            del critterList[0:int(random.uniform(0.05,0.2)*len(critterList))]
            print("A disaster has occurred!")
            print(f"There are now {len(critterList)} surviving critters.")

    print(f"After reproducing and/or any disasters, critter population is currently {len(critterList)}.")
```

We will pass 4 arguments into this function:  our food, resource, and fertility values. The reason we need to get at these values is because we will want to then pass them into our Critter method calls. That is the first step we take: calling our `gather()` and `reproduce()` functions, at the beginning of each year. Because we are calling these methods outside of their class, we need to prefix the calls with our class name `Critter`.

Next, we will age our existing critters by one year. For now, let's set their maximum age to 50 years--once they are over 50 years, we will assume they die of old age, and we `remove` the critter from our list.

Lastly, we set up a basic disaster scenario. Using our `disasterChance` value we set above, we will test to see if a random number falls in its range. If so, we will `del` some critters from our list, again taking a slice. We generate a random number between 5% and 20% to see how much damage the disaster will effect. We multiply this value by the length of our critter list to get a 5-20% slice of our population, and then delete that slice. To keep tabs in our readout, we display a message saying a disaster has occurred, and print out the surviving population.

## Running the Simulation

All that's left to do now is to set up the logic for running our simulation.

```python
print("--------The Critter Simulation has begun!---------\n\n")
popSim()
while len(critterList) < 100 and len(critterList) > 1:
    runYear(food, resources, fertility_x, fertility_y)
    year += 1
    print(f"Current year: {year}\n")
```

We first print a message notifying the user the simulation has started. Next, we run our `popSim()` function to initially populate our critter species. Then, we use a `while` loop to make sure the program runs until certain conditions are satisfied. Our conditions will be population limits:  so, the simulation will terminate once either all critters have died (until the population reaches 0), or until the population reaches over 100. Until this happens, we will run our `runYear()` function, and increase the current year.

### Displaying Output in VSCode

We'll be logging a lot of info to the console when we run our program, so that it can become hard to read the entire log of the output. VSCode has a default limitation to how much output can be displayed.

Two ways to address this:

1. Allow VSCode to display more output in the terminal.  Go to __File > Preferences > Settings > Features > Terminal > Integrated:Scrollback__, or in the __Settings__ Search bar simply type __integrated:scrollback__. Make sure you are changing Integrated:Scrollback, not Persistent Session Scrollback.  The default value is 1000, but you can change it to something like 10000 so you can see more output.

2. Write your output to a .txt file instead of the terminal. In the folder where your Python file lives, create a new blank .txt file called sim_output.txt. Then, instead of running your code like usual, type `python yourFileName.py > sim_output.txt` into the VSCode terminal and hit Enter. You should see a silent success in the terminal. Now, if you double-click to open the .txt file, you should see it populated with your program's output.

### Key Terms

- __global variables__: Unlike local variables, which are limited in scope, global variables can be accessed anywhere in your programs.
- __len()__: The length function allows us to catch the number of elements in a given list.
- __remove()__: Removes the current single value from a list.
- __del()__: Removes a particular range or slice from a list.
- __while__: While statements will loop through a set of instructions until certain conditions are met.
