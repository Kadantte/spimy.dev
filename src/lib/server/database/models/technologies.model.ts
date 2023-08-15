import mongoose from 'mongoose';

export interface ITechnology extends mongoose.Document, Technology {}

const technologiesSchema = new mongoose.Schema<ITechnology>({
	icon: { type: String, unique: true, required: true },
	name: { type: String, unique: true, required: true }
});

export const Technology =
	(mongoose.models['technologies'] as unknown as mongoose.Model<ITechnology>) ||
	mongoose.model<ITechnology>('technologies', technologiesSchema);
