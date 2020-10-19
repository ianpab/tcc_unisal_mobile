import React, { useState, useEffect} from 'react';
import { Text, View , Image, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';


interface IIBGEResponse {
  sigla: string;
}

interface IIBGECityResponse {
  nome: string;
}


const Home = () => {
  const navigation = useNavigation();


  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

 
  const pickerSelectStyles = {
    inputAndroid: {
      height: 60,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
      color: '#000000',
    },
    inputIOS: {
      height: 60,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
      color: '#000000',
    },
    placeholder: { color: '#999999' },
  };

  useEffect(() => {
    if (selectedUf === '0') return;

    axios
      .get<IIBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`,
      )
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  useEffect(() => {
    axios
      .get<IIBGEResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
      )
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);
  

    return(
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ImageBackground  
        source={require('../../assets/home-background.png')} 
        style={styles.container} 
        imageStyle={{ width: 274, height: 368, marginLeft:20,}}>
            <View style={styles.main}>
             <View style={styles.h1}>
             <Text style={styles.title}>Seu espaço para apoiar vidas!</Text>
             <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de doação.</Text>
             </View>
             </View>
            <View style={styles.footer}>
            <RNPickerSelect
            placeholder={{
              color: '#999999',
              label: 'Selecione a UF',
            }}
            value={selectedUf}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            onValueChange={setSelectedUf}
            items={ufs?.map(uf => ({
              label: uf,
              value: uf,
            }))}
          />
          <RNPickerSelect
            placeholder={{
              label: 'Selecione a Cidade',
            }}
            value={selectedCity}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            onValueChange={setSelectedCity}
            items={cities?.map(city => ({
              label: city,
              value: city,
            }))}
          />
                <RectButton style={styles.button} onPress={() =>
              navigation.navigate('Points', {
                uf: selectedUf,
                city: selectedCity,
              })}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            < Icon name="arrow-right" color="#FFF" size={24}></Icon>
                        </Text>
                    </View>
                   <Text style={styles.buttonText}>Entrar</Text>
                </RectButton>
            </View>
        </ImageBackground>
        </KeyboardAvoidingView>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      marginTop: 20
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },

    h1: {
      marginTop: 134,
    },
   
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });


