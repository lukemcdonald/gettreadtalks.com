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
		return (
			<SearchStyles>
				<InstantSearch
					appId={process.env.ALGOLIA_APP_ID}
					apiKey={process.env.ALGOLIA_API_KEY}
					indexName={process.env.ALGOLIA_INDEX_NAME}
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
