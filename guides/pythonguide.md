---
title: 'Installing Python'
excerpt: 'Python!'
cover_image: '/images/img4.jpg'
---

# Python (and Anaconda)

## What it is

[Anaconda](https://www.anaconda.com/download/) is a distribution of Python. It provides a Python programming environment, the Jupyter notebook environment, and the conda package management system. 

## Why we use it

For the Digital Humanities Research Institute, we are choosing to use and download Anaconda as it allow us to get all the required software for this institute (python, conda, and the Jupyter notebook environment) in a single download. Anaconda also includes many useful packages for machine learning, and data analysis that will be helpful should you choose to go further in your Python journey!. 

## Before we begin...

Let's check if you have Anaconda already installed on your computer.

Try to open the Anaconda Prompt (On Mac, click on the "magnifying glass" icon (also known as Spotlight) on the upper-right hand corner of your menubar and type `Anaconda`. On Windows, press the <kbd>Windows</kbd> key and type `Anaconda`). If no option comes up, you most likely don't have it installed.

If you don't have Anaconda installed on your computer, you can follow either the macOS Catalina or Windows instructions. If you do have Anaconda and only need to update Anaconda to the newest version for this workshop, you can go to our Insight section for [Keeping your Anaconda installation up to date](https://github.com/DHRI-Curriculum/insights/blob/v2.0/pages/anaconda.md).

## Installation instructions: macOS (Mojave, Catalina, Big Sur etc.)

While the installation instructions below is for macOS Catalina (10.15) and above, this installation instruction should work for older macOS versions. Older macOS versions (10.13 (High Sierra) to 10.14 (Mojave)) can also skip step 3 in the installation process. For older versions, please check out the [Anaconda documentation](https://docs.anaconda.com/anaconda/install/#old-os). You can check your macOS version by clicking the "apple" icon on the upper-left corner of your menu bar and choose "About This Mac." You should see the macOS name followed by the version number. Should you run into any trouble, you can also find solution to common installation issues [here](https://docs.anaconda.com/anaconda/user-guide/troubleshooting/).

Another note, for MacOS Catalina and Big Sur, the Terminal window will likely show the `%` (percent sign) prompt, which is default for the newest version of Terminal. If you have an older version, it will show the `$` (dollar sign) prompt. Either prompt works the exact same, so it does not matter if yours is different from the instructions. Just be aware that they are interchangeable in these instructions.
 
### Step 1: Download Python 3.+

Visit the [Anaconda website](https://www.anaconda.com/products/individual) on your internet browser, such as Firefox or Chrome, and scroll to the bottom of the page. Here, click on the **64-Bit Graphical Installer** under the MacOS Python 3.+ version menu. Our screenshot below shows python 3.8, but any latest **python 3.+** version will work with our instructions and the institute.  

![Screenshot: Anaconda download webpage with 3.8 button highlighted](/images/guides/conda_installer_mac.png)

You can ignore this. Just close this screen.  

![Screenshot: Anaconda thank you image](/images/guides/anaconda01.png)

You can either let your browser open with the Installer, or save it and open it yourself.

### Step 2: Run Anaconda Installer

After the download has completed, if it doesn't open automatically, double-click on the installer file you just saved on your computer. Click `Continue`:  

![Screenshot: Anaconda installer: security image](/images/guides/anaconda02-5.png)

You should then see the initial install screen. Click `Continue`:  
 
 ![Screenshot: initial installation image](/images/guides/anaconda03.png)

Click `Continue` again:  

![Screenshot: software licence agreement image](/images/guides/anaconda04.png)

Accept the license by clicking `I Agree`:  
 
![Screenshot: licence agreement](/images/guides/anaconda05.png)

Click `Install`. Only change the install location if you know what you are doing:  

![Screenshot: standard install on macintosh](/images/guides/anaconda06.png)

Click `Install Microsoft VSCode`. If it is already installed, click `Continue`:  

![Screenshot: menu option to also install vscode](/images/guides/anaconda08.png)

This is the final installation window. Just click `Close`:  

![Screenshot: final installation window for anaconda](/images/guides/anaconda09.png)

You can move the installer to the Trash to save space on your hard drive by clicking `Move to Trash`:  

![Screenshot: move to trash image](/images/guides/anaconda10.png)

### Step 3: Run conda from your terminal

**NOTE: this step only applies to MacOS Catalina and Big Sur. For all previous version of MacOS, skip to Step 4**

This step ensures that you will be able to run anaconda directly from your terminal.  

Open your macOS terminal. You can find your terminal by clicking the "magnifying glass" icon (also known as `Spotlight`) on the upper-right hand corner of your menubar or press <kbd>command</kbd> + <kbd>space</kbd>, type `Terminal` and press <kbd>enter</kbd>. In your terminal, you will run a few lines of code to make sure that the terminal knows how to start Anaconda. Type in the following lines of code, after the `%`, pressing <kbd>enter</kbd> after each line:  

```console
cd ~
bash
source .bash_profile
conda init zsh
```

If this step is successful, when you close and re-open terminal, your command prompt `%` should have (base) in front of it.

### Step 4: Check if Anaconda and Python are successfully installed

Open the macOS terminal. You can find your terminal by clicking the "magnifying glass" icon (also known as Spotlight) on the upper-right hand corner of your menubar or press <kbd>command</kbd> + <kbd>space</kbd>, type `Terminal` and press <kbd>enter</kbd>. In your terminal, type `python` and press <kbd>enter</kbd>. The terminal should print something like:

```console
~$ python
Python 3.7.7 (default, May  6 2020, 04:59:01) 
[Clang 4.0.1 (tags/RELEASE_401/final)] :: Anaconda, Inc. on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 
```

Type `exit()` to leave Python.

### Step 5: Ensure Anaconda Is Up-to-Date

Now that Anaconda is installed, you need to ensure that Anaconda is updated to the newest version for this workshop. Go to our Insight section for [Keeping your Anaconda installation up to date](https://github.com/DHRI-Curriculum/insights/blob/v2.0/pages/anaconda.md) to learn more about how to keep your Anaconda installation up-to-date.

## Installation instructions: Microsoft Windows 10

While the installation instructions below is for Windows 10, this installation instruction should work for Windows 8 as well. For older version, please check out the [Anaconda documentation](https://docs.anaconda.com/anaconda/install/#old-os). Should you run into any trouble, you can also find solution to common installation issues [here](https://docs.anaconda.com/anaconda/user-guide/troubleshooting/).

### Step 1: Download Python 3.+:

We **strongly** recommend that you follow the screens below step by step. Paying particular attention to Step 3 in the installation process.

Visit the [Anaconda website](https://www.anaconda.com/products/individual) on your internet browser, such as Firefox or Chrome, and scroll to the bottom of the page. Here, click on the **64-Bit Graphical Installer** under the Windows Python 3.+ menu. Our screenshot below shows python 3.8, but any latest **python 3.+** version will work with our instructions and the institute.

![Screenshot: Anaconda download webpage with 3.8 button highlighted](/images/guides/conda_installer_windows.png)

You can ignore this. Just close this screen and wait for your donwload to finish.

![Screenshot: Anaconda thank you for downloading](/images/guides/anaconda01w.png)

### Step 2: Run Anaconda Installer

After the download has completed, if it doesn't open automatically, double-click on the installer file you just saved on your computer. Click `Continue`:
 
 ![Screenshot: initial installation setup image](/images/guides/anaconda02w.png)

Accept the license by clicking `I Agree`:
 
![Screenshot: installation licence agreement](/images/guides/anaconda03w.png)

Install Anaconda only for yourself by choosing the just for me radio button. Click `Next`:

![Screenshot: radio menu, select the 1st "just me" option](/images/guides/anaconda04w.png)

Choose the location to install anaconda (the default is fine). Click `Next`:

![Screenshot: text box with path for default Anaconda install and browse button ](/images/guides/anaconda05w.png)

### Step 3: Run Anaconda Installer Part 2: BE CAREFUL WITH THIS OPTION!

This step is so that you will be able to run anaconda directly from your terminal. 

On the Advanced Installation Options page, select **BOTH boxes**: "Add Anaconda to my PATH environment variable" and "Register Anaconda as my default Python". Then click `Next`: 

![Screenshot: advanced installation options window. Has two check boxes: Add anaconda to PATH environment variables, and `Register Anaconda as my default Python`](/images/guides/anaconda06w.png)

The installation may take a while, so go grab a snack or check your email: 

When installation is completed, the window will list the location of the Anaconda installer. Click `Next`:

![Screenshot: Full progress bar and printed output listing location of Anaconda files](/images/guides/anaconda07w.png)

Click `Install Microsoft VSCode`. If it is already installed, click `Skip`:

![Screenshot: menu option to also install vscode](/images/guides/anaconda08w.png)

This is the final window. You can uncheck all the boxes and click `Finish`:

![Screenshot: final installation window for anaconda, has two check boxes: learn more and learn how to get started](/images/guides/anaconda09w.png)

### Step 4: Check if Anaconda and Python are successfully installed

Open a Windows terminal. You can open the terminal by pressing <kbd>windows</kbd> + <kbd>R</kbd> to open the `Run` box. Type `cmd` and then click `OK` to open the Command Prompt. Once it is open, type `python` and press <kbd>enter</kbd> on your keyboard. The terminal should print something like:

```console
~$ python
Python 3.7.7 (default, May  6 2020, 04:59:01) 
[Clang 4.0.1 (tags/RELEASE_401/final)] :: Anaconda, Inc. on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 
```

Type `exit()` to leave Python.

### Step 5: Ensure Anaconda Is Up-to-Date

Now that Anaconda is installed, you need to ensure that Anaconda is updated to the newest version for this workshop. Go to our Insight section for [Keeping your Anaconda installation up to date](https://github.com/DHRI-Curriculum/insights/blob/v2.0/pages/anaconda.md) to learn more about how to keep your Anaconda installation up-to-date.
