module.exports = {
  clientId: "1131607197529423952", // The id of the discord bot
  guildId: "1068619752425148456", // The id of the discord server
  mainColor: "f6c42f", // The hex color of the embeds by default
  lang: "main", // If you want to set english please set "main"


  openTicketChannelId: "1131624237392724008", // The id of the channel where the message to create a ticket will be sent
  ticketTypes: [ // You have a limit of 25 types (the limit of Discord)
    {
      codeName: "category-one", // The name need to be in lowercase
      name: "Montażysta", // The name that will be displayed in the ticket
      emoji: "🎞", // The emoji of the type (can be blank)
      color: "#f8312f", // Can be a hex color or blank to use the main color
      categoryId: "1131968735784214528", // The category id where the tickets will be created
      customDescription: "Wyśli pracę 1 minutową z twoim montażem albo wyślij link do filmu na yt z twoim montażem.", // The custom description of the ticket type (set to blank to use the default description)
      askReason: false// If the bot should ask the reason of the ticket
    },
    {
      codeName: "category-two", // The name need to be in lowercase
      name: "Grafik", // The name that will be displayed in the ticket
      emoji: "🎨", // The emoji of the type (can be blank)
      color: "#e1fcad", // Can be a hex color or blank to use the main color
      categoryId: "1131968735784214528", // The category id where the tickets will be created
      customDescription: "Wyślij kilka swoich prac administrator przyjdzie i sprawdzi pracę.", // The custom description of the ticket type (set to blank to use the default description)
      askReason: false // If the bot should ask the reason of the ticket
    },

    {
      codeName: "category-three", // The name need to be in lowercase
      name: "Współpraca", // The name that will be displayed in the ticket
      emoji: "💼", // The emoji of the type (can be blank)
      color: "#993300", // Can be a hex color or blank to use the main color
      categoryId: "1131968735784214528", // The category id where the tickets will be created
      customDescription: "Wyślij link zaproszenia discord i administracja sprawdzi czy nadajesz się na współpracę.", // The custom description of the ticket type (set to blank to use the default description)
      askReason: false // If the bot should ask the reason of the ticket
    },

    {
      codeName: "other", // The name need to be in lowercase
      name: "Inny powód", // The name that will be displayed in the ticket
      emoji: "❔", // The emoji of the type (can be blank)
      color: "#133337", // Can be a hex color or blank to use the main color
      categoryId: "1131968735784214528", // The category id where the tickets will be created
      customDescription: "Daj chwilkę a administracja zaraz napisze \n\nPowód wytworzenia: REASON", // The custom description of the ticket type (set to blank to use the default description)
      askReason: true // If the bot should ask the reason of the ticket
    }
  ],
  ticketNameOption: "Ticket-TICKETCOUNT", // Here is all parameter: USERNAME, USERID, TICKETCOUNT
  rolesWhoHaveAccessToTheTickets: [
    "1131607451842658328", "1068625829644480523", "1091815068615856159", "1068624186509115462", "1091814755259400324", "1069630238880960612", "1091817002970140755", "1068620810325065789", "1091812945425600652", "1069263342201483274",
  ], // Roles who can access to the tickets
  pingRoleWhenOpened: true,
  roleToPingWhenOpenedId: "1068620810325065789", // The role to ping when a ticket is opened
  logs: true,
  logsChannelId: "1131968340936634448", // The id of the channel where the logs will be sent
  claimButton: false,
  whoCanCloseTicket: "EVERYONE", // STAFFONLY (roles configured at "rolesWhoHaveAccessToTheTickets") or EVERYONE
  closeButton: true, // If false the ticket can be closed only by doing /closes
  askReasonWhenClosing: false, // If false the ticket will be closed without asking the reason
  maxTicketOpened: 0 // The number of tickets the user can open while another one is already open. Set to 0 to unlimited
}