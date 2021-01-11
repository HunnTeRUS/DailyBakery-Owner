import React from 'react';
import { View, TextInput, Button } from 'react-native';
import * as queries from '../../mobile/src/graphql/queries';
import * as mutations from '../../mobile/src/graphql/mutations';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

class Main extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      profile: {},
      message: '',
      user: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const user = await Auth.currentSession()
      .then((data) => {
        //idToken.payload.sub
        this.setState({ user: data.getIdToken().payload });
        return data.getIdToken().payload;
      })
      .catch((err) => console.log(err));

    const profile = await this.getUserProfile(user);

    // There is no expoToken available yet, so we will request that and save it into the profile
    if (profile.expoToken === null) {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (status !== 'granted') {
        alert('No notification permissions!');
        return;
      }

      let token = await Notifications.getExpoPushTokenAsync();

      // Only update the profile with the expoToken if it not exists yet
      if (token !== '') {
        const inputParams = {
          id: user,
          expoToken: token,
        };
        const result = await API.graphql(
          graphqlOperation(mutations.updateTodo, { input: inputParams })
        );

        console.log(result);
      }
    }
  }

  async getUserProfile(sub: any) {
    const result = await API.graphql(
      graphqlOperation(queries.getTodo, { id: sub })
    );

    if (result) {
      this.setState({
        profile: result.data.getUser,
      });
      return result.data.getUser;
    }

    return result;
  }

  async handleSubmit() {
    const inputParams = {
      message: this.state.message,
      token: this.state.profile.expoToken,
      name: this.state.profile.name,
      email: this.state.profile.email,
      id: this.state.user,
    };

    const result = await API.graphql(
      graphqlOperation(mutations.pinpoint, { input: inputParams })
    );

    if (result) {
      console.log(result);
      console.log('success');
      this.setState({ message: '' });
    }
  }

  render() {
    return (
      <View style={{ marginTop: 80, marginLeft: 10, marginRight: 10 }}>
        <TextInput
          placeholder="Your push message"
          value={this.state.message}
          onChangeText={(input) => this.setState({ message: input })}
          style={{
            paddingLeft: 5,
            height: 40,
            fontSize: 16,
            marginBottom: 6,
            marginTop: 2,
          }}
        ></TextInput>
        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }
}

export default Main;
