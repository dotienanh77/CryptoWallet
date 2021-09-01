/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {MainLayout} from './';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getHoldings} from '../stores/market/marketActions';

import {BalanceInfo, Chart} from '../components';
import {SIZES, COLORS, FONTS, dummyData, icons} from '../constants';

const Porfolio = ({getHoldings, myHoldings}) => {
  useFocusEffect(
    useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
    }, []),
  );
  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0,
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;

  function renderCurrentBalanceSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        <Text style={{marginTop: 50, color: COLORS.white, ...FONTS.largeTitle}}>
          Portfolio
        </Text>
        {/* Balance info */}
        <BalanceInfo
          title="Current Balance"
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{
            marginTop: SIZES.radius,
            marginBottom: SIZES.padding,
          }}
        />
        {/* Button */}
        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}>
          <IconTextButton
            label="Transfer"
            icon={icons.send}
            containerStyle={{flex: 1, height: 40, marginRight: SIZES.radius}}
            onPress={() => console.log('Transfer')}
          />
          <IconTextButton
            label="Withdraw"
            icon={icons.withdraw}
            containerStyle={{flex: 1, height: 40}}
            onPress={() => console.log('Withdraw')}
          />
        </View> */}
      </View>
    );
  }
  return (
    <MainLayout>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {/* Header - current Balance */}
        {renderCurrentBalanceSection()}
        {/* Chart */}

        {/* Your Assets */}
      </View>
    </MainLayout>
  );
};
// export default Porfolio;

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page,
        ),
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Porfolio);
