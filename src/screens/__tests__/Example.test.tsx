/**
 * @format
 */

import 'react-native';
import React from 'react';
import ExampleScreen from '../ExampleScreen';
import {it} from '@jest/globals';
import {render} from '../../../utils/test-utils'

const navigation: any = {}

it('should render Example Screen', () => {
  render(<ExampleScreen {...navigation}/>);
});
