import React from "react";
import { Text, TextInput, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { auth, db } from "../config/firebase_setup";
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { doc, setDoc, Timestamp, collection } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

interface FormValues {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    school: string;
}

const defaultValues: FormValues = {
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
    school: ''
};

function SignUp() {
    const { control, formState, handleSubmit } = useForm<FormValues>({
        defaultValues
    });

    const navigation = useNavigation();

    const onSubmit = async (values: FormValues) => {
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );

            // Extract user ID from credential
            const { uid } = userCredential.user;

            // Generate a unique calendar ID
            const calendarDocRef = doc(collection(db, 'calendars'));

            // Create a new calendar document
            await setDoc(calendarDocRef, {
                created_at: Timestamp.fromDate(new Date())
            });

            // Save additional user data and calendar ID to Firestore
            await setDoc(doc(db, 'users', uid), {
                username: values.username,
                firstName: values.firstName,
                lastName: values.lastName,
                school: values.school,
                email: values.email,
                created_at: Timestamp.fromDate(new Date()), 
                calendarId: calendarDocRef.id 
            });

            navigation.navigate('LoginScreen' as never); 
        } catch (e) {
            const error = e as AuthError;
            console.error('Firebase Auth Error:', error.code, error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Sign Up</Text>

            <Controller 
                control={control} 
                name="username" 
                rules={{ required: 'Please enter a username' }}
                render={({ field: { onBlur, onChange, value } }) => (
                    <View style={styles.inputContainer}>
                        <TextInput 
                            onBlur={onBlur}
                            onChangeText={onChange} 
                            placeholder="Enter your username" 
                            value={value} 
                            style={styles.input}
                        />
                    </View>
                )}
            />
            {formState.errors.username && <Text style={styles.error}>{formState.errors.username.message}</Text>}

            <Controller 
                control={control} 
                name="firstName" 
                rules={{ required: 'Please enter your first name' }}
                render={({ field: { onBlur, onChange, value } }) => (
                    <View style={styles.inputContainer}>
                        <TextInput 
                            onBlur={onBlur}
                            onChangeText={onChange} 
                            placeholder="Enter your first name" 
                            value={value} 
                            style={styles.input}
                        />
                    </View>
                )}
            />
            {formState.errors.firstName && <Text style={styles.error}>{formState.errors.firstName.message}</Text>}

            <Controller 
                control={control} 
                name="lastName" 
                rules={{ required: 'Please enter your last name' }}
                render={({ field: { onBlur, onChange, value } }) => (
                    <View style={styles.inputContainer}>
                        <TextInput 
                            onBlur={onBlur}
                            onChangeText={onChange} 
                            placeholder="Enter your last name" 
                            value={value} 
                            style={styles.input}
                        />
                    </View>
                )}
            />
            {formState.errors.lastName && <Text style={styles.error}>{formState.errors.lastName.message}</Text>}

            <Controller 
                control={control} 
                name="school" 
                rules={{ required: 'Please enter your school' }}
                render={({ field: { onBlur, onChange, value } }) => (
                    <View style={styles.inputContainer}>
                        <TextInput 
                            onBlur={onBlur}
                            onChangeText={onChange} 
                            placeholder="Enter your school" 
                            value={value} 
                            style={styles.input}
                        />
                    </View>
                )}
            />
            {formState.errors.school && <Text style={styles.error}>{formState.errors.school.message}</Text>}

            <Controller 
                control={control} 
                name="email" 
                rules={{ required: 'Please enter an email address' }}
                render={({ field: { onBlur, onChange, value } }) => (
                    <View style={styles.inputContainer}>
                        <TextInput 
                            onBlur={onBlur}
                            onChangeText={onChange} 
                            placeholder="Enter your email address" 
                            value={value} 
                            style={styles.input}
                            keyboardType="email-address"
                        />
                    </View>
                )}
            />
            {formState.errors.email && <Text style={styles.error}>{formState.errors.email.message}</Text>}

            <Controller 
                control={control} 
                name="password" 
                rules={{ required: 'Please enter a password' }}
                render={({ field: { onBlur, onChange, value } }) => (
                    <View style={styles.inputContainer}>
                        <TextInput 
                            onBlur={onBlur}
                            onChangeText={onChange} 
                            placeholder="Enter your password" 
                            value={value}
                            secureTextEntry
                            style={styles.input}
                        />
                    </View>
                )}
            />
            {formState.errors.password && <Text style={styles.error}>{formState.errors.password.message}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        height: 45,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    error: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 5,
    },
    button: {
        backgroundColor: '#8e44ad', 
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SignUp;
