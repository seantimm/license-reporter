import { IReporterConfiguration } from "../../src";
import * as path from "path";

export const configuration: Partial<IReporterConfiguration> = {
    ignore: ["node_modules", path.resolve(__dirname, "test")],
};
