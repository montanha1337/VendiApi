
const UserSchema = new Schema({
  email:String,
  nome: String,
  senha:String,
})


export default model('User', UserSchema);