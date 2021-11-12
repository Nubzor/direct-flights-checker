import { Got } from "got/dist/source";
import { API_CONFIG } from "../../config";
import GotWrapper from "./GotWrapper";

const gotInstance: Got = new GotWrapper(API_CONFIG).getInstance();

export default gotInstance;