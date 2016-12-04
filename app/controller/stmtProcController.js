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
			appUtils.launchModal('Please select the file first.');
			return ;
		}

		//waiting screen
		appUtils.initializeLoading();

		appUtils.getRecordsAsJson(file).then(function(records){
			self.failedRecords = stmtProcService.processCustomerRecords(records);
			appUtils.stopLoading();

			if(self.failedRecords.length > 0){
				self.messageType = 'alert-danger';
				appUtils.launchModal('Some inconsistencies were found on the records. Please find the transactions below');
			} else {
				self.messageType = 'alert-success';
				appUtils.launchModal('Records processed successfully. No errors found.');
			}
		}, function(){
			self.failedRecords = [];
			appUtils.stopLoading();
			self.messageType = 'alert-danger';
			appUtils.launchModal('Your file could not be loaded.');
		});
		
		
		
	}

});