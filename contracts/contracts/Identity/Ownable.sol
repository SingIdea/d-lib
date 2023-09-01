pragma solidity 0.4.23;

contract Ownable {
  address public owner;

  event OwnerTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );

  constructor()
    public
  {
    owner = msg.sender;
  }

  modifier onlyOwner()
  {
    require(msg.sender == owner,"");
    _;
  }

  function transferOwner(
    address _newOwner
  )
    public
    onlyOwner
  {
    require(_newOwner != address(0),"");
    emit OwnerTransferred(owner, _newOwner);
    owner = _newOwner;
  }

}