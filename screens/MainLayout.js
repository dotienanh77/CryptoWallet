/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {COLORS, SIZES, FONTS, icons} from '../constants';

const MainLayout = ({children}) => {
  return <View style={{flex: 1}}>{children}</View>;
};
export default MainLayout;
