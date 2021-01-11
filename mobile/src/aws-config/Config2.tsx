import { useState } from 'react';
import React from 'react';
import { View, TextInput, Button } from 'react-native';
import * as queries from '../../mobile/src/graphql/queries';
import * as mutations from '../../mobile/src/graphql/mutations';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { useEffect } from 'react';

export default function Config2() {

  interface user {
    [key: string]: any;
  }

  interface state {
    profile: {
      expoToken: string,
      name: string,
      email: string
    };
    message: string;
    user: user
  }

  const [state, setState] = useState<state>({
    profile: {
      expoToken: '',
      name: '',
      email: '',
    },
    message: '',
    user: [],
  });

  useEffect(() => {
    init();
  }, []);

  async function getUserProfile(sub: any) {
    const result: any = await API.graphql(
      graphqlOperation(queries.getTodo, { id: sub })
    );

    if (result) {
      setState({
        ...state,
        profile: result.data.getUser,
      });
      return result.data.getUser;
    }

    return result;
  }

  async function init() {
    const user = await Auth.currentSession()
      .then((data) => {
        console.log(data)
        //idToken.payload.sub
        setState({ ...state, user: data.getIdToken().payload });
        console.log(state)
        return data.getIdToken().payload;
      })
      .catch((err) => console.log(err));

    const profile = await getUserProfile(user);

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

  async function handleSubmit() {
    console.log(state);
    const inputParams = {
      message: state.message,
      token: state.profile.expoToken,
      name: state.profile.name,
      email: state.profile.email,
      id: state.user,
    };

    const result = await API.graphql(
      graphqlOperation(mutations.pinpoint, { input: inputParams })
    );
    console.log(result);

    if (result) {
      console.log(result);
      console.log('success');
      setState({ ...state, message: '' });
    }
  }

  return (
    <View style={{ marginTop: 80, marginLeft: 10, marginRight: 10 }}>
      <TextInput
        placeholder="Your push message"
        value={state.message}
        onChangeText={(input) => {
          console.log(input);
          setState({ ...state, message: input });
          console.log(state);
        }}
        style={{
          paddingLeft: 5,
          height: 40,
          fontSize: 16,
          marginBottom: 6,
          marginTop: 2,
        }}
      ></TextInput>
      <Button title="Submit" onPress={() => {handleSubmit()}} />
    </View>
  );
}
