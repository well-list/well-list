# Final Submission
FinalSubmission/ (folder) : Contains the Project Report  
Readme.md : Contains the User Guide  
database/(folder) : Contains code pertaining to the database  
  
Source code:
This repository

# User Guide

## Product Name
Well-List

## Product Features
- The main features of our application:
- Setting and tracking daily tasks/goals
- Gaining reward points for task completion
- Exchanging reward points for plants to add to your monthly collection
- Creating personal accounts that can be used to login and access your account
- Product Functions And Capabilities
- Create, edit, and complete daily tasks for points you can spend on rewards.
- Spend points for digital plants you can arrange however you like for each month, customize colors as well!
- Copy tasks from day to day to save you time.
- Wipe tasks if you decide you want a new list.
- View your gardens from prior months to review how doing your tasks has paid off in the past!

## Walk-Throughs
#### For general use:
1. Open up the root folder of the webapp in a command line interface (CLI) or terminal
1. Run `npm install` or `npm i` if you haven’t done so from the installation instructions
1. Type `node app.js` to start the server
1. Open up a browser of your choice and type in localhost:3000 in the address bar

#### For testing:
1. Have the repo installed. For instructions on how to install, see below.
1. Load up the directory in two CLIs/terminals.
1. Run the server in one terminal/CLI by typing `node app.js`.
1. Change the directory of the other terminal/CLI into the testing folder.
1. Type the command `npm test` to run all tests.

## Installation Instructions
Assuming the user is an everyday person AND assuming the user already has git installed.
1. Go to the github repo here
1. Click on the button “Code” and copy the HTTPS link
1. Open up a folder in a CLI/terminal where you would like to download the repository to
1. Type `git clone [paste the link here]`
1. Change the directory into the root folder of the repo
1. Type `npm install` or `npm i` to install the remaining required files for the webapp to run.

## Frequently asked questions  
**Q**: Where are my tasks stored?  
**A**: Tasks are stored within a MongoDB database, meaning upon setup you can access your tasks on one account from anywhere so long as you have an internet connection.  

**Q**: Can I trust installing and setting up Well-List on a personal machine?  
**A**: Well-List is open source! You can view all code from the Well-list Repository (Where you should have gotten the Well-List files from) if you have any concerns about ill-intent. Do not install from anywhere else, as Well-List has not been deployed elsewhere.  

## Troubleshooting  

### I can't connect to the localhost server
This is most likely caused by the server not actually running, make sure to run the server using these steps.
1. Open the root folder of the webapp in a command line interface
1. Type 'node app.js'
1. The server should now be running
1. Connect to the server at localhost:3000 in whatever browser you prefer!

### I can't connect to the database; My data isn't here.
This could be caused by one of two reasons - The netwrok you're on may block MongoDB (As our college network does.) Or, you're not connected to the internet.
1. Connect to a different network if the network you're on seems to block the host, or check to see if you have internet access.
1. If you do not have internet access, connect to a network and you should then be able to properly use the app.

### I can't clone the repo; git doesn't work.
You've probably not properly installed git, or not installed it at all. Github has their own guide to installing git but we'll link it below.  
[Installing git](https://github.com/git-guides/install-git)  

### I can't run the app, a lot of functions aren't valid functions
You've not installed all the required dependencies for the app, follow the steps below to do this.
1. Open the root directory of the app folder you cloned from this github within a terminal.
2. Run the comman 'npm install' or 'npm i' to install the required files.
3. You should now be good to go!

###### End User Guide


# Well-List
Web application aimed to make personal health/wellness tasks more engaging

# Running Locally

Run the following command to automatically install the required modules:
```sh
npm install
```

To run our web server that also tests the database:
```sh
node app.js
```

You can then connect to our server using your web browser at `localhost:3000`
