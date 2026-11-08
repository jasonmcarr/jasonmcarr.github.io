import os
import asyncio
import discord
from contextlib import suppress

TOKEN = os.environ["DISCORD_BOT_TOKEN"]
GUILD = os.environ.get("DISCORD_GUILD_ID", "")
BOT_ID = os.environ.get("DISCORD_BOT_ID", "")
client = discord.Client(intents=discord.Intents.default())


@client.event
async def on_ready():
    for guild in client.guilds:
        if guild.name == GUILD:
            break
    print(
        f'{client.user} is connected to the following guild:\n'
        f'{guild.name}(id: {guild.id})'
    )


@client.event
async def on_message(message):
    channel = message.channel.name
    restricted_channels = ["vc-text-chat"]

    if channel in restricted_channels:
        if message.author.bot:
            return
        elif message.author.id != BOT_ID:
            await asyncio.sleep(43200) #optional - sleeps for x seconds
            with suppress(discord.errors.NotFound): #ignore deleted messages error
                await message.delete()
    else:
        return


client.run(TOKEN)
