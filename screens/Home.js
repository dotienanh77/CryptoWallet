/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {getHoldings, getCoinMarket} from '../stores/market/marketActions';
import {MainLayout} from './';
import {useFocusEffect} from '@react-navigation/native';
import {FONTS, COLORS, SIZES, dummyData, icons} from '../constants';
import {BalanceInfo} from '../components';
const Home = ({getHoldings, getCoinMarket, myHoldings, coins}) => {
  useFocusEffect(
    useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
      getCoinMarket();
    }, []),
  );

  function renderWalletInforSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        {/* Balance info */}
        <BalanceInfo
          title="Your Wallet"
          displayAmount="45,000"
          changePct={2.3}
          containerStyle={{marginTop: 50}}
        />
        {/* Button */}
      </View>
    );
  }

  return (
    <MainLayout>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {/* Header Section - Wallet Information */}
        {renderWalletInforSection()}
        {/* Chart  */}
        {/* Top Cryptocurrency  */}
      </View>
    </MainLayout>
  );
};
// export default Home;

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins,
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
    ////////////////////////////////////////////////////////////////
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getCoinMarket(
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
