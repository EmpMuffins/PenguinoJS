exports.run = async (client, msg, args) => {
  
  if (client.mongo) {
    let Prefixes = client.mongo.models.Prefixes
    let thePrefix = async () => await Prefixes.findOne({ guildid: msg.guild.id });
    let current = await thePrefix();
    if (!current) {
        let newGuild = new client.mongo.models.Prefixes({ guildid: msg.guild.id })
        newGuild.save((err, res) => { if (err) return console.error(err) })
    } 

    if (args[0]) {
      if (!msg.member.hasPermission("MANAGE_CHANNELS", {checkAdmin: true, checkOwner: true})) return msg.channel.send("You're not a manager! Required: \n(MANAGE_CHANNELS, ADMINISTRATOR, or OWNER)")
      Prefixes.findOneAndUpdate({guildid: msg.guild.id}, {prefix: args[0]}).then((res) => {
        msg.channel.send(`Old: ${res.prefix}\nNew: ${args[0]}`)
      })
    } else { msg.channel.send(`Prefix: ${current.prefix}`) }
  } else msg.channel.send("Unable to access records. Use prefix: >")
}

exports.help = {
  name: 'prefix',
  desc: "Shows server prefix, Admins can change",
  type: "Server Info",
  usage: "prefix <new prefix>",
  owner: false,
  locked: false,
  guild: true
}