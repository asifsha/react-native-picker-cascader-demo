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
    };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _pressItem(item) {
    console.log(item.key);
    if (item.children === undefined) {
      this.setState({ visible: false });
      return;
    }
    var lastselectedItems = this.state.selecteditems;
    var curNode = this.state.currentNode;
    var childData = [];
    //console.log(lastState.length);
    // if (lastselectedItems.length === 0)
    // lastselectedItems = item.text;
    // else
    // lastselectedItems += '> ' + item.text;
    //onsole.log(item.children);
    childData = item.children;
    lastselectedItems.push(item);

console.log(lastselectedItems);

    //var obj = new JSONObject(item.children.toString());
    //childData=obj.getJSONArray();
    //if(curNode===0)
    //data=this.state.originalData.

    //console.log(childData);
    this.setState({
      selecteditems: lastselectedItems,
      data: childData
    });
  }


  render() {
    // console.log(this.state.data);

    return (
      <View style={{ marginTop: 22 }}>
        <Button
          title="Show Dialog"
          onPress={() => {
            this.setState({ visible: true });
          }}
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
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{
                      height: 2,
                      width: 0.7,
                      backgroundColor: "#CED0CE",

                    }}
                  />
                );
              }}
            />
            <View >
              <FlatList
                data={this.state.selecteditems}
                horizontal={true}

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

                ItemSeparatorComponent={() => {
                  return (
                    <View>
                      <Text>:</Text>
                    </View>
                  );
                }}

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