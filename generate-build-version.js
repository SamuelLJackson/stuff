var fs = require('fs');
var packageJson = require('./package.json');

var appVersion = packageJson.version;

var jsonData = {
    version: appVersion,
};

var jsonContent = JSON.stringify(jsonData);

fs.writeFile('./public/meta.json', jsonContent, 'utf8', function(err) {
    if(err) {
        console.log('an error occurred while writing JSON object to meta.json');
        return console.log(err);
    }

    console.log('meta.json file has been saved with latest version number')
});
