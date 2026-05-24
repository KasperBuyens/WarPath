import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import { Alert, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import * as Yup from 'yup';

import Button from '../components/Button';
import Parchment from '../components/Parchment';
import ParchmentInput from '../components/ParchmentInput';
import ScreenLayout from '../components/ScreenLayout';
import { auth } from '../firebase';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { authFormStyles as styles } from '../styles/authForm';
import { usernameToEmail } from '../utils/auth';

type LoginNavProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const schema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginScreen() {
  const navigation = useNavigation<LoginNavProp>();

  async function handleLogin(values: { username: string; password: string }) {
    try {
      const email = usernameToEmail(values.username);
      await signInWithEmailAndPassword(auth, email, values.password);
      navigation.replace('Hub');
    } catch {
      Alert.alert('Login failed', 'Invalid username or password.');
    }
  }

  return (
    <ScreenLayout title="LOGIN">
      <KeyboardAvoidingView
        style={styles.body}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Parchment style={styles.parchment}>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={schema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
              <View style={styles.fields}>
                <ParchmentInput
                  placeholder="Enter username"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                />
                {touched.username && errors.username && (
                  <Text style={styles.error}>{errors.username}</Text>
                )}

                <ParchmentInput
                  placeholder="Enter Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}

                <Button
                  label="Login"
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                />
                <Button
                  label="Return"
                  onPress={() => navigation.goBack()}
                  compact
                  style={styles.returnButton}
                />
              </View>
            )}
          </Formik>
        </Parchment>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
