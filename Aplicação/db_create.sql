CREATE TABLE person (
    "cd_person" SERIAL,
    "ds_username" varchar(100)   NOT NULL,
    "ds_name" varchar(150)   NOT NULL,
    "ds_password" text   NOT NULL,
    "ds_usertype" varchar(50)   NOT NULL,
    "ds_phone" varchar(17)   NOT NULL,
    "ds_email" varchar(100)   NOT NULL,
    "ds_salt" varchar(100)   NOT NULL,
    CONSTRAINT "pk_person" PRIMARY KEY (
        "cd_person"
     ),
    CONSTRAINT "uc_person_ds_username" UNIQUE (
        "ds_username"
    )
);

CREATE TABLE liturgy (
    "cd_liturgy" SERIAL,
    "cd_preacher" int   NULL,
    "ds_theme" varchar(80)   NOT NULL,
    "ds_description" text   NULL,
    "ds_place" varchar(100)   NOT NULL,
    "dt_liturgy" timestamp   NOT NULL,
    CONSTRAINT "pk_liturgy" PRIMARY KEY (
        "cd_liturgy"
     )
);

CREATE TABLE event (
    "cd_event" BIGSERIAL,
    "cd_liturgy" int   NOT NULL,
    "cd_person" int   NOT NULL,
    "ds_status" varchar(20)   NOT NULL,
    "ds_description" text   NOT NULL,
    "dt_event" timestamp   NOT NULL,
    CONSTRAINT "pk_event" PRIMARY KEY (
        "cd_event"
     )
);

CREATE TABLE visitor (
    "cd_visitor" SERIAL,
    "ds_name" varchar(200)   NOT NULL,
    "ds_phone" varchar(15)   NOT NULL,
    "ds_address" varchar(200)   NOT NULL,
    "ds_mail" varchar(100)   NULL,
    "dt_born" date   NULL,
    "x_receive_pray" boolean   NULL,
    "ds_receive_pray" varchar(200)   NULL,
    "x_receive_teaching" boolean   NULL,
    "ds_receive_teaching" varchar(100)   NULL,
    "x_teaching_friend" boolean   NULL,
    "x_church_member" boolean   NULL,
    "x_invited" boolean   NULL,
    "ds_invitor" varchar(150)   NULL,
    CONSTRAINT "pk_visitor" PRIMARY KEY (
        "cd_visitor"
     )
);

CREATE TABLE theme (
    "cd_theme" SERIAL,
    "ds_theme" varchar(40)   NOT NULL,
    CONSTRAINT "pk_theme" PRIMARY KEY (
        "cd_theme"
     )
);

CREATE TABLE visitor_interest_theme (
    "cd_visitor_theme" SERIAL,
    "cd_visitor" int   NOT NULL,
    "cd_theme" int   NOT NULL,
    CONSTRAINT "pk_visitor_interest_theme" PRIMARY KEY (
        "cd_visitor_theme"
     )
);

CREATE TABLE token_handler(
    "ds_token" text NOT NULL UNIQUE,
    "cd_person" int NOT NULL,
    "dt_created" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "pk_token_handler" PRIMARY KEY (
        "ds_token"
     ),
    CONSTRAINT "fk_token_handler_cd_person" FOREIGN KEY("cd_person") REFERENCES person("cd_person")
);


ALTER TABLE liturgy ADD CONSTRAINT "fk_liturgy_cd_preacher" FOREIGN KEY("cd_preacher")
REFERENCES person ("cd_person");

ALTER TABLE "event" ADD CONSTRAINT "fk_event_cd_liturgy" FOREIGN KEY("cd_liturgy")
REFERENCES liturgy ("cd_liturgy");

ALTER TABLE "event" ADD CONSTRAINT "fk_event_cd_person" FOREIGN KEY("cd_person")
REFERENCES person ("cd_person");

ALTER TABLE "visitor_interest_theme" ADD CONSTRAINT "fk_visitor_interest_theme_cd_visitor" FOREIGN KEY("cd_visitor")
REFERENCES visitor ("cd_visitor");

ALTER TABLE "visitor_interest_theme" ADD CONSTRAINT "fk_visitor_interest_theme_cd_theme" FOREIGN KEY("cd_theme")
REFERENCES theme ("cd_theme");

