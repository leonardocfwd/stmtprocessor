angular.module('stmtProcApp').service('stmtProcService', function($http, $location, $q, appUtils) {
	var self = this;

	self.processCustomerRecords = function(records){
		//array to store references already processed in order to be able to determine if
		//the next record has already been processed.
		var processedRefs = [];

		//array to store the records which failed on processing, either by repeated reference id or if invalid end balance.
		var failedRecords = [];

		angular.forEach(records, function(record, key) {
			//variable to store a failed record. This is commmon code for both flows. They only will be added if inconsistancies are found.
			var failedRecord = {};
			failedRecord.reference = record._reference;
		 	failedRecord.description = record.description;

			//First we validate if this record was already processed.
		 	if(processedRefs.indexOf(record._reference) != -1){
		 		//error type code stands for 'Not Unique'.
		 		failedRecord.errorType = 'NU';
		 		failedRecords.push(failedRecord);
		 	} else {
		 		//If record not yet processed, lets check for the end balance.

		 		//Parsing string of balances that were produced by the parser libraries.
		 		var startBalance = parseFloat(record.startBalance);
		 		var mutation = parseFloat(record.mutation);
		 		var endBalance = parseFloat(record.endBalance);

		 		//making the float precision to '2' to make math operations.
		 		if(!(endBalance.toFixed(2) == (startBalance + mutation).toFixed(2))){
		 			//error type which stands for 'Incorrect End Balance'.
					failedRecord.errorType = 'IEB'; 
					failedRecords.push(failedRecord);
		 		}
		 	}
		});

		return failedRecords;
	}
	
});