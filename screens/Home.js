import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {getHoldings, getCoinMarket} from '../stores/market/marketActions';
import {MainLayout} from './';
import {useFocusEffect} from '@react-navigation/native';
import {FONTS, COLORS, SIZES, dummyData, icons} from '../constants';
const Home = ({getHoldings, getCoinMarket, myHoldings, coins}) => {
  useFocusEffect(
    useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
      getCoinMarket();
    }, []),
  );
  return (
    <MainLayout>
      <View>
        <Text>Home screen</Text>
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
