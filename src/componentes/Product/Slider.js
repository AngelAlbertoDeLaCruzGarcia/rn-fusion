import React, { useState, useEffect, Component } from 'react';
import {StyleSheet, SafeAreaView, Modal,Text} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import Zoom from './Zoom';
import { API_URL } from '../../utils/constants';
import colors from '../../style/colors';
export default function Slider(props){
    const { images } = props;
    const imgs = images.map((image)=>`${API_URL}${image.url}` );
    const [modalV, setModalV] = useState(false)
    const [index, setIndex] = useState(0);
    
    const openZoomImg = (index) => {
       setModalV(true);
       setIndex(index);
    };
    const closeZoomImg = () => { setModalV(false); }
    return (
      <SafeAreaView>
        <SliderBox
          images={imgs}
          sliderBoxHeight={500}
          onCurrentImagePressed={index =>
            openZoomImg(index)
            //console.warn(`image ${index} pressed`)
          }
          ///currentImageEmitter={index => console.warn(`imagessss ${index} pressed`)}
          dotColor={colors.success}
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          paginationBoxStyle={Styles.pagination}
          dotStyle={Styles.dots}
          circleLoop
          resizeMethod={'resize'}
          resizeMode={'cover'}
          ImageComponentStyle={Styles.imgStyle}
          imageLoadingColor={colors.success}
        />
        <Zoom imgs={imgs} visible={modalV} closeZoomImg={closeZoomImg} indexZ={index} />
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
    borderRadius: 15, width: '90%', marginTop: 5
  },
});