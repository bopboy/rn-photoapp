import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { signOut } from '../api/auth';
import { GRAY, WHITE } from '../colors';
// import PropTypes from 'prop-types';
import { useUserState } from '../contexts/UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileScreen = () => {
    const [user, setUser] = useUserState();
    const { top } = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <View style={styles.settingButton}>
                <Pressable
                    onPress={async () => {
                        signOut();
                        setUser({});
                    }}
                    hitSlop={10}
                >
                    <MaterialCommunityIcons
                        name="logout-variant"
                        size={24}
                        color={GRAY.DEFAULT}
                    />
                </Pressable>
            </View>

            <View style={styles.profile}>
                <View
                    style={[
                        styles.photo,
                        user.photoURL || { backgroundColor: GRAY.DEFAULT },
                    ]}
                >
                    <Image
                        source={{ uri: user.photoURL }}
                        style={styles.photo}
                    />
                    <Pressable style={styles.editButton} onPress={() => {}}>
                        <MaterialCommunityIcons
                            name="pencil"
                            size={20}
                            color={WHITE}
                        />
                    </Pressable>
                </View>
                <Text style={styles.nickname}>
                    {user.displayName || 'nickname'}
                </Text>
            </View>
            <View style={styles.listContainer}>{/* 내가 쓴 글 목록 */}</View>
        </View>
    );
};

ProfileScreen.propTypes = {
    // propTypes
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    settingButton: {
        paddingHorizontal: 20,
        alignItems: 'flex-end',
    },
    profile: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: GRAY.DEFAULT,
        paddingVertical: 10,
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: GRAY.DARK,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nickname: {
        fontSize: 24,
        fontWeight: '700',
        marginTop: 10,
    },
    listContainer: {
        flex: 1,
        backgroundColor: GRAY.DARK,
    },
});

export default ProfileScreen;
