import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '../services/apiServices';
import {useAuth} from '../features/AuthStack/AuthContext';
import {useLoginUserMutation} from '../services/Auth/authApiSlice';
import {
  setCredentials,
  setOnboarded,
} from '../services/Auth/AuthComponentSlice';
import {useDispatch} from 'react-redux';

const LoginScreen = () => {
  const navigation = useNavigation();
  const handleRegister = () => {
    navigation.navigate('Signup');
  };
  const [loading, setLoading] = useState(false);
  const [signInForm, setSignInForm] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (name, value) => {
    setSignInForm({
      ...signInForm,
      [name]: value,
    });
  };

  const {login} = useAuth();

  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const payload = {
      email: signInForm?.email,
      password: signInForm?.password,
    };
    try {
      setLoading(true);
      const res = await loginUser(payload).unwrap();

      if (res?.data?.authToken) {
        setLoading(false);

        dispatch(
          setCredentials({
            token: {accessToken: res.data.authToken},
            account: res.data.user,
          }),
        );
      await  login(res.data.authToken);
        dispatch(setOnboarded(res?.data.user?.organization?.isOnBoarded));
      } else {
        console.error('Failed to get authentication token');
      }
    } catch (error) {
      setLoading(false);

      console.error('Login failed:', error);
    }

    // try {
    //   setLoading(true);

    //   // await loginUser(payload, login);
    //   // Alert.alert('Success', `Welcome back, ${user?.name}!`);
    //   // setLoading(false);
    //   // Redirect to the next screen after login
    //   //   navigation.navigate('Dashboard'); // Replace 'Home' with your desired route
    // } catch (error) {
    //   setLoading(false);
    //   Alert.alert('Login Failed', error);
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require('../assets/Vectortop.png')}
          style={styles.topImage}
        />
        <View style={styles.helloContainer}>
          {' '}
          {/* <Text style={styles.helloText}>Hello</Text>{' '}
           */}
          <Image source={require('../assets/icon.png')} style={styles.logo} />
        </View>

        <View style={styles.signIntextContainer}>
          {' '}
          <Text style={styles.signIntext}>Sign in to your account</Text>{' '}
        </View>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome
          style={styles.inputIcon}
          name="user"
          size={24}
          color="#9a9a9a"
        />
        <TextInput
          placeholder="Email"
          onChangeText={text => handleInputChange('email', text)}
          placeholderTextColor="#9a9a9a"
          style={{width: '70%', color: 'black'}}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome
          style={styles.inputIcon}
          View
          name="lock"
          size={24}
          color="#9a9a9a"
        />
        <TextInput
          secureTextEntry
          onChangeText={text => handleInputChange('password', text)}
          placeholder="Password"
          placeholderTextColor="#9a9a9a"
          style={{width: '70%', color: 'black'}}
        />
      </View>
      <View style={styles.forgetPassContainer}>
        <Text style={styles.forgetPassText}>Forget Password?</Text>
      </View>
      <View style={styles.signInButtonContainer}>
        <Text style={styles.signIn}>Sign in</Text>
        <TouchableOpacity onPress={handleLogin}>
          <LinearGradient
            colors={['#f97794', '#623aa2']}
            style={styles.linearGradient}>
            {loading ? (
              <ActivityIndicator size="small" color={'#fff'} />
            ) : (
              <AntDesign
                name="arrowright"
                size={24}
                color="white"
                // style={styles.inputIcon}
              />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text style={{textDecorationLine: 'underline'}}>Create</Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.leftVectorContainer}>
        <Image
          source={require('../assets/LeftVector.png')}
          style={styles.leftVectorImage}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topImageContainer: {
    //   height: 50,
  },
  topImage: {
    width: '100%',
    height: 130,
  },

  logo: {
    width: 120,
    height: 100,
  },
  helloContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    marginTop: 50,
    marginBottom: 40,
  },
  helloText: {
    color: '#262626',
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 70,
  },
  signIntextContainer: {borderWidth: 0, marginTop: 10},
  signIntext: {
    color: '#262626',
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 18,
  },
  inputContainer: {
    marginBottom: 10,
    borderRadius: 30,
    marginHorizontal: 40,
    elevation: 10,
    marginVertical: 30,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
    height: 50,
  },
  inputIcon: {marginHorizontal: 20},
  inputText: {
    backgroundColor: 'white',
    placeholderColor: 'black',
  },

  forgetPassContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 40,
  },

  forgetPassText: {
    fontSize: 15,
    textAlign: 'end',
    color: '#BEBEBE',
    fontWeight: 400,
  },
  signInButtonContainer: {
    flexDirection: 'row',
    marginTop: 100,
    width: '90%',
    justifyContent: 'flex-end',
  },
  signIn: {
    color: '#262626',
    fontSize: 25,
    fontWeight: 'bold',
  },

  linearGradient: {
    height: 34,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 17,
  },
  footerText: {
    color: '#262626',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 120,
  },
  leftVectorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  leftVectorImage: {
    width: 150,
    height: 350,
  },
});
