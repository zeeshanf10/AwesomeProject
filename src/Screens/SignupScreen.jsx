import React, {useState} from 'react';
import {
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
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';

const SignupScreen = () => {
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const [signUpForm, setSignUpForm] = useState({
    username: '',
    password: '',
    email: '',
    mobile: '',
  });

  const handleSignUp = async ({setSubmitting}) => {
    const API_URL = 'https://jn549f8x-8000.inc1.devtunnels.ms/user/signup';

    // console.log('values',signUpForm);
    try {
        const response = await axios.post(API_URL, {
          name: signUpForm.username,
          email: signUpForm.email,
          password: signUpForm.password,
            mobile: signUpForm.mobile,
        });

        console.log('response', response);
  
        if (response.status === 201) {
          Alert.alert('Signup Successful', 'Your account has been created.');
          navigation.navigate('Login');
        } else {
          Alert.alert('Signup Failed', response.data.message || 'Please try again.');
        }
      } catch (error) {
        Alert.alert('Error', error.response?.data?.message || 'An unexpected error occurred.');
      } finally {
        setSubmitting(false);
      }
  };

  const handleInputChange = (name, value) => {
    setSignUpForm({
      ...signUpForm,
      [name]: value,
    });
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
          <Text style={styles.helloText}>Create account</Text>{' '}
        </View>

        {/* <View style={styles.signIntextContainer}>
          {' '}
          <Text style={styles.signIntext}>Sign in to your account</Text>{' '}
        </View> */}
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome
          style={styles.inputIcon}
          name="user"
          size={24}
          color="#9a9a9a"
        />
        <TextInput
          placeholder="Username"
          placeholderTextColor="#9a9a9a"
          onChangeText={(e) => handleInputChange('username', e)}
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
          placeholder="Password"
          onChangeText={(e) => handleInputChange('password', e)}
          placeholderTextColor="#9a9a9a"
          style={{width: '70%', color: 'black'}}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome
          style={styles.inputIcon}
          View
          name="envelope"
          size={16}
          color="#9a9a9a"
        />
        <TextInput
          email
          placeholder="Email"
          onChangeText={(e) => handleInputChange('email', e)}
          placeholderTextColor="#9a9a9a"
          style={{width: '70%', color: 'black'}}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome
          style={styles.inputIcon}
          View
          name="mobile"
          size={24}
          color="#9a9a9a"
        />
        <TextInput
          placeholder="Mobile"
          onChangeText={(e) => handleInputChange('mobile', e)}
          placeholderTextColor="#9a9a9a"
          style={{width: '70%', color: 'black'}}
        />
      </View>

      {/* <View style={styles.forgetPassContainer}>
        <Text style={styles.forgetPassText}>Forget Password?</Text>
      </View> */}
      <View style={styles.signInButtonContainer}>
        <Text style={styles.signIn}>Create</Text>
        <TouchableOpacity onPress={handleSignUp}>
        <LinearGradient
          colors={['#f97794', '#623aa2']}
          style={styles.linearGradient}
          >
          <AntDesign
            name="arrowright"
            size={24}
            color="white"
            // style={styles.inputIcon}
          />
        </LinearGradient>
        </TouchableOpacity>
      </View>

      <Text style={styles.footertopText}>
        Or create account using social media
      </Text>

      <View style={styles.socialMediaContainer}>
        <Entypo
          name="facebook-with-circle"
          size={24}
          color="#3b5998"
          style={styles.socialMediaIcon}
        />
        <AntDesign
          name="google"
          size={24}
          color="#db4437"
          style={styles.socialMediaIcon}
        />
        <Entypo
          name="twitter-with-circle"
          size={24}
          color="#00acee"
          style={styles.socialMediaIcon}
        />
      </View>

      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={{textDecorationLine: 'underline'}}>Login</Text>
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

export default SignupScreen;

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
  helloContainer: {borderWidth: 0, marginTop: 50},
  helloText: {
    color: '#262626',
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 30,
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
    marginVertical: 15,
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
    marginTop: 30,
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
    marginTop: 60,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  socialMediaIcon: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    elevation: 10,
    padding: 10,
    borderRadius: 50,
  },
  footertopText: {
    color: '#262626',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 60,
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
