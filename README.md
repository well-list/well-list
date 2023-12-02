# Final Submission

### Project Report
- `final_submission/project_report.pdf` : Project Report file

### Guides
- `Readme.md` : File containing the User/Administrator Guides

### Code/Scripts
- `database/` : Directory containing database files
- `public/` : Directory containing client-side files
- `testing/` : Direcotry containing testing scripts
- `app.js` : Server script

# User/Administrator Guides

## Product Name

Well-List

## Product Features

### The main features of our application:
- Setting and tracking daily tasks/goals.
- Gaining reward points for task completion.
- Exchanging reward points for plants to add to your monthly collection.
- Creating personal accounts that can be used to login and access your account.

## Product Functions And Capabilities
- Create and log into accounts secured by passport and bycrypt
- Create, edit, and complete daily tasks for points you can spend on rewards.
- Earn rewards points for completing up to 10 daily tasks every day.
- Spend points for digital plants you can arrange however you like for each month, customize colors as well!
- Sell the reward plants for each month to get spent reward points back.
- Move the reward plants around to update your garden layout for each month.
- Clear all tasks for a day if you decide you want a new list.
- Copy and paste tasks from day to day to save you time.
- View your gardens from prior months to review how doing your tasks has paid off in the past!

## Walk-Throughs

### Running Application Locally:
1. Open up the root folder of the webapp in a command line interface (CLI) or terminal
2. Run `npm install` or `npm i` if you haven’t done so from the installation instructions
3. Run `node app.js` to start the server
4. Open up a browser of your choice and type in localhost:3000 in the address bar

### Running Tests:
1. Have the repo installed. For instructions on how to install, see below.
2. Load up the directory in two CLIs/terminals.
3. Run the server in one terminal/CLI by typing `node app.js`.
4. Change the directory of the other terminal/CLI into the testing folder.
5. Type the command `npm test` to run all tests.

### Creating an Account
1. After starting the server and connecting with your browser select the create account button
2. Type in your username and password info
3. If your username or password is rejected make changes and try agian
4. Once your account information is accepted you will have created an account

### Logging Into an Account
1. After starting the server and connecting with your browser you will be taken to the login screen
2. Type in your username and password info
3. If your username or password is rejected make sure your information is correct and try agian
4. Once your account information is accepted you will have logged in

### Logging Out of an Account
1. After logging in select the logout button in the top right of the screen

### Navigating to Different Days
1. After logging in you will be taken to the page for the current day
2. Select the next day button in the top right of the screen to go to the next day
3. Or select the previous day button in the top right of the screen to go to the previous day

### Adding Tasks
1. After logging in navigate to the day you wish to update
2. Select the add task button for the priority you wish to add a task for
3. An edit menu will pop up which you can use to write a description and then save
4. Once you are done editing you may save the task and it will be added

### Deleting Tasks
1. After logging in navigate to the day with tasks you wish to update
2. Click the edit button to the right of the task info
3. Select the delete button and it will be deleted

### Editing Task Descriptions
1. After logging in navigate to the day with tasks you wish to update
2. Click the edit button to the right of the task info
3. Select the delete button and it will be deleted

### Marking Tasks as Complete/Incomplete
1. After logging in navigate to the day with tasks you wish to update
2. Click the checkbox to the right of the task description to toggle the complete status
3. You should see your rewards point values change accordingly

### Clearing All Tasks for the Day
1. After logging in navigate to the day with tasks you wish to update
2. Click the clear tasks button underneath the task area
3. Confirm your intent to clear all tasks for the day

### Reusing Task Content on Another Day
1. After logging in navigate to the day with tasks you wish to update
2. Click the copy tasks button underneath the task area
3. Confirm your intent to copy all tasks for the day
4. Navigate to the day you wish to copy all tasks to
5. Click the paste tasks button underneath the task area
6. Confirm your intent to copy all tasks to the day

### Accessing the Rewards Area
1. After logging select the go to shop button to access the shop for the current month

### Navigating to Different Rewards Screens
1. Log in and accesss the rewards area
2. Select the previous and next buttons to change the current month in focus

### Buying Plant Rewards
1. After logging in and accesssing the rewards area make sure the buy button is selected in the top left of the screen
2. Click on the plant and color you would like to purchase from the right side controls
3. Make sure you have enough points and then select an empty space to buy and place the plant there
4. You should see your rewards points total decrease

### Seling Plant Rewards
1. After logging in and accesssing the rewards area make sure the sell button is selected in the top left of the screen
2. Click the space where the plant you wish to sell is and it will be sold
4. You should see your rewards points total increase

### Moving Plant Rewards
1. After logging in and accesssing the rewards area make sure the move button is selected in the top left of the screen
2. Click the space where the plant you wish to move is and drag it into the empty space you wish to relocate it

### Accessing MongoDB Database Data
- Our app is currently hosted using a personal MongoDB account, which we probably should not publically share the account information to. MongoDB provides a lot of administrator database support. Message one of the creators if you want admnistrator access to the database.

## Installation Instructions
Assuming the user is an everyday person AND assuming the user already has git installed.
1. Go to the github repo here
2. Click on the button “Code” and copy the HTTPS link
3. Open up a folder in a CLI/terminal where you would like to download the repository to
4. Type `git clone [paste the link here]`
5. Change the directory into the root folder of the repo
6. Type `npm install` or `npm i` to install the remaining required files for the webapp to run.

## Frequently asked questions  

**Q**: Why should I use Well-List?    
**A**: Well-List is designed to make personal goal and task management more engaging and rewarding. By meeting your goals you earn rewards points that can spend on plants and building out gardens for each month.

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
