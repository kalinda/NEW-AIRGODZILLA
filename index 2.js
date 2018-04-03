
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  DatePickerAndroid,

} from 'react-native';

import { login, logout } from '../../actions/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007B7F',
  },
  address: {
    color: '#E2E2E2',
    FontSize: 16,
    fontWeight: 'bold',
  },
  addressInput: {
    color: '#E2E2E2',
    marginBottom: 40,
  },
  datePicker: {
    flexiDirection: 'row',
    alignItems: 'center',
  },
  datePickerButton: {
    flex: 1,
  },
  datePickerText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#E2E2E2',
  },

});

class FilterModal  extends Component {

constructor(props) {
super(props);
this.state = {
  adress: '',
  startDate: '',
  endDate: '',
  }
}

onStartDateChange = async () => {
  try {
    const {action, year, month, day} = await DatePickerAndroid.open({
      // Use `new Date()` for current date.
      // May 25 2020. Month 0 is January.
      //date: new Date(2020, 4, 25)
      minDate: new Date(),
      date: new Date()
        });
    if (action !== DatePickerAndroid.dismissedAction) {
      // Selected year, month (0-11), day
      this.setState({startDate: `${day}-${month+1}-${year}`});

    }
  } catch ({code, message}) {
    console.warn('Cannot open date picker', message);
  }

}

onEndDateChange = async () => {
  try {
    const {action, year, month, day} = await DatePickerAndroid.open({
      // Use `new Date()` for current date.
      // May 25 2020. Month 0 is January.
      //date: new Date(2020, 4, 25)
      minDate: new Date(),
      date: new Date()
        });
    if (action !== DatePickerAndroid.dismissedAction) {
      // Selected year, month (0-11), day
      this.setState({endDate: `${day}-${month+1}-${year}`});

    }
  } catch ({code, message}) {
    console.warn('Cannot open date picker', message);
  }

}





  render() {

    return (
      <ScrollView style={syles.container} contentContainerStyle = {{ padding: 20 }}>
      <Text style = {styles.address}>WHERE TO?</Text>
      <TextInput
      style = {styles.addressInput}
      underLineColorAndroid = '#E2E2E2'
      value = {this.state.address}
      onChangeText = {address => this.setState({address})}
      />

      <View style = {styles.datePicker}>
      <TouchableOpacity
      style ={styles.datePickerButton}
      onPress = { () => this.onStartDateChange() } >
      <Text style = {styles.datePickerText}>{this.state.startDate || 'Start Date'}</Text>
      </TouchableOpacity>

      <Text style = {styles.datePickerText, {flex: 1}}>to</Text>

        <TouchableOpacity
        style ={styles.datePickerButton}
        onPress = { () => this.onEndDateChange() } >
        <Text style = {styles.datePickerText}>{this.state.startDate || 'Start Date'}End Date</Text>
        </TouchableOpacity>

      </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  login: (name) => dispatch(login(name)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
