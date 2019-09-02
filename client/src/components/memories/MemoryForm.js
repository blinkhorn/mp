import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMemory } from '../../actions/memory';

// Material
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const MemoryForm = ({ addMemory }) => {
    const [topic, setTopic] = useState('');
    return (
        <div>
            <div>
                <h3>What do you want to remember?</h3>
            </div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    addMemory({ topic });
                    setTopic('');
                }}
            >
                <TextField
                    name="topic"
                    value={topic}
                    multiline
                    rows="5"
                    label="Create a memory"
                    margin="normal"
                    variant="outlined"
                    onChange={e => setTopic(e.target.value)}
                    required
                />
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '0.5rem' }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

MemoryForm.propTypes = {
    addMemory: PropTypes.func.isRequired
};

export default connect(
    null,
    { addMemory }
)(MemoryForm);
