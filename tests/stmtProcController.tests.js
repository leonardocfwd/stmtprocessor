describe('Customer Statement Processor Controller', function(){
	  beforeEach(module('stmtProcApp'));

	  //angular's mocked controller provider
	  var $controller;

	  //mocked instance of stmtProcController that will be created from $controller
	  var stmtProcController;

	  //mock object for controller's scope
	  var $scope = {};

	  //mock object for appUtils used in stmtProcController
	  var appUtils;

	  //mock object for stmtProcService
	  var stmtProcService;

	  //mock array of parsed records from file
	  var mockParsedRecords = [];

	  //mock array of failed records from service;
	  var mockFailedRecords = [];

	  //mock $q to work with promises
	  var $q;

	  //in order to be able to resolve promises, angular requires us to digest the root scope
	  var myRootScope;

	  beforeEach(inject(function(_$controller_, _$q_, $rootScope){
	  	//controllers are not available on the global scope, to getting the generic ref to the controllers
	    $controller = _$controller_;

	    //injecting $q for promises
	    $q = _$q_;

	    //mock appUtils
	    appUtils = { 	
	    				launchModal: function(){},
						initializeLoading: function(){},
						getRecordsAsJson: function(){
							//mocking the promise returned from appUtils.getRecordsAsJson(file)
							var deferred = $q.defer();
					        deferred.resolve(mockParsedRecords);
					        return deferred.promise;
						},
						stopLoading: function(){}
					};

		//mock stmtProcService
		stmtProcService = {
							processCustomerRecords: function(records){
								return mockFailedRecords;
							}
		};

	    //mocking the scope and other dependencies
	    stmtProcController = $controller('stmtProcController', { $scope: $scope,
	    														 appUtils : appUtils,
	    														 stmtProcService: stmtProcService });

	    //inject root scope to resolve promises
	    myRootScope=$rootScope;
	  }));


	  // verify if controller instance was injected properly
	  it('should be injected properly', function() {
	    expect($controller).toBeDefined();
	    expect(stmtProcController).toBeDefined();
	  });

	  describe('.sendFile()', function(){
	  	it('should launch error modal when no file selected', function(){
	  		$scope.stmtProcFile = undefined;
	  		spyOn(appUtils, "launchModal");
	  		stmtProcController.sendFile();
	  		expect(appUtils.launchModal).toHaveBeenCalled();
	  	});

	  	it('should show success message when no failed records', function(){
	  		$scope.stmtProcFile = {name: 'mockfile.csv',
	  					size: 2000,
	  					type: 'application/vnd.ms-excel'};

	  		spyOn(appUtils, "initializeLoading");
	  		spyOn(appUtils, "launchModal");
	  		stmtProcController.sendFile();

	  		//loading screen should be launched
	  		expect(appUtils.initializeLoading).toHaveBeenCalled();

			//need to find out how to make jasmine see promise's scope
			//expect(stmtProcService.processCustomerRecords).toHaveBeenCalled();
	  		//expect(appUtils.launchModal).toHaveBeenCalledWith('Records processed successfully. No errors found.');

	  		//resolving promises
	  		myRootScope.$digest();
	  	});

	  	it('should show error message when existing failed records', function(){
	  		$scope.stmtProcFile = {name: 'mockfile.csv',
	  					size: 2000,
	  					type: 'application/vnd.ms-excel'};
	  					mockFailedRecords = [{reference: '137243',
	  											errorType: 'NU',
	  										    description: 'Candy from Rik King'}];

	  		spyOn(appUtils, "initializeLoading");
	  		spyOn(appUtils, "launchModal");
	  		stmtProcController.sendFile();

	  		//loading screen should be launched
	  		expect(appUtils.initializeLoading).toHaveBeenCalled();

	  		//need to find out how to make jasmine see promise's scope
	  		//expect(stmtProcService.processCustomerRecords).toHaveBeenCalled();
	  		//expect(appUtils.launchModal).toHaveBeenCalledWith('Some inconsistencies were found on the records. Please find the transactions below');

	  		//resolving promises
	  		myRootScope.$digest();
	  	});

	  	it('should show error message when file could not be parsed', function(){
	  		//have to re-inject in order to have rejected promise
	  		inject(function(_$controller_, _$q_, $rootScope){
			  	//controllers are not available on the global scope, to getting the generic ref to the controllers
			    $controller = _$controller_;

			    //injecting $q for promises
			    $q = _$q_;

			    //mock appUtils
			    appUtils = { 	
			    				launchModal: function(){},
								initializeLoading: function(){},
								getRecordsAsJson: function(){
									//mocking the promise returned from appUtils.getRecordsAsJson(file)
									var deferred = $q.defer();
							        deferred.reject(mockParsedRecords);
							        return deferred.promise;
								},
								stopLoading: function(){}
							};

				//mock stmtProcService
				stmtProcService = {
									processCustomerRecords: function(records){
										return mockFailedRecords;
									}
				};

			    //mocking the scope and other dependencies
			    stmtProcController = $controller('stmtProcController', { $scope: $scope,
			    														 appUtils : appUtils,
			    														 stmtProcService: stmtProcService });

			    //inject root scope to resolve promises
			    myRootScope=$rootScope;
			  });

	  		$scope.stmtProcFile = {name: 'mockfile.csv',
	  					size: 2000,
	  					type: 'application/vnd.ms-excel'};
	  					mockFailedRecords = [{reference: '137243',
	  											errorType: 'NU',
	  										    description: 'Candy from Rik King'}];

	  		spyOn(appUtils, "initializeLoading");
	  		spyOn(appUtils, "launchModal");
	  		stmtProcController.sendFile();

	  		//loading screen should be launched
	  		expect(appUtils.initializeLoading).toHaveBeenCalled();

	  		//need to find out how to make jasmine see promise's scope
	  		//expect(stmtProcService.processCustomerRecords).not.toHaveBeenCalled();
	  		//expect(appUtils.launchModal).toHaveBeenCalledWith('Your file could not be loaded.');

	  		//resolving promises
	  		myRootScope.$digest();
	  	});
	  });

});