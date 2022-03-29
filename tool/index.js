const { User } = require("../src/models/userModel");
const bcrypt = require("bcrypt");

/**
 * Create user document in database
 * @param {JSON} doc 
 */
const create_user = async (doc) => {
    try {
        /**
         * This function create user in database
         */
        const create_query =  async () => {
            const mydata = new User(doc);
            await mydata.save();
        }

        bcrypt.hash(doc.password, 10, (err, hash) => {
            if(err) throw err;
            doc.password = hash;
            create_query();
        });

        return "User Created";
    } catch (err) {
        return err;
    }
}

/**
 * Get all users data from database
 * @returns promise of user data
 */
 const get_user = async () => {
    try {
        return await User.find();
    } catch(err) {
        return err;
    }
}

/**
 * Get userdata using username
 * @param {String} uname 
 * @returns data
 */
const display_user = async (uname) => {
    try {
        const user_data = await User.find();
        return user_data.find((e) => e.user_name == uname);

    } catch(err) {
        return err;
    }
}

/**
 * Update user document in database
 * @param {String} user_name
 * @param {JSON} obj
 * @returns promise
 */
const update_user = async (user_name, obj) => {
    try {
        const user_data = await User.find();
        const index = user_data.findIndex(e => e.user_name == user_name);
        
        /**
         * This function for update user data in database
         */
        const upd_query = async () => {
            await User.updateOne({user_name}, {$set: obj});
        };

        if(index != -1) {
            const password_exist = obj.hasOwnProperty("password");
            if(password_exist) {
                bcrypt.hash(obj.password, 10, (err, hash) => {
                    if(err) throw err;
                    obj.password = hash;
                    upd_query();
                });

            } else upd_query();
            
            return "Updated";
        }
        return;
    } catch(err) {
        return err;
    }
}

/**
 * Delete document from database
 * @param {String} user_name
 * @returns promise
 */
const delete_user = async (user_name) => {
    try {
        const user_data = await User.find();
        const index = user_data.findIndex(e => e.user_name == user_name);
        
        if(index != -1) {
            await User.deleteOne({user_name});
            return "User Deleted";
        }
        return;
    } catch(err) {
        return err;
    }
}

/**
 * @note All routes for tweets listed below. 
 */

/**
 * Create user document in database
 * @param {JSON} doc 
 */
 const create_tweet = async (doc) => {
    try {
        /**
         * This function create user in database
         */
        const create_query =  async () => {
            const mydata = new User(doc);
            await mydata.save();
        }

        bcrypt.hash(doc.password, 10, (err, hash) => {
            if(err) throw err;
            doc.password = hash;
            create_query();
        });

        return "User Created";
    } catch (err) {
        return err;
    }
}


module.exports = { create_user, get_user, update_user, delete_user, display_user };