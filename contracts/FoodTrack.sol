pragma solidity^0.4.17;

contract FoodTrack{

struct Location{

    string Name;
    uint LocationId;
    uint PreviousLocationId;
    uint Timestamp;
    string Secret;
}

mapping (uint =>Location) Trail;
uint8 TrailCount = 0;

function  AddNewLocation  (uint LocationId,string Name, string Secret) public {
    Location memory newLocation;
    newLocation.Name= Name;
    newLocation.LocationId = LocationId;
    newLocation.Secret= Secret;
    newLocation.Timestamp= now;
    if (TrailCount!=0){
        newLocation.PreviousLocationId= Trail[TrailCount].LocationId;
    }
    Trail[TrailCount]= newLocation;
    TrailCount++;
}
function GetTrailCount() public view returns (uint8){

    return TrailCount;
}

function GetLocation(uint8 TrailNo) public  view returns (string, uint, uint, uint, string)
{
    return (Trail[TrailNo].Name, Trail[TrailNo].LocationId, Trail[TrailNo].PreviousLocationId, Trail[TrailNo].Timestamp, Trail[TrailNo].Secret);

}
function GetTimeDiff(uint8 TrailNo) public view returns (uint)
{
     if (TrailNo==0){
        
        return 0;
    }else{
        
       return Trail[TrailNo].Timestamp - Trail[TrailNo -1].Timestamp;
    
}
}
    function GetPrevLocation( uint8 TrailNo) public view returns (uint, string)
    {
        
        if (TrailNo==0){
        
        return (0, "Origin");
    }else{
        
        return  (Trail[TrailNo-1].LocationId,  Trail[TrailNo-1].Name);
        
    }
}
}
