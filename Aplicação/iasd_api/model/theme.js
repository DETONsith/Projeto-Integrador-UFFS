const db = require('../helper/dbhelper');


// CREATE TABLE theme (
//     "cd_theme" SERIAL,
//     "ds_theme" varchar(40)   NOT NULL,
//     CONSTRAINT "pk_theme" PRIMARY KEY (
//         "cd_theme"
//      )
// );

class Theme {
    constructor() {
        
    }

    getTheme(id = null) {
        if (id) {
            return db.any('SELECT * FROM theme WHERE cd_theme = $1', [id]);
        }
        return db.any('SELECT * FROM theme');
    }
    
    addTheme(theme) {
        db.any(
            `
            insert into theme (
               ds_theme
            `
            ,[
            theme.ds_theme
            ]
        );
        
        
    }

    deleteTheme(id) {
        db.any('DELETE FROM theme WHERE cd_theme = $1', [id])
    }

    updateTheme(theme) {
        db.any(
            `
            update theme
            set
                ds_theme = $2
            where
                cd_theme = $1
            `,
            [
                theme.cd_theme,
                theme.ds_theme
            ]
        )
    }

}

module.exports = Theme;