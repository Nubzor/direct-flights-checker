import { Got } from "got/dist/source";
import { AERODATABOX_API_CONFIG } from "../../config";
import GotWrapper from "./GotWrapper";

const gotInstance: Got = new GotWrapper(AERODATABOX_API_CONFIG).getInstance();

export default gotInstance;