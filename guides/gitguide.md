---
title: 'Installing Git'
excerpt: 'Git!'
cover_image: '/images/img4.jpg'
---

# Git (and Git Bash)

## What it is

Git is a version control software used to manage and track changes made to files and project folders over time. We will be installing it on our local machine and live on the hard drive on your laptop. 

Note that Git is a separate software than GitHub. Alternatively, GitHub is a web-based software that lives on the Internet. You can create an account at [github.com](https://github.com).

These instructions are for Git, not GitHub.

## Why we use it

For the Digital Humanities Research Institute, we use Git because it is an open-source tool that was built to support individual version control needs as well as collaborations across time and space. In our curriculum, it is one of the foundational tools we teach because through understanding how Git works, we learn a lot more about how computers and different softwares work.

## Installation instructions: macOS Catalina

### Step 1: Open a terminal

The terminal, also known as command line or bash, is a text interface for interacting with - or talking to - your computer. 

This is different from how we usually interact with our computers. Usually, we use softwares that come with a graphical user interface - GUI, pronounced *gooey* - and we point and click on buttons, or drag and drop things. We might also type, like in Microsoft Word. However, in Word, you're not really talking to your computer until you click "Save" and name the file. It's at this point that you're telling your computer to perform a task in relation to the document or file you are creating or working on. 

With Git, we talk to the computer through the terminal, so let's go ahead and open that now.

To open the terminal, open spotlight search (default way to do this is by hitting command and the space bar) and type in “terminal”. Select the application called terminal and press the return key. This should open up an app with a black background. When you see your username followed by a dollar sign, you’re ready to start using command line.

![Image shows terminal, a black box in which you can enter text to interact with your computer. Look for your username and the dollar sign at the top.](/images/guides/terminal.png)

### Step 1: Type the following command into the terminal

Using the terminal, we will use a set of specific phrases - or commands - that tell the computer what we want it to do. 

First, we want to tell the computer to install the Command Line Tool Package. This give Mac users many commonly used tools, utilities, and compilers, including make, GCC, clang, perl, svn, size, strip, strings, libtool, cpp, what--and Git.

Install this package by typing the following command into your terminal and clicking enter.

```bash
$ xcode-select --install
```

![Image shows terminal with the above command typed in.](/images/guides/commandlinetools.png)

### Step 2: Test the Install

Now, let's make sure Git has been installed successfully. 

- Type the following command into the terminal:

```bash
$ git
```

The terminal should print something like (note that this is truncated):

```bash
usage: git [--version] [--help] [-C <path>] [-c name=value]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]


```

[shows terminal on mac osx](/images/guides/osxterminalgit.png) 

## Installation instructions: Microsoft Windows 10

### Step 1: Download Git for Windows

First, go to this website: https://git-scm.com/download/win

From the option, select "Click here to download manually" and save the file. 

![Image shows webpage with downloads and circles the desired option](/images/guides/windowsdlgit.png)

### Step 2: *Click* on the git installer:

![git installation icon, looks like a tree branch inside 4 colored squares](/images/guides/git00.png)

### Step 3: Accept the license and *click* `Next`:

 ![license acceptance window](/images/guides/git01.png)

### Step 4: Select the installation folder:

The default folder should be fine. *Click* `Next`.

![installation folder browser with text window showing folder path](/images/guides/git02.png)

### Step 5: Select the components to be installed: 

Again, the default is fine here.

![list of check boxes showing install options: additional icons, on the desktop, Windows Explorer integration, Git Bash, Git GUI, Git LFS, Associate *.git configuration files with the default text editor, associate .sh files to be run with bash,  use a true type font in all console windows, check daily for git for windows, check daily for git console updates](/images/guides/git03.png)

- Windows Only: select start menu folder (default is fine):

![textbox with browse button listing start menu folder options](/images/guides/git04.png)

### Step 6: Choose the default editor used by Git. 

Select `Visual Studio Code` as the default editor. (Note that you must install `Visual Studio Code` first before you can move forward past this step of the Git install.) 

*Click* `Next` when you're ready.

![installation menu containing drop down of editor options: nano, vim, notepad++, visual studio code, visual studio code insiders](/images/guides/git06.png)

### Step 7: Choose the "Use Git from the Windows Command Prompt" radio button.

*Click* `Next` when you're ready.

![three radio buttons: use git from git bash, use git from windows command prompt, use git and optional unix tools from the windows command prompt](/images/guides/git07.png) 

### Step 8: Choose the HTTPS transport backend (the default is fine).

*Click* `Next` when you're ready.

![list of radio button optionsL 1) use the OpenSSL library, 2) use the native windows secure channel library](/images/guides/git08.png)

### Step 9: Configure the line ending conversions.

Again, the default is fine. *Click* `Next` when you're ready.

![list of radio button options: 1) checkout Windows-style, commit unix-style , 2) checkout is as is, commit is unix style, 3)checkout as is, commit is as is](/images/guides/git09.png)

### Step 10: Configure the terminal emulator.

On the 'configuring the terminal emulator to use with Git Bash' window, choose the "Use Windows default console window" option.

![two radio buttons: 1) Use MinTTY, 2) use Windows default console window](/images/guides/git10.png)
Note: Do not choose "Use MinTTY (the default terminal of MSYS2)" as that MinTTY wil break Python. 

### Step 11: Configure the extra options. 

Again, the defaults are fine. *Click* `Next` when you are ready.

![check boxes: 1) enable file system caching, 2) enable git credential manager, 3) enable symbolic links](/images/guides/git11.png)

### Step 12: Git should now be installing.
 
![image of progress bar](/images/guides/git12.png)

### Step 13: Finish the installation.

*Click* through the rest of the install, leaving the defaults, and then *click* `Finish` on the last window.

![final installation window that says "completing the git setup wizard"](/images/guides/git13.png)

### Step 14: Test the install.

Now, let's make sure Git has been installed successfully. 

- Open Your terminal 

- Type the following into the terminal:

```bash
$ git
```

The terminal should print something like (note that this is truncated):

```bash
usage: git [--version] [--help] [-C <path>] [-c name=value]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]
```

## Updating an earlier development version of Git (that is already installed) 

If you already have Git installed, but want to check the version or update it, these instructions are for you!

### Step 1: Check which development version of Git is currently installed on the computer.  

Open your terminal and type the following command into the terminal:

```bash 
$ git --version
```

Check for the most recent development version of Git on their website [here](https://git-scm.com/downloads).

**How do I open the terminal again?**
To open the terminal, open spotlight search (default way to do this is by hitting command and the space bar) and type in “terminal”. Select the application called terminal and press the return key.

### Step 2: Update your version - if needed.

If you already have Git, but you want to update it, open [the Git website downloads page](https://git-scm.com/downloads) in you browser and follow the posted download instructions according to the computer type: Mac, Linux/Unix, or Windows.  

### Step 3: Recheck your development version by repeating step 1.

When you think you've updated your software, it is good practice to check in with you computer to make sure its been updated. 

First, close, and re-open your terminal. 

Then type the following command into the terminal:

```bash 
$ git --version
```

If the version you are seeing is not correct, retry step 2.
