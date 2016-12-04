describe('Customer Statement Processor App Utils', function(){
	  var appUtils;

	  var myRootScope;

	  //load app module
	  beforeEach(angular.mock.module('stmtProcApp'));

	  //lets inject our stmtProcService instance
	  beforeEach(inject(function(_appUtils_, $rootScope) {
	    appUtils = _appUtils_;
	    myRootScope = $rootScope;
	  }));

	  // verify if service instance was injected properly
	  it('should be injected properly', function() {
	    expect(appUtils).toBeDefined();
	  });

	  describe('.areRecordsValid(records)', function(){
	  	it('should return true when valid records', function(){
	  		var isValid = appUtils.areRecordsValid([{_reference: '163585',
	  												accountNumber: 'NL90ABNA0585647886',
	  												description: 'Candy for Vincent Bakker',
	  												startBalance: '32.01',
	  												mutation: '+27.12',
	  												endBalance: '59.13'
	  												}]);
	  		expect(isValid).toBe(true);
	  	});

	  	it('should return false when invalid records', function(){
	  		var isValid = appUtils.areRecordsValid([{_reference: '163585',
	  												accountNumber: 'NL90ABNA0585647886',
	  												description: 'Candy for Vincent Bakker',
	  												startBalance: '32.01',
	  												mutation: 'abcdef',
	  												endBalance: '59.13'
	  												}]);
	  		expect(isValid).toBe(false);
	  	});
	  });

	  describe('.getRecordsAsJson(file)', function(){
	  	it('should parse valid customer transactions file successfully and call defer.resolve when valid transactions', function(){
	  		var create = ['<records>' +
						  	'<record reference="163585">' +
						    '<accountNumber>NL90ABNA0585647886</accountNumber>' +
						    '<description>Candy for Vincent Bakker</description>' +
						    '<startBalance>32.01</startBalance>' +
						    '<mutation>+27.12</mutation>' +
						    '<endBalance>59.13</endBalance>' +
						  	'</record>'+
						  '</records>'];
  			var blob = new Blob([create], {"type" : "text/xml"});
  			var mockFile = new File([blob], "mockfile.xml")
  			//var promise = appUtils.getRecordsAsJson(mockFile);

  			appUtils.getRecordsAsJson(mockFile).then(function(records) {
  				console.log('caraio')
				done();
		    }, function(reason) {
		    	 done(new Error('File should have been parsed successfully and records should be returned.'));
		    });
			//resolving promises
	  		myRootScope.$digest();

	  	});

	  	it('should parse valid customer transactions file successfully and call defer.reject when invalid transactions', function(){
	  		var create = ['<records>' +
						  	'<record reference="163585">' +
						    '<accountNumber>NL90ABNA0585647886</accountNumber>' +
						    '<description>Candy for Vincent Bakker</description>' +
						    '<startBalance>32.01</startBalance>' +
						    '<mutation>+27.12</mutation>' +
						    '<endBalance>abcdef</endBalance>' +
						  	'</record>'+
						  '</records>'];
  			var blob = new Blob([create], {"type" : "text/xml"});
  			var mockFile = new File([blob], "mockfile.xml")
  			var promise = appUtils.getRecordsAsJson(mockFile);

  			//resolving promises
	  		myRootScope.$digest();

  			promise.then(function() {
  				done(new Error('File should have been parsed successfully but no records should return because they are invalid.'));
		    }, function(reason) {
		    	console.log('caraio')
				done();
		    });

	  	});
	  });

});