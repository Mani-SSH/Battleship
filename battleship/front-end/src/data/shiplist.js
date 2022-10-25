import S1 from "../assets/images/Ships/sub.png"
import S2 from "../assets/images/Ships/frigate.png"; 
import S3 from "../assets/images/Ships/des.png"; 
import S4 from "../assets/images/Ships/corvette.png"; 
import S5 from "../assets/images/Ships/aircraft_carrier.png";
import D1 from "../assets/images/Destroyed/submarine_des.png";
import D2 from "../assets/images/Destroyed/frigate_des.png";
import D3 from "../assets/images/Destroyed/destroyer_des.png";
import D4 from "../assets/images/Destroyed/corvette_des.png";
import D5 from "../assets/images/Destroyed/carrier_des.png";
import "../data/shiplist.sass";

export const ShipList = {
    SUBMARINE: {
        id: "submarine",
        thumb: S1,
        dThumb: D1,
        length: 2
    },
    FRIGATE: {
        id: "frigate",
        thumb: S2,
        dThumb: D2,
        length: 3
    },
    DESTROYER: {
        id: "destroyer",
        thumb: S3,
        dThumb: D3,
        length: 3
    },
    CORVETTE: {
        id: "corvette",
        thumb: S4,
        dThumb: D4,
        length: 1
    },
    CARRIER: {
        id: "carrier",
        thumb: S5,
        dThumb: D5,
        length: 4
    }
}