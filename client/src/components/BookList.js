import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

// the exact query we made in graphql server
const getBooksQuery = gql`
	{
		books {
			name
			id
		}
	}
`;

class BookList extends Component {
	render() {
		console.log('====================================');
		console.log(this.props);
		console.log('====================================');
		return (
			<div>
				<ul id="book-list">
					<li>Book Name</li>
				</ul>
			</div>
		);
	}
}

export default graphql(getBooksQuery)(BookList);
