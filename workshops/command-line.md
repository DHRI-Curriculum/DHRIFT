---
title: 'Command Line Workshop'
description: 'If asked to show someone who has never seen a computer how to do something on your computer, many of us would explain what a screen and a cursor are, and then show how to point and click on icons. This approach relies on a graphical user interface, or GUI (pronounced “gooey!”). Today we’re going to explore another way to make your computer do things: through the command line. Instead of pointing and clicking, we’ll be typing in either git bash (Windows) or terminal (macOS) to tell the computer directly what task we’d like it to perform.'
cover_image: '/images/workshops/img2.jpg'
programming_language: 'computer'
learning objectives: 
    - description: 'The goals of this workshop are to:'
    - Learn common commands to create files (`touch` and `echo`)
    - Learn commands to create directories (`mkdir`)
    - Navigate our file structure using change directory (`cd`), print working directory (`pwd`), and list (`ls`)
    - Move content from one place to another using redirects (`>`) and pipes (`|`)
    - Explore a comma separated values (.csv) dataset using word and line counts, `head` and `tail`, and the concatenate command `cat`
    - Search text files using the `grep` command
    - Create and sort cheat sheets for the commands we learn
estimated time: 
    description: 3 hours
dependencies:
    workshop prerequisites:
            visual-studio-code: 
                description: (Recommended) You can use any plain text editor, but for our purposes Visual Studio Code ("VS Code") will be used.
            gitguide:
                description: (Required) If you're using Windows, you will need to follow the instructions to install so that we can work in the cross-platform Unix command line for this session. If you're using macOS, however, you do not need to take any action. The built-in Terminal application has all the functionality we need.

        
