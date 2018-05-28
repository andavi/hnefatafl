import React from 'react';

const Navigation = () =>
	<header className="bg-white black-80 tc pv4 avenir">
		<nav className="db dt-l w-100 border-box pa3 ph5-l">
		  <a className="link dim dark-gray f5 f4-l dib mr3 mr4-ll" href="#" title="Home">
		    Hnefatafl
		  </a>
		  <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
		    <a className="link dim dark-gray f6 f5-l dib mr3 mr4-l" href="#" title="About">About</a>
		    <a className="link dim dark-gray f6 f5-l dib mr3 mr4-l" href="#" title="Rules">Rules</a>
		  </div>
		</nav>
	</header>

export default Navigation;