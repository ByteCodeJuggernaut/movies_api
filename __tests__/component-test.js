"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import * as types from '../actions/const'
import * as reducer from '../reducers/index'

import ElementHeaderSlide from '../components/complex/Element_HeaderSlide';

describe('todos reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual([
            {
                text: 'Use Redux',
                completed: false,
                id: 0
            }
        ])
    })

    it('should handle ADD_TODO', () => {
        expect(
            reducer([], {
                type: reducer.ADD_MOVIE_LATER,
                text: 'Run the tests'
            })
        ).toEqual([
            {
                text: 'Run the tests',
                completed: false,
                id: 0
            }
        ])

        expect(
            reducer(
                [
                    {
                        text: 'Use Redux',
                        completed: false,
                        id: 0
                    }
                ],
                {
                    type: reducer.ADD_MOVIE_LATER,
                    text: 'Run the tests'
                }
            )
        ).toEqual([
            {
                text: 'Run the tests',
                completed: false,
                id: 1
            },
            {
                text: 'Use Redux',
                completed: false,
                id: 0
            }
        ])
    })
})