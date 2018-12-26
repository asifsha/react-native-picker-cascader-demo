import React, { Component } from 'react';
import {
  Modal, Text, TouchableHighlight, View, Alert,
  Button, SectionList, StyleSheet, FlatList
} from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import check from './check';

export class PickerCascader extends Component {
  state = {
    modalVisible: false,
    visible: false,
    selecteditems: [],
    originalData: this.props.data,
    data: this.props.data,
    currentNode: 0,
    history: []
  };

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

  //findKeyInDatasource()
  //{

  //let findDeep = f
  // findDeep(data, key) {
  //   let that = this;
  //   return data.find(function(e) {
  //     if(e.key == key) {
  //       console.log(e)
  //       return true;
  //     }
  //     else if(e.children) return that.findDeep(e.children, key)
  //   })
  // }

  // findByKey(data, key) {
  //   for (var i = 0; i < data.length; i++) {
  //     console.log('data :'+data[i].key);
  //     if (data[i].key == key) {
  //       return data[i];
  //     } else if (data[i].children && data[i].children.length) {
  //       this.findByKey(data[i].children, key);
  //     }
  //   }
  // }

  findByKey(data, key) {
    let that = this;
    function iter(a) {
      if (a.key === key) {
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
      this.setState({ visible: false });
      return;
    }
    var lastselectedItems = this.state.selecteditems;
    var curNode = this.state.currentNode;
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
      modalVisible: false,
      visible: true,
      selecteditems: [],
      originalData: this.props.data,
      data: this.props.data,
      currentNode: 0,
      history: []
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          paddingLeft: 3,
          paddingRight: 3
        }}
      >
        <View
          style={{
            height: 20,
            width: 3,

            backgroundColor: '#636870'
          }}
        />
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
    // console.log(this.state.data);



    return (
      <View style={{ marginTop: 22 }}>
        <Button
          title="Show Dialog"
          onPress={() => this.showPicker()}
        />
        <Dialog
          height={0.5}
          width={0.75}
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({ visible: true });
          }}
        >
          <DialogContent>
            <FlatList
              data={this.state.data}

              renderItem={({ item }) => (

                <View>
                  <TouchableHighlight onPress={() => this._pressItem(item)}>
                    <View>
                      <Text style={styles.item}>{item.text + (item.children !== undefined ? ' >' : '')}</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              )
              }
            />
            <View >
              <FlatList
                data={this.state.selecteditems}
                horizontal={true}
                renderItem={this._renderItem}
                listkey={(item, index) => item.key}
              />

            </View>

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
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: check.isAndroid ? 14 : 0
  }
})