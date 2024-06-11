import discord
from discord.ext import commands
from discord.ui import View, Modal, TextInput
from dotenv import load_dotenv
import os
from datetime import datetime

# Carregar variáveis de ambiente do arquivo .env
load_dotenv()

TOKEN = os.getenv('DISCORD_TOKEN')
CHANNEL_ID = int(os.getenv('CHANNEL_ID'))

intents = discord.Intents.all()
bot = commands.Bot(command_prefix='/', intents=intents)

def normalize_hour_view(hour, is_start):
    if is_start and hour == '-':
        return "Em fila aguardando outros testes"
    if not is_start and hour == '-':
        return "Sem expectativa de hora para finalização"
    if not is_start:
        return hour
    return f"às {hour}"

class BookModal(Modal):
    def __init__(self, view):
        super().__init__(title="Informações sobre o agendamento")
        self.view = view
        current_date = datetime.now().strftime('%d/%m/%Y')
        self.add_item(TextInput(label="Codigo da atividade (Ou descrição)", placeholder="JTV2-000", default="JTV2-"))
        self.add_item(TextInput(label="Data", placeholder="DD/MM/AAAA", default=current_date))
        self.add_item(TextInput(label="Expectativa de início [- = Em fila]", placeholder="HH:MM", default="-"))
        self.add_item(TextInput(label="Expectativa de término [- = Nenhuma]", placeholder="HH:MM", default="-"))
        self.add_item(TextInput(label="Quem irá testar?", placeholder="Tech | Produto | Usuário"))

    async def on_submit(self, interaction: discord.Interaction):
        update_data = {
            "task_code": self.children[0].value,
            "task_time_start": f"{self.children[1].value} {normalize_hour_view(self.children[2].value, True)}",
            "task_time_end": normalize_hour_view(self.children[3].value, False),
            "task_tester": self.children[4].value,
        } | self.view.get_state('schedule')
        
        await self.view.send_embed(interaction, update_data)

class ReBookModal(Modal):
    def __init__(self, view):
        super().__init__(title="Informações da tarefa de teste")
        self.view = view
        current_date = datetime.now().strftime('%d/%m/%Y')
        self.add_item(TextInput(label="Data", placeholder="DD/MM/AAAA", default=current_date))
        self.add_item(TextInput(label="Expectativa de início [- = Em fila]", placeholder="HH:MM", default="-"))
        self.add_item(TextInput(label="Expectativa de término [- = Nenhuma]", placeholder="HH:MM", default="-"))

    async def on_submit(self, interaction: discord.Interaction):
        update_data = {
            "task_time_start": f"{self.children[0].value} {normalize_hour_view(self.children[1].value, True)}",
            "task_time_end": normalize_hour_view(self.children[2].value, False)
        } | self.view.get_state('reschedule')

        await self.view.update_embed(interaction, update_data)
        
