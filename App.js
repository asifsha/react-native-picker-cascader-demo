import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
//import { PickerCascader } from './picker-cascader/picker-cascader.js';
import PickerCascader from 'react-native-picker-cascader';
//import PickerCascader  from './picker-cascader';


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
        {/* <Text>Open up App.js to start working on your app3!</Text>
        <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker> */}
        <PickerCascader style={{ padding: 10 }} data={[
          {
            key: '1', text: 'Australia', children: [{
              key: '2', text: 'New South Wales',
              children: [{ key: '3', text: 'Sydney' }, { key: '4', text: 'Wollongong' }]
            },
            {
              key: '5', text: 'Victoria',
              children: [{ key: '6', text: 'Melbourne' }, { key: '7', text: 'Geelong' }]
            }
            ]
          },
          {
            key: '10', text: 'Canada',
            children: [
              {
                key: '11', text: 'Alberta', children: [{ key: '12', text: 'Calgary' },
                { key: '13', text: 'Brooks' }]
              },
              {
                key: '14', text: 'British Columbia', children: [{ key: '15', text: 'Vancouver' },
                { key: '16', text: 'Vernon' }]
              }

            ]
          },
          {
            key: '20', text: 'United States',
            children: [
              {
                key: '21', text: 'New York', children: [{ key: '22', text: 'Albany' },
                { key: '23', text: 'Norwich' }]
              },
              {
                key: '24', text: 'Pennsylvania', children: [{ key: '25', text: 'Farrell' },
                { key: '26', text: 'Parker' }]
              }

            ]
          }
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

// {[
//   { key: '1', text: 'Devin', children: [{ key: '11', text: 'Tom' }] },
//   {
//     key: '2', text: 'David',
//     children: [
//       { key: '22', text: 'Kim' },
//       {
//         key: '21', text: 'Tim',
//         children: [{ key: '211', text: 'John' }],
//         children: [{ key: '2111', text: 'Jillian',
//         children: [{ key: '210', text: 'John', children: [{ key: '212', text: 'Rest',
//         children: [{ key: '216', text: 'Test' ,children: [{ key: '213', text: 'Next',
//         children: [{ key: '214', text: 'West',children: [{ key: '215', text: 'Rich',
//       }]
//       }]
//       }]
//       }] 

//       }] }],               
//       }]
//       }
//     ]
//   },
//   { key: '3', text: 'James' },
//   { key: '4', text: 'Joel' },
//   { key: '5', text: 'Jimmy' },
//   { key: '6', text: 'Julie' },
//   { key: '7', text: 'Latin' },
//   { key: '8', text: 'Uru' },
//   { key: '9', text: 'No' },
//   { key: '10', text: 'Liz' },
//   { key: '11', text: 'James' },
//   { key: '12', text: 'Joel' },
//   { key: '13', text: 'Jimmy' },
//   { key: '14', text: 'Julie' },
//   { key: '15', text: 'No' },
//   { key: '16', text: 'Liz' },
//   { key: '17', text: 'James' },
//   { key: '18', text: 'Joel' },
//   { key: '19', text: 'Jimmy' },
//   { key: '20', text: 'Julie' }
// ]}