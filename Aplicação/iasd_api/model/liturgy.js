const db = require('../helper/dbhelper');

// CREATE TABLE liturgy (
//     "cd_liturgy" serial,
//     "cd_preacher" int   NULL,
//     "ds_theme" varchar(80)   NOT NULL,
//     "ds_description" text   NULL,
//     "ds_place" varchar(100)   NOT NULL,
//     "dt_liturgy" timestamp   NOT NULL,
//     CONSTRAINT "pk_liturgy" PRIMARY KEY (
//         "cd_liturgy"
//      )
// );

class Liturgy {
    constructor() {
        
    }

    getLiturgy(id = null) {
        if (id) {
            return db.any('SELECT * FROM liturgy WHERE cd_liturgy = $1', [id]);
        }
        return db.any('SELECT * FROM liturgy');
    }
    
    addLiturgy(liturgy) {
        db.any(
            `
            insert into liturgy (
                cd_preacher,
                ds_theme,
                ds_description,
                ds_place,
                dt_liturgy
                )
            values ($1,$2,$3,$4,$5)
            `
            ,[
            liturgy.cd_preacher,
            liturgy.ds_theme,
            liturgy.ds_description,
            liturgy.ds_place,
            liturgy.dt_liturgy
            ]
        );
        
        
    }

    deleteLiturgy(id) {
        db.any('DELETE FROM liturgy WHERE cd_liturgy = $1', [id])
    }

    updateLiturgy(liturgy) {
        db.any(
            `
            update liturgy
            set
                cd_preacher = $2,
                ds_theme = $3,
                ds_description = $4,
                ds_place = $5,
                dt_liturgy = $6
            where
                cd_liturgy = $1
            `,
            [
                liturgy.cd_liturgy,
                liturgy.cd_preacher,
                liturgy.ds_theme,
                liturgy.ds_description,
                liturgy.ds_place,
                liturgy.dt_liturgy
            ]
        )
    }

}

module.exports = Liturgy;