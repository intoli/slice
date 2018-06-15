<h1 vertical-align="middle">
    <img height="100px" src="media/logo.svg" alt="Slice">
</h1>

<p align="left">
    <a href="https://circleci.com/gh/intoli/slice/tree/master">
        <img src="https://img.shields.io/circleci/project/github/intoli/slice/master.svg"
            alt="Build Status"></a>
    <a href="https://github.com/intoli/slice/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/License-BSD%202--Clause-blue.svg"
            alt="License"></a>
    <a href="https://www.npmjs.com/package/slice">
        <img src="https://img.shields.io/npm/v/slice.svg"
            alt="NPM Version"></a>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <a target="_blank" href="https://twitter.com/home?status=Slice%20%E2%80%94%20A%20Javascript%20implementation%20of%20Python's%20awesome%20negative%20indexing%20and%20extended%20slice%20syntax%20%40IntoliNow%20%23Intoli%0A%0Ahttps%3A//github.com/intoli/slice">
        <img height="26px" src="https://simplesharebuttons.com/images/somacro/twitter.png"
            alt="Tweet"></a>
    <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A//github.com/intoli/slice">
        <img height="26px" src="https://simplesharebuttons.com/images/somacro/facebook.png"
            alt="Share on Facebook"></a>
    <a target="_blank" href="http://reddit.com/submit?url=https%3A%2F%2Fgithub.com%2Fintoli%2Fslice&title=Slice%20%E2%80%94%20A%20Javascript%20implementation%20of%20Python's%20awesome%20negative%20indexing%20and%20extended%20slice%20syntax">
        <img height="26px" src="https://simplesharebuttons.com/images/somacro/reddit.png"
            alt="Share on Reddit"></a>
    <a target="_blank" href="https://news.ycombinator.com/submitlink?u=https://github.com/intoli/slice&t=Slice%20%E2%80%94%20Python's%20negative%20indexing%20and%20extended%20slice%20syntax%20for%20JavaScript">
        <img height="26px" src="media/ycombinator.png"
            alt="Share on Hacker News"></a>
</p>


###### [For Python Programmers](#for-people-who-know-python-already) | [Installation](#installation) | [API](#api) | [Contributing](#contributing)

> Slice is a JavaScript implementation of Python's awesome negative indexing and [extended slice](https://docs.python.org/2.3/whatsnew/section-slices.html) syntax for arrays and strings.
> It uses ES6 proxies to allow for an intuitive double-bracket indexing syntax which closely replicates how slices are constructed in Python.
> Oh, and it comes with an implementation of Python's [range](https://docs.python.org/3/library/stdtypes.html#typesseq-range) method too!


