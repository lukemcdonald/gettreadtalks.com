import React, { Component, Fragment } from 'react';
import Script from 'react-load-script';
import { Box } from "./styled/box";

export default class ReplyBox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			scriptError: false,
			scriptLoaded: false,
		}

		if (typeof window !== 'undefined' && window !== null) {
			window.replybox = {
				site: 'rbGnNrn9v3'
			};
		}
	}

	handleScriptCreate() {
		this.setState({ scriptLoaded: false })
	}

	handleScriptError() {
		this.setState({ scriptError: true })
	}

	handleScriptLoad() {
		this.setState({ scriptLoaded: true })
	}

	render() {
		return (
			<Fragment>
				<Script
					url="https://cdn.getreplybox.com/js/embed.js"
					onCreate={this.handleScriptCreate.bind(this)}
					onError={this.handleScriptError.bind(this)}
					onLoad={this.handleScriptLoad.bind(this)}
				/>

				<Box>
					<div id="replybox"></div>
				</Box>
			</Fragment>
		);
	}
}
