import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Button,
  ActivityIndicator
} from "react-native";
import firebaseConfig from "../../env";
import firebase from "firebase";

import FormRow from "../components/FormRow";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mail: "",
      password: "",
      isLoading: false
    };
  }

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
  }

  onChangeHandler(field, value) {
    this.setState({
      [field]: value
    });
  }

  tryLogin() {
    this.setState({ isLoading: true });

    const { mail, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(mail, password)
      .then(user => {
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => this.setState({ isLoading: false }));
  }

  renderButton() {
    if (this.state.isLoading) return <ActivityIndicator />;

    return <Button title="Entrar" onPress={() => this.tryLogin()} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <FormRow first>
          <TextInput
            style={styles.input}
            placeholder="user@mail.com"
            value={this.state.mail}
            onChangeText={value => this.onChangeHandler("mail", value)}
          />
        </FormRow>
        <FormRow last>
          <TextInput
            style={styles.input}
            placeholder="******"
            value={this.state.password}
            onChangeText={value => this.onChangeHandler("password", value)}
            secureTextEntry
          />
        </FormRow>
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10
  },

  input: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  }
});
