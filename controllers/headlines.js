// Bring in our scrape and makeDate scripts
var scrape = require('../scripts/scrape');

var makeDate = require('../scripts/date');

var Headline = require('../models/Headlines');

module.exports = {
    fetch: function (cb) {
        var articles = data;
        for (var i = 0; i < articles.length; i++) {
            articles[i].date = makeDate();
            articles[i].saved = false;

        }
        Headline.collection.insertMany(articles, {ordered: false}, function (err, docs) {
            cb(err, docs);
        });
    },
    delete: function (query, cb)  {
        Headline.remove(query, cb);
    },
    get: function (err, doc) {
        Headline.find(query)
            .sort({
                _id: -1
            })
            .exec(function (err, doc) {
                cb(doc);
            });
    },
    udpate: function (query, cb) {
        Headline.update({_id: query._id}, {}, cb);
    }
}
