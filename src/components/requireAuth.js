import React from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends React.Component {
    // Navigate to /login route if isAuthenticated is false
    componentDidMount() {
      if (!this.props.auth.isAuthenticated) {
        this.props.history.push('/login');
      }
    }
    componentDidUpdate() {
      if (!this.props.auth.isAuthenticated) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
      // Pass down props object
    }
  }

  const mapStateToProps = state => {
    return { auth: state.auth };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
