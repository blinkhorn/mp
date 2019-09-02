import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteImage } from '../../actions/memory';

// Material
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// CSS
import '../../App.css';

const ImageItem = ({
    memoryId,
    image: { _id, user, memory, imageURL, name, date },
    auth,
    deleteImage
}) => (
    <div className="flip-container">
        <div className="flipper">
            <div className="front">
                <Card>
                    <CardContent>
                        <img
                            src={imageURL}
                            alt={`An association for ${memory}`}
                        ></img>
                    </CardContent>
                </Card>
            </div>
            <div className="back">
                <Card>
                    <CardContent>
                        <h3>{memory}</h3>
                        <p>
                            Created by {name} on{' '}
                            <Moment format="MM/DD/YYYY">{date}</Moment>
                        </p>
                        {!auth.loading && user === auth.user._id && (
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ marginTop: '0.5rem' }}
                                onClick={() => deleteImage(memoryId, _id)}
                                type="button"
                            >
                                Delete
                            </Button>
                        )}{' '}
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
);

ImageItem.propTypes = {
    memoryId: PropTypes.string.isRequired,
    image: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { deleteImage }
)(ImageItem);
