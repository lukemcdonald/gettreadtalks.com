import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ siteTitle }) => (
	<footer>
		<section className="container py-10 px-4 mx-auto">
			<p>
				©{siteTitle} {new Date().getFullYear()}
			</p>
		</section>
	</footer>
);

Footer.propTypes = {
	siteTitle: PropTypes.string,
};

Footer.defaultProps = {
	siteTitle: '',
};

export default Footer;
