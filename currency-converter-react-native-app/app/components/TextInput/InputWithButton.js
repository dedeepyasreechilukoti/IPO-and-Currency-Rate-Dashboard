import PropTypes from 'prop-types';
import React from 'react';
import { View, TextInput, TouchableHighlight, Text } from 'react-native';
import color from 'color';

import styles from './styles';

const InputWithButton = (props) => {
    const { onPress, buttonText, editable = true } = props;

    const underlayColor = color(styles.$buttonBackgroundColorBase).darken(styles.$buttonBackgroundColorModifier);

    const containerStyles = [styles.container];
    if(editable === false){
      containerStyles.push(styles.containerDisabled);
    }

    const buttonTextStyles = [styles.buttonText];
    if (props.textColor) {
      buttonTextStyles.push({ color: props.textColor });
    }

    return(
      <View style={styles.container}>
        <TouchableHighlight underlayColor={underlayColor} style={styles.buttonContainer} onPress={onPress}>
          <Text style={buttonTextStyles}>{buttonText}</Text>
        </TouchableHighlight>
        <View style={styles.border}></View>
        <TextInput style={styles.input} underlineColorAndroitd="transparent" {...props} />
      </View>
    );
}

InputWithButton.PropTypes = {
  onPress: PropTypes.func,
  buttonText: PropTypes.string,
  editable: PropTypes.bool,
  textColor: PropTypes.string,
}

export default InputWithButton;
