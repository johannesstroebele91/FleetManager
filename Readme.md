# 1. Summary
This web application was developed for the full stack developer - code challenge by [https://kinexon.com/](https://kinexon.com/). The goal is to give fleet managers an overview of important information about their drivers. For example, where they are currently or which phone number their drivers have.

# 2. Technology Stack
The most important technology used for the application are the following ones:
* Fronted: TypeScript, Angular (web application framework), Angular Material UI (UI component library), [Angular Flex Layout](https://github.com/angular/flex-layout) (reponsive layouts), [Angular Google Maps component](https://github.com/angular/components/treAngular Google Maps component/master/src/google-maps) (Google Maps feature), SCSS (preprocessor scripting), HTML
* Backend: Python, Bottle (web framework), Faker (generates fake data)

# 3. File Structure
The code for this web application was developed, versioned, and managed using a private Git. The repository is mainly divided into frontend and backend:

## 3.1. Frontend: 

* node_modules: libraries and dependencies for packages, used by Node package manager
* src: source files
  * app
	  * components: e. g. navigation and footer
	  * pages: includes all of the application pages
  * services: for making calls to the backend 
  * models: interfaces for the driver objects
  * assets: empty, but for images, among others
  * environments: environment for production
and exams (hide and show certain elements)
  * stylesheets: overall styling of the application
  * main.ts: bootstraps the application (it loads everything and controls the startup of the application)
  * index.html: starting point of the application
* .gitignore: text file that tells Git which files or folders to ignore in a project
* angular.json: provides workspace-wide and project-specific configuration defaults for build and development tools provided by the Angular CLI
* package.json: provides metadata of the project as well as handles the
dependency management with Node package manager

## 3.2. Backend: 

* server.py: local Python HTTP server (creates a REST API that serves data with locations)
* drivers.get.json: instances of drivers
* requirements.txt: dependecies used in the backend
* start.sh: shell script for installing the requirements in a virtual environment and running the server 
 
# 4. Endpoints
* Frontend: http://localhost:4200/
* Backend (REST API): http://localhost:8080/drivers

# 5. Next steps
* Clarify the goal of the application using interviews and survey with the users and the respective company 
* Implement tests to ensure that the application is working as expected
* Analyze the data and create visualizations to make the data easier to understand for the users

# 6. Description of the Code Challenge

## 6.1 What is this about?
This challenge is part of the KINEXON coding challenge. 

We provided a not particularly well-written backend in server.py. It creates a REST API that serves data with locations. There is one TODO in the code that we'd like you to implement. You can decide whether you want to work with rest of the code as it is and focus on the frontend or whether you'd prefer to show your refactoring and backend skills by cleaning up and extending the python backend. On the frontend side, you can build whatever you want. Choose the technologies that you enjoy and get creative.

It is not expected that you build a lot of stuff and that everything is 100% polished. Simply try to give us a glimpse of what we can expect from you. 
You can also add comments or update the Readme file to give us an idea about the things you would do if you had more time or resources.

## 6.2 Starting the server
To start the server run the shell script start.sh from the command line:  
* chmod 755 start.sh  
* ./start.sh  
This installs all requirements in a virtual environment and starts the server.   Please make sure python (including pip) is installed and available in your path. The shell script is written for python3 and Unix/macOS. if you are a windows user or  if you prefer to use python2, you might have to change a thing or two for setting up the virtual environment.

## 6.3 Usage
To see the index.html for the frontend, open your browser at:
* http://localhost:8080/  
The backend additionally serves a REST API under:  
* GET http://localhost:8080/  
The response is a list of drivers containing some profile information and
geographical positions.
