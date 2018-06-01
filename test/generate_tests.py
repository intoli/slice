#! /usr/bin/env python

from __future__ import print_function
from copy import deepcopy
import argparse
import json
import random


def parse_args(args=None, namespace=None):
    formatter = argparse.ArgumentDefaultsHelpFormatter
    parser = argparse.ArgumentParser(formatter_class=formatter, description=(
        'Generate Python slicing test cases for the JavaScript `slice` package.'
    ))

    parser.add_argument('--empty-fraction', default=0.25, help=(
        'The maximum fraction of generated tests which can have empty outputs.'
    ))

    parser.add_argument('--error-fraction', default=0.1, help=(
        'The maximum fraction of generated tests which can include errors.'
    ))

    parser.add_argument('-m', '--max-length', default=100, help=(
        'The maximum length of the initial generated list.'
    ))

    parser.add_argument('-n', '--number', default=10000, help=(
        'The number of test cases to generate.'
    ))

    parser.add_argument('-s', '--seed', default=1, help=(
        'The seed for the random number generator.'
    ))

    return vars(parser.parse_args(args, namespace))


def main(args=None, namespace=None):
    args = parse_args(args, namespace)

    random.seed(args['seed'])
    empty_fraction = args['empty_fraction']
    error_fraction = args['error_fraction']
    max_length = args['max_length']
    empty_total = 0
    error_total = 0
    total = 0
    while total < args['number']:
        # Create an initial shuffled list.
        initial = list(range(random.randint(0, max_length)))
        random.shuffle(initial)

        # Create a random slice.
        slice_string = ''
        for i in range(3):
            if random.random() < 1.0 / 3.0:
                if len(slice_string) > 0:
                    slice_string += ':'
                slice_string += str(random.randint(-max_length * 2, max_length * 2))

        error = None
        extracted = None
        try:
            extracted = eval('initial[' + slice_string + ']')
        except Exception as e:
            error = str(e)

        insert = None
        final = None
        if type(extracted) is list:
            insert_length = len(extracted)
            if random.random() < error_fraction:
                insert_length = random.randint(0, max_length * 2)
            insert = list(range(max_length, max_length + insert_length))
            random.shuffle(insert)
            final = deepcopy(initial)
            try:
                exec('final[' + slice_string + '] = insert')
            except Exception as e:
                error = str(e)

        extracted_is_empty = type(extracted) is list and len(extracted) == 0
        if total > 0:
            # Prevent the errors from dominating.
            if error and error_total / total > error_fraction:
                continue

            # Prevent empty slices from dominating.
            if extracted_is_empty and empty_total / total > empty_fraction:
                continue

        empty_total += 1 if extracted_is_empty else 0
        error_total += 1 if error else 0
        total += 1

        print(json.dumps({
            'error': error,
            'extracted': extracted,
            'final': final,
            'index': total,
            'initial': initial,
            'insert': insert,
            'slice': slice_string,
        }))


if __name__ == '__main__':
    main()
