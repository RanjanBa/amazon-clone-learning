import React from 'react';

class SizeObserver extends React.Component {
	constructor(props) {
		super(props);
		this.id = props.name;
	}

	getBound() {
		const component = document.getElementById(this.id);
		if (!component) return {};

		const rect = component.getBoundingClientRect();

		return {
			left: rect.left,
			top: rect.top + window.scrollY,
			width: rect.width || rect.right - rect.left,
			height: rect.height || rect.bottom - rect.top,
		};
	}

	render() {
		return this.props.children(this.id);
	}
}
