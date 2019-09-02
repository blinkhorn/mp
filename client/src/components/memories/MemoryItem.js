import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteMemory } from '../../actions/memory';

// Material
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// CSS
import '../../App.css';

const MemoryItem = ({
    deleteMemory,
    auth,
    memory: { _id, topic, images, user, date },
    showActions
}) => (
    <Card className="memory-card">
        <CardContent>
            <h2>{topic}</h2>

            <p>
                Created on <Moment format="MM/DD/YYYY">{date}</Moment>
            </p>

            {showActions && (
                <Fragment>
                    <Link style={{ color: 'black' }} to={`/memories/${_id}`}>
                        Memory Gallery{' '}
                        {images.length > 0 && <span>{images.length}</span>}
                    </Link>

                    {!auth.loading && user === auth.user._id && (
                        <div>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => deleteMemory(_id)}
                                style={{ marginTop: '1rem' }}
                                type="button"
                            >
                                Delete Memory
                            </Button>
                        </div>
                    )}
                </Fragment>
            )}
        </CardContent>
    </Card>
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
