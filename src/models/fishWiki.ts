import { Schema, model, Document } from 'mongoose';

interface IFish extends Document {
  bigGroup: string;
  group: string;
  commonName: string;
  species: string;
  family: string;
  feed: string;
  habitat: string;
  sizeMax: number;
  weightMax: number;
  endemic: string;
  threatened: string;
  piracema: boolean;
  introduced: boolean;
  trivia: string;
  picture: string;
}

const fishSchema = new Schema<IFish>({
  bigGroup: {
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
  species: {
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
  weightMax: {
    type: Number,
    required: false,
    trim: true,
  },
  endemic: {
    type: String,
    required: false,
    trim: true,
  },
  threatened: {
    type: String,
    required: false,
    trim: true,
  },
  piracema: {
    type: Boolean,
    required: false,
    trim: true,
  },
  introduced: {
    type: Boolean,
    required: false,
    trim: true,
  },
  trivia: {
    type: String,
    required: false,
    trim: true,
  },
  picture: {
    type: String,
    required: false,
    trim: true,
  },
});

export default model<IFish>('FishWiki', fishSchema);
