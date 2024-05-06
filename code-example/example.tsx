import { useState } from "react"
import { Controller, useForm } from "react-hook-form";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from "react-native"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const createProductFormSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    })
})

export const CreateProductScreen: React.FC = () => {

    type SubmitForm = {
        name: string,
        // price: number,
        // discount: number,
        // rating: number,
        // description: string,
    }

    const { control, handleSubmit, formState: { errors } } = useForm<SubmitForm>({
        resolver: zodResolver(createProductFormSchema)
    })

    async function onPressSubmit(data: SubmitForm) {

        const response = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        console.log(await response.json())
    }
    
    return (
        <View style={styles.container}>
            <Text>Name</Text>
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextInput style={styles.form} value={value} onChangeText={onChange}/>
                )}
                name="name"
            />
            {errors.name && <Text>Error</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onPressSubmit)}>
                <Text style={styles.buttonText}>
                    SUBMIT
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10,
        marginBottom: 3
    },
    bold: {
        fontWeight: 'bold',
    },
    form: {
        height: 50,
        marginTop: 10,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    formBig: {
        height: 100,
        marginTop: 10,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#b0456e',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})
  