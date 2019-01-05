import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { PickerCascader } from './picker-cascader/picker-cascader.js';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    let d = this.generateData();
    this.state = { language: '', data: d };

  }

  generateData() {
    let data = [];
    let item = { key: '', text: '', children: [] };
    let index = 1;
    for (index = 1; index <= 1000; index++) {
      let n = 1;
      item.key = n;
      item.text = 'name' + n;
      item.children = undefined;
      data.push(item);
      n = n + 1;
    }
    return data;
  }

  generateChildData() {

  }

  valueChanged(item) {
    console.log('outsite');
    console.log(item);
    this.setState({ item: item });
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
        <PickerCascader style={{padding:10}} data={[
          { key: '1', text: 'Devin', children: [{ key: '11', text: 'Tom' }] },
          {
            key: '2', text: 'David',
            children: [
              { key: '22', text: 'Kim' },
              {
                key: '21', text: 'Tim',
                children: [{ key: '211', text: 'John' }],
                children: [{ key: '2111', text: 'Jillian',
                children: [{ key: '210', text: 'John', children: [{ key: '212', text: 'Rest',
                children: [{ key: '212', text: 'Test' }] 
              
              }] }],               
              }]
              }
            ]
          },
          { key: '3', text: 'James' },
          { key: '4', text: 'Joel' },
          { key: '5', text: 'Jimmy' },
          { key: '6', text: 'Julie' },
          { key: '7', text: 'Latin' },
          { key: '8', text: 'Uru' },
          { key: '9', text: 'No' },
          { key: '10', text: 'Liz' },
          { key: '11', text: 'James' },
          { key: '12', text: 'Joel' },
          { key: '13', text: 'Jimmy' },
          { key: '14', text: 'Julie' },
          { key: '15', text: 'No' },
          { key: '16', text: 'Liz' },
          { key: '17', text: 'James' },
          { key: '18', text: 'Joel' },
          { key: '19', text: 'Jimmy' },
          { key: '20', text: 'Julie' }
        ]}
          onValueChange={(item) => this.valueChanged(item)}>
          >
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

// {[
//   { key: '1', text: 'Devin', children: [{ key: '11', text: 'Tom' }] },
//   {
//     key: '2', text: 'David',
//     children: [
//       {key: '22', text: 'Kim'},
//       {key: '21', text: 'Tim',
//       children: [{ key: '211', text: 'John' }], children: [{ key: '2111', text: 'Jillian' }] }
//     ]
//   },
//   { key: '3', text: 'James' },
//   { key: '4', text: 'Joel' },
//   { key: '5', text: 'Jimmy' },
//   { key: '6', text: 'Julie' }
// ]} 