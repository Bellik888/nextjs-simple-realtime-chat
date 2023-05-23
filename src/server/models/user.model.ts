import bcrypt from 'bcryptjs';
import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, default: 'Guest' },
    email: {
      type: String,
      require: [true, 'Set email for user'],
      unique: true,
      validate(value: string) {
        const re = /\S+@\S+\.\S+/;

        return re.test(String(value).trim().toLocaleLowerCase());
      },
    },
    password: {
      type: String,
      require: [true, 'Set password for user'],
      default: null,
    },
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

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
UserSchema.method(
  'isValidPassword',
  function isValidPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
);

const User = models.User || model('User', UserSchema);

export default User;
