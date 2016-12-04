describe('Customer Statement Processor Service', function(){
	  var stmtProcService;

	  //load app module
	  beforeEach(angular.mock.module('stmtProcApp'));

	  //lets inject our stmtProcService instance
	  beforeEach(inject(function(_stmtProcService_) {
	    stmtProcService = _stmtProcService_;
	  }));

	  // verify if service instance was injected properly
	  it('should be injected properly', function() {
	    expect(stmtProcService).toBeDefined();
	  });

	  describe('.processCustomerRecords(records)',function() {

	  	it('should exist', function(){
	  		expect(stmtProcService.processCustomerRecords).toBeDefined();
	  	});

	  	it('should return empty failed records array when valid records', function(){
	  		var records = [{
	  			_reference: '163585',
	  			accountNumber: 'NL90ABNA0585647886',
	  			description: 'Candy for Vincent Bakker',
	  			startBalance: '32.01',
	  			mutation: '+27.12',
	  			endBalance: '59.13'
	  		},
	  		{
	  			_reference: '126297',
	  			accountNumber: 'NL93ABNA0585619023',
	  			description: 'Candy for Vincent Dekker',
	  			startBalance: '105.24',
	  			mutation: '-25.89',
	  			endBalance: '79.35'
	  		}];

	  		expect(stmtProcService.processCustomerRecords(records)).toEqual([]);
	  	});

	  	it('should return failed records array when non unique transaction references', function(){
	  		var records = [{
	  			_reference: '163585',
	  			accountNumber: 'NL90ABNA0585647886',
	  			description: 'Candy for Vincent Bakker',
	  			startBalance: '32.01',
	  			mutation: '+27.12',
	  			endBalance: '59.13'
	  		},
	  		{
	  			_reference: '163585',
	  			accountNumber: 'NL93ABNA0585619023',
	  			description: 'Candy for Vincent Dekker',
	  			startBalance: '105.24',
	  			mutation: '-25.89',
	  			endBalance: '79.35'
	  		}];

	  		expect(stmtProcService.processCustomerRecords(records)).not.toEqual([]);
	  		expect(stmtProcService.processCustomerRecords(records)).toEqual([{
	  								reference: '163585',
	  								description: 'Candy for Vincent Dekker',
	  								errorType: 'NU'}]);
	  	});

	  	it('should return failed records array when incorrect transaction end balance', function(){
	  		var records = [{
	  			_reference: '175885',
	  			accountNumber: 'NL43AEGO0773393871',
	  			description: 'Clothes for Richard de Vries',
	  			startBalance: '5429',
	  			mutation: '-939',
	  			endBalance: '6368'
	  		}];

	  		expect(stmtProcService.processCustomerRecords(records)).not.toEqual([]);
	  		expect(stmtProcService.processCustomerRecords(records)).toEqual([{
	  								reference: '175885',
	  								description: 'Clothes for Richard de Vries',
	  								errorType: 'IEB'}]);
	  	});

	  });
});