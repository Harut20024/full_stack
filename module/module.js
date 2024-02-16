async function createUniqueIndexes(usersCollection) {
  try {
    // Creating a unique index on 'username'
    await usersCollection.createIndex({ username: 1 }, { unique: true });
    await usersCollection.createIndex({ email: 1 }, { unique: true });
  } catch (error) {
    console.error("Error creating unique indexes:", error);
  }
}

module.exports = createUniqueIndexes;
