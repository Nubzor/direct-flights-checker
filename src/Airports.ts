import got from "./common/gotInstance";

class Airports {
    private radius: number;
    private limit: number;

    constructor(radius: number, limit: number) {
        this.radius = radius;
        this.limit = limit;
    }


    getAirportsByCoorindates(lat: number, lon: number) {
        got(`airports/search/location/${lat}/${lon}/km/${this.radius}/${this.limit}`)
        .then(res => console.log(res.body))
        .catch(e => console.log(e));
    }
}


export default Airports;