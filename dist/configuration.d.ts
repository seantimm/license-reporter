import { OptionValues } from "commander";
/**
 * The possible search modes
 */
export declare enum SearchMode {
    /** Also searches in subdirectories */
    recursive = "recursive",
    /** Only searches in the root directory */
    flat = "flat"
}
/**
 * The package information for a single package
 */
export interface IPackageInfo {
    /** The name of the package */
    name: string;
    /** The url to the homepage/repo of the package */
    url: string;
    /** The name of the license */
    licenseName: string;
    /** The license text */
    licenseText: string;
    /** The package version */
    version: string;
}
/**
 * The parameters that can be configured within the configuration file
 */
export interface IReporterConfiguration {
    /** Add a folder that contains packages. Useful if libraries are in a folder that isn't named "node_modules". */
    addFolder: string[];
    /** The default license text that is used if the tool can't find a license text for a package */
    defaultLicenseText: string;
    /** Forces a good exit. */
    force: boolean;
    /** Ignores the given paths when searching for packages */
    ignore: string[];
    /** If true, license-reporter will not fail and warn you because of missing urls */
    ignoreMissingUrl: boolean;
    /** The path to the output file */
    output: string;
    /** The overrides for single packages */
    overrides: Partial<IPackageInfo>[];
    /** The path to the root directory */
    root: string;
    /** The search mode. Can be "flat" or "recursive" */
    search: SearchMode;
}
/**
 * The parameters of the cli
 */
export interface IReporterCliConfiguration extends IReporterConfiguration {
    /** The path to the configuration file */
    config: string;
}
/**
 * The default configuration
 */
export declare const defaultConfiguration: IReporterCliConfiguration;
/**
 * Loads the configuration file
 * @param options The configuration parameters that were collected by commander
 */
export declare function loadConfiguration(options: OptionValues): Promise<IReporterConfiguration>;
//# sourceMappingURL=configuration.d.ts.map