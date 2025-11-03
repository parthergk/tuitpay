import { IContact } from "@repo/types";
import { Model, model, models, Schema } from "mongoose";

const contactSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    subject: {type: String, required: true},
    message: {type: String, required: true},
});

 const Contact =(models.Contact as Model<IContact>) || model<IContact>("Contact", contactSchema);
 export default Contact;