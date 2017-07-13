var _ = require('ramda');


/////// Simple functions
var nums = [1, 2, 3, 4, 5, 6];

var double = _.multiply(2);
var doubleMapper = _.map(double);

console.log(
    doubleMapper(nums)
);

/////// Zipper
var valueObj = [
    { value: 0 },
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
];

console.log(
    valueObj
        .map(_.prop('value'))
        .map(_.multiply(2))
);

console.log(
    _.zipObj(
        valueObj.map(_.prop('value')),
        valueObj
    )
);

////// Execute Once

var addAllNumbersFn = _.once(() => {
    var result = 0;

    for(var i = 0; i < 100000000; ++i){
        result += i;
    }
    
    return result;
});

function calculateTime(){
    var startTime = new Date();

    return () => (new Date() - startTime) / 1000; 
}

var timer;

// First attempt
timer = calculateTime();
console.log(addAllNumbersFn());
console.log(`#1 Function took: ${ timer() } seconds`);

// Second attempt
timer = calculateTime();
console.log(addAllNumbersFn());
console.log(`#2 Function took: ${ timer() } seconds`);


/////// Zip With
var valueObj = [
    { value: 0, key: 0 },
    { value: 1, key: 1 },
    { value: 2, key: 2},
    { value: 3, key: 3 },
    { value: 4, key: 4 },
    { value: 5, key: 5 },
    { value: 6, key: 6 },
];

console.log(
    _.zipWith(
        (x, y) => x.value + y.key,
        valueObj,
        valueObj
    )
);

/////// Chain

var manipNumbers = _.pipe(
    _.add(1),
    _.multiply(2)
);

console.log(
    manipNumbers(1)
);


///// Wrapping

console.log(
    [1, 2, 3, 4, 5]
        .map(_.add(1))
        .map(_.multiply(10))
        .reduce((acc, cur) => acc += cur, 0)
);


// Compose

var fns = [
    _.add(1), 
    _.multiply(10),
    _.add(13)
];

var add1Multiply10add13 = _.pipe(...fns);
var add13Multiply10add1 = _.compose(...fns);

console.log(`add1Multiply10add13 on 5, ${ add1Multiply10add13(5) }`);
console.log(`add13Multiply10add1 on 5, ${ add13Multiply10add1(5) }`);

// Mapping

var articles = [
    { 
        name: 'Everything Sucks!',
        url: 'everything-sucks',
        authors: [
            { name: 'James P' },
            { name: 'Bob P' }
        ]
    },
    { 
        name: 'The World is Amazing!',
        url: 'amazing-world-sucks',
        authors: [
            { name: 'Dale Salter' },
            { name: 'Steve S' }
        ]
    }
];

var fns = [
    _.pluck('authors'),
    _.flatten,
    _.pluck('name')
];

console.log(_.pipe(...fns)(articles))