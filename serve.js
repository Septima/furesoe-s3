require("@babel/register")
require = require("esm")(module) // eslint-disable-line
let {default: me} = require(__dirname)

const server = require("@septima/septima-search-server/src/s3/server.js")
server.run({configfolder: __dirname + '/config', rootClassRegistry: me})