import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StatusBar, Platform, Linking } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import { ListItem, Separator } from '../components/Lists';
import { connectAlert } from '../components/Alert';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR = '#868686';
const ICON_SIZE = 23;

class Options extends Component{

  static propTypes = {
    navigation: PropTypes.object,
    alertWithType: PropTypes.func,
  }

  handleThemesPress = () => {
    this.props.navigation.navigate('Themes');
  }

  handleSitePress = () => {
    Linking.openURL('http://fixer.io').catch(() => this.props.alertWithType('error', 'Sorry!', 'Fixer.io not working'));
  }

  render(){
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem text="Themes" onPress={this.handleThemesPress} customIcon={<Ionicons name={`${ICON_PREFIX}-arrow-forward`}
                  size={ICON_SIZE} color={ICON_COLOR} />} />
        <Separator />
        <ListItem text="Fixer.io" onPress={this.handleSitePress} customIcon={<Ionicons name={`${ICON_PREFIX}-link`}
                  size={ICON_SIZE} color={ICON_COLOR} />} />
        <Separator />
      </ScrollView>
    );
  }
}

export default connectAlert(Options);
