import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMemories } from '../../actions/memory';

const Memories = ({ getMemories, memory: { memories, loading } }) => {
    useEffect(() => {
        getMemories();
    }, [getMemories]);

    return <div></div>;
};

Memories.propTypes = {
    getMemories: PropTypes.func.isRequired,
    memory: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    memory: state.memory
});

export default connect(
    mapStateToProps,
    { getMemories }
)(Memories);
