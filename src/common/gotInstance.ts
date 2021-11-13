import { Got } from "got/dist/source";
import { AERODATABOX_API_CONFIG, AVIATION_EDGE_API_CONFIG } from "../../config";
import GotAeroDataBoxWrapper from "./GotAeroDataBoxWrapper";
import GotAviationEdgeWrapper from "./GotAviationEdgeWrapper";

export const aeroDataBoxGotInstance: Got = new GotAeroDataBoxWrapper(AERODATABOX_API_CONFIG).getInstance();
export const aviationEdgeGotInstance: Got = new GotAviationEdgeWrapper(AVIATION_EDGE_API_CONFIG).getInstance();

