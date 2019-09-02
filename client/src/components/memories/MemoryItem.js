import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteMemory } from '../../actions/memory';

// Material
import Button from '@material-ui/core/Button';

const MemoryItem = ({
    deleteMemory,
    auth,
    memory: { _id, topic, images, user, date },
    showActions
}) => (
    <div>
        <div>
            {!auth.loading && user === auth.user._id && <h2>{topic}</h2>}
            {!auth.loading && user === auth.user._id && (
                <p>
                    Created on <Moment format="YYYY/MM/DD">{date}</Moment>
                </p>
            )}

            {showActions && (
                <Fragment>
                    {!auth.loading && user === auth.user._id && (
                        <Link style={{color: 'black'}} to={`/memories/${_id}`}>
                            Memory Gallery  {' '}
                            {images.length > 0 && <span>{images.length}</span>}
                        </Link>
                    )}
                    {!auth.loading && user === auth.user._id && (
                        <div>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => deleteMemory(_id)}
                                style={{marginTop: '1rem'}}
                                type="button"
                            >
                                Delete Memory
                            </Button>
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
