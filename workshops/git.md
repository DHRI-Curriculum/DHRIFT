---
title: 'Introduction to Git and GitHub'
description: 'Git and GitHub are powerful tools for collaborative and individual projects. Git is a version control software that aids with tracking changes made to a set of files over time. GitHub is a web-based platform for storing and sharing project files online. This session begins with a conceptual overview of both tools, including an introduction to fundamental concepts such as version control and practical applications like developing a syllabus or collaborative writing. This session then covers initializing Git repositories, committing changes, pushing to GitHub, cloning repositories to your local machine, and forking repositories from other accounts on GitHub.'
cover_image: '/images/workshops/img4.jpg'

learning objectives:
  - Learn what Git, GitHub and Markdown are, how do they differ, and how they can be integrated to support your scholarly work
  - Learn what version control is and why it can be useful
  - Review basic Command line functions
  - Install and configure Git on your local machine (`git --version`, `git --config`)
  - Practice using basic Markdown by creating a syllabus using a plain text editor (including headers, lists, bold, and emphasis)
  - Stage and commit changes using Git (`git status`, `git add`, `git commit -m`, and `git log`)
  - Pushing a repository with Git and files to GitHub (`git push origin main`)
  - Cloning an existing repository from GitHub to your local machine so you can work with it (`git clone`)
  - Forking an existing repository from another user's GitHub account to your GitHub account so you can work with it

estimated time:
  - 4 hours

dependencies: 
    workshop prerequisites: 
        command-line: 
            description: Introduction to the Command Line (Required) This workshop makes reference to concepts from the Command Line workshop, and having basic knowledge about how to use the command line will be central for anyone who wants to learn about git and GitHub.
            required: true
        visual-studio-code: 
            description: (Recommended) You can use any plain text editor, but for our purposes Visual Studio Code ("VS Code") will be used.

before getting started:
  - "[Create an account on GitHub](https://github.com/join) (required) You need to have a GitHub account for the purposes of this workshop. It is free to sign up via the link."
  - "[Apply for GitHub Education Pack](https://education.github.com/pack) (optional) If you are an educator or a student, you might want to apply for the GitHub Education Pack, which you can read more about in the link. To get started with this workshop, however, you do not need to apply for this pack."

readings:
  - "Bryan, J. (2017). [Excuse me, do you have a moment to talk about version control?](https://doi.org/10.7287/peerj.preprints.3159v2) PeerJ Preprints."
  - "Ovadia, S. (2014). [Markdown for Librarians and Academics](https://academicworks.cuny.edu/lg_pubs/7/). Behavioral and Social Sciences Librarian, 33, 120-124."
  - "Shaffer, K. (June 4, 2013). [GitHub for Academics: The open-source way to host, create and curate knowledge](https://blogs.lse.ac.uk/impactofsocialsciences/2013/06/04/github-for-academics/) LSE Blog."
  - "Begemann, O. (2016). [Collaborative Writing on GitHub](https://oleb.net/blog/2016/02/collaborative-writing-on-github/)."
  - "[How Digital Humanists Use GitHub](https://digitalscholarship.wordpress.com/2016/07/20/presentation-on-how-digital-humanists-use-github/): A presentation from Lisa Spiro and Sean Morey-Smith on their study of how Digital Humanists use GitHub."

