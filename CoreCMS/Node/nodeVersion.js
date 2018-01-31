
var pjson = require('../package.json');

module.exports = function (callback, host, page)
{

    var  version = process.version // v8.6.0
        ,packageVersion = pjson.version // 1.0.0
        ,versions = process.versions
        ,exec = require('child_process').exec
        ,npmVersion;

    exec('npm -v',
        function (error, stdout, stderr)
        {
            npmVersion = stdout;
            npmVersion = npmVersion.replace("\r", "").replace("\n", "");

            versions["npm_version"] = npmVersion;
            versions["package_version"] = packageVersion;
            
            versions = JSON.stringify(versions, null, 2);
            callback(null, versions);
        });

    // versions.package_version = packageVersion;
    // versions = JSON.stringify(versions, null, 2);
    // callback(null, versions);
    // callback(err, null);
};
