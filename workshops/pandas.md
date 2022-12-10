---
title: 'Introduction to Data Wrangling, Cleaning, and Analysis with Python and Pandas'
excerpt: 'In this workshop, we are going to learn some basic commands in [Pandas](https://pandas.pydata.org/pandas-docs/stable/getting_started/overview.html), an expansive Python library for working with tabular data like CSV files. You can think of Pandas as a more powerful version of Excel that operates within the Python environment, where you can wrangle, clean, analyze, and visualize data. Knowing how to use Pandas is important if you plan on working with datasets that include qualitative and/or quantitative data points.'
cover_image: '/images/workshops/img7.jpg'

learning objectives:
    - Import Pandas and read in a CSV file as a DataFrame
    - Explore your data, including displaying and sampling the data
    - Clean your data, including checking for duplicates and converting data types
    - Review and interpret summary statistics
    - Filter your data, including renaming, selecting, dropping, and adding columns
    - Analyze your data by sorting columns, grouping columns, and counting values
    - Visualize your data with basic bar charts, pie charts, and time series
    - Write a DataFrame to a CSV file
    - Build your Pandas skills with the Pandas documentation and other resources

estimated time:
    - 4 hours

dependencies:
    workshop prerequisites:
        python:
            excerpt: (required) This workshop relies heavily on concepts from the Python workshop, and having a basic understanding of how to use the commands discussed in the workshop will be central for anyone who wants to learn about data analysis with Python and Pandas.
            required: true
        command-line:
            excerpt: (recommended) This workshop makes some reference to concepts from the Command Line workshop, and having basic knowledge about how to use the command line will be central for anyone who wants to learn about text analysis with Python and Pandas.
            recommended: true
    installations:
        pythonguide: 
            excerpt: (Required) You can use any installation of Python (but make sure it is of version 3). For our purposes, Anaconda will provide everything necessary for all the workshops that are part of the DHRI curriculum.
            required: true
        pandas:
            excerpt: (required) You will need to install the Pandas package into your Python packages for the purposes of this workshop. This guide will help you along the way.
            required: true
    insights:
        jupyter-notebooks:
            excerpt: (recommended) This workshop uses Jupyter Notebooks to process the Python commands in a clear and visual way. Anyone who wants to follow along in the workshop on data analysis with Python and Pandas should read this very short introduction to how to use Notebooks.

readings:
    - "[A Beginner’s Tutorial to Jupyter Notebooks](https://towardsdatascience.com/a-beginners-tutorial-to-jupyter-notebooks-1b2f8705888a)"
    - "[Short Introduction to Jupyter Notebooks](https://curriculum.dhinstitutes.org/insights/short-introduction-to-jupyter-notebooks/)"
    - "[Guide To Data Cleaning: Definition, Benefits, Components, And How To Clean Your Data](https://www.tableau.com/learn/articles/what-is-data-cleaning)"

projects:
    - "[The Simplest Data Science Project Using Pandas & Matplotlib](https://towardsdatascience.com/the-simplest-data-science-project-using-pandas-matplotlib-9d7042e7ce6f)"
    - "[Performing Sentiment Analysis Using Twitter Data](https://www.analyticsvidhya.com/blog/2021/07/performing-sentiment-analysis-using-twitter-data/)"
    - "[Introduction to Data Visualization in Python with Pandas](https://stackabuse.com/introduction-to-data-visualization-in-python-with-pandas/)"

