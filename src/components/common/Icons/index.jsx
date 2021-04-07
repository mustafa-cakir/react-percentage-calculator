import React from 'react';
import PropTypes from 'prop-types';

const Icons = ({ name, customClass }) => {
    if (!name) return false;
    return <i className={`icons icons-${name} ${customClass}`} />;
};

Icons.propTypes = {
    name: PropTypes.string,
    customClass: PropTypes.string,
};

Icons.defaultProps = {
    name: '',
    customClass: '',
};

export default Icons;
