import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
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
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';

const HelpScene: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<DrawerNavigationProp<{}>>();
  const { top } = useSafeAreaInsets();
  const data = [
    {rankingtable: 1}
  ];

  const [teamimg, setteamimg] = useState('ARS');
  const getStorage = async () => {
    const teamvalue = await AsyncStorage.getItem('team');
    console.log(teamvalue);
    if(teamvalue !== null){
      setteamimg(teamvalue);
    }
  };

  const [selected, setSelected] = useState('');
  const get_news = async () => {
    try {
      const formData = new FormData();
      formData.append('teamimg', teamimg);

      const response = await axios.post('http://34.64.150.171/test.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setnews(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // getStorage();
  // get_news();

  const [news, setnews] = useState([]);

  
  useEffect(() => {
    getStorage();
    get_news();
    /*
    fetch('http://34.64.150.171/get_news.php')
    .then(response => response.json())
    .then(jsonData => {
      // 받은 JSON 데이터를 처리하는 로직
      //setnews(jsonData);
    })
    .catch(error => {
      // 에러 처리
      console.error(error);
    });
    */
  }, [teamimg]);
  
  const seldata = [
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

  const imageSize = width - 32;
  const marginTop = Platform.OS === 'ios' ? top : StatusBar.currentHeight ?? 24;


  // const changeteam =async (i:string) => {
  //   switch(i){
  //     case 'MCI':
  //       setteamimg('Manchester City');
  //       break;
  //     case 'ARS':
  //       setteamimg('Arsenal');
  //       break;
  //     case 'MUM':
  //       setteamimg('Manchester United');
  //       break;
  //     case 'NEW':
  //       setteamimg('Newcastle United');
  //       break;
  //     case 'LIV':
  //       setteamimg('Liverpool');
  //       break;
  //     case 'BHA':
  //       setteamimg('Brighton and Hove Albion');
  //       break;
  //     case 'AVL':
  //       setteamimg('Aston Villa');
  //       break;
  //     case 'TOT':
  //       setteamimg('Tottenham Hotspur');
  //       break;
  //     case 'BRE':
  //       setteamimg('Brentford');
  //       break;
  //     case 'FUL':
  //       setteamimg('Fulham');
  //       break;
  //     case 'CRY':
  //       setteamimg('Crystal Palace');
  //       break;
  //     case 'CHE':
  //       setteamimg('Chelsea');
  //       break;
  //     case 'WOL':
  //       setteamimg('Wolverhampton Wanderers');
  //       break;
  //     case 'WHU':
  //       setteamimg('West Ham United');
  //       break;
  //     case 'BOU':
  //       setteamimg('Bournemouth');
  //       break;
  //     case 'NFO':
  //       setteamimg('Nottingham Forest');
  //       break;
  //     case 'EVE':
  //       setteamimg('Everton');
  //       break;
  //     case 'LEI':
  //       setteamimg('Leicester City');
  //       break;
  //     case 'LEE':
  //       setteamimg('Leeds United');
  //       break;
  //     case 'SOU':
  //       setteamimg('Southampton');
  //       break;
  //     default:
  //       setteamimg('error');
  //   }
  // };
  /*
  return 'Manchester City';
  return 'Arsenal';
  return 'Manchester United';
  return 'Newcastle United';
  return 'Liverpool';
  return 'Brighton and Hove Albion';
  return 'Aston Villa';
  return 'Tottenham Hotspur';
  return 'Brentford';
  return 'Fulham';
  return 'Crystal Palace';
  return 'Chelsea';
  return 'Wolverhampton Wanderers';
  return 'West Ham United';
  return 'Bournemouth';
  return 'Nottingham Forest';
  return 'Everton';
  return 'Leicester City';
  return 'Leeds United';
  return 'Southampton';

  // */


  


  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={{ flex: 1, backgroundColor: '#FEFEFE', alignItems: 'center' }}
    >
      <View style={styles.headerContainer}>
        <MyPressable
          style={{ marginLeft: 8 }}
          android_ripple={{ color: 'grey', radius: 20, borderless: true }}
          touchOpacity={0.6}
          onPress={() => navigation.toggleDrawer()}
        >
          <Icon name="menu" size={25} color="black" />
        </MyPressable>
        <Text style={styles.headerText}>TODAY SOCCER</Text>
        
      </View>
      <FlatList
      style={{marginTop: 0, width: 400,}}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Text style={styles.title}>팀 뉴스</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeader, {flex: 1}]}>날짜</Text>
              <Text style={[styles.tableHeader, {flex: 3}]}>기사</Text>
              <Text style={[styles.tableHeader, {flex: 1}]}>뉴스사</Text>
            </View>
            {news.map((news, index) => (
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, {flex: 1}]}>{news.date}</Text>
              <TouchableOpacity onPress={() => Linking.openURL(news.link)}
              style={{flex: 3}}>
                <Text style={styles.tableCell}>{news.name}</Text>
              </TouchableOpacity>
              <Text style={[styles.tableCell, {flex: 1}]}>{news.brand}</Text>
            </View>
            ))}
          </View>
        </View>
      )}
    />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 0,
    marginTop: 20,
  },
  headerText: {
    flex: 1,
    color: 'black',
    fontSize: 22,
    fontFamily: 'WorkSans-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingRight: 20,
  },
  image: {
    backgroundColor: '#FEFEFE',
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    textAlign: 'center',
    paddingTop: 16,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 140,
    height: 40,
    padding: 8,
    backgroundColor: 'dodgerblue',
    borderRadius: 4,
    elevation: 8,
    justifyContent: 'center',
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
  container: {
    flex: 1,
    padding: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderWidth:1,
    borderColor: 'rgba(128,128,128,0.5)',
  },
  tableHeader: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    fontSize: 11,
  },
  tableCell: {
    padding: 10,
    fontSize: 10,
  },
});

export default HelpScene;