readings:
    - See [Julia Evans's Bite Size Command Line here](https://jvns.ca/blog/2018/08/05/new-zine--bite-size-command-line/) (recommended). Julia Evans's comics explain in detail (while being fun!) some of the most central Unix command line tools. It's a great zine to have on your desk next to you for this workshop, and long after.
    - Basic UNIX commands [can be found here](http://mally.stanford.edu/~sr/computing/basic-unix.html) (recommended). This is another list of commonly used commands in the command line. It's useful, but can be a little overwhelming if you don't have any exposure to these things beforehand. Don't worry, we will cover the most important ones in our Introduction to Command Line workshop!
    - Neal Stephenson's ["In the Beginning... Was the Command Line"](http://cristal.inria.fr/~weis/info/commandline.html) is a useful piece to grasp the relationship between (and the affordances of) the command line and the GUI.
    - Douglas Rushkoff's [*Program or Be Programmed*](https://rushkoff.com/books/program-or-be-programmed/) offers some reflections on how using the command line allows one to communicate in a less mediated way with their machines and the importance of doing so in the current technoscape.

projects:
    - description: "Mastering the command line will prove useful in a great number of projects. Most Python- and R-based projects will require you to have some knowledge of the command line. At a very basic level, you will be invoking a Python script and will be using values of command line arguments when creating and running your scripts."
    - The command line is useful for setting up installations of server-side software (or more advanced software-as-a-service software, sometimes acronymized as SaaS). [Omeka](http://www.omeka.org) is merely one example. The command line will allow you to navigate the file structure of your server. Commands like `ls`, `mkdir`, `rmdir`, `cd`, etc. are really important. For example, `grep` could help you find a plugin directory that you might have accidentally placed in the wrong location.
    - "[Fair World 64: A Text-Based Game of the 1964–1965 World's Fair](https://academicworks.cuny.edu/gc_etds/3786/) A recent digital capstone project by Christofer Gass runs a Python script on the command line."
    - "[Awesome Bash](https://github.com/awesome-lists/awesome-bash) - a curated list of useful Bash scripts and resources."

ethical considerations:
    - "'The command line' is laden with masculine and military metaphors, which is reflective of the history of computing and programming. As Wendy Hui Kyong Chun discusses in [On Software, or the Persistence of Visual Knowledge (2004)](https://doi.org/10.1162/1526381043320741), almost all computers (as in human computers) in the US during World War II were young women. Human computers received commands from analysts—predominantly men with the military—that they then had to interpret and act upon the machine. As Chun (p. 34) argued, 'computation depends on 'yes, sir' in response to short declarative sentences and imperatives that are in essence commands ... The command line is a mere operating system (OS) simulation.' If commands are the ways in which a user communicates with machines, the command line (of computers today) receives these commands as text that is typed in."
---

# Acknowledgements

TODO: Add acknowledgements to metadata

- Current Author: [Stefano Morello](https://github.com/smorello87)
- Past contributing Author: [Kelsey Chatlosh](https://github.com/kchatlosh)
- Past contributing Author: [Patrick Smyth](https://github.com/smythp)
- Past contributing Author: [Mary Catherine McKinniburgh](https://github.com/mckinniburgh)
- Past contributing Author: [Jojo Karlin](https://github.com/jojokarlin/)
- Past contributing Author: [Kalle Westerling](https://github.com/kallewesterling)
- Past reviewer: [Di Yoong](https://github.com/dyoong)
- Current editor: [Lisa Rhody](https://github.com/lmrhody)
- Current editor: [Kalle Westerling](https://github.com/kallewesterling)

# What Is the Command Line?

The command line is a text-based way of interacting with your computer. You may hear it called different names, such as the terminal, the shell, or bash. In practice, you can use these terms interchangeably. (If you're curious, though, you can read more about them [in the glossary](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/command-line.md).) The shell we use (whether terminal, shell, or bash) is a program that accepts commands as text input and converts commands into appropriate operating system functions.

The command line (of computers today) receives these commands as text that is typed in.

## What Does "Text-based" Mean?

For those of us comfortable reading and writing, the idea of "text-based" in the context of computers can seem a bit strange. As we start to get comfortable typing commands to the computer, it's important to distinguish "text" from word processed, desktop publishing. In the latter case, we use software (think Microsoft Word or Google Docs) that displays what we want to produce without showing us the code the computer is reading to render the formatting. On the other hand, while less pretty to look at, plain text has the advantage of being manipulable in different contexts.

Let's take a quick moment to discuss text and text editors.

# Text Editors

## What is Text?

Before we explain which program we'll be using for editing text, we want to give a general sense of this "text" we keep mentioning. For those of us in the humanities, whether we follow literary theorists who read any object as a "text" or we dive into philology, paleography, codicology or any of the fields [David Greetham](https://en.wikipedia.org/wiki/David_Greetham_(textual_scholar)) lays out in _Textual Scholarship_, "text" has its specific meanings. As scholars working with computers, we need to be aware of the ways plain text and formatted text differ. Words on a screen may have hidden formatting. Many of us learned to use a word processor like Microsoft Word and don't realize how much is going on behind the words shown on the screen. For the purposes of communicating with the computer and for easier movement between different programs, we need to use text without hidden formatting.

![Word Doc](/images/command-line/worddoc.png)

Users with visual disabilities, [click here](https://github.com/DHRI-Curriculum/command-line/raw/v2.0/files/WordProcessorExample.docx) to download the Word file.

If you ask the command line to read that file, this Word `.docx` file will look something like this

![Word Doc as visualized by Command Line](/images/command-line/CatWordDoc.png)

Users with visual disabilities, [click here](https://raw.githubusercontent.com/DHRI-Curriculum/command-line/v2.0/files/PK.md) to download the text file.

Word documents which look like "just words!" are actually comprised of an archive of extensible markup language (XML) instructions that only Microsoft Word can read. Plain text files can be opened in a number of different editors and can be read within the command line.

## Plain Text

For the purposes of communicating with machines and between machines, we need characters to be as flexible as possible. Plain text include characters of readable material but not graphical representation.

According to the [Unicode Standard](https://unicode.org/versions/Unicode13.0.0/),

> Plain text is a pure sequence of character codes; plain Unicode-encoded text is therefore a sequence of Unicode character codes.

Plain text shows its cards—if it's marked up, the markup will be human readable. Plain text can be moved between programs more fluidly and can respond to programmatic manipulations. Because it is not tied to a particular font or color or placement, plain text can be styled externally.

A counterpoint to plain text is rich text (sometimes denoted by the Microsoft rich text format `.rtf` file extension) or "enriched text" (sometimes seen as an option in email programs). In rich text files, plain text is elaborated with formatting specific to the program in which they are made.

Plain text has two main properties in regard to rich text:

> Plain text is the underlying content stream to which formatting can be applied. Plain text is public, standardized, and universally readable.

## Choosing a Text Editor

An important tool for programming and working in the command line is a text editor. A text editor is a program that allows you to edit plain text files, such as `.txt`, `.csv`, or `.md`. Text editors are not used to edit rich text documents, such as `.docx` or `.rtf`, and rich text editors should not be used to edit plain text files. This is because rich text editors will add many invisible special characters that will prevent programs from running and configuration files from being read correctly.

While it doesn't really matter which text editor you choose, you should try to become comfortable with at least one text editor.

Choosing a text editor has as much to do with personality as it does with functionality. Graphical user interfaces (GUIs), user options, and "hackability" vary from program to program.

## Default Recommendation

For our workshops, we will be using [Visual Studio Code](https://code.visualstudio.com/). Not only is Visual Studio Code free and open source, but it is also consistent across macOS, Windows, and Linux systems.

You will have downloaded Visual Studio Code according to the [instructions](https://github.com/DHRI-Curriculum/install/blob/v2.0/guides/visual-studio-code.md) on the installations page. We won't be using the editor a lot in this tutorial, so don't worry about getting to know the editor now. In other workshops we will discuss syntax highlighting and version control, which Visual Studio Code supports. For now we will get back to working in the command line itself.

## Evaluation

1. What is the difference between a plain text document and a rich text document? (Select all that apply)

<Quiz>
- Plain text contains no formatting, only line breaks and spacing.*
- Plain text cannot be marked up.
- Rich text is styled text, _i.e.,_ plain text completed by information such as font size, format, and colors.*
- One can't determine whether there is a difference between the two without looking at their content.
</Quiz>

2. What is the Command Line? How is it different from your text editor?

# Why is the Command Line Useful?

Initially, for some of us, the command line can feel a bit unfamiliar. Why step away from a point-and-click workflow? By using the command line, we move into an environment where we have more minute control over each task we'd like the computer to perform. Instead of ordering your food in a restaurant, you're stepping into the kitchen. It's more work, but there are also more possibilities.

The command line allows you to...

- Easily automate tasks such as creating, copying, and converting files.
- Set up your programming environment.
- Run programs you create.
- Access the (many) programs and utilities that do not have graphical equivalents.
- Control other computers remotely.

In addition to being a useful tool in itself, the command line gives you access to a second set of programs and utilities and is a complement to learning programming.

What if all these cool possibilities seem a bit abstract to you right now? That's alright! On a very basic level, most uses of the command line are about **showing information** that the computer has, or **modifying or making** things (files, programs, etc.) on the computer.

In the next section, we'll make this a little more clear by getting started with the command line.

# Getting to the Command Line

## macOS

If you're using macOS:

1. Click the Spotlight Search button (the magnifying glass) in the top right of your desktop.

2. Type `terminal` into the bar that appears.

3. Select the first item that appears in the list.

4. When the Terminal pops up, you will likely see either a window with black text over white background or colored text over a black background.

![Terminal in macOS](/images/command-line/osx_term.png)

Please note: You can change the color of your Terminal or BashShell background and text by selecting `Shell` from the top menu bar, then selecting a theme from the menu under `New Window`.

Bonus points: if you really want to get the groove of just typing instead of pointing and clicking, you can hold the <kbd>command (⌘)</kbd> key while and press <kbd>space</kbd> to pull up Spotlight search, start typing `Terminal,` and then hit <kbd>enter</kbd> to open a terminal window. This will pull up a terminal window without touching your mousepad. For super bonus points, try to navigate like this for the next fifteen minutes, or even the rest of this session—it is tricky and sometimes a bit tiring when you start, but you can really pick up speed when you practice!

## Windows

We won't be using Windows's own non-UNIX version of the command line. Instead, we will use Git Bash. If you haven't installed it yet, you can follow [these instructions](https://github.com/DHRI-Curriculum/install/blob/v2.0/guides/git.md). The reason we use Git Bash as the command line on Windows is that it makes you able to run the same commands as you would on a computer running macOS or Linux. Git Bash includes core utilities available on Linux that are not available on Windows.

1. Look for Git Bash in your programs menu and open.

2. If you can't find the git folder, just type `git bash` in the search box and select `git bash` when it appears.

3. Open the program.

4. When the terminal pops up, you will likely see either a window with black text over white background or colored text over a black background.You know you're in the right place when you see the `$`.

  _Note that the sign for you being in the right place might also be a `%` or a `#` depending on your operating system._

![Terminal on Windows](/images/command-line/win_term.png)

Bonus points: if you really want to get the groove of just typing instead of pointing and clicking, you can press <kbd>windows</kbd> to open the Start menu, start typing `git bash` and then hit <kbd>enter</kbd> to open a git bash window. This will pull up a command window without touching your mousepad.

## Command Prompt `$`

`$`, which we will refer to as the "command prompt," is the place you type commands you wish the computer to execute. We will now learn some of the most common commands.

When you see the `$`, you're in the right place. As noted above, however, the sign varies somewhat between systems, and sometimes the sign is a `%` or a `#`. We call the sign the _command prompt_; it lets us know the computer is ready to receive a command.

In the following lessons, we will refer to the command prompt using a `$`. Just make a note now of your sign, if it differs from the dollar sign. You will be able to follow along just fine as long as you understand that they all are different ways of knowing that you are "at the _command prompt_."

# Prefatory Pro Tips

Before we get started, I wanted to give you a couple of tips of things to keep in mind.

1. Go slow at first and check your spelling! One of the biggest things you can do to make sure your code runs correctly and you can use the command line successfully is to make sure you check your spelling! _Keep this in mind!_ If at first something doesn't work, check your spelling! Unlike in human reading, where letters operate simultaneously as atomistic symbols and as complex contingencies (check [Johanna Drucker](https://genius.com/Johanna-drucker-from-a-to-screen-annotated) on the alphabet), in coding, each character has a discrete function including (especially!) spaces.

2. Keep in mind that the command line and file systems on macOS and Unix are usually pre-configured as cAsE-pReSeRvInG—so capitalizations also matter when typing commands and file and folder names.

3. While copying and pasting from this handy tutorial may be tempting to avoid spelling errors and other things, we encourage you not to! Typing out each command will help you remember them and how they work.

Now, we are ready to get started.

# Navigation

## Getting started: know thyself

You may also see your username to the left of the command prompt `$`. Let's try our first command. Type the following and press <kbd>enter</kbd> on your keyboard:

```console
$ whoami
```

The `whoami` command should print out your username. Congrats, you've executed your first command! This is a basic pattern of use in the command line: type a command, press <kbd>enter</kbd> on your keyboard, and receive output.

## Orienting Yourself in the Command Line: Folders

OK, we're going to try another command. But first, let's make sure we understand some things about how your computer's filesystem works.

Your computer's files are organized in what's known as a hierarchical filesystem. That means there's a top level or `root` folder on your system. That folder has other folders in it, and those folders have folders in them, and so on. You can draw these relationships in a tree:

![An example of how a hierarchical filesystem looks](/images/command-line/hierarchical-filesystem-example.png)

The root or highest-level folder on macOS is just called `/`. We won't need to go in there, though, since that's mostly just files for the operating system. On Windows, the root directory is usually called `C:`. (If you are curious why `C:` is the default name on Windows, you can read about it [here](http://www.todayifoundout.com/index.php/2015/04/c-drive-default-windows-based-computers-2).)

Note that we are using the word "directory" interchangeably with "folder"—they both refer to the same thing.

OK, let's try a command that tells us where we are in the filesystem:

```console
$ pwd
```

You should get output like `/Users/your-username`. That means you're in the `your-username` directory in the `Users` folder inside the `/` or root directory. This directory is often called the "home" directory.

On Windows, your output would instead be `C:/Users/your-username`. The folder you're in is called the working directory, and `pwd` stands for "print working directory." "Print" as a word can be somewhat misleading. The command `pwd` won't actually print anything except on your screen. This command is easier to grasp when we interpret "print" as "display."

Now we know "where" we are. But what if we want to know what files and folders are in the `your-username` directory, a.k.a. the working directory? Try entering:

```console
$ ls
```

You should see a number of folders, probably including `Documents`, `Desktop`, and so on. You may also see some files. These are the contents of the current working directory. `ls` will "list" the contents of the directory you are in.

Wonder what's in the `Desktop` folder? Let's try navigating to it with the following command:

```console
$ cd Desktop
```

The `cd` command lets us "change directory." (Make sure the "D" in "Desktop" is capitalized.) If the command was successful, you won't see any output. This is normal—often, the command line will succeed silently.

So how do we know it worked? That's right, let's use our `pwd` command again. We should get:

```console
$ pwd
/Users/your-username/Desktop
```

Now try `ls` again to see what's on your desktop. These three commands—`pwd`, `ls`, and `cd`—are the most commonly used in the terminal. Between them, you can orient yourself and move around.

One more command you might find useful is `cd ..` which will move you one directory up in the filesystem. That's a `cd` with two periods after it:

```console
$ cd ..
```

## Challenge

Before moving on, take a minute to navigate through our computer's file system using the command line. Use the three commands you've just learned—`pwd`, `ls` and `cd`—eight (8) times each. Go poking around your `Photos` folder, or see what's so special about that root `/` directory. When you're done, come back to your "home" folder with

```console
$ cd ~
```

(That's a tilde <kbd>~</kbd>, on the top left of your keyboard.) 

### Compare with the GUI

It's important to note that this is the same old information you can get by pointing and clicking displayed to you in a different way.

Go ahead and use pointing and clicking to navigate to your working directory—you can get there a few ways, but try starting from "My Computer" and clicking down from there. You'll notice that the folder names should match the ones that the command line spits out for you, since it's the same information! We're just using a different mode of navigation around your computer to see it.

## Solution

1. Type `pwd` to see where on your computer you are located.
2. Type `cd name-of-your-folder` to enter a subfolder.
3. Type `ls` to see the content of that folder.
4. Type `cd ..` to leave that folder.
5. Type `pwd` to make sure you are back to the folder where you wish to be.
6. Type `cd ~` to go back to your home folder.
7. Type `pwd` to make sure you are in the folder where you wish to be.
8. Type `cd /` to go back to your root folder.
9. Type `ls` to see the content of folder you are currently in.
10. Type `pwd` to make sure you are in the folder where you wish to be.
11. Type `cd name-of-your-folder` to enter a subfolder.

## Evaluation

1. What command do you run if you are trying to identify where in the filesystem you are currently located/working?

<Quiz>
- $ `ls`
- $ `pwd`*
- $ `cd`
- $ `whoami`
</Quiz>

2. When and why would you want to use the command line as opposed to your operating system's GUI?

## Keywords

Do you remember the glossary terms from this section?

- [Filesystem](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/filesystem.md)
- [GUI](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/gui.md)
- [Root](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/root.md)

# Creating Files and Folders

## Creating a File

So far, we've only performed commands that give us information. Let's use a command that creates something on the computer.

First, make sure you're in your home directory:

```console
$ pwd
/Users/your-username
```

Let's move to the `Desktop` folder, or "change directory" with `cd`:

```console
$ cd Desktop
```

Once you've made sure you're in the `Desktop` folder with `pwd`, let's try a new command:

```console
$ touch foo.txt
```

The `touch` command is used to create a file without any content. This command can be used when you don’t have any data yet to store in it.

If the command succeeds, you won't see any output. Now move the terminal window and look at your "real" desktop, the graphical one. See any differences? If the command was successful and you were in the right place, you should see an empty text file called `foo.txt` on the desktop. Pretty cool, right?

## Handy Tip: Up Arrow

Let's say you liked that `foo.txt` file so much you'd like another! In the terminal window, press the <kbd>up arrow</kbd> on your keyboard. You'll notice this populates the line with the command that you just wrote. You can hit <kbd>enter</kbd> to create another `foo.txt,` (note - [`touch`](https://en.wikipedia.org/wiki/Touch_(Unix)) command will not overwrite your document nor will it add another document to the same directory, but it will update info about that file.) or you could use your left/right arrows to move the insert cursor around on the screen so you can, for instance, change the file name to `foot.txt` to create a different file.

As we start to write more complicated and longer commands in our terminal, the <kbd>up arrow</kbd> is a great shortcut so you don't have to spend lots of time typing.

## Creating Folders

OK, so we're going to be doing a lot of work during the Digital Humanities Research Institute. Let's create a `projects` folder on our desktop, where we can keep all our work in one place.

First, let's check to make sure we're still in the `Desktop` folder with `pwd`:

```console
$ pwd
/Users/your-username/Desktop
```

Once you've double-checked you're in `Desktop`, we'll use the `mkdir` or "make directory" command to make a folder called `projects`:

```console
$ mkdir projects
```

Now run `ls` to see if a projects folder has appeared. Once you confirm that the projects folder was created successfully, `cd` into it.

```console
$ cd projects
$ pwd
/Users/your-username/Desktop/projects
```

OK, now you've got a projects folder that you can use throughout the Institute. It should be visible on your graphical desktop, just like the `foo.txt` file we created earlier.

## Challenge

Try and create a sub-folder and file on your own!

## Solution

1. Type `pwd` to see where on your computer you are located. If you are not in the `projects` folder we just created, navigate to that folder using the commands you learned in the [lesson on navigation](https://curriculum.dhinstitutes.org/workshops/command-line/lessons/?page=6).
2. Type `mkdir name-of-your-subfolder` to create a subfolder.
3. Type `cd name-of-your-folder` to navigate to that folder.
4. Type `challenge.txt` to create a new text file.
5. Type `ls` to check whether you created the file correctly.

## Evaluation

What does the <kbd>up arrow</kbd> command do?

<Quiz>
- It quits the Terminal/GitBash.
- It undoes my last command.
- It inserts my last command.*
- It shows me what folder I am working in.
</Quiz>

# Creating a Cheat Sheet

In this section, we'll create a text file that we can use as a cheat sheet. You can use it to keep track of all the awesome commands you're learning.

## `Echo`

Instead of creating an empty file like we did with `touch`, let's try creating a file with some text in it. But first, let's learn a new command: `echo`.

```console
$ echo "Hello from the command line"
Hello from the command line
```

## Redirect (`>`)

By default, the echo command just prints out the text we give it. Let's use it to create a file with some text in it:

```console
$ echo "This is my cheat sheet" > cheat-sheet.txt
```

Now let's check the contents of the directory:

```console
$ pwd
/Users/your-username/projects
$ ls
cheat-sheet.txt
```

OK, so the file has been created. But what was the `>` in the command we used? On the command line, a `>` is known as a "redirect." It takes the output of a command and puts it in a file. Be careful, since it's possible to overwrite files with the `>` command.

If you want to add text to a file but _not_ overwrite it, you can use the `>>` command, known as the redirect and append command, instead. If there's already a file with text in it, this command can add text to the file _without_ destroying and recreating it.

## `Cat`

Let's check if there's any text in `cheat-sheet.txt`.

```console
$ cat cheat-sheet.txt
This is my cheat sheet
```

As you can see, the `cat` command prints the contents of a file to the screen. `cat` stands for "concatenate," because it can link strings of characters or files together from end to end.

## A Note on File Naming

Your cheat sheet is titled `cheat-sheet.txt` instead of `cheat sheet.txt` for a reason. Can you guess why?

Try to make a file titled `cheat sheet.txt` and observe what happens.

Now imagine you're attempting to open a very important data file using the command line that is titled `cheat sheet.txt`

For your digital best practices, we recommend making sure that file names contain no spaces—you can use creative capitalization, dashes, or underscores instead. Just keep in mind that the macOS and Unix file systems are usually pre-configured as cAsE-pReSeRvInG, which means that capitalization matters when you type commands to navigate between or do things to directories and files. You may also want to avoid using periods in your file names, as they sometimes can prompt you to confuse them with system files or file extensions (e.g., the full name of a PDF file is usually `file.pdf`).

## Using a Text Editor

The challenge for this section will be using a text editor, specifically Visual Studio Code ([install guide here](https://github.com/DHRI-Curriculum/install/blob/v2.0/guides/visual-studio-code.md)), to add some of the commands that we've learned to the newly created cheat sheet. Text editors are programs that allow you to edit plain text files, such as `.txt`, `.py` (Python scripts), and `.csv` (comma-separated values, also known as spreadsheet files). Remember not to use programs such as Microsoft Word to edit text files, since they add invisible characters that can cause problems.

## Challenge

You _could_ use the GUI to open your Visual Studio Code text editor—from your programs menu, via Finder or Applications or Launchpad in macOS, or via the Windows button in Windows—and then click `File` and then `Open` from the drop-down menu and navigate to your Desktop folder and click to open the `cheat-sheet.txt` file.

_Or_, you can open that specific `cheat-sheet.txt` file in the Visual Studio Code text editor directly from the command line! Let's try that by using the `code` command followed by the name of your file in the command line. (Please note the command `code` prompts your computer to open Visual Code only if you have correctly completed [the software configuration](https://github.com/DHRI-Curriculum/install/blob/v2.0/guides/visual-studio-code.md) during installation.)

Once you've got your cheat sheet open in the Visual Studio Code text editor, type to add the commands we've learned so far to the file. Include descriptions about what each command does. Remember, this cheat sheet is for you. Write descriptions that make sense to you or take notes about questions.

Save the file.

Once you're done, check the contents of the file on the command line with the `cat` command followed by the name of your file.

## Solution

- Step 1
    ```console
    $ code cheat-sheet.txt
    ```

- Step 2
    ```console
    $ cat cheat-sheet.txt
    My Institute Cheat Sheet

    ls
    lists files and folders in a directory

    cd ~
    change directory to home folder

    ...
    ```

## Evaluation

What does effect does the following command produce? (select one)
```console
$ echo "Hello! My Name is Mark!" > introduction.txt
```

<Quiz>
- It adds the line "Hello! My Name is Mark!" to the existing content of the `introduction.txt` file.
- It checks whether the content of the `introduction.txt` file contains the line "Hello! My Name is Mark!"
- It replaces the content of the `introduction.txt` file with the line "Hello! My Name is Mark!"*
- None of the above.
</Quiz>

# Pipes

So far, you've learned a number of commands and one special symbol, the `>` or redirect. Now we're going to learn another, the `|` or "pipe."

Pipes let you take the output of one command and use it as the input for another.

![Pipes diagram](/images/command-line/pipes.png)

Let's start with a simple example:

```console
$ echo "Hello from the command line" | wc -w
5
```
![Pipes diagram](/images/command-line/example_pipes.png)

In this example, we take the output of the `echo` command ("Hello from the command line") and pipe it to the `wc` or word count command, adding a flag `-w` for number of words. The result is the number of words in the text that we entered. Flags marked with hyphens, such as `-l` or `-m`, indicate options which belong to specific commands.

Let's try another. What if we wanted to put the commands in our cheat sheet in alphabetical order?

Use `pwd` and `cd` to make sure you're in the folder with your cheat sheet. Then try:

```console
$ cat cheat-sheet.txt | sort
```

You should see the contents of the cheat sheet file with each line rearranged in alphabetical order. If you wanted to save this output, you could use a `>` to print the output to a file, like this:

```console
$ cat cheat-sheet.txt | sort > new-cheat-sheet.txt
```

## Evaluation

What do pipes allow you to do? (select all that apply)

<Quiz>
- Pipes let you take the output of one command and use it as the input for another.*
- Pipes allow you to combine multiple commands in a single line.*
- Pipes let you work on multiple files at the same time.
</Quiz>

# Exploring Text Data

So far the only text file we've been working with is our cheat sheet. Now, this is where the command line can be a very powerful tool: let's try working with a large text file, one that would be too large to work with by hand.

Let's download the data we're going to work with:

[Download `nypl_items.csv`](https://github.com/DHRI-Curriculum/command-line/raw/v2.0/files/nypl_items.csv)

If you are using Chrome or Firefox, right click on the link above and select "Save Link As..."; make sure you name the file `nypl_items.csv`
Please note that, occasionally, [Chrome "forgets" to add the extension to your downloaded file](/images/command-line/savelinkaschrome.png); therefore, if your filename doesn't end with `.csv`, [feel free to add it manually](/images/command-line/savelinkaschrome2.png).

Our data set is a list of public domain items from the New York Public Library. It's in `.csv` format, which is a plain text spreadsheet format. CSV stands for "comma separated values," and each field in the spreadsheet is separated with a comma. It's all still plain text, though, so we can manipulate the data using the command line.

## Move Command

Once the file is downloaded, move it from your `Downloads` folder to the `projects` folder on your desktop—either through the command line, or drag and drop in the GUI. Since this is indeed a command line workshop, you should try the former!

To move this file using the command line, you first need to navigate to your `Downloads` folder where that file is saved. Then type the `mv` command followed by the name of the file you want to move and then the file path to your `projects` folder on your desktop, which is where you want to move that file to (note that `~` refers to your home folder):

```console
$ mv nypl_items.csv ~/Desktop/projects/
```

You can then navigate to that `projects` folder and use the `ls` command to check that the file is now there.

## Viewing Data in the Command Line

Try using `cat` to look at the data. You'll find it all goes by too fast to get any sense of it. (You can click <kbd>control</kbd> + <kbd>c</kbd> on your keyboard to cancel the output if it's taking too long.)

Instead, let's use another tool, the `less` command, to get the data one page at a time:

```console
$ less nypl_items.csv
...
```

`less` gives you a paginated view of the data; it will show you contents of a file or the output from a command or string of commands, page by page.

To view the file contents page by page, you may use the following keyboard shortcuts (that should work on Windows using Git Bash or on macOS terminal):

Click the <kbd>f</kbd> key to view forward one page, or the <kbd>b</kbd> key to view back one page.

Once you're done, click the <kbd>q</kbd> key to return to the command line.

Let's try two more commands for viewing the contents of a file:

```console
$ head nypl_items.csv
...

$ tail nypl_items.csv
...
```

These commands print out the very first (the "head") and very last (the "tail") sections of the file, respectively.

## Cleaning the Data

We didn't tell you this before, but there are duplicate lines in our data! Two, to be exact. Before we try removing them, let's see how many entries are in our `.csv` file:

```console
$ cat nypl_items.csv | wc -l
100001
```

This tells us there are 100,001 lines in our file. The `wc` tool stands for "word count," but it can also count characters and lines in a file. We tell `wc` to count lines by using the `-l` flag. If we wanted to count characters, we could use `wc -m`.

To find and remove duplicate lines, we can use the `uniq` command. Let's try it out:

```console
$ cat nypl_items.csv | uniq | wc -l
99999
```

OK, the count went down by two because the `uniq` command removed the duplicate lines. But which lines were duplicated?

```console
$ cat nypl_items.csv | uniq -d
...
```

The `uniq` command with the `-d` flag prints out the lines that have duplicates.

## Challenge

Use the commands you've learned so far to create a new version of the `nypl_items.csv` file with the duplicated lines removed. (Hint: _redirects_ from the lesson when we made a [cheat sheet](https://curriculum.dhinstitutes.org/workshops/command-line/lessons/?page=8) are your friend.)

## Solution

Type `pwd` to see where on your computer you are located. If you are not in the `projects` folder we just created, navigate to that folder using the commands you learned in the [lesson on navigation](https://curriculum.dhinstitutes.org/workshops/command-line/lessons/?page=6).

Type `ls` to check whether the file `nypl_items.csv` is in your projects folder.

Type `cat nypl_items.csv | uniq > new_nypl_items.csv` to create a new version of the `nypl_items.csv` file with the duplicated lines removed.

## Evaluation

What do command line flags allow you to do? (select one)

<Quiz>
- Flags allow you to earmark the file you are working on.
- Flags are useful to create a new version of the file you are working on, while preserving the old version for future access.
- Flags are a common way to specify options for command line programs.*
</Quiz>

## Keywords

Do you remember the glossary terms from this section?

- [Path](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/path.md)

# Interlude

## A Favorite Command Line Feature: Tab Completion

When you are navigating in the command line, typing folder and file names can seem to go against the promise of easier communication with your computer. Here comes _tab completion_, stage right!

When you need to type out a file or folder name—for example, the name of that csv file we've been working with: `nypl_items.csv`—in the command line and want to move more quickly, you can just type out the beginning characters of that file name up until it's distinct in that folder and then click the <kbd>tab</kbd> key. And voilà! Clicking that <kbd>tab</kbd> key will complete the rest of that name for you, and it only works if that file or folder already exists within your working directory.

In other words, anytime in the command line you can type as much of the file or folder name that is unique within that directory, and <kbd>tab</kbd> complete the rest!

## Clearing Text

If all the text remaining in your terminal window is starting to overwhelm you, you have some options. You may type the `clear` command into the command line, or click the <kbd>command (⌘)</kbd> and <kbd>k</kbd> keys to clear the scrollback. Pressing the <kbd>command (⌘)</kbd> and <kbd>l</kbd> keys in macOS, or <kbd>control</kbd> and <kbd>l</kbd> in Windows will clear the output from your most recent command.

# Searching Text Data

So we've cleaned our data set, but how do we find entries that use a particular term?

Let's say I want to find all the entries in our data set that use the term "Paris."

Here we can use the `grep` command. `grep` stands for "global regular expression print." The `grep` command processes text line by line and prints any lines which match a specified pattern. Regular expressions are special strings representing a pattern to be matched in a search operation. `grep` gives us access to the power of regular expressions as we search for text.

```console
$ cat nypl_items.csv | grep -i "paris"
...
```

This will print out all the lines that contain the word "Paris." (The `-i` flag makes the command ignore capitalization.) Let's use our `wc -l` command to see how many lines that is:

```console
$ cat nypl_items.csv | grep -i "paris" | wc -l
191
```

Here we have asked `cat` to read `nypl_items.csv`, take the output and pipe it into the `grep -i` command, which will ignore capitalization and find all instances of the word `paris`. We then take the output of that `grep` command and pipe it into the word count `wc` command with the `-l` lines option. The pipeline returns `191` letting us know that "Paris" (or "paris") occurs on 191 lines of our data set.

## Challenge

Use the `grep` command to explore our `.csv` file a bit. What areas are best covered by the data set?

## Solution
If you want to get a little more milage out of the `grep` command, refer to [this tutorial on grep and regular expressions](https://www.digitalocean.com/community/tutorials/using-grep-regular-expressions-to-search-for-text-patterns-in-linux). Regular expressions (or regex) provide methods to search for text in more advanced ways, including specific wildcards, matching ranges of characters such as letters and numbers, and detecting features such as the beginning and end of lines. If you want to experiment with regular expressions in an easy-to-use environment, numerous regex test interfaces are available from [a simple google search](https://www.google.com/search?w&q=regex+tester), such as [RegExr](https://regexr.com/), which includes a handy cheat sheet.

## Evaluation

Let's think about the `grep` command. Select all that pertain to the command.

<Quiz>
- It searches the given file for lines containing a match to the given strings or words.*
- It can be combined with other commands, so as to produce a search that matches their output.*
- It produces a new file with the lines containing the strings or words you are searching.
- It delete the strings or words you are searching from a file.
</Quiz>

# What We Have Learned

Now is a good time to do a quick review!

In this session, we learned:

- how to use `touch` and `echo` to create files
- how to use `mkdir` to create folders
- how to navigate our file structure by `cd`(change directory), `pwd` (print working directory), and `ls` (list)
- how to use redirects (`>`) and pipes (`|`) to create a pipeline
- how to explore a comma separated values (`.csv`) dataset using word and line counts, `head` and `tail`, and the concatenate command `cat`
- how to search text files using the `grep` command

And we made a [cheat sheet](https://curriculum.dhinstitutes.org/workshops/command-line/lessons/?page=8) for reference!

When we started, we reviewed what text is—whether plain or enriched. We learned that text editors that don't fix formatting of font, color, and size, do allow for more flexible manipulation and multi-program use. If text is allowed to be a string of characters (and not specific characters chosen for their compliance with a designer's intention), that text can be fed through programs and altered with automated regularity. Text editors are different software than Bash (or Terminal), which is a text-based shell that allows you to interact directly with your operating system giving direct input and receiving output.

# Theory to Practice

You've made it through your introduction to the command line! By now, you have experienced some of the power of communicating with your computer using text commands. The basic steps you learned today will help as you'll further your digital skills. For example, you might work with the command line interface to set up your [version control with git](https://github.com/DHRI-Curriculum/git) or you'll have your text editor open while [writing python scripts](https://github.com/DHRI-Curriculum/python) or building basic websites with [HTML and CSS](https://github.com/DHRI-Curriculum/html-css). Having a grasp of command line basics will not only make you more familiar with how your computer and basic programming work, but it will also give you access to tools and communities that will expand your research.

## Review your knowledge: 7 questions from the lessons

__1. What does the <kbd>up</kbd> arrow command do? (Select one of the following)__

<Quiz>
- It inserts my last command.*
- It quits the Terminal/GitBash.
- It undoes my last command.
- It shows me what folder I am working in.
</Quiz>

Revisit lesson [Creating Files and Folders](/workshops/command-line/?page=9) to learn more.

__2. What do command line flags allow you to do? (Select one of the following)__

<Quiz>
- Flags are a common way to specify options for command line programs.*
- Flags allow you to earmark the file you are working on.
- Flags are useful to create a new version of the file you are working on, while preserving the old version for future access.
</Quiz>

Revisit lesson [Exploring Text Data](/workshops/command-line/?page=12) to learn more.

__3. What effect does the following command produce?__

```console
$ echo "Hello! My Name is Mark!" > introduction.txt
```

(Select one of the following)

<Quiz>
- It replaces the content of the introduction.txt file with the line “Hello! My Name is Mark!”*
- It adds the line “Hello! My Name is Mark!” to the existing content of the introduction.txt file.
- It checks whether the content of the introduction.txt file contains the line “Hello! My Name is Mark!”
- None of the above.
</Quiz>

Revisit lesson [Creating a Cheat Sheet](/workshops/command-line/?page=10) to learn more.

__4. What do pipes allow you to do? (Select all that apply)__

<Quiz>
- Pipes let you take the output of one command and use it as the input for another.*
- Pipes allow you to combine multiple commands in a single line.*
- Pipes let you work on multiple files at the same time.
</Quiz>

Revisit lesson [Pipes](/workshops/command-line/?page=11) to learn more.

__5. What command do you run if you are trying to identify where in the filesystem you are currently located/working? (Select all that apply)__

<Quiz>
- `$ pwd`*
- `$ ls`
- `$ cd`
- `$ whoami`
</Quiz>

Revisit lesson [Navigation](/workshops/command-line/?page=8) to learn more.

__6. Let's think about the `grep` command. Select all that pertain to the command.__

<Quiz>
- It searches the given file for lines containing a match to the given strings or words.*
- It can be combined with other commands, so as to produce a search that matches their output.*
- It produces a new file with the lines containing the strings or words you are searching.
- It delete the strings or words you are searching from a file.
</Quiz>

Revisit lesson [Searching Text Data](/workshops/command-line/?page=14) to learn more.

__7. What is the difference between a plain text document and a rich text document? (Select all that apply)__

<Quiz>
- Plain text contains no formatting, only line breaks and spacing.*
- Rich text is styled text, i.e., plain text completed by information such as font size, format, and colors.*
- Plain text cannot be marked up.
- One can’t determine whether there is a difference between the two without looking at their content.
</Quiz>

Revisit lesson [Text Editors](/workshops/command-line/?page=4) to learn more.

## Suggested Further Readings

- Are you wondering how (else) the command line can be deployed for your scholarship? [Dennis Tenen and Grant Wythoff's "Sustainable Authorship in Plain Text using Pandoc and Markdown"](https://programminghistorian.org/en/lessons/sustainable-authorship-in-plain-text-using-pandoc-and-markdown) have some answers for you.
- [Stephen Ramsay](https://www.unl.edu/english/stephen-ramsay) is a scholar that has thought at length about the way the command line is (or can be!) embedded in a researcher's praxis. If you're interested in reading his work, here are two of his finest essays: ["Life on the Command Line"](https://files.zotero.net/eyJleHBpcmVzIjoxNTkyNjY1MDk3LCJoYXNoIjoiODFkNDJmZmU1ZjU3YzRmMDE2YTQ1ZmQwY2YzOTUwYmIiLCJjb250ZW50VHlwZSI6InRleHRcL2h0bWwiLCJjaGFyc2V0IjoidXRmLTgiLCJ6aXAiOjF9/07826342b83ea870f846cfa48f1b0eb8d3d51b78ceb1b05b1e014467d7241904/life-on-the-command-line.html) and ["Programming with Humanists: Reflections on Raising an Army of Hacker-Scholars in the Digital Humanities"](https://www.openbookpublishers.com/htmlreader/DHP/chap09.html)

## Other Tutorials

- [*Data Science at the Command Line*](https://www.datascienceatthecommandline.com/) is an open access e-book by Jeroen Janssens, a hands-on guide that can help you become a more efficient and productive data scientist through the use of the command line.
- [BashGuide](http://mywiki.wooledge.org/BashGuide) offers some good practice techniques for taking your BASH skills to a higher level by teaching you write some simple scripts.

## Projects or Challenges to Try

- [More command line challenges](https://github.com/DHRI-Curriculum/command-line/blob/main/sections/15-challenges.md) devised by the GCDI team are available here.
- When working with digital tools, it's usually a good idea to familiarize with their documentation. Here's the [Bash Reference Manual](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html), where you can find Bash features for beginners and advanced users.
- [Pandoc](https://programminghistorian.org/en/lessons/sustainable-authorship-in-plain-text-using-pandoc-and-markdown) is an online software that allows users to convert file types through the command-line (from markdown to PDF, for example).
- [youtube-dl](https://ytdl-org.github.io/youtube-dl/index.html) is a command-line exercise to download videos from YouTube.com. It requires the Python interpreter.
- Feeling super brave? You might want to give [MALLET (MAchine Learning for LanguagE Toolkit)](http://mallet.cs.umass.edu/) a shot! MALLET is a "a Java-based package for statistical natural language processing, document classification, clustering, topic modeling, information extraction, and other machine learning applications to text." It includes tools for document classification, sequence tagging, topic modeling, and numerical optimization.

## Discussion Questions

- What are some of the operations that using the command line, as opposed as your GUI, allows you to perform?
- What has learning to use the command line taught you about your machine?