import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Buttons';
import { LastConverted } from '../components/Texts';
import { Header } from '../components/Headers';
import { connectAlert } from '../components/Alert';

import { changeCurrencyAmount, swapCurrency, getInitialConversion } from '../actions/currencies';


class Home extends Component{
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    isFetching: PropTypes.bool,
    lastConvertedDate: PropTypes.object,
    primaryColor: PropTypes.string,
    alertWithType: PropTypes.func,
    currencyError: PropTypes.string,
  };

  componentWillMount(){
    this.props.dispatch(getInitialConversion());
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.currencyError && nextProps.currencyError !== this.props.currencyError){
      this.props.alertWithType('error', 'Error', nextProps.currencyError);
    }
  };


  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {title: 'Base Currency', type: 'base'});
  };

  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {title: 'Quote Currency', type: 'quote'});
  };

  handleSwapCurrency = () => {
    this.props.dispatch(swapCurrency());
  };

  handleOptionsPress = () => {
    this.props.navigation.navigate('Options');
  };

  handleTextChange = (amount) => {
    this.props.dispatch(changeCurrencyAmount(amount));
  };


  render(){
    let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);

    if(this.props.isFetching){
      quotePrice = '...';
    }


    return (
      <Container backgroundColor={this.props.primaryColor}>
        <StatusBar translucent={false} barStyle="light-content"/>
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView behavior="padding">
          <Logo tintColor={this.props.primaryColor}/>
          <InputWithButton buttonText={this.props.baseCurrency} onPress={this.handlePressBaseCurrency}
                          defaultValue={this.props.amount.toString()} keyboardType="numeric"
                          onChangeText={this.handleTextChange} textColor={this.props.primaryColor}/>
          <InputWithButton buttonText={this.props.quoteCurrency} onPress={this.handlePressQuoteCurrency} editable={false}
                          value={quotePrice} textColor={this.props.primaryColor}/>

          <LastConverted base={this.props.baseCurrency} quote={this.props.quoteCurrency} date={this.props.lastConvertedDate}
                         conversionRate={this.props.conversionRate} />
          <ClearButton text="Reverse Currencies" onPress={this.handleSwapCurrency}/>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {

  const baseCurrency = state.currencies.baseCurrency;
  const quoteCurrency = state.currencies.quoteCurrency;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};

  return {
    baseCurrency,
    quoteCurrency,
    amount: state.currencies.amount,
    conversionRate: rates[quoteCurrency] || 0,
    isFetching: conversionSelector.isFetching,
    lastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
    primaryColor: state.theme.primaryColor,
    currencyError: state.currencies.error,
  };
};

export default connect(mapStateToProps)(connectAlert(Home));
