import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addImage } from '../../actions/memory';

// Material
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// CSS
import '../../App.css';

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
        setFormData({ memory: '', imageURL: '' });
    };

    return (
        <Card className="memory-form-card">
            <CardContent>
                <div>
                    <h3>Enter an Image to Associate with a Memory</h3>
                </div>
                <form onSubmit={e => onSubmit(e)}>
                    <div>
                        <TextField
                            name="memory"
                            value={memory}
                            multiline
                            rows="5"
                            label="Remember me ..."
                            margin="normal"
                            variant="outlined"
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            label="Image URL"
                            name="imageURL"
                            value={imageURL}
                            onChange={e => onChange(e)}
                            margin="normal"
                            required
                        />
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '1rem' }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

ImageForm.propTypes = {
    addImage: PropTypes.func.isRequired
};

export default connect(
    null,
    { addImage }
)(ImageForm);
