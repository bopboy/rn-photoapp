import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { BLACK, WHITE } from '../colors';

export const AlertTypes = {
    SIGNOUT: 'SIGNOUT',
};
const DangerAlertProps = {
    SIGNOUT: {
        iconName: 'logout-variant',
        title: '로그아웃',
        message: '로그아웃 하려구?',
    },
};

const DangerAlert = ({ visible, onClose, alertType }) => {
    const { iconName, title, message } = DangerAlertProps[alertType];

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType={'fade'}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <Pressable
                    onPress={onClose}
                    style={styles.background}
                ></Pressable>
                <View style={styles.alert}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                </View>
            </View>
        </Modal>
    );
};

DangerAlert.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    alertType: PropTypes.oneOf(Object.values(AlertTypes)),
};

const styles = StyleSheet.create({
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: BLACK,
        opacity: 0.3,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alert: {
        backgroundColor: WHITE,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 20,
        width: '80%',
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 50,
    },
    message: {
        fontSize: 16,
        marginVertical: 10,
    },
});

export default DangerAlert;
