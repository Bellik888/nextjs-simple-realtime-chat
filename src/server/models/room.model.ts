import { Schema, SchemaTypes, model, models } from 'mongoose';

const RoomSchema = new Schema(
  {
    messages: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Message',
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;

        return ret;
      },
    },
    toObject: {},
  }
);

const Room = models.Room || model('Room', RoomSchema);

export default Room;
