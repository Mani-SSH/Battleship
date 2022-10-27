import img_missile from "../assets/images/power/missile.png";
import img_radar from "../assets/images/power/radar.png";
import img_cluster from "../assets/images/power/cluster.png";
import img_airstrike from "../assets/images/power/airstrike.png";



export const ActionList = {
    MISSILE: {
        id: "missile",
        charge: 1,
        imgSrc: img_missile
    },
    RADAR: {
        id: "radar",
        charge: 3,
        imgSrc: img_radar
    },
    CLUSTER_STRIKE: {
        id: "cluster_strike",
        charge: 6,
        imgSrc: img_cluster
    },
    AERIAL_STRIKE: {
        id: "aerial_strike",
        charge: 6,
        imgSrc: img_airstrike
    }
}