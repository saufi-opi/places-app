import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

async function create2dsphereIndex() {
  const uri = process.env.DATABASE_URL
  if (uri) {
    const client = new MongoClient(uri)
    try {
      await client.connect()
      const db = client.db()
      const collection = db.collection('Place')
      await collection.createIndex({ location: '2dsphere' })
      console.log('2dsphere index created')
    } finally {
      await client.close()
    }
  } else {
    throw new Error('Missing DATABASE_URL in .env file')
  }
}

create2dsphereIndex().catch(console.error)
