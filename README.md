## Statement Records Processor

This is an Angular app which takes a MTF940 file and processes it, returning three possible outputs:

* Success, if all records are valid;
* Error with detailed info, if records contain duplicated references and/or incorrect end balances.
* Error, if file uploaded is not in the MTF940 format, does not contain CSV or XML file extensions, has any empty lines, fields don't match the MT940 format, or if for any reason this file could not be parsed because it was not in csv/xml standards.

### Platform

This app should run in all major OS platforms (Windows, Linux and MacOS) having Chrome or Firefox installed.

### Usage

* Open index.html
* Select the file in the MT940 format.
* Click on the Send File button.
* A modal pop-up will be opened showing the results.

You can find some test files to upload in the `tests/e2e/files` folder. Feel free also to use your own files.

### Tests

In order to execute the tests, you must have the following installed in your machine:

* NodeJS (https://nodejs.org)
* npm (https://www.npmjs.com/)
* Karma (https://karma-runner.github.io/1.0/index.html)
* Jasmine (https://jasmine.github.io/)
* Protractor (http://www.protractortest.org/#/)

### Installing test dependencies with NPM

Assuming you are familiar with npm (package manager), you have to install all the dependencies described above in order to have the tests running. After installing Node and NPM, just run the following commands in your Command Line Tool:

    npm install karma karma-jasmine jasmine-core karma-chrome-launcher --save-dev
    npm install -g karma-cli
    npm install -g protractor

### Executing the Unit Tests

To execute the Unit Tests with karma, in a command line window, go to the project's root folder and execute the following command:

    karma start
    
You should get an output in the console from karma describing the tests execution and summary.

### Executing the UI Tests
    
**Important Note:

If you have your own Selenium Server instance, please edit the protractor.conf.js file and change the `seleniumAddress` property to the URL of your server. If you don't have your Selenium Server instance, just open another command window and execute the following commands (make sure you have protractor installed):

    webdriver-manager update
    webdriver-manager start
    
A new Selenium Server instance will be launched. After this you can normally run protractor.
    
To execute the UI tests with protractor, in a new command line window (do not close the other webdriver-manager window), go to the project's root folder and execute the following command:

    protractor protractor.conf.js
    

