import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GRAY, PRIMARY } from '../colors';
import PropTypes from 'prop-types';

const HeaderRight = ({ onPress, disabled }) => {
    return (
        <Pressable hitSlop={10} onPress={onPress} disabled={disabled}>
            <MaterialCommunityIcons
                name="check"
                size={24}
                color={disabled ? GRAY.DEFAULT : PRIMARY.DEFAULT}
            />
        </Pressable>
    );
};

HeaderRight.defaultProps = {
    disabled: false,
};

HeaderRight.propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
};

export default HeaderRight;
