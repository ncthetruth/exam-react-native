import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import Carousel, { Pagination } from 'react-native-snap-carousel';

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  images: string[];
  brand: string;
  discountPercentage: number;
  description: string;
}

const windowWidth = Dimensions.get('window').width;

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const productData = await response.json();
        console.log('Fetched product data:', productData);
        setProduct(productData);
        navigation.setOptions({
          title: productData.title,
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#000000',
        });
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchProductDetail();
  }, [productId, navigation]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (carouselRef.current && product && product.images) {
        setActiveSlide((prevSlide) => {
          const nextSlide = prevSlide === product.images.length - 1 ? 0 : prevSlide + 1;
          if (carouselRef.current) {
            carouselRef.current.snapToItem(nextSlide);
          }
          return nextSlide;
        });
      }
    }, 2000);
  
    return () => clearInterval(intervalId);
  }, [product]);
  

  const handleSnapToItem = (index: number) => {
    setActiveSlide(index);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const renderRatingStars = () => {
    const rating = product.rating || 0;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push('★');
      } else {
        stars.push('☆');
      }
    }

    return (
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingStars}>{stars.join(' ')}</Text>
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
    );
  };

  const renderDiscountPrice = () => {
    if (product.discountPercentage && product.discountPercentage > 0) {
      const discountPrice = Math.ceil(product.price * (1 - product.discountPercentage / 100));
      const originalPrice = Math.ceil(product.price);
      const discountPercentage = Math.ceil(product.discountPercentage);

      return (
        <View style={styles.discountContainer}>
          <Text style={styles.discountPrice}>${discountPrice}</Text>
          <Text style={styles.originalPrice}>${originalPrice}</Text>
          <Text style={styles.discountPercentage}>{discountPercentage}%</Text>
        </View>
      );
    } else {
      return (
        <Text style={styles.price}>Price: ${Math.ceil(product.price)}</Text>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Carousel
              ref={carouselRef}
              data={product.images}
              renderItem={({ item }) => (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
                </View>
              )}
              sliderWidth={windowWidth}
              itemWidth={windowWidth}
              onSnapToItem={handleSnapToItem}
            />
            <Pagination
              dotsLength={product.images.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotStyle={styles.paginationDot}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.brand}>{product.brand}</Text>
              <Text style={styles.productName}>{product.title}</Text>
            </View>
            {renderRatingStars()}
            <Text style={styles.description}>{product.description}</Text>
            {renderDiscountPrice()}
            <View style={styles.addToCartContainer}>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={[styles.quantityButton, quantity === 1 && styles.quantityButtonMinus]}
                  onPress={decreaseQuantity}
                >
                  <Text style={[styles.quantityButtonText, quantity === 1 && { color: '#448A63' }]}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity style={[styles.quantityButton, styles.quantityButtonPlus]} onPress={increaseQuantity}>
                  <Text style={[styles.quantityButtonText, { color: '#FFFFFF' }]}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.addToCartButton}>
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    marginBottom: 20,
  },
  imageContainer: {
    width: windowWidth,
    height: windowWidth * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  titleContainer: {
    marginBottom: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#323232 ',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingStars: {
    fontSize: 20,
    marginRight: 5,
  },
  ratingText: {
    fontSize: 18,
    color: '#323232',
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  discountPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D10303',
  },
  originalPrice: {
    fontSize: 16,
    color: '#808080',
    textDecorationLine: 'line-through',
    marginLeft: 5,
    marginRight: 5,
  },
  discountPercentage: {
    fontSize: 16,
    color: '#D10303',
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000000',
  },
  brand: {
    fontSize: 16,
    marginBottom: 10,
    color: '#2A2A2A',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#5C5C5C',
  },
  addToCartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  quantityButtonMinus: {
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#448A63',
  },
  quantityButtonPlus: {
    backgroundColor: '#448A63',
    borderRadius: 5,
    marginLeft:5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#448A63',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 5,
    color: '#000000',
  },
  addToCartButton: {
    backgroundColor: '#448A63',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3A3F42',
    marginHorizontal: 8,
  },
});

export default ProductDetailScreen;
