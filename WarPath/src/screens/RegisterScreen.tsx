import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Formik } from 'formik';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import * as Yup from 'yup';

import Button from '../components/Button';
import Parchment from '../components/Parchment';
import ParchmentInput from '../components/ParchmentInput';
import ScreenLayout from '../components/ScreenLayout';
import { auth, db } from '../firebase';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors, parchmentWidth, spacing } from '../theme';
import { usernameToEmail } from '../utils/auth';

type RegisterNavProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const schema = Yup.object({
  username: Yup.string().required('Username is required').min(3, 'At least 3 characters'),
  password: Yup.string().required('Password is required').min(6, 'At least 6 characters'),
  confirm: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterNavProp>();

  async function handleRegister(values: { username: string; password: string }) {
    try {
      const email = usernameToEmail(values.username);
      const { user } = await createUserWithEmailAndPassword(auth, email, values.password);
      await setDoc(doc(db, 'users', user.uid), { name: values.username.trim() });
      navigation.replace('Hub');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong.';
      Alert.alert('Registration failed', message);
    }
  }

  return (
    <ScreenLayout title="CREATE ACCOUNT">
      <KeyboardAvoidingView
        style={styles.body}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Parchment style={styles.parchment}>
          <Formik
            initialValues={{ username: '', password: '', confirm: '' }}
            validationSchema={schema}
            onSubmit={handleRegister}
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
                  placeholder="Enter password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}

                <ParchmentInput
                  placeholder="Confirm password"
                  value={values.confirm}
                  onChangeText={handleChange('confirm')}
                  onBlur={handleBlur('confirm')}
                  secureTextEntry
                />
                {touched.confirm && errors.confirm && (
                  <Text style={styles.error}>{errors.confirm}</Text>
                )}

                <Button
                  label="Register"
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                />
              </View>
            )}
          </Formik>
        </Parchment>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  parchment: {
    width: parchmentWidth,
    alignSelf: 'center',
  },
  fields: {
    width: '100%',
    gap: spacing.sm,
  },
  error: {
    color: colors.error,
    fontSize: 13,
    marginTop: -6,
  },
});
