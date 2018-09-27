const graphql = require('graphql')
const _ = require('lodash')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql

// dummy data
var books = [{
  name: 'Name of the Wind',
  genre: 'Fantasy',
  id: '1',
  authorId: '1'
},
{
  name: 'The Final Empire',
  genre: 'Fantasy',
  id: '2',
  authorId: '2'
},
{
  name: 'The Hero of Ages',
  genre: 'Fantasy',
  id: '4',
  authorId: '2'
},
{
  name: 'The Long Earth',
  genre: 'Sci-Fi',
  id: '3',
  authorId: '3'
},
{
  name: 'The Colour of Magic',
  genre: 'Fantasy',
  id: '5',
  authorId: '3'
},
{
  name: 'The Light Fantastic',
  genre: 'Fantasy',
  id: '6',
  authorId: '3'
}
]

var authors = [{
  name: 'Patrick Rothfuss',
  age: 44,
  id: '1'
},
{
  name: 'Brandon Sanderson',
  age: 42,
  id: '2'
},
{
  name: 'Terry Pratchett',
  age: 66,
  id: '3'
}
]

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
      resolve (parent, args) {
        // here the parent means the instance of a book object
        return _.find(authors, {
          id: parent.authorId
        })
      }
    }
  })
})

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
      resolve (parent, args) {
        return _.filter(books, {
          authorId: parent.id
        })
      }
    }
  })
})
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
      resolve (parent, args) {
        // args means we could have args from the book args, which means args.id is avaialble
        // code to get data from db/other source
        console.log(typeof (args.id))
        return _.find(books, {
          id: args.id
        })
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve (parent, args) {
        // args means we could have args from the book args, which means args.id is avaialble
        // code to get data from db/other source
        return _.find(authors, {
          id: args.id
        })
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve (parent, args) {
        return authors
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
