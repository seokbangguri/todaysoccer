import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Animated, {
  AnimatedStyleProp,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  useDrawerProgress,
} from '@react-navigation/drawer';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyPressable from './components/MyPressable';
import { AppImages } from './assets';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';
import RNRestart from 'react-native-restart';


const FeedbackScene: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<DrawerNavigationProp<{}>>();
  const { top } = useSafeAreaInsets();
  const progress = useDrawerProgress();

  const drawerStyle = useAnimatedStyle(() => {
    const drawerProgress = progress as Animated.SharedValue<number>;

    return {
      transform: [
        { rotate: `${interpolate(drawerProgress.value+1, [0, 1], [0.5, 0])}rad` },
        { scale: interpolate(drawerProgress.value, [0, 1], [0.9, 1]) },
      ],
    };
  }, []);

  const [id, setid] = useState('');
  const [teamimg, setteamimg] = useState('');
  const [logoimg, setlogoimg] = useState(AppImages.EPL);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    getdata();
  }, []);
  
  const getdata =async () => {
    const value = await AsyncStorage.getItem('id'); // 'key'에 해당하는 데이터 가져오기
    const teamvalue = await AsyncStorage.getItem('team'); // 'key'에 해당하는 데이터 가져오기
    if (value !== null && teamvalue !== null) {
      // 데이터가 존재할 경우 처리
      setid(value); // 가져온 데이터를 상태에 저장
      setteamimg(teamvalue);
      switch (teamvalue){
        case 'MCI':
          setlogoimg(AppImages.MCI);
          break;
        case 'ARS':
          setlogoimg(AppImages.ARS);
          break;
        case 'MUM':
          setlogoimg(AppImages.MUM);
          break;
        case 'NEW':
          setlogoimg(AppImages.NEW);
          break;
        case 'LIV':
          setlogoimg(AppImages.LIV);
          break;
        case 'BHA':
          setlogoimg(AppImages.BHA);
          break;
        case 'AVL':
          setlogoimg(AppImages.AVL);
          break;
        case 'TOT':
          setlogoimg(AppImages.TOT);
          break;
        case 'BRE':
          setlogoimg(AppImages.BRE);
          break;
        case 'FUL':
          setlogoimg(AppImages.FUL);
          break;
        case 'CRY':
          setlogoimg(AppImages.CRY);
          break;
        case 'CHE':
          setlogoimg(AppImages.CHE);
          break;
        case 'WOL':
          setlogoimg(AppImages.WOL);
          break;
        case 'WHU':
          setlogoimg(AppImages.WHU);
          break;
        case 'BOU':
          setlogoimg(AppImages.BOU);
          break;
        case 'NFO':
          setlogoimg(AppImages.NFO);
          break;
        case 'EVE':
          setlogoimg(AppImages.EVE);
          break;
        case 'LEI':
          setlogoimg(AppImages.LEI);
          break;
        case 'LEE':
          setlogoimg(AppImages.LEE);
          break;
        case 'SOU':
          setlogoimg(AppImages.SOU);
          break;
      }
    }
  };

  const imageSize = width - 32;
  const marginTop = Platform.OS === 'ios' ? top : StatusBar.currentHeight ?? 24;
  const data = [
    {key: '1',  value:'MCI'},
    {key: '2',  value:'ARS'},
    {key: '3',  value:'MUM'},
    {key: '4',  value:'NEW'},
    {key: '5',  value:'LIV'},
    {key: '6',  value:'BHA'},
    {key: '7',  value:'AVL'},
    {key: '8',  value:'TOT'},
    {key: '9',  value:'BRE'},
    {key: '10', value:'FUL'},
    {key: '11', value:'CRY'},
    {key: '12', value:'CHE'},
    {key: '13', value:'WOL'},
    {key: '14', value:'WHU'},
    {key: '15', value:'BOU'},
    {key: '16', value:'NFO'},
    {key: '17', value:'EVE'},
    {key: '18', value:'LEI'},
    {key: '19', value:'LEE'},
    {key: '20', value:'SOU'}
  ];
  const updateEvent = async () => {
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('team', selected);

      await axios.post('http://34.64.150.171/update_event.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSelected('');
      //await AsyncStorage.setItem('team', selected);
      await AsyncStorage.setItem('loginteam', selected);
      getdata();
      RNRestart.Restart();
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={{ flex: 1, backgroundColor: '#FEFEFE', alignItems: 'center'}}
    >
      <View
        style={{ justifyContent: 'center', alignItems: 'center' , width: 400}}
        >
       <Animated.View
          style={[styles.drawerAvatarStyle, styles.avatarShadow, styles.userlogo, drawerStyle]}
        >
          <Animated.Image
            style={styles.drawerAvatarStyle}
            source={logoimg}
          />
        </Animated.View>
        <Text style={{marginTop: 20, fontSize: 30, fontWeight: 'bold'}}>{id} 님</Text>
        <Text style={{marginTop: 20, marginBottom: 20, fontSize: 30, fontWeight: 'bold'}}>응원 팀 : {teamimg}</Text>
        <SelectList
            setSelected={(val:any) => setSelected(val)}
            data={data}
            save="value"
          />
          <TouchableOpacity style={styles.addButton} onPress={updateEvent}>
            <Text style={styles.saveButtonText}>응원 팀 수정하기</Text>
          </TouchableOpacity>
      </View>
      
      <MyPressable
        style={[styles.menuBtn, { marginTop: marginTop + 8 }]}
        android_ripple={{ color: 'grey', radius: 20, borderless: true }}
        onPress={() => navigation.openDrawer()}
      >
        <Icon name="menu" size={25} color="black" />
      </MyPressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#FEFEFE',
    alignSelf: 'center',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'WorkSans-Bold',
    textAlign: 'center',
    paddingTop: 8,
  },
  subTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    textAlign: 'center',
    paddingTop: 16,
  },
  inputContainer: {
    minHeight: 80,
    maxHeight: 160,
    marginTop: 16,
    marginHorizontal: 32,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 8,
    shadowColor: 'rgba(158, 158, 158, 0.8)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  input: {
    height: 48,
    color: 'black',
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    textAlignVertical: 'top',
  },
  button: {
    width: 120,
    height: 40,
    padding: 8,
    marginTop: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
    borderRadius: 4,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    padding: 4,
  },
  menuBtn: {
    position: 'absolute',
    padding: 8,
    left: 8,
  },
  userlogo: {
    marginTop: 100,
  },
  drawerAvatarStyle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: "contain",
  },
  avatarShadow: {
    backgroundColor: 'white',
    elevation: 24,
    shadowColor: '#3A5160',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  addButton: {
    backgroundColor: '#abc8ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default FeedbackScene;
