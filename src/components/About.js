import React from 'react';

const text = 
	`Hnefatafl is an ancient board game played by the Vikings. The game began its life in Scandinavia but soon spread to the British Isles, Iceland, France, Germany, Ukraine, and Greenland. As Norse raiders and settlers spread to new territories, the game followed and was introduced to other cultures.

	Eventually the game died out, most likely being replaced by chess due to its introduction in these areas. The game as it exists today is a reconstruction based on archaeological records, historical writings, and some collaborative creativity.
	
	This web app allows two players sharing a screen to play a game of hnefatafl based on the Fetlar rules. This variant was created by the Fetlar Hnefatafl Panel in 2008 in an attempt to standardize the rules for tournaments around the world.`;

const linkClassNames = 'black dim';

const About = () => 
	<div className='black-80 avenir'>
		<header className="bg-white tc">
		  <h1 className="mt2 mb0 baskerville i fw1 f1">Hnefatafl</h1>
		  <h2 className="mt2 mb0 f6 fw4 ttu tracked">Viking Chess</h2>
		</header>
		<div className='w-60 center'>
			<p >
		  	{text.split('\n').map((item, key) => {
				  return <span key={key}>{item}<br/></span>
				})}
		  </p>
		  <p>
		  	To learn more about the history of the game and different variants please see Damian Walker's very informative <a className={linkClassNames} href='http://tafl.cyningstan.com/'>website</a>. For information on Fetlar's Hnefatafl World Championship please see <a className={linkClassNames} href='http://www.fetlar.org/hnefatafl-world-championship'>here</a>.
		  </p>
	  </div>
  </div>


export default About;