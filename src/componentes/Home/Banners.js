import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box';
import { API_URL } from '../../utils/constants';
import { getHomeBannerApi } from "../../api/HomeBanner"
import { useNavigation } from '@react-navigation/native';
import colors from '../../style/colors';
export default function Banners() {
    const nav = useNavigation();
    const [banners, setBanners] = useState([])
    useEffect(() => {
      (async () => {
        let controller = new AbortController();
        let signal = controller.signal;
        const response = await getHomeBannerApi(signal);
        setBanners(response);
        controller.abort();
      })()
    }, [setBanners])

    if(!banners) return null;
    const imgs = banners.map( (item) => `${API_URL}${item.banner.url}` );
    const id = banners.map( (item) => item.product._id );
    const goToProduct = (id) => {
        nav.push("ProductDetails",{ idProd: id });
    }
    return (
        <SafeAreaView>
          <SliderBox
            images={imgs}
            sliderBoxHeight={150}
            onCurrentImagePressed={index =>
                goToProduct(id[index])
              //console.warn(`image ${index} pressed`)
            }
            ///currentImageEmitter={index => console.warn(`imagessss ${index} pressed`)}
            dotColor={colors.success}
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            paginationBoxStyle={Styles.pagination}
            dotStyle={Styles.dots}
            circleLoop
            autoplay
            resizeMethod={'resize'}
            resizeMode={'cover'}
            ImageComponentStyle={Styles.imgStyle}
            imageLoadingColor={colors.success}
          />
        </SafeAreaView>
      );
  
  }
  
  const Styles = StyleSheet.create({
    dots:{
      width: 20,
      height: 20,
      borderRadius: 15,
      marginHorizontal: 0,
      padding: 0,
      margin: 0,
      backgroundColor: 'rgba(128, 128, 128, 0.92)',
    },
    pagination:{
      position: 'absolute',
      bottom: 0,
      padding: 0,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
    },
    imgStyle: {
        borderRadius: 0, width: '100%'
    },
  });