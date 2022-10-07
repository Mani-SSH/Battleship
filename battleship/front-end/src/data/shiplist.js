import S1 from "../assets/images/Ships/sub.png"
import S2 from "../assets/images/Ships/frigate.png"; 
import S3 from "../assets/images/Ships/des.png"; 
import S4 from "../assets/images/Ships/corvette.png"; 
import S5 from "../assets/images/Ships/aircraft_carrier.png";

export const ShipList = {
    SUBMARINE: {
        id: "submarine",
        type: "ship",
        thumb: S1,
        length: 2
    },
    FRIGATE: {
        id: "frigate",
        type: "ship",
        thumb: S2,
        length: 2
    },
    DESTROYER: {
        id: "destroyer",
        type: "ship",
        thumb: S3,
        lenght: 3
    },
    CORVETTE: {
        id: "coverette",
        type: "ship",
        thumb: S4,
        length: 3
    },
    CARRIER: {
        id: "carrier",
        type: "ship",
        thumb: S5,
        length: 4
    }
}