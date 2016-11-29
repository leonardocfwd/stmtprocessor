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
	       getRecordsAsJson: function(file){
	       		//working with promises to guarantee the return from the parser libraries.
	       		var defer = $q.defer();
	       		var records = [];

	       		if(file.name.includes('.xml')){
					var r = new FileReader();
				      r.onload = function(e) { 
					      var contents = e.target.result;
					      var x2js = new X2JS();
						  var xmlParsedJson = x2js.xml_str2json(contents);
						  records = xmlParsedJson.records.record;
						  defer.resolve(records);
				      }
				      r.readAsText(file);
				} else if(file.name.includes('.csv')){
					Papa.parse(file, {
						header: true,
						complete: function(results) {
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
							defer.resolve(records);
						}
					});
				}


				return defer.promise;
	       }
	    }
});