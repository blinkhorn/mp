import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <section>
            <div>
                <div>
                    <h1>Memory Palace | A Memorization Aid</h1>
                    <p>
                        Associate images from spaces you're familiar with with infomration you want to memorize
                    </p>
                    <div>
                        <Link to="/register">
                            Sign Up
                        </Link>
                        <Link to="/login">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
