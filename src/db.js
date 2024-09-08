import mongoose from 'mongoose';

export const openConnectionToDb = async () => {
  await mongoose.connect(
    `mongodb://localhost:27017/task-managment`,
  );

  mongoose.set('debug', true);
};