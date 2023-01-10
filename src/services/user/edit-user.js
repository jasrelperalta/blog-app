import { getDB, saveDB } from '../../utils/db/index.js';

export const editUser = async (request, reply) => {
  const { params, body, username } = request;
  const { userId: pathUsername } = params;
  const { newUsername, newFirstName, newLastName } = body;


  const db = await getDB();

  if (username !== pathUsername) {
    return reply.unauthorized('Not the owner account');
  }
  
  if (username !== newUsername) {
    db.users[newUsername] = db.users[username]
    db.users[newUsername].firstName = newFirstName || db.users[newUsername].firstName;
    db.users[newUsername].lastName = newLastName || db.users[newUsername].lastName; 
    db.users[newUsername].updatedDate = new Date().getTime();
    // delete old user so it won't duplicate
    delete db.users[username];


    await saveDB(db);
  
    return {
      newUsername,
      ...db.users[newUsername]
    };
  }
  // no change in username
  if (username == newUsername) {
    db.users[username].firstName = newFirstName || db.users[username].firstName;
    db.users[username].lastName = newLastName || db.users[username].lastName; 
    db.users[username].updatedDate = new Date().getTime();


    await saveDB(db);
  
    return {
      username,
      ...db.users[username]
    };
  }
};
