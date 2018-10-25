import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

class BookDetails extends Component {
	render() {
		return (
			<div id="book-details">
				<p>Output book details here</p>
			</div>
		);
	}
}

export default graphql(getBooksQuery)(BookDetails);
