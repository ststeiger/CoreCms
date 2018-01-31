
var axios = require('axios');

module.exports = function (callback, host, page)
{
    

    //callback(null, '{ "abc":"def", "ghi":123}'); // error - object returned is not a json-object
    // callback(null, { "abc": "def", "ghi": 1234 });

    
    var commentsUrl = root + '/posts/' + page.toString();
    commentsUrl = "http://localhost:58343/require.htm";
    commentsUrl = "http://localhost:51003/require.htm";
    commentsUrl = host + "/require.htm";
    console.log("Calling Url :" + commentsUrl);
    axios.get(commentsUrl)
        .then(function (response)
        {
            // callback(null, response.data);
            callback(null, { "abc": "def", "ghi": 12345 });
        }).catch(function (err)
        {
            callback(err, null);
        });
    
};
