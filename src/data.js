export const userQuery = (userId) => {

    //Sanity syntaxes
  const query = `*[_type=='user' && _id == '${userId}']`;
  return query;
};
