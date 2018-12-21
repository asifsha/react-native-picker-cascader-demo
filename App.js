import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { PickerCascader } from './picker-cascader/picker-cascader.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { language: '' };
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
        <PickerCascader data={[
          { key: '1', text: 'Devin', children: [{ key: '11', text: 'Tom' }] },
          {
            key: '2', text: 'David',
            children: [
              {key: '22', text: 'Tim'},
              {key: '21', text: 'Tim',
              children: [{ key: '211', text: 'John' }], children: [{ key: '2111', text: 'Jillian' }] }
            ]
          },
          { key: '3', text: 'James' },
          { key: '4', text: 'Joel' },
          { key: '5', text: 'Jimmy' },
          { key: '6', text: 'Julie' }
        ]} >
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
