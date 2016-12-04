angular.module('stmtProcApp').factory("appUtils", function($q) {                                                                                                                                                   
	     return {                                                                                                                                                                                                              
	    	 launchModal : function(message){
	    		 $('#modalMessage').text(message);
	    		 $('#messageModal').modal('show');
	    	 },
	    	 initializeLoading: function() {   
	    	   window.loading_screen = window.pleaseWait({
	 	    	  logo: "assets/images/rabobanklogo.jpg",
	 	    	  backgroundColor: '#2A3F54',
	 	    	  loadingHtml:       "<p class='loading-message' style='font-size: 20px; font-weight: 300; color: #FFF;" +
	 	    	  "font-family: \"raleway\",sans-serif;'>Please wait. We are processing your records.</p><div class='sk-wave'>"+
	 	          "<div class='sk-rect sk-rect1'></div>"+
	 	          "<div class='sk-rect sk-rect2'></div>"+
	 	          "<div class='sk-rect sk-rect3'></div>"+
	 	          "<div class='sk-rect sk-rect4'></div>"+
	 	          "<div class='sk-rect sk-rect5'></div>"+
	 	        "</div>"
	 	    	});
	       },
	       stopLoading: function() {
	    	    var loading_screen = window.loading_screen;
	    	    loading_screen.finish();
	       },
	       areRecordsValid: function(records){
	       		//validate data integrity
	       		for(var i=0; i<records.length; i++){
	       			if(records[i]._reference == undefined
	       				|| records[i].accountNumber == undefined
	       				|| records[i].description == undefined
	       				|| records[i].startBalance == undefined
	       				|| records[i].mutation == undefined
	       				|| records[i].endBalance == undefined
	       				|| isNaN(records[i].startBalance)
	       				|| isNaN(records[i].mutation)
	       				|| isNaN(records[i].endBalance)){
	       				return false;
	       			}
	       		}
	       		return true;
	       },
	       getRecordsAsJson: function(file){
	       		var records = [];

	       		//working with promises to guarantee the return from the parser libraries.
	       		var defer = $q.defer();
	       		if(file.name.includes('.xml')){
	       			var self = this;
					var r = new FileReader();
				      r.onload = function(e) { 
					      var contents = e.target.result;
					      var x2js = new X2JS();
						  var xmlParsedJson = x2js.xml_str2json(contents);

						  //if for some reason the file could not be parsed.
						  if(!xmlParsedJson){
						  	defer.reject(records);
						  	return;
						  }

						  records = xmlParsedJson.records.record;

						  //validate data integrity
						  if(self.areRecordsValid(records)){
								defer.resolve(records);
							} else {
								defer.reject(records);
							}
				      }
				      r.readAsText(file);
				} else if(file.name.includes('.csv')){
					var self = this;
					Papa.parse(file, {
						header: true,
						complete: function(results) {
							//if for some reason the file could not be parsed.
							if(results.errors.length > 0){
								defer.reject(records);
								return;
							}

							angular.forEach(results.data, function(record, key) {
								//Need to convert the csv headers into the same format as XML in order to be able to handle json object gracefully on
								//the service.
								var parsedRecord = {};
								parsedRecord._reference = record['Reference'];
								parsedRecord.accountNumber = record['Account Number'];
								parsedRecord.description = record['Description'];
								parsedRecord.startBalance = record['Start Balance'];
								parsedRecord.mutation = record['Mutation'];
								parsedRecord.endBalance = record['End Balance'];
							 	records.push(parsedRecord);
							});

							//validate data integrity
							if(self.areRecordsValid(records)){
								defer.resolve(records);
							} else {
								defer.reject(records);
							}
						}
					});
				} else {
					//file chosen was not in the expected format either .csv or .xml
					defer.reject(records);
				}


				return defer.promise;
	       }
	    }
});