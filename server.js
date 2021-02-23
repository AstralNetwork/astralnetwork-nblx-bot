const Discord = require("discord.js");
const bot = new Discord.Client();
const { prefix, token, cookie, color, GroupId } = require("./config.json");
const nblx = require("noblox.js"); 
const {Green, Red} = require("./colors.json");
const bloxy = require("bloxy"); //impostor amogus 
const fs = require("fs")


nblx.setCookie(cookie);
bot.on("ready", () => {
    nblx.getCurrentUser().then(currentuser => {
        if(!currentuser)
    console.warn("You forgot to add a cookie to config.json u dummy...")
    else
    console.log(`Logged on Discord: ${bot.user.tag} \nCurrent Roblox user: ${currentuser.UserName} \nCurrent userId: ${currentuser.UserID}`)})
 bot.user.setPresence({
  status: 'idle', //Online or idle or whatever
  activity: {
      name: `Ranking bot etc`, /// This is the activity of the bot, change it to whatever u want
      type: 'LISTENING', ///Activity type, listening/streaming etc , go here for info https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/frequently-asked-questions.md
  }
})});
bot.on("message", message => {
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");
  const command = args.shift().toLowerCase(); 

  bot.on("message", message => {
    if (message.content.toLowerCase() == "shutdown") { 
        if (message.author.id === ("375823027675463680")) //My discord id, so I can shut down my own bot(Change the id to urs)
        message.channel.send("Initiating Shutdown").then(() => {
            bot.destroy()
        })
    }
})

  if (command === "getownership") { 
    const member = message.author;
    const name = message.author.username;
    const url = member.displayAvatarURL();
    if (message.member.hasPermission("VIEW_CHANNEL")) {
        if (!args[0]) {
            message.channel.send("Please include a username");
        } else {
            const mem = args[0];
            const assetid = args[1]
            nblx.getIdFromUsername(mem).then(id => {
                    if (!id) {
                        message.channel.send("Unable to find user");
                    } else {
                        nblx.getOwnership(id, assetid).then((value) => { ///---Get ownership to an asset
                                console.log(value);
                                if (value === true) 
                                message.channel.send(new Discord.MessageEmbed()
                                .setTitle(`${mem}`).setColor(GREEN).addField("Does player owns this asset?", `**${value}**`).setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`).setTimestamp(message.createdAt).setFooter(`Prompted by ${name}`).setAuthor(name, url))
                          else 
                        {message.channel.send(new Discord.MessageEmbed()
                            .setTitle(`${mem}`).setColor(GREEN).addField("Does player owns this asset?", `**${value}**`).setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`).setTimestamp(message.createdAt).setFooter(`Prompted by ${name}`).setAuthor(name, url))}
                              }
                        )
                          }
                        });
                }
            }
            else {
                const redembed = new Discord.MessageEmbed()
                    .setColor(RED)
                    .setTitle("Requirements not met")
                    .setDescription("You do not meet the requirements to access this command!")
                    .setTimestamp(message.createdAt).setFooter(`Prompted by ${name}`).setAuthor(name, url)
                message.channel.send(redembed);
            }
        }

        if (command === "getping") {
            var yourping = new Date().getTime() - message.createdTimestamp
            var botping = Math.round(bot.ws.ping)
            const member = message.author;
            const name = message.author.username;
            const url = member.displayAvatarURL();
            if (message.member.hasPermission("VIEW_CHANNEL")) {
             message.channel.send(new Discord.MessageEmbed()
            .setTitle(`Ping Latency`).setColor(GREEN).addField(`${name}'s ping `, `${yourping} MS`).addField(`OmniTech AI's ping`, `${botping} MS`).setTimestamp(message.createdAt).setFooter(`Prompted by ${name}`).setAuthor(name, url)); 
            }
                }
                if (command === "getoutfits") {//Basically get's the number of outfits of a player(lame)
                    const member = message.author;
                    const name = message.author.username;
                    const url = member.displayAvatarURL();
                    if (message.member.hasPermission("VIEW_CHANNEL")) {
                        if (!args[0]) {
                            message.channel.send("Please include a username");
                        } else {
                            const mem = args[0];
                            const assetid = args[1]
                            nblx.getIdFromUsername(mem).then(id => {
                                    if (!id) {
                                        message.channel.send("Unable to find user");
                                    } else {
                                        nblx.outfits(id).then((value) => {
                                                console.log(value.data.length);
                                                if (value) 
                                                message.channel.send(new Discord.MessageEmbed()
                                                .setTitle(`${mem}'s Outfit`).setColor(GREEN).addField("Number of outfits", value.data.length).setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`).setTimestamp(message.createdAt).setFooter(`Prompted by ${name}`).setAuthor(name, url)); 
                                            else 
                                        {message.channel.send(`${mem} ERROR`)}}
                                        )
                                          }
                                        });
                                }
                            }
                            else {
                                const redembed = new Discord.MessageEmbed()
                                    .setColor(RED)
                                    .setTitle("Requirements not met")
                                    .setDescription("You do not meet the requirements to access this command!")
                                message.channel.send(redembed);
                            }
                        }

                                if (command === "getuserinfo") {
                                    const member = message.author;
                                    const name = message.author.username;
                                    const url = member.displayAvatarURL();
                                    if (message.member.hasPermission("VIEW_CHANNEL")) {
                                        if (!args[0]) {
                                            message.channel.send("Please include a username");
                                        } else {
                                            const mem = args[0];
                                            const assetid = args[1]
                                            nblx.getIdFromUsername(mem).then(id => {
                                                    if (!id) {
                                                        message.channel.send("Unable to find user");
                                                    } else {
                                                        nblx.getPlayerInfo(id).then((value) => {
                                                                console.log(value);
                                                                console.log(id);
                                                                if (value) 
                                                                message.channel.send(new Discord.MessageEmbed()
                                                                .setTitle(`${mem} Information`).setColor(GREEN).addField(`Past Usernames`, `-*${value.oldNames}*-`).addField("Current Status", `-**${value.status}**-`).addField("Description", `-**${value.blurb}**-`).addField("Joined", `[${value.joinDate}]`).addField("Account Age", `${value.age} Days`).setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`).setTimestamp(message.createdAt).setFooter(`Prompted by ${name}`).setAuthor(name, url)) 
                                                         else
                                                         {message.channel.send(`ERROR`)}  
                                                        }
                                                         )
                                                           }
                                                         });
                                                 }
                                             }
                                            else {
                                                const redembed = new Discord.MessageEmbed()
                                                    .setColor(RED)
                                                    .setTitle("Requirements not met")
                                                    .setDescription("You do not meet the requirements to access this command!")
                                                    .setTimestamp(message.createdAt).setFooter(`Prompted by ${name}`).setAuthor(name, url)
                                                message.channel.send(redembed);
                                            }
                                        }

                                        if (command === "promote") { ///Promote player in a group(+1 rank) https://noblox.js.org/global.html#promote
                                            if (!GroupId)
                                            console.warn("You didn't even place any groupid, check config.json...(nerd)")
                                            else
                                          var member = message.author;
                                          const name = message.author.username;
                                          const url = member.displayAvatarURL();
                                          if (message.member.hasPermission("ADMINISTRATOR")) {
                                              if (!args[0]) {
                                                  message.channel.send("Please include a username");
                                              } else {
                                                  const mem = args[0];
                                                  nblx.getIdFromUsername(mem).then(id => {
                                                      if (!id) {
                                                          message.channel.send("Unable to find user Id");
                                                      } else {
                                                          nblx.promote(GroupId, id);
                                                          const embed = new Discord.MessageEmbed()
                                                              .setColor(GREEN)
                                                              .setThumbnail(
                                                                  `https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`
                                                              )
                                                              .setTitle("Promoted Successfully")
                                                              .setDescription(
                                                                  `Promoted ${mem}`
                                                              )
                                                              .setTimestamp(message.createdAt).setFooter(`Prompted by ${name}`).setAuthor(name, url)
                                                          message.channel.send(embed);
                                                      }
                                                  });
                                              }
                                          } else {
                                              const redembed = new Discord.MessageEmbed()
                                                  .setColor(RED)
                                                  .setTitle("Requirements not met")
                                                  .setDescription("You do not meet the requirements to access this command!")
                                                  .setTimestamp(message.createdAt).setFooter(`Prompted by ${name}`).setAuthor(name, url)
                                                  message.channel.send(redembed);
                                          }
                                        }


                                        if (command === "demote") { ///Demote player in a group(-1 rank) https://noblox.js.org/global.html#demote
                                            if (!GroupId)
                                            console.warn("You didn't even place any groupid, check config.json...(nerd)")
                                            else
                                          var member = message.author;
                                          const name = message.author.username;
                                          const url = member.displayAvatarURL();
                                          if (message.member.hasPermission("ADMINISTRATOR")) {
                                              if (!args[0]) {
                                                  message.channel.send("Please include a username");
                                              } else {
                                                  const mem = args[0];
                                                  nblx.getIdFromUsername(mem).then(id => {
                                                      if (!id) {
                                                          message.channel.send("Unable to find user Id");
                                                      } else {
                                                          nblx.promote(GroupId, id);
                                                          const embed = new Discord.MessageEmbed()
                                                              .setColor(GREEN)
                                                              .setThumbnail(
                                                                  `https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`
                                                              )
                                                              .setTitle("Demoted Successfully")
                                                              .setDescription(
                                                                  `Demoted ${mem}`
                                                              )
                                                              .setTimestamp(message.createdAt).setFooter(`Prompted by ${name}`).setAuthor(name, url)
                                                          message.channel.send(embed);
                                                      }
                                                  });
                                              }
                                          } else {
                                              const redembed = new Discord.MessageEmbed()
                                                  .setColor(RED)
                                                  .setTitle("Requirements not met")
                                                  .setDescription("You do not meet the requirements to access this command!")
                                                  .setTimestamp(message.createdAt).setFooter(`Prompted by ${name}`).setAuthor(name, url)
                                                  message.channel.send(redembed);
                                          }
                                        }
                                        

        if (command === "kick") { ///kicks player from a group
            if (!GroupId)
            console.warn("You didn't even place any groupid, check config.json...(nerd)")
            else
          var member = message.author;
          const name = message.author.username;
          const url = member.displayAvatarURL();
          if (message.member.hasPermission("ADMINISTRATOR")) {
              if (!args[0]) {
                  message.channel.send("Please include a username");
              } else {
                  const mem = args[0];
                  nblx.getIdFromUsername(mem).then(id => {
                      if (!id) {
                          message.channel.send("Unable to find user Id");
                      } else {
                          nblx.exile(GroupId, id);
                          const embed = new Discord.MessageEmbed()
                              .setColor(GREEN)
                              .setThumbnail(
                                  `https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`
                              )
                              .setTitle("Kicked Successfully")
                              .setDescription(
                                  `**${args}** has been kicked from the group.`
                              )
                              .setTimestamp(message.createdAt).setFooter(`Prompted by ${name}`).setAuthor(name, url)
                          message.channel.send(embed);
                      }
                  });
              }
          } else {
              const redembed = new Discord.MessageEmbed()
                  .setColor(RED)
                  .setTitle("Requirements not met")
                  .setDescription("You do not meet the requirements to access this command!")
                  .setTimestamp(message.createdAt).setFooter(`Prompted by ${name}`).setAuthor(name, url)
              message.channel.send(redembed);
          }
      }
})



bot.login(token);
