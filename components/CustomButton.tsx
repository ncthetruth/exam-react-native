import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
    onPress?: () => void;
    addClass?: string;
    title?: string
  }

const CustomButton: React.FC<CustomButtonProps> = ({addClass, onPress, title}) => {
    let classNameFromProp = "py-3 bg-slate-500 rounded-xl my-5";
    
    if (addClass){
        classNameFromProp += ` ${addClass}`
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View className={classNameFromProp}>
                <Text className="color-white tracking-widest text-center uppercase font-extrabold">{title ?? 'Submit'}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CustomButton;