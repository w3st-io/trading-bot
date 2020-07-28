/**
 * %%%%%%%%%%%%%%%%%%%%%%%% *
 * %%% ECCENTRIC TRADER %%% *
 * %%%%%%%%%%%%%%%%%%%%%%%% *
*/
// [REQUIRE] //
require('dotenv').config()


// [REQUIRE] Personal //
const CBAuthClient = require('./CBAuthClient')
const CBPublicClient = require('./CBPublicClient')
const CBAlgo = require('./CBAlgo')
////////////////////////////////////////////////////////////


CBAlgo.getAverage()