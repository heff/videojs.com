import React from 'react';
import styled from 'styled-components';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

import WithAutoLinkHeaders from '../WithAutoLinkHeaders';

const Wrapper = styled.article`
  width: 76%;

  h2, h3 {
    font-size: 28px;
    margin-bottom: 0.4em;
  }

  p {
    color: #424242;
    font-size: 18px;
    font-weight: 300;
    line-height: 1.78;
    margin-bottom: 2.8em;
  }

  .gatsby-highlight {
    margin-bottom: 3.5em;
  }
`;

const GettingStartedArticle = ({ mdxData }) => (
  <Wrapper>
    <WithAutoLinkHeaders basePath={mdxData.fields.slug}>
      <MDXRenderer>{mdxData.code.body}</MDXRenderer>
    </WithAutoLinkHeaders>
  </Wrapper>
);

export default GettingStartedArticle;
