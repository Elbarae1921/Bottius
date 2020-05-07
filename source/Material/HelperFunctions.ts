import { Guild } from "discord.js";

export class HelperFunctions {
	private static readonly userRegex =  /^<@!?(\d+)>$/;
	private static readonly channelRegex = /^<#(\d+)>$/;
	private static readonly roleRegex =   /^<@&(\d+)>$/;
	private static readonly idRegex =        /^(\d+)$/;

	private static teensSuffix = "th";
	private static numberSuffix = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"]; // 1st, 2nd, 3rd etc.

	public static getSuffix(num: number) {
		// 11th, 12th, 13th etc.
		if (num > 10 && num < 20) return this.teensSuffix;

		return this.numberSuffix[num % 10];
	}

	// Gets an ID from a tag / ID
	public static getID(input: string): string {
		if (this.userRegex.test(input)) {
			let results = this.userRegex.exec(input);
			return results[1]
		}
		if (this.channelRegex.test(input)) {
			let results = this.channelRegex.exec(input);
			return results[1]
		}
		if (this.roleRegex.test(input)) {
			let results = this.roleRegex.exec(input);
			return results[1]
		}
		if (this.idRegex.test(input)) {
			return input;
		}
		return "";
	}

	// Verifies that a member with this ID is in the server
	public static async verifyUserID(server: Guild, id: string): Promise<Boolean> {
		if (await server.members.fetch(id)) return true;
		else return false;
	}

	// Verifies that a role with this ID is in the server
	public static async verifyRoleID(server: Guild, id: string): Promise<Boolean> {
		if (await server.roles.fetch(id)) return true;
		else return false;
	}

	// Verifies that a channel with this ID is in the server
	public static verifyChannelID(server: Guild, id: string): Boolean {
		if (server.channels.resolve(id)) return true;
		else return false;
	}
}