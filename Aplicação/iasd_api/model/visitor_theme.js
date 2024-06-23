const db = require('../helper/dbhelper');


// CREATE TABLE visitor_interest_theme (
//     "cd_visitor_theme" SERIAL,
//     "cd_visitor" int   NOT NULL,
//     "cd_theme" int   NOT NULL,
//     CONSTRAINT "pk_visitor_interest_theme" PRIMARY KEY (
//         "cd_visitor_theme"
//      )
// );

class VisitorInterestTheme {
    constructor() {
        
    }

    getVisitorInterestTheme(id = null) {
        if (id) {
            return db.any('SELECT * FROM visitor_interest_theme WHERE cd_visitor_interest_theme = $1', [id]);
        }
        return db.any('SELECT * FROM visitor_interest_theme');
    }
    
    addVisitorInterestTheme(visitorInterestTheme) {
        db.any(
            `
            insert into visitor_interest_theme (
               cd_visitor,
                cd_theme
            `
            ,[
            visitorInterestTheme.cd_visitor,
            visitorInterestTheme.cd_theme
            ]
        );
        
        
    }

    deleteVisitorInterestTheme(id) {
        db.any('DELETE FROM visitor_interest_theme WHERE cd_visitor_interest_theme = $1', [id])
    }

    updateVisitorInterestTheme(visitorInterestTheme) {
        db.any(
            `
            update visitor_interest_theme
            set
                cd_visitor = $2,
                cd_theme = $3
            where
                cd_visitor_interest_theme = $1
            `,
            [
                visitorInterestTheme.cd_visitor_interest_theme,
                visitorInterestTheme.cd_visitor,
                visitorInterestTheme.cd_theme
            ]
        )
    }

}

module.exports = VisitorInterestTheme;