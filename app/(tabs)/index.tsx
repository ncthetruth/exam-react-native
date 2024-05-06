import React, { useState, useEffect } from 'react';
import { Image, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';

export default function MyProfileScreen() {
    const [tempName, setTempName] = useState("");
    const [name, setName] = useState("Your Name");
    const imageUrl = "https://pbs.twimg.com/media/GMaAO8La4AA9rr4?format=jpg&name=large";

    useEffect(() => {
        loadName();
    }, []);

    const loadName = async () => {
        try {
            const savedName = await AsyncStorage.getItem('userName');
            if (savedName !== null) {
                setName(savedName);
            }
        } catch (error) {
            Alert.alert("Error", "Error Name not loaded!");
        }
    };

    const handleSubmit = async () => {
        const trimmedName = tempName.trim();
        if (trimmedName === "") {
            Alert.alert("Error", "Name cannot be empty or contain only spaces.");
            return;
        }
        try {
            await AsyncStorage.setItem('userName', trimmedName);
            setName(trimmedName);
        } catch (error) {
            Alert.alert("Error", "Error Name not updated!");
        }
    };

    const handleNameChange = (text: string): void => {
        setTempName(text);
    };

    return (
        <SafeAreaView className="bg-slate-800 flex-1">
            <View className="flex justify-center items-center bg-slate-800 h-48">
                <View className="bg-transparent items-center">
                    <View className="rounded-full bg-white w-20 h-20 overflow-hidden">
                        <Image source={{uri: imageUrl}} className="h-20 w-20" />
                    </View>
                    <Text className="pt-4 text-2xl font-bold text-slate-300">{name}</Text>
                </View>
            </View>
            <View className="bg-slate-950 rounded-t-3xl flex-1">
                <View className="bg-transparent flex-1 mt-5 mx-5">
                    <Text className="mb-3 mt-5 text-base">Name</Text>
                    <TextInput
                        value={tempName}
                        placeholder="Enter your name"
                        onChangeText={handleNameChange}
                        className="color-white bg-slate-800 h-10 px-3 rounded-xl"
                    />
                    <CustomButton title='Change Name' onPress={handleSubmit} />
                </View>
            </View>
        </SafeAreaView>
    );
}
