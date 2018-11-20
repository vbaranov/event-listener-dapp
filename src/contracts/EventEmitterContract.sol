pragma solidity ^0.4.25;
 
contract EventEmitterContract {
    event FunctionCalled(uint indexed _id);
    event FunctionCalled2(uint indexed _id);
    function emitEvent(uint _id) public {
        emit FunctionCalled(_id);
    }
}