const dotenv = require('dotenv');
dotenv.config({});

const fs = require('fs');

module.exports = {
  packagerConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'neon_app',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/index.html',
              js: './src/renderer.tsx',
              name: 'main_window',
            },
          ],
        },
      },
    ],
  ],
  hooks: {
    generateAssets: async () => {
      fs.writeFileSync(
        './config.json',
        JSON.stringify({
          DATABASE_PATH: process.env.DATABASE_PATH,
        }),
      );
    },
  },
};
