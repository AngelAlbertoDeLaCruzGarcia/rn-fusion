import React, { useEffect } from 'react'
import {View, Modal, } from 'react-native';
import { Button } from 'react-native-paper';
import ImageViewer from 'react-native-image-zoom-viewer';

import formStyle from '../../style/forms';
export default function Zoom(props) {
    const { imgs, visible, closeZoomImg, indexZ } = props;
    let images = [];
    let total = imgs.length - 1;
    imgs.map( (img) => images.push({url:img}), --total )
    
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeZoomImg} >
                <ImageViewer index={indexZ} imageUrls={images}/>
                <Button style={formStyle.btnSuccess} icon="arrow-left-thick"
                mode="contained" onPress={ closeZoomImg }>Regresar</Button>              
        </Modal>
    )
}