import React from 'react';

const text = 
	`Hnefatafl is an ancient board game played by the Vikings. Remnants of boards have been found in all parts of Scandanavia. As Norse raiders and settlers spread to new territories, the game followed and was introduced to other cultures.

	Eventually the game died out, most likely being replaced due to the introduction of chess. The game as it exists today is a reconstruction based on archaelogical records, historical writings, and some collaborative creativity.
	
	This web app allows two players sharing a screen to play a game of hnefatafl based off of the Fetlar rules. This variant was created by the Fetlar Hnefatafl Panel in 2008 in an attempt to standardize the rules for tournaments around the world.`;

const listItemStyle = 'mv3'

const About = () => 
	<div className='black-80 avenir'>
		<header className="bg-white tc">
		  <h1 className="mt2 mb0 baskerville i fw1 f1">Rules</h1>
		</header>
		<div className='w-60 center'>
			<ul>
				<li className={listItemStyle}>The game is played with a king and twelve defenders against twenty-four attackers.</li>
				<li className={listItemStyle}>Attackers make the first move.</li>
				<li className={listItemStyle}>All pieces move any number of squares orthogonally (up, down, left, or right).</li>
				<li className={listItemStyle}>Pieces cannot land on or jump over an occupied square.</li>
				<li className={listItemStyle}>The four corner squares and the center square are refuge squares. No piece except the king can land on these squares.</li>
				<li className={listItemStyle}>With the exception of the king, enemy pieces are captured by surrounding them on two sides with your pieces such that the three pieces form a vertical or horizontal line.</li>
				<li className={listItemStyle}>It is possible to capture multiple pieces at a time this way.</li>
				<li className={listItemStyle}>Refuge squares, if they are empty, can aid in capture.</li>
				<li className={listItemStyle}>The king can <em>only</em> be captured from being surrounded by attackers on four sides .</li>
				<li className={listItemStyle}>For the defenders to win, the kind must get to one of the four corner refuge squares.</li>
				<li className={listItemStyle}>For the attacks to win, they must capture the king before he escapes.</li>
			</ul>
	  </div>
  </div>


export default About;