# DHRIFT - Digital Humanities Research Infrastructure for Teaching

DHRIFT (Digital Humanities Research Infrastructure for Teaching) is a static site generator built using Next.js. It supports the creation and dissemination of digital humanities workshops, institutes, and other educational materials. This repository provides the development framework for building static websites and generating resources for the DHRIFT initiative.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Development](#development)
- [Usage](#usage)
- [Custom Workshops](#custom-workshops)
- [Contributing](#contributing)
- [License](#license)


## Project Overview

DHRIFT aims to create a sustainable infrastructure for teaching and learning in the digital humanities. It powers [app.dhrift.org](https://app.dhrift.org), providing open-source workshops and resources for educators and students in the digital humanities field.

DHRIFT uses Next.js to ensure high performance, scalability, and easy deployment across multiple platforms.

## Features

- **Next.js framework** for building and deploying static sites.
- **Customizable workshops** with exercises and examples for digital humanities.
- **Scalable design** to allow contributions and expansions of teaching resources.
- **Interactive in-browser code editing** using WebAssembly (WASM).
- **GitHub Actions integration** for automatic deployment to GitHub Pages.

## Getting Started

Deploying DHRIFT using GitHub Actions is simple. By forking the repository and enabling Actions, your workshop site can be automatically deployed. However, after enabling Actions, you will need to trigger the workflow by either running it manually or making a small change to the repository.

### Quick Deployment Steps

1. **Fork the Repository**:
   - Fork the [DHRIFT repository](https://github.com/DHRI-Curriculum/DHRIFT) to your own GitHub account.

2. **Enable GitHub Actions**:
   - In your forked repository, go to the **Actions** tab.
   - Click **Enable Actions** if GitHub Actions are not already active.

3. **Trigger the Deployment**:
   - **Option 1**: Make a small change (e.g., edit the README) and push it to trigger the GitHub Actions workflow.
   - **Option 2**: Manually trigger the workflow by navigating to the **Actions** tab, selecting the workflow, and clicking **Run workflow**.

4. **Automatic Deployment**:
   - Once triggered, GitHub will run the deployment workflow, building and deploying your site to GitHub Pages or your specified hosting platform.
   - Future updates to the `main` branch will automatically trigger a rebuild and redeploy.

## Development

### Prerequisites

To set up a local development environment for DHRIFT, ensure you have the following:
- **Node.js** (v14.x or later)
- **npm** (v6.x or later)

### Installation

1. Clone your forked repository:
   
```bash
git clone https://github.com/<your-username>/DHRIFT.git
cd DHRIFT
```
Install dependencies:
```bash
npm install
```

## Running the Development Server
To start the development server, run:

```bash
npm run dev
```
Visit http://localhost:3000 to preview your changes.

# Contributing
We welcome contributions to DHRIFT! To contribute:

## Fork the repository.
Create a new branch for your feature or bugfix.
Submit a pull request with detailed information about your changes.
Be sure to follow the project's code style and conventions.

# Custom Workshops
DHRIFT allows creators to host their own repositories of workshops and configure DHRIFT to pull and display content dynamically from those repositories using query parameters.

## Example: Custom Workshops Repository
To point DHRIFT to a custom workshop repository, use the following URL format:

```
https://app.dhrift.org/inst?instUser=<github-username>&instRepo=<repository-name>
```

For instance, to use the dhrift-site-template repository under the dhri-curriculum organization, the URL would be:

```
https://app.dhrift.org/inst?instUser=dhri-curriculum&instRepo=dhrift-site-template
```

DHRIFT will fetch and process workshops from this repository and convert them into interactive web pages.

## How to Create Custom Workshop Repositories
Create a GitHub Repository:

Set up a new repository for your workshops. Each workshop can be a Markdown file with content like lesson plans, code examples, and exercises.
Organize Your Content:
Create a clear structure, such as a workshops/ folder for lesson files and an assets/ folder for images.
## Write Workshop Files:

Use Markdown to create each workshop. For example:
```markdown
# Workshop Title
Introduction and objectives.

## Lesson 1: Getting Started
Explanation and tasks...
```

```bash
echo "Hello, DHRIFT!"
```

## Deploy the Repository:

Once the repository is ready, use the appropriate query string to point DHRIFT at your custom repository.

## Benefits of Using Custom Repositories
Customizability: Tailor the workshop content to specific needs or curricula.
Interactivity: DHRIFT supports WebAssembly (WASM) for in-browser code execution, providing interactive learning experiences.
Flexibility: Any updates to the repository automatically reflect on the live site.

# License
This project is licensed under the MIT License. See the LICENSE file for details.
