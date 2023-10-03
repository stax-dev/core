//API Routes file

/*
This file contains all the api routes/links to backend
Its good practice to keep all the api routes in one file
If anything changes it'll be updated automatically throughout the frontend code
*/

//also its not json cause i want to leave notes here

//API Routes

var url = "https://api.st.ax/sds/"


export const APIRoutes = {

    //Links ----------------------------------------------

    URL: url,
    userURL: url + "users/",
    planURL: url + "plans/",
    chatroomURL: url + "chatrooms/",
    statusURL: url + "status/",

    meURL: url + "users/me",
    //gets userID from sessionID

    //User Data ----------------------------------------------

    userID: "/userID",
    //VARCHAR(36)
    //universal unique id

    username: "/username",
    //VARCHAR(16)
    //unique username max 16 characters

    userAvatar: "/userAvatar",
    //BLOB
    //user avatar image

    firstName: "/firstName",
    //VARCHAR(100)
    //first name

    lastName: "/lastName",
    //VARCHAR(100)
    //last name

    appTheme: "/appTheme",
    //VARCHAR(50)
    //dark/light

    bannerID: "/bannerID",
    //TINYINT
    //1-6 colour choice

    userRank: "/userRank",
    //VARCHAR(100)
    //member or employee (in case future membership plans)

    userWallet: "/userWallet",
    //VARCHAR(36)
    //UUID walletid linked to user

    joinDate: "/joinDate",
    //DATE
    //date joined

    emailList: "/emailList",
    //
    //array - ID, email address, default (true/false)

    disposableCount: "/disposableCount",
    //TINYINT
    //how many disposable droplets left

    dispoableActive: "/dispoableActive",
    //BOOLEAN
    //if user has disposable droplet active or not

    planList: "/planList",
    //
    //array - ["ID", "ID"]

    accountStatus: "/accountStatus",
    //VARCHAR(15)
    //fixed status - Locked Open Disabled Deleted

    loginActivityList: "/loginActivityList",
    //
    //array - ID, deviceType, location, lastLogin, current (true/false) [current device?]

    passwordLastChanged: "/passwordLastChanged",
    //DATETIME
    //last password change

    notificationList: "/notificationList",
    //
    //array - ID, unread? (true false), title, info, link

    chatroomPing: "/chatroomPing",
    //TINYINT
    //number of unread notifications

    //Wallets Data  ----------------------------------------------

    walletID: "/walletID",
    //VARCHAR(36)
    //universal unique id

    linkedUserID: "/linkedUserID",
    //VARCHAR() - havent decided length
    //userID linked to user

    userBalance: "/userBalance",
    //DECIMAL(10,2)
    //user wallet balance

    transactionList: "/transactionList",
    //
    //array - ID, transactionTypeID (topup/purchase..etc), date, paymentUsed, amount

    addressList: "/addressList",
    //
    //array - ID, nickname, address, default (true/false), address (line1, line2 not finished)

    paymentList: "/paymentList",
    //
    //array - ID, name, cvv (if card - if not null or empty)
    //paymentType (visa/mastercard/paypal..etc), expiry (date if card - if not null or empty)
    //info (card no/paypal email/main info), linkedAddressID, default (true/false)


    //Plan Data ----------------------------------------------

    planName: "/planName",
    //VARCHAR(16)
    //plan name max 16 characters

    planID: "/planID",
    //VARCHAR(36)
    //universal unique id planid

    planCreationDate: "/planCreationDate",
    //DATETIME
    //date created plan

    planStorage: "/planStorage",
    //MEDIUMINT
    //plan storage in GB

    planRAM: "/planRAM",
    //SMALLINT
    //plan ram in GB

    planStatus: "/planStatus",
    //BOOLEAN
    //active or expired - 1 active, 0 expired

    serverStatus: "/serverStatus",
    //BOOLEAN
    //1 online, 0 offline

    memberList: "/memberList",
    //
    //array - userID, plan join date

    snapshotList: "/snapshotList",
    //
    //JSON - snapshotID, title, userID, creationDate

    planUptime: "/planUptime",
    //MEDIUMINT
    //up to 1000 hours

    planCPUData: "/planCPUData",
    //
    //live cpu data

    planRAMData: "/planRAMData",
    //
    //live ram data

    planOwnerID: "/planOwnerID",
    //VARCHAR() - havnet decided length
    //userID here of plan owner

    planExpiry: "/planExpiry",
    //DATETIME
    //expiry of plan

    planHistory: "/planHistory",
    //
    //array - date, userID of person, details

    planFiles: "/planFiles",
    //
    //array - name, data, size, date created, last modified

    autoRenew: "/autoRenew",
    //BOOLEAN
    //true means autorenew, false means not




    //Chatroom Data ----------------------------------------------

    chatroomType: "/chatroomType",
    //VARCHAR(10)
    //account or plan chatroom

    chatroomID: "/chatroomID",
    //VARCHAR() - havent decided what length
    //universal unique id

    chatroomChats: "/chatroomChats",
    //
    //array - author userID, message, timestamp, edited (true/false)

    chatroomMembers: "/chatroomMembers",
    //
    //array - userID, user permission (if they can access)

    chatroomLinkedID: "/chatroomLinkedID",
    //VARCHAR() - havent decided what length
    //planID or userID that the chat is linked to



};