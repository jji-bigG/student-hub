/**
 * this is for dropping all the env var reading logics here
 * logic is already loaded to the process.env from the global.d.ts
 * just need to edit that file when adding a new environment variable
 * https://dev.to/asjadanis/parsing-env-with-typescript-3jjm
 */

import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  PORT: number | undefined;
  MONGO_URI: string | undefined;
}

interface Config {
  PORT: number;
  MONGO_URI: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    MONGO_URI: process.env.MONGO_URI,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