class BookinatorView(View):
    def __init__(self):
        super().__init__(timeout=None)
        
    def create_embed(self, task_code, task_time_start, task_time_end, task_tester, modified_by, modified_by_icon, state, embed_color):
        embed = discord.Embed(title="Testes em ambiente de homol", color=embed_color)
        embed.description = "*Em caso de reagendamento ou finalização da tarefa, avise aos outros da fila que seu teste já finalizou.*"
        embed.add_field(name="Estado", value=state, inline=True)
        embed.add_field(name="Codigo da atividade / Descrição", value=task_code, inline=False)
        embed.add_field(name="Expectativa de início", value=task_time_start, inline=False)
        embed.add_field(name="Expectativa de término", value=task_time_end, inline=False)
        embed.add_field(name="Quem irá utilizar o ambiente", value=task_tester, inline=False)
        
        if modified_by:
            embed.set_footer(text=f"Modificado por: {modified_by}", icon_url=modified_by_icon)
        
        return embed

    async def send_embed(self, interaction: discord.Interaction, update_data):       
        embed = self.create_embed(
            task_code=update_data.get("task_code", ""),
            task_time_start=update_data.get("task_time_start", ""),
            task_time_end=update_data.get("task_time_end", ""),
            task_tester=update_data.get("task_tester", ""),
            state=update_data.get("state", ""),
            embed_color=update_data.get("embed_color", ""),
            modified_by=interaction.user.name,
            modified_by_icon=interaction.user.avatar.url
        )
        
        await interaction.response.send_message(embed=embed, view=self)

    async def update_embed(self, interaction: discord.Interaction, update_data):
        try:
            prev_embed = interaction.message.embeds[0].to_dict()

            # Atualiza o valor do campo existente no embed
            state = ""
            for field in prev_embed["fields"]:
                if field["name"] == "Estado":
                    state = update_data.get('state', field['value'])
                    field["value"] = state
                elif field["name"] == "Codigo da atividade / Descrição":
                    field["value"] = update_data.get('task_code', field['value'])
                elif field["name"] == "Expectativa de início":
                    field["value"] = update_data.get('task_time_start', field['value'])
                elif field["name"] == "Expectativa de término":
                    field["value"] = update_data.get('task_time_end', field['value'])
                elif field["name"] == "Quem irá utilizar o ambiente":
                    field["value"] = update_data.get('task_tester', field['value'])

            # Atualiza a cor do embed
            embed_color = update_data.get('embed_color', prev_embed.get('color'))

            # Cria um novo embed com os campos atualizados
            new_embed = discord.Embed.from_dict(prev_embed)
            new_embed.color = embed_color
            new_embed.set_footer(text=f"Modificado por: {interaction.user.name}", icon_url=interaction.user.avatar.url)
            new_embed.description = "*Em caso de reagendamento ou finalização da tarefa, avise aos outros da fila que seu teste já finalizou.*"

            if 'Concluído' in state: 
                await interaction.response.edit_message(embed=new_embed, view=None)
            else: 
                await interaction.response.edit_message(embed=new_embed, view=self)

        except Exception as e:
            print(f"Erro ao atualizar embed: {e}")
            await interaction.response.send_message("Ocorreu um erro ao tentar atualizar o embed.", ephemeral=True)

    def get_state(self, state):
        if state == 'schedule':
            return {"state": '🟡 Agendado', "embed_color": 0xF7CA18 } 
        elif state == 'reschedule':
            return {"state": '🟡 Reagendado', "embed_color": 0xF7CA18 } 
        elif state == 'run_test':
            return {"state": '🔴 Em teste', "embed_color": 0xFF0000 }
        elif state == 'complete_test':
            return {"state": '🔵 Concluído', "embed_color": 0x5539CC }  
        
    @discord.ui.button(
        custom_id='run_test',
        emoji='▶️',
        label='Iniciar teste', 
        style=discord.ButtonStyle.danger 
    )
    
    async def run_test(self, interaction: discord.Interaction, button: discord.ui.Button):
        update_data = self.get_state('run_test')
        await self.update_embed(interaction, update_data)
        
    @discord.ui.button(
        custom_id='reschedule',
        emoji='📅',
        label='Reagendar tarefa', 
        style=discord.ButtonStyle.gray 
    )
    async def reschedule(self, interaction: discord.Interaction, button: discord.ui.Button):
        await interaction.response.send_modal(ReBookModal(self))

    @discord.ui.button(
        custom_id='complete_test',
        emoji='✅',
        label='Concluir teste', 
        style=discord.ButtonStyle.blurple
    )
    async def complete_test(self, interaction: discord.Interaction, button: discord.ui.Button):
        update_data = self.get_state('complete_test')
        await self.update_embed(interaction, update_data)

class BotFacade:
    def get_modal(self):
        view = BookinatorView()  # Create a new view instance
        return BookModal(view)
    
facade = BotFacade()

@bot.tree.command(name="book_homol")
async def book_homol(interaction: discord.Interaction):
    modal = facade.get_modal()  # Use the facade to get a new modal with its own view
    await interaction.response.send_modal(modal)
  
@bot.event
async def on_ready():
    print(f'Bot conectado como {bot.user}')
    try: 
        synced = await bot.tree.sync()
        print(f"Synced {len(synced)} commands(s)")
    except Exception as e:
        print(e)

try:
    bot.run(TOKEN)
except Exception as e:
    print(f"An error occurred: {e}")