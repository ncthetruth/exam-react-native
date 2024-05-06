import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useLocalSearchParams } from 'expo-router';

interface params {
    fromScreen?: string;
}


export default function CrudMenuScreen() {
    const params = useLocalSearchParams<{ fromScreen: string }>();
    console.log(params.fromScreen)
  return (
    <SafeAreaView className="flex-1 bg-slate-950">
        <View className='flex-1 mt-10 mx-5 justify-center'>
            <Text className='text-center font-black text-2xl text-slate-300 mb-5'>Welcome to CRUD Menu !</Text>
            
            <Link href='/createScreen' asChild>
                <TouchableOpacity>
                    <View className='border rounded-xl border-slate-300 p-5 mb-5'>
                        <Text className='text-lg text-center text-slate-300 font-light tracking-widest uppercase'>Create</Text>
                    </View>
                </TouchableOpacity>
            </Link>

            
            <Link href='/(tabs)/productListScreen' asChild>
                <TouchableOpacity>
                    <View className='border rounded-xl border-slate-300 p-5 mb-5'>
                        <Text className='text-lg text-center text-slate-300 font-light tracking-widest uppercase'>Read</Text>
                    </View>
                </TouchableOpacity>
            </Link>

            <Link href='/updateScreen' asChild>
            <TouchableOpacity>
                <View className='border rounded-xl border-slate-300 p-5 mb-5'>
                    <Text className='text-lg text-center text-slate-300 font-light tracking-widest uppercase'>Update</Text>
                </View>
            </TouchableOpacity>
            </Link>

            <Link href='/deleteScreen' asChild>
            <TouchableOpacity>
                <View className='border rounded-xl border-slate-300 p-5 mb-5'>
                    <Text className='text-lg text-center text-slate-300 font-light tracking-widest uppercase'>Delete</Text>
                </View>
            </TouchableOpacity>
            </Link>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  iconStyle: {
    marginBottom: 30,
  }
});
