describe('Customer Statement Processor', function(){
	//tests configuration
	var EC = protractor.ExpectedConditions;
	var path = require('path');
	browser.ignoreSynchronization = true;

	beforeEach(function(){
		browser.get('/index.html');
	});

	//elements
	var sendFileButton = element(by.id('sendFileBtn'));
	var modalMessageSpan = element(by.id('modalMessage'));
	var inputFile = element(by.id('stmtProcFileInput'));
	var errorReportTable = element(by.id('errorReportTable'));


	it('should show file not selected message when user does not select file', function(){		
		sendFileButton.click();

		browser.wait(EC.visibilityOf(modalMessageSpan), 5000);
		var message = element(by.id('modalMessage')).getText();
		
		expect(message).toEqual('Please select the file first.');
	});

	it('should show error report when invalid CSV records', function(){
		 var fileToUpload = '../e2e/files/records.csv',
      		 absolutePath = path.resolve(__dirname, fileToUpload);

  		 inputFile.sendKeys(absolutePath);

  		 sendFileButton.click();

  		 browser.wait(EC.visibilityOf(modalMessageSpan), 5000);

  		 var message = element(by.id('modalMessage')).getText();
		
		 expect(message).toEqual('Some inconsistencies were found on the records. Please find the transactions below');

		 browser.wait(EC.visibilityOf(errorReportTable), 5000);
	});

	it('should show error report when invalid XML records', function(){
		 var fileToUpload = '../e2e/files/records.xml',
      		 absolutePath = path.resolve(__dirname, fileToUpload);

  		 inputFile.sendKeys(absolutePath);

  		 sendFileButton.click();

  		 browser.wait(EC.visibilityOf(modalMessageSpan), 5000);

  		 var message = element(by.id('modalMessage')).getText();
		
		 expect(message).toEqual('Some inconsistencies were found on the records. Please find the transactions below');

		 browser.wait(EC.visibilityOf(errorReportTable), 5000);
	});

	it('should show success message when valid CSV records', function(){
		 var fileToUpload = '../e2e/files/recordsValid.csv',
      		 absolutePath = path.resolve(__dirname, fileToUpload);

  		 inputFile.sendKeys(absolutePath);

  		 sendFileButton.click();

  		 browser.wait(EC.visibilityOf(modalMessageSpan), 5000);

  		 var message = element(by.id('modalMessage')).getText();
		
		 expect(message).toEqual('Records processed successfully. No errors found.');
	});

	it('should show success message when valid XML records', function(){
		 var fileToUpload = '../e2e/files/recordsValid.xml',
      		 absolutePath = path.resolve(__dirname, fileToUpload);

  		 inputFile.sendKeys(absolutePath);

  		 sendFileButton.click();

  		 browser.wait(EC.visibilityOf(modalMessageSpan), 5000);

  		 var message = element(by.id('modalMessage')).getText();
		
		 expect(message).toEqual('Records processed successfully. No errors found.');
	});

	it('should error message when invalid file extension', function(){
		 var fileToUpload = '../e2e/files/invalidExtensionFile.txt',
      		 absolutePath = path.resolve(__dirname, fileToUpload);

  		 inputFile.sendKeys(absolutePath);

  		 sendFileButton.click();

  		 browser.wait(EC.visibilityOf(modalMessageSpan), 5000);

  		 var message = element(by.id('modalMessage')).getText();
		
		 expect(message).toEqual('Your file could not be loaded.');
	});

	it('should error message when unparseable CSV file', function(){
		 var fileToUpload = '../e2e/files/unparseable.csv',
      		 absolutePath = path.resolve(__dirname, fileToUpload);

  		 inputFile.sendKeys(absolutePath);

  		 sendFileButton.click();

  		 browser.wait(EC.visibilityOf(modalMessageSpan), 5000);

  		 var message = element(by.id('modalMessage')).getText();
		
		 expect(message).toEqual('Your file could not be loaded.');
	});

	it('should error message when unparseable XML file', function(){
		 var fileToUpload = '../e2e/files/unparseable.xml',
      		 absolutePath = path.resolve(__dirname, fileToUpload);

  		 inputFile.sendKeys(absolutePath);

  		 sendFileButton.click();

  		 browser.wait(EC.visibilityOf(modalMessageSpan), 5000);

  		 var message = element(by.id('modalMessage')).getText();
		
		 expect(message).toEqual('Your file could not be loaded.');
	});
});