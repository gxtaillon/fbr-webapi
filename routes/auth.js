var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

router.get('/es', function(q, s, n) {
  console.warn(q.query.q);
  client.search({
    body: {
      query: {
        match: q.query
      }
    }
  }).then(function (body) {
    var hits = body.hits.hits;
    s.json(hits);
  }, function (error) {
    console.trace(error.message);
    s.json(error);
  })
})


module.exports = router;