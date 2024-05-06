import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import ProductCard from '@/components/ProductListComponents/ProductCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Product, ProductPaging } from '@/interfaces/ProductInterfaces';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ProductListScreen() {
    const [productList, setProductList] = useState<Product[]>([]);
    const [testState, setTestState] = useState<string>('');

    const { data, fetchNextPage, hasNextPage, refetch, isFetching } = useInfiniteQuery<ProductPaging>({
        queryKey: ['products'],
        initialPageParam: 0,
        queryFn: async ({ pageParam }) => {
            console.log('pagePatram: ', pageParam);
            const response = await fetch(`https://dummyjson.com/products?skip=${pageParam}`);
            return response.json();
        },
        getNextPageParam: (lastPage) => {
            console.log('lastPageSkip: ', lastPage.skip);
            console.log('lastPageLimit: ', lastPage.limit);
            if (lastPage.skip + lastPage.limit >= lastPage.total) return undefined;
            return lastPage.limit + lastPage.skip;
        }
    });

    useEffect(() => {
        const newProductList = data?.pages.flatMap((page) => {
            return page.products;
        });

        newProductList && setProductList(newProductList);
    }, [data])

    const navigation = useNavigation();

    const navigateToProductDetails = (productId: number) => {
        navigation.navigate('productDetail', { productId });
    }

    return data && (
        <View className="mt-6 mx-2 flex-1">
            <FlatList
                data={productList}
                keyExtractor={(item: Product) => item.id.toString()}
                onEndReached={() => {
                    console.log('has next page: ', hasNextPage)
                    if(hasNextPage){
                        console.log('End reached');
                        fetchNextPage()
                    }
                }}
                onRefresh={() => {refetch()}}
                refreshing={isFetching}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigateToProductDetails(item.id)}>
                        <ProductCard
                            imageUrl={item.thumbnail}
                            productName={item.title}
                            productRate={item.rating}   
                            productPrice={item.price}
                        />
                    </TouchableOpacity>
                )} />
        </View>
    );
}
