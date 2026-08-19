import type { SoundEffect } from "./types";

function makeSound(
	partial: Pick<
		SoundEffect,
		"id" | "name" | "username" | "duration" | "tags" | "license" | "downloads"
	> &
		Partial<Omit<SoundEffect, "id" | "name" | "username" | "duration" | "tags" | "license" | "downloads">>,
): SoundEffect {
	return {
		description: "",
		url: "",
		previewUrl: undefined,
		downloadUrl: undefined,
		filesize: 0,
		type: "audio",
		channels: 2,
		bitrate: 128,
		bitdepth: 16,
		samplerate: 44100,
		rating: 4.5,
		ratingCount: 120,
		created: new Date().toISOString(),
		...partial,
	};
}

export const MOCK_SOUNDS: SoundEffect[] = [
	makeSound({
		id: 1001,
		name: "Cinematic Whoosh",
		username: "opencut",
		duration: 1.8,
		tags: ["whoosh", "transition", "swoosh", "motion"],
		license: "Creative Commons 0",
		downloads: 48210,
	}),
	makeSound({
		id: 1002,
		name: "Soft Pop",
		username: "opencut",
		duration: 0.4,
		tags: ["pop", "ui", "click", "bubble"],
		license: "Creative Commons 0",
		downloads: 39102,
	}),
	makeSound({
		id: 1003,
		name: "Deep Impact Boom",
		username: "opencut",
		duration: 2.4,
		tags: ["boom", "impact", "hit", "bass"],
		license: "Creative Commons 0",
		downloads: 27455,
	}),
	makeSound({
		id: 1004,
		name: "Gentle Rain",
		username: "ambient-lab",
		duration: 12.6,
		tags: ["rain", "ambient", "nature", "weather"],
		license: "Creative Commons Attribution",
		downloads: 21877,
	}),
	makeSound({
		id: 1005,
		name: "Retro Arcade Blip",
		username: "pixel-sounds",
		duration: 0.3,
		tags: ["retro", "arcade", "8bit", "coin"],
		license: "Creative Commons 0",
		downloads: 19640,
	}),
	makeSound({
		id: 1006,
		name: "Mechanical Click",
		username: "fx-factory",
		duration: 0.5,
		tags: ["click", "mechanical", "button", "keyboard"],
		license: "Creative Commons Attribution",
		downloads: 15432,
	}),
	makeSound({
		id: 1007,
		name: "Night City Ambience",
		username: "ambient-lab",
		duration: 30.0,
		tags: ["city", "night", "ambient", "traffic"],
		license: "Creative Commons Attribution",
		downloads: 12890,
	}),
	makeSound({
		id: 1008,
		name: "Glitch Glitch Stutter",
		username: "glitchcore",
		duration: 1.2,
		tags: ["glitch", "digital", "error", "stutter"],
		license: "Creative Commons 0",
		downloads: 9876,
	}),
	makeSound({
		id: 1009,
		name: "Warm Vinyl Crackle",
		username: "retro-records",
		duration: 8.4,
		tags: ["vinyl", "vinyl crackle", "warm", "retro"],
		license: "Creative Commons Attribution",
		downloads: 8231,
	}),
	makeSound({
		id: 1010,
		name: "Laser Zap",
		username: "fx-factory",
		duration: 0.6,
		tags: ["laser", "sci-fi", "zap", "shoot"],
		license: "Creative Commons 0",
		downloads: 7654,
	}),
	makeSound({
		id: 1011,
		name: "Crowd Cheer",
		username: "event-audio",
		duration: 6.2,
		tags: ["crowd", "cheer", "applause", "audience"],
		license: "Creative Commons 0",
		downloads: 6120,
	}),
	makeSound({
		id: 1012,
		name: "Thunder Strike",
		username: "storm-fx",
		duration: 3.9,
		tags: ["thunder", "storm", "rain", "boom"],
		license: "Creative Commons Attribution",
		downloads: 5598,
	}),
];

export interface MockSoundSearchResult {
	results: SoundEffect[];
	count: number;
	next: string | null;
}

export function getTopMockSounds(): SoundEffect[] {
	return [...MOCK_SOUNDS].sort((a, b) => b.downloads - a.downloads);
}

export function searchMockSounds({
	query,
	commercialOnly,
}: {
	query: string;
	commercialOnly: boolean;
}): MockSoundSearchResult {
	const q = query.trim().toLowerCase();
	const results = MOCK_SOUNDS.filter((sound) => {
		if (commercialOnly && sound.license !== "Creative Commons 0") {
			return false;
		}
		if (!q) return true;
		const haystack = [sound.name, sound.username, ...sound.tags]
			.join(" ")
			.toLowerCase();
		return q
			.split(/\s+/)
			.every((term) => haystack.includes(term));
	});
	return { results, count: results.length, next: null };
}