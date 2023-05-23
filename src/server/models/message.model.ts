import { Schema, SchemaTypes, model, models } from 'mongoose';

const MessageSchema = new Schema(
  {
    text: { type: String },
    chatRoom: {
      type: SchemaTypes.ObjectId,
      ref: 'Room',
    },
    chatRoomId: { type: String },
    ownerId: { type: String },
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

const Message = models.Message || model('Message', MessageSchema);

export default Message;
