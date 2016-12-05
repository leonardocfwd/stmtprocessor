## Statement Records Processor

This is an Angular app which takes a MTF940 file and processes it, returning two possible outputs:

* Success, if all records are valid;
* Error, if records contain duplicated references and/or incorrect end balances.

### Usage

* Open index.html
* Select the file in the MT940 format.
* Click on the Send File button.
* A modal pop-up will be opened showing the results.

### Tests

In order to execute the tests, make sure you have the following installed in your machine:

* NodeJS
* Karma
* Jasmine
* Protractor

To execute the Unit Tests with karma, in a command line window, go to the project's root folder and execute the following:

    karma start
    
To execute the UI tests with protractor, in a command line window, go to the project's root folder and execute the following:

    protractor protractor.conf.js
    
**Important Note:

If you have your own Selenium Server instance, just edit the protractor.conf.js file and change the `seleniumAddress` property to the URL of your server. If you don't have your Selenium Server instance, just open another command window and execute the following commands (make sure you have protractor installed):

    webdriver-manager update
    webdriver-manager start
    
A new Selenium Server instance will be launched. After this you can normally run protractor.
