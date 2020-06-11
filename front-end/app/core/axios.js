import Constants from "expo-constants";
import axios from "axios";
const { manifest } = Constants;

axios.defaults.baseURL =  `http://${manifest.debuggerHost
  .split(`:`)
  .shift()
  .concat(`:6666`)}`;

export default axios;
