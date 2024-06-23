import { Text, View, Image, StatusBar, TextInput, Pressable } from "react-native";
import { useState } from "react";
import * as Yup from 'yup';
import { Formik } from 'formik';
import auth from "@react-native-firebase/auth";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Enter a valid email')
        .required(''),
    password: Yup.string()
        .required('')
        .min(4, 'Password must have at least 4 characters'),
});

export default function Login({navigation}) {
    const [emailFocus, setEmailFocus] = useState(false);
    const [pswFocus, setpswFocus] = useState(false);
    const [loginError, setLoginError] = useState(false);
    
    const handleSignIn = async (values) => {
        try {
          await auth().signInWithEmailAndPassword(values.email, values.password);
          console.log("User Logged in");
        } catch (error) {
          console.error("Error Logging in:", error.message);
          setLoginError(true);
        }
      };
      // refs
    return (
        <View className="bg-white h-full w-full">
            <StatusBar translucent backgroundColor='transparent' style="light" />
            <Image className="h-full w-full absolute" source={require("../assets/background.png")} />

            <View className="flex-row w-full absolute justify-around">
                <Image className="h-[225] w-[90]" source={require('../assets/light.png')} />
                <Image className="h-[160] w-[65]" source={require('../assets/light.png')} />
            </View>

            <View className="h-full w-full flex justify-around pt-36">
                <View className="flex items-center">
                    <Text className="text-white font-bold tracking-wider text-5xl">
                        Login
                    </Text>
                </View>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleSignIn(values)
                    }}
                > 
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View className="w-full">
                            <View className="flex items-center mx-4 space-y-4">
                                <View className={`bg-black/5 rounded-2xl w-full ${emailFocus ? 'bg-blue-100' : 'bg-black/5'} ${loginError ? "border-2 border-raspberry" : ""}`}>
                                    <TextInput className={`pl-5 pt-3 text-base`}
                                        onChangeText={handleChange('email')}
                                        onBlur={() => {
                                            setEmailFocus(false);
                                            handleBlur('email')
                                        }}
                                        onFocus={() => setEmailFocus(true)}
                                        value={values.email}
                                        placeholder="Email"
                                        placeholderTextColor={'gray'}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>
                                {errors.email && touched.email && <Text>{errors.email}</Text>}
                                <View className={`bg-black/5 rounded-2xl w-full ${pswFocus ? 'bg-blue-100' : 'bg-black/5'} ${loginError ? "border-2 border-raspberry" : ""}`}>
                                    <TextInput className={`pl-5 pt-3 text-base`}
                                        onChangeText={handleChange('password')}
                                        onBlur={() => {
                                            setpswFocus(false);
                                            handleBlur('password')
                                        }}
                                        onFocus={() => setpswFocus(true)}
                                        value={values.password}
                                        placeholder="Password"
                                        secureTextEntry
                                    />
                                </View>
                                {loginError && <Text className="text-raspberry" >Login or password is invalid</Text>}
                                {errors.password && touched.password && <Text>{errors.password}</Text>}
                            </View>

                            <View className={`mx-4 bg-sky-400 rounded-2xl h-14 mt-8`}>
                                <Pressable onPress={handleSubmit} className={`h-14 rounded-2xl`} android_ripple={{ color: 'rgba(147, 7, 253, 0.1)' }}>
                                    <Text className="text-2xl text-white font-bold tracking-widest text-center mt-2">Login</Text>
                                </Pressable>
                            </View>

                            <View className="items-center mt-4 ">
                                <Pressable onPress={() => navigation.navigate("SignUpForm")} className="rounded-2xl" android_ripple={{ color: 'rgba(0, 7, 2, 0.1)' }}>
                                    <Text className="text-base font-bold">Don't Have an account? <Text className="text-sky-400 ">SignUp</Text></Text> 
                                </Pressable>
                            </View>
                        </View>
                    )}
                </Formik>
            </View >
        </View >);
}

