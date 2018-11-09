module.exports = {
	"contract": {
		"addresses": {
			"77": "0xa65cb829013ea7027ec1fcb0f65d676466ba2a2a",
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
			}
		]
	}
}