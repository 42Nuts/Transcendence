from .twoPlayerMode import twoPlayer

class tournament:
	def __init__(self, player_ids):
		self.players = player_ids
		self.round1_winners = []
		self.final_winners = None
		self.current_game = []

	def start_round1(self):
		self.current_game.append(twoPlayer(self.players[0:2]))
		self.current_game.append(twoPlayer(self.players[2:4]))

	def start_final(self, game_result):

		winner = game_result['winner']
		self.round1_winners.append(winner)

		if len(self.round1_winners) == 2:
			self.current_game.append(twoPlayer(self.round1_winners))

