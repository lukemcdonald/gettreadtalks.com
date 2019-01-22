import React, { Component } from 'react';
import { InstantSearch, SearchBox, Configure } from 'react-instantsearch-dom';
import classnames from 'classnames';

import SearchResults from './results';
import SearchStyles from '../styled/search';

export default class Search extends Component {
	state = {
		focus: false,
	};

	onBlur = e => {
		setTimeout(
			function() {
				this.setState({ focus: false });
			}.bind(this),
			200
		);
	};

	onFocus = e => {
		this.setState({ focus: true });
	};

	render() {
		console.log(process.env.GATSBY_ALGOLIA_APP_ID);
		return (
			<SearchStyles>
				<InstantSearch
					appId={process.env.GATSBY_ALGOLIA_APP_ID}
					apiKey={process.env.GATSBY_ALGOLIA_API_KEY}
					indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
				>
					<Configure hitsPerPage={5} />

					<SearchBox
						translations={{ placeholder: 'Search for Talks' }}
						onBlur={this.onBlur}
						onFocus={this.onFocus}
					/>

					{this.state.focus && (
						<div
							className={classnames({
								'is-focused': this.state.focus,
							})}
						>
							<SearchResults />
						</div>
					)}
				</InstantSearch>
			</SearchStyles>
		);
	}
}
