angular.module('stmtProcApp').controller('stmtProcController', function($scope, stmtProcService, appUtils) {
	var self = this;

	//controller will communicate this array of failedRecords, if any.
	self.failedRecords = [];

	//message type to show the proper message style.
	self.messageType;

	self.sendFile = function(){
		var file = $scope.stmtProcFile;
		if(!file){
			self.failedRecords = [];
			self.messageType = 'alert-warning';
			appUtils.launchModal(['Please select the file first.']);
			return ;
		}

		//waiting screen
		appUtils.initializeLoading();

		appUtils.getRecordsAsJson(file).then(function(records){
			self.failedRecords = stmtProcService.processCustomerRecords(records);
			appUtils.stopLoading();

			if(self.failedRecords.length > 0){
				self.messageType = 'alert-danger';
				appUtils.launchModal(['Some inconsistencies were found on the records. Please find the transactions below']);
			} else {
				self.messageType = 'alert-success';
				appUtils.launchModal(['Records processed successfully. No errors found.']);
			}
		}, function(){
			self.failedRecords = [];
			appUtils.stopLoading();
			self.messageType = 'alert-danger';
			appUtils.launchModal(['Your file could not be parsed. It might be for one or more of the following reasons:',
									'- The file content is not in the MT940 Format',
									'- The file is not in XML or CSV format',
									'- One or more records do not have the correct fields as specified in the MT940 Format',
									'- Your file contains any empty lines (Please open it in a regular text editor such as notepad in order to verify)',
									'Please fix your file and try again.']);
		});
		
		
		
	}

});