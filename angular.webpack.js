/**
 * Custom angular webpack configuration
 */

module.exports = (config, options) => {
    config.target = 'electron-renderer';
    if (options.customWebpackConfig.target) {
        config.target = options.customWebpackConfig.target;
    } else if (options.fileReplacements) {
        for(let fileReplacement of options.fileReplacements) {
            if (fileReplacement.replace !== 'src/environments/environment.ts') {
                continue;
            }

            let fileReplacementParts = fileReplacement['with'].split('.');
            if (['dev', 'prod', 'test', 'electron-renderer'].indexOf(fileReplacementParts[1]) < 0) {
                config.target = fileReplacementParts[1];
            }
            break;
        }
    }

  config.externals = {
    ...config.externals,
    "fs": 'require("fs")',
    "os": 'require("os")',
    "path": 'require("path")',
    "stream": 'require("stream")',
    "constants": 'require("constants")',
    "tslib": 'require("tslib")'
  };

    return config;
}
