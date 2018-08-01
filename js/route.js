const getRoute = () => {
	const { hash } = window.location;
    const queryStartIndex = hash.lastIndexOf('?');
    return queryStartIndex === -1 ? hash : hash.substr(0, queryStartIndex);
}

const renderRoute = (loc) => {
	const location = (loc) ? `#/${loc}` : '#/';
	window.location.replace(location);
}

export {
	getRoute,
	renderRoute,
}