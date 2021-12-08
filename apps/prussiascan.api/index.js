var express = require('express');
var bodyParser = require('body-parser');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/a', function (req, res, next) {
    var image = req.body;

    console.log('IMAGE:');
    console.log(image);
    next();
});

var app = express();

app.use(
    bodyParser.raw({
        type: '*/*',
        limit: '10mb',
    }),
);

app.use('/', router);

app.listen(3000);
