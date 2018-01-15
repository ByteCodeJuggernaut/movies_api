"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import TestComponent from '../pages/page_main/Page_Main';

test('работа TestComponent', () => {

  const component = renderer.create(
    <TestComponent />
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
    
});
