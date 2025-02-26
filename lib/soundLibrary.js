class SoundLibrary {
	constructor() {
		this.soundState = null;
		this.currentTrack = null;

		this.deathcardCabin = new Audio("audio/DeathcardCabin.mp3");
		this.deathcardCabin.volume = 0.1;
		this.deathcardCabin.loop = true;

		this.bell = new Audio("audio/Bell.mp3");
		this.bell.volume = 0.1;

		this.takeOneCardFromTheDeck = new Audio("audio/TakeOneCardFromTheDeck.mp3");
		this.takeOneCardFromTheDeck.volume = 0.3;
		this.selectCard = new Audio("audio/SelectCard.mp3");
		this.selectCard.volume = 1;
		this.putCard = new Audio("audio/PutCard.mp3");
		this.putCard.volume = 0.3;
		this.hit = new Audio("audio/Hit.mp3");
		this.hit.volume = 0.3;

		this.patheticFool = new Audio("audio/PatheticFool.mp3");
		this.patheticFool.volume = 0.3;
		this.youKnowWhatPainIs = new Audio("audio/YouKnowWhatPainIs.mp3");
		this.youKnowWhatPainIs.volume = 0.3;
		this.nowImReallyAngry = new Audio("audio/NowImReallyAngry.mp3");
		this.nowImReallyAngry.volume = 0.3;
		this.howStupidItWasToBelieveInTheWorld = new Audio("audio/HowStupidItWasToBelieveInTheWorld.mp3");
		this.howStupidItWasToBelieveInTheWorld.volume = 0.3;

		this.creepyViolin = new Audio("audio/CreepyViolin.mp3");
		this.creepyViolin.volume = 0.3;

		this.yourSoulBelongsToMe = new Audio("audio/YourSoulBelongsToMe.mp3");
		this.yourSoulBelongsToMe.volume = 0.3;
		this.tooLateToAskForMercy = new Audio("audio/TooLateToAskForMercy.mp3");
		this.tooLateToAskForMercy.volume = 0.3;
		this.thatsBetter = new Audio("audio/ThatsBetter.mp3");
		this.thatsBetter.volume = 0.3;

		this.needMoreGold = new Audio("audio/NeedMoreGold.mp3");
		this.needMoreGold.volume = 0.3;
	}

	init(sound) {
		this.soundState = sound;
	}

	playTrack(track) {
		if(this.soundState.classList.contains("soundOff")) {
			this.deathcardCabin.pause();
			if(this.currentTrack) {
				this.currentTrack.pause();
				this.currentTrack.currentTime = 0;
			}
			
			return;
		} else {
			track.play();
			this.currentTrack = track;
		}
	}
}