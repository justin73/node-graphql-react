import { gql } from 'apollo-boost';
// the exact query we made in graphql server
const getAuthorsQuery = gql`
	{
		authors {
			name
			id
		}
	}
`;

const getBooksQuery = gql`
	{
		books {
			name
			id
		}
	}
`;

/**
 * the params in the mutation means this mutation can take different params in order to save the dynamic value accordingly
 * format : $ + name of the property : data type !(NotNull)
 */

const addBookMutation = gql`
	mutation($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			name
			id
		}
	}
`;

const getBookQuery = gql`
	query($id: ID) {
		book(id: $id) {
			id
			name
			genre
			author {
				id
				name
				age
				books {
					name
					id
				}
			}
		}
	}
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };
