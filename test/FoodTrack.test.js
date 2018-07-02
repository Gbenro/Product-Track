const assert= require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3 (ganache.provider());

const {interface, bytecode} = require('../compile');


let foodTrack;
let accounts;
let count;
let  prevLocation;

beforeEach(async () =>{
  accounts = await web3.eth.getAccounts();

  foodTrack = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data:bytecode})
  .send({from: accounts[0], gas:'1000000'});

  await foodTrack.methods.AddNewLocation(100, "Manufacturer", "Big Secret").send({
    from: accounts[0],
    gas: '3000000'

  })

  count = await foodTrack.methods.GetTrailCount().call({
    from:accounts[0]
    
  });
});

describe('FoodTrack Contract',() =>{
  it('It deploys a contract', () =>{
    assert.ok(foodTrack.options.address);
  });

  it ('Adds New Location', async () =>{
      assert(count, 1);
  });

  it('gets the previous Location', async () =>{

      await foodTrack.methods.AddNewLocation(100, "Wholesaler", "Big Secret").send({
        from: accounts[0],
        gas: '3000000'

    })
    prevLocation = await foodTrack.methods.GetPrevLocation(1).call({
      from:accounts[0]
   
    });
    console.log(prevLocation)
    //assert(count, 2);
    assert(prevLocation, "66");
 
  })

});
