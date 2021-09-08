import { Schema, model, Document } from 'mongoose';

interface IFish extends Document {
  fishId: number;
  grandeGrupo: string;
  grupo: string;
  nomesComuns: string;
  nomeCientifico: string;
  familia: string;
  alimentacao: string;
  habitat: string;
  tamanhoMax: number;
  pesoMax: number;
  endemica: string;
  ameacada: string;
  piracema: boolean;
  introduzida: boolean;
  curiosidades: string;
  foto: string;
}

const fishSchema = new Schema<IFish>(
  {
    fishId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    grandeGrupo: {
      type: String,
      enum: ['escama', 'couro', 'arraia', 'outros', 'cascudo'],
      required: false,
    },
    grupo: {
      type: String,
      required: false,
    },
    nomesComuns: {
      type: String,
      required: false,
    },
    nomeCientifico: {
      type: String,
      required: true,
    },
    familia: {
      type: String,
      required: false,
    },
    alimentacao: {
      type: String,
      default: false,
    },
    habitat: {
      type: String,
      required: false,
    },
    tamanhoMax: {
      type: Number,
    },
    pesoMax: {
      type: Number,
      required: false,
    },
    endemica: {
      type: String,
      required: false,
    },
    ameacada: {
      type: String,
      required: false,
    },
    piracema: {
      type: Boolean,
      required: false,
    },
    introduzida: {
      type: Boolean,
      required: false,
    },
    curiosidades: {
      type: String,
      required: false,
    },
    foto: {
      type: String,
      required: false,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default model<IFish>('FishWiki', fishSchema);
