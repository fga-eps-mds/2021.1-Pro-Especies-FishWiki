import { Schema, model, Document } from 'mongoose';

interface IFish extends Document {
  fishId: number;
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

const fishSchema = new Schema<IFish>(
  {
    fishId: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    grandeGrupo: {
      type: String,
      enum: ['escama', 'couro', 'arraia', 'outros', 'cascudo'],
      required: false,
      trim: true,
    },
    grupo: {
      type: String,
      required: false,
      trim: true,
    },
    nomesComuns: {
      type: String,
      required: false,
      trim: true,
    },
    nomeCientifico: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    familia: {
      type: String,
      required: false,
      trim: true,
    },
    alimentacao: {
      type: String,
      default: false,
      trim: true,
    },
    habitat: {
      type: String,
      required: false,
      trim: true,
    },
    tamanhoMax: {
      type: Number,
      trim: true,
    },
    pesoMax: {
      type: Number,
      required: false,
      trim: true,
    },
    endemica: {
      type: String,
      required: false,
      trim: true,
    },
    ameacada: {
      type: String,
      required: false,
      trim: true,
    },
    piracema: {
      type: Boolean,
      required: false,
      trim: true,
    },
    introduzida: {
      type: Boolean,
      required: false,
      trim: true,
    },
    curiosidades: {
      type: String,
      required: false,
      trim: true,
    },
    foto: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default model<IFish>('FishWiki', fishSchema);
