import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMemory } from '../../actions/memory';

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
                <input
                    type="submit"
                    value="Submit"
                />
            </form>
        </div>
    );
};

export default MemoryForm;
