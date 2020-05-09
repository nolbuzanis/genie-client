import React from 'react';
import styled from 'styled-components';
import { termsOfService } from '../../legal';
import BackPageHeader from '../../components/BackPageHeader';

const Text = styled.p`
  color: #444444;
  font-size: 12px;
  line-height: 1.67;
  padding-top: 10px;
`;
const TextContainer = styled.ol`
  max-width: 700px;
  margin: 0 auto;
  padding: 0 20px 30px 40px;
  color: #444444;
  font-size: 18px;
`;
const TermTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: #444444;
  padding-top: 20px;
`;

const TermsOfService = () => {
  return <>
    <BackPageHeader>Terms of Service</BackPageHeader>
    <TextContainer>
      {termsOfService.content.map((term, i) => {
        return <li key={i}>
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
        </li>
      })}
    </TextContainer>
  </>
};

export default TermsOfService;