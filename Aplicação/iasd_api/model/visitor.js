const db = require('../helper/dbhelper');


// CREATE TABLE visitor (
//     "cd_visitor" SERIAL,
//     "ds_name" varchar(200)   NOT NULL,
//     "ds_phone" varchar(15)   NOT NULL,
//     "ds_address" varchar(200)   NOT NULL,
//     "ds_mail" varchar(100)   NULL,
//     "dt_born" date   NULL,
//     "x_receive_pray" boolean   NULL,
//     "ds_receive_pray" varchar(200)   NULL,
//     "x_receive_teaching" boolean   NULL,
//     "ds_receive_teaching" varchar(100)   NULL,
//     "x_teaching_friend" boolean   NULL,
//     "x_church_member" boolean   NULL,
//     "x_invited" boolean   NULL,
//     "ds_invitor" varchar(150)   NULL,
//     CONSTRAINT "pk_visitor" PRIMARY KEY (
//         "cd_visitor"
//      )
// );

class Visitor {
    constructor() {
        
    }

    getVisitor(id = null) {
        if (id) {
            return db.any('SELECT * FROM visitor WHERE cd_visitor = $1', [id]);
        }
        return db.any('SELECT * FROM visitor');
    }
    
    addVisitor(visitor) {
        db.any(
            `
            insert into visitor (
                ds_name,
                ds_phone,
                ds_address,
                ds_mail,
                dt_born,
                x_receive_pray,
                ds_receive_pray,
                x_receive_teaching,
                ds_receive_teaching,
                x_teaching_friend,
                x_church_member,
                x_invited,
                ds_invitor
                )
            values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
            `
            ,[
            visitor.ds_name,
            visitor.ds_phone,
            visitor.ds_address,
            visitor.ds_mail,
            visitor.dt_born,
            visitor.x_receive_pray,
            visitor.ds_receive_pray,
            visitor.x_receive_teaching,
            visitor.ds_receive_teaching,
            visitor.x_teaching_friend,
            visitor.x_church_member,
            visitor.x_invited,
            visitor.ds_invitor
            ]
        );
        
        
    }

    deleteVisitor(id) {
        db.any('DELETE FROM visitor WHERE cd_visitor = $1', [id])
    }

    updateVisitor(visitor) {
        db.any(
            `
            update visitor
            set
                ds_name = $2,
                ds_phone = $3,
                ds_address = $4,
                ds_mail = $5,
                dt_born = $6,
                x_receive_pray = $7,
                ds_receive_pray = $8,
                x_receive_teaching = $9,
                ds_receive_teaching = $10,
                x_teaching_friend = $11,
                x_church_member = $12,
                x_invited = $13,
                ds_invitor = $14
            where
                cd_visitor = $1
            `,
            [
                visitor.cd_visitor,
                visitor.ds_name,
                visitor.ds_phone,
                visitor.ds_address,
                visitor.ds_mail,
                visitor.dt_born,
                visitor.x_receive_pray,
                visitor.ds_receive_pray,
                visitor.x_receive_teaching,
                visitor.ds_receive_teaching,
                visitor.x_teaching_friend,
                visitor.x_church_member,
                visitor.x_invited,
                visitor.ds_invitor
            ]
        )
    }

}

module.exports = Visitor;