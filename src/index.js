import React from "react";
import ReactDom from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Loader from "./Loader";
class App extends React.Component {
  state = {
    lat: null,
    err: "",
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ err: err.message })
    );
  }
  componentDidUpdate() {
    console.log("component rendered");
  }
  render() {
    if (this.state.err && !this.state.lat) {
      return <div>Error :{this.state.err}</div>;
    }
    if (!this.state.err && this.state.lat) {
      return (
        <div>
          <SeasonDisplay lat={this.state.lat} />
        </div>
      );
    }
    return (
      <div>
        <Loader message="Please allow to read the location" />
      </div>
    );
  }
}

ReactDom.render(<App />, document.querySelector("#root"));
