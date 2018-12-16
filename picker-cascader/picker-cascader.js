import React, { Component } from 'react';
import {
  Modal, Text, TouchableHighlight, View, Alert,
  Button, SectionList, StyleSheet, FlatList
} from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

export class PickerCascader extends Component {
  state = {
    modalVisible: false,
    visible: false,
    selecteditems: '',
    originalData: this.props.data,
    data: this.props.data,
    currentNode:0
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _pressItem(item) {
    console.log(item.key);
    var lastState = this.state.selecteditems;
    var curNode=this.state.currentNode;
    var data=[];
    console.log(lastState.length);
    if (lastState.length === 0)
      lastState = item.text;
    else
      lastState += '> ' + item.text;
    //if(curNode===0)
    //data=this.state.originalData.

    
      this.setState({ selecteditems: lastState });
  }


  render() {


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
            this.setState({ visible: false });
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
            <Text>{this.state.selecteditems}</Text>
            {/* <SectionList
          sections={[
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        /> */}
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
})