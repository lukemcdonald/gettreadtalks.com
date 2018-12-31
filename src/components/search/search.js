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
					appId="MSM4664OMW"
					apiKey="7fb1f124e1b1c522c047da1392f0cac2"
					indexName="prod_PUBLISHED_TALKS"
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
