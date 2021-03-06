import React from 'react';

const Navigation = ({ navigate }) =>
	<header className="bg-white black-80 tc pv4 avenir">
		<nav className="db dt-l w-100 border-box pa3 ph5-l">
		  <a 
		  	className="pointer link dim dark-gray f5 f4-l dib mr3 mr4-ll" 

		  	title="Home"
		  	onClick={() => navigate(null)}
		  >
		    Hnefatafl
		  </a>
		  <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
		    <a 
		    	className="pointer link dim dark-gray f6 f5-l dib mr3 mr4-l" 
		    	title="About"
		    	onClick={() => navigate('about')}
		    >About</a>
		    <a 
		    	className="pointer link dim dark-gray f6 f5-l dib mr3 mr4-l" 
		    	title="Rules"
		    	onClick={() => navigate('rules')}
		    >Rules</a>
		  </div>
		</nav>
	</header>

export default Navigation;