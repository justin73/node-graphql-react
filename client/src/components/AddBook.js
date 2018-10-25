import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			genre: '',
			authorId: ''
		};
	}
	displayAuthors() {
		const data = this.props.getAuthorsQuery;
		if (data.loading) {
			return <option>Loading Authors ...</option>;
		} else {
			return data.authors.map((author) => {
				return (
					<option key={author.id} value={author.id}>
						{author.name}
					</option>
				);
			});
		}
	}
	render() {
		return (
			<form id="add-book" onSubmit={this.submitForm.bind(this)}>
				<div className="field">
					<label>Book name:</label>
					<input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
				</div>
				<div className="field">
					<label>Genre:</label>
					<input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
				</div>
				<div className="field">
					<label>Author:</label>
					<select onChange={(e) => this.setState({ authorId: e.target.value })}>
						<option>Select author</option>
						{this.displayAuthors()}
					</select>
				</div>
				<button>+</button>
			</form>
		);
	}
	submitForm(e) {
		e.preventDefault();
		// the format of passing variables to a mutation
		this.props.addBookMutation({
			variables: {
				...this.state
			},
			refetchQueries: [ { query: getBooksQuery } ]
		});
	}
}

/**
 * when there are multiple queries or mutation in one component
 * you need to use compose to combine all of those queries & mutations
 * each query/mutation will have an object of param which has it is own name attribute to it
 * in this way, we could access the query/mutation via this.props by their name
 * e.g. this.props.getAuhthorsQuery will has the returned value from the getAuthorsQuery query
 */

export default compose(
	graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
	graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
