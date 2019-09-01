import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteMemory } from '../../actions/memory';
const MemoryItem = ({
    deleteMemory,
    auth,
    memory: { _id, topic, images, user, date },
    showActions
}) => (
    <div>
        <div>
            <p>{topic}</p>
            <p>
                Created on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>

            {showActions && (
                <Fragment>
                    <Link to={`/memories/${_id}`}>
                        Memory Gallery{' '}
                        {images.length > 0 && <span>{images.length}</span>}
                    </Link>
                    {!auth.loading && user === auth.user._id && (
                        <div>
                            <button
                                onClick={() => deleteMemory(_id)}
                                type="button"
                            >
                                Delete Memory
                            </button>
                        </div>
                    )}
                </Fragment>
            )}
        </div>
    </div>
);

MemoryItem.defaultProps = {
    showActions: true
};

MemoryItem.propTypes = {
    memory: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteMemory: PropTypes.func.isRequired,
    showActions: PropTypes.bool
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { deleteMemory }
)(MemoryItem);
