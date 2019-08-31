import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteImage } from '../../actions/memory';

const ImageItem = ({
  memoryId,
  image: { _id, user, memory, imageURL, name, date },
  auth,
  deleteImage
}) => (
  <div>
    <div>
      <p>{memory}</p>
      <p>
        Created on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deleteImage(memoryId, _id)}
          type='button'
        >
        </button>
      )}
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