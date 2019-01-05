import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';


import {
   Text, TextInput, TouchableHighlight, View, ScrollView,
   StyleSheet, FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import check from './check';

export class PickerCascader extends Component {
  constructor(props) {
    super(props);
    let transformData = [];

    this.createSearchData(transformData, this.props.data, '', '');
   console.log(JSON.stringify(this.props.data));
   console.log(JSON.parse(JSON.stringify(this.props.data)));
    this.state = {
      visible: false,
      selecteditems: [],
      originalData: this.props.data,
      data: this.props.data,
      history: [],
      selecteditem: { text: '' },
      searchString: '',
      searchData: transformData,
      filterData: []
    };

  }

  isAndroid()
  {
    return Platform.OS === 'android';
  }
  createSearchData(searchData, data, key, text) {
    let index = 0;
    for (index = 0; index < data.length; index++) {
      let d = data[index];
      if (d.children !== undefined)
        this.createSearchData(searchData, d.children, key + d.key + '~', text + d.text + ' | ');
      else {
        let k = key + d.key;
        let t = text + d.text;
        searchData.push({ key: k, text: t })
      }
    }
  }


  // setModalVisible(visible) {
  //   this.setState({ modalVisible: visible });
  // }

  // findParentItem(item) {
  //   return function (data) {
  //     console.log('data: ' + data.key);
  //     console.log('key: ' + item.key);
  //     return data.key == item.key;
  //   }
  // }
  _pressParentItem(item) {
    let lastHistory = this.state.history;

    let pIndex = this.findIndexByKey(lastHistory, item.key);

    let pItem = lastHistory[pIndex];

    lastHistory.length = pIndex;

    this.setState({
      selecteditems: pItem.selecteditems,
      data: pItem.data,
      history: lastHistory
    });


  }

  findIndexByKey(data, key) {
    let index = 0;
    for (index = 0; index < data.length; index++) {
      if (data[index].key == key) {
        return index;
      }
    }

  }

  // findByKey(data, key) {
  //   function iter(a) {
  //     if (a.text === key) {
  //       result = a;
  //       return true;
  //     }
  //     return Array.isArray(a.children) && a.children.some(iter);
  //   }

  //   var result;
  //   data.some(iter);
  //   return result;
  // }

  pressSearchItem(item) {
    let si = { text: '', key: '' };
    si.text = item.text;
    si.key = item.key;
    this.setState({
      visible: false,
      selecteditem: si
    });
    if (this.props.onValueChange != null) {
      this.props.onValueChange(si);
    }
  }

  _pressItem(item) {
    if (item.children === undefined) {
      let index = 0;
      let t = '', k = '';
      console.log(this.state.selecteditems.length);
      for (index = 0; index < this.state.selecteditems.length; index++) {
        t = t + this.state.selecteditems[index].text + ' | ';
        k = k + this.state.selecteditems[index].key + '~';
      }
      let si = { text: '', key: '' };
      si.text = t + item.text;
      si.key = k + item.key;
      console.log(si);
      this.setState({
        visible: false,
        selecteditem: si
      });
      if (this.props.onValueChange != null) {
        this.props.onValueChange(si);
      }
      return;
    }

    var lastselectedItems = this.state.selecteditems;
    var childData = [];
    var lastHistory = this.state.history;
    var h = { selecteditems: this.state.selecteditems.slice(), key: item.key, data: this.state.data };

    childData = item.children;
    lastselectedItems.push(item);
    lastHistory.push(h);

    this.setState({
      selecteditems: lastselectedItems,
      data: childData,
      history: lastHistory
    });
    console.log(item);
    console.log('abc');
  }

  showPicker() {

    this.setState({
      visible: true,
      selecteditems: [],
      originalData: this.props.data,
      data: this.props.data,
      history: [],
      searchString: '',
      filterData: []


    });
  }

  onSearch(searchString) {
    let sd = this.state.searchData;
    sd = sd.filter((arr) => { return arr.text.toLowerCase().includes(searchString.toLowerCase()); });

    this.setState({
      searchString: searchString,
      filterData: sd
    })

  }

  renderMore = () => {
    return (
      <Ionicons name="md-arrow-dropright" size={20} />
    )
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          paddingLeft: 3,
          paddingRight: 3
        }}
      >
        <View>
          <Ionicons name="md-arrow-dropright" size={20} />
        </View>
      </View>
    )
  }

  _renderItem = ({ item, index }) => (
    <View style={{ flexDirection: 'row' }}>
      <TouchableHighlight onPress={() => this._pressParentItem(item)}>
        <View>
          <Text>
            {item.text}
          </Text>
        </View>
      </TouchableHighlight>
      {(index !== this.state.selecteditems.length - 1) && this.renderSeparator()}

    </View>
  )



  render() {
    console.log('OS');
    console.log( Platform.OS === 'android'? 1: 0);
    console.log(Platform.OS);
    //console.log(DeviceInfo.)
    return (
      <View >
        <TouchableHighlight onPress={() => this.showPicker()}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={{ width: 180 }}>
              {this.state.selecteditem.text}
            </Text>
            <Ionicons name="md-arrow-dropdown" size={20} />
          </View>
        </TouchableHighlight>
        <Dialog
          height={0.6}
          width={0.75}
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
          onHardwareBackPress={() => {
            this.setState({ visible: false });
          }}
        >

          <DialogContent>
            <View>
              <View style={styles.searchSection}>
                <Ionicons style={styles.searchIcon} name="md-search" size={20} color="#000" />
                <TextInput
                  style={styles.input}
                  placeholder="search"
                  onChangeText={(searchString) => { this.onSearch(searchString) }}
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>

            {this.state.searchString !== '' &&
              <View>
                <FlatList
                  data={this.state.filterData}
                  renderItem={({ item }) => (
                    <View>
                      <TouchableHighlight onPress={() => this.pressSearchItem(item)}>
                        <ScrollView horizontal={true}>
                          <Text style={styles.item}>{item.text}</Text>
                        </ScrollView>
                      </TouchableHighlight>
                    </View>
                  )
                  }
                />

              </View>
            }

            {this.state.searchString === '' &&
              <View>
                <View style={{ height: Platform.OS === 'android' ? '87%' : '92%' }}>
                  <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                      <View>
                        <TouchableHighlight onPress={() => this._pressItem(item)}>
                          <ScrollView horizontal={true}>
                            <Text style={styles.item}>{item.text}  {(item.children !== undefined) && this.renderMore()} </Text>
                          </ScrollView>
                        </TouchableHighlight>
                      </View>
                    )
                    }
                  />
                </View>

                <View >
                  <FlatList
                    data={this.state.selecteditems}
                    horizontal={true}
                    renderItem={this._renderItem}
                    listkey={(item, index) => item.key}
                  />

                </View>

              </View>}


          </DialogContent>

        </Dialog>
      </View>
    );
  }
}


PickerCascader.propTypes = {
  data: PropTypes.array,
  onValueChange: PropTypes.func
}

PickerCascader.defaultProps = {

  data: [],
  onValueChange: () => { }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  searchItem: {

    fontSize: 18,
    height: 30,
  },
  searchChildItem: {
    paddingLeft: 10,
    fontSize: 18,
    height: 30,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom:  Platform.OS === 'android' ? 14 : 0
  },
  searchSection: {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
})