ethical considerations:
    - The dataset we are using for this workshop is from the [U.S. Refugee Arrivals Data](https://github.com/BuzzFeedNews/2015-11-refugees-in-the-united-states/blob/master/data/WRAPS-arrivals-by-destination-2005-2015-clean.csv). This dataset contains data about refugee arrivals to the United States between 2005 and 2015 and was originally compiled from the Department of State’s Refugee Processing Center by Jeremy Singer-Vine for his BuzzFeed article [“Where U.S. Refugees Come From — And Go — In Charts.”](https://www.buzzfeednews.com/article/jsvine/where-us-refugees-come-from-and-go-in-charts#.vooNwy74jO) The “refugee-arrivals-by-destination” CSV file, which you can download [here](https://github.com/GCDigitalFellows/intro-pandas-dri-2022/blob/main/refugee-arrivals-by-destination.csv), contains information about the number of refugees who arrived in each U.S. city and state, the year that they arrived, and the country from which they arrived.
    - As with any dataset, responsible data analysis requires more than just technical tools like Pandas. We also need to interrogate the data. Who collected this data? How and why is this data being collected? What assumptions are baked into this data? What consequences does this data have in the world? What does this data tell us about our world? When exploring this dataset, we can consider the meaning of the status of refugee, who has a right to claim that status, and which refugees are considered eligible to legally resettle in the U.S.. We could also think about who may not be represented in this data, including asylum seekers who migrate to the U.S. and become undocumented immigrants while waiting for their asylum claims to be processed.
    

resources:
    - "[Jupyter Notebook shortcuts, tips and tricks](http://maxmelnick.com/2016/04/19/python-beginner-tips-and-tricks.html)"
---

# Preparing your workspace and folders

In the following workshop, we are going to learn how to work with the Pandas package in order to wrangle, clean, analyze, and visualize our data. To interact with the Python Pandas package, we will use Jupyter Notebook. A [Jupyter notebook](https://jupyter.readthedocs.io/en/latest/install.html#jupyter-notebook-interface) is a document that can combine live programming code, text, images, and pretty displays of data all in the same place. While it may seem like Jupyter Notebook is running from a website, it can actually be executed on a local desktop requiring no internet access or can be installed on a remote server and accessed through the internet. Review [Short Introduction to Jupyter Notebooks](https://curriculum.dhinstitutes.org/insights/short-introduction-to-jupyter-notebooks/) for more details. 

We will go deeper into Jupyter Notebook in the following section. For now, let’s create a “pandas_workshop” folder on our Desktop. Keeping all your files for a particular project in a designated file directory will keep your project organized and will make it easier to read in your files. 

[Download](https://drive.google.com/drive/folders/17cAPHux4ileepqNce_5FdYoQaopK3wO5?usp=sharing) the “refugee-arrivals-by-destination” CSV file and save it in the “pandas_workshop” folder on your Desktop. 

We’ve also saved all of the code for this section in a [Jupyter Notebook file](https://github.com/GCDigitalFellows/intro-pandas-dri-2022/blob/main/PandasWorkshop.ipynb). You should download it and save it in your “pandas_workshop” folder on your Desktop. In this file you will find all of the workshop commands and the expected outputs. If you ever feel stuck or can’t seem to be able to advance in the workshop, you can open this file and see how we did it. 

For the best possible experience, we suggest/encourage you to:



* Create an .ipynb file and follow the workshop typing all the code yourself.
* Avoid copying/pasting the code. Much of learning has to do with you typing yourself.
* Only check the PandasWorkshop.ipynb file if you get lost or if you are not able to get the right output. Before opening it, put some time trying to figure out by yourself why it isn’t working. A big part of coding is learning to identify what we are doing wrong.
* I would also caution you against working with both files open at the same time. It is easy to get confused and start modifying the wrong one. But those are only suggestions. Maybe they will work for you, maybe they won’t, so feel free to do what suits you best. You are in charge here!

# Working with Jupyter Notebook

To get started with Jupyter notebook, you must first launch Jupyter Notebook from the “Anaconda Navigator” application on your computer. There are two ways to do this:



1. Find “Anaconda Navigator” in the applications folder on your computer, and double-click on the app to open it. Once Anaconda Navigator opens, you can launch Jupyter Notebook by clicking the “Launch” button.
2. OR, launch JupyterLab from a Terminal or Powershell by running: jupyter notebook

Once you’ve launched Jupyter Notebook, you can create the Jupyter notebook file to run the workshop. From the Jupyter Home Tab in your Browser, find the  “pandas_workshop” folder saved on your Desktop, and start a New Python Notebook using the New button in the upper right corner. Running and saving your Jupyter Notebook from the same directory as your file will keep your project organized and will make it easier to read in your files. 



Even though Jupyter Notebook doesn’t force you to do so, it is very important to name your file, or you will end up later with a bunch of untitled files and you will have no idea what they are about. In the top left, click on the word Untitled and give your file a name such as “intro_pandas”.

# Getting started with Pandas
## Importing the Pandas library

In the first blank cell, type the following command to import the Pandas library into our Jupyter Notebook:

```python
import pandas as pd
```



To run the command, you can click the “Run” button in the top toolbar, or you can click shift + return. 

This import statement not only imports the Pandas library but also gives it the alias “pd.” Using this alias will save us from having to type out the entire word “Pandas” each time we need to use it. Libraries are sets of instructions that Python can use to perform specialized functions. 

By default, Pandas will display 60 rows and 20 columns. However, we can change those settings if we want to see more rows and columns. For this workshop, let’s set the display settings to include 100 rows


```python
pd.options.display.max_rows = 100
```


If you don’t see an error when you run the notebook—that is, if there is no output—you can move on to the next step. It is not rare in programming that when you do things right, the result will be nothing happening. This is what we like to call a silent success.

## Read in a CSV file as a DataFrame

Next, we will read in our dataset saved as a CSV file. We will specifically work with the refugee-arrivals-by-destination.csv dataset. You want to make sure you save the dataset in the same location as your Jupyter Notebook, in this case the pandas_workshop folder saved on your Desktop. 

To read in a CSV file, we will use the method pd.read_csv() and insert the name of our desired file path.


```python
refugee_df = pd.read_csv('refugee-arrivals-by-destination.csv', delimiter=",", encoding='utf-8')
```

With this command, we have created a Pandas DataFrame object, which is a 2-dimensional labeled data structure with columns of different types. You can think of it like a spreadsheet or SQL table, or a dict of Series objects. 

It is common practice to abbreviate DataFrame with “df”, as in refugee_df.  When reading in the CSV file, we also specified the encoding and delimiter. The delimiter specifies the character that separates or “delimits” the columns in our dataset. For CSV files, the delimiter is usually a comma. UTF is “Unicode Transformation Format”, and ‘8’ means 8-bit values are used in the encoding. It is one of the most efficient and convenient encoding formats among various encodings. In Python, strings are by default in utf-8 format which means each alphabet corresponds to a unique code point. Setting the encoding format ensures our strings are uniform. 

## Python Methods and Attributes

Objects in Python (and other programming languages) are basically containers that can hold data and/or functions inside them. When a function is inside an object, we usually call the function a “method.” When data is inside an object, we usually call it an “attribute.”  For example, in the command we ran above, we used the “.read_csv()” method to open the “refugee-arrivals-by-destination.csv” file and added the “delimiter="” and “encoding='utf-8'” attributes. 

The terminology isn’t that important, though. What we do need to know is that you can access these “methods” and “attributes” with a . (a dot or period). When we added sort(), append(), pop(), and lower() to our library app, we briefly saw how some methods contained inside certain objects in Python, like Lists (for sort, append, and pop), and String objects, like lower.

For more info on methods and attributes, review the [“Objects in Python” lesson](https://curriculum.dhinstitutes.org/workshops/python/lessons/?page=13) in the Intro to Python workshop. 

## Keywords:

- Jupyter Notebook: The Jupyter Notebook is an open-source web application that allows you to create and share documents that contain live code, equations, visualizations and narrative text.

- Pandas: Pandas is a software library written for the Python programming language for data manipulation and analysis. 

- Library: A Python library is a reusable piece of code / sets of instructions that you use in your script.

- DataFrame: A Pandas DataFrame is a 2 dimensional data structure, like a 2 dimensional array, or a table with rows and columns. Similar to a spreadsheet.

# Data exploration
## Display data 

To display the DataFrame, we can run a cell with the variable name of the DataFrame


```python
refugee_df
```


Let’s take a look at a few elements in this DataFame: 


* Index
    * The bolded ascending numbers in the very left-hand column of the DataFrame is called the Pandas Index. You can select rows based on the Index.
    * By default, the Index is a sequence of numbers starting with zero. However, you can change the Index to something else, such as one of the columns in your dataset.
    * The index is a Unique ID
* Truncation
    * The DataFrame is truncated, signaled by the ellipses in the middle ... of every column.
    * The DataFrame is truncated because we set our default display settings to 100 rows. Anything more than 100 rows will be truncated. To display all the rows, we would need to alter Pandas’ default display settings again.
* Rows x Columns
    * Pandas reports how many rows and columns are in this dataset at the bottom of the output. Our DataFrame has 121,245 rows × 5 columns.
* NAN
    * NaN is the Pandas value for any missing data. 

We can also display the first _n_ rows of the DataFrame with the .head() method


```python
refugee_df.head(2)
```

```python
refugee_df.head(15)
```

We can also look at a random sample of data with the .sample() method


```python
refugee_df.sample(15)
```


## Keywords:

- head(): head() is a method in the Pandas library that will display the top _n_ rows of a DataFrame.

- sample(): sample() is a method in the Pandas library that will display a random sample of _n_ rows in a DataFrame.

- NaN: NaN is the Pandas value for any missing data.

# Lesson 5: Basic data cleaning

## Data types

We can get information about the columns in the DataFrame by using the .info() method.


```python
refugee_df.info()
```


This report tells us how many non-null, or non-blank, values are in each column, as well as what type of data is in each column. 

Pandas uses a different lexicon to describe data types from those we learned in our intro to Python curriculum. Below is a table that explains what each data type means:


<table>
  <tr>
   <td><strong>Pandas data types</strong>
   </td>
   <td><strong>Python data types</strong>
   </td>
   <td><strong>Usage</strong>
   </td>
  </tr>
  <tr>
   <td>object
   </td>
   <td>String or mixed
   </td>
   <td>Text or mixed numeric and non-numeric values
   </td>
  </tr>
  <tr>
   <td>float64
   </td>
   <td>float
   </td>
   <td>Floating point numbers
   </td>
  </tr>
  <tr>
   <td>int64
   </td>
   <td>integer
   </td>
   <td>Integer numbers
   </td>
  </tr>
  <tr>
   <td>datetime64
   </td>
   <td>NA
   </td>
   <td>Date and time values
   </td>
  </tr>
</table>


## Converting data types

Keeping this in mind, it looks as though the data type for the year column is a “int64” instead of being “datetime64.” 

First, let’s define a new variable for the year columns in “refugee_df” DataFrame. 


```python
refugee_int = refugee_df['year']
```


Next, we can run the command below to convert the data type:


```python
refugee_df['year'] = pd.to_datetime(refugee_df['year'], format='%Y')
```


This command says: for the “year” column in the “refugee_df” DataFrame, use the “to_datetime” method in the Pandas library to convert the values in the “year” column in the “refugee_df” DataFrame, as defined by the variable “refugee_int”,  to datetime data types, using the format “%Y” for just year (as opposed to %Y%m%d, which would also include the month and day). 

We can then check to see if the data type was properly converted using the .dtypes object, which is similar to the .info() method, except it only provides information on data types.


```python
refugee_df.dtypes
```


As we can see, the data in the “year” column was successfully transformed into the datetime64 data type.

## Check for duplicate rows

As part of our data cleaning process, we want to check for duplicate rows. We can do this by using the .duplicated() method inside a filter to isolate only the rows in the DataFrame that are exact duplicates. Filtering data by certain values is similar to selecting columns.


```python
refugee_df[refugee_df.duplicated(keep=False)]
```

Looks like we have a few duplicate rows in our dataset. 

To remove those duplicates, we can use the .drop_duplicates() method to drop duplicates from the DataFrame and select to keep the first instance of the duplicate or the last instance: 


```python
refugee_df = refugee_df.drop_duplicates(keep='first')
```

We can check to see if the command got rid of the duplicate rows by running the .duplicated() method again: 


```python
refugee_df[refugee_df.duplicated(keep=False)]
```


Great news! We successfully removed our duplicate rows!

## Keywords:

- info(): The .info() method in Pandas tells us how many non-null, or non-blank, values are in each column, as well as what type of data is in each column.

- dtypes: The .dtypes object in Pandas tells us what type of data is in each column.

- duplicated(): The .duplicated() method in Pandas checks for duplicate rows.

- drop_duplicates(): The .drop_duplicates() method in Pandas drops duplicate rows.

# Summary statistics

## Calculate summary statistics

To calculate the summary statistics for the columns in our DataFrame, we can use the .describe() method. However, this will only compute columns with numerical data. If we want to include all columns, we can add “include=‘all’”. We also want to specify datetime_is_numeric=True to treat the datetime values as numeric. 


```python
refugee_df.describe()
```


```python
refugee_df.describe(include='all', datetime_is_numeric=True)
```

What can we glean from these summary statistics? 



* Looking at the year column, we get confirmation that our data starts in 2005 and ends in 2015. 
* Looking at the origin column, we learn that refugees that were resettled in the U.S. during the 2005 - 2015 period came from 113 unique countries of origin, with Iraq being the most common country of origin. 
* Looking at the dest_state column, we learn that California is the state where most refugees resettled during the 2005 - 2015 period. We also notice that there are 52 unique states in the dataset, which may include Washington D.C. and Puerto Rico. We will need to investigate this further in a moment. 
* Looking at the dest-city column, we can see that, among the 2,850 unique cities, Denver is the city that resettled the highest number of refugees during the 2005 - 2015 period.
* Looking at the arrivals column, we can see that the average mean resettlement of refugees by country, per year, per state/city location was 5.5, which is to say about 5-6 refugees on average. The max number of refugees resettled from the same country, in the same year, to the same state/city location was 2,813. 

# Rename, select, drop, and add new columns
## See list of columns

To see a full list of the columns in our DataFrame, we can run the following command:


```python
refugee_df.columns
```

Our DataFrame has relatively few columns, so seeing the full list is not absolutely necessary in our case. This step becomes important when you are working with DataFrames with many columns. 

## Rename columns

To improve the readability of our dataset, we can rename columns. In our case, let’s rename “dest_state” as “state” and “dest_city” as “city”. We will use the .rename() method and the columns= parameter. Note that in this case we are setting the DataFrame equal to the returned value of the method so as to save the results into the DataFrame.

 


```python
refugee_df=refugee_df.rename(columns={'dest_state': 'state','dest_city':'city' })
```

## Select columns

Let’s say we wanted to view data from just one column in the DataFrame. To do this, we could run the following command:


```python
refugee_df[['state']]
```

Here we use double brackets around the column name to transform the column from a Series object into a DataFrame. Basically, the interior brackets are for lists, and the outside brackets are indexing operators. If you are curious to see the difference, try the following command instead: refugee_df['state']. 

To view additional columns at the same time, you can add them to the list within the square brackets, separated by a comma. However, you can’t select multiple columns as a Series (try: refugee_df['state','city'])


```python
refugee_df[['state','city']]
```


## Drop columns

To remove a column from the DataFrame, we can use the .drop() method and include the column name. In our case, we could drop the “city” column and save the result as a new DataFrame “refugee_drop_df” so we don’t override our original DataFrame. 


```python
refugee_drop_df = refugee_df.drop(columns="city")
```


## Add columns

We can also add columns to the DataFrame. For example, we can add a ‘percent_total’ column to calculate the percentage of total refugee arrivals for each row.   


```python
refugee_df['percent_total'] = (refugee_df['arrivals'] / refugee_df['arrivals'].sum())*100
```

*_Note: refugee_df['arrivals'].sum() calculates the sum of all the values in the arrivals column._ 



You can read the command we just ran as: create a new column that calculates the number of arrivals in a row divided by the total number of arrivals in the dataset, times 100. The result of this calculation will equal the percentage of total refugee arrivals for each row.

## Keywords:

- rename(): Use the .rename() method in Pandas to rename columns in your DataFrame

- drop(): Use the .drop() method in Pandas to drop columns from your DataFrame

- add(): Use the .add() method in Pandas to add columns to your DataFrame

- Series: Series is a one-dimensional labeled array capable of holding data of any type (integer, string, float, Python objects, etc.)


# Sort Columns, Groupby Columns, & Count values

## Stacking requests

In this lesson, we will be using commands that stack various requests such as methods, parameters, operators, and more to define the command. Pandas pencourages this kind of stacking, but it can seem overwhelming at first to beginners. For example, as we will see below, a command could include two or more methods that stack on top of each other, and end with a slice operator to view only the top N rows of the results. In addition, a command can include specific parameters to call out a particular column or to sort the data in descending order. 

We will move slowly through each of the following commands to break them down. 

## Sort columns

To sort a DataFrame, we can use the .sort_values() method with the parameter by= and including the name of the column we want to sort by written in quotation marks. 

For example, we can sort the DataFrame by the percentages of total refugee arrivals:


```python
refugee_df.sort_values(by='percent_total', ascending=False)[:15]
```


Note: In the command above, we used the “by=” parameter to specify that the data be sorted according to the “percent_total” column and we added the “ascending=False” parameter in order to request that the data be displayed with the highest percentage first. By default, Pandas will sort in “ascending” order, from the smallest value to the largest value. We also added a Python list slice (i.e., [:15]) to view just the top 15 rows.

## Groupby Columns

We can group data and perform calculations on the groups using the .groupby() method. For example, to see the breakdown of the number of arrivals by country of origin, we can use the following command:


```python
refugee_df.groupby('origin')
```


This command created a Groupby object—grouped data—that we can use to perform calculations such as counting the number of non-blank values in each column for each arrival by country of origin.

Next, we will use the following command to count the number of refugee arrivals by country of origin, with the output showing the top twenty rows sorted by descending order:


```python
refugee_df.groupby('origin')['arrivals'].count().sort_values(ascending=False)[:20]
```
 

These results show us the total number of arrivals by country of origin across the 2005-2015 period, in descending order, sliced for the top 20 results. 

Let’s unpack the command to better understand these results: 



* We have three stacked methods here: .groupby(), .count(), and .sort_values(). 
* groupby('origin')['arrivals']: For the Groupby object we defined in the previous step, groupby(‘origin’), we are isolating the “arrivals” column. Basically, we are asking to view the number of refugee arrivals by country of origin. 
* .count(): This method counts non-blank cells for each column or row. The results we see in the output show the total number of refugee arrivals by country of origin. 
* .sort_values(ascending=False): This method specifies how we want our output to be sorted. We include the ascending=False parameter in order to request that the data be displayed with the highest percentage first.
* [:20]: This Python slide specifies that we just want to see the top 20 rows.

## Count values

We can count the number of unique values in a column by using the .value_counts() method.


```python
refugee_df['state'].value_counts()
```


These results show us how many refugees were resettled in each state across the 2005-2015 period. We can see the full list of states noted in the DataFrame, and these include the District of Columbia, Puerto Rico and Guam. We can also note that Wyoming is missing from the list, which can be confirmed by filtering the DataFrame to select only certain values. 


```python
refugee_df[refugee_df['state'] == 'Wyoming']
```


## Keywords:

- sort_values(): Use the .sort_values() method to sort the data within a column in your DataFrame

- groupby(): Use the .groupby() method to group data and perform calculations on the groups in your DataFrame 

- count(): Use the .count() method to count non-blank cells for each column or row.

- value_counts(): Use the .value_counts() method to count the number of unique values in a column.

# Basic data visualizations

To create plots and data visualization in Pandas, we can add the .plot() method to any DataFrame or Series object that has appropriate numeric data.

We can specify the title with the title= parameter and the kind of plot by altering the kind= parameter:



* ‘bar’ or ‘barh’ for bar plots (h is for horizontal)
* ‘hist’ for histogram
* ‘box’ for boxplot
* ‘kde’ or ‘density’ for density plots
* ‘area’ for area plots
* ‘scatter’ for scatter plots
* ‘hexbin’ for hexagonal bin plots
* ‘pie’ for pie plots

For example, we can visualize the data we got from our Groupby command looking at the total number of refugees by country of arrival as a bar chart:


```python
refugee_df.groupby('origin')['arrivals'].count().sort_values(ascending=False)[:20].plot(kind='bar', title='Total number of refugee arrivals in the U.S. \n by country of origin')
```

Let’s unpack the command to better understand these results:



* refugee_df.groupby('origin')['arrivals'].count().sort_values(ascending=False)[:20]: This is the same command we used in lesson 7 to count the number of refugee arrivals by country of origin, with the output showing the top twenty rows sorted by descending order: 
    * We have three stacked methods here: .groupby(), .count(), and .sort_values(). 
    * groupby('origin')['arrivals']: For the Groupby object we defined in lesson 7, groupby(‘origin’), we are isolating the “arrivals” column. Basically, we are asking to view the number of refugee arrivals by country of origin. 
    * .count(): This method counts non-blank cells for each column or row. The results we see in the output show the total number of refugee arrivals by country of origin. 
    * .sort_values(ascending=False): This method specifies how we want our output to be sorted. We include the ascending=False parameter in order to request that the data be displayed with the highest percentage first.
    * [:20]: This Python slide specifies that we just want to see the top 20 rows.
* .plot(kind='bar', title='Total number of refugee arrivals in the U.S. \n by country of origin'):
    * Here we are using the .plot() method to create a visualization, and we are specifying that we want a bar chart with the “kind=’bar’” parameter. We are also giving the chart a title with the “title='Total number of refugee arrivals in the U.S. \n by country of origin'” parameter. 
        * Note: By adding “\n” in the title text, we signify that the text that follows should be on a new line. 

We can also visualize the data as a pie chart:


```python
refugee_df.groupby('origin')['arrivals'].count().sort_values(ascending=False)[:20].plot(kind='pie', title='Total number of refugee arrivals in the U.S. \n by country of origin')
```

In this case, the parameter  within the .plot() method specifying the kind of chart we want changed from “bar” in the previous command to “pie”. 

We can also create time series using the Groupby method. For example, if we wanted to visualize the total number of refugees resettled in the U.S. across the 2005-2015 period, we would first create a Groupby object based on the “year” column (refer back to lesson 7 for more on Groupby objects). 


```python
refugee_df.groupby('year')
```

Next, we can create a new variable calculating the average number of refugees being resettled over time. 


```python
total_arrivals_by_year = refugee_df.groupby('year')['arrivals'].sum()
```

Let’s break this command down:



* We have two stacked methods here: .groupby() and .sum()
* groupby('year')['arrivals']: For the Groupby object, groupby(year), we are isolating the “arrivals” column. Basically, we are asking to view the number of refugee arrivals by year. 
* .sum(): This method returns the sum of the values over the requested axis. In our case, it will calculate the total number of refugee arrivals per year.  

Finally, we can add the .plot() method to create a line chart. 


```python
total_arrivals_by_year.plot(kind='line', title="Total Number of Refugee Arrivals by Year")
```

In this command, we are adding the .plot() method to request a chart, and specifying that we want a line graph with the “kind=line” parameter. We are also giving the chart a title with the “title='Total Number of Refugee Arrivals by Year'” parameter. 



# Write to CSV

To output a new CSV file, we can use the .to_csv method with a name for the file in quotation marks. For example, since we added the percent_total column to the refugee_df DataFrame, we may want to download the updated DataFrame as a CSV file to use it with other programs.  


```python
refugee_df.to_csv("Desktop/pandas_workshop/new_refugee.csv", encoding='utf-8', index=False)
```


In addition to a filename, we’re also specifying that the encoding is utf-8 and that the Index (the bolded left-most column) is not included in the CSV file.

 

# Building your Pandas skills with the Pandas documentation and other resources

Learning how to ask the right questions in a search engine like Google in order to find the solution to what you are trying to accomplish is the name of the game when you are just starting out with Python. Since Pandas is a popular and well documented Python package, you are bound to find myriads of resources that can help you get where you are going. 

A good first place to start when you are searching for answers with Pandas is to look at the Pandas documentation, which is fairly accessible to beginners, and is an incredible resource when you want to learn how to use a new command. It also offers a [User Guide](https://pandas.pydata.org/pandas-docs/stable/user_guide/index.html) for beginners with some fun exercises to deepen your learning.  

Let’s say you wanted to find out more about the .sort_values method we used in lesson 7 and understand the different parameters the method accepts:



* You could first search for .sort_values on the Pandas documentation website ([https://pandas.pydata.org](https://pandas.pydata.org)) and navigate to the “[pandas.DataFrame.sort_values](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.sort_values.html?highlight=sort_values#pandas-dataframe-sort-values)” documentation page.
* Scroll through the page for the info, and look at the second section for examples of how to use the method and its various parameters. 






* If you don’t find an answer that makes sense to you on the Pandas documentation page, then look on Google for other resources. Some of our go-to websites for help are [Stack Overflow](https://stackoverflow.com/), [Geeks for Geeks](https://www.geeksforgeeks.org/), and [Data to Fish](https://datatofish.com/). 

_Other resources_



* This workshop owes a huge debt to Melanie Walsh’s _[Introduction to Cultural Analytics & Python](https://melaniewalsh.github.io/Intro-Cultural-Analytics/welcome.html)_. This easy to use and understand textbook provides additional support for using Pandas. This is a great place to start if you want to continue building your Pandas skills. 






