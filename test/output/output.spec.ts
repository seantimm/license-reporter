import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import path from "path";
import fs from "fs";
import { executeCli } from "../test.util";
import { replaceBackslashes } from "../../src/util";

const fsMocked = jest.mocked(fs);
jest.spyOn(console, "log").mockImplementation(() => {});
jest.spyOn(console, "warn").mockImplementation(() => {});

describe('Parameter "--output"', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('exports "3rdpartylicenses.json" into the root directory by default', async () => {
        await executeCli("--root", __dirname);
        expect(fsMocked.writeFileSync).toBeCalledWith(
            replaceBackslashes(path.resolve(__dirname, "3rdpartylicenses.json")),
            "[]",
        );
    });

    it("exports into absolute path", async () => {
        await executeCli("--root", __dirname, "--output", "/test/test.json");
        expect(fsMocked.writeFileSync).toBeCalledWith("/test/test.json", "[]");
    });

    it("exports into relative path relative from root", async () => {
        await executeCli("--root", __dirname, "--output", "relative/test.json");
        expect(fsMocked.writeFileSync).toBeCalledWith(
            replaceBackslashes(path.resolve(__dirname, "relative/test.json")),
            "[]",
        );
    });

    it("exports into path provided by the config", async () => {
        await executeCli("--root", __dirname, "--config", "test.config.ts");
        expect(fsMocked.writeFileSync).toBeCalledWith(
            replaceBackslashes(path.resolve(__dirname, "fromConfig/test.json")),
            "[]",
        );
    });

    it("exports into path provided by the config even if cli parameter is set", async () => {
        await executeCli("--root", __dirname, "--config", "test.config.ts", "--output", "/test/test.json");
        expect(fsMocked.writeFileSync).toBeCalledWith(replaceBackslashes(path.resolve(__dirname, "fromConfig/test.json")), "[]");
    });

    it("ensures that the directories for the output path exist", async () => {
        await executeCli("--root", __dirname, "--output", "relative/path/in/new/directory/test.json");
        expect(fsMocked.mkdirSync).toBeCalledWith(
            replaceBackslashes(path.resolve(__dirname, "relative/path/in/new/directory")),
            { recursive: true },
        );

        jest.clearAllMocks();

        await executeCli("--root", __dirname, "--output", "/absolute/path/in/new/directory/test.json");
        expect(fsMocked.mkdirSync).toBeCalledWith("/absolute/path/in/new/directory", { recursive: true });
    });
});
