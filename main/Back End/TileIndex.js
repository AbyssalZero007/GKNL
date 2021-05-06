class solarSystem {
    
    constructor(name) {
        this.systemName = name;
    }
    
    addPlanet(name, tiles) {
        //insert access to database here
        this.planetIndex = [];
        let planet1 = new planet(/*tile count from database*/, /*planet name from database*/);
        this.planetIndex.push(planet1);
    }

    getSystemName() {
        return this.systemName;
    }
}

class planet {
    constructor(tileCount, name) {
        this.planetName = name;
        this.tileMap = [];
        for (i = 0; i < tileCount; i++) {
            let tile1 = new tile(i+1);
            this.tileMap.push(tile1);
        }
    }
    
    getPlanetName() {
        return this.planetName;
    }

}

class tile {
    constructor(number) {
        this.tileNumber = number;
        //access to database to pull tile information
        this.faction = //db info
        this.forts = //db info
        this.buildings = [];
        //for loop to insert buildings into that array from db
    }

    controllingFaction() {
        return this.faction;
    }

    numForts() {
        return this.forts;
    }

    buildingsIndex() {
        var buildingString = "";
        for (i = 0; i < this.buildings.length; i++) {
            if (i == 3){
                buildingString += buildings[i];
            } else {
                buildingString += (buildings[i] + ", ");
            }
        }
        return buildingString;
    }
}


