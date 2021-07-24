import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Card, Avatar, Button, IconButton, Title, Paragraph, Portal, Dialog, TextInput,} from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {map} from "lodash"
import {useFormik} from "formik";
import * as Yup from "yup";
import colors from '../../style/colors'
import formStyle from '../../style/forms';
let quantityform = 0;
export default function Quantity(props) {
    const { product, cant, cambiarCant } = props;
    //console.log(product);
    const [visible, setVisible] = useState(false);
    const [input, setInput] = useState(false);
    const [loading, setLoading] = useState(false);

    ///Dialog
    const showDialog = () =>{
        setVisible(true);
        setInput(false);
    } 
    const hideDialog = () => setVisible(false);

    const formik = useFormik({
        initialValues: valInicial(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (formData) => {
            setLoading(true);
            try {
                cambiarCant(formData.cantProd);

            } catch (error) {
                console.log(error);
            }
            setLoading(false);
            hideDialog();
        }
    })
    
    ///Llena el array de cantidad de productos
    let DataQuantity = new Array();
    let i = 0, n = 1, texto = "unidad", vueltas = 6 ;
    if(product.quantity < 6) vueltas = product.quantity;

    for( i = vueltas; i > 0; i--){   
        DataQuantity.push({
            title: `${n} ${texto}`,
            value: n,
        });
        texto = "unidades";
        n++;
    }
    
    const mostrarIput = () =>{
        setInput(true);
    }
    ///Numero de validacion del input
    quantityform =+ product.quantity;
    return (
        <View>
            { product.quantity > 1 ? (
                <>
                    <Text style={Styles.stock}>En stock: {product.quantity}</Text>
                    <Card mode="outline" style={Styles.container} elevation={10} onPress={showDialog} >
                        <Card.Title title={`Cantidad: ${cant}`}
                            left={(props) => <Avatar.Icon {...props} backgroundColor={colors.success} icon="numeric" />}
                            right={(props) => <IconButton {...props} icon="arrow-right" />}
                        />
                    </Card>
                </>
            ):
                <Text style={Styles.stock} >!Ultimo producto!</Text>
            }
            <Portal>
            <Dialog visible={visible} onDismiss={hideDialog} >
                <Dialog.Title>Elegir cantidad</Dialog.Title>
                <Dialog.Content >
                    { !input ? ( map(DataQuantity, (item, index) =>(
                        <TouchableOpacity key={item.value} onPress={ () => { cambiarCant(index+1); hideDialog(); } } 
                            style={[index === cant - 1 ? ( Styles.item ) : Styles.plus]} >
                                <Title>{item.title}</Title>
                                <Text><MaterialCommunityIcons name="arrow-right" size={26} /></Text>                                  
                        </TouchableOpacity> 
                        ))
                        ) : (
                            <>
                                <TextInput label="Cantidad" style={formStyle.input} placeholder="XXX" keyboardType="numeric" maxLength={3}
                                    onChangeText={ (text) => formik.setFieldValue("cantProd", text)}
                                    value={formik.values.cantProd} error={formik.errors.cantProd}
                                    
                                /> 
                                <Button mode="contained" style={ formStyle.btnSuccess } loading={loading} 
                                    onPress={ formik.handleSubmit } >
                                    Guardar
                                </Button>
                            </>
                        )
                    } 
                    { !input && product.quantity > 6 ? (
                        <TouchableOpacity onPress={mostrarIput} style={Styles.plus}>
                                <Title>Mas de 6 unidades </Title>
                                <Text><MaterialCommunityIcons name="plus" size={26} /></Text>                                  
                        </TouchableOpacity> 
                        ) : (
                            <></>
                        )
                    }

                </Dialog.Content>

            </Dialog>
            </Portal>
        </View>
    )
}
function valInicial(){
    return {
        cantProd:"",
    }
}
function validationSchema() {
    return{
        cantProd: Yup.number().positive().integer().min(1,true).max(quantityform,true).required(true),
    }
}
const Styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor:colors.gray
    },
    plus:{
        padding:15,
        borderWidth:0.5,
        borderRightWidth: 0,
        borderLeftWidth:0,
        borderTopWidth:0,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    item:{
        padding:15,
        borderWidth:0.5,
        borderRightWidth: 0,
        borderLeftWidth:0,
        borderTopWidth:0,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor:colors.success
    },
    stock:{ fontWeight: "bold" },
})
