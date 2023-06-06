import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Image,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  useDrawerProgress,
} from '@react-navigation/drawer';
import { DrawerActions, NavigationState } from '@react-navigation/native';
import Animated, {
  AnimatedStyleProp,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyPressable from './components/MyPressable';
import { AppImages } from './assets';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from './Login';
import RNRestart from 'react-native-restart';
import axios from 'axios';

type DrawerScene = {
  label: string;
  icon: any;
  isAssetIcon?: boolean;
  routeKey?: string;
};

interface DrawerItemProps extends DrawerScene {
  bgAnimStyle: AnimatedStyleProp<ViewStyle>;
}

const DRAWER_SCENES: DrawerScene[] = [
  { label: '홈', icon: AppImages.home, isAssetIcon: true, routeKey: 'home' },
  {
    label: '응원 팀',
    icon: AppImages.cheering,
    isAssetIcon: true,
    routeKey: 'help',
  },
  { label: '내 정보', icon: AppImages.user, isAssetIcon: true, routeKey: 'feedback' },
  //{ label: 'Invite Friend', icon: 'group', routeKey: 'invite_friend' },
  //{ label: 'Rate the app', icon: 'share' },
  //{ label: 'About Us', icon: 'info' },
];

const getActiveRouteState = (
  routes: NavigationState['routes'],
  index: number,
  routeKey: string,
) => routes[index].name.toLowerCase().indexOf(routeKey?.toLowerCase()) >= 0;

const DrawerItemRow: React.FC<
  DrawerItemProps & DrawerContentComponentProps
> = props => {
  const {
    state,
    label,
    icon,
    isAssetIcon = false,
    routeKey,
    bgAnimStyle,
  } = props;
  const { routes, index } = state;

  const sceneOptions = props.descriptors[routes[index].key]?.options;

  const window = useWindowDimensions();
  const rowWidth = (window.width * 0.75 * 80) / 100;

  const focused = routeKey
    ? getActiveRouteState(routes, index, routeKey)
    : false;

  const tintColor = focused
    ? sceneOptions?.drawerActiveBackgroundColor
    : 'black';

  return (
    <MyPressable
      style={styles.drawerRowStyle}
      touchOpacity={0.6}
      onPress={() =>
        routeKey
          ? props.navigation.navigate(routeKey)
          : props.navigation.dispatch(DrawerActions.closeDrawer())
      }
    >
      <Animated.View
        style={[
          styles.drawerRowbackViewStyle,
          {
            width: rowWidth,
            backgroundColor: focused
              ? sceneOptions?.drawerActiveBackgroundColor
              : sceneOptions?.drawerInactiveBackgroundColor,
          },
          bgAnimStyle,
        ]}
      />
      <View style={styles.drawerRowContentContainer}>
        {isAssetIcon ? (
          <Image
            source={icon}
            style={{ width: 24, height: 24, tintColor }}
            resizeMode="contain"
          />
        ) : (
          <Icon name={icon} size={24} color={tintColor} />
        )}
        <Text
          numberOfLines={1}
          style={[styles.drawerRowTextStyle, { color: tintColor }]}
        >
          {label}
        </Text>
      </View>
    </MyPressable>
  );
};

const DrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const [id, setid] = useState('');
  const [teamimg, setteamimg] = useState('');
  const [logoimg, setlogoimg] = useState(AppImages.EPL);

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

  const window = useWindowDimensions();
  const rowWidth = (window.width * 0.75 * 80) / 100;
  const progress = useDrawerProgress();

  const drawerStyle = useAnimatedStyle(() => {
    const drawerProgress = progress as Animated.SharedValue<number>;

    return {
      transform: [
        { rotate: `${interpolate(drawerProgress.value, [0, 1], [0.2, 0])}rad` },
        { scale: interpolate(drawerProgress.value, [0, 1], [0.9, 1]) },
      ],
    };
  }, []);
  const bgAnimStyle = useAnimatedStyle(() => {
    const drawerProgress = progress as Animated.SharedValue<number>;

    return {
      transform: [
        {
          translateX: interpolate(drawerProgress.value, [0, 1], [-rowWidth, 0]),
        },
      ],
    };
  }, []);

  const handleSignOut = async () => {
    await AsyncStorage.setItem('id', '');
    await AsyncStorage.setItem('password', '');
    await AsyncStorage.setItem('team', '');
    RNRestart.Restart();
  };


  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={{ flex: 1 }}>
      <View style={{ padding: 16, marginTop: 40 }}>
        <Animated.View
          style={[styles.drawerAvatarStyle, styles.avatarShadow, drawerStyle]}
        >
          <Animated.Image
            style={styles.drawerAvatarStyle}
            source={logoimg}
          />
        </Animated.View>
        <Text style={styles.userName}>{id} ({teamimg})</Text>
      </View>
      <View style={styles.divider} />

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flexGrow: 1, paddingTop: 0 }}
      >
        {DRAWER_SCENES.map(scene => (
          <DrawerItemRow
            key={scene.label}
            {...{ ...props, ...scene, bgAnimStyle }}
          />
        ))}
      </DrawerContentScrollView>

      <MyPressable style={styles.signOutBtnStyle}
        onPress={handleSignOut}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
        <Icon name="power-settings-new" size={20} color="red" />
      </MyPressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userName: {
    fontSize: 18,
    color: '#3A5160',
    fontFamily: 'WorkSans-SemiBold',
    paddingTop: 8,
    paddingLeft: 4,
  },
  drawerRowStyle: {
    marginHorizontal: 0,
    paddingVertical: 8,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  drawerRowbackViewStyle: {
    opacity: 0.3,
    height: 48,
    borderRadius: 24,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
  },
  drawerRowTextStyle: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
  drawerRowContentContainer: {
    flexDirection: 'row',
    padding: 8,
    paddingHorizontal: 16,
    position: 'absolute',
  },
  drawerAvatarStyle: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
  divider: {
    backgroundColor: 'darkgrey',
    height: StyleSheet.hairlineWidth,
  },
  signOutBtnStyle: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'darkgrey',
  },
  signOutText: {
    flex: 1,
    color: 'black',
    fontSize: 16,
    fontFamily: 'WorkSans-SemiBold',
  },
});

export default DrawerContent;
