import { Schema, model, Document } from 'mongoose';

interface IFish extends Document {
  largeGroup: string;
  group: string;
  commonName: string;
  scientificName: string;
  family: string;
  food: string;
  habitat: string;
  maxSize: number;
  maxWeight: number;
  isEndemic: string;
  isThreatened: string;
  hasSpawningSeason: string;
  wasIntroduced: boolean;
  funFact: string;
  photo: string;
}

const fishSchema = new Schema<IFish>({
  largeGroup: {
    type: String,
    enum: ['escama', 'couro', 'arraia', 'outros', 'cascudo'],
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
  feed: {
    type: String,
    default: false,
    trim: true,
  },
  habitat: {
    type: String,
    required: false,
    trim: true,
  },
  sizeMax: {
    type: Number,
    trim: true,
  },
  maxWeight: {
    type: Number,
    required: false,
    trim: true,
  },
  isEndemic: {
    type: String,
    required: false,
    trim: true,
  },
  isThreatened: {
    type: String,
    required: false,
    trim: true,
  },
  hasSpawningSeason: {
    type: String,
    required: false,
    trim: true,
  },
  wasIntroduced: {
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
