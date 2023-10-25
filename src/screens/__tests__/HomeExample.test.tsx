import React from 'react';
import 'react-native';
import {it} from '@jest/globals';

import {render} from '@utils/test-utils';
import HomeExampleScreen from '@screens/HomeExampleScreen';

const navigation: any = {};

it('should render Home Example Screen', () => {
  render(<HomeExampleScreen {...navigation} />);
});
