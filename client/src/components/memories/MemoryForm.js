import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMemory } from '../../actions/memory';

// Material
import Button from '@material-ui/core/Button';

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
                <textarea
                    name="topic"
                    cols="30"
                    rows="5"
                    placeholder="Create a memory"
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    required
                />
                <div>
                    <Button variant="contained" color="primary" style={{marginTop: '0.5rem'}} type="submit">
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