projects:
  - "[GCDI's Digital Research Institute](https://github.com/DHRI-Curriculum) has been improved and built out over time using GitHub to store and track multiple projects that use the same base of repositories, and new versions."
  - "'F-ing Algorithm' project uses Git and GitHub to create multiple versions of their project in different languages—([Chinese](https://github.com/labuladong/fucking-algorithm) and [English](https://github.com/labuladong/fucking-algorithm/tree/english)), and to create a [GitBook](https://labuladong.gitbook.io/algo-en/i.-dynamic-programming/analysisofdynamicprogramming) for sharing their work."
  - Here are two examples of using Git and GitHub for teaching—[a syllabus using a GitHub repo](https://github.com/quinnanya/dlcl204) and [a syllabus using a repo and GitPages](https://digitalhistory.github.io/).
  - "[Fake New Corpus](https://github.com/several27/FakeNewsCorpus), an open source dataset composed of millions of news articles mainly intended for use in training deep learning algorithms for purpose of fake news recognition. The dataset is still work in progress and for now, the public version includes only 9,408,908 articles."
  - "[C+=](https://github.com/TheFeministSoftwareFoundation/C-plus-Equality), a feminist programming language, created by The Feminist Software Foundation to smash the toxic Patriarchy that is inherent in and that permeates all current computer programming languages."
  - "[Leaflet](https://github.com/Leaflet/Leaflet), an open-source Javascript library for building mobile-friendly interactive maps."

ethical considerations:
  - Within the nebulous open-source ecosystem, GitHub is an important place for storing and finding code. But what if your open source code was used by an entity or for a purpose that did not agree with your ethics? For example, the platform received backlash from employees of GitHub and users of the platform when it was revealed that they held a contract with ICE. In this case, neither group wanted their code shared and used by ICE in detaining and deporting immigrants. [Read more here.](https://www.theatlantic.com/technology/archive/2020/01/ice-contract-github-sparks-developer-protests/604339/)

resources:
  - "[Git/GitHub Cheatsheet](https://github.com/DHRI-Curriculum/git/raw/v2.0/files/git-cheat-sheet.pdf)"
  - "[Markdown Cheatsheet](https://www.markdownguide.org/cheat-sheet)"
---

# What are Git and GitHub?

**Git** is software used for version control—that is, tracking the state of files and changes you make to them over time. Git can be enabled in a folder, and then used to save the state of the contents in that folder at different points in the future, as designated by you. In the language of Git, a folder is called a _repository_. In the context of this workshop, it refers to a folder that is being tracked by Git. Using Git, you can view a log of the changes you've made to the files in a repository and compare changes over time. We will explore these features in the current workshop. You can also revert back to previous versions, and create "branches" of a project to explore different futures. These are advanced features, which we will provide resources for you to explore later. Git is also useful for collaboration, as a repository can be shared across computers, and its contents can be asynchronously developed and eventually merged with the main project.

**GitHub** is an online platform for hosting Git repositories. It functions for some, predominantly programmers, as a social network for sharing and collaborating on code-based projects. Users can share their own projects, as well as search for others, which they can then often work on and contribute to. Digital Humanists, librarians, and other academics are also finding ways Git and GitHub are useful in writing projects and teaching. GitHub also serves as a web-hosting platform, allowing users to create websites from their repositories.


## Highlighting Distinctions

As we move forward it's important to make sure we're firm on the distinctions between the three different tools outlined above.

**Git** is a software that you use on your laptop, or your local computer/machine. The repository with your project's files is stored on your hard drive. You also edit the text files on your local machine using a plain text editor, which is another software on your local computer like Visual Studio Code.

**GitHub** is a cloud-based platform that you access through your internet browser. Even though you physically are still in the same place, working on your laptop, you are no longer working on your local machine, you are on the Internet. This is a fundamentally different location than when you're working with your Git repository and editing and creating files in your plain text editor. With GitHub, you are uploading your repository—as described above—from your local machine to this platform on the Internet to be shared more broadly. You can also create private repositories if you want to use GitHub to backup a project.

## Evaluation

Which of the following best describes _version control_: (select one)

<Quiz>
- a software installed on my local machine
- the practice of tracking and organizing the state of a file over time, as it changes*
- a language that can be read and rendered by some web-based platforms
- a cloud-based software
</Quiz>

Which of the following best describe Git: (select all that apply)

<Quiz>
- a software installed on my local machine*
- the practice of tracking and organizing the state of a file over time, as it changes
- a web-based platform for storing and sharing files
- a version control software*
- a cloud-based software
- refers to project folders as "repositories"*
</Quiz>

Which best describes GitHub: (select all that apply)

<Quiz>
- a cloud-based software*
- a software installed on my local machine
- a web-based platform for storing and sharing files*
- a version control software
- refers to project folders as "repositories"*
- the practice of tracking and organizing the state of a file over time, as it changes
</Quiz>

## Keywords

Do you remember the glossary terms from this section?

- [Git](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/git.md)
- [GitHub](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/github.md)
- [Version Control](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/version-control.md)


# What You Can Do with Git and GitHub

A [study of how Digital Humanists use GitHub](https://digitalscholarship.files.wordpress.com/2016/07/spirosmithdh2016githubpresentationfinal.pdf), conducted by Lisa Spiro and Sean Morey Smith, found that a wide range of users, including professors, research staff, graduate students, IT staff, and librarians commonly used the site in their DH work. They used GitHub for a diverse range of activities, such as:

- Developing software
- Sharing data sets
- Creating websites
- Writing articles and books
- Collating online resources
- Keeping research notes
- Hosting syllabi and course materials

## Why Use GitHub?

Participants in the study said they found GitHub useful in their Digital Humanities work for several reasons. In particular, it facilitated:

- Sharing and backing up files on multiple computers
- Monitoring changes effectively
- Recovering from bugs or errors by going back in time before the error arose
- Using different branches for experiments and new directions
- Sharing and managing files with others—seeing who added what content and when

## How We Use GitHub

### Sharing and Attribution

As you can see across these sessions, we use GitHub to host workshop curricula. Hosting sessions on GitHub allows you (and anyone else interested in these topics!) to follow our repositories, and create your own version of the workshop based on our materials. This fosters open scholarship and knowledge sharing. It also facilitates attribution and citation by clearly tracking which content was created by whom, when it was added, and which projects or materials are derived from others.

**Case One: This Session**

If you [go this to workshop on GitHub](https://github.com/DHRI-Curriculum/git) and look at the top of the page just under the workshop title, `DHRI-Curriculum/git`, you can see it is `forked from pswee001/Git_DRI_Jan_2018` (next to the red star). That line shows that this particular repository is copied from (_"forked from"_) the curriculum for a session presented at our January 2018 Institute by "pswee" (former Graduate Center Digital Fellow Patrick Sweeney). If you then look at that repository, you will see that it is in turn forked from previous sessions that were developed by other GC Digital Fellows for workshops in past years. We'll expand on _forking_ in the final section of this workshop.

![Image of what attribution looks like in GitHub](/images/git/attribution.png)


### Collaborative Writing

Git is also used in writing projects! _Version control_ makes tracking changes tractable, especially when there are multiple authors working asynchronously. It can be an alternative to using track changes in Microsoft Word, or comments and edits in a Google Doc.

**Case Two: Coauthored Publications**

Git and GitHub—together or independently—support multi-author publishing. Like we have done with the DHRI curriculum, you can have a shared project folder that multiple people are working from asynchronously, even on the same parts if they wanted, and then those different offshoots can be carefully folded back into the main project. A singular author can also create different offshoots on their own, allowing the writer to explore different ways forward. This, combined with version control, allows authors to easily return to and compare older drafts or retrieve sections previously discarded.

We encourage you to explore these features after you gain a grasp on the fundamentals in the current workshop. You can find resources to do this on the [Theory to Practice](https://dhri-curriculum.github.io/Dhrift/workshops/git/?page=12) page!

### Versions Across Time

How did you initially come by the syllabus you use for your class(es), and did you develop it over time? Many professors borrow and adapt from each other, and most of us probably update our syllabi each semester, even if only a little bit.

Through this process, many of us end up with a set of files that looks something like this:

![Example of a messy folder structure with many files named similarly](/images/git/messy-file-structure.png)

While I probably can tell which version is the "final" one, I can not see what was changed along the way or how the different versions vary from each other.

With Git, you would save these multiple versions over time as one file, and each version you save includes a note about what has changed so you can easily revert back to an older version if needed.

By looking at the file list, you also can not tell who the syllabus originally came from, or if there were contributions from many individuals. Git and GitHub can help make attribution clear, and maintain it over time as the syllabus travels between hands.

**Case Three: Syllabi**

Increasingly we see that faculty are sharing their syllabi on GitHub (example: [DLCL 204: Digital Humanities Across Borders](https://github.com/quinnanya/dlcl204)). Some are even using GitPages that apply a user-friendly interface to their repository to make it easier to access and navigate for their students (example: [Digital History](https://digitalhistory.github.io/)).

GitHub offers a way of making a course publicly available on the web, and sometimes easier or more intuitive to users than some learning management systems. Git helps track the changes over time.

When the softwares are used together, Git and GitHub also support a collaborative approach to syllabi development. Copying another's project and modifying and remixing the content to meet your needs is a seamless and transparent process. Attribution of specific changes over time is a foundational function of how Git operates; GitHub explicitly renders attribution, making it easy to see who(s) did what. This is one of the attractions of using the platform.

In a practical sense, you could search other syllabi on GitHub, and share yours so it could be searched by others. If someone finds a syllabus that includes parts they want to use, they could fork that syllabi to their GitHub account, and download the files to your local machine and edit them there. Any changes could then be added back to the repository on GitHub, thereby sharing your amendments publicly. On GitHub, attribution of who contributed what are transparent. Meanwhile, your amended version would be available for others to modify and re-share.

Even if you were only working with your own self-created syllabus, like we'll do later in this workshop, Git and GitHub can be useful for tracking your changes without the hassle of multiple files. From one file, you can use Git to compare your current version with older versions; you can also compare and share these different versions on GitHub if you wanted.

We will cover these features in-depth in a later lesson in this workshop.

## Evaluation

What tasks could Git and/or GitHub offer support to? (select all that apply)

<Quiz>
- Developing software*
- Creating and sharing data sets*
- Creating websites*
- Writing articles and books*
- Collating online resources*
- Keeping research notes*
- Hosting syllabi and course materials*
</Quiz>

## Keywords

Do you remember the glossary terms from this section?

- [Version Control](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/version-control.md)

# Review of the Command Line

During this workshop, you'll be communicating with GitHub from your local computer via the command line (the Terminal or the Git Bash on Windows). This section reviews some of the basic commands that will also be used in this workshop.

In addition to the command line, you'll be using your text editor and your browser. Before continuing, its important that we clearly distinguish between these three different spaces or environments:
- Your plain text editor where you'll be writing your syllabus is on your local computer.
- That syllabus is initially saved in a git-enabled repository on your local computer.
- Your browser is where you'll be uploading your repository to GitHub, a cloud service.
- Your terminal is where you'll be communicating with GitHub to send the repository and project files back and forth between the cloud (which you can view through the GitHub website) and your hard drive.

Because you'll be moving between these three spaces throughout the workshop, you may want to use (<kbd>command (⌘)</kbd> + <kbd>tab</kbd>) or (<kbd>control</kbd> + <kbd>tab</kbd>) to move quickly between the three windows on your desktop.

## Accessing the Terminal

### macOS

Hold the <kbd>command (⌘)</kbd> key and press the <kbd>space</kbd> bar at the same time to bring up the "Spotlight Search" window. Type `terminal`, followed by <kbd>enter</kbd> to quickly open the Terminal.

### Windows

Press the <kbd>windows</kbd> button on your keyboard. When the search menu pops up, type `git bash` and press <kbd>enter</kbd>.

## Practice Navigating the Command Line

If you don't feel comfortable navigating your hard drive through the command line, here is a short section catching you up. _If you feel fairly comfortable using the command line, you can skip this section, and go straight to the next one._

You can create the folder anywhere on your hard drive by typing the following into your terminal and hitting <kbd>enter</kbd>.

```console
$ cd <directory-name>
```

Let's practice this command by using it to take us to our Desktop. Type the following command into your terminal and hit <kbd>enter</kbd>.

```console
$ cd Desktop
```

This will change your current working directory from `/Users/<your-name>` to `/Users/<your-name>/Desktop`.

Check your current directory by typing the following command into your terminal and hit <kbd>enter</kbd>:

```console
$ pwd
```

Now, use the following command to go up one directory:

```console
$ cd ..
```

Check your current directory again using the following command. You should be back in your "home" directory:

```console
$ pwd
```

Practice going back and forth between your Desktop and your home directory.

When finished, go to your Desktop folder and check that you're there with `pwd`.

## Making a Projects Folder

In this session, we will be making a syllabus and using Git to keep track of our revisions. Let's create a Git project folder.

If you've worked through the command line session, you should already have a `projects` folder on your desktop. _If you don't have a projects folder on your desktop, create one using the following command_:

```console
$ mkdir projects
```

From `Desktop`, Navigate into your `projects` folder using the following command:

```console
$ cd projects
```

Then create a `git-practice` folder with the following command:

```console
$ mkdir git-practice
```

Navigate into the new `git-practice` folder using the following command:

```console
$ cd git-practice
```

At this point, when you type `pwd`, your folder structure should look like this:

```console
$ pwd
/home/<username>/Desktop/projects/git-practice
```

## Evaluation

Which best describes where you are working when you're writing in your plain text editor:

<Quiz>
- on my local machine*
- on the internet
</Quiz>

Which best describes where you are working when you're using your terminal to communicate with GitHub and share the files:

<Quiz>
- on my local machine*
- on the internet
</Quiz>

Which best describes where your files are when you are viewing them in GitHub:

<Quiz>
- on my local machine
- on the internet*
</Quiz>

Git-enabled repository means: (select one)

<Quiz>
- none of the files on my local machine are being tracked
- a specific file on my local machine is being tracked
- a specific folder on my local machine is being tracked*
- all the files on my local machine are being tracked
</Quiz>

Which command do you use to make a new folder?

<Quiz>
- `pwd`
- `cd`
- `mkdir`*
</Quiz>

Which command do you use to enter into a folder?

<Quiz>
- `pwd`
- `cd`*
- `mkdir`
</Quiz>

Which command do you use to check where you are?

<Quiz>
- `pwd`*
- `cd`
- `mkdir`
</Quiz>

# Setting Up Git

Through this section, you'll be checking your installation and configuring Git with your own name and information.

## Check Your Installation

First, let's make sure Git has been successfully installed. In your terminal, type the following command:

```console
$ git --version
```

If you see a version number, you're all set. If not, follow the installation instructions [here](https://github.com/DHRI-Curriculum/install/blob/v2.0/guides/git.md).

## Configuring Git on Your Computer

Our first step in working with Git is letting the software know who we are so it can track our work and attribute our contributions. This information is useful because it connects identifying information with the changes you make in your repository.

Type the following _two commands_ into your command line, replacing the "John Doe" and "johndoe@example.com" with your name and email (use quotations where you see them). These do not necessarily need to be the name and email you used to sign up for GitHub. Remember, these are different spaces and different softwares.

```console
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```

To check your set-up, type the following command into your terminal:

```console
$ git config --list
```

You should get something that looks like this except with whatever information you entered previously:

```
user.name=Superstar Git User
user.email=gitsuperstar@gmail.com
```

## Evaluation

What are you doing when you set up git? (select one)

<Quiz>
- You are creating a new version of the software on your local machine.
- You are sending files from your local machine to GitHub?
- You are introducing yourself to the software, so it knows who you are.*
- You are creating a new version of a project folder on your local machine.
</Quiz>

# Creating a Syllabus File

The next step is to _initialize_ the project folder that we want Git to track. Even though we configured Git for our computer, Git doesn't start tracking every single file on our computer. That would turn into a headache quickly. We only want Git to track changes for files within specific folders/projects.  

When we initialize a folder, we are telling Git to pay attention to it. This only needs to happen once because what is actually happening through this process is Git is adding a hidden subfolder within your folder that houses the internal data structure required for version control. After initialization, Git is ready to track the files within the folder. The folder is now considered a Git _repository_.

First, use `cd`, navigate to the `git-practice` folder (inside `projects`). From your home directory, you can do all of them in one command by typing the following into your terminal:

```console
$ cd Desktop/projects/git-practice
```

Next we're going to _initialize_ our repository using the `git init` command, which should generate the following output:

```console
$ git init
Initialized empty Git repository in /home/<your-username>/projects/git/.git/
```

Now Git is tracking our directory. However, it has not done any versioning yet. This is because 1) we haven't told Git to take a snapshot yet, and 2) there are no files in the folder to take a snapshot of. For now, Git knows this folder exists and is prepared to take a snapshot of the files when you tell it to.

Before version control is useful, we'll have to create a text file for Git to track. For this session, the file we will track will be a course syllabus—we'll create that next.

### Creating a Syllabus file

To create a plain text file, we're going to switch to our text editor, Visual Studio Code, to create and edit a file named `syllabus.md` and save it to our `git-practice` folder. The `.md` extension indicates that it is a Markdown file, which is a special file format we will dive into in the next section.  

If you have not installed Visual Studio Code, review [the installation instructions here](https://dhri-curriculum.github.io/Dhrift/guides/visual-studio-code/).

In terminal, check to make sure you are in your `git-practice` folder. (_Hint_: use `pwd` to see what directory you are currently in.)

Next, open the `syllabus.md` file in Visual Studio Code using:

```console
$ code syllabus.md
```

You should see a window appear that looks similar to this:

![Image of what Visual Studio Code looks like when opening the syllabus.md file](/images/git/vscode1.png)

If Visual Studio Code does not open when you use the `code` command in your terminal, open it using the Start Menu on Windows or Spotlight Search on macOS as you would any other software. Then click `File > Open File` and use the dialog to navigate to the `/Users/<your-name>/Desktop/projects/git` folder and create a `syllabus.md` file there.

We'll be typing our markdown into this file in the Visual Studio Code window. At any time, you can save your file by hitting <kbd>control</kbd> + <kbd>s</kbd> on Windows or <kbd>⌘</kbd> + <kbd>s</kbd> on macOS. Alternatively, you can click the `File` menu on the top right, then select `Save` from the dropdown menu.

Saving frequently is advised. When we get to the version control functionality of Git, only changes that are saved will be preserved when a version is created.

# Creating Syllabus Content Using Markdown

We'll be using **Markdown** to write a syllabus, and then using **Git** to track any changes we make to it. Markdown allows us to format textual features like headings, emphasis, links, and lists in a plain text file using a streamlined set of notations that humans can interpret without much training. Markdown files usually have a `.md` extension.  

**Markdown** is a markup language for formatting text. Like HTML, you add markers to plain text to style and organize the text of a document.

Whereas you use HTML and CSS with WordPress, you use Markdown to render legible documents on GitHub. Markdown has fewer options for marking text than HTML. It was designed to be easier to write and edit.  

For comparison, you learned to create headers in HTML like this:

```html
<h1>My Syllabus Heading</h1>
```

In Markdown, we insert headings with a single hash mark like this:

```markdown
# My Syllabus Heading
```

A sub-heading (H2) heading uses two hash marks like this:

```markdown
## Readings
```

The lessons of this workshop were originally written in markdown. You can see [here](https://raw.githubusercontent.com/DHRI-Curriculum/git/v2.0/lessons.md) what they look like in their raw, unrendered form.

Compare that with this—the source code for this lesson's web page, written in HTML [here](view-source:http://curriculum.dhinstitutes.org/workshops/git/lessons/).

Markdown is also arguably more sustainable and accessible than formats like `.docx` because of its simplicity and related ability to be read across multiple platforms. Use of Markdown is also supported by document-conversion tools like [Pandoc](https://pandoc.org/) that can change a markdown file to an `.epub` with one command entered into your terminal.

Here are a few more key elements to get you ready to make your own syllabus in Markdown. 

To provide emphasis, place asterisks around some text:

```markdown
*This text will appear italicized.*
**This text will appear bold.**
```

For emphasis, you need to mark where it should start and where it should end, so you need asterisks at the beginning and end of whatever text is being emphasized.

To create a bulleted list, put a hyphen at the beginning of each list item:

```markdown
- Reading one
- Reading two
- Reading three
```

To create a link, put the anchor text (the text you will see) in square brackets and the URL in parentheses, directly following the anchor text in brackets. Don't put a space between them:

```markdown
I teach at [The Graduate Center, CUNY](https://www.gc.cuny.edu).
```

Paragraphs of text are denoted by putting a blank line between them:

```markdown
This is a paragraph in markdown. It's separated from the paragraph below with a blank line. If you know HTML, it's kind of like the <p> tag. That means that there is a little space before and after the paragraph when it is rendered.

This is a second paragraph in markdown, which I'll use to tell you what I like about markdown. I like markdown because it looks pretty good, if minimal, whether you're looking at the rendered or unrendered version. It's like tidy HTML.
```

## Challenge

Use these five elements—headings, emphasis, lists, links, and paragraphs—to create a syllabus. Have a main heading that gives the course title (one `#`), then subheadings for, at least, course info and readings. Use emphasis (`*`) for book titles and try to get a list in there somewhere.

If you want an a more advanced challenge, you can review some additional markdown elements on [this page](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) and add some extra features like images, blockquotes, or horizontal rules.

## Example

You can look at an example syllabus in raw text form [here](https://raw.githubusercontent.com/DHRI-Curriculum/git/main/sections/syllabus.md). You can see what it looks like when it's rendered by GitHub [on GitHub](https://github.com/DHRI-Curriculum/git/blob/main/sections/syllabus.md). When editing the markdown file in Visual Studio Code, it might look like this:

![What your markdown might look like when typed into Visual Studio Code](/images/git/vscode2.png)

## Tips

1. Visual Studio Code also has a preview feature for your markdown. Hit the preview button on the top right while editing your markdown file:

    ![Button to hit to get a preview in Visual Studio Code](/images/git/vscode3.png)

    You'll get two side-by-side panels. Your markdown file will be on the left, and your rendered preview will be on the right:

    ![Side by side markdown and preview in Visual Studio Code](/images/git/vscode4.png)

2. Remember to save your work—regularly!—with <kbd>control</kbd> + <kbd>s</kbd> on Windows or <kbd>⌘</kbd> + <kbd>s</kbd> on macOS.

## Evaluation

Which best describes what you're doing when you initialize your project folder: (select all that apply)

<Quiz>
- You created a new version of your project folder
- You told Git to pay attention to your project folder*
- You told Git to set up its file structure within your project folder so it can track changes to your files.*
- You use the command `mkdir` in your terminal
- You use the command `git init` in your terminal*
</Quiz>

Which best describes Markdown: (select all that apply)

<Quiz>
- a software installed on my local machine
- a language for formatting plain text files*
- a language that can be read and rendered by some web-based platforms*
- a version control software
- a cloud-based software
- refers to project folders as "repositories"
</Quiz>

## Keywords

Do you remember the glossary terms from this section?

- [Markdown](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/markdown.md)

# Staging and Committing Changes

Git's primary function is version control, or to track a project as it exists at particular points in time. Now that we have a file to track—our `syllabus.md`—let's use Git to save the current state of the repository as it exists now.

## A Metaphor for Adding and Committing

In Git, a _commit_ is a snapshot of a repository that is entered into its permanent history. To commit a change to a repository, we take two steps:

1. Adding files to a "staging area," meaning that we intend to commit them.
2. Finalizing the commit.

Staging a file or files is you telling Git, "Hey! Pay attention these files and the changes in them". 

Making a commit is a lot like taking a photo. First, you have to decide who will be in the photo and arrange your friends or family in front of the camera (the staging process). Once everyone is present and ready, you take the picture, entering that moment into the permanent record (the commit process).

Why do you need both steps? Sometimes when you're working on a project you don't want to pay attention to all the files you changed. Perhaps you fixed a bug in some code, but also did some work on your manuscript document. You may want to only commit the changes you made to the code because you still haven't finished your thoughts on the manuscript. You can stage, or `add`, the code file so Git knows to only commit the changes made to that file. Later, you can stage and then commit the manuscript changes on their own once you've finished your thought. 

## Staging Changes with the `add` Command

First, let's see what state Git is currently in. We do that with the `git status` command. It's a good idea to use this command before and after doing anything in a Git repository so you can always be on the same page as the computer.

Make sure you're in your `/home/<your-name>/Desktop/projects/git-practice` directory using the `pwd` command in the terminal. Once you're there, enter `git status` and you should see the following output:

```console
$ git status
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	syllabus.md

nothing added to commit but untracked files present (use "git add" to track)
```

"Nothing added to commit" means that we have initialized our repository, but haven't made any commits yet. _If you're instead getting a message that begins with the word `fatal` when you use `git status`, you may be in the wrong directory or perhaps you haven't run the `git init` command on your directory yet._

Let's follow the recommendation in the status message above and use the `add` command to stage files, making them ready to be committed.

We will go ahead and add `syllabus.md` by writing the following in the terminal:

```console
$ git add syllabus.md
```

You should see no output from the command line, which should be interpreted as a the above command succeeded. It is what we call "succeeding silently." Let's run `git status` again to have a "sanity check"—to make sure that things have changed. You should see output like this:

```
$ git status
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   syllabus.md
```

The `new file:   syllabus.md` should be highlighted in green to show that it's ready for commit.

This is Git telling you, "Ok, I see the file(s) you're talking about."

## Committing Changes

Now that our files have been staged, let's commit them, making them part of the permanent record of the repository. In the terminal, type:

```console
$ git commit -m "Initial commit of syllabus file"
```

The `-m` flag provides that the message following the flag (in quotation marks) along with the commit. The message will tell others—or remind a future version of yourself—what the commit was all about. Try not to type `git commit` without the `-m` flag—there's a note about this below.

After running the command, you should see output like this:

```
[main (root-commit) 8bb8306] Initial commit of syllabus file
  1 file changed, 0 insertions(+), 0 deletions(-)
  create mode 100644 syllabus.md
```

This means you have successfully made your first commit in the repository—congratulations! There are a few things going on in this message. The relevant information for you for now is the second line, which tells you that one file was changed, and there were no insertions or deletions. You have a fresh new file! 

Let's check the state of our repository after the commit by running `git status`:

```
$ git status
On branch main
nothing to commit, working tree clean
```

This means that everything in the repository is successfully committed and up-to-date. If you edit your syllabus file or create a new file in the repository, the message you get with `git status` will instead list files that have uncommitted changes.

Let's run one other command to see the effect our commit has had. Enter this command:

```console
$ git log
```

You should see output similar to this:

```
commit 8bb8306c1392eed52d4407eb16867a49b49a46ac (HEAD -> main)
Author: Your Name <your-email-here@gmail.com>
Date:   Sun May 20 16:03:39 2018 -0400

    Initial commit of syllabus file
```

This is the log of commits, comprising a history of your repository. There's only one commit here now, though. If you don't see a prompt (the `$`) after running `git log`, you may need to press the <kbd>q</kbd> key (just the <kbd>q</kbd> key by itself) to return to the command line.

## Why Do We Need to Use the `-m` Flag?

The `-m` flag is useful for human purposes and technical purposes. For human purposes, the `-m` flag helps you keep track of the changes you're making. Version control is most useful when you can confidently return to a specific version. It can also help you be more structured in your approach to making changes—your notes to self are limited, so to make them clear, you might make commits after specific tasks are completed. If you update readings for the first week of classes or if you add another reading, you will want to make a commit. This can also make it easier to reverse a specific change in the future.

Also, if you type `git commit` by itself, git will open the command line's default text editor to allow you to enter the commit message in a file-like environment. It looks something like this:

![Example of what the vi screen looks like](/images/git/vi.png)

This unfamiliar screen is the default text editor, `vi`, and it requires some knowledge to use. We don't teach it as part of our sessions, but if you find yourself stuck in this screen, you can try this trick to leave that environment and return to your usual command prompt. Type `:q` and then press <kbd>enter</kbd>. You should be back to the command line with a message saying:

```console
Aborting commit due to empty commit message.
```

If you make a mistake where you include an opening quotation mark but forget a closing one, you might accidentally end up inside a "quote prompt." You will know you're there when your command prompt changes to `quote>`. If this happens, you can just keep writing as much of your commit message as you want, and then end it with the same quotation mark that you opened the commit message with.

Another option is to press <kbd>control</kbd> + <kbd>c</kbd> on your keyboard, which will exit the quote prompt and cancel any commits you were trying to perform.

## Pro-tip for the Command Line: How to exit unknown screens

If you're ever stuck or "trapped" on the command line, try running through these common exit commands to return to the prompt:

- <kbd>control</kbd> + <kbd>c</kbd>
- <kbd>control</kbd> + <kbd>d</kbd>
- `q` followed by <kbd>enter</kbd>
- `:q` followed by <kbd>enter</kbd>

<kbd>control</kbd> + <kbd>c</kbd> attempts to abort the current task and restore user control. <kbd>control</kbd> + <kbd>d</kbd> escapes the current shell environment—if you use it at the normal `$` prompt, it will end the current command line session. `q` is often used as a command (followed by <kbd>enter</kbd>) to escape from specific programs like `less`. `:q` is the command used in `vi` that changes the mode of interaction (`:`), allowing you to enter the `q`, a one-letter command to quit, which must be followed by <kbd>enter</kbd>. Thus, it's a command specific to `vi`.

## Evaluation

Which best describe the process of _staging_: (select one)

<Quiz>
- you telling Git to take a snapshot of changes made to a file.
- you telling Git which files with changes you want it to pay attention to.*
- you telling git to pay attention to a folder storing files you want to make changes to.
- the second part of a two-step process.
</Quiz>

Which best describes the process of _committing_: (select all that apply)

<Quiz>
- you telling Git to take a snapshot of changes made to a file.*
- you telling Git which files with changes you want it to pay attention to.
- you telling git to pay attention to a folder storing files you want to make changes to.
- the second part of a two-step process.*
</Quiz>

What happens if you _stage_ the files, but don't _commit_ them? (select all that apply)

<Quiz>
- Git won't know what files you want to take a snapshot of
- Git won't take a snapshot of the files.*
- Git will take the snapshot of the files
- You will have told Git what files you would like it to take a snapshot of.*
</Quiz>

What happens if you _commit_ the files, but don't _stage_ them? (select all that apply)

<Quiz>
- Git won't know what files you want to take a snapshot of*
- Git won't take a snapshot of the files.*
- You will have told Git what files you would like it to take a snapshot of.
- Git will take the snapshot of the files*
</Quiz>

Which best describes the `-m` flag used when committing changes to a file? (select all that apply)

<Quiz>
- a brief description of changes you made to your file*
- Its just something Git needs so it doesn't break
- future aids when you are trying to make sense of or recover changes you previously made to a file*
- It's nonsense—who needs it?!
</Quiz>

## Keywords

Do you remember the glossary terms from this section?

- [Commit](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/commit.md)

# Pushing to GitHub

Now, you may want to backup or share and collaborate around a file on the Internet. Let's connect the directory you created on your local computer to GitHub's cloud service, which you can access through the web.

Remember, GitHub is a service that allows you to host files, collaborate, and find the work of others. Once our syllabus is on GitHub, it will be publicly visible. (Repositories on GitHub can also be private but are public by default.)

Go to GitHub in your browser and click the plus sign in the upper right hand corner.

![You can find the plus sign button to add a repo on the top right of github](/images/git/addrepo.png)

After clicking the plus button, select `New repository` from the dropdown menu.

![The dropdown menu where you select New Repository](/images/git/createrepo.png)

After clicking `New repository`, you'll have to enter some information, including a name and description for your repository.

![Screen on GitHub where you enter your repository information](/images/git/createrepo2.png)

- Choose a name, such as `git-practice`. (This does _not_ need to match your folder name although it may be less confusing if you choose the same name here.)
- Enter a description, such as `Test syllabus for learning Git and GitHub`.
- Keep the `Public — Anyone can see this repository` selector checked. (If you choose the Private option, you will need additional steps, not covered in this workshop, to synchronize your GitHub repository with the folder on your computer.)
- Do _not_ select `Initialize this repository with a README` since you will be importing an existing repository from your computer.
- Click `Create repository`.

You should end up inside your newly created repository. It will look like a set of instructions that you might want to use to connect your GitHub repository to a local repository.

The instructions we want consist of two lines underneath the heading `...or push an existing repository from the command line`. The hand in this screenshot points to where these directions are on the page:

![The commands you need to copy from the new repo page on GitHub](/images/git/connect-repo.png)

Use the copy button in the top right corner of the code box to copy all three lines of code. They will look something like this:

```console
$ git remote add origin https://github.com/<username>/<repository-name>.git
$ git branch -M main
$ git push -u origin main
```

You'll need the command copied from your new repository, since it will contain the correct URL.

Paste them into your command line and press enter. You may need to press enter multiple times to run all three lines of code.

```
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/<username>/<repository-name>.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

If you see output like this, go back to your new repository page in the browser and click the `Refresh` button. You should see your `syllabus.md` file on GitHub!

## Review

We have covered the basic steps of creating a file and tracking changes within a file on your local machine and on GitHub.

This has involved coordinating across three different environments, so let's go through that one more time. Note that this process is very slightly different. I'll highlight it when it comes up.

To start, let's add something to our syllabus. Another week of materials or a new reading.

Save that file.

Use `git add` via the command line to stage the file—tell Git what document you want it to pay attention to.

Use `git commit` via the command line to save the changes you've just made as a snapshot or new version of you file. Remember to use the `-m` flag and include a message about the change you just made.

So far, we have not done anything with GitHub or on the Internet. We have used Git, installed on our local machine, to save a version of file as it stands now. We could stop here if we only had an interest in using Git for version control. But if we also wanted to use GitHub to back up our files, or to share our project with a team or publicly, we want to upload, or push, that repository to GitHub on the Internet.

Use `git push origin main` to upload, or _push_, that file to your repository on GitHub. After refreshing the webpage, your file should appear online. **The difference I noted above appears here.** Note the absence of the `-u` flag from the command. That flag was used the first time to establish the connection between the repository on your local machine and on GitHub. Now that that connection has been established, that flag is not needed.

## Challenges

1. Go through the process a few more times by adding additional readings and weeks of course material. Remember to commit changes intentionally so your commit messages make sense. Use `git log` to review your changes.

2. Also try creating a new file and adding an assignment. Rewrite the assignment using Markdown, or edit and add in the markers. Go through the process of staging and committing that file, and pushing it to your repository on GitHub.

3. Test your understanding by thinking through the following questions:
- Do you need to push the file to GitHub each time you commit changes to the file, or can you make several commits to a file and push them all to GitHub at once?
- Do you need to use `git init` after after adding a new assignment file to your folder?
- What about the `-u` flag in the `git push origin main` command? Does this flag need to be used to add the assignment to your repository on GitHub?

## Solution

In response to _Challenge 3_:
- No, you don't need to push to GitHub every time, or at all even, if you didn't want to share your changes publicly. Git is the software that tracks the changes, and you review them on your local machine using Git as well.
- No, you don't need to initialize the folder after adding a new file for an assignment or otherwise. In this case, we've already initialized the process; Git is tracking the folder. After the file is added, we just need to notify Git to take a snapshot of the additions and changes using the `git add`, `git commit` sequence. We can also use `git push` to share those changes on GitHub.
- No, the `-u` flag does not need to be used again. This flag is only necessary when setting up the original connection between the folder on your local machine and the folder on GitHub.

## Evaluation

Which best describes what you're doing when you use the command `git push`? (select one)

<Quiz>
- you telling Git to take a snapshot of changes made to a file.
- you telling Git which files with changes you want it to pay attention to.
- you telling git to pay attention to a folder storing files you want to make changes to.
- you are copying the updated files with the changes to the repository on GitHub*
</Quiz>

How does the process of _pushing_ differ from the processes of _staging_ and _committing_ discussed in the previous lesson? (select one)

<Quiz>
- There is no fundamental difference between these processes.
- Staging and Committing set up the files whereas pushing is the act of taking the snapshot.
- Staging and committing the files is to communicate with GitHub on the Internet, pushing the changes happens on your local machine.
- Staging and committing the files happens on your local machine, pushing the changes is to communicate with GitHub on the Internet.*
</Quiz>

What happens if you use `git push` without staging and committing files? (select all that apply)

<Quiz>
- Git won't know what files you want to take a snapshot of.*
- Git won't take a snapshot of the files.*
- Your computer won't know what changes to share with GitHub.*
- Git will take the snapshot of the files
- You will have successfully created a new version of the file.
- You will have communicated with GitHub and shared a copy of the updated files.
</Quiz>

What happens if you _stage_ and _commit_ files, but not _push_ the changes? (select all that apply)

<Quiz>
- Git won't know what files you want to take a snapshot of.
- Git won't take a snapshot of the files.
- Your computer won't know what changes to share with GitHub.
- Git will take the snapshot of the files*
- You will have successfully created a new version of the file.*
- You will have communicated with GitHub and shared a copy of the updated files.
</Quiz>

## Keywords

Do you remember the glossary terms from this section?

- [Push](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/push.md)
- [Repository](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/repository.md)

# Cloning and Forking

GitHub was built for sharing and collaborating on projects. A key advantage of the platform is that you can find lots of bits of software that do many different things—such as code for plugins for WordPress or Leaflet. Increasingly, you might find syllabi or open writing projects. If a project is public, you can save a copy of it to your local machine, work on it, save your amendations and share it on your own GitHub account. Like we've already mentioned, GitHub usefully helps track attribution along the way.

Cloning and forking are the basic functions of this capability. Each are first explained below, and followed by an example and activity to further explain.

## Cloning

**Cloning** a repository means making a copy of a repository on GitHub, to download and work on locally—on your local machine. By entering the following code into your terminal, you can clone any public directory on GitHub:

```console
$ git clone <repository-url>
```

When you clone a repository from GitHub, the folder that shows up on your local machine comes built-in with a few things. First, Git is already present, so you don't need to initialize the folder. Also, the connection between your local copy and the online repository is already made, so `git push origin main` will work (no `-u` flag needed).

For practice, let's clone the repository for this workshop about Git and GitHub, which [lives on GitHub](https://github.com/DHRI-Curriculum/git).

First, let's navigate back to your Desktop folder.

```console
$ cd ~/Desktop
```

Remember that the `~` refers to your home directory. Now let's find the URL we need to clone the lesson.

First, visit [this workshop's page on GitHub](https://github.com/DHRI-Curriculum/git).

On the main page, there should be a green `Code` button on the right side:

![Image pointing out where the clone or download button is on GitHub](/images/git/clone.png)

Click the green button and you will see a box with highlighted text under a heading that says `Clone with HTTPS`. If you instead see `Cloning with SSH`, click the small link that says `Use HTTPS`.

Now copy out the text in the box:

![Image showing where the text you need to copy is located](/images/git/copy-clone-text.png)

Now that you have the text copied, go back to your terminal. Remember, you should be on the `Desktop`. (Hint: Use `pwd` to find out what your current working directory is.)

Once you are in the `Desktop`, type:

```console
$ git clone <copied-url>
```

If the command is successful, the full Git and GitHub workshop's text will be replicated on your local machine. To navigate into the folder, its name is `git` and you can use the `cd` command to access it:

```console
$ cd git
```

Use the `ls` command to take a look at the various files in the lesson folder.

Cloning can be especially useful when you're joining a group project that is hosted on GitHub, and you want your changes to eventually be pushed and shared with that same repository.

But maybe that is not possible or ideal. Maybe you don't want to contribute your changes to someone else's repository. Maybe you want to make a derivative of their folder for yourself, on your GitHub account, and make changes there.

Forking is the step you could take to do this.

## Forking

_Forking_ a repository means making a copy of someone else's repository on GitHub, and saving it to your account on GitHub. This function happens within GitHub, and has nothing to do with what is happening on your local machine. Note that _forking_ will not automatically make the repository appear as a folder on your computer; that's the role of _cloning_.

In order to "fork" the `git` repository into your own GitHub account, follow these steps.

First, go to [the repository for this workshop on GitHub](https://github.com/DHRI-Curriculum/git). Note the `Fork` button in the upper right hand corner. By clicking that button, you can copy, or fork, this repository to your account.

![Image showing where the button to fork a repo is located](/images/git/fork-button.png)

Doing so would also adjust the attribution information in the upper left hand corner. Your username would replace `DHRI-Curriculum`, showing that you are looking at a copy of the repository on your account now. Additionally, it will reference the origin account, in this case, `DHRI-Curriculum` below after `forked from`, since this was the origin point of _your_ fork.

![Image showing the changes in attribution that happen when a repo is forked](/images/git/forking-attrib-chng.png)

Your local machine would come into play when you want to _clone_ that repository so you can work on it locally. This also means that when you push those changes to GitHub, you would be pushing them to a forked repository associated with your own account.

You might use this method if you were going to teach your own Git & GitHub workshop. You could use our repository as a base for getting started, and add more examples or change some language, clarify something further, or create a connection to another workshop you are giving, etc. This allows us to continue to use the workshop as we have it as well. Also, maybe at a later time, we want to merge some of your changes with ours. We can do that too by revisiting your version history.

## Challenge

1. Fork and clone [the repository for this workshop on GitHub](https://github.com/DHRI-Curriculum/git). Note not only _what_ you are doing, but also _where_ you are working when completing these two different tasks.
2. Make changes to the files on your local machine. Remember to save them!
3. Use the 3-step process of stage, commit and push to return the amended files to the repository on GitHub.

## Solution

Rather than write out the solution here, I want to encourage you to go back through the lessons as needed.

You'll know you've completed step one when the project folder (called `git`) shows up on your local machine.

After you've made and saved the changes, you'll know you've completed step three when your changes appear in the project folder on _your_ GitHub account.

## Evaluation

Which best describes _cloning_? (select one)

<Quiz>
- Copying a repository from GitHub to your local machine.*
- Copying a repository from your local machine to GitHub.
- Copying a repository from someone else's GitHub account to your own.
- Copying a repository from your account to someone else's account.
</Quiz>

Which best describes _forking_? (select one)

<Quiz>
- Copying a repository from GitHub to your local machine.
- Copying a repository from your local machine to GitHub.
- Copying a repository from someone else's GitHub account to your own.*
- Copying a repository from your account to someone else's account.
</Quiz>

## Keywords

Do you remember the glossary terms from this section?

- [Cloning](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/cloning.md)
- [Forking](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/forking.md)
- [Repository](https://github.com/DHRI-Curriculum/glossary/blob/v2.0/terms/repository.md)

# Theory to Practice

You made it to the end of this workshop—congratulations! You now know a little more about why using Git and GitHub in your scholarly practice might be advantageous, and what the challenges are. Below the quiz section you'll find a set of readings and tutorials to supplement the lessons outlined herein, and offer additional ways of advancing your use beyond the basics outlined here. There are also additional challenges to test your skills, as well as discussion questions to test your conceptual understanding of these tools. Enjoy!

## Review your knowledge: 8 questions from the lessons

__1. What tasks could Git and/or GitHub offer support to? (Select all that apply)__

<Quiz>
- Developing software*
- Creating and sharing data sets*
- Creating websites*
- Writing articles and books*
- Collating online resources*
- Keeping research notes*
- Hosting syllabi and course materials*
</Quiz>

Revisit lesson [What You Can Do with Git and GitHub](/workshops/git/?page=3) to learn more.

__2. Which best describes what you're doing when you initialize your project folder: (select all that apply)__

<Quiz>
- You created a new version of your project folder
- You told Git to pay attention to your project folder*
- You told Git to set up its file structure within your project folder so it can track changes to your files.*
- You use the command `mkdir` in your terminal
- You use the command `git init` in your terminal*
</Quiz>

Revisit lesson [Creating Syllabus Content Using Markdown](/workshops/git/?page=7) to learn more.

__3. What are you doing when you set up git? (select one)__

<Quiz>
- You are creating a new version of the software on your local machine.
- You are sending files from your local machine to GitHub?
- You are introducing yourself to the software, so it knows who you are.*
- You are creating a new version of a project folder on your local machine.
</Quiz>

Revisit lesson [Setting Up Git](/workshops/git/?page=5 to learn more.

__4. Which best describe the process of _staging_: (select one)__

<Quiz>
- you telling Git to take a snapshot of changes made to a file.
- you telling Git which files with changes you want it to pay attention to.*
- you telling git to pay attention to a folder storing files you want to make changes to.
- the second part of a two-step process.
</Quiz>

Revisit lesson [Staging and Committing Changes](/workshops/git/?page=8) to learn more.

__5. Which of the following best describes _version control_: (select one)__

<Quiz>
- a software installed on my local machine
- the practice of tracking and organizing the state of a file over time, as it changes*
- a language that can be read and rendered by some web-based platforms
- a cloud-based software
</Quiz>

Revisit lesson [What are Git and GitHub?](/workshops/git/?page=2) to learn more.

__6. Which best describes _cloning_? (select one)__

<Quiz>
- Copying a repository from GitHub to your local machine.*
- Copying a repository from your local machine to GitHub.
- Copying a repository from someone else's GitHub account to your own.
- Copying a repository from your account to someone else's account.
</Quiz>

Revisit lesson [Cloning and Forking](workshops/git/?page=11) to learn more.

__7. Which best describes where you are working when you're writing in your plain text editor:__

<Quiz>
- on my local machine*
- on the internet
</Quiz>

Revisit lesson [Review of the Command Line](/workshops/git/?page=4) to learn more.

__8. Which best describes what you're doing when you use the command `git push`? (select one)__

<Quiz>
- you telling Git to take a snapshot of changes made to a file.
- you telling Git which files with changes you want it to pay attention to.
- you telling git to pay attention to a folder storing files you want to make changes to.
- you are copying the updated files with the changes to the repository on GitHub*
</Quiz>

Revisit lesson [Pushing to GitHub](/workshops/git/?page=10) to learn more.

## Suggested Further Readings

- Yasset Perez-Riverol et.al.'s ["Ten Simple Rules for Taking Advantage of Git and GitHub"](https://doi.org/10.1371/journal.pcbi.1004947) from _PLOS Computational Biology_ is an academic introduction to GitHub, with some rudimentary commands that we cover in our workshop as well. The article also details why and how GitHub works as a collaborative platform.
- Jenny Bryan and Jim Hester's [Happy Git and GitHub for the UseR](https://happygitwithr.com/) is an online, open-access book on using Git and GitHub within the R programming environment. While most the book emphasizes this use case, the sections "Let's Git started", "IV Git fundamentals", "V Remote Setups", and "VI Daily Workflows" are great general resources for expanding your Git knowledge without facing a mountain of material to wade through.  
- Scott Chacon and Ben Straub's whole book [_Pro Git_](https://git-scm.com/book/en/v2) is available in open-access format on Git's official website. It is a foundational (albeit long) text that details everything you may want or need to know about working with git on your computer. It also has a section on GitHub for those interested.
- Ei Pa Pa Pe-Than, Laura Dabbish, and James D. Herbsleb has written the article ["Collaborative Writing at Scale: A Case Study of Two Open-Text Projects Done on GitHub"](https://ci.acm.org/2019/assets/proceedings/CI_2019_paper_65.pdf), which details how and why git's pull-based model can be used for collaborative writing at scale. In conclusion, they argue that the model helps contributors either _converge_ and work on perfecting one single project, or adopt and tailor an original project to their own needs.
- Keith Miyake, former Digital Fellow at The Graduate Center, has written an introduction on how to [Create Your (FREE) Website Using Github and Jekyll](https://digitalfellows.commons.gc.cuny.edu/2016/03/21/create-your-free-website-using-github-and-jekyll/) on the Digital Fellow's blog _Tagging the Tower_, detailing GitHub's "pages" feature that allows you to publish your own advanced website. Using Jekyll, a specific command-line application, you can create essentially unhackable rudimentary websites that are free to host on GitHub.
- On _Programming Historian_, Amanda Visconti has written ["Building a static website with Jekyll and GitHub Pages"](https://programminghistorian.org/en/lessons/building-static-sites-with-jekyll-github-pages) which is an introduction on using GitHub "pages" to create a website. Using Jekyll, a specific command-line application, you can create essentially unhackable rudimentary websites that are free to host on GitHub.
- Simon Coll has provided some introductory remarks on why markdown is a good choice for academics in his blog post, [Markdown for Students and Academics](https://www.simondcoll.com/markdown-students-academics/).
- [Steven Ovadia's "Internet Connection: Markdown for Librarians and Academics"](https://academicworks.cuny.edu/cgi/viewcontent.cgi?article=1006&context=lg_pubs) is a short article from _Behavioral & Social Sciences Librarian_ that details the use of markdown as a "method of divorcing content from formatting."
- For those who want an introduction to Creative Commons, a concept introduced in our Git and GitHub introductory workshop, the [Official website for Creative Commons](https://creativecommons.org/) is a good place to start. They also have a [Creative Commons Wiki](https://wiki.creativecommons.org/wiki/Main_Page) which may be of interest.
- The University of Rhode Island has created ["Open Licensing with Creative Commons: The Creative Commons Licenses"](https://uri.libguides.com/creativecommons/licenses), a good introduction to creative commons as a concept with many links to other websites.
- J.R. Dingwall's open-access book [_Creative Commons: An Educator's Course Guide to Creative Commons_](https://openpress.usask.ca/creativecommons) is a good place to start for anyone interested in how the Creative Commons can empower the open education movement with "tools that help create better, more flexible and sustainable open educational resources (OER), practices, and policies," as he writes in Part V of the book, ["Creative Commons for Educators."](https://openpress.usask.ca/creativecommons/part/creative-commons-for-educators/)

## Other Tutorials

- FreeCodeCamp has an excellent introductory tutorial for how to use git on your computer, called ["An intro to Git: What it is and how to use it"](https://www.freecodecamp.org/news/what-is-git-and-how-to-use-it-c341b049ae61/).
- Don't miss Github's official documentation around [Getting Started with GitHub](https://help.github.com/en/github/getting-started-with-github). It is detailed and provides more in-depth examples of how to interact with GitHub using your command line.

## Projects or Challenges to Try

- Fill in your syllabus repository further, adding not only to your syllabus.md file, but adding additional content such as assignments.
- Create a website from your syllabus files using GitHub Pages or Jekyll.
- Create an independent or collaborative reading group that tracks readings and notes using Git and GitHub. 
- Use Git and GitHub to track, store, and share an independent or collaborative project folder. 
- Use Git to track a project on your local machine. 
- Find and/or modify an existing public project on GitHub.

## Discussion Questions

- What does your current version control workflow look like and what are the challenges it poses; or how could it be improved?
- How can git support the work you are already doing? 
- What additional opportunities does git and/or GitHub and/or Markdown create for your teaching, research or other scholarly work? 
- What are the potential benefits and pitfalls of working in the open on the web via a platform like GitHub? 