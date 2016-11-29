angular.module('stmtProcApp').controller('stmtProcController', function($http, $rootScope ,$scope, $location, $window, stmtProcService, appUtils) {
	var self = this;

	//controller will communicate this array of failedRecords, if any.
	self.failedRecords;

	self.sendFile = function(){
		var file = $scope.stmtProcFile;
		if(!file){
			appUtils.launchModal('Please select the file first.');
			return ;
		}

		//waiting screen
		appUtils.initializeLoading();

		appUtils.getRecordsAsJson(file).then(function(records){
			self.failedRecords = stmtProcService.processCustomerRecords(records);
			appUtils.stopLoading();
			appUtils.launchModal();
		});
		
		
		
	}

});