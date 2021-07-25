import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Title, Avatar, Card, IconButton, Portal, Dialog, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { updatePhotoApi } from '../../api/User';
import useAuth from '../../hooks/useAuth';
import formStyle from '../../style/forms';
import { API_URL } from '../../utils/constants';
import colors from '../../style/colors';

export default function UserInfo(props) {
    const { user } = props;
    console.log(user.photo);
    const [image, setImage] = useState(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [height, setHeight] = useState(null)
    const { auth } = useAuth();
    ///Dialog
    const showDialog = () =>{
        setVisible(true);
    } 
    const hideDialog = () =>{
        setVisible(false);
        setImage(null);
    }

    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
    }, []);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            showDialog();
            setHeight(result.height);
        }
    };
    const uploadImage = async () => {
        let localUri = image;
        if (localUri == null || localUri == '') {
            console.log('Debe seleccionar una imágen')
        }
        else {
            let filename = localUri.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            let formData = new FormData();
            formData.append({ url: localUri, mime: filename, ext: type });
            console.log(formData);
            const response = updatePhotoApi(auth, formData);
            console.log(response);
        }
    
    };
    
    return (
        <View style={Styles.container}>
            <TouchableOpacity onPress={pickImage} >
                <Card mode="outlined" elevation={20}>
                    <Card.Title
                        title={user.name && user.lastname 
                            ? ` ${user.name} ${user.lastname}` 
                            : ` ${user.email}`}
                        subtitle={user.photo ? "Cambiar foto" : "Agregar foto"}
                        left={(props) => user.photo ? <Avatar.Image {...props} source={{ uri: API_URL+user.photo.url}} size={55} /> : <></>}
                        right={(props) => <IconButton {...props} icon="arrow-right" onPress={() => pickImage } />}
                    />
                </Card>
            </TouchableOpacity>
            <Portal>
            <Dialog visible={visible} onDismiss={hideDialog} >
                <Dialog.Title>¿Desea guardar imagen?</Dialog.Title>
                <Dialog.Content >
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </Dialog.Content>
                <Dialog.Actions>
                    <Button mode="contained" icon="file-upload" style={formStyle.btnSuccess} onPress={ uploadImage } >Si</Button>
                    <Button onPress={hideDialog}>No</Button>
                </Dialog.Actions>
            </Dialog>
            </Portal>
            

        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        height:50,
        justifyContent:"center",
        padding:20,
        marginTop:"10%",
    },
    title: {
        fontSize:20,
    },
    item:{
        padding:15,
        borderWidth:0.5,
        borderRightWidth: 0,
        borderLeftWidth:0,
        borderTopWidth:0,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

