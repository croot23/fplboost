package com.josephcroot.service;

import java.util.HashSet;
import java.util.Set;

import com.josephcroot.entity.Player;
import com.josephcroot.entity.Team;

public class AutomaticSubstitutions {

	final int GOALKEEPER = 1;
	final int DEFENDER = 2;
	final int MIDFIELDER = 3;
	final int FORWARD = 4;
	
	final boolean ADD = true;
	final boolean REMOVE = false;

	int defenders = 0;
	int midfielders = 0;
	int strikers = 0;
	
	Set<Player> playersToAdd = new HashSet<>();
	Set<Player> playersToRemove = new HashSet<>();

	private void changeFormation(int position, boolean add) {
		if (position == DEFENDER)
			defenders = (add) ? defenders + 1 : defenders - 1;
		if (position == MIDFIELDER)
			midfielders = (add) ? midfielders + 1 : midfielders - 1;
		if (position == FORWARD)
			strikers = (add) ? strikers + 1 : strikers - 1;
	}
	
	private boolean playerPlayed(Player player) {
		if (player.didNotPlay() == false && player.getMinutesPlayed() > 0)
			return true;
		return false;		
	}

	private boolean checkAnySubstitutesActuallyPlayed(Set<Player> substitutes) {
		for (Player substitute : substitutes) {
			if (playerPlayed(substitute)) 
				return true;
		}
		return false;
	}

	private boolean checkAnyPlayersNeedSubstituting(Set<Player> players) {
		for (Player player : players) {
			if (player.didNotPlay() == true)
				return true;
		}
		return false;
	}

	private boolean canBeReplacedByAnySub(int position) {
		if (position == GOALKEEPER) { return false; }
		if (position == DEFENDER && defenders > 3) { return true; }
		if (position == MIDFIELDER && midfielders > 2) { return true; }
		if (position == FORWARD && strikers > 1) { return true; }
		return false;
	}

	private boolean couldBeReplacedByASubThatHasntPlayedYet(boolean canBeReplacedByAnySub, int playerToBeSubbedPosition,
			Set<Player> substitutes, Set<Player> playersToAdd) {
			for (Player substitute : substitutes) {
				if (!playersToAdd.contains(substitute) && substitute.getPosition() != GOALKEEPER) {
					if (!playerPlayed(substitute) 
						&& ((substitute.getPosition() == playerToBeSubbedPosition && !canBeReplacedByAnySub)
						|| canBeReplacedByAnySub)) {
						return true;
					} else if (playerPlayed(substitute) 
						&& ((substitute.getPosition() == playerToBeSubbedPosition && !canBeReplacedByAnySub)
						|| canBeReplacedByAnySub)) {
						return false;
					}
			}
		}
		return false;
	}

	private void makeSubstitution(Player player, Player substitute) {
		playersToAdd.add(substitute);
		playersToRemove.add(player);
		changeFormation(player.getPosition(), REMOVE);
		changeFormation(substitute.getPosition(), ADD);
	}

	public Team calculateSubstitutions(Team team) {

		// Get First Eleven & Substitutes
		Set<Player> substitutes = team.getSubstitutes();
		Set<Player> firstEleven = team.getPlayers();

		// Check any substitutes actually played before bothering...
		if (!checkAnySubstitutesActuallyPlayed(substitutes)) {
			return team;
		}

		// Check any players actually need substituting before bothering...
		if (!checkAnyPlayersNeedSubstituting(firstEleven)) {
			return team;
		}

		// Get Initial Formation (important to ensure substitutions won't result in an invalid formation)
		for (Player player : firstEleven) {
			changeFormation(player.getPosition(), ADD);
		}

		// Does The Goalkeeper Need Replacing (This will always be a straight swap so it's easy to work out)
		for (Player player : firstEleven) {
			if (player.getPosition() == GOALKEEPER && player.didNotPlay() == true) {
				for (Player substitute : substitutes) {
					if (substitute.getPosition() == GOALKEEPER && playerPlayed(substitute)) 
						{
							makeSubstitution(player, substitute);
						}
				}
			}
		}

		// Get All The Out field Players That Didn't Play
		Set<Player> playersInFirstElevenThatDidNotPlay = new HashSet<>();
		for (Player player : firstEleven) {
			int playerPosition = player.getPosition();
			if (player.didNotPlay() == true && playerPosition != GOALKEEPER) {
				playersInFirstElevenThatDidNotPlay.add(player);
			}
		}
		// Go Through Players That Need To Be Substituted And Calculate If A Sub Can Be Made
		int substitutesRemaining = 3;
		int subsWaiting = 0;
		for (Player player : playersInFirstElevenThatDidNotPlay) {
			int playerPosition = player.getPosition();
			boolean canBeReplacedByAnySub = canBeReplacedByAnySub(playerPosition);
			boolean couldBeReplacedByASubThatHasntPlayedYet = couldBeReplacedByASubThatHasntPlayedYet(
					canBeReplacedByAnySub(playerPosition), playerPosition, substitutes, playersToAdd);
			int iteration = 0;
			for (Player substitute : substitutes) {
				iteration++;
				int substitutePosition = substitute.getPosition();
				// if substitute isn't a GK and hasn't already been subbed
				if (substitute.getPosition() != GOALKEEPER && !playersToAdd.contains(substitute)) {
					// If it could be a simple substitution
					if (!couldBeReplacedByASubThatHasntPlayedYet) {
						// If substitute has played and the player can be replaced by any substitute, go ahead
						if (playerPlayed(substitute) && ((canBeReplacedByAnySub) || (substitutePosition == playerPosition))) {
							makeSubstitution(player, substitute);
							substitutesRemaining--;
							break;
						} else {
							subsWaiting++;
							break;
						}
					// If it cannot be a simple substitution BUT they might still be able to be subbed on
					} else if (subsWaiting > 0 && playerPlayed(substitute)
								&& ((!canBeReplacedByAnySub && substitutePosition == playerPosition) || (canBeReplacedByAnySub))) {
						makeSubstitution(player, substitute);
						substitutesRemaining--;
						subsWaiting--;
						break;
					} else {
						if (iteration == substitutes.size()) {
							subsWaiting++;
						}
					}
				}
			}
			if (substitutesRemaining == 0) {
				break;
			}
		}

		for (Player player : playersToRemove) {
			firstEleven.remove(player);
			substitutes.add(player);
		}
		for (Player player : playersToAdd) {
			firstEleven.add(player);
			substitutes.remove(player);
		}
		
		// Ensure team is valid before updating
		if (substitutes.size() == 4 && firstEleven.size() == 11) {
			team.setPlayers(firstEleven);
			team.setSubstitutes(substitutes);
		}
		return team;
	}
}
