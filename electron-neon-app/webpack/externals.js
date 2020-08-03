function getExternalsFn(alias = {}) {
  return function (context, request, callback) {
    const isAliased = Object.keys(alias).includes(request.split('/')[0]);
    const isSrc = /^[./|C:\\]/.test(request);
    const isLoader = /^!/.test(request);
    const isCss = /\.css/.test(request);
    const isWebsocket = request === 'sockjs-client'; // if this one isn't bundled, hot reload breaks
    const isBundled = isLoader || isSrc || isCss || isAliased || isWebsocket;

    if (isBundled) {
      // these files are transpiled and bundled.
      callback(null, undefined);
    } else if (request === 'electron') {
      // Electron is a special case:
      //  it resolves to different things depending on the process requiring it
      //  so we leave it as a normal require('electron')
      callback(null, `commonjs ${request}`);
    } else {
      // All other libraries, we resolve them to their absolute paths
      const resolved = require.resolve(request, { paths: [context] });
      callback(null, `commonjs ${resolved}`);
    }
  };
}

module.exports = { getExternalsFn };
