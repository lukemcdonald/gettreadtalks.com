import React from "react";
import { graphql } from "gatsby";

export default ( props ) => {
	const { data: post } = props.data.airtable;

	return (
		<h2>{post.name}</h2>
	);
}

export const pageQuery = graphql`
  query($id: String!) {
    airtable(id:{eq: $id}) {
      id
      data {
				name
      }
    }
  }
`;
