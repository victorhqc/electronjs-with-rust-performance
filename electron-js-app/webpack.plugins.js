const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

module.exports = [
  new FilterWarningsPlugin({
    exclude: [
      /mongodb/,
      /mssql/,
      /mysql/,
      /mysql2/,
      /oracledb/,
      /pg/,
      /pg-native/,
      /pg-query-stream/,
      /react-native-sqlite-storage/,
      /redis/,
      /sql.js/,
      /typeorm-aurora-data-api-driver/,
    ],
  }),
  new ForkTsCheckerWebpackPlugin(),
];