If you know Python, then you're probably well aware of how pleasant Python's indexing and slice syntax make working with lists and strings (*and you can skip ahead to [For People Who Know Python Already](#for-people-who-know-python-already) if you want*).
If not—well, you're in for a treat!
Slice adds `SliceArray` and `SliceString` classes which extend the corresponding builtin types to provide a unified and concise syntax for indexing and slicing in JavaScript.

For starters, negative indices can be used to count backwards from the end of an array or string.

```javascript
const array = SliceArray(1, 2, 3, 4);
// Outputs: 4
array[-1]

const string = SliceString('Hello World!');
// Outputs: 'd'
string[-2]
```

That's a convenient alternative to needing to write things like `array[array.length - n]`, but it's really just the beginning of what Slice has to offer.
Slice also introduces a double bracket indexing syntax which allows you to specify subranges of iterables by writing `array[[start,stop]]`.

```javascript
const array = SliceArray(1, 2, 3, 4);
// Outputs: [2, 3]
array[[1,-1]]
```

This is functionally identical to the builtin [Array.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) method, but it also works for strings *and* it supports assignment using the same interface.

```javascript
const array = SliceArray(1, 2, 3, 4);
array[[1,-1]] = ['two', 'three', 'three and a half'];
// Outputs: [1, 'two', 'three', 'three and half', 4]
array
```

It's also possible to leave off either the `start` or `stop` parameter to have the range automatically extend to the beginning or end of the iterable.

```javascript
const array = SliceArray(1, 2, 3, 4);
// Outputs: [2, 3, 4]
array[[1,]]
// Outputs: [1, 2, 3]
array[[,-1]]

const string = SliceString('Hello World!');
// Outputs: 'World!'
string[[6,]]
```

You can also add a third `step` parameter to your slices using the `array[[start,stop,step]]` syntax.
That's when things get really interesting.
The `step` parameter allows you to easily extract every Nth element from an iterable while optionally specifying a subrange at the same time.

```javascript
const array = SliceArray(1, 2, 3, 4);

// Outputs: [1, 3]
array[[,,2]]

// Outputs: [2, 4]
array[[1,,2]]
```

And, of course, extended slices also support assignment!

```javascript
const array = SliceArray(1, 2, 3, 4);

array[[,,2]] = ['odd', 'odd'];
// Outputs: ['odd', 2, 'odd', 4]
array

[array[[,,2]], array[[1,,2]]] = [array[[1,,2]], array[[,,2]]];
// Outputs: [2, 'odd', 4, 'odd']
array
```

You can even use negative values for the `step` parameter to iterate backwards through an array or string.

```javascript
const array = SliceArray(1, 2, 3, 4);

// Outputs: [4, 3, 2, 1]
array[[,,-1]]

// Outputs: [4, 2]
array[[,,-2]]
```

Let's put this together into one last example that's a little more fun.
We'll use Slice's extended slice syntax and it's `range()` function to solve [Fizz Buzz](http://wiki.c2.com/?FizzBuzzTest) without any explicit loops or recursion.

```javascript
import { range, SliceArray } from 'slice';


// Populate a list from 1 through 100.
const outputs = range(1, 100 + 1);

// Replace every 3rd element with 'Fizz'.
outputs[[3 - 1,,3]] =
  Array(Math.floor(100 / 3))
    .fill('Fizz');

// Replace every 5th element with 'Buzz'.
outputs[[5 - 1,,5]] =
  Array(Math.floor(100 / 5))
    .fill('Buzz');

// Replace every (3 * 5)th element with 'Fizz Buzz'.
outputs[[3 * 5 - 1,,3 * 5]] =
  Array(Math.floor(100 / (3 * 5)))
    .fill('Fizz Buzz');

// Tada!
console.log(outputs);
```

If you're ready to give it a try, then head over to the [installation section](#installation) or take a look at the [API documentation](#api).
You also might find the [For People Who Know Python Already](#for-people-who-know-python-already) section interesting, even if you've never used Python before.
It provides some context for why this library exists and works the way that it does.


## For People Who Know Python Already

If you know Python already, then you'll be right at home with Slice.
The methods and syntax that it introduces are designed to *very* closely mirror those from Python.
Python includes two built-in functions that Slice provides analogues of: [range()](https://docs.python.org/3/library/functions.html#func-range) and [slice()](https://docs.python.org/3/library/functions.html#slice).
The method signatures of these methods are identical to those used in Python, and the behavior and usage of them is very similar.

One major difference is that `range()` produces an iterator in Python while it produces a fully populated `SliceArray` in JavaScript, similar to how `range()` worked in Python 2.
This choice was made because Python has built-in support for its slice syntax, but JavaScript requires subclassing [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) and [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) in order to add support for a similar syntax.
The `range()` method returns a `SliceArray` so that the return value immediately supports slicing for convenience.

For example, you could run the following without needing to explicitly construct a `SliceArray`.

```javascript
import { range, slice } from 'slice';

// Outputs: [10, 11, 12, 13, 14]
range(100)[slice(10, 15)]
```

Aside from the imports, the actual usage of `range()` and `slice()` here is also valid Python and would produce the same result.
Even if you use Python quite a bit, however, there's a good chance that you might not that familiar with the explicit usage of `slice()` like this.
That's because it's way more common to use Python's slice syntax rather than manually instantiating the `slice` class.

```python
# These are both equivalent in Python.
range(100)[slice(10, 15)]
range(100)[10:15]
```

It's not possible to replicate that exact syntax in JavaScript, but Slice uses a very similar syntax that should be immediately familiar to you if you know Python.
All you need to do is to use double brackets for the indexing and to replace the colons with commas.
The slicing will work exactly as you would expect in Python after that.
It supports negative indexing, empty parameters, extended slices, negative steps, assignment to slices, and the whole shebang.
In fact, part of the test suite actually [runs a Python script](test/generate_tests.py) to perform thousands of slicing operations to verify that the JavaScript results are identical!

Here are a few examples of how the syntax compares between Python and Slice in JavaScript.

| Input             | Python Code      | JavaScript Code    | Output            |
|-------------------|------------------|--------------------|-------------------|
| `[0, 1, 2, 3, 4]` | `array[-2]`      | `array[[-2]]`      | `3`               |
| `[0, 1, 2, 3, 4]` | `array[:2]`      | `array[[,2]]`      | `[0, 1]`          |
| `[0, 1, 2, 3, 4]` | `array[1::2]`    | `array[[1,,2]]`    | `[1, 3]`          |
| `[0, 1, 2, 3, 4]` | `array[::-1]`    | `array[[,,-1]]`    | `[4, 3, 2, 1, 0]` |
| `'hello world'`   | `string[::-1]`   | `string[[,,-1]]`   | `'dlrow olleh'`   |
| `'hello world'`   | `string[1:-1]`   | `string[[1,-1]]`   | `'ello worl'`     |
| `'hello world'`   | `string[1:-1:2]` | `string[[1,-1,2]]` | `'el o l'`        |
| `'hello world'`   | `string[:-5]`    | `string[[,-5]]`    | `'world'`         |

Once you get used to how the Python syntax maps to the double bracket syntax, it becomes quite easy to switch seamlessly between the two.

We've looked already at how `range()` can be used to constuct slice-able arrays; the one other thing you need to know is how to construct `SliceArray` and `SliceString` instances manually.
These classes have identical interfaces into JavaScript's built-in [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) and [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) objects.
They can be constructed in exactly the same ways and are essentially drop-in replacements for `Array` and `String`.

```javascript
import { range, SliceArray, SliceString } from 'slice';

// All of the following are equivalent.
range(5);
SliceArray(0, 1, 2, 3, 4);
new SliceArray(0, 1, 2, 3, 4);
SliceArray.from([0, 1, 2, 3, 4]);

// The following are also equivalent.
SliceString('hello world');
new SliceString('hello world');
```

They also support all of the same methods once constructed, but will return slice-able arrays and strings whenever possible.
For example, you can do things like this without needing to worry about converting the method outputs to slice-able objects.

```javascript
const helloWorld = SliceString('hello world');
// Outputs: 'DLROW OLLEH'
helloWorld.toUpperCase()[[,,-1]];

// Outputs: [1, 4, 6]
range(5).map(i => i * 2)[[1,-1]];
```

That's basically all there is to it!
If you're ready for a little more Python in your JavaScript, then hop on over to the [installation section](#installation) to get started.


## Installation

The Slice package is available on npm with the package name [slice](https://npmjs.com/package/slice).
You can install it using your favorite JavaScript package manager in the usual way.

```bash
# With npm: npm install slice
# With pnpm: pnpm install slice
# With yarn:
yarn add slice
```


## API

Each of these methods and classes exist as named exports in the `slice` package.
They can be imported using either [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

```javascript
import { range, slice, SliceArray, SliceString } from 'slice';
```

or [require()](https://nodejs.org/api/modules.html#modules_require).

```javascript
const { range, slice, SliceArray, SliceString } = require('slice');
```


### range(stop), range(start, stop, [step])

Constructs a `SliceArray` object consisting of a sequence of integers.
The method signature and behavior are very similar to those of Python's `range()` method, and [their documentation about the method](https://docs.python.org/3/library/stdtypes.html#typesseq-range) largely applies here.
The value of `range(start, stop, step)[i]` will be equal to `start + (step * i)` and the `stop` parameter determines the stopping condition depending on the sign of `step`.
- `start` <number> The value of the first element in the range, or `0` if not specified.
- `stop` <number> The number that, once reached, will terminate the range.
    This value will *not* be included in the range.
- `step` <number> The difference between adjacent numbers in the range, or `1` if not specified.
    Negative values for `step` mean that the values in the range are sequentially decreasing.
- returns: <`SliceArray`>


### slice(stop), slice(start, stop, [step])

Constructs a `Slice` object which can be passed as an index to either a `SliceArray` or `SliceString` instance to specify a series of elements.
There's generally no need to manually construct `Slice` objects, and the double bracket `[[start,stop,step]]` indexing syntax should be preferred.
The method signature and behavior are identical to those of Python's [slice()](https://docs.python.org/3/library/functions.html#slice) method.

- `start` <number> The index of the first element, or the index of the first/last element for positive/negative values of `step` if not specified.
- `stop` <number> The index that, once reached, will terminate the slice.
    If not specified, then the slice will continue until an edge of the iterable has been reached.
- `step` <number> The gap between adjacent indices in the slice, or `1` if not specified.
    Negative values for `step` mean that the indices in the range are sequentially decreasing.
- returns: <`Slice`>

### SliceArray(arrayLength) / SliceArray(element0, element1[, ...[, elementN]])

Constructs a `SliceArray` object which adds support for negative indexing and slicing to the built-in [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) object.
The API for `SliceArray` is identical to that of `Array`, and it can be used as a drop-in replacement.
Any methods that would normally return an `Array` will return a `SliceArray` instead.


### String(thing)

Constructs a `SliceString` object which adds support for negative indexing and slicing to the built-in [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) object.
The API for `SliceString` is identical to that of `String`, and it can be used as a drop-in replacement.
Any methods that would normally return an `String` will return a `SliceString` instead.


## Development

To get started on development, you simply need to clone the repository and install the project dependencies.

```bash
# Clone the repository.
git clone https://github.com/intoli/slice.git
cd slice

# Install the dependencies.
yarn install

# Build the project.
yarn build

# Run the tests.
yarn test
```

There is also a separate test suite which generates many thousands of slice operations on the fly in Python.
These generated operations are then applied in JavaScript to confirm that everything works as expected.
The auto-generated tests can be run with the `yarn test:generated` command.


## Contributing

Contributions are welcome, but please follow these contributor guidelines outlined in [CONTRIBUTING.md](CONTRIBUTING.md).


## License

Slice is licensed under a [BSD 2-Clause License](LICENSE) and is copyright [Intoli, LLC](https://intoli.com).
