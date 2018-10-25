import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null
		};
	}
	displayBooks() {
		const data = this.props.data;
		if (data.loading) {
			return <div>Loading Books ...</div>;
		} else {
			return data.books.map((book) => {
				return (
					<li
						key={book.id}
						onClick={(e) => {
							this.setState({ selected: book.id });
						}}
					>
						{book.name}
					</li>
				);
			});
		}
	}
	render() {
		return (
			<div>
				<ul id="book-list">{this.displayBooks()}</ul>
				<BookDetails bookId={this.state.selected} />
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
