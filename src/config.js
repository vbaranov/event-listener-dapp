module.exports = {
	"contract": {
		"addresses": {
			"77": "0x04b7bb4c13479ef42292de07a0046ebe2931b98b",
			"99": "0x5ea64d75a6cd9f89cb524feb8f432b22afa31d3d"
		},
		"abi": [
			{
				"constant": false,
				"inputs": [
					{
						"name": "_id",
						"type": "uint256"
					}
				],
				"name": "emitEvent",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"name": "_id",
						"type": "uint256"
					}
				],
				"name": "FunctionCalled",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"name": "_id",
						"type": "uint256"
					}
				],
				"name": "FunctionCalled2",
				"type": "event"
			}
		]
	}
}