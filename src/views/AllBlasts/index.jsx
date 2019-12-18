import React from 'react';
import styled from 'styled-components';
import BlastCard from '../../components/BlastCard';
import { connect } from 'react-redux';
import { fetchMyBlasts } from '../../actions';

const Container = styled.div`
  padding: 120px 25px 60px;
`;

const BlastList = styled.div`
  margin: 0 auto;
  max-width: 1100px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-column-gap: 40px;
  grid-row-gap: 60px;
`;

const Header = styled.h1`
  font-weight: 400;
  margin: 0;
  padding-left: 14vw;
  padding-bottom: 40px;
`;

class AllBlasts extends React.Component {
  componentDidMount() {
    if (!this.props.allBlasts) {
      this.props.fetchMyBlasts();
    }
  }

  render() {
    if (!this.props.allBlasts) {
      return 'loading...';
    }
    const blasts = this.props.allBlasts;
    return (
      <Container>
        <Header>All Blasts</Header>
        <BlastList>
          <BlastCard
            title={blasts[0].songName}
            img={blasts[0].img}
            saves={blasts[0].saves}
            createdAt={blasts[0].createdAt}
          />
        </BlastList>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { allBlasts: state.blasts.all };
};

export default connect(
  mapStateToProps,
  { fetchMyBlasts }
)(AllBlasts);
