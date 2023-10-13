# Just-a-Regular-Flower-Shop
``` js
lolcats.print() // to use colorfultext for special occassion flowers
```
``` js
chalkAnimation.rainbow('Lorem ipsum dolor sit amet'); // to use colorfultext for special occassion flowers
```

``` js
// You can stop and resume an animation with stop() and start().
// When created, the instance of chalkAnimation starts automatically.
let str = 'Loading...';
const rainbow = chalkAnimation.rainbow(str);

// Add a new dot every second
setInterval(() => {
	rainbow.replace(str += '.');
}, 1000);
```