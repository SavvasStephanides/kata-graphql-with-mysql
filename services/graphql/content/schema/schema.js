const graphql = require('graphql')
const mysql = require('mysql2/promise');

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema} = graphql

async function getSchema(){
    const connection = await mysql.createConnection({
        host: 'database',
        user: 'root',
        password: '<DB_ROOT_PASSWORD>',
        database: 'playlist'
    })

    const TrackType = new GraphQLObjectType({
        name: "Track",
        fields: () => ({
            id: {type: GraphQLID},
            name: {type: GraphQLString},
            releaseYear: {type: GraphQLInt},
            artist: {
                type: ArtistType,
                async resolve(parent, args){
                    var [rows, fields] = await connection.execute('SELECT * FROM artists WHERE id=?', [parent.artistId])
                    return rows[0]
                }
            }
        })
    })
    
    const ArtistType = new GraphQLObjectType({
        name: "Artist",
        fields: () => ({
            id: {type: GraphQLID},
            name: {type: GraphQLString},
            tracks: {
                type: GraphQLList(TrackType),
                async resolve(parent, args){
                    var [rows, fields] = await connection.execute('SELECT * FROM tracks WHERE artistId=?', [parent.id])
                    return rows
                }
            }
        })
    })
    
    const RootQuery = new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            tracks: {
                type: GraphQLList(TrackType),
                args: { 
                    query: { type: GraphQLString },
                },
                async resolve(parent, args){
                    if(args.query === undefined){
                        var [rows, fields] = await connection.execute('SELECT * FROM tracks')
                        return rows
                    }
                    else{
                        var [rows, fields] = await connection.execute("SELECT * FROM tracks WHERE name LIKE ?", ["%"+ args.query.replace(" ", "%").toLowerCase() + "%"])
                        return rows
                    }
                }
            },
            track: {
                type: TrackType,
                args: { 
                    id: { type: GraphQLID }
                },
                async resolve(parent, args){
                    var [rows, fields] = await connection.execute('SELECT * FROM tracks WHERE id=?', [args.id])
                    return rows[0]
                }
            },
            allArtists: {
                type: GraphQLList(ArtistType),
                async resolve(parent, args){
                    var [rows, fields] = await connection.execute('SELECT * FROM artists')
                    return rows
                }
            }
            
        }
    })

    const Mutation = new GraphQLObjectType({
        name: "Mutation",
        fields: {
            addArtist: {
                type: ArtistType,
                args: {
                    id: {type: GraphQLID},
                    name: {type: GraphQLString}
                },
                async resolve(parent, args){
                    await connection.execute("INSERT INTO artists VALUES (?,?)", [args.id, args.name])
                    var [rows, fields] = await connection.execute('SELECT * FROM artists WHERE id=?', [args.id])
                    return rows[0]
                }
            },
            addTrack:{
                type: TrackType,
                args: {
                    id: {type: GraphQLID},
                    name: {type: GraphQLString},
                    releaseYear: {type: GraphQLInt},
                    artistId: {type: GraphQLID}
                },
                async resolve(parent, args){
                    await connection.execute("INSERT INTO tracks (id, name, releaseYear, artistId) VALUES (?,?,?,?)", [args.id, args.name, args.releaseYear, args.artistId])
                    var [rows, fields] = await connection.execute('SELECT * FROM tracks WHERE id=?', [args.id])
                    return rows[0]
                }
            }
        }
    })

    return new GraphQLSchema({
        query: RootQuery,
        mutation: Mutation
    });
}

module.exports = {
    getSchema
}