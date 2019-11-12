import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MemoryItem from "./MemoryItem";
import MemoryForm from "./MemoryForm";
import { getMemories } from "../../actions/memory";

// CSS
import "../../App.css";

const Memories = ({ getMemories, auth, memory: { memories, loading } }) => {
  useEffect(() => {
    getMemories();
  }, [getMemories]);

  return loading ? (
    <div></div>
  ) : (
    <Fragment>
      <h1>Memories</h1>
      <p>Welcome to MP!</p>
      <div className="memory-container">
        <MemoryForm />
        {memories
          .filter(memory => !auth.loading && memory.user === auth.user._id)
          .map(memory => (
            <MemoryItem key={memory._id} memory={memory} />
          ))}
      </div>
    </Fragment>
  );
};

Memories.propTypes = {
  getMemories: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  memory: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  memory: state.memory,
  auth: state.auth
});

export default connect(mapStateToProps, { getMemories })(Memories);
