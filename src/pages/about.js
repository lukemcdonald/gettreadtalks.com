/* global tw */
import styled from 'styled-components';
import React from 'react';

import Layout from '../layouts';
import SEO from '../components/seo';
import { Container, Section } from '../components/styled/layout';

const Article = styled(Section)`
	${tw`my-8`};
	${tw`md:my-16`};
`;

const Header = styled.header`
	${tw`mb-6`};
`;
const Title = styled.h1`
	${tw`font-semibold mb-6 text-black text-4xl`};
`;
const Content = styled.div`
	${tw`text-grey-darker`};

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		${tw`text-black`};
	}

	h2 {
		${tw`mt-12 mb-6`};

		&:first-child {
			${tw`mt-0`};
		}
	}

	p {
		${tw`leading-normal mb-6`};
	}
`;

export default () => (
	<Layout main={{ bg: 'white' }}>
		<SEO
			title="About - TREAD Talks"
			description="Walk, run, climb, ride, or whatever you do while listening to the full length of a sermon on a weekly basis."
		/>

		<Container>
			<Article>
				<Header>
					<Title>About</Title>
				</Header>

				<Content>
					<p>
						This project was initially created for those christians seeking to
						elevate their spiritual heartbeat while working out their physical
						one. The idea has grown from making posts to Facebook to building a
						full fledged website and automating the processes along the way. For
						the most part, this site was built to scratch an web development
						itch with project and content that I love.
					</p>

					<p>
						The idea behind <strong>TREAD Talks</strong> is to walk, run, climb,
						bike, etc. while listening to the full length of a sermon on a
						weekly basis. Fifty-two sermons a year. Ideally, with others
						participating alongside you, you'll be able to encourage one another
						to be active in the bodies given to us by God and enjoy fellowship
						and prayer around the contents of the sermon each week.
					</p>

					<p>
						We are told in Philippians 3:17 to keep our eyes on those who have
						led by example. We are to imitate them in faithfulness, humility,
						and the ongoing pursuit of obtaining Christ. We live in a era where
						we can access and listen to some of the great preachers and teachers
						of our time and of those whom have come before. It should be noted
						that theses sermons should never compete with our devotion to the
						local church and the pastors who care for our souls.
					</p>

					<p>
						Ultimately, the goal is to be strengthened and equipped by the
						hearing of God's word so that we may walk as children of Light to
						the praise and glory of God.
					</p>

					<h2>Biblical Encouragement:</h2>

					<p>
						Or do you not know that your body is a temple of the Holy Spirit
						within you, whom you have from God? You are not your own, for you
						were bought with a price. So glorify God in your body. - 1
						Corinthians 6:19-20
					</p>

					<p>
						Beloved, I pray that all may go well with you and that you may be in
						good health, as it goes well with your soul. - 3 John 2
					</p>

					<p>
						So, whether you eat or drink, or whatever you do, do all to the
						glory of God. - 1 Corinthians 10:31
					</p>

					<p>
						for while bodily training is of some value, godliness is of value in
						every way, as it holds promise for the present life and also for the
						life to come. - 1 Timothy 4:8
					</p>

					<p>
						A joyful heart is good medicine, but a crushed spirit dries up the
						bones. - Proverbs 17:22
					</p>

					<p>
						Be not wise in your own eyes; fear the Lord, and turn away from
						evil. It will be healing to your flesh and refreshment to your
						bones. - Proverbs 3:7-8
					</p>

					<p>
						Therefore be careful how you walk, not as unwise men but as wise -
						Ephesians 5:15-16
					</p>

					<p>
						Therefore, my beloved, as you have always obeyed, so now, not only
						as in my presence but much more in my absence, work out your own
						salvation with fear and trembling, for it is God who works in you,
						both to will and to work for his good pleasure. - Philippians
						2:12-13
					</p>
				</Content>
			</Article>
		</Container>
	</Layout>
);
