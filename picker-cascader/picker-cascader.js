import React, { Component } from 'react';
import {
  Modal, Text, TextInput, TouchableHighlight, View, Alert,
  Button, SectionList, StyleSheet, FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import check from './check';

export class PickerCascader extends Component {
  constructor(props) {
    super(props);
    let transformData = [];

    this.createSearchData(transformData, this.props.data, '', '');
    console.log(transformData);
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


  createSearchData(searchData, data, key, text) {
    console.log('in create search data');
    //console.log(data);
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


  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  findParentItem(item) {
    return function (data) {
      console.log('data: ' + data.key);
      console.log('key: ' + item.key);
      return data.key == item.key;
    }
  }
  _pressParentItem(item) {
    //var p=this.state.originalData.find(this.findParentItem(item));
    console.log('search starts...');
    console.log(item.key);
    //let p = this.findByKey(this.state.originalData, item.key);
    //if(p!==undefined)
    console.log('search ends...');
    //console.log('value of p:' + p.text);
    let lastHistory = this.state.history;

    //let pIndex=this.state.history.findIndex(function(e) {return e.key == item.key});
    //console.log(history);
    console.log('hisotry length' + lastHistory.length);

    let pIndex = this.findIndexByKey(lastHistory, item.key);

    let pItem = lastHistory[pIndex];
    console.log('selecteditems:' + pItem.selecteditems);
    lastHistory.length = pIndex;
    console.log('after length:' + lastHistory.length);
    this.setState({
      selecteditems: pItem.selecteditems,
      data: pItem.data,
      history: lastHistory
    })
  }

  findIndexByKey(data, key) {
    let index = 0;
    console.log(data.length);
    console.log(data.key);
    for (index = 0; index < data.length; index++) {
      if (data[index].key == key) {
        return index;
      }
    }


  }



  findByKey(data, key) {
    let that = this;
    function iter(a) {
      if (a.text === key) {
        result = a;
        return true;
      }
      return Array.isArray(a.children) && a.children.some(iter);
    }

    var result;
    data.some(iter);
    return result;
  }

  //}
  _pressItem(item) {
    //console.log(item.key);
    if (item.children === undefined) {
      this.setState({
        visible: false,
        selecteditem: item
      });
      return;
    }
    var lastselectedItems = this.state.selecteditems;    
    var childData = [];
    var lastHistory = this.state.history;
    var h = { selecteditems: this.state.selecteditems.slice(), key: item.key, data: this.state.data };
    //console.log('history:');
    // console.log(h[0].selecteditems.length);
    //console.log('end history');
    //console.log(lastState.length);
    // if (lastselectedItems.length === 0)
    // lastselectedItems = item.text;
    // else
    // lastselectedItems += '> ' + item.text;
    //onsole.log(item.children);
    console.log('h selected items b :' + lastHistory);
    childData = item.children;
    lastselectedItems.push(item);
    lastHistory.push(h);
    console.log('h selected items :' + lastHistory[lastHistory.length - 1].selecteditems.length);
    //console.log(lastselectedItems);

    //var obj = new JSONObject(item.children.toString());
    //childData=obj.getJSONArray();
    //if(curNode===0)
    //data=this.state.originalData.

    //console.log(childData);
    this.setState({
      selecteditems: lastselectedItems,
      data: childData,
      history: lastHistory
    });
  }

  showPicker() {

    this.setState({
      visible: true,
      selecteditems: [],
      originalData: this.props.data,
      data: this.props.data,
      history: [],
      searchString: ''


    });
  }

  onSearch(searchString) {
    let sd = this.state.searchData;
    sd = sd.filter((arr) => { return arr.text.includes(searchString); });

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

  // renderChildList(items, index, pitem) {    
  //   return <View>
  //     <FlatList
  //       data={items}

  //       renderItem={({ item }) => (
  //         <View>
  //           <TouchableHighlight onPress={() => this._pressItem(item)}>
  //             <View>
  //               <Text style={styles.searchChildItem}>
  //                 {(item.children === undefined) && <Ionicons name="md-arrow-dropright" size={10} />} {item.text} </Text>
  //               <View style={{ paddingLeft: 10 * index }}>
  //                 {(item.children !== undefined) && this.renderChildList(item.children, index + 1, item)}

  //               </View>
  //             </View>
  //           </TouchableHighlight>
  //         </View>
  //       )
  //       }
  //     />
  //   </View>;
  // }

  render() {
    return (
      <View >
        <TouchableHighlight onPress={() => this.showPicker()}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={{ width: 180, borderWidth: 1, borderColor: '#636870' }}>
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
                      <TouchableHighlight onPress={() => this._pressItem(item)}>
                        <View>
                          <Text style={styles.item}>{item.text}</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  )
                  }
                />

              </View>
            }

            {this.state.searchString === '' &&
              <View>
                <View style={{ height: 300 }}>
                  <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                      <View>
                        <TouchableHighlight onPress={() => this._pressItem(item)}>
                          <View>
                            <Text style={styles.item}>{item.text}  {(item.children !== undefined) && this.renderMore()} </Text>
                          </View>
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
    paddingBottom: check.isAndroid ? 14 : 0
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