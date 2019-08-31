import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addImage } from '../../actions/memory';

const ImageForm = ({ memoryId, addImage }) => {
    const [memory, setMemory] = useState('');

    return (
        <div>
            <div>
                <h3>Leave an Image for a Memory</h3>
            </div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    addImage(memoryId, { memory });
                    setMemory('');
                }}
            >
                <textarea
                    name="memory"
                    cols="30"
                    rows="5"
                    placeholder="Create a memory"
                    value={memory}
                    onChange={e => setMemory(e.target.value)}
                    required
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

ImageForm.propTypes = {
    addImage: PropTypes.func.isRequired
};

export default connect(
    null,
    { addImage }
)(ImageForm);
