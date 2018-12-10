import React from 'react';
import { StyleSheet, Text, View,Picker } from 'react-native';
import { PickerCascader } from './picker-cascader/picker-cascader.js';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state={ language: '' };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app3!</Text>
        <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <PickerCascader>
          </PickerCascader>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
