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
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});



const handleSignUp = async (values) => {
    try {
        await auth().createUserWithEmailAndPassword(
            values.email,
            values.password
        );

        console.log("User signed up");
    } catch (error) {
        console.error("Error signing up:", error.message);
    }
};

export default function SignUp({ navigation }) {
    const [emailFocus, setEmailFocus] = useState(false);
    const [pswFocus, setpswFocus] = useState(false);
    const [confirmFocus, setConfirmFocus] = useState(false);



    return (
        <View className="bg-white h-full w-full">
            <StatusBar translucent backgroundColor='transparent' style="light" />
            <Image className="h-full w-full absolute" source={require("../assets/background.png")} />

            <View className="flex-row w-full absolute justify-around">
                <Image className="h-[225] w-[90]" source={require('../assets/light.png')} />
                <Image className="h-[160] w-[65]" source={require('../assets/light.png')} />
            </View>

            <View className="h-full w-full flex justify-around pt-44">
                <View className="flex items-center">
                    <Text className="text-white font-bold tracking-wider text-5xl">
                        SignUp
                    </Text>
                </View>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleSignUp(values)
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View className="w-full">
                            <View className="flex items-center mx-4 space-y-4">
                                <View className={`bg-black/5 rounded-2xl w-full ${emailFocus ? 'bg-blue-100' : 'bg-black/5'}`}>
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
                                <View className={`bg-black/5 rounded-2xl w-full ${pswFocus ? 'bg-blue-100' : 'bg-black/5'}`}>
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
                                {errors.password && touched.password && <Text>{errors.password}</Text>}
                                <View className={`bg-black/5 rounded-2xl w-full ${confirmFocus ? 'bg-blue-100' : 'bg-black/5'}`}>
                                    <TextInput className={`pl-5 pt-3 text-base`}
                                        onBlur={() => {
                                            setConfirmFocus(false);
                                            handleBlur('confirmPassword')
                                        }}
                                        onFocus={() => setConfirmFocus(true)}
                                        onChangeText={handleChange("confirmPassword")}
                                        value={values.confirmPassword}
                                        placeholder="Confirm Password"
                                        secureTextEntry
                                    />
                                </View>
                                {errors.confirmPassword && (
                                    <Text>{errors.confirmPassword}</Text>
                                )}
                            </View>

                            <View className={`mx-4 bg-sky-400 rounded-2xl h-14 mt-8`}>
                                <Pressable onPress={handleSubmit} className={`h-14 rounded-2xl`} android_ripple={{ color: 'rgba(147, 7, 253, 0.1)' }}>
                                    <Text className="text-2xl text-white font-bold tracking-widest text-center mt-2">SignUp</Text>
                                </Pressable>
                            </View>

                            <View className="items-center mt-4 ">
                                <Pressable onPress={() => navigation.navigate("Login")} className="rounded-2xl" android_ripple={{ color: 'rgba(0, 7, 2, 0.1)' }}>
                                    <Text className="text-base font-bold">Already have an account? <Text className="text-sky-400 ">Login</Text></Text>
                                </Pressable>
                            </View>

                        </View>
                    )}
                </Formik>
            </View >
        </View >);
}

