const db = require('../helper/dbhelper');

// CREATE TABLE person (
//     "cd_person" SERIAL,
//     "ds_username" varchar(100)   NOT NULL,
//     "ds_name" varchar(150)   NOT NULL,
//     "ds_password" text   NOT NULL,
//     "ds_usertype" varchar(50)   NOT NULL,
//     "ds_phone" varchar(17)   NOT NULL,
//     "ds_email" varchar(100)   NOT NULL,
//     "ds_salt" text   NOT NULL,
//     CONSTRAINT "pk_person" PRIMARY KEY (
//         "cd_person"
//      ),
//     CONSTRAINT "uc_person_ds_username" UNIQUE (
//         "ds_username"
//     )
// );

class Person {
    constructor() {
        
    }

    getPerson(id = null) {
        if (id) {
            return db.any('SELECT * FROM person WHERE cd_person = $1', [id]);
        }
        return db.any('SELECT * FROM person');
    }
    
    addPerson(person) {
        db.any(
            `
            insert into person (
                ds_username,
                ds_name,
                ds_password,
                ds_usertype,
                ds_phone,
                ds_email,
                ds_salt
                )
            values ($1,$2,$3,$4,$5,$6,$7)
            `
            ,[
            person.ds_username,
            person.ds_name,
            person.ds_password,
            person.ds_usertype,
            person.ds_phone,
            person.ds_email,
            person.ds_salt
            ]
        );
        
    }

    deletePerson(id) {
        db.any('DELETE FROM person WHERE cd_person = $1', [id])
    }

    updatePerson(person) {
        db.any(
            `
            update person
            set
                ds_username = $2,
                ds_name = $3,
                ds_password = $4,
                ds_usertype = $5,
                ds_phone = $6,
                ds_email = $7
            where
                cd_person = $1
            `,
            [
                person.cd_person,
                person.ds_username,
                person.ds_name,
                person.ds_password,
                person.ds_usertype,
                person.ds_phone,
                person.ds_email
            ]
        )
    }

}

module.exports = Person;