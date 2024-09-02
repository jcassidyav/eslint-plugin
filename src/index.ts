import { rules } from "./rules";
import * as configs from "./configs";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const packageData = require("../package.json") as Record<string, string>;

const meta = { name: packageData.name, version: packageData.version };

module.exports = {
    configs,
    meta,
    rules,
};
