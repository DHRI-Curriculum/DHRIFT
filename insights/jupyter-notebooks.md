---
title: 'Short Introduction to Jupyter Notebooks'
excerpt: 'Jupyter Notebooks!'
cover_image: '/images/img3.jpg'
---

<<<<<<< HEAD

=======
>>>>>>> 0c1f92750ca72258cef9b359936ff4e6d9a5ab50
# Short Introduction to Jupyter Notebooks

In some of our workshops we use Jupyter Notebooks. Whether you want to test short code snippets or document your computational output and complement it with text and multimedia resources in a single document, Jupyter Notebooks is a great tool to use. Here are our short introduction to how to use Notebooks.

## What are Notebooks?

Jupyter Notebooks is a form of "computational notebook" (sometimes called "Notebook Interfaces"). They have existed for decades, and were created to let users to combine software code, computational output, explanatory text and multimedia resources in a single document. They became popular among researchers for allowing them to annotate procedure, data and findings, making it easier for them to later reproduce calculations with different data.

Jupyter Notebooks have exploded in popularity in the past years, becoming by far the most used computational notebook.

## How to open a Jupyter notebook

If you have not already installed Anaconda, please do so. Jupyter Notebook comes with Anaconda by default.

Find and open the Anaconda Navigator on your computer (you should be able to find it in the folder with your other applications). From Anaconda Navigator's interface, launch a Jupyter Notebook.

![jupyter](/images/guides/jupyter.png)

Jupyter Notebook will open as a tab in your default browser, which is where you will be working. All of the directories (folders) in your `home` directory will appear. (This may vary depending on what operating system—macOS, Windows, etc.—you are using, as the file structure can be different)

We will now open a new file. It is very important that you make sure to open the file in the right place, so you can find it later. Navigate on the directories clicking on them until you are on the desired directory.

Once you are in the right place, select `New` >> `Python3` in the upper right corner.

![jupyter notebook "open new file" screen](/images/guides/jupyter1.png)

A blank page with an empty box should appear.

![empty box on jupyter notebook new file](/images/guides/jupyter2.png)

## Running a cell

Jupyter Notebook allows you to write and run codes in containers, which we call cells. We won't go deep into how it works since it can get a bit complicated. For the moment, it is enough to know that we can run and see the output of the lines of code that are inside a cell.

To try, type some python code. You can try the classic `print("hello world!")` or anything else you want. To run the cell, press <kbd>shift</kbd> + <kbd>enter</kbd>. That will give you an output, and create a new cell below.

## Choosing, Starting, and Restarting a kernel

Your notebook has a kernel, which is like an engine that executes the code contained in the cells. Again, we won't go too deep on this right now.

What matters is to understand that while you are running codes in a notebook, the kernel will remember all the variables you've created, libraries you've imported, etc. And that will be true even if deleted a cell after you ran it.

This is very powerful, but can be a source of confusion. If you feel you have changed things too much, or that you are getting outputs you should not be getting, or if you experience some kind of crash, you can always restart the kernel, which will "clean" the memory of the kernel, and ask the notebook to run all the cells again. In that way, you will guarantee that the kernel will only have ran what is currently coded on the cells. To do that, on the top menu, click on `kernel` -> `Restart & Run All`. You will see other options there, feel free to explore them.

Jupyter Notebook allows you to run cells in any order you want. Again, that can be very useful, but it can be quite confusing. At least in the beginning, we strongly suggest you to avoid running cells out of order.

## Learning more/Resources

The best way to learn Jupyter Notebook is working with it for a while. Once you get more comfortable, make sure to read tutorials to see advanced possibilities. We suggest some below.

Also, it is a good idea to try to learn the keyboard shortcuts. They can save you a lot of time in the long run. To see the list of shortcuts, in the top menu click on `Help` >> `Keyboard Shortcuts`.

Here are a few that I have found helpful:

-   [28 Jupyter Notebook Tips, Tricks and Shortcuts](https://www.dataquest.io/blog/jupyter-notebook-tips-tricks-shortcuts/)
-   [Corey Schafer's videos](https://www.youtube.com/watch?v=HW29067qVWk)
-   DataQuest's [Jupyter Notebook for Beginners: A Tutorial](https://www.dataquest.io/blog/jupyter-notebook-tutorial)
-   Programming Historian's [longer tutorial](https://programminghistorian.org/en/lessons/jupyter-notebooks)