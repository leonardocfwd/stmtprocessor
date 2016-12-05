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
