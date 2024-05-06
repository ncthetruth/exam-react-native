import React from 'react';
import { View, Text, Image } from 'react-native';

interface ProductCardProps {
    imageUrl: string,
    productName: string,
    productRate: number,
    productPrice: number
}

const ProductCard: React.FC<ProductCardProps> = ({
    imageUrl,
    productName,
    productRate,
    productPrice
}) => {
    const rateRoundedString = productRate.toFixed(1).toString();
    const priceString = productPrice.toFixed(2).toString(); 

    return (
        <View className="h-60 w-full p-2">
            <View className="bg-slate-800 flex-1 rounded-lg overflow-hidden">
                <View className="bg-slate-700 h-36 justify-center">
                    <Image source={{uri: imageUrl}} className="h-36" />
                </View>
                <Text numberOfLines={1} className="truncate text-ellipsis text-lg text-white font-semibold mx-3 mt-2 border-b border-green-400">
                    {productName}
                </Text>
                <View className='flex-row items-baseline mx-3 mt-3'>
                    <Text className="flex-1 text-xs font-medium text-slate-400">
                        Rating: {rateRoundedString} / 5
                    </Text>
                    <Text className="text-xl text-right font-extralight text-green-500 mt-1">
                        {priceString} $
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ProductCard;