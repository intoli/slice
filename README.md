<h1 vertical-align="middle">Slice
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
</p>


###### [Installation](#installation) | [Contributing](#contributing) | [License](#license)

> Slice is a JavaScript implementation of Python's awesome negative indexing and [extended slice](https://docs.python.org/2.3/whatsnew/section-slices.html) syntax for arrays and strings.
> It uses ES6 proxies to allow for an intuitive double-bracket indexing syntax which closely replicates Python's own syntax.
> Oh, and it comes with an implementation of Python's [range](https://docs.python.org/3/library/stdtypes.html#typesseq-range) method too!


If you know Python, then you're probably well aware of how pleasant Python's indexing and slice syntax make working with lists and strings.
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
It allows you to easily extract every Nth element from an iterable while optionally specifying a subrange at the same time.

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


## Installation

The Slice package is available on npm with the package name [slice](https://npmjs.com/package/slice).
You can install it using your favorite JavaScript package manager in the usual way.

```bash
# With npm: npm install slice
# With pnpm: pnpm install slice
# With yarn:
yarn add slice
```


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

Contributions are welcome, but please follow these contributor guidelines:

- Create an issue on [the issue tracker](https://github.com/intoli/slice/issues/new) to discuss potential changes before submitting a pull request.
- Include at least one test to cover any new functionality or bug fixes.
- Make sure that all of your tests are passing and that there are no merge conflicts.
- You agree to assign the copyright for any contributions to Intoli, LLC.


## License

Slice is licensed under a [BSD 2-Clause License](LICENSE) and is copyright [Intoli, LLC](https://intoli.com).
