const db = require('../helper/dbhelper');


// CREATE TABLE event (
//     "cd_event" BIGSERIAL,
//     "cd_liturgy" int   NOT NULL,
//     "cd_person" int   NOT NULL,
//     "ds_status" varchar(20)   NOT NULL,
//     "ds_description" text   NOT NULL,
//     "dt_event" timestamp   NOT NULL,
//     CONSTRAINT "pk_event" PRIMARY KEY (
//         "cd_event"
//      )
// );

class Event {
    constructor() {
        
    }

    getEvent(id = null) {
        if (id) {
            return db.any('SELECT * FROM event WHERE cd_event = $1', [id]);
        }
        return db.any('SELECT * FROM event');
    }
    
    addEvent(event) {
        db.any(
            `
            insert into event (
                cd_liturgy,
                cd_person,
                ds_status,
                ds_description,
                dt_event
                )
            values ($1,$2,$3,$4,$5)
            `
            ,[
            event.cd_liturgy,
            event.cd_person,
            event.ds_status,
            event.ds_description,
            event.dt_event
            ]
        );
        
        
    }

    deleteEvent(id) {
        db.any('DELETE FROM event WHERE cd_event = $1', [id])
    }

    updateEvent(event) {
        db.any(
            `
            update event
            set
                cd_liturgy = $2,
                cd_person = $3,
                ds_status = $4,
                ds_description = $5,
                dt_event = $6
            where
                cd_event = $1
            `,
            [
                event.cd_event,
                event.cd_liturgy,
                event.cd_person,
                event.ds_status,
                event.ds_description,
                event.dt_event
            ]
        )
    }

}

module.exports = Event;