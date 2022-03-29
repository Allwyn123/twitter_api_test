const { User } = require("../src/models/userModel");
const bcrypt = require("bcrypt");

/**
 * Create document in database
 * @param {JSON} doc 
 */
const create_doc = async (doc) => {
    try {
        const user_data = await User.find();
        const id = user_data[user_data.length - 1].user_id + 1;
        doc.user_id = id;
        
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
 * Get particular data using ID
 * @param {Number} uid 
 * @returns data
 */
const display_doc = async (uid) => {
    try {
        const user_data = await User.find();
        return user_data.find((e) => e.user_id == uid);

    } catch(err) {
        return err;
    }
}

/**
 * Update document in database
 * @param {Number} user_id 
 * @param {JSON} obj
 * @returns promise
 */
const update_doc = async (user_id, obj) => {
    try {
        const user_data = await User.find();
        const index = user_data.findIndex(e => e.user_id == user_id);
        
        /**
         * This function for update user data in database
         */
        const upd_query = async () => {
            await User.updateOne({user_id}, {$set: obj});
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
 * @param {Number} user_id 
 * @returns promise
 */
const delete_doc = async (user_id) => {
    try {
        const user_data = await User.find();
        const index = user_data.findIndex(e => e.user_id == user_id);
        
        if(index != -1) {
            await User.deleteOne({user_id});
            return "User Deleted";
        }
        return;
    } catch(err) {
        return err;
    }
}

module.exports = { create_doc, update_doc, delete_doc, display_doc };