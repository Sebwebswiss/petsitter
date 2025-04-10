export interface UserDocument extends Document {
  id?: string;
  name: string;
  email: string;
  phone: string;
  idType: string;
  frontImage: string;
  backImage: string;
  meetingStartTime: string;
  meetingEndTime: string;
  meetingUri: string;
  plan: string;
}

export interface UserFormData {
  _id?: any;
  id?: string;
  name: string;
  email: string;
  phone: string;
  idType: string;
  frontImage: string;
  backImage: string;
  meetingStartTime: string;
  meetingEndTime: string;
  meetingUri: string;
  plan: string;
}
