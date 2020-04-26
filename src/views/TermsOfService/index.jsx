import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { termsOfService } from '../../legal';

const Header = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: #444444; 
  padding-top: 25px;
  padding-bottom: 30px;
  border-bottom: solid 1px rgba(129, 129, 129, 0.25); 
  text-align: center;
  margin-bottom: 10px;
`;
const ArrowImg = styled.img`
  height: 40px;
  cursor: pointer;
`;
const Container = styled.div`
  padding: 30px 20px;
`;
const Text = styled.p`
  color: #444444;
  font-size: 12px;
  line-height: 1.67;
  padding-top: 10px;
`;
const TextContainer = styled.ol`
  max-width: 700px;
  margin: 0 auto;
`;
const TermTitle = styled.li`
  font-size: 18px;
  font-weight: 500;
  color: #444444;
  padding-top: 20px;
`;

const TermsOfService = () => {
  const history = useHistory();

  return <Container>
    <ArrowImg src='/assets/back-arrow-darkgrey.png' onClick={() => history.goBack()} />
    <Header>Terms Of Service</Header>
    <TextContainer>
      {termsOfService.content.map((term, i) => {
        return <div key={i}>
          <TermTitle>{term.title}</TermTitle>
          {term.points ?
            <ol key={i.j} style={{ paddingInlineStart: '0' }}>
              {term.points.map((point, j) => (
                <Text as='li'>{point.title}
                  {point.text.length ?
                    point.text.map(text => (
                      <Text key={text.length} style={{ fontSize: '11px' }}>{text}</Text>
                    ))
                    :
                    <Text>{point.text}</Text>
                  }
                </Text>
              ))}
            </ol>
            :
            <Text>{term.text}</Text>
          }
        </div>
      })}
    </TextContainer>
  </Container>
};

export default TermsOfService;