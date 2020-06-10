# VocaBook
A node application to boost up your vocabulary.



Hi, There.  **VocaBook** is the free node application that helps you in enhance your vocabulary. This initially was a RestAPI, but for the user convinence I've  added a basic GUI to it.



## Setting up the project

### Make sure that Mongodb and  Node.js is installed.
> To check open terminal and run `node --version` and it should print the version of node
> For mongoDB run `mongo --version` and it will print the mongoDB version.

 * Clone the Repository 
	`git clone https://github.com/pranay101/Vocabook.git`
 
 * Install Dependencies.
 `npm install `
 * open views -> layout.pug and add the following code under head tag
    ` link(href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css", rel="stylesheet", integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk", crossorigin="anonymous")

    script(src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js')

    script(src='https://code.jquery.com/jquery-3.5.1.min.js"
  integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
  crossorigin="anonymous"')
  `
 
 * Rename Sample env.txt to .env
 * Enter the Secret Key.
 * Enter the MongoDB url.
 * Run  the Project.
 `npm start`
	


 - [X] Setup the project
 - [X] Add basic routes
 - [X] Implement basic PUG templates
 - [X] setup and Connect to MongoDB [Mongoose]
 - [X] Implement Register routes.
 - [X] Implement Login Routes 
 - [X] Start with frontend 
 - [X] Done with home and about page
 - [X] Implemented login and register pages 
 - [X] Styling to project and optimization 
 - [X] look for security breach and bugs  
 - [] Implement Login Routes 

 