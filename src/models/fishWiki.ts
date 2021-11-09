import { Schema, model, Document } from 'mongoose';

export interface IFish extends Document {
  largeGroup: string;
  group: string;
  commonName: string;
  scientificName: string;
  family: string;
  food: string;
  habitat: string;
  maxSize: number;
  maxWeight: number;
  isEndemicInfo: string;
  isEndemic: boolean;
  isThreatenedInfo: string;
  isThreatened: boolean;
  hasSpawningSeasonInfo: string;
  hasSpawningSeason: boolean;
  wasIntroducedInfo: string;
  wasIntroduced: boolean;
  funFact: string;
  photo: string;
}

const fishSchema = new Schema<IFish>({
  largeGroup: {
    type: String,
    required: false,
    trim: true,
  },
  group: {
    type: String,
    required: false,
    trim: true,
  },
  commonName: {
    type: String,
    required: false,
    trim: true,
  },
  scientificName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  family: {
    type: String,
    required: false,
    trim: true,
  },
  food: {
    type: String,
    trim: true,
  },
  habitat: {
    type: String,
    required: false,
    trim: true,
  },
  maxSize: {
    type: Number,
    trim: true,
  },
  maxWeight: {
    type: Number,
    required: false,
    trim: true,
  },
  isEndemicInfo: {
    type: String,
    required: false,
    trim: true,
  },
  isEndemic: {
    type: Boolean,
    required: false,
    trim: true,
  },
  isThreatenedInfo: {
    type: String,
    required: false,
    trim: true,
  },
  isThreatened: {
    type: Boolean,
    required: false,
    trim: true,
  },
  wasIntroducedInfo: {
    type: String,
    required: false,
    trim: true,
  },
  wasIntroduced: {
    type: Boolean,
    required: false,
    trim: true,
  },
  hasSpawningSeasonInfo: {
    type: String,
    required: false,
    trim: true,
  },
  hasSpawningSeason: {
    type: Boolean,
    required: false,
    trim: true,
  },
  funFact: {
    type: String,
    required: false,
    trim: true,
  },
  photo: {
    type: String,
    required: false,
    trim: true,
  },
});

export default model<IFish>('FishWiki', fishSchema);
