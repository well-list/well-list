# Final Submission
FinalSubmission/ (folder) : Contains the Project Report  
Readme.md : Contains the User Guide  


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
This is just a simple step-by-step instruction. Edit as you all see fit. Assuming the user is an everyday person AND assuming the user already has git installed.
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
