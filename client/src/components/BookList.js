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
	displayBooks() {
		const data = this.props.data;
		if (data.loading) {
			return <div>Loading Books ...</div>;
		} else {
			return data.books.map((book) => {
				return <li key={book.id}>{book.name}</li>;
			});
		}
	}
	render() {
		return (
			<div>
				<ul id="book-list">{this.displayBooks()}</ul>
			</div>
		);
	}
}
// graphql used to glue the query and the component
/**
 * @param first one is the graphql query we use in the graphql server
 * @param second one is the component which will receive the data
 */
export default graphql(getBooksQuery)(BookList);
