const config = {
  entries: [
    {
      filePath: "./src/ts/index.ts",
      outFile: "./dist/js/navbar.d.ts",
      noCheck: false,
      output: {
        umdModuleName: 'Navbar',
        noBanner: true,
      }
    },
  ],
};

module.exports = config;
