/**
 * @format
 */

import 'react-native';
import React from 'react';
import HomeExampleScreen from '../HomeExampleScreen';
import {it} from '@jest/globals';
import {render} from '../../../utils/test-utils'

const navigation: any = {}

it('should render Home Example Screen', () => {
  render(<HomeExampleScreen {...navigation}/>);
});
