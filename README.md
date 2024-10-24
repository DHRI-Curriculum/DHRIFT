# DHRIFT - Digital Humanities Research Infrastructure for Teaching

DHRIFT (Digital Humanities Research Infrastructure for Teaching) is a static site generator built using Next.js. It facilitates the creation and dissemination of digital humanities workshops, institutes, and educational materials. This repository contains the development framework for building static websites and resources for the DHRIFT initiative.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [Custom Workshops](#custom-workshops)
- [License](#license)

## Project Overview

DHRIFT provides an infrastructure for teaching and learning in the digital humanities. It powers [app.dhrift.org](https://app.dhrift.org), a platform that dynamically pulls and displays workshops based on the repository specified in the URL query. The platform reads metadata from the `config.yml` file of the specified repository, allowing for dynamic loading of workshops and resources.

## Features

- **Next.js framework** for building and deploying static sites.
- **Customizable workshops** following a structured format.
- **Scalable design** to allow contributions and expansions of teaching resources.
- **Interactive in-browser code execution** using WebAssembly (WASM).
- **GitHub Actions integration** for automatic deployment.

## Getting Started

Deploying DHRIFT using GitHub Actions is simple. By forking the repository and enabling Actions, your workshop site can be automatically deployed. After enabling Actions, you will need to trigger the workflow by either running it manually or making a small change to the repository.

### Quick Deployment Steps

1. **Fork the Repository**:
   - Fork the [DHRIFT repository](https://github.com/DHRI-Curriculum/DHRIFT) to your GitHub account.

2. **Enable GitHub Actions**:
   - In your forked repository, navigate to the **Actions** tab.
   - Click **Enable Actions** if GitHub Actions are not already active.

3. **Trigger the Deployment**:
   - **Option 1**: Make a small change (e.g., edit the README) and push the change to trigger the GitHub Actions workflow.
   - **Option 2**: Manually trigger the workflow from the **Actions** tab by selecting the workflow and clicking **Run workflow**.

4. **Automatic Deployment**:
   - Once triggered, GitHub will run the deployment workflow, building and deploying your site to GitHub Pages or your specified hosting platform.
   - Future updates to the `main` branch will automatically trigger a rebuild and redeploy.

## Usage

### How DHRIFT Works

When you deploy DHRIFT, it dynamically pulls content from a GitHub repository specified in the URL query. DHRIFT reads the `config.yml` file from the specified repository to gather metadata (e.g., site title, description) and locate the workshops repository.

For example, if your repository URL is:
```
https://app.dhrift.org/inst?instUser=dhri-curriculum&instRepo=dhrift-site-template
```

DHRIFT will pull the `config.yml` from `https://github.com/DHRI-Curriculum/dhrift-site-template`:
```yaml
# Example config.yml
title: "DHRI Curriculum"
description: "A site for DHRI workshops"
workshopsuser: dhri-curriculum
workshopsrepo: workshops 
```

The `workshopsuser` and `workshopsrepo` keys point to the repository containing the Markdown workshop files.

### Workshop Repository Structure

The workshops repository must adhere to a specific structure for DHRIFT to correctly load and display the content. Here is an example of the structure based on the [DHRI-Curriculum/workshops repository](https://github.com/DHRI-Curriculum/workshops):

```
├── command-line.md       # Markdown files for each workshop
├── data-literacies.md
├── git.md
│
└── images/               # Any images used in workshops
    ├── example.png
```

Each Markdown file represents a workshop. The files should follow a clear and consistent format, such as:

```markdown
# Workshop Title
Introduction and objectives.

## Lesson 1: Getting Started
Explanation and tasks...

```bash
# Example command
echo "Hello, DHRIFT!"
```

DHRIFT will use the structure defined in the `config.yml` and the content in the `workshops` repository to populate the site dynamically.

### Adding New Workshops

To add new workshops, update the `workshops_repo` in your `config.yml` file to point to a GitHub repository structured according to the example above. Ensure that each workshop is written in Markdown format and follows the proper structure for integration into the platform.

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

2. Install dependencies:
```bash
npm install
```

### Running the Development Server

To start the development server, run:
```bash
npm run dev
```
Visit `http://localhost:3000` to preview your changes.

### Building for Production

To build and export the static site:
```bash
npm run build
```
This will generate static files in the `out` folder.

## Contributing

We welcome contributions to DHRIFT! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with detailed information about your changes.

Be sure to follow the project's code style and conventions.

## Custom Workshops

DHRIFT allows creators to host their own repositories of workshops and configure DHRIFT to dynamically pull and display content from those repositories.

### How to Create Custom Workshop Repositories

1. **Create a GitHub Repository**:
   - Set up a new GitHub repository for your workshops. Each workshop can be a separate Markdown file with content like lesson plans, code examples, and exercises.

2. **Organize Your Repository**:
   - Create a clear structure following the requirements above.

3. **Write Workshop Files**:
   - Use Markdown to write each workshop. Ensure they follow the structured format as shown in the example above.

4. **Update the `config.yml`**:
   - Point to your custom workshops repository by setting the `workshopsuser` and `workshopsrepo` keys in the `config.yml` file of your institute repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.