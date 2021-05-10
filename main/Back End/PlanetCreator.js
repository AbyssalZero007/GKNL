// Variables
var planets = [];
var tileCatalog = []; //array indexes match from each planet and its tile map. I.e. planets[5] corrosponds to tileCatalog[5]
sessvars.locationID = 0;

function onload(systemName) {
    //Access Database here
    planetBuild(systemName)
    for (i=0; i<planets.length; i++) {
        tileBuild(planets[i].getTileCount(), /*Will Probably need a planet id of some sort*/);
    }

}

function planetBuild(systemName) {
    //Pull Planet count
    var planetCount = 0; //Number of planets in the system, pulled from db
    for (i=0; i<planetCount; i++) {
        //Pull name, tile count, and a String Array of planetary traits
        var tileCount = ;//db access;
        var planetName = ;//db access
        var planetTraits = ;//db access. ARRAY OF STRINGS IS NESSECARY!!
        var planet1 = new planet(tilecount, planetName, planetTraits)
        planets.push(planet1);
    }
}

function tileBuild(tileCount, /*Will Probably need a planet id of some sort*/) {
    var tileMap = [];
    for (i=0; i<tileCount; i++) {
        //db tile info pull
        var controllingFaction = ;
        var fortCount = ;
        var buildings = ; //ARRAY OF STRINGS IS NESSECARY!!
        var tile1 = new tile((i+1), fortCount, controllingFaction, buildings);
        tileMap.push(tile1);
    }
    tileCatalog.push(tileMap);
}

function idStore(planetName, systemName) {
    //database query for planetName
    planetID = ; //planetID of the planet planetName in system systemName
    locationID = planetID;
}

function idClear() {
    sessvars.$.clearMem();
}


//Classes
class planet {
    constructor(tileCount, name, traits) {
        planetName = name;
        tiles = tileCount;
        tileMap = [];
        planetaryTraits = traits; //This needs to be an array of strings
    }
    getPlanetName() {
        return this.planetName;
    }
    getTileCount() {
        return this.tiles;
    }
}

class tile {
    constructor(tileID, numForts, conFac, tileBuildings) {
        tileNumber = tileID;
        faction = conFac;
        forts = numForts;
        buildings = tileBuildings; //This needs to be an array of strings
    }

    controllingFaction() {
        return this.faction;
    }

    numForts() {
        return this.forts;
    }
}