import React, { Component } from 'react';
import { Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import WeatherCard from './components/WeatherCard';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  getWeather = (latitude, longitude, imgUrl = "") => {
    this.setState({ loading: true }, async () => {
      const API_KEY = "b83dd0af3c5b605ccdb7c5b5d53978db";
      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
      try {
        const response = await fetch(api);
        const jsonData = await response.json();
        this.setState({ location: { ...jsonData, imgUrl }, loading: false })
      } catch (error) {
        this.setState({ error: true, loading: false })
      }
    })
  };

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log('err');
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    this.getWeather(location.coords.latitude, location.coords.longitude);
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  render() {
    const { loading } = this.state;
    if (!loading) {
      return (
        <View style={styles.bg}>
          <WeatherCard error={this.state.error} loading={loading} location={this.state.location} />
        </View>
      );
    } 
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" loading={loading} />
      </View>
    )
  }
}
export default App;


const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "black"
  },
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  weatherContainer: {
    padding: 20,
    width: "90%",
    borderWidth: 1,
    maxWidth: "90%",
    minHeight: "20%",
    marginTop: "70%",
    borderRadius: 25,
    marginBottom: "2%",
    borderColor: "white",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  text: {
    fontSize: 20,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold"
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  cityContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  cityName: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  cityButton: {
    margin: 3,
    height: 40,
    padding: 3,
    width: "25%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  tempRow: {
    alignSelf: "center",
    flexDirection: "row"
  },
  locationText: {
    fontSize: 25,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  currentLocation: {
    margin: 3,
    height: 40,
    padding: 3,
    width: "72.5%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20,33,61,0.6)"
  }
});


