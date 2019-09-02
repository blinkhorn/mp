import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addImage } from '../../actions/memory';

const ImageForm = ({ memoryId, addImage }) => {
    const [formData, setFormData] = useState({
        memory: '',
        imageURL: ''
    });

    const { memory, imageURL } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        addImage(memoryId, { memory, imageURL });
        setFormData({memory: '', imageURL: ''})
    };

    return (
        <div>
            <div>
                <h3>Enter an Image to Associate with a Memory</h3>
            </div>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <textarea
                        name="memory"
                        cols="30"
                        rows="5"
                        placeholder="Create a memory"
                        value={memory}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Image URL"
                        name="imageURL"
                        value={imageURL}
                        onChange={e => onChange(e)}
                        required
                    ></input>
                </div>

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
