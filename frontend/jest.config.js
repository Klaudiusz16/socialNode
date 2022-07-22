module.exports = {
  transform: {
    "^.+.(ts|tsx)$": "ts-jest",
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [
    // `node_modules/(?!(gatsby|gatsby-script)/)`,
    "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)",
  ],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testEnvironment: `jsdom`,
  setupFiles: [`<rootDir>/loadershim.js`],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "json"],
  moduleNameMapper: {
    "^gatsby-page-utils/(.*)$": `gatsby-page-utils/dist/$1`,
    // "^gatsby-core-utils/(.*)$": `gatsby-core-utils/dist/$1`,
    // "^gatsby-plugin-utils/(.*)$": [
    //   `gatsby-plugin-utils/dist/$1`,
    //   `gatsby-plugin-utils/$1`,
    // ],
  },
};
