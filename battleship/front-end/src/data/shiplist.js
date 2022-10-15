import S1 from "../assets/images/Ships/sub.png"
import S2 from "../assets/images/Ships/frigate.png"; 
import S3 from "../assets/images/Ships/des.png"; 
import S4 from "../assets/images/Ships/corvette.png"; 
import S5 from "../assets/images/Ships/aircraft_carrier.png";
import "../data/shiplist.sass";

export const ShipList = {
    SUBMARINE: {
        id: "submarine",
        thumb: S1,
        length: 2
    },
    FRIGATE: {
        id: "frigate",
        thumb: S2,
        length: 3
    },
    DESTROYER: {
        id: "destroyer",
        thumb: S3,
        length: 3
    },
    CORVETTE: {
        id: "corvette",
        thumb: S4,
        length: 1
    },
    CARRIER: {
        id: "carrier",
        thumb: S5,
        length: 4
    }
}