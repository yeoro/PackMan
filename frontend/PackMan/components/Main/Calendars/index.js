// import React from "react";

// import { StyleSheet, View, Text } from "react-native";

// import {
//   Calendar,
//   LocaleConfig,
//   CalendarList,
//   Agenda,
// } from "react-native-calendars";

// export default function Calendars() {
//   LocaleConfig.locales["fr"] = {
//     monthNames: [
//       "1월",
//       "2월",
//       "3월",
//       "4월",
//       "5월",
//       "6월",
//       "7월",
//       "8월",
//       "9월",
//       "10월",
//       "11월",
//       "12월",
//     ],
//     monthNamesShort: [
//       "1월",
//       "2월",
//       "3월",
//       "4월",
//       "5월",
//       "6월",
//       "7월",
//       "8월",
//       "9월",
//       "10월",
//       "11월",
//       "12월",
//     ],
//     dayNames: [
//       "일요일",
//       "월요일",
//       "화요일",
//       "수요일",
//       "목요일",
//       "금요일",
//       "토요일",
//     ],
//     dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
//     today: "오늘",
//   };
//   LocaleConfig.defaultLocale = "fr";

//   return (
//     <View style={styles.inner}>
//       {/* <Calendar /> */}
//       <Agenda
//         items={{
//           "2020-09-22": [{ text: "item 1 - any js object" }],
//           "2020-09-23": [{ text: "item 2 - any js object", height: 80 }],
//           "2020-09-24": [],
//           "2020-09-25": [
//             { text: "item 3 - any js object" },
//             { text: "any js object" },
//           ],
//         }}
//         renderItem={(item, firstItemInDay) => {
//           return <View />;
//         }}
//         renderEmptyData={() => {
//           return <Text>없다</Text>;
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   inner: {
//     flex: 1,
//     // alignItems: "center",
//     justifyContent: "center",
//   },
// });

import React, { Component } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import { Icon } from "react-native-elements";

const testIDs = require("../testIDs");

LocaleConfig.locales["fr"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};
LocaleConfig.defaultLocale = "fr";

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
    };
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach((key) => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyData() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  render() {
    return (
      <>
        <Agenda
          style={styles.agendaContainer}
          testID={testIDs.agenda.CONTAINER}
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={"2017-05-16"}
          renderItem={this.renderItem.bind(this)}
          renderEmptyData={this.renderEmptyData.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          // markingType={'period'}
          // markedDates={{
          //    '2017-05-08': {textColor: '#43515c'},
          //    '2017-05-09': {textColor: '#43515c'},
          //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
          //    '2017-05-21': {startingDay: true, color: 'blue'},
          //    '2017-05-22': {endingDay: true, color: 'gray'},
          //    '2017-05-24': {startingDay: true, color: 'gray'},
          //    '2017-05-25': {color: 'gray'},
          //    '2017-05-26': {endingDay: true, color: 'gray'}}}
          // monthFormat={'yyyy'}
          // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          // hideExtraDays={false}
        />
        <Icon
          reverse
          name="plus"
          type="font-awesome"
          color="#03bcdb"
          containerStyle={styles.btnContainer}
          onPress={() => console.log("hello")}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  agendaContainer: {
    marginTop: 40,
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  btnContainer: {
    position: "absolute",
    bottom: 12,
    right: 15,
  },
});