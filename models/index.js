const User = require('./User');
const Post = require('./Post');

//create associations
//COMMON PRACTICE TO USE THIS KIND OF RELATIONS IN BACK END
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post };