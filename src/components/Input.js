import { StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PRIMARY, GRAY } from '../colors';

export const InputTypes = {
    EMAIL: 'EMAIL',
    PASSWORD: 'PASSWORD',
};

const InputTypeProps = {
    EMAIL: {
        title: 'EMAIL',
        placeholder: 'your@email.com',
        keyboardType: 'email-address',
        secureTextEntry: false,
        iconName: { active: 'email', inactive: 'email-outline' },
    },
    PASSWORD: {
        title: 'PASSWORD',
        placeholder: 'PASSWORD',
        keyboardType: 'default',
        secureTextEntry: true,
        iconName: { active: 'lock', inactive: 'email-outline' },
    },
};

export const ReturnKeyType = {
    DONE: 'done',
    NEXT: 'next',
};

const Input = forwardRef(({ inputType, styles, ...props }, ref) => {
    const {
        title,
        placeholder,
        keyboardType,
        secureTextEntry,
        iconName: { active, inactive },
    } = InputTypeProps[inputType];
    const [isFocused, setIsFocused] = useState(false);
    const { value } = props;

    return (
        <View style={[defaultStyles.container, styles?.container]}>
            <Text
                style={[
                    defaultStyles.title,
                    { color: value || isFocused ? PRIMARY.DEFAULT : GRAY.DARK },
                ]}
            >
                {title}
            </Text>
            <View style={{}}>
                <TextInput
                    ref={ref}
                    {...props}
                    style={[
                        defaultStyles.input,
                        {
                            borderColor:
                                value || isFocused
                                    ? PRIMARY.DEFAULT
                                    : GRAY.DARK,
                            color:
                                value || isFocused
                                    ? PRIMARY.DEFAULT
                                    : GRAY.DARK,
                        },
                        styles?.input,
                    ]}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                />
                <View style={[defaultStyles.icon, styles?.icon]}>
                    <MaterialCommunityIcons
                        name={isFocused ? active : inactive}
                        size={24}
                        color={value || isFocused ? PRIMARY.DEFAULT : GRAY.DARK}
                    />
                </View>
            </View>
        </View>
    );
});
Input.displayName = 'Input';

Input.propTypes = {
    inputType: PropTypes.oneOf(Object.values(InputTypes)),
    value: PropTypes.string,
    styles: PropTypes.object,
};

const defaultStyles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title: {
        marginBottom: 4,
        fontWeight: '700',
    },
    input: {
        borderBottomWidth: 1,
        height: 42,
        paddingHorizontal: 10,
        paddingLeft: 40,
    },
    icon: {
        position: 'absolute',
        left: 8,
        height: '100%',
        justifyContent: 'center',
    },
});

export default Input;