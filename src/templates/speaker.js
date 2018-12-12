import React from "react";
import { graphql } from "gatsby";

export default ( props ) => {
	const { data: post } = props.data.airtable;

	return (
		<h2>{post.name}</h2>
	);
}

export const pageQuery = graphql`
  query getSpeakerByName($title: String!) {
    airtable(table: { eq: "Speakers" }, data: { name: { eq: $title } }) {
      id
      data {
				name
      }
    }
  }
`;
