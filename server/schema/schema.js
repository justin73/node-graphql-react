const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		genre: {
			type: GraphQLString
		},
		/**
     * an example of nested property
     */
		author: {
			type: AuthorType,
			resolve(parent, args) {
				// here the parent means the instance of a book object

				// return _.find(authors, {
				// 	id: parent.authorId
				// });

				// model accessing to the DB directly
				return Author.findById(parent.authorId);
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	// fields are function since sometime if there is dependency we need to link between types and only functions could help us to achive this
	fields: () => ({
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		age: {
			type: GraphQLInt
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// return _.filter(books, {
				// 	authorId: parent.id
				// });

				return Book.find({ authorId: parent.id });
			}
		}
	})
});
/**
 * fields defines how are we gonna use the query on the graphql server
 * the name of book matters, since it will be the one we use to request
 * e.g.
 * book {
 *   name,
 *   genre
 * }
 *
 * book is matching exactly what we define in the fileds
 *
 * args is an object which we could use in the query to pass params
 * e.g. book(id:'123'){name genre}
 */
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {
				id: {
					type: GraphQLID
				}
			},
			resolve(parent, args) {
				// args means we could have args from the book args, which means args.id is avaialble
				// code to get data from db/other source
				// console.log(typeof args.id);
				// return _.find(books, {
				// 	id: args.id
				// });
				return Book.findById(args.id);
			}
		},
		author: {
			type: AuthorType,
			args: {
				id: {
					type: GraphQLID
				}
			},
			resolve(parent, args) {
				// args means we could have args from the book args, which means args.id is avaialble
				// code to get data from db/other source
				// return _.find(authors, {
				// 	id: args.id
				// });

				return Author.findById(args.id);
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// return books;

				return Book.find({});
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				// return authors;

				return Author.find({});
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString)
				},
				age: {
					type: new GraphQLNonNull(GraphQLInt)
				}
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age
				});
				// without return we won't get any data back but a null
				return author.save();
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString)
				},
				genre: {
					type: new GraphQLNonNull(GraphQLString)
				},
				authorId: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve(parent, args) {
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId
				});
				return book.save();
			}
		}
	}
});

// query is used to fetch data, mutation is use to manupulate data such as update delete add
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
