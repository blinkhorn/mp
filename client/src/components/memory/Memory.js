import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MemoryItem from '../memories/MemoryItem';
import ImageForm from './ImageForm';
import ImageItem from './ImageItem';
import { getMemory } from '../../actions/memory';

// Material
import Button from '@material-ui/core/Button';

const Memory = ({ getMemory, memory: { memory, loading }, match }) => {
    useEffect(() => {
        getMemory(match.params.id);
    }, [getMemory, match]);

    return loading || memory === null ? (
        <div />
    ) : (
        <Fragment>
            <Button variant="contained" style={{ marginTop: '1rem' }}>
                <Link
                    style={{ color: 'black', textDecoration: 'none' }}
                    to="/memories"
                >
                    Back To Memories
                </Link>
            </Button>
            <MemoryItem memory={memory} showActions={false} />
            <ImageForm memoryId={memory._id} />
            <div style={{ marginTop: '3rem' }}>
                {memory.images.map(image => (
                    <ImageItem
                        key={image._id}
                        image={image}
                        memoryId={memory._id}
                    />
                ))}
            </div>
        </Fragment>
    );
};

Memory.propTypes = {
    getMemory: PropTypes.func.isRequired,
    memory: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    memory: state.memory
});

export default connect(
    mapStateToProps,
    { getMemory }
)(Memory);
