/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2018/4/11 12:45:57                           */
/*==============================================================*/


drop table if exists actor;

drop table if exists bangumi;

drop table if exists cv;

drop table if exists discuss;

drop table if exists follow;

drop table if exists group_discuss;

drop table if exists group_menber;

drop table if exists job;

drop table if exists role;

drop table if exists share;

drop table if exists staff;

drop table if exists tag;

drop table if exists type;

drop table if exists user;

drop table if exists user_group;

/*==============================================================*/
/* Table: actor                                                 */
/*==============================================================*/
create table actor
(
   bangumi_id           numeric(9,0),
   cv_id                numeric(9,0),
   role_id              numeric(11,0)
);

/*==============================================================*/
/* Table: bangumi                                               */
/*==============================================================*/
create table bangumi
(
   id                   numeric(9,0) not null,
   name                 longtext,
   detail               longtext,
   show_pic             longtext,
   start_date           date,
   send_date            longtext,
   progress_total       int,
   score_total          float,
   primary key (id)
);

/*==============================================================*/
/* Table: cv                                                    */
/*==============================================================*/
create table cv
(
   id                   numeric(9,0) not null,
   name                 longtext,
   detail               longtext,
   show_pic             longtext,
   primary key (id)
);

/*==============================================================*/
/* Table: discuss                                               */
/*==============================================================*/
create table discuss
(
   bangumi_id           numeric(9,0),
   use_id               numeric(9,0),
   content              longtext,
   type                 smallint,
   time                 timestamp
);

/*==============================================================*/
/* Table: follow                                                */
/*==============================================================*/
create table follow
(
   user_id              numeric(9,0),
   bangumi_id           numeric(9,0),
   progress             int,
   score                float,
   status               int
);

/*==============================================================*/
/* Table: group_discuss                                         */
/*==============================================================*/
create table group_discuss
(
   group_id             numeric(6,0),
   user_id              numeric(9,0),
   title                longtext,
   content              longtext,
   reply                smallint,
   reply_id             numeric(9,0),
   position             int
);

/*==============================================================*/
/* Table: group_menber                                          */
/*==============================================================*/
create table group_menber
(
   group_id             numeric(6,0),
   user_id              numeric(9,0)
);

/*==============================================================*/
/* Table: job                                                   */
/*==============================================================*/
create table job
(
   staff_id             numeric(9,0),
   bangumi_id           numeric(9,0),
   position             longtext
);

/*==============================================================*/
/* Table: role                                                  */
/*==============================================================*/
create table role
(
   id                   numeric(11,0) not null,
   name                 longtext,
   detaile              longtext,
   show_pic             longtext,
   primary key (id)
);

/*==============================================================*/
/* Table: share                                                 */
/*==============================================================*/
create table share
(
   id                   numeric(11,0) not null,
   user_id              numeric(9,0),
   title                longtext,
   content              longtext,
   primary key (id)
);

/*==============================================================*/
/* Table: staff                                                 */
/*==============================================================*/
create table staff
(
   id                   numeric(9,0) not null,
   name                 longtext,
   detail               longtext,
   show_pic             longtext,
   job                  longtext,
   primary key (id)
);

/*==============================================================*/
/* Table: tag                                                   */
/*==============================================================*/
create table tag
(
   id                   numeric(6,0) not null,
   name                 longtext,
   primary key (id)
);

/*==============================================================*/
/* Table: type                                                  */
/*==============================================================*/
create table type
(
   tag_id               numeric(6,0),
   bangumi_id           numeric(9,0)
);

/*==============================================================*/
/* Table: user                                                  */
/*==============================================================*/
create table user
(
   id                   numeric(9,0) not null,
   psw                  varchar(20) not null,
   name                 longtext,
   ps                   longtext,
   sign_time            date not null,
   tel                  varchar(20),
   mail                 longtext,
   profile              longtext,
   primary key (id)
);

/*==============================================================*/
/* Table: user_group                                            */
/*==============================================================*/
create table user_group
(
   id                   numeric(6,0) not null,
   name                 longtext,
   detail               longtext,
   primary key (id)
);

alter table actor add constraint FK_Reference_13 foreign key (bangumi_id)
      references bangumi (id) on delete restrict on update restrict;

alter table actor add constraint FK_Reference_20 foreign key (cv_id)
      references cv (id) on delete restrict on update restrict;

alter table actor add constraint FK_Reference_21 foreign key (role_id)
      references role (id) on delete restrict on update restrict;

alter table discuss add constraint FK_Reference_10 foreign key (bangumi_id)
      references bangumi (id) on delete restrict on update restrict;

alter table discuss add constraint FK_Reference_11 foreign key (use_id)
      references user (id) on delete restrict on update restrict;

alter table follow add constraint FK_Reference_5 foreign key (user_id)
      references user (id) on delete restrict on update restrict;

alter table follow add constraint FK_Reference_6 foreign key (bangumi_id)
      references bangumi (id) on delete restrict on update restrict;

alter table group_discuss add constraint FK_Reference_16 foreign key (group_id)
      references user_group (id) on delete restrict on update restrict;

alter table group_discuss add constraint FK_Reference_17 foreign key (user_id)
      references user (id) on delete restrict on update restrict;

alter table group_menber add constraint FK_Reference_14 foreign key (group_id)
      references user_group (id) on delete restrict on update restrict;

alter table group_menber add constraint FK_Reference_15 foreign key (user_id)
      references user (id) on delete restrict on update restrict;

alter table job add constraint FK_Reference_22 foreign key (staff_id)
      references staff (id) on delete restrict on update restrict;

alter table job add constraint FK_Reference_23 foreign key (bangumi_id)
      references bangumi (id) on delete restrict on update restrict;

alter table share add constraint FK_Reference_8 foreign key (user_id)
      references user (id) on delete restrict on update restrict;

alter table type add constraint FK_Reference_18 foreign key (tag_id)
      references tag (id) on delete restrict on update restrict;

alter table type add constraint FK_Reference_19 foreign key (bangumi_id)
      references bangumi (id) on delete restrict on update restrict;

