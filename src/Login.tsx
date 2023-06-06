import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
  Alert,
} from 'react-native';
import { CheckBox, Image } from 'react-native-elements';
import { AppImages } from './assets';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppControlFlow from './AppControlFlow';
import { SelectList } from 'react-native-dropdown-select-list';


const Login = () => {
  const [isChecked, setChecked] = useState(false);
  const [events, setEvents] = useState([]);
  const [isAddEventVisible, setIsAddEventVisible] = useState(false);
  const [mainscreenVisible, setmainscreenVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selected, setSelected] = useState('');

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

  const comeback = () => {
    setmainscreenVisible(false);
  };

  useEffect(() => {
    fetchEvents();
    getdata();
  }, []);
  
  const getdata =async () => {
    try {
      const idvalue = await AsyncStorage.getItem('loginid'); // 'key'에 해당하는 데이터 가져오기
      const teamvalue = await AsyncStorage.getItem('loginteam'); // 'key'에 해당하는 데이터 가져오기
      if ((idvalue !== null || idvalue == "") && (teamvalue !== null || teamvalue == "")) {
        // 데이터가 존재할 경우 처리
        setmainscreenVisible(true);
        await AsyncStorage.setItem('id', idvalue);
        await AsyncStorage.setItem('team', teamvalue);
      }
    } catch (error) {
      // 에러 처리
      console.log(error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://34.64.150.171/get_event.php');
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addEvent = async () => {
    if (title.length < 4 || description.length < 4) {
      Alert.alert('4글자 이상 입력하시오.');
    }
    else{
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('team', selected);

      await axios.post('http://34.64.150.171/add_event.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTitle('');
      setDescription('');
      setSelected('');
      fetchEvents();
      console.log(formData);
      Alert.alert('회원가입 성공!');
      setIsAddEventVisible(false);
    } catch (error) {
      console.error(error);
      Alert.alert(String(error));
    }
    }
  };


  const checkEvent = async () => {
    if (title.length < 4 || description.length < 4) {
        Alert.alert('4글자 이상 입력하시오.');
    }else{
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
      
            const response = await axios.post('http://34.64.150.171/check_event.php', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            setTitle('');
            setDescription('');
            fetchEvents();

            if(response.data[0]['id']) {
                await AsyncStorage.setItem('id', response.data[0]['id']);
                await AsyncStorage.setItem('team', response.data[0]['team']);
                if(isChecked == true){
                  await AsyncStorage.setItem('loginid', response.data[0]['id']);
                  await AsyncStorage.setItem('loginteam', response.data[0]['team']);
                }
                //로그인 성공 코드
                //navigation.navigate('ACF');
                console.log(response);
                Alert.alert('로그인 성공!');
                setmainscreenVisible(true);
            }
            else if(!response.data.success) {
                Alert.alert('입력하신 내용을 다시 확인해주세요.');
                console.log(response);
            }
        } catch (error) {
            setTitle('');
            setDescription('');
            fetchEvents();
            Alert.alert('로그인 실패');
        }
    }
  };


  return (
    <View style={styles.fullcontainer}>
    {!mainscreenVisible ? (
    <>
    <View style={styles.container}>
      {!isAddEventVisible ? (
        <>
        <View style={{backgroundColor: 'white', borderRadius: 20, padding: 50, height: 550}}>
          <Text style={styles.header}>TODAY SOCCER</Text>
          <TextInput
            style={styles.input}
            placeholder="이름"
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="비밀번호"
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
          <CheckBox
            title='로그인 정보 저장'
            checked={isChecked}
            onPress={() => setChecked(!isChecked)}
            checkedIcon={<Image source={AppImages.heart} style={{width:15, height:15}}/>} // 체크된 상태에서 보여줄 아이콘 설정
            uncheckedIcon={<Image source={AppImages.emptyheart} style={{width:15, height:15}}/>} // 체크되지 않은 상태에서 보여줄 아이콘 설정
            />
          <TouchableOpacity style={styles.addButton} onPress={checkEvent}>
            <Text style={styles.saveButtonText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => setIsAddEventVisible(true)}>
            <Text style={styles.signupButtonText}>회원가입</Text>
          </TouchableOpacity></View>
        </>
      ) : (
        <>
        <View style={{backgroundColor: 'white', borderRadius: 20, padding: 50, height: 550}}>
          <Text style={styles.header}>회원가입</Text>
          <TextInput
            style={styles.input}
            placeholder="이름"
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
          <TextInput
            style={[styles.input, {marginBottom: 0}]}
            secureTextEntry={true}
            placeholder="비밀번호"
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
          <SelectList
            boxStyles={{marginTop: 20}}
            setSelected={(val:any) => setSelected(val)}
            data={data}
            save="value"
          />
          <TouchableOpacity style={styles.addButton} onPress={addEvent}>
            <Text style={styles.saveButtonText}>회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => setIsAddEventVisible(false)}>
            <Text style={styles.signupButtonText}>로그인</Text>
          </TouchableOpacity>
          </View>
        </>
      )}
    </View>
    </>
    ) : (
    <>
    <AppControlFlow/>
    </>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#abc8ff',
    
  },
  fullcontainer: {
    flex: 1,
    backgroundColor: '#abc8ff',
    
  },
    buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black'
  },
  eventItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 12,
    color: '#999999',
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
  signupButton: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignSelf: 'center',
    marginBottom: 120,
  },
  signupButtonText: {
    color: 'blue',
    fontSize: 15,
    fontWeight: 'bold',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignSelf: 'center',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#999999',
    alignItems: 'center',
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    paddingVertical: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: '#999999',
    alignItems: 'center',
    padding: 20,
    
    marginBottom: 5,
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});



export default Login;