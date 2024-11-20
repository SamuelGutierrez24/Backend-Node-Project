import { Request, Response } from "express";
import reactionService from "../services/reaction.service";
import { ReactionDocument, ReactionInput } from "../models/reaction.model";

class ReactionController {
  public async create(input: ReactionInput) {
    const { text, commentId, email } = input;
    return await reactionService.react(input, text, commentId);
  }

  public async get(id: string) {
    const reaction = await reactionService.findById(id);
    if (!reaction) {
      throw new Error(`Reaction with ID ${id} not found`);
    }
    return reaction;
  }

  public async getAll() {
    return await reactionService.findAll();
  }

  public async update(id: string, input: ReactionInput) {
    const reaction = await reactionService.update(id, input, input.email);
    if (!reaction) {
      throw new Error(`Reaction with ID ${id} not found`);
    }
    return reaction;
  }

  public async delete(id: string, email: string) {
    const deleted = await reactionService.delete(id, email);
    if (!deleted) {
      throw new Error(`Reaction with ID ${id} not found`);
    }
    return true;
  }
}

export default new ReactionController();